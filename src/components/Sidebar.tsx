import React, { useState } from 'react';
import { LayoutDashboard, Users, ClipboardCheck, BarChart3 } from 'lucide-react';

const NavItem = ({ label, active, onClick, icon: Icon, isExpanded }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 whitespace-nowrap group ${
        active
            ? 'bg-white text-black shadow-lg scale-105'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        } ${!isExpanded && 'opacity-0 scale-90 pointer-events-none'}`}
  >
    <Icon size={16} className={active ? 'text-black' : 'text-white/60 group-hover:text-yellow-400 transition-colors'} />
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </button>
);

const Sidebar: React.FC<{ activeTab: string, setActiveTab: (t: any) => void }> = ({ activeTab, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center group/island pointer-events-none">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`pointer-events-auto bg-black/95 backdrop-blur-2xl text-white shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex items-center justify-center border border-white/10 ${
            isHovered
                ? 'w-[760px] h-[84px] rounded-[42px] px-8'
                : 'w-[260px] h-[56px] rounded-full px-7'
            }`}
      >
        <div className="flex items-center justify-between w-full relative">
          {/* Brand - Styled exactly like the user image */}
          <div className={`transition-all duration-700 ease-out flex items-center gap-3 shrink-0 ${
              isHovered ? 'translate-x-0' : 'translate-x-0'
            }`}>
            <span className="text-lg font-bold tracking-tight select-none">
              <span className="text-white">Code</span><span className="text-[#FACC15]">Krafers</span>
            </span>
            {isHovered && (
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
            )}
          </div>

          {/* Navigation Items */}
          <nav className={`flex items-center gap-1 transition-all duration-700 delay-75 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none absolute right-0'
            }`}>
            <NavItem
              label="Dashboard"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
              icon={LayoutDashboard}
              isExpanded={isHovered}
            />
            <NavItem
              label="Krafters"
              active={activeTab === 'members'}
              onClick={() => setActiveTab('members')}
              icon={Users}
              isExpanded={isHovered}
            />
            <NavItem
              label="Registry"
              active={activeTab === 'attendance'}
              onClick={() => setActiveTab('attendance')}
              icon={ClipboardCheck}
              isExpanded={isHovered}
            />
            <NavItem
              label="Insights"
              active={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
              icon={BarChart3}
              isExpanded={isHovered}
            />
          </nav>

          {/* Status Activity Indicator (Compact) */}
          {!isHovered && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 scale-90">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className={`transition-all duration-1000 -mt-2 blur-[40px] rounded-full bg-black/40 ${
          isHovered ? 'w-[720px] h-10 opacity-70 scale-110' : 'w-48 h-4 opacity-0 scale-50'
        }`} />
    </div>
  );
};

export default Sidebar;
