import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AppState, Domain } from '../types';
import { AlertCircle, UserX, Users, UserCheck, UserMinus } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

const AnalyticsView: React.FC<{ state: AppState }> = ({ state }) => {
  const latestDate = useMemo(() => {
    const dates = Array.from(new Set(state.attendance.map(a => a.date))).sort();
    return dates.length > 0 ? dates[dates.length - 1] : new Date().toISOString().split('T')[0];
  }, [state.attendance]);

  const domainStats = useMemo(() => {
    return Object.values(Domain).map((domain, index) => {
      const members = state.members.filter(m => m.domain === domain);
      const presentCount = state.attendance.filter(a => {
        const m = state.members.find(mem => mem.id === a.memberId);
        return m?.domain === domain && a.date === latestDate && a.present;
      }).length;

      const absentCount = members.length - presentCount;

      const totalAttendanceCount = state.attendance.filter(a => {
        const m = state.members.find(mem => mem.id === a.memberId);
        return m?.domain === domain && a.present;
      }).length;

      return {
        name: domain,
        members: members.length,
        present: presentCount,
        absent: absentCount,
        totalHistorical: totalAttendanceCount,
        color: COLORS[index % COLORS.length]
      };
    });
  }, [state, latestDate]);

  const dailyTrend = useMemo(() => {
    const dates = Array.from(new Set(state.attendance.map(a => a.date))).sort();
    return dates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: state.attendance.filter(a => a.date === date && a.present).length
    }));
  }, [state]);

  const latestAbsentees = useMemo(() => {
    const presentIds = new Set(
      state.attendance
        .filter(a => a.date === latestDate && a.present)
        .map(a => a.memberId)
    );
    return state.members.filter(m => !presentIds.has(m.id));
  }, [state, latestDate]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h2 className="text-4xl font-black tracking-tighter mb-2">Platform Insights</h2>
        <p className="text-slate-500 font-medium">Domain-level analysis for {new Date(latestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
      </header>

      {/* Domain Breakdown Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-black tracking-tight mb-6">Registry Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domainStats.map((domain) => (
            <div key={domain.name} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-black transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full">{domain.name}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: domain.color }} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <Users size={14} className="text-slate-300" /> Total
                  </span>
                  <span className="text-lg font-black text-black">{domain.members}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <UserCheck size={14} className="text-green-400" /> Present
                  </span>
                  <span className="text-lg font-black text-green-600">{domain.present}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold flex items-center gap-2">
                    <UserMinus size={14} className="text-red-400" /> Absent
                  </span>
                  <span className="text-lg font-black text-red-500">{domain.absent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="font-black text-lg mb-8 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Registry Pulse
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  itemStyle={{ color: '#000000' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#000000" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="font-black text-lg mb-8 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            Segment Density
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainStats.filter(d => d.members > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="members"
                >
                  {domainStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        <div className="xl:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="font-black text-xl mb-8 tracking-tight">Segment Activity Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {domainStats.map(domain => {
              const percentage = domain.members > 0 ? (domain.totalHistorical / (domain.members * 10)) * 100 : 0;
              return (
                <div key={domain.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-black text-black group-hover:text-blue-600 transition-colors uppercase tracking-wider">{domain.name}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{domain.totalHistorical} Logs</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                      style={{ width: `${Math.min(100, Math.max(5, percentage))}%`, backgroundColor: domain.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl tracking-tight flex items-center gap-3">
              <UserX className="text-red-500" size={20} />
              Recent Absentees
            </h3>
            {latestDate && (
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase">
                {new Date(latestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {latestAbsentees.length > 0 ? (
              latestAbsentees.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-200 transition-colors group">
                  <div>
                    <p className="font-bold text-sm text-black group-hover:text-red-600 transition-colors">{member.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{member.domain}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-green-600" size={24} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  {state.attendance.length === 0 ? "No data recorded yet" : "Perfect Attendance!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
