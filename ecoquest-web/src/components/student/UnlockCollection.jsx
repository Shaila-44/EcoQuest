import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Crown, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  Search, 
  Filter, 
  Layers, 
  X, 
  ChevronRight, 
  TreePine, 
  Flower2, 
  Bird, 
  Palmtree, 
  ShieldCheck, 
  Calendar, 
  Zap, 
  Globe2, 
  Heart,
  SlidersHorizontal,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export default function UnlockCollection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedItemDrawer, setSelectedItemDrawer] = useState(null);
  const [activeTitle, setActiveTitle] = useState('Nature Legend');

  // Categories
  const categories = [
    { id: 'all', label: 'All Items', icon: Sparkles, count: 32 },
    { id: 'badges', label: '🏅 Badges', icon: Award, count: 12 },
    { id: 'titles', label: '👑 Titles', icon: Crown, count: 6 },
    { id: 'island', label: '🏝 Island Decor', icon: Palmtree, count: 8 },
    { id: 'wildlife', label: '🐾 Wildlife', icon: Bird, count: 4 },
    { id: 'plants', label: '🌳 Native Plants', icon: TreePine, count: 5 },
    { id: 'hidden', label: '✨ Hidden Mystery', icon: Lock, count: 3 },
  ];

  // Collectibles Database
  const collectionData = [
    {
      id: 'c1',
      title: 'Nature Legend',
      category: 'titles',
      categoryLabel: 'Title',
      rarity: 'mythic',
      rarityLabel: 'Mythic 🔴',
      rarityColor: 'from-rose-500 via-purple-500 to-amber-400',
      borderColor: 'border-rose-400/80 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
      unlocked: true,
      dateUnlocked: 'Jan 10, 2026',
      icon: '👑',
      questRequired: 'Achieve Level 15 & Complete 20 Quests',
      description: 'The highest honor bestowed upon guardians who have dedicated their lives to environmental restoration.',
      lore: 'Legends say those who carry this title inspire entire sanctuaries to bloom overnight.'
    },
    {
      id: 'c2',
      title: 'Forest Steward Crest',
      category: 'badges',
      categoryLabel: 'Badge',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      rarityColor: 'from-amber-400 to-yellow-300',
      borderColor: 'border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      unlocked: true,
      dateUnlocked: 'Oct 02, 2025',
      icon: '🏆',
      questRequired: 'Plant a Native Shade Tree Sapling',
      description: 'Awarded for planting native trees and ensuring their long-term survival with protective guards.',
      lore: 'Trees planted under this crest absorb over 22kg of CO₂ annually.'
    },
    {
      id: 'c3',
      title: 'Baby Forest Owl Mascot',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      rarityColor: 'from-amber-400 to-yellow-300',
      borderColor: 'border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
      unlocked: true,
      dateUnlocked: 'Oct 02, 2025',
      icon: '🦉',
      questRequired: 'Plant a Native Shade Tree Sapling',
      description: 'A wise nocturnal guardian that roosts in your Sanctuary Island forest.',
      lore: 'Owls are natural controllers of agricultural pests, maintaining ecological equilibrium.'
    },
    {
      id: 'c4',
      title: 'Bioluminescent Lamp Pillar',
      category: 'island',
      categoryLabel: 'Island Decor',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      rarityColor: 'from-purple-400 to-teal-300',
      borderColor: 'border-purple-400/80 shadow-[0_0_15px_rgba(192,132,252,0.3)]',
      unlocked: true,
      dateUnlocked: 'Nov 15, 2025',
      icon: '🏮',
      questRequired: 'Home Energy Audit & Appliance Unplug',
      description: 'Emits a soft ambient glow on your island powered purely by bioluminescent algae.',
      lore: 'Reduces electricity consumption while creating an enchanting night glow.'
    },
    {
      id: 'c5',
      title: 'Plastic Guardian Badge',
      category: 'badges',
      categoryLabel: 'Badge',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      rarityColor: 'from-sky-400 to-teal-300',
      borderColor: 'border-sky-400/80 shadow-[0_0_12px_rgba(56,189,248,0.2)]',
      unlocked: true,
      dateUnlocked: 'Nov 15, 2025',
      icon: '♻️',
      questRequired: 'Campus Zero-Waste Plastic Drive',
      description: 'Awarded for collecting and segregating single-use plastic waste from waterways and parks.',
      lore: 'Every badge earned represents 1.5kg of plastic diverted from ocean ecosystems.'
    },
    {
      id: 'c6',
      title: 'Wildflower Bee Sanctuary',
      category: 'plants',
      categoryLabel: 'Native Plant',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      rarityColor: 'from-emerald-400 to-teal-300',
      borderColor: 'border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.2)]',
      unlocked: true,
      dateUnlocked: 'Dec 01, 2025',
      icon: '🌸',
      questRequired: 'Pollinator Wildflower Patch Creation',
      description: 'A vibrant patch of native blossoms that attracts bees, butterflies, and hummingbirds.',
      lore: 'Pollinators support 75% of global food crop production.'
    },
    {
      id: 'c7',
      title: 'Songbird Nesting Box',
      category: 'island',
      categoryLabel: 'Island Decor',
      rarity: 'common',
      rarityLabel: 'Common ⚪',
      rarityColor: 'from-slate-400 to-slate-200',
      borderColor: 'border-slate-400/50',
      unlocked: true,
      dateUnlocked: 'Jan 22, 2026',
      icon: '🏠',
      questRequired: 'Build a DIY Backyard Bird Bath',
      description: 'A wooden nesting box providing shelter for urban songbirds.',
      lore: 'Urban nesting boxes increase songbird survival rates by 35% during winter.'
    },
    {
      id: 'c8',
      title: 'Celestial Phoenix Dragon',
      category: 'hidden',
      categoryLabel: 'Hidden Mystery',
      rarity: 'mythic',
      rarityLabel: 'Mythic 🔴',
      rarityColor: 'from-rose-500 to-amber-400',
      borderColor: 'border-slate-800 opacity-60',
      unlocked: false,
      dateUnlocked: 'Locked',
      icon: '❓',
      questRequired: 'Complete All 4 Seasonal Campaigns (Hidden)',
      description: 'A legendary mythical spirit born from pure clean energy.',
      lore: 'Only true Earth Sovereign masters can summon this guardian.'
    }
  ];

  // Filtering Logic
  const filteredItems = collectionData.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedRarity !== 'all' && item.rarity !== selectedRarity) return false;
    return true;
  });

  return (
    <div className="space-y-14 pb-24 text-slate-100 font-body">
      
      {/* 1. PAGE HERO SECTION WITH TREASURE VAULT GLOW */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0c2419] via-[#093223] to-[#04140d] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/60 border border-emerald-500/40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT HERO TEXT & METRICS (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>DIGITAL ECO VAULT & GALLERY</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
                UNLOCK <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">BADGES</span> 🎖
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Every challenge you complete unlocks something new. Collect rare badges, titles, island decorations, wildlife, and hidden mystery items!
              </p>
            </div>

            {/* LIVE COLLECTION METRICS STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Completion</div>
                <div className="text-xl font-black text-white font-heading mt-1">78% Done</div>
                <span className="text-xs text-amber-300 font-bold block mt-0.5">24 / 32 Collected</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">Active Title</div>
                <div className="text-lg font-black text-amber-300 font-heading mt-1 truncate">{activeTitle}</div>
                <span className="text-xs text-amber-200/80 font-bold block mt-0.5">Mythic Tier</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-teal-300 tracking-wider">Rare Unlocks</div>
                <div className="text-xl font-black text-teal-200 font-heading mt-1">5 Items</div>
                <span className="text-xs text-teal-400 font-bold block mt-0.5">Legendary & Mythic</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-orange-300 tracking-wider">Hidden Items</div>
                <div className="text-xl font-black text-orange-400 font-heading mt-1">2 / 5</div>
                <span className="text-xs text-orange-300 font-bold block mt-0.5">3 Mysteries Remain</span>
              </div>

            </div>
          </div>

          {/* RIGHT TREASURE VAULT VECTOR ARTWORK (5 COLUMNS) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl animate-float-slow">
                <circle cx="180" cy="180" r="140" fill="#f59e0b" opacity="0.15" />
                <circle cx="180" cy="180" r="110" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 6" />
                
                {/* 3D Chest Vault Vector */}
                <rect x="100" y="160" width="160" height="110" rx="16" fill="#78350f" stroke="#fbbf24" strokeWidth="4" />
                <path d="M 90 160 Q 180 110 270 160 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="4" />
                <circle cx="180" cy="205" r="14" fill="#fef08a" />
                <rect x="175" y="215" width="10" height="25" fill="#fef08a" />

                {/* Floating Crystals */}
                <polygon points="120,90 135,115 120,140 105,115" fill="#34d399" />
                <polygon points="240,90 255,115 240,140 225,115" fill="#38bdf8" />
              </svg>
            </div>
          </div>

        </div>
      </section>



      {/* 3. RARITY FILTER TOOLBAR */}
      <section className="bg-[#061e15] border border-emerald-500/30 p-5 rounded-[32px] backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-black uppercase text-emerald-400 font-heading">
          Filter by Rarity
        </span>

        <div className="flex flex-wrap items-center gap-2.5">
          {['all', 'common', 'rare', 'epic', 'legendary', 'mythic'].map((rarity) => (
            <button
              key={rarity}
              onClick={() => setSelectedRarity(rarity)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold capitalize cursor-pointer border transition-all ${
                selectedRarity === rarity
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md'
                  : 'bg-[#04160d] text-slate-300 border-emerald-500/30 hover:text-white'
              }`}
            >
              {rarity === 'all' ? 'All Rarities' : rarity}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PRIMARY COLLECTIBLES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-white font-heading">Collection Vault</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedItemDrawer(item)}
              className={`rounded-[32px] border p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xl transition-all bg-gradient-to-br from-[#08291e] to-[#04160d] ${item.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                    {item.rarityLabel}
                  </span>
                  {item.unlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-[#04160d] border border-emerald-500/30 mx-auto flex items-center justify-center text-3xl shadow-inner mb-4">
                  {item.icon}
                </div>

                <h4 className="text-lg font-black text-white font-heading text-center leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 text-center font-medium line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{item.dateUnlocked}</span>
                {item.category === 'titles' && item.unlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTitle(item.title);
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      activeTitle === item.title
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {activeTitle === item.title ? 'Equipped ✓' : 'Equip'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE ITEM INSPECTION SIDE DRAWER */}
      <AnimatePresence>
        {selectedItemDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#062016] border-l border-emerald-500/40 h-full p-8 overflow-y-auto space-y-6 text-slate-100 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 uppercase">
                  {selectedItemDrawer.rarityLabel} Collectible
                </span>
                <button
                  onClick={() => setSelectedItemDrawer(null)}
                  className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-3xl bg-[#04160d] border-4 border-emerald-400 mx-auto flex items-center justify-center text-5xl shadow-2xl">
                  {selectedItemDrawer.icon}
                </div>
                <h2 className="text-2xl font-black text-white font-heading">{selectedItemDrawer.title}</h2>
                <span className="text-xs font-bold text-emerald-300 block">{selectedItemDrawer.categoryLabel}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400">Environmental Lore & Significance</span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  "{selectedItemDrawer.lore}"
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <div className="flex justify-between text-slate-300">
                  <span>Unlock Requirement:</span>
                  <span className="text-emerald-300">{selectedItemDrawer.questRequired}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Date Earned:</span>
                  <span className="text-amber-300">{selectedItemDrawer.dateUnlocked}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedItemDrawer(null)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm cursor-pointer shadow-xl"
                >
                  CLOSE INSPECTION
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
