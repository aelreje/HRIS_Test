import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useRequestsHistory } from '../hooks/useRequestsHistory';

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

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  const styles: Record<string, string> = {
    approved: 'bg-[#f6ffed] border-[#b7eb8f] text-[#52c41a]',
    rejected: 'bg-[#fff1f0] border-[#ffa39e] text-[#f5222d]',
    denied: 'bg-[#fff1f0] border-[#ffa39e] text-[#f5222d]',
    pending: 'bg-[#e6f7ff] border-[#91d5ff] text-[#1890ff]',
    endorsed: 'bg-[#f9f0ff] border-[#d3adf7] text-[#722ed1]'
  };
  
  return (
    <div className={cn("inline-flex items-center px-2 py-0.5 rounded-[2px] border text-[12px] font-medium capitalize", styles[s] || 'bg-slate-50 border-slate-200 text-slate-500')}>
      {status}
    </div>
  );
};

// --- Main Module Component ---

export const RequestsModule = () => {
  const { data, loading, error } = useRequestsHistory('1001');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => {
    if (!data.length) return { total: 0, pending: 0, approved: 0, rejected: 0 };
    
    return {
      total: data.length,
      pending: data.filter(r => r.status.toLowerCase() === 'pending').length,
      approved: data.filter(r => r.status.toLowerCase() === 'approved').length,
      rejected: data.filter(r => ['rejected', 'denied'].includes(r.status.toLowerCase())).length,
    };
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(r => 
      r.type.toLowerCase().includes(query) || 
      r.sub_type.toLowerCase().includes(query) ||
      r.status.toLowerCase().includes(query) ||
      r.reason.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <Loader2 className="animate-spin text-[#1890ff]" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">Loading request history...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 animate-in fade-in duration-500 relative">
      {/* DB Connection Status */}
      {error && (
        <div className="absolute top-[-48px] left-0 right-0 flex justify-center z-50">
          <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold border border-rose-100 flex items-center gap-2 shadow-sm animate-in slide-in-from-top-2">
            <div className="size-2 bg-rose-500 rounded-full animate-pulse" />
            Offline Mode: {error}
          </div>
        </div>
      )}

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-[19px]">
        <StatCard title="Total Requests" value={stats.total} delta="Lifetime filing" icon={ClipboardList} colorClass="bg-slate-500" isOffline={!!error} />
        <StatCard title="Pending" value={stats.pending} delta="Awaiting action" icon={Clock} colorClass="bg-[#1890ff]" isOffline={!!error} />
        <StatCard title="Approved" value={stats.approved} delta="Successfully processed" icon={CheckCircle2} colorClass="bg-[#52c41a]" isOffline={!!error} />
        <StatCard title="Rejected" value={stats.rejected} delta="Action required" icon={XCircle} colorClass="bg-[#f5222d]" isOffline={!!error} />
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden relative">
        {error && <div className="absolute inset-0 bg-white/40 backdrop-grayscale-[0.5] pointer-events-none z-10" />}
        
        {/* Toolbar */}
        <div className="p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-[24px] font-normal text-[rgba(0,0,0,0.85)] font-['Roboto',sans-serif]">
              My Requests
            </h2>
            {error && <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Offline</span>}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button disabled={!!error} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1890ff] text-[#1890ff] rounded-[2px] text-sm hover:bg-sky-50 shadow-sm transition-all disabled:opacity-50">
              <Filter size={16} />
              <span className="font-medium">Filter Type</span>
            </button>
            
            <div className="relative flex-1 sm:flex-none min-w-[280px]">
              <input 
                type="text"
                disabled={!!error}
                placeholder="Search requests, reasons, status..."
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
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Date Filed</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Request Type</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Details</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Schedule / Period</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-[14px] font-medium text-[rgba(0,0,0,0.85)] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(0,0,0,0.06)]">
              {error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                      <FileText size={64} className="text-slate-300" />
                      <p className="text-slate-600 font-bold text-lg">Unable to load requests</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan={6} className="p-10 text-center text-slate-400 italic">No request history found.</td></tr>
              ) : filteredData.map((record, i) => (
                <tr key={i} className="hover:bg-[#F5F5F5] transition-colors group">
                  <td className="px-4 py-4 text-[14px] text-slate-500 whitespace-nowrap">
                    {new Date(record.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "size-2 rounded-full",
                        record.type === 'Leave' ? 'bg-purple-500' : 
                        record.type === 'Overtime' ? 'bg-orange-500' : 'bg-blue-500'
                      )} />
                      <span className="text-[14px] font-bold text-slate-700">{record.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[14px] text-slate-600 whitespace-nowrap">{record.sub_type}</td>
                  <td className="px-4 py-4 text-[14px] text-slate-600 whitespace-nowrap">
                    {record.start_date} → {record.end_date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#1890ff] text-[14px] font-medium hover:underline">View Details</button>
                      {record.status.toLowerCase() === 'pending' && (
                        <>
                          <div className="w-px h-3 bg-slate-200" />
                          <button className="text-rose-500 text-[14px] font-medium hover:underline">Cancel</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-4 flex justify-end bg-white border-t border-slate-50">
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#1890ff] text-white rounded text-sm font-bold shadow-sm shadow-blue-200">1</button>
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
