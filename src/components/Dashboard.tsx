import React, { useState, useEffect } from 'react';
import { AppState, Domain } from '../types';
import { RefreshCcw, Clock, Calendar as CalendarIcon } from 'lucide-react';

const StatCard = ({ title, value, color }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
    <p className={`text-4xl font-bold tracking-tight ${color}`}>{value}</p>
  </div>
);

const Dashboard: React.FC<{ state: AppState, onNavigate: (t: any) => void, onReset: () => void }> = ({ state, onNavigate, onReset }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const presentToday = state.attendance.filter(a => a.date === today && a.present).length;
  const attendanceRate = state.members.length > 0
    ? Math.round((presentToday / state.members.length) * 100)
    : 0;

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Real-time Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Clock className="text-yellow-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">System Time</p>
            <p className="text-2xl font-black mono tracking-tighter tabular-nums leading-none">{formattedTime}</p>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-200 hidden md:block" />

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
            <CalendarIcon className="text-slate-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Current Session</p>
            <p className="text-lg font-bold tracking-tight text-slate-900 leading-none">{formattedDate}</p>
          </div>
        </div>

        <div className="flex-1 md:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Server Live</span>
          </div>
        </div>
      </div>

      <header className="mb-10">
        <div className="inline-flex items-center px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-tighter mb-4">
          Status: Operational
        </div>
        <h2 className="text-5xl font-bold tracking-tighter mb-2">Workspace</h2>
        <p className="text-slate-500 font-medium">Club directory and activity metrics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Krafters" value={state.members.length} color="text-black" />
        <StatCard title="Present Today" value={presentToday} color="text-black" />
        <StatCard title="Sync Rate" value={`${attendanceRate}%`} color="text-black" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-[#f2f2e6]/50 border border-slate-200 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="font-extrabold text-2xl mb-2 tracking-tight">Direct Actions</h3>
            <p className="text-slate-500 font-medium">Manage the daily club operations and member registration from this portal.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => onNavigate('attendance')}
              className="px-8 bg-black text-white hover:bg-slate-800 py-4 rounded-2xl transition-all shadow-md active:scale-95 text-sm font-bold flex items-center justify-center gap-3 min-w-[180px]"
            >
              Launch Registry
            </button>
            <button
              onClick={() => onNavigate('members')}
              className="px-8 bg-white text-black border border-slate-200 hover:bg-slate-50 py-4 rounded-2xl transition-all text-sm font-bold flex items-center justify-center gap-3 min-w-[180px]"
            >
              Add Member
            </button>
            <button
              onClick={onReset}
              className="px-6 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 py-4 rounded-2xl transition-all text-xs font-black flex items-center justify-center gap-2 group"
            >
              <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              Reset System
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold tracking-tight mb-6">Active Segments</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.values(Domain).map(domain => {
            const count = state.members.filter(m => m.domain === domain).length;
            return (
              <div key={domain} className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-yellow-400 transition-colors">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-1 truncate">{domain}</p>
                <p className="text-2xl font-black text-black">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
