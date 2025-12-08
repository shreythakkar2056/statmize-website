'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
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
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // 1. Import Image component

// --- UTILS & CONSTANTS ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- HELPER COMPONENT ---
const BatteryFull = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
    <line x1="22" y1="11" x2="22" y2="13"></line>
  </svg>
);

// --- COMPONENTS ---

// 1. NAVIGATION
const Navigation = () => {
  const navItems = [
    { name: 'Features', path: '/features', icon: Layers },
    { name: 'Sports', path: '/sports', icon: Trophy },
    { name: 'App', path: '/mobile-app', icon: Smartphone },
    { name: 'Contact', path: '/contact', icon: Mailbox },
  ];

  return (
    <>
      {/* --- TOP NAVBAR (Logo + Desktop Links + CTA) --- */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto right-0">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Statmize Logo"
              width={120}
              height={30}
              className="w-auto h-8 md:h-10 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
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

        {/* CTA Button (Visible on all screens, but smaller on mobile) */}
        <Link href="/get-started">
          <button className="bg-white text-black px-4 py-2 md:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm hover:bg-gray-200 transition-colors">
            Get Started
          </button>
        </Link>
      </nav>

      {/* --- MOBILE BOTTOM DOCK (Visible only on Mobile) --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <div className="flex justify-between items-center bg-[#121212]/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-2xl">
          {/* Home Link (Extra) */}
          <Link href="/" className="flex flex-col items-center gap-1 group">
            <Home size={20} className="text-white/50 group-hover:text-white transition-colors" />
          </Link>

          {/* Mapped Links */}
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} className="flex flex-col items-center gap-1 group">
              <item.icon size={20} className="text-white/50 group-hover:text-[#4ADE80] transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </>
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
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10 max-w-4xl mx-auto"
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

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/get-started">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
              Get Started <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/features">
            <button className="px-8 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
              Learn More
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements (Representing the Wearable Tech) */}
      <div className="relative w-full max-w-5xl h-[450px] mt-16 hidden md:block">

        {/* Card 1: Speed */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 lg:left-20 top-20 w-64 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Wind size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold text-sm">Shot Speed</h4>
              <p className="text-gray-400 text-xs">142 km/h</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Angle */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-10 lg:right-20 top-32 w-64 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
              <Target size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold text-sm">Angle Analysis</h4>
              <p className="text-gray-400 text-xs">Optimal Trajectory</p>
            </div>
          </div>
        </motion.div>

        {/* Center: THE BAND PRODUCT IMAGE */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[300px] md:w-[500px]"
        >
          {/* Replace '/band.png' with your actual file name */}
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
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
// 3. NEW: PERFORMANCE CORE (The "Story" Start)
// This replaces the immediate Health section to focus on Performance first.
// 3. UPDATED: PERFORMANCE CORE (Mobile Responsive)
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
    <section id="performance" className="bg-[#050505] py-12 md:py-24 px-4 md:px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mb-10 md:mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Advanced Performance Tracking
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Data is the new unfair advantage. We break down your game into the three metrics that matter most.
            </p>
          </div>
          {/* Decorative Line (Hidden on Mobile) */}
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-gradient-to-r from-[#A06CD5] to-[#4ADE80] rounded-full" />
          </div>
        </motion.div>

        {/* Cards Grid: Stacks vertically on mobile (grid-cols-1), 3 columns on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`p-6 md:p-8 rounded-3xl border ${m.bg} hover:bg-opacity-20 transition-all cursor-default group`}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${m.bg} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <m.icon size={24} className={`${m.color} md:w-[28px] md:h-[28px]`} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{m.title}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{m.desc}</p>
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

// 7. UPDATED: HEALTH METRICS (Dark Mode UI)
const HealthMetrics = () => {
  const metrics = [
    {
      title: "Injury Prevention",
      desc: "Monitor workload and strain levels to prevent overtraining before it happens.",
      icon: ShieldCheck,
      color: "text-[#F97316]", // Orange
      bg: "bg-[#F97316]/10 border-[#F97316]/20"
    },
    {
      title: "Sleep Cycle",
      desc: "Track deep sleep and REM phases to ensure you wake up fully recovered.",
      icon: Moon,
      color: "text-[#A06CD5]", // Purple
      bg: "bg-[#A06CD5]/10 border-[#A06CD5]/20"
    },
    {
      title: "Recovery Rate",
      desc: "Know exactly when your body is primed for peak performance intensity.",
      icon: BatteryCharging,
      color: "text-[#4ADE80]", // Green
      bg: "bg-[#4ADE80]/10 border-[#4ADE80]/20"
    },
    {
      title: "Heart Rate",
      desc: "Real-time cardiovascular tracking during high-intensity drills and rest periods.",
      icon: Heart,
      color: "text-red-500", // Red
      bg: "bg-red-500/10 border-red-500/20"
    },
    {
      title: "Steps & Activity",
      desc: "Keep track of daily movement to maintain active recovery on rest days.",
      icon: Activity,
      color: "text-blue-400", // Blue
      bg: "bg-blue-400/10 border-blue-400/20"
    }
  ];

  return (
    <section className="bg-[#050505] py-24 px-6 relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <span className="text-[#A06CD5] font-bold tracking-widest uppercase text-sm mb-2 block">The Foundation</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Complete Health Ecosystem</h2>
            <p className="text-gray-400 text-lg">
              You can't perform if you don't recover. We track the essentials so you stay game-ready.
            </p>
          </div>
          {/* Decorative Line */}
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-gradient-to-r from-[#4ADE80] to-[#F97316] rounded-full" />
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
              whileHover={{ y: -5 }}
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
              { t: "Performance Trends", d: "Track your progress with detailed charts. ", i: Activity },
              { t: "AI Coach", d: "Get personalized drills to fix your form.", i: Cpu },
              { t: "Leaderboards", d: "Compete with friends globally.", i: Users },
            ].map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-black text-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  <f.i className="text-[#ooooo]" size={24} />
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

// // 3. HEALTH METRICS (Light Mode)
// const HealthMetrics = () => {
//   const metrics = [
//     { label: "Steps", desc: "Count daily activity", icon: Activity, color: "text-blue-500 bg-blue-50" },
//     { label: "Heart Rate", desc: "Real-time monitoring", icon: Heart, color: "text-red-500 bg-red-50" },
//     { label: "Recovery", desc: "Avoid overtraining", icon: BatteryFull, color: "text-green-500 bg-green-50" }, 
//     { label: "Sleep Quality", desc: "Analyze patterns", icon: Moon, color: "text-purple-500 bg-purple-50" },
//     { label: "SpO₂", desc: "Blood oxygen levels", icon: Wind, color: "text-cyan-500 bg-cyan-50" },
//   ];

//   return (
//     <section className="bg-white text-gray-900 py-24 px-6 rounded-t-[3rem] -mt-10 relative z-20">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
//             Complete Health Monitoring
//           </h2>
//           <p className="text-gray-500 text-lg leading-relaxed">
//             Beyond the game. Track essential health stats for a complete view of your well-being.
//           </p>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-6">
//           {metrics.map((m, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.1 }}
//               className="p-6 rounded-2xl bg-gray-50 border border-gray-100 w-full sm:w-[200px] flex flex-col items-center text-center hover:shadow-lg transition-all"
//             >
//               <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center mb-4`}>
//                 <m.icon size={24} />
//               </div>
//               <h3 className="font-bold text-lg mb-1 text-gray-900">{m.label}</h3>
//               <p className="text-xs text-gray-500">{m.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// 4. APP FEATURES (Scroll Layout - Light Mode)
// const AppFeatures = () => {
//   const features = [
//     {
//       title: "Performance Trends",
//       desc: "Track your progress over time with detailed charts and visualizations that highlight improvements.",
//       icon: BarChart3,
//       color: "bg-purple-100 text-purple-600",
//     },
//     {
//       title: "Personalized Coaching",
//       desc: "Receive AI-powered recommendations tailored to your playing style to accelerate improvement.",
//       icon: Cpu,
//       color: "bg-green-100 text-green-600",
//     },
//     {
//       title: "Community Challenges",
//       desc: "Compare stats with friends or join global leaderboards to stay motivated and push your limits.",
//       icon: Users,
//       color: "bg-orange-100 text-orange-600",
//     },
//   ];

//   return (
//     <section id="app" className="bg-[#F5F5F7] py-24 px-6">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

//         {/* Phone Visual */}
//         <div className="lg:w-1/2 flex justify-center">
//              <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
//                 <div className="absolute top-0 w-full h-full bg-[#1a1a1a] p-6 text-white flex flex-col">
//                    {/* Fake App UI */}
//                    <div className="flex justify-between items-center mb-8 mt-6">
//                       <div className="w-8 h-8 relative rounded-full overflow-hidden">
//                         {/* Fake User Avatar */}
//                          <div className="w-full h-full bg-gray-700" />
//                       </div>
//                       <div className="text-sm font-bold">Statmize</div>
//                       <div className="w-8 h-8" />
//                    </div>
//                    <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6 p-4">
//                       <div className="text-xs opacity-70">Weekly Score</div>
//                       <div className="text-3xl font-bold mt-1">9,430</div>
//                    </div>
//                    <div className="space-y-3">
//                       <div className="h-16 w-full bg-white/10 rounded-xl" />
//                       <div className="h-16 w-full bg-white/10 rounded-xl" />
//                       <div className="h-16 w-full bg-white/10 rounded-xl" />
//                    </div>
//                 </div>
//              </div>
//         </div>

//         {/* Text Content */}
//         <div className="lg:w-1/2 space-y-12">
//           <div>
//               <h2 className="text-4xl font-bold mb-4 text-gray-900">Comprehensive Analytics at Your Fingertips</h2>
//               <p className="text-gray-500 text-lg leading-relaxed">The Statmize app transforms complex data into actionable insights.</p>
//           </div>

//           <div className="space-y-8">
//             {features.map((f, i) => (
//               <motion.div 
//                 key={i}
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ margin: "-50px" }}
//                 className="flex gap-4"
//               >
//                 <div className={`shrink-0 w-12 h-12 rounded-xl ${f.color} flex items-center justify-center`}>
//                   <f.icon size={24} />
//                 </div>
//                 <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// 5. SPORTS SECTION (Dark Mode)
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
    <section id="sports" className="bg-[#050505] py-32 px-6 rounded-t-[3rem] -mt-10 relative z-30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Optimized for Multiple Sports</h2>
          <p className="text-gray-400">Our technology adapts to provide sport-specific analytics.</p>
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

// 6. TECH & FOOTER (Dark Mode)
const Footer = () => {
  return (
    <section id="contact" className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {/* Replaced text with Logo Image linked to home */}
            <Link href="/">
              <Image
                src="/logo.png" // Make sure image_1.png is in your public folder
                alt="Statmize Logo"
                width={120} // Adjust width as needed
                height={30}  // Adjust height as needed
                className="object-contain"
                priority
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
      <StatmizeLoop />

      <HealthMetrics />
      <AppFeatures />
      <SportsSection />
      <Footer />
    </main>
  );
}