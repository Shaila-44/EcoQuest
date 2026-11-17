import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Trophy, 
  Crown, 
  Globe, 
  Building2, 
  Award, 
  TrendingUp 
} from 'lucide-react';

export default function LeaderboardModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');

  if (!isOpen) return null;

  const fullSchoolData = [
    { rank: 1, name: 'Delhi Public School (R.K. Puram)', region: 'Delhi Sanctuary', xp: 48920, actions: 1240, badge: '🥇 Gold' },
    { rank: 2, name: "St. Xavier's Guild School", region: 'Maharashtra Sanctuary', xp: 42150, actions: 980, badge: '🥈 Silver' },
    { rank: 3, name: 'National Public Guild (Indiranagar)', region: 'Karnataka Sanctuary', xp: 39800, actions: 890, badge: '🥉 Bronze' },
    { rank: 4, name: 'DAV Public Academy', region: 'Punjab Sanctuary', xp: 34200, actions: 760, badge: 'Top 5%' },
    { rank: 5, name: 'Kendriya Vidyalaya (IIT Sanctuary)', region: 'Tamil Nadu Sanctuary', xp: 31950, actions: 710, badge: 'Top 5%' },
    { rank: 6, name: 'The Doon Guild School', region: 'Uttarakhand Sanctuary', xp: 28400, actions: 640, badge: 'Top 10%' },
    { rank: 7, name: 'Hyderabad Public Guild (Begumpet)', region: 'Telangana Sanctuary', xp: 26100, actions: 590, badge: 'Top 10%' },
    { rank: 8, name: 'Loyola Guild Academy', region: 'West Bengal Sanctuary', xp: 24800, actions: 550, badge: 'Top 15%' },
    { rank: 9, name: 'City Montessori Sanctuary', region: 'Uttar Pradesh Sanctuary', xp: 23150, actions: 510, badge: 'Top 15%' },
    { rank: 10, name: 'Modern Guild School', region: 'Delhi Sanctuary', xp: 21900, actions: 480, badge: 'Top 20%' }
  ];

  const filteredData = fullSchoolData.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All' || s.region.includes(regionFilter);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card max-w-4xl w-full p-6 sm:p-8 rounded-[32px] border border-emerald-500/40 shadow-2xl relative max-h-[90vh] flex flex-col bg-[#072218]/95 text-slate-100">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
            <Trophy className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white font-heading">
              Hall of Champions Standings
            </h3>
            <p className="text-xs text-emerald-300/80 font-bold">Live points across 480+ participating sanctuaries</p>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sanctuary name or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-emerald-500/30 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 bg-[#04160d]"
            >
              <option value="All">All Sanctuary Regions</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Punjab">Punjab</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Telangana">Telangana</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>
        </div>

        {/* TABLE LIST */}
        <div className="overflow-y-auto flex-1 border border-emerald-500/30 rounded-2xl bg-[#04160d] shadow-inner">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-emerald-950 text-emerald-300 text-[11px] font-black uppercase tracking-wider border-b border-emerald-500/30">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Sanctuary</th>
                <th className="py-3.5 px-4">Region</th>
                <th className="py-3.5 px-4">Verified Quests</th>
                <th className="py-3.5 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10 text-xs font-bold text-slate-200">
              {filteredData.map((s) => (
                <tr key={s.rank} className="hover:bg-emerald-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-black">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black ${
                      s.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md' :
                      s.rank === 2 ? 'bg-slate-300 text-slate-950' :
                      s.rank === 3 ? 'bg-amber-600 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      #{s.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-white">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300/70">{s.region}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-bold">{s.actions.toLocaleString()} Quests</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full text-xs border border-amber-400/40">
                      {s.xp.toLocaleString()} XP
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-300 font-bold">
          <span>Showing {filteredData.length} top ranked sanctuaries</span>
          <button onClick={onClose} className="px-4 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-black hover:bg-emerald-900 transition-all cursor-pointer">
            Close Standings
          </button>
        </div>

      </div>
    </div>
  );
}

