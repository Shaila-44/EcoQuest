import React from 'react';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  Recycle, 
  Wind, 
  Droplets, 
  CheckCheck, 
  Sparkles,
  Globe2
} from 'lucide-react';

export default function ImpactSummary() {
  const impacts = [
    {
      id: 'trees',
      val: '14 Trees',
      sub: 'Planted & Maintained',
      desc: 'Produces ~420 kg of fresh oxygen yearly',
      icon: TreePine,
      color: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'plastic',
      val: '38 kg Plastic',
      sub: 'Diverted from Landfill',
      desc: 'Saves 1,200 marine species habitats',
      icon: Recycle,
      color: 'from-teal-500 to-emerald-700',
      bgGlow: 'bg-teal-500/10',
      borderColor: 'border-teal-200'
    },
    {
      id: 'co2',
      val: '124 kg CO₂',
      sub: 'Emissions Reduced',
      desc: 'Equivalent to 520 km of clean car offset',
      icon: Wind,
      color: 'from-sky-500 to-teal-600',
      bgGlow: 'bg-sky-500/10',
      borderColor: 'border-sky-200'
    },
    {
      id: 'water',
      val: '650 Liters',
      sub: 'Water Conserved',
      desc: 'Via rainwater harvesting & low-flow habits',
      icon: Droplets,
      color: 'from-blue-500 to-teal-600',
      bgGlow: 'bg-blue-500/10',
      borderColor: 'border-blue-200'
    },
    {
      id: 'quests',
      val: '42 Quests',
      sub: 'Total Completed',
      desc: '100% verified eco action history',
      icon: CheckCheck,
      color: 'from-purple-500 to-emerald-600',
      bgGlow: 'bg-purple-500/10',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <section className="space-y-4">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>REAL-WORLD METRICS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight">
            Your Real Environmental Impact
          </h2>
        </div>

        <span className="hidden sm:inline-block text-xs font-bold text-slate-500">
          Verified by EcoQuest AI & Teachers
        </span>
      </div>

      {/* INFOGRAPHIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {impacts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`glass-card p-5 rounded-3xl border ${item.borderColor} hover-card-lift relative overflow-hidden flex flex-col justify-between`}
            >
              {/* ACCENT GLOW */}
              <div className={`absolute -top-6 -right-6 w-20 h-20 ${item.bgGlow} rounded-full blur-xl pointer-events-none`} />

              <div>
                {/* ICON EMBLEM */}
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* METRIC VALUE */}
                <h3 className="text-xl font-black text-slate-900 font-heading tracking-tight">
                  {item.val}
                </h3>
                <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                  {item.sub}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-[11px] text-slate-500 font-medium leading-tight pt-3 border-t border-slate-100 mt-3">
                {item.desc}
              </p>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
