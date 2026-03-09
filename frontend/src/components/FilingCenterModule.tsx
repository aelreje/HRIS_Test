import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Send, 
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Info,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useRequests } from '../hooks/useRequests';
import { useToast } from './ToastProvider';

type FilingType = 'leave' | 'overtime' | 'dispute';

export const FilingCenterModule = () => {
  const [selectedType, setSelectedType] = useState<FilingType>('leave');
  const { fileDispute, fileOvertime, fileLeave } = useRequests();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    reason: '',
    leave_type: 'Sick Leave',
    start_date: '',
    end_date: '',
    dispute_type: 'Time Correction'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const common = { employee_id: '1001', agreement_1: true, agreement_2: true };
      
      if (selectedType === 'leave') {
        await fileLeave({ ...common, ...formData });
      } else if (selectedType === 'overtime') {
        await fileOvertime({ ...common, ...formData, start_time: `${formData.date} ${formData.start_time}`, end_time: `${formData.date} ${formData.end_time}`, purpose: formData.reason, ot_type: 'Normal' });
      } else if (selectedType === 'dispute') {
        await fileDispute({ ...common, ...formData, dispute_date: formData.date });
      }

      showToast(`${selectedType.toUpperCase()} request submitted successfully!`, 'success');
    } catch (err: any) {
      showToast(err.response?.data?.error || "Failed to submit request.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const SidebarItem = ({ type, title, icon: Icon, colorClass }: { type: FilingType, title: string, icon: any, colorClass: string }) => (
    <button 
      onClick={() => { setSelectedType(type); }}
      className={cn(
        "flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 group relative overflow-hidden",
        selectedType === type 
          ? "bg-[#E3F2FD] text-[#1976D2] shadow-sm shadow-blue-100" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg transition-colors",
        selectedType === type ? colorClass : "bg-slate-100 group-hover:bg-slate-200"
      )}>
        <Icon size={20} className={selectedType === type ? "text-white" : "text-slate-400"} />
      </div>
      <span className="font-bold text-[15px] tracking-tight flex-1 text-left">{title}</span>
      {selectedType === type && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1976D2]" />
      )}
    </button>
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-[34px] font-normal text-[#263238] leading-[40px] tracking-[0.25px] font-['Roboto',sans-serif]">Filing Center</h2>
        <p className="text-slate-500 text-sm">Submit your attendance-related requests here.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: Menu Cards */}
        <nav className="w-full lg:w-[320px] flex flex-col gap-3 shrink-0">
          <SidebarItem type="leave" title="File Leave" icon={Calendar} colorClass="bg-purple-500" />
          <SidebarItem type="overtime" title="File Overtime" icon={Clock} colorClass="bg-orange-500" />
          <SidebarItem type="dispute" title="Attendance Dispute" icon={AlertCircle} colorClass="bg-blue-500" />
        </nav>

        {/* RIGHT COLUMN: Dynamic Form Container */}
        <main className="flex-1 w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative min-h-[500px]">
          
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-800 tracking-tight capitalize">
              New {selectedType} Request
            </h3>
            {loading && <Loader2 className="animate-spin text-[#1976D2]" size={20} />}
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              {selectedType === 'leave' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Leave Type</label>
                    <select 
                      className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] text-slate-700 font-medium focus:bg-white focus:border-[#1976D2] outline-none transition-all cursor-pointer"
                      value={formData.leave_type}
                      onChange={e => setFormData({...formData, leave_type: e.target.value})}
                    >
                      <option>Sick Leave</option>
                      <option>Vacation Leave</option>
                      <option>Emergency Leave</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                      <input type="date" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, start_date: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                      <input type="date" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, end_date: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'overtime' && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 text-orange-800 text-[13px] leading-relaxed">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p>
                      Overtime requests must be filed for a **future date**. 
                      Same-day filing is not permitted to allow for prior approval by your supervisor.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                      <input type="date" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
                      <input type="time" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, start_time: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">End Time</label>
                      <input type="time" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, end_time: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'dispute' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dispute Date</label>
                    <input type="date" className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] outline-none focus:bg-white focus:border-[#1976D2] transition-all" onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dispute Type</label>
                    <select 
                      className="w-full h-[56px] px-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] text-slate-700 font-medium focus:bg-white focus:border-[#1976D2] outline-none transition-all cursor-pointer"
                      value={formData.dispute_type}
                      onChange={e => setFormData({...formData, dispute_type: e.target.value})}
                    >
                      <option>Time Correction</option>
                      <option>Status Discrepancy</option>
                      <option>Missing Log</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Reason / Justification</label>
                <textarea 
                  rows={4} 
                  className="w-full p-5 bg-[#F1F4F9] border-2 border-transparent rounded-[14px] text-slate-700 font-medium outline-none focus:bg-white focus:border-[#1976D2] transition-all resize-none"
                  placeholder="Provide a detailed explanation for your request..."
                  onChange={e => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <div className="pt-6 border-t border-slate-50">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-4 bg-[#1976D2] text-white rounded-[14px] font-black text-[16px] hover:bg-[#1565C0] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:active:scale-100"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
