import React, { useState } from 'react';
import { Domain, Member } from '../types';
import { UserPlus, Trash2 } from 'lucide-react';

interface MembersViewProps {
  members: Member[];
  onAdd: (name: string, domain: Domain) => void;
  onDelete: (id: string) => void;
}

const MembersView: React.FC<MembersViewProps> = ({ members, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState<Domain>(Domain.Development);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), domain);
    setName('');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2 text-slate-900">Member Base</h2>
            <p className="text-slate-500 font-medium">Currently managing <span className="text-black font-bold">{members.length}</span> brilliant minds</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Krafter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-50 border border-slate-100 px-6 py-4 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all min-w-[240px]"
            />
            <div className="relative group">
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as Domain)}
                className="appearance-none bg-slate-50 border border-slate-100 px-6 py-4 pr-12 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all w-full cursor-pointer"
              >
                {Object.values(Domain).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <button type="submit" className="bg-black text-white hover:bg-slate-800 px-10 py-4 rounded-3xl text-sm font-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
              <UserPlus size={18} />
              Onboard
            </button>
          </form>
        </div>
      </header>

      {members.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="group bg-white flex items-center gap-4 pl-4 pr-1 py-1 rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 animate-in fade-in slide-in-from-left-4"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-sm text-slate-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500">
                {member.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col min-w-[100px] py-2">
                <h3 className="font-black text-sm text-black truncate leading-tight">
                  {member.name}
                </h3>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {member.domain}
                </span>
              </div>

              <div className="w-px h-6 bg-slate-100 mx-1" />

              <div className="flex items-center gap-1">
                <div className="flex flex-col items-end px-2 hidden sm:flex">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter leading-none">Joined</span>
                  <span className="text-[10px] font-bold text-slate-500 mono leading-tight">
                    {new Date(member.joinDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(member.id);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-red-500 transition-all active:scale-90 group/del relative z-10"
                  title="Remove Member"
                >
                  <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-white/40 rounded-[3.5rem] border-4 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="text-slate-300" size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-400 mb-2">Empty Registry</h3>
          <p className="text-slate-400 font-medium max-w-xs mx-auto">Start by adding your first club member using the form above.</p>
        </div>
      )}
    </div>
  );
};

export default MembersView;
