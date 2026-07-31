import React from 'react';
import { motion } from 'framer-motion';
import { Award, Flame, TreePine, Sparkles } from 'lucide-react';

export default function RewardCard() {
  const cards = [
    {
      id: 1,
      title: '🏆 Badge Unlocked',
      name: 'Planet Protector',
      xp: '+250 XP',
      icon: Award,
      badgeBg: 'bg-gradient-to-tr from-amber-400 to-amber-500 text-amber-950',
      delay: 0,
      yOffset: [0, -8, 0],
    },
    {
      id: 2,
      title: '🔥 12 Day Streak',
      name: 'Keep Going!',
      xp: 'Eco Champion',
      icon: Flame,
      badgeBg: 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white',
      delay: 1.2,
      yOffset: [0, 8, 0],
    },
    {
      id: 3,
      title: '🌱 Level 8',
      name: '2,450 XP Total',
      xp: 'Next Reward in 150 XP',
      icon: TreePine,
      badgeBg: 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white',
      delay: 2.4,
      yOffset: [0, -6, 0],
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full max-w-md">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: card.yOffset
            }}
            transition={{
              opacity: { duration: 0.6, delay: card.delay * 0.2 },
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              },
            }}
            className="glass-card p-3.5 sm:p-4 rounded-2xl border border-white/90 shadow-xl flex items-center justify-between gap-3 backdrop-blur-xl bg-white/80 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${card.badgeBg} flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                  <span>{card.title}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 font-heading">
                  {card.name}
                </div>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-black border border-emerald-300/60 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                {card.xp}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
