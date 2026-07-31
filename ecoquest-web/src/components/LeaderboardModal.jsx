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
    { rank: 1, name: 'Delhi Public School (R.K. Puram)', region: 'Delhi', xp: 48920, actions: 1240, badge: '🥇 Gold' },
    { rank: 2, name: "St. Xavier's High School", region: 'Maharashtra', xp: 42150, actions: 980, badge: '🥈 Silver' },
    { rank: 3, name: 'National Public School (Indiranagar)', region: 'Karnataka', xp: 39800, actions: 890, badge: '🥉 Bronze' },
    { rank: 4, name: 'DAV Public School', region: 'Punjab', xp: 34200, actions: 760, badge: 'Top 5%' },
    { rank: 5, name: 'Kendriya Vidyalaya (IIT Campus)', region: 'Tamil Nadu', xp: 31950, actions: 710, badge: 'Top 5%' },
    { rank: 6, name: 'The Doon School', region: 'Uttarakhand', xp: 28400, actions: 640, badge: 'Top 10%' },
    { rank: 7, name: 'Hyderabad Public School (Begumpet)', region: 'Telangana', xp: 26100, actions: 590, badge: 'Top 10%' },
    { rank: 8, name: 'Loyola High School', region: 'West Bengal', xp: 24800, actions: 550, badge: 'Top 15%' },
    { rank: 9, name: 'City Montessori School', region: 'Uttar Pradesh', xp: 23150, actions: 510, badge: 'Top 15%' },
    { rank: 10, name: 'Modern School (Barakhamba Road)', region: 'Delhi', xp: 21900, actions: 480, badge: 'Top 20%' }
  ];

  const filteredData = fullSchoolData.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'All' || s.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card max-w-4xl w-full p-6 sm:p-8 rounded-3xl border border-white/90 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Full School Rankings
            </h3>
            <p className="text-xs text-slate-500">Live points across 480+ participating institutions</p>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search school name or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white text-slate-700"
            >
              <option value="All">All Regions</option>
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
        <div className="overflow-y-auto flex-1 border border-slate-200 rounded-2xl bg-white shadow-inner">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">School</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Verified Actions</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredData.map((s) => (
                <tr key={s.rank} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-black">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold ${
                      s.rank === 1 ? 'bg-amber-400 text-amber-950' :
                      s.rank === 2 ? 'bg-slate-200 text-slate-800' :
                      s.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{s.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{s.region}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-semibold">{s.actions.toLocaleString()} Actions</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-xs">
                      {s.xp.toLocaleString()} XP
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredData.length} top ranked schools</span>
          <button onClick={onClose} className="btn-secondary py-1.5 px-4 text-xs">
            Close Leaderboard
          </button>
        </div>

      </div>
    </div>
  );
}
