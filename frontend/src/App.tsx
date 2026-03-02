import { useState } from 'react';
import { useAttendance } from './hooks/useAttendance';
import { AppShell } from './components/AppShell';
import { RequestDrawer } from './components/RequestDrawer';
import Login from './Login';
import { cn } from './lib/utils';
import { Clock, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

const StatusPill = ({ status }: { status: string }) => {
  const getStatusStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'present':
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'late':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'absent':
      case 'denied':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider",
      getStatusStyles(status)
    )}>
      {status}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-start gap-4">
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, loading, error } = useAttendance();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requestType, setRequestType] = useState<'dispute' | 'overtime' | 'leave'>('dispute');

  const openDrawer = (type: 'dispute' | 'overtime' | 'leave') => {
    setRequestType(type);
    setIsDrawerOpen(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppShell roleId={3} onLogout={() => setIsAuthenticated(false)}>
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Clock} label="Today's Shift" value="08:00 - 17:00" color="bg-sky-500" />
        <StatCard icon={Calendar} label="Days Present" value="22" color="bg-emerald-500" />
        <StatCard icon={AlertCircle} label="Total Late" value="3" color="bg-amber-500" />
        <StatCard icon={CheckCircle2} label="Approved OT" value="12h" color="bg-indigo-500" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-black text-slate-800 tracking-tight">Recent Attendance Logs</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => openDrawer('dispute')}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            File Dispute
          </button>
          <button 
            onClick={() => openDrawer('leave')}
            className="px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-100"
          >
            New Request
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Date</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Time In</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Time Out</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Total Hours</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={6} className="px-8 py-12 text-center text-slate-400 font-medium">Loading records...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="px-8 py-12 text-center text-rose-500 font-bold">{error}</td></tr>
              ) : data.map((record, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5 text-[15px] font-bold text-slate-700">{record.date}</td>
                  <td className="px-8 py-5 text-[15px] text-slate-500 font-medium">{record.time_in}</td>
                  <td className="px-8 py-5 text-[15px] text-slate-500 font-medium">{record.time_out}</td>
                  <td className="px-8 py-5 text-[15px] font-black text-slate-800 tracking-tight">{record.total_hours}h</td>
                  <td className="px-8 py-5"><StatusPill status={record.status} /></td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => openDrawer('dispute')}
                      className="text-sky-600 text-[13px] font-black opacity-0 group-hover:opacity-100 transition-all hover:underline"
                    >
                      Dispute
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RequestDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        type={requestType} 
        attendanceId={1} // Prototype: Hardcoded for now
      />
    </AppShell>
  );
}

export default App;
