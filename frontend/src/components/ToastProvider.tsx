import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (type !== 'loading') {
      setTimeout(() => hideToast(id), 5000);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border border-white/20 min-w-[320px] max-w-[420px] animate-in slide-in-from-right-10 fade-in duration-300 backdrop-blur-md",
              toast.type === 'success' && "bg-emerald-500 text-white",
              toast.type === 'error' && "bg-rose-500 text-white",
              toast.type === 'info' && "bg-[#1976D2] text-white",
              toast.type === 'loading' && "bg-slate-800 text-white"
            )}
          >
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle2 size={22} />}
              {toast.type === 'error' && <AlertCircle size={22} />}
              {toast.type === 'info' && <Info size={22} />}
              {toast.type === 'loading' && <Loader2 className="animate-spin" size={22} />}
            </div>
            <p className="flex-1 text-[15px] font-bold leading-tight tracking-tight">
              {toast.message}
            </p>
            <button 
              onClick={() => hideToast(toast.id)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
