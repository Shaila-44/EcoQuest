import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Target, 
  Trophy, 
  Award, 
  Users, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';

export default function QuickActions({ 
  onOpenUploadModal, 
  onNavigateTab 
}) {
  const actions = [
    {
      id: 'upload',
      title: 'Upload Proof',
      desc: 'Submit photo or video of today\'s eco action',
      icon: Camera,
      badge: '+350 XP',
      gradient: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200/80',
      onClick: onOpenUploadModal
    },
    {
      id: 'missions',
      title: 'Browse Missions',
      desc: '15+ daily & weekly eco challenges available',
      icon: Target,
      badge: '15 Active',
      gradient: 'from-teal-500 to-emerald-600',
      bgGlow: 'bg-teal-500/10',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-200/80',
      onClick: () => onNavigateTab('missions')
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      desc: 'Check rank #4 in Class & school top standings',
      icon: Trophy,
      badge: '#4 Class',
      gradient: 'from-amber-500 to-orange-500',
      bgGlow: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200/80',
      onClick: () => onNavigateTab('leaderboard')
    },
    {
      id: 'achievements',
      title: 'Achievements',
      desc: 'View 24 unlocked eco badges & trophies',
      icon: Award,
      badge: '24/32',
      gradient: 'from-purple-500 to-emerald-600',
      bgGlow: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200/80',
      onClick: () => onNavigateTab('achievements')
    },
    {
      id: 'community',
      title: 'Community Feed',
      desc: 'Share posts, like & gift seeds to classmates',
      icon: Users,
      badge: 'New Posts',
      gradient: 'from-sky-500 to-teal-600',
      bgGlow: 'bg-sky-500/10',
      iconColor: 'text-sky-600',
      borderColor: 'border-sky-200/80',
      onClick: () => onNavigateTab('community')
    },
    {
      id: 'store',
      title: 'Eco Store',
      desc: 'Redeem 1,280 Eco Coins for real tree certs',
      icon: ShoppingBag,
      badge: '1,280 🪙',
      gradient: 'from-emerald-600 to-lime-600',
      bgGlow: 'bg-lime-500/10',
      iconColor: 'text-emerald-700',
      borderColor: 'border-emerald-300/80',
      onClick: () => onNavigateTab('store')
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight flex items-center gap-2">
            <span>Quick Actions</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Choose what you'd like to do in your eco command center today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={action.onClick}
              className={`glass-card p-5 rounded-3xl border ${action.borderColor} hover-card-lift cursor-pointer relative overflow-hidden group`}
            >
              {/* ACCENT BACKGROUND GLOW */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${action.bgGlow} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

              <div className="flex items-start justify-between mb-4 relative z-10">
                {/* LARGE ICON CONTAINER */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${action.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* BADGE */}
                <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-200 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-colors">
                  {action.badge}
                </span>
              </div>

              {/* CARD TITLE & DESCRIPTION */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 font-heading flex items-center justify-between group-hover:text-emerald-700 transition-colors">
                  <span>{action.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-transform" />
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {action.desc}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
