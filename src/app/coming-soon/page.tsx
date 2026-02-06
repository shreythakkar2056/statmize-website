'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Rocket } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Saving to a specific launch-day collection
      await addDoc(collection(db, "launch_day_waitlist"), {
        email,
        timestamp: serverTimestamp(),
        source: 'Coming Soon - First Launch'
      });
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error("Firebase Error:", err);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* --- PREMIUM AMBIENT BACKGROUND --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full animate-pulse" />

      {/* --- CONTENT CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Logo */}
        <div className="relative w-48 h-12 mb-16 mx-auto">
          <Image src="/logo.png" alt="Statmize" fill className="object-contain" priority />
        </div>

        {/* First Launch Messaging */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
        >
          
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none uppercase">
                COMING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">
                    SOON.
                </span>
            </h1>

            <p className="text-gray-400 max-w-md mx-auto text-lg md:text-xl leading-relaxed mb-12 font-medium">
                The new standard for athletic precision is arriving. Be part of the first generation of Statmize athletes.
            </p>
        </motion.div>

        {/* --- EARLY ACCESS FORM --- */}
        <div className="max-w-md mx-auto relative group">
          {status === 'success' ? (
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-4 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center gap-3 text-[#4ADE80] font-black italic"
            >
              <CheckCircle size={20} /> YOU&apos;RE ON THE LIST.
            </motion.div>
          ) : (
            <form onSubmit={handleNotify} className="relative">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for early access invite"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white outline-none focus:border-[#A06CD5] transition-all placeholder:text-gray-600 font-bold"
              />
              <button 
                disabled={status === 'loading'}
                className="absolute right-2 top-2 bottom-2 px-5 bg-white text-black rounded-xl font-black hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-500 text-xs mt-2 font-bold uppercase italic">Network error. Try again.</p>}
        </div>

        {/* --- LAUNCH FOOTER --- */}
        <div className="mt-24 space-y-4">
            <div className="flex items-center justify-center gap-4 text-gray-700">
                <div className="h-[1px] w-8 bg-gray-800" />
                {/* <span className="text-[10px] font-black uppercase tracking-[0.4em]">Spring 2026</span> */}
                <div className="h-[1px] w-8 bg-gray-800" />
            </div>
            <div className="text-[10px] font-bold text-gray-500 opacity-50 uppercase tracking-widest">
                Designed for Elite Performance • © Statmize India
            </div>
        </div>
      </motion.div>
    </main>
  );
}