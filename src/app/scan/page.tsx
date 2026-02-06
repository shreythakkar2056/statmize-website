'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  Activity, 
  ArrowRight,
  Play,
  Loader2 // Import for loading spinner
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ScanPage() {
  // Lazy Load State
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const coreFeatures = [
    { 
      title: "How fast you move", 
      desc: "Measured instantly by our 9-axis sensor array.", 
      icon: TrendingUp, 
      color: "text-cyan-400", 
      bg: "bg-cyan-400/10 border-cyan-400/20" 
    },
    { 
      title: "How clean your movement is", 
      desc: "Biomechanics analysis for perfect form.", 
      icon: Target, 
      color: "text-yellow-400", 
      bg: "bg-yellow-400/10 border-yellow-400/20" 
    },
    { 
      title: "How to improve next time", 
      desc: "AI Coach delivers personalized drills.", 
      icon: BrainCircuit, 
      color: "text-[#4ADE80]", 
      bg: "bg-[#4ADE80]/10 border-[#4ADE80]/20" 
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#A06CD5] overflow-x-hidden">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#A06CD5]/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#4ADE80]/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* --- 1. BRAND IDENTITY --- */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="mb-12 text-center"
        >
          <div className="relative w-40 h-10 md:w-56 md:h-14 mx-auto mb-6">
            <Image 
              src="/logo.png" 
              alt="Statmize" 
              fill 
              className="object-contain" 
              sizes="(max-width: 768px) 100vw, 33vw"
              priority 
            />
          </div>
        </motion.div>

        {/* --- 2. HERO SECTION --- */}
        <div className="flex flex-col md:flex-row items-center gap-12 w-full mb-20">
            {/* Visual */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="w-full md:w-1/2 flex justify-center relative"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-[#A06CD5]/20 to-transparent blur-3xl rounded-full" />
               <motion.div 
                 animate={{ y: [-15, 15, -15] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10 w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
               >
                  <Image 
                    src="/band.png" 
                    alt="Statmize Band" 
                    fill 
                    className="object-contain drop-shadow-[0_0_60px_rgba(160,108,213,0.5)]" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority // FIX: Solves LCP Warning
                  />
               </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
               initial="hidden" animate="visible" variants={stagger}
               className="w-full md:w-1/2 text-center md:text-left"
            >
               <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">
                    Performance Partner.
                  </span>
               </motion.h1>
               <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                  We help athletes understand their performance <br />
                  <strong className="text-white border-b border-[#4ADE80]">not guess it.</strong>
               </motion.p>
               <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button className="w-full bg-white text-black font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                       Get Early Access <ArrowRight size={18} />
                    </button>
                  </Link>
               </motion.div>
            </motion.div>
        </div>

        {/* --- 3. VIDEO DEMO SECTION (Lazy Loaded) --- */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "200px" }} // Triggers 200px before viewing
           onViewportEnter={() => setShouldLoadVideo(true)} // Sets state to true
           transition={{ duration: 0.8 }}
           className="w-full mb-20"
        >
           {/* <h3 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
             See it in action <Play size={20} className="text-[#4ADE80] fill-[#4ADE80]" />
           </h3> */}
           <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl shadow-[#A06CD5]/20 group">
              
              {shouldLoadVideo ? (
                /* Only renders when near viewport */
                <video 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster="/band.png"
                >
                  {/* Make sure demo.mp4 is in your public/ folder */}
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* Lightweight Placeholder */
                <div className="w-full h-full relative">
                    <Image src="/band.png" alt="Loading Video" fill className="object-contain opacity-50 blur-sm scale-75" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-[#A06CD5]" size={32} />
                    </div>
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
           </div>
           {/* <p className="text-center text-gray-500 text-xs mt-4 uppercase tracking-widest">
              Autoplay enabled • 100% Real Gameplay Data
           </p> */}
        </motion.div>

        {/* --- 4. CORE FEATURES (Grid) --- */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="w-full"
        >
           <motion.h3 variants={fadeInUp} className="text-center text-2xl font-bold mb-10">What We Do</motion.h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreFeatures.map((feat, i) => (
                 <motion.div 
                   key={i} 
                   variants={fadeInUp}
                   whileHover={{ y: -5 }}
                   className={`p-8 rounded-3xl border ${feat.bg} backdrop-blur-sm flex flex-col items-center text-center md:items-start md:text-left transition-all`}
                 >
                    <div className="p-3 rounded-xl bg-black/40 mb-4">
                       <feat.icon size={28} className={feat.color} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{feat.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                 </motion.div>
              ))}
           </div>
        </motion.div>

        {/* --- 5. FOOTER / MISSION --- */}
        <motion.div 
           initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}
           className="mt-24 text-center border-t border-white/10 pt-10 w-full"
        >
           <p className="text-[#A06CD5] text-xs uppercase tracking-[0.2em] font-black mb-6 flex items-center justify-center gap-2">
             <Zap size={14} /> In simple words
           </p>
           <p className="text-xl md:text-3xl font-medium text-white max-w-4xl mx-auto leading-relaxed">
              "When athletes train, a lot happens in seconds." <br/>
              <span className="text-gray-400">
                STATMIZE helps you understand what your body is doing and how to improve it.
              </span>
           </p>
           <div className="mt-16 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Designed in India • © 2026 Statmize
           </div>
        </motion.div>

      </div>
    </main>
  );
}