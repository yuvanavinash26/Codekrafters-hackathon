import React, { useState, useMemo } from 'react';
import { AppState, Domain } from '../types';
import { Calendar } from 'lucide-react';

interface AttendanceViewProps {
  state: AppState;
  onMark: (memberId: string, date: string, present: boolean) => void;
}

const AttendanceView: React.FC<AttendanceViewProps> = ({ state, onMark }) => {
  // Lock the date to today only
  const selectedDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [filterDomain, setFilterDomain] = useState<string>('All');

  const filteredMembers = state.members.filter(m =>
    filterDomain === 'All' || m.domain === filterDomain
  );

  const getStatus = (memberId: string) => {
    const record = state.attendance.find(a => a.date === selectedDate && a.memberId === memberId);
    return record ? record.present : false;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Member Registry</h2>
          <p className="text-slate-500 font-medium">Marking presence for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="flex gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm items-center">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-900">
            <Calendar size={16} className="text-slate-400" />
            <span>Today, {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold focus:outline-none focus:border-black transition-colors"
          >
            <option value="All">All Domains</option>
            {Object.values(Domain).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => {
          const isPresent = getStatus(member.id);
          return (
            <div
              key={member.id}
              onClick={() => onMark(member.id, selectedDate, !isPresent)}
              className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all duration-500 relative group overflow-hidden ${
                isPresent
                  ? 'bg-black border-black shadow-xl'
                  : 'bg-white border-slate-200 hover:border-black'
              }`}
            >
              {isPresent && (
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-20" />
              )}

              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-colors ${
                  isPresent ? 'bg-yellow-400 text-black' : 'bg-slate-100 text-slate-400'
                }`}>
                  {member.name.charAt(0)}
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isPresent ? 'bg-yellow-400 border-yellow-400 rotate-0 scale-110' : 'border-slate-200 rotate-45 scale-100'
                }`}>
                  {isPresent && <CheckIcon />}
                </div>
              </div>
              <h3 className={`font-black text-2xl mb-1 tracking-tight transition-colors ${
                isPresent ? 'text-white' : 'text-black'
              }`}>{member.name}</h3>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                isPresent ? 'text-yellow-400/80' : 'text-slate-400'
              }`}>{member.domain}</p>
            </div>
          );
        })}
        {filteredMembers.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white/40 rounded-[3rem] border-4 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No matching Krafters found</p>
          </div>
        )}
      </div>
    </div>
  );
};

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-black">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default AttendanceView;
