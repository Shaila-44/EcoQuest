import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Shirt, 
  Palmtree, 
  Bird, 
  Frame, 
  Sun, 
  Layers, 
  X, 
  ChevronRight, 
  Award, 
  Lock,
  ArrowUpRight,
  Flame
} from 'lucide-react';

export default function ExplorerShop() {
  const [userCoins, setUserCoins] = useState(1280);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductDrawer, setSelectedProductDrawer] = useState(null);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState(null);
  const [ownedItems, setOwnedItems] = useState(['p2', 'p4', 'p9']); // Default owned items

  // Shop Categories
  const categories = [
    { id: 'all', label: 'All Items', icon: Sparkles, count: 27 },
    { id: 'outfits', label: '🎨 Outfits & Apparel', icon: Shirt, count: 6 },
    { id: 'decor', label: '🏝 Island Decor', icon: Palmtree, count: 7 },
    { id: 'wildlife', label: '🐾 Wildlife Companions', icon: Bird, count: 6 },
    { id: 'profile', label: '🖼 Profile Customization', icon: Frame, count: 5 },
    { id: 'themes', label: '🌤 Environment Themes', icon: Sun, count: 3 },
  ];

  // Expanded Shop Products Database (27 Items)
  const products = [
    // 🎨 OUTFITS & APPAREL
    {
      id: 'p3',
      title: 'Bioluminescent Ranger Uniform',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 850,
      icon: '🧥',
      badge: 'Featured',
      description: 'A futuristic eco-ranger uniform with bioluminescent leafy accents.',
      inspiration: 'Inspired by natural bioluminescent algae found in deep ocean sanctuaries.',
      previewType: 'Avatar Outfit'
    },
    {
      id: 'p9',
      title: 'Solar Pioneer Jacket & Goggles',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 600,
      icon: '🥼',
      badge: 'Owned',
      description: 'High-tech explorer jacket equipped with mini solar sensors and protective goggles.',
      inspiration: 'Promotes clean renewable energy exploration.',
      previewType: 'Avatar Outfit'
    },
    {
      id: 'p10',
      title: 'Ocean Guardian Diving Suit',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 700,
      icon: '🤿',
      badge: 'Popular',
      description: 'Waterproof sanctuary diving suit designed for marine habitat restoration.',
      inspiration: 'Inspired by ocean cleanup expeditions.',
      previewType: 'Avatar Outfit'
    },
    {
      id: 'p11',
      title: 'Botanic Researcher Cloak',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 500,
      icon: '🥻',
      description: 'Traditional woven cloak embroidered with native wildflower patterns.',
      inspiration: 'Honors traditional indigenous botany knowledge.',
      previewType: 'Avatar Outfit'
    },
    {
      id: 'p12',
      title: 'Eco-Hero Wings & Emblem',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 950,
      icon: '🦹‍♂️',
      badge: 'Exclusive',
      description: 'Shimmering emerald wings crafted from recycled solar fabric.',
      inspiration: 'Symbolizes rising above environmental challenges.',
      previewType: 'Avatar Outfit'
    },
    {
      id: 'p13',
      title: 'Rainforest Explorer Backpack',
      category: 'outfits',
      categoryLabel: 'Outfit',
      rarity: 'common',
      rarityLabel: 'Common ⚪',
      price: 300,
      icon: '🎒',
      description: 'Heavy-duty recycled canvas backpack for carrying saplings and cleanup gear.',
      inspiration: 'Promotes zero-waste travel habits.',
      previewType: 'Avatar Accessory'
    },

    // 🏝 ISLAND DECOR
    {
      id: 'p1',
      title: 'Golden Ancient Oak Tree',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 1200,
      icon: '🌳',
      badge: 'Limited Edition 24h',
      description: 'A majestic golden oak tree that radiates warm sunlight over your Sanctuary Island.',
      inspiration: 'Ancient oak trees support over 2,300 species of wildlife in real ecosystems.',
      previewType: 'Island Decor'
    },
    {
      id: 'p4',
      title: 'Bioluminescent Algae Lamp',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 350,
      icon: '🏮',
      badge: 'Owned',
      description: 'Emits a soft ambient glow on your island powered purely by algae.',
      inspiration: 'Reduces electricity consumption while creating an enchanting night glow.',
      previewType: 'Island Decor'
    },
    {
      id: 'p5',
      title: 'Crystal Turtle Sanctuary Fountain',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 650,
      icon: '🐢',
      badge: 'New Arrival',
      description: 'A crystal water fountain surrounded by rescued sea turtles.',
      inspiration: 'Protects marine life and creates a freshwater drinking basin for island fauna.',
      previewType: 'Island Fountain'
    },
    {
      id: 'p14',
      title: 'Recycled Bamboo Archway',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 400,
      icon: '⛩️',
      description: 'A handcrafted bamboo archway covered in flowering jasmine vines.',
      inspiration: 'Bamboo is one of the fastest-growing renewable plant materials on Earth.',
      previewType: 'Island Archway'
    },
    {
      id: 'p15',
      title: 'Solar Panel Array Pavilion',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 800,
      icon: '🎛️',
      badge: 'Clean Energy',
      description: 'A clean energy canopy that powers your island lanterns.',
      inspiration: 'Demonstrates real-world solar energy harvesting.',
      previewType: 'Island Pavilion'
    },
    {
      id: 'p16',
      title: 'Windmill Lookout Tower',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 950,
      icon: '🎡',
      description: 'A rustic wooden windmill tower providing panoramic views of your sanctuary.',
      inspiration: 'Harnesses natural wind currents for clean power generation.',
      previewType: 'Island Structure'
    },
    {
      id: 'p17',
      title: 'Wildflower Stone Path',
      category: 'decor',
      categoryLabel: 'Island Decor',
      rarity: 'common',
      rarityLabel: 'Common ⚪',
      price: 250,
      icon: '🪨',
      description: 'Cobblestone garden walkway lined with native clover flowers.',
      inspiration: 'Prevents soil erosion along sanctuary footpaths.',
      previewType: 'Island Path'
    },

    // 🐾 WILDLIFE COMPANIONS
    {
      id: 'p2',
      title: 'Baby Forest Owl Companion',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 750,
      icon: '🦉',
      badge: 'Owned',
      description: 'A wise nocturnal owl companion that perches on your island treehouse.',
      inspiration: 'Owls are natural controllers of agricultural pests, maintaining ecological equilibrium.',
      previewType: 'Island Companion'
    },
    {
      id: 'p8',
      title: 'Mystic Forest Fox Companion',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 800,
      icon: '🦊',
      badge: 'Popular',
      description: 'A playful forest fox companion that trots around your sanctuary paths.',
      inspiration: 'Foxes play a vital role in seed dispersal across woodland ecosystems.',
      previewType: 'Island Companion'
    },
    {
      id: 'p18',
      title: 'Monarch Butterfly Swarm',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 500,
      icon: '🦋',
      description: 'A flutter of orange monarch butterflies that pollinates your sanctuary garden.',
      inspiration: 'Monarch butterflies migrate thousands of miles every year.',
      previewType: 'Island Swarm'
    },
    {
      id: 'p19',
      title: 'Playful River Otter',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 700,
      icon: '🦦',
      badge: 'New',
      description: 'An adorable river otter that swims in your sanctuary ponds.',
      inspiration: 'River otters are key indicators of healthy freshwater ecosystems.',
      previewType: 'Aquatic Pet'
    },
    {
      id: 'p20',
      title: 'Emerald Parrot Companion',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 600,
      icon: '🦜',
      description: 'A vibrant tropical parrot that perches on your shoulder.',
      inspiration: 'Parrots assist rainforest regeneration through seed propagation.',
      previewType: 'Avian Pet'
    },
    {
      id: 'p21',
      title: 'Gentle Giant Land Tortoise',
      category: 'wildlife',
      categoryLabel: 'Wildlife Companion',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 850,
      icon: '🐢',
      description: 'An ancient land tortoise that wanders peacefully through your flora.',
      inspiration: 'Tortoises can live over 150 years as keystone species.',
      previewType: 'Island Pet'
    },

    // 🖼 PROFILE CUSTOMIZATION
    {
      id: 'p6',
      title: 'Emerald Guardian Profile Frame',
      category: 'profile',
      categoryLabel: 'Profile Customization',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 400,
      icon: '🖼',
      description: 'An animated glowing emerald frame for your public Hall of Champions profile card.',
      inspiration: 'Displays your commitment to green sanctuary protection.',
      previewType: 'Profile Frame'
    },
    {
      id: 'p22',
      title: 'Solar Aura Animated Nameplate',
      category: 'profile',
      categoryLabel: 'Profile Customization',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 500,
      icon: '✨',
      badge: 'Popular',
      description: 'A golden sunbeam animation around your adventurer nameplate.',
      inspiration: 'Honors students who lead energy saving campaigns.',
      previewType: 'Nameplate Effect'
    },
    {
      id: 'p23',
      title: 'Golden Leaf Avatar Ring',
      category: 'profile',
      categoryLabel: 'Profile Customization',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 350,
      icon: '🪙',
      description: 'A circular wreath of golden autumn leaves encasing your avatar photo.',
      inspiration: 'Celebrates seasonal tree planting drives.',
      previewType: 'Avatar Ring'
    },
    {
      id: 'p24',
      title: 'Ocean Wave Profile Backdrop',
      category: 'profile',
      categoryLabel: 'Profile Customization',
      rarity: 'rare',
      rarityLabel: 'Rare 🔵',
      price: 450,
      icon: '🌊',
      description: 'A dynamic flowing ocean wave card background for your profile.',
      inspiration: 'Dedicated to marine ecosystem restoration heroes.',
      previewType: 'Card Backdrop'
    },
    {
      id: 'p25',
      title: 'Champion Star Badge Crest',
      category: 'profile',
      categoryLabel: 'Profile Customization',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 600,
      icon: '⭐',
      description: 'A glowing star emblem displayed next to your username.',
      inspiration: 'Recognizes consistent daily quest streaks.',
      previewType: 'Profile Crest'
    },

    // 🌤 ENVIRONMENT THEMES
    {
      id: 'p7',
      title: 'Sunset Paradise Environment Theme',
      category: 'themes',
      categoryLabel: 'Environment Theme',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 900,
      icon: '🌅',
      badge: 'Popular',
      description: 'Transforms your Sanctuary Island sky into a breathtaking golden sunset glow.',
      inspiration: 'Creates a calming atmosphere for student environmental reflection.',
      previewType: 'Island Atmosphere'
    },
    {
      id: 'p26',
      title: 'Bioluminescent Night Forest Theme',
      category: 'themes',
      categoryLabel: 'Environment Theme',
      rarity: 'legendary',
      rarityLabel: 'Legendary 🟡',
      price: 1100,
      icon: '🌌',
      badge: 'Top Rated',
      description: 'Bathes your island in glowing deep teal & violet bioluminescent lighting.',
      inspiration: 'Simulates nocturnal forest ecosystems under star-lit skies.',
      previewType: 'Island Skybox'
    },
    {
      id: 'p27',
      title: 'Autumn Canopy Festival Theme',
      category: 'themes',
      categoryLabel: 'Environment Theme',
      rarity: 'epic',
      rarityLabel: 'Epic 🟣',
      price: 850,
      icon: '🍁',
      description: 'Fills your island atmosphere with drifting golden autumn leaves and warm breezes.',
      inspiration: 'Celebrates fall harvest and seed collection season.',
      previewType: 'Island Weather'
    }
  ];

  // Purchase Handler
  const handlePurchase = (product) => {
    if (ownedItems.includes(product.id)) {
      setPurchaseSuccessMessage(`You already own ${product.title}!`);
      setTimeout(() => setPurchaseSuccessMessage(null), 3000);
      return;
    }

    if (userCoins < product.price) {
      setPurchaseSuccessMessage(`Insufficient Eco Coins! Complete more quests to earn coins.`);
      setTimeout(() => setPurchaseSuccessMessage(null), 3500);
      return;
    }

    // Deduct coins and mark as owned
    setUserCoins((prev) => prev - product.price);
    setOwnedItems((prev) => [...prev, product.id]);
    setPurchaseSuccessMessage(`🎉 Successfully purchased ${product.title}! Added to your collection.`);
    setTimeout(() => setPurchaseSuccessMessage(null), 4000);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-14 pb-24 text-slate-100 font-body">
      
      {/* 1. PAGE HERO SECTION WITH MAGICAL MERCHANT GLOW */}
      <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0c261b] via-[#093223] to-[#04140d] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-emerald-950/60 border border-emerald-500/40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT HERO TEXT & COIN PURSE (7 COLUMNS) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>MAGICAL ECO MARKETPLACE</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
                EXPLORER <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent">SHOP</span> 🛍
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                Spend your hard-earned Eco Coins to personalize your EcoQuest adventure. Unlock rare outfits, island decorations, wildlife companions, and environment themes!
              </p>
            </div>

            {/* LIVE COIN PURSE & SHOP METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="bg-[#041a12]/85 backdrop-blur-md border border-amber-400/50 p-4 rounded-2xl shadow-lg ring-2 ring-amber-400/20">
                <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> Coin Balance
                </div>
                <div className="text-2xl font-black text-amber-300 font-heading mt-1">{userCoins} 🪙</div>
                <span className="text-xs text-amber-200/80 font-bold block mt-0.5">Ready to Spend</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Lifetime Coins</div>
                <div className="text-xl font-black text-white font-heading mt-1">3,450 🪙</div>
                <span className="text-xs text-emerald-300 font-bold block mt-0.5">Earned via Quests</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-teal-300 tracking-wider">Owned Cosmetics</div>
                <div className="text-xl font-black text-teal-200 font-heading mt-1">{ownedItems.length} Items</div>
                <span className="text-xs text-teal-400 font-bold block mt-0.5">In Inventory</span>
              </div>

              <div className="bg-[#041a12]/85 backdrop-blur-md border border-emerald-500/35 p-4 rounded-2xl shadow-sm">
                <div className="text-[11px] font-black uppercase text-orange-300 tracking-wider">Limited Deals</div>
                <div className="text-xl font-black text-orange-400 font-heading mt-1">2 Active 🔥</div>
                <span className="text-xs text-orange-300 font-bold block mt-0.5">Resets in 24h</span>
              </div>

            </div>
          </div>

          {/* RIGHT MERCHANT TREEHOUSE VECTOR ARTWORK (5 COLUMNS) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl animate-float-slow">
                <circle cx="180" cy="180" r="140" fill="#f59e0b" opacity="0.15" />
                <circle cx="180" cy="180" r="110" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 6" />
                
                {/* Wooden Shop Stall Vector */}
                <rect x="90" y="150" width="180" height="120" rx="12" fill="#78350f" stroke="#fbbf24" strokeWidth="4" />
                <path d="M 80 150 L 180 90 L 280 150 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="4" />
                <rect x="120" y="180" width="120" height="90" fill="#451a03" />

                {/* Lanterns */}
                <circle cx="110" cy="170" r="10" fill="#fef08a" />
                <circle cx="250" cy="170" r="10" fill="#fef08a" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STRICT FAIR-PLAY BANNER */}
      <section className="bg-gradient-to-r from-emerald-950/80 via-[#04160d] to-emerald-950/80 border border-emerald-500/40 p-4 rounded-3xl backdrop-blur-md flex items-center justify-between text-xs font-bold shadow-lg">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-slate-200">
            <strong className="text-emerald-300 font-heading">Cosmetics & Customization Only:</strong> Real-world environmental actions earn Eco Coins. No XP, levels, badges, or ranks can be bought!
          </span>
        </div>
      </section>

      {/* PURCHASE NOTIFICATION POPUP */}
      <AnimatePresence>
        {purchaseSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs text-center shadow-xl border-2 border-amber-200"
          >
            {purchaseSuccessMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SHOP CATEGORY SELECTION CHIPS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black uppercase text-emerald-400 tracking-wider font-heading flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Select Marketplace Category</span>
          </h3>
          <span className="text-xs font-extrabold text-slate-400">Showing {filteredProducts.length} Products</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-300 shadow-xl shadow-emerald-500/30 scale-[1.03]'
                    : 'bg-[#08241a] text-slate-300 border-emerald-500/25 hover:border-emerald-400/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. PRIMARY PRODUCTS GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-white font-heading">Marketplace Items</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isOwned = ownedItems.includes(product.id);

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -8, scale: 1.015 }}
                onClick={() => setSelectedProductDrawer(product)}
                className="rounded-[32px] border border-emerald-500/35 bg-gradient-to-br from-[#08291e] to-[#04160d] p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xl transition-all hover:border-emerald-400/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                      {product.rarityLabel}
                    </span>

                    {product.badge && (
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-20 h-20 rounded-3xl bg-[#04160d] border border-emerald-500/30 mx-auto flex items-center justify-center text-4xl shadow-inner mb-4">
                    {product.icon}
                  </div>

                  <h4 className="text-lg font-black text-white font-heading text-center leading-snug">
                    {product.title}
                  </h4>
                  <p className="text-xs text-slate-300 text-center font-medium line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-emerald-500/20 flex items-center justify-between">
                  <div className="text-sm font-black text-amber-300">
                    {product.price} 🪙
                  </div>

                  {isOwned ? (
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Owned
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(product);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-md"
                    >
                      Buy 🪙
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT DETAILS SIDE DRAWER */}
      <AnimatePresence>
        {selectedProductDrawer && (
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
                  {selectedProductDrawer.rarityLabel} {selectedProductDrawer.categoryLabel}
                </span>
                <button
                  onClick={() => setSelectedProductDrawer(null)}
                  className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <div className="w-28 h-28 rounded-3xl bg-[#04160d] border-4 border-emerald-400 mx-auto flex items-center justify-center text-5xl shadow-2xl">
                  {selectedProductDrawer.icon}
                </div>
                <h2 className="text-2xl font-black text-white font-heading">{selectedProductDrawer.title}</h2>
                <div className="text-xl font-black text-amber-300">{selectedProductDrawer.price} Eco Coins 🪙</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-400">Environmental Inspiration</span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  "{selectedProductDrawer.inspiration}"
                </p>
              </div>

              <div className="pt-4">
                {ownedItems.includes(selectedProductDrawer.id) ? (
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-black text-sm cursor-not-allowed"
                  >
                    OWNED IN INVENTORY ✓
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handlePurchase(selectedProductDrawer);
                      setSelectedProductDrawer(null);
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 text-slate-950 font-black text-base shadow-xl hover:scale-[1.02] cursor-pointer"
                  >
                    PURCHASE FOR {selectedProductDrawer.price} 🪙
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
