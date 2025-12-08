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
  BarChart3, 
  Users, 
  ArrowRight, 
  MapPin,
  Mail,
  Cpu,
  TrendingUp,
  Crosshair,
  Timer
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- HELPER COMPONENT ---
const BatteryFull = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>
);

// --- COMPONENTS ---

// 1. NAVIGATION
const Navigation = () => {
  const navItems = [
    { name: 'Performance', path: '#performance' },
    { name: 'Sports', path: '/sports' },
    { name: 'App', path: '/mobile-app' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto right-0">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png" 
            alt="Statmize Logo"
            width={120} 
            height={30} 
            className="w-auto h-8 md:h-8 object-contain"
            priority
          />
        </Link>
      </div>
      
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
           <Link 
             key={item.name} 
             href={item.path} 
             className="text-white/70 hover:text-white font-medium text-sm transition-colors"
           >
              {item.name}
           </Link>
        ))}
      </div>

      <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
        Get Started
      </button>
    </nav>
  );
};

// 2. HERO SECTION
const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center items-center text-center px-4 pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full" 
        />
      </div>

      <motion.div 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[#4ADE80] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
          Smart Wearable for Athletes
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
          Stop Guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">
            Start Dominating.
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          The first wearable engineered to decode your biomechanics. Track speed, angle, and power in real-time.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                Get Your Band <ArrowRight size={18}/>
            </button>
            <Link href="/features">
                <button className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
                    Explore Technology
                </button>
            </Link>
        </div>
      </motion.div>

      {/* Hero Product Shot */}
      <motion.div 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 1 }}
         className="relative w-full max-w-4xl h-[400px] mt-16 z-10 flex justify-center items-center"
      >
           <motion.div
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
               <Image 
                 src="/band.png" 
                 alt="Statmize Smart Band" 
                 width={600} 
                 height={600}
                 className="w-auto h-[350px] object-contain drop-shadow-[0_0_80px_rgba(74,222,128,0.2)]"
                 priority
               />
           </motion.div>
      </motion.div>
    </section>
  );
};

// 3. NEW: PERFORMANCE CORE (The "Story" Start)
// This replaces the immediate Health section to focus on Performance first.
const PerformanceCore = () => {
  const metrics = [
    {
      title: "Speed Tracking",
      desc: "Measure shot velocity with millisecond precision. Know exactly how fast you strike.",
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10 border-cyan-400/20"
    },
    {
      title: "Angle Analysis",
      desc: "Perfect your form. Our 9-axis sensors map your arm trajectory to find the optimal angle.",
      icon: Crosshair,
      color: "text-[#4ADE80]", // Green
      bg: "bg-[#4ADE80]/10 border-[#4ADE80]/20"
    },
    {
      title: "Power Metrics",
      desc: "Understand the G-force behind every movement. Optimize energy transfer for maximum impact.",
      icon: Zap,
      color: "text-[#A06CD5]", // Purple
      bg: "bg-[#A06CD5]/10 border-[#A06CD5]/20"
    }
  ];

  return (
    <section id="performance" className="bg-[#050505] py-24 px-6 relative z-20">
       <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-16 md:flex justify-between items-end"
          >
             <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Advanced Performance Tracking</h2>
                <p className="text-gray-400 text-lg">
                   Data is the new unfair advantage. We break down your game into the three metrics that matter most.
                </p>
             </div>
             <div className="hidden md:block">
                <div className="w-24 h-1 bg-gradient-to-r from-[#A06CD5] to-[#4ADE80] rounded-full" />
             </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
             {metrics.map((m, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className={`p-8 rounded-3xl border ${m.bg} hover:bg-opacity-20 transition-all cursor-default group`}
                >
                   <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <m.icon size={28} className={m.color} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-3">{m.title}</h3>
                   <p className="text-gray-400 leading-relaxed">{m.desc}</p>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  );
};

// 4. NEW: THE STATMIZE LOOP (Storytelling)
const StatmizeLoop = () => {
  return (
    <section className="bg-[#0A0A0A] py-32 px-6 overflow-hidden relative">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
       
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-bold text-white">The Statmize Loop</h2>
             <p className="text-gray-500 mt-4">How we turn sweat into stats.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

             {[
                { step: "01", title: "Measure", text: "Wear the band during practice. It captures 200 data points per second." },
                { step: "02", title: "Analyze", text: "AI processes your biomechanics instantly to identify flaws." },
                { step: "03", title: "Improve", text: "Get personalized drills to fix your angle, speed, and power." }
             ].map((item, i) => (
                <div key={i} className="relative text-center">
                   <div className="w-24 h-24 mx-auto bg-[#151515] border border-white/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#4ADE80] mb-6 relative z-10 shadow-2xl">
                      {item.step}
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                   <p className="text-gray-400 max-w-xs mx-auto">{item.text}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// 5. SPORTS SECTION (Dark Mode - Keep High Energy)
const SportsSection = () => {
    const sports = [
        { 
            name: "Badminton", 
            metrics: ["Smash Speed", "Wrist Action", "Shuttle Trajectory"],
            color: "from-blue-500 to-cyan-400"
        },
        { 
            name: "Tennis", 
            metrics: ["Serve Power", "Spin Rate", "Stroke Angle"],
            color: "from-green-500 to-emerald-400"
        },
        { 
            name: "Cricket", 
            metrics: ["Bowling Speed", "Batting Power", "Shot Placement"],
            color: "from-orange-500 to-red-400"
        },
    ];

    return (
        <section id="sports" className="bg-[#050505] py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial="hidden" whileInView="visible" variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Optimized for Your Game</h2>
                    <p className="text-gray-400">Our algorithms adapt to the specific physics of your sport.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {sports.map((sport, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${sport.color}`} />
                            <h3 className="text-2xl font-bold text-white mb-6">{sport.name}</h3>
                            <ul className="space-y-4">
                                {sport.metrics.map((m, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 6. APP FEATURES (The Brain - Light Mode Transition)
const AppFeatures = () => {
  return (
    <section className="bg-[#F5F5F7] py-24 px-6 rounded-t-[3rem] -mt-10 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
             <h2 className="text-4xl font-bold mb-6 text-gray-900">The Brain Behind the Band</h2>
             <p className="text-gray-500 text-lg leading-relaxed mb-8">
               Raw data is useless without context. The Statmize App transforms complex sensor readings into clear, actionable coaching advice.
             </p>
             <div className="space-y-6">
                {[
                  { t: "Video Sync", d: "Overlay metrics on video recordings.", i: Activity },
                  { t: "AI Coach", d: "Get personalized drills to fix your form.", i: Cpu },
                  { t: "Leaderboards", d: "Compete with friends globally.", i: Users },
                ].map((f, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                         <f.i className="text-[#A06CD5]" size={24} />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900">{f.t}</h4>
                         <p className="text-sm text-gray-500">{f.d}</p>
                      </div>
                   </div>
                ))}
             </div>
        </div>
        
        {/* Simplified Phone Visual */}
        <div className="lg:w-1/2 flex justify-center">
           <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
              <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center p-6 text-center">
                 <div className="w-20 h-20 bg-gradient-to-tr from-[#A06CD5] to-[#4ADE80] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(160,108,213,0.4)]">
                    <Zap className="text-white" size={40} />
                 </div>
                 <h3 className="text-white text-3xl font-bold">98<span className="text-lg text-gray-500">/100</span></h3>
                 <p className="text-gray-400 text-sm mb-8">Performance Score</p>
                 <div className="w-full h-32 bg-gray-800/50 rounded-2xl animate-pulse" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 7. HEALTH METRICS (The "Foundation" - Secondary Benefit)
// Moved to bottom as requested
const HealthMetrics = () => {
  const metrics = [
    { label: "Recovery", icon: BatteryFull, color: "text-green-500 bg-green-50" }, 
    { label: "Heart Rate", icon: Heart, color: "text-red-500 bg-red-50" },
    { label: "Sleep", icon: Moon, color: "text-purple-500 bg-purple-50" },
  ];

  return (
    <section className="bg-white text-gray-900 pb-32 px-6 relative z-20">
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-20">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">The Foundation</span>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            Powered by Health
          </h2>
          <p className="text-gray-500 mt-2">
             You can't perform if you don't recover. We track the essentials so you stay game-ready.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {metrics.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="px-8 py-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center`}>
                <m.icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900">{m.label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 8. FOOTER
const Footer = () => {
    return (
        <section id="contact" className="bg-[#050505] pt-20 pb-10 px-6 rounded-t-[3rem] -mt-10 relative z-40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-6 h-6">
                           <Image 
                             src="/logo.png" 
                             alt="Statmize Logo" 
                             width={24} height={24}
                             className="object-contain"
                           />
                        </div>
                        <span className="text-white font-extrabold text-xl tracking-tight">Statmize</span>
                    </div>
                    <p className="text-gray-400 max-w-xs text-sm">
                        High-precision sensors and AI-powered analysis to help you perfect your technique.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold">Contact</h4>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <Mail size={16} />
                        <span>statmize.business@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <MapPin size={16} />
                        <span>Ahmedabad, Gujarat, India</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
                © 2025 Statmize. All rights reserved.
            </div>
        </section>
    );
};


// --- MAIN PAGE ---
export default function StatmizePage() {
  return (
    <main className="font-sans selection:bg-[#A06CD5] selection:text-white bg-[#050505]">
      <Navigation />
      <Hero />
      <PerformanceCore />
      <StatmizeLoop />
      <SportsSection />
      <AppFeatures />
      <HealthMetrics />
      <Footer />
    </main>
  );
}