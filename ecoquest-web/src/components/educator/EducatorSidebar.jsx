import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  BarChart3, 
  PlusCircle, 
  BookOpen, 
  Award, 
  Palmtree, 
  LogOut, 
  Leaf, 
  Sparkles,
  Users,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export default function EducatorSidebar({ activeTab, setActiveTab, onLogout, onSwitchToStudent }) {
  const navItems = [
    { id: 'home', label: 'Command Center', icon: LayoutDashboard, badge: null, tag: 'ACTIVE' },
    { id: 'verification', label: 'Verification Queue', icon: ShieldCheck, badge: '5 Pending', tag: 'AI SCANNED' },
    { id: 'analytics', label: 'Class Analytics', icon: BarChart3, badge: 'Top 2%', tag: 'REPORTS' },
    { id: 'quests', label: 'Quest Creator', icon: PlusCircle, badge: '12 Active', tag: 'DISPATCH' },
    { id: 'curriculum', label: 'Eco Curriculum', icon: BookOpen, badge: '8 Modules', tag: 'LESSONS' },
    { id: 'island', label: 'Sanctuary Realm', icon: Palmtree, badge: 'Lvl 25', tag: '3D WORLD' },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-[#04160d]/95 border-r border-emerald-500/25 fixed top-0 bottom-0 left-0 z-30 flex flex-col justify-between p-5 backdrop-blur-xl shadow-2xl shadow-emerald-950/50 select-none">
      
      {/* TOP BRANDING & EDUCATOR ROLE BADGE */}
      <div className="space-y-6">
        
        {/* LOGO */}
        <div className="flex items-center justify-between pt-2 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 p-0.5 shadow-lg shadow-emerald-500/30">
              <div className="w-full h-full bg-[#051912] rounded-[14px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-xl text-white font-heading tracking-tight flex items-center gap-1.5">
                <span>EcoQuest</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h1>
              <div className="flex items-center gap-1 text-[10px] font-black text-amber-300 uppercase tracking-wider">
                <GraduationCap className="w-3 h-3 text-amber-400" />
                <span>EDUCATOR PORTAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* SWITCH TO STUDENT VIEW BUTTON */}
        <div className="px-1">
          <button
            onClick={onSwitchToStudent}
            className="w-full p-2.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all text-xs font-black flex items-center justify-between cursor-pointer group shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Student View</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* MAIN NAVIGATION LIST */}
        <nav className="space-y-1.5 pt-2">
          <div className="text-[10px] font-black text-emerald-400/70 uppercase tracking-widest px-3 mb-2">
            Educator Guild Control
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 cursor-pointer text-left relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/25 via-teal-500/15 to-transparent text-white border border-emerald-400/50 shadow-md shadow-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-emerald-950/40 border border-transparent'
                }`}
              >
                {/* Left Active Glow Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-emerald-400 via-teal-300 to-amber-300 rounded-r-full shadow-[0_0_10px_#34d399]" />
                )}

                <div className="flex items-center gap-3.5 pl-1">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'bg-emerald-950/60 text-emerald-400 group-hover:text-emerald-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black font-heading leading-tight block">
                      {item.label}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400/70 uppercase tracking-wider block">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER GUILD MASTER CARD */}
      <div className="pt-4 border-t border-emerald-500/20 space-y-3">
        <div className="bg-[#06241a]/90 p-3 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 flex-shrink-0">
              <div className="w-full h-full bg-[#051912] rounded-[10px] flex items-center justify-center text-sm font-black text-amber-300">
                SJ
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-white font-heading leading-tight">Prof. Sarah Jenkins</h4>
              <p className="text-[10px] font-bold text-emerald-400/80">Class 8-A & 8-B Lead</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
            title="Exit Educator Portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="text-[10px] text-center text-emerald-400/60 font-bold">
          EcoQuest v3.0 • Educator Suite
        </div>
      </div>

    </aside>
  );
}
