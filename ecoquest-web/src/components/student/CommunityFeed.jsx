import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Sprout, 
  Send,
  PlusCircle,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommunityFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Patel',
      class: 'Class 8-B',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      action: 'Planted 3 Neem Saplings 🌳',
      desc: 'Planted 3 neem saplings in the school herbal garden today with my eco club team! Excited to watch them grow! #EcoQuest #GreenSchool',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      likes: 142,
      isLiked: false,
      comments: 18,
      xpEarned: '+250 XP',
      seedsGifted: 24,
      verified: true,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Aarav Sharma',
      class: 'Class 9-A',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      action: 'Neighborhood Cleanup Drive 🌊',
      desc: 'Organized a neighborhood beach cleanup drive this morning! Collected 12kg of single-use plastic waste and segregated recyclables.',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      likes: 210,
      isLiked: true,
      comments: 34,
      xpEarned: '+500 XP',
      seedsGifted: 42,
      verified: true,
      time: '4 hours ago'
    }
  ]);

  const [giftToast, setGiftToast] = useState(null);

  const handleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const handleGiftSeeds = (post) => {
    setPosts(posts.map(p => p.id === post.id ? { ...p, seedsGifted: p.seedsGifted + 10 } : p));
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#f59e0b']
    });

    setGiftToast(`You gifted 10 Eco Seeds 🌱 to ${post.author}!`);
    setTimeout(() => setGiftToast(null), 3000);
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-emerald-100/90 shadow-xl space-y-6 relative hover-card-lift">
      
      {/* GIFT TOAST NOTIFICATION */}
      <AnimatePresence>
        {giftToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-6 z-50 bg-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <Sprout className="w-4 h-4 fill-emerald-200" />
            <span>{giftToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>STUDENT ECO ACTIVITY FEED</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 font-heading">Eco Community Activity</h3>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <PlusCircle className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* POSTS FEED */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm overflow-hidden space-y-4 hover:shadow-md transition-shadow"
          >
            {/* POST AUTHOR HEADER */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-900 font-heading">{post.author}</h4>
                    {post.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Eco Action
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-slate-500">{post.class} • {post.time}</p>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-xs">
                {post.xpEarned}
              </span>
            </div>

            {/* POST CAPTION */}
            <div className="px-4 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              <div className="font-extrabold text-emerald-800 mb-1">{post.action}</div>
              {post.desc}
            </div>

            {/* POST IMAGE */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-2xl mx-4 max-w-[calc(100%-2rem)]">
              <img
                src={post.image}
                alt={post.action}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* POST FOOTER ACTIONS */}
            <div className="p-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-4">
                
                {/* LIKE BUTTON */}
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-black transition-colors cursor-pointer ${
                    post.isLiked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                {/* COMMENTS */}
                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments} Comments</span>
                </button>

              </div>

              {/* GIFT SEEDS BUTTON */}
              <button
                onClick={() => handleGiftSeeds(post)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sprout className="w-3.5 h-3.5 fill-emerald-200" />
                <span>Gift Seeds ({post.seedsGifted})</span>
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
