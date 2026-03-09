import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  Loader2,
  ListTodo,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAttendance } from '../hooks/useAttendance';

// --- Sub-components ---

const StatCard = ({ title, value, delta, icon: Icon, colorClass, isOffline }: { title: string, value: string | number, delta: string, icon: React.ElementType, colorClass: string, isOffline?: boolean }) => (
  <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] flex flex-col gap-1">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[14px] font-medium text-[#020617] tracking-[-0.42px] font-['Inter',sans-serif]">{title}</span>
      <div className={cn("p-1.5 rounded-md", colorClass)}>
        <Icon size={16} className="text-white" />
      </div>
    </div>
    <div className={cn("text-[24px] font-bold tracking-[-0.36px] font-['Inter',sans-serif]", isOffline ? "text-slate-300" : "text-[#020617]")}>
      {isOffline ? "--" : value}
    </div>
    <div className="text-[12px] text-[#64748b] font-normal font-['Inter',sans-serif]">
      {isOffline ? "N/A" : delta}
    </div>
  </div>
);

const StatusDot = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  const colors: Record<string, string> = {
    present: 'bg-[#52c41a]',
    approved: 'bg-[#52c41a]',
    absent: 'bg-[#f5222d]',
    denied: 'bg-[#f5222d]',
    late: 'bg-[#faad14]',
    pending: 'bg-[#1890ff]'
  };
  return <div className={cn("size-2 rounded-full", colors[s] || 'bg-slate-300')} />;
};

// --- Main Module Component ---

export const AttendanceModule = () => {
  // Prototype: Using hardcoded ID 1001 until auth is fully implemented
  const { data, loading, error } = useAttendance('1001');
  const [searchQuery, setSearchQuery] = useState('');

  // 🧠 Dynamic Analytics derived from Database data
  const stats = useMemo(() => {
    if (!data.length) return { hours: '0.00', present: 0, late: 0, ot: '0.00' };
    
    const totalHrs = data.reduce((acc, curr) => acc + parseFloat(curr.total_hours), 0);
    const presentCount = data.filter(r => ['present', 'approved'].includes(r.status.toLowerCase())).length;
    const lateCount = data.filter(r => r.status.toLowerCase() === 'late').length;
    
    return {
      hours: totalHrs.toFixed(2),
      present: presentCount,
      late: lateCount,
      ot: '0.00' 
    };
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(r => 
      r.date.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <Loader2 className="animate-spin text-[#1890ff]" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">Syncing with server...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in duration-500 relative">
      {/* DB Connection Status Indicator */}
      {error && (
        <div className="absolute top-[-48px] left-0 right-0 flex justify-center z-50">
          <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold border border-rose-100 flex items-center gap-2 shadow-sm animate-in slide-in-from-top-2">
            <div className="size-2 bg-rose-500 rounded-full animate-pulse" />
            Database Disconnected
            <div className="w-px h-3 bg-rose-200 mx-1" />
            <span className="font-normal opacity-80">{error}</span>
          </div>
        </div>
      )}

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-[19px]">
        <StatCard title="Total Hours" value={stats.hours} delta="Calculated from logs" icon={Clock} colorClass="bg-slate-500" isOffline={!!error} />
        <StatCard title="Days Present" value={stats.present} delta="Count of active shifts" icon={CheckCircle2} colorClass="bg-[#52c41a]" isOffline={!!error} />
        <StatCard title="Total Late" value={stats.late} delta="Requires attention" icon={AlertCircle} colorClass="bg-[#faad14]" isOffline={!!error} />
        <StatCard title="Overtime" value={stats.ot} delta="Pending approval" icon={ArrowUpRight} colorClass="bg-[#1890ff]" isOffline={!!error} />
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden relative">
        {/* Subtle grayscale overlay for disconnected state */}
        {error && <div className="absolute inset-0 bg-white/40 backdrop-grayscale-[0.5] pointer-events-none z-10" />}
        
        {/* Toolbar */}
        <div className="p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-[24px] font-normal text-[rgba(0,0,0,0.85)] font-['Roboto',sans-serif]">
              My Attendance Logs
            </h2>
            {error && <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Offline</span>}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button disabled={!!error} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1890ff] text-[#1890ff] rounded-[2px] text-sm hover:bg-sky-50 shadow-sm transition-all disabled:opacity-50">
              <Calendar size={16} />
              <span className="font-medium">Filter Dates</span>
            </button>
            
            <div className="relative flex-1 sm:flex-none min-w-[240px]">
              <input 
                type="text"
                disabled={!!error}
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 bg-white border border-[#d9d9d9] rounded-[2px] text-sm focus:border-[#1890ff] outline-none transition-all disabled:bg-slate-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse font-['Roboto',sans-serif]">
            <thead>
              <tr className="bg-[#ECEFF1] border-b border-[rgba(0,0,0,0.06)]">
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Time In</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Time Out</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Break In</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Break Out</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Total Hours</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(0,0,0,0.06)]">
              {error ? (
                <tr>
                  <td colSpan={8} className="px-4 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                      <ListTodo size={64} className="text-slate-300" />
                      <div className="flex flex-col gap-1">
                        <p className="text-slate-600 font-bold text-lg">Server Connection Lost</p>
                        <p className="text-slate-400 text-sm italic">Attendance logs cannot be retrieved at this moment.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan={8} className="p-10 text-center text-slate-400 italic">No records found.</td></tr>
              ) : filteredData.map((record, i) => (
                <tr key={i} className="hover:bg-[#F5F5F5] transition-colors group">
                  <td className="px-4 py-4 text-[14px] font-medium text-slate-700 whitespace-nowrap">{record.date}</td>
                  <td className="px-4 py-4 text-[14px] text-slate-600 whitespace-nowrap">{record.time_in}</td>
                  <td className="px-4 py-4 text-[14px] text-slate-600 whitespace-nowrap">{record.time_out}</td>
                  <td className="px-4 py-4 text-[14px] text-slate-400 italic whitespace-nowrap">{record.break_in}</td>
                  <td className="px-4 py-4 text-[14px] text-slate-400 italic whitespace-nowrap">{record.break_out}</td>
                  <td className="px-4 py-4 text-[14px] font-bold text-slate-800 whitespace-nowrap">{record.total_hours}h</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusDot status={record.status} />
                      <span className="text-[14px] capitalize">{record.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#1890ff] text-[14px] font-medium hover:underline">Dispute</button>
                      <div className="w-px h-3 bg-slate-200" />
                      <button className="text-slate-400 text-[14px] font-medium hover:text-slate-600">Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-4 flex justify-end bg-white border-t border-slate-50">
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#1890ff] text-white rounded text-sm font-bold">1</button>
            <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
