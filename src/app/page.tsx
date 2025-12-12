'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Activity, 
  Smartphone, 
  Zap, 
  Target, 
  BarChart3, 
  Heart, 
  Moon, 
  Wind, 
  Users, 
  ArrowRight, 
  MapPin,
  Mail,
  TrendingUp,
  Home, Layers, Trophy, Mailbox,
  ShieldCheck,
  BatteryCharging,
  Crosshair,
  Cpu,
  Menu, // Hamburger Icon
  X,    // Close Icon
  BrainCircuit,
  LineChart
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// --- UTILS & ANIMATIONS ---
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

// --- COMPONENTS ---

// 1. UPDATED NAVIGATION (Fixes Logo Overlap)
// 1. UPDATED NAVIGATION (Fixes Mobile Menu Header Alignment)
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'Sports', path: '/sports' },
    { name: 'App', path: '/mobile-app' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 relative z-50">
                <Link href="/" className="block relative w-32 h-8">
                    <Image 
                    src="/logo.png" 
                    alt="Statmize" 
                    fill 
                    className="object-contain object-left" 
                    sizes="150px" 
                    priority 
                    />
                </Link>
            </div>
            
            {/* Center: Desktop Links */}
            <div className="hidden lg:flex gap-8 items-center">
            {navItems.map((item) => (
                <Link key={item.name} href={item.path} className="text-white/70 hover:text-white font-medium text-sm transition-colors">
                    {item.name}
                </Link>
            ))}
            </div>

            {/* Right: CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <Link href="/get-started" className="hidden lg:block">
                    <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                        Get Started
                    </button>
                </Link>
                
                {/* Hamburger Button */}
                <button onClick={() => setIsOpen(true)} className="lg:hidden text-white p-2 relative z-50">
                    <Menu size={28} />
                </button>
            </div>
        </div>
      </nav>

      {/* --- FULL SCREEN MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
            >
                {/* Mobile Menu Header (Logo Left, Close Right) */}
                <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
                    {/* Logo */}
                    <div className="relative w-28 h-8 opacity-80">
                        <Image 
                          src="/logo.png" 
                          alt="Statmize" 
                          fill 
                          className="object-contain object-left" 
                          sizes="150px" 
                        />
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-white/80 hover:text-white p-2 transition-colors"
                    >
                        <X size={32} />
                    </button>
                </div>

                {/* Menu Links Container */}
                <div className="flex flex-col items-center justify-center flex-grow gap-8">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.path} 
                            onClick={() => setIsOpen(false)} 
                            className="text-3xl font-bold text-white hover:text-[#4ADE80] transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}

                    <Link href="/get-started" onClick={() => setIsOpen(false)} className="mt-8">
                        <button className="bg-white text-black px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
                            Get Started
                        </button>
                    </Link>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 2. HERO SECTION
const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center items-center text-center px-4 pt-32 pb-20">
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
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[#4ADE80] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
          Smart Wearable for Athletes
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
          Elevate Your Game with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">
            Precision Analytics
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Track speed, angle, and power of every shot with Statmize's smart wearable designed for athletes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center px-6">
            <Link href="/get-started" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={18}/>
                </button>
            </Link>
            <Link href="/features" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
                    Learn More
                </button>
            </Link>
        </div>
      </motion.div>
      <br /> <br />

      {/* Floating Elements (Visual) */}
      <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] mt-12 md:mt-16 block">
        <motion.div 
           animate={{ y: [-10, 10, -10] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[280px] md:w-[500px]"
        >
           <Image 
             src="/band.png" 
             alt="Statmize Smart Band" 
             width={600} 
             height={600} 
             className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(160,108,213,0.3)]" 
             priority 
           />
        </motion.div>
      </div>
    </section>
  );
};

// 3. PERFORMANCE CORE
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
      color: "text-[#4ADE80]",
      bg: "bg-[#4ADE80]/10 border-[#4ADE80]/20"
    },
    {
      title: "Power Metrics",
      desc: "Get instant power analysis for every shot to improve strength, control, and consistency.",
      icon: Zap,
      color: "text-[#A06CD5]",
      bg: "bg-[#A06CD5]/10 border-[#A06CD5]/20"
    }
  ];

  return (
    <section id="performance" className="bg-[#050505] py-12 md:py-24 px-6 relative z-20">
       <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-10 md:mb-16 md:flex justify-between items-end">
             <div className="max-w-2xl text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Advanced Performance Tracking</h2>
                <p className="text-gray-400 text-lg">Data is the new unfair advantage. We break down your game into the three metrics that matter most.</p>
             </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
                <motion.div key={i} variants={fadeInUp} className={`p-8 rounded-3xl border ${m.bg} hover:bg-opacity-20 transition-all cursor-default group`}>
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

// 4. AI ANALYTICS SECTION
const AIAnalyticsSection = () => {
    const aiFeatures = [
        {
            title: "Improvement Tracker",
            desc: "Weekly progress reports showing exactly how much faster and more accurate your shots are becoming compared to last week.",
            icon: LineChart,
            color: "text-blue-400"
        },
        {
            title: "Mistake Detection",
            desc: "AI analyzes your biomechanics to identify bad habits (like poor wrist position) before they become permanent.",
            icon: Zap,
            color: "text-yellow-400"
        },
        {
            title: "Health Correlation",
            desc: "Understand how your sleep and recovery scores directly impact your shot power and reaction time on the field.",
            icon: BrainCircuit,
            color: "text-purple-400"
        }
    ];

    return (
        <section className="bg-[#0A0A0A] py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
                <div className="lg:w-1/2">
                    <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Powered by AI
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Your Personal AI Coach. <br />
                        <span className="text-gray-500">Available 24/7.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                        Raw data is just numbers. Statmize AI connects the dots between your health, your technique, and your results to tell you exactly <strong>what</strong> to fix and <strong>how</strong> to fix it.
                    </p>
                    <div className="space-y-8">
                        {aiFeatures.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="flex gap-5">
                                <div className="mt-1"><f.icon size={24} className={f.color} /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-1">{f.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <div className="relative bg-[#151515] border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-white font-bold">Weekly Performance</h4>
                            <span className="text-green-400 text-sm font-bold">+12% vs last week</span>
                        </div>
                        <div className="h-40 w-full flex items-end justify-between gap-2 mb-8">
                            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-purple-900/50 to-purple-500 rounded-t-sm relative group">
                                </div>
                            ))}
                        </div>
                        <div className="bg-[#222] rounded-xl p-4 flex gap-4 items-center border border-white/5">
                            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500"><Zap size={20} /></div>
                            <div>
                                <h5 className="text-white font-bold text-sm">Insight Detected</h5>
                                <p className="text-gray-400 text-xs">Your recovery score (45%) on Tuesday correlated with a 15% drop in smash power.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 5. STATMIZE LOOP
const StatmizeLoop = () => {
  return (
    <section className="bg-[#050505] py-32 px-6 overflow-hidden relative border-t border-white/5">
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-bold text-white">The Statmize Loop</h2>
             <p className="text-gray-500 mt-4">How we turn sweat into stats.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             {[
                { step: "01", title: "Measure", text: "Wear the band. It captures 200 data points/sec." },
                { step: "02", title: "Analyze", text: "AI processes biomechanics to find flaws." },
                { step: "03", title: "Improve", text: "Get personalized drills to fix your game." }
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

// 6. HEALTH METRICS (Dark Mode)
const HealthMetrics = () => {
  const metrics = [
    { title: "Injury Prevention", desc: "Monitor workload to prevent overtraining.", icon: ShieldCheck, color: "text-[#F97316]", bg: "bg-[#F97316]/10 border-[#F97316]/20" },
    { title: "Sleep Cycle", desc: "Track deep sleep and REM for recovery.", icon: Moon, color: "text-[#A06CD5]", bg: "bg-[#A06CD5]/10 border-[#A06CD5]/20" },
    { title: "Recovery Rate", desc: "Know when your body is primed for peak intensity.", icon: BatteryCharging, color: "text-[#4ADE80]", bg: "bg-[#4ADE80]/10 border-[#4ADE80]/20" },
    { title: "Heart Rate", desc: "Real-time cardio tracking during drills.", icon: Heart, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
    { title: "Activity", desc: "Keep track of daily movement on rest days.", icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" }
  ];

  return (
    <section className="bg-[#050505] py-24 px-6 relative z-20 border-t border-white/5">
       <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
             <span className="text-[#A06CD5] font-bold tracking-widest uppercase text-sm mb-2 block">The Foundation</span>
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Health Ecosystem</h2>
             <p className="text-gray-400 text-lg max-w-2xl">You can't perform if you don't recover. We track the essentials so you stay game-ready.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }} className={`p-8 rounded-3xl border ${m.bg} hover:bg-opacity-20 transition-all cursor-default group`}>
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

// 7. SPORTS SECTION
const SportsSection = () => {
    const sports = [
        { name: "Badminton", metrics: ["Smash Speed", "Wrist Action", "Shuttle Trajectory"], color: "from-blue-500 to-cyan-400" },
        { name: "Tennis", metrics: ["Serve Power", "Spin Rate", "Stroke Angle"], color: "from-green-500 to-emerald-400" },
        { name: "Cricket", metrics: ["Bowling Speed", "Batting Power", "Shot Placement"], color: "from-orange-500 to-red-400" },
    ];

    return (
        <section id="sports" className="bg-[#050505] py-32 px-6 rounded-t-[3rem] -mt-10 relative z-30">
            <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Optimized for Multiple Sports</h2>
                    <p className="text-gray-400">Our technology adapts to provide sport-specific analytics.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {sports.map((sport, i) => (
                        <motion.div key={i} whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
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

// 8. FOOTER
const Footer = () => {
    return (
        <section id="contact" className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5 relative z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                <div className="space-y-4">
                     <div className="flex items-center gap-2">
                        <Link href="/" className="relative w-28 h-8"> 
                            <Image 
                              src="/logo.png" 
                              alt="Statmize Logo" 
                              fill
                              className="object-contain object-left" 
                              sizes="150px"
                            />
                        </Link>
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
      <AIAnalyticsSection />
      <StatmizeLoop />
      <HealthMetrics />
      <SportsSection />
      <Footer />
    </main>
  );
}