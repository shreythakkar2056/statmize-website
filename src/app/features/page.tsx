'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Wind, 
  Target, 
  Zap, 
  Activity, 
  Heart, 
  Moon, 
  Cpu, 
  Wifi, 
  Layers, 
  ChevronLeft,
  ArrowRight,
  Bluetooth,
  FileText,
  Split,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- COMPONENT: HERO ---
const FeaturesHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-[#050505] overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ChevronLeft size={16} /> Back to Home
        </Link>
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[#A06CD5] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            Under the Hood
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Precision Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">
              Meets Human Potential
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
             Statmize isn't just a tracker. It's a laboratory on your wrist. 
             Explore the sensor technology and AI algorithms that power your performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- COMPONENT: BENTO GRID FEATURES ---
const FeatureBento = () => {
  return (
    <section className="bg-[#050505] pb-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6"
        >
          
          {/* Item 1: Speed (Large) */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-2 row-span-2 bg-[#121212] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Wind size={300} />
             </div>
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                   <Wind size={28} />
                </div>
                <div>
                   <h3 className="text-3xl font-bold text-white mb-4">Hyper-Accurate Speed Tracking</h3>
                   <p className="text-gray-400 text-lg mb-8 max-w-md">
                      Get precise speed data for every shot, filtered instantly for accuracy.
                   </p>
                   {/* Visualization Mockup */}
                   <div className="w-full h-32 bg-gradient-to-r from-blue-900/20 to-transparent rounded-xl border border-white/5 flex items-end px-4 pb-4 gap-2">
                      {[30, 50, 40, 70, 90, 60, 80, 50].map((h, i) => (
                         <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/50 rounded-t-sm" />
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Item 2: Shot Classification */}
          <motion.div 
            variants={fadeInUp}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 group hover:bg-[#222] transition-colors"
          >
             <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                <BrainCircuit size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Shot Classification</h3>
             <p className="text-gray-400 text-sm">
                Automatically detects shot types like Smashes, Drives, or Drops using AI.
             </p>
          </motion.div>

          {/* Item 3: Forehand/Backhand */}
          <motion.div 
            variants={fadeInUp}
            className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 group hover:bg-[#222] transition-colors"
          >
             <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                <Split size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Forehand vs Backhand</h3>
             <p className="text-gray-400 text-sm">
                Detailed breakdown of your shot distribution and technique data.
             </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

// --- COMPONENT: TECH SPECS (Light Mode) ---
const TechSpecs = () => {
  const specs = [
    { title: "AI Analytic Report", desc: "Deep dive insights after every session.", icon: FileText },
    { title: "Sensors", desc: "High Precision Monitoring Sensors.", icon: Layers },
    { title: "Connectivity", desc: "Bluetooth 5.0 Low Energy.", icon: Bluetooth },
    { title: "Battery", desc: "7-day battery life with rapid charging.", icon: Zap },
  ];

  return (
    <section className="bg-white text-black py-24 px-6 rounded-t-[3rem] -mt-10 relative z-20">
       <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3">
                <h2 className="text-4xl font-bold mb-6">Built for the Elite.</h2>
                <p className="text-gray-600 text-lg">
                   Lightweight, sweat-resistant, and built for the court.
                </p>
             </div>
             
             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {specs.map((s, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start"
                   >
                      <div className="p-3 bg-gray-100 rounded-xl">
                         <s.icon size={24} className="text-black" />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">{s.title}</h4>
                         <p className="text-gray-500">{s.desc}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};

// --- COMPONENT: HEALTH INTEGRATION (Light Mode) ---
const HealthIntegration = () => {
   return (
      <section className="bg-white pb-24 px-6 relative z-20">
         <div className="max-w-7xl mx-auto bg-[#F5F5F7] rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
            
            <div className="relative z-10 max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">A Complete Health Ecosystem</h2>
               <p className="text-gray-600 text-lg mb-8">
                  Athletic performance isn't just about what happens on the court. It's about how you recover.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                     { l: "HRV Tracking", i: Activity, c: "text-purple-500" },
                     { l: "Resting Heart Rate", i: Heart, c: "text-red-500" },
                     { l: "Fatigue Management", i: Moon, c: "text-blue-500" },
                     { l: "Stress Measurement", i: Wind, c: "text-orange-500" }
                  ].map((item, i) => (
                     <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                        <item.i className={item.c} size={20} />
                        {/* Explicit text color for readability */}
                        <span className="font-bold text-sm md:text-base text-gray-900">{item.l}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Decorative abstract visual on right */}
            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 hidden md:block opacity-50">
               <div className="w-[400px] h-[400px] rounded-full border-[40px] border-white/50" />
               <div className="w-[300px] h-[300px] rounded-full border-[40px] border-white/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

         </div>
      </section>
   );
};

// --- COMPONENT: CTA FOOTER ---
const FeaturesCTA = () => {
   return (
      <section className="bg-[#050505] py-24 px-6 rounded-t-[3rem] -mt-10 relative z-30 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
               Experience the Future of Sports
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
               Join the community of athletes using Statmize to redefine their limits.
            </p>
            <Link href="/get-started">
                <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto">
                   Get Your Band <ArrowRight size={20} />
                </button>
            </Link>
         </div>
      </section>
   );
};

export default function FeaturesPage() {
  return (
    <main className="font-sans selection:bg-[#A06CD5] selection:text-white bg-[#050505] min-h-screen">
       <FeaturesHero />
       <FeatureBento />
       <TechSpecs />
       <HealthIntegration />
       <FeaturesCTA />
    </main>
  );
}