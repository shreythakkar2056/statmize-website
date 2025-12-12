'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Zap, Target, Activity, Dumbbell, Timer, Wind } from 'lucide-react';
import Link from 'next/link';

const sportsData = {
  badminton: {
    color: "from-blue-500 to-cyan-400",
    title: "Badminton",
    desc: "Master the court with precise shuttle tracking.",
    metrics: [
      { label: "Smash Speed", val: "300+", unit: "km/h", icon: Zap },
      { label: "Wrist Snap", val: "0.4", unit: "s", icon: Activity },
      { label: "Rally Duration", val: "12", unit: "avg shots", icon: Timer },
    ]
  },
  tennis: {
    color: "from-green-500 to-emerald-400",
    title: "Tennis",
    desc: "Analyze every serve, volley, and groundstroke.",
    metrics: [
      { label: "Serve Speed", val: "210", unit: "km/h", icon: Wind },
      { label: "Swing speed", val: "3200", unit: "km/h", icon: Target },
      { label: "Impact Force", val: "50", unit: "G", icon: Dumbbell },
    ]
  },
  cricket: {
    color: "from-orange-500 to-red-400",
    title: "Cricket",
    desc: "Optimize bowling pace and batting power.",
    metrics: [
      { label: "Ball Speed", val: "145", unit: "km/h", icon: Zap },
      { label: "Bat Swing", val: "110", unit: "km/h", icon: Activity },
      { label: "Run Up", val: "22", unit: "m", icon: Wind },
    ]
  }
};

export default function SportsPage() {
  // 1. State to track active sport
  const [activeSport, setActiveSport] = useState<'badminton' | 'tennis' | 'cricket'>('badminton');

  // 2. Extract current data based on state
  const currentSportData = sportsData[activeSport];
  
  // 3. FIX: Assign the icon to a capitalized variable so JSX can use it
  const HeroIcon = currentSportData.metrics[0].icon;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#A06CD5] selection:text-white">
      {/* Navbar */}
      <nav className="p-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> <span className="font-bold">Back</span>
        </Link>
        <span className="font-extrabold text-xl tracking-tight">Statmize Sports</span>
        <div className="w-8" /> {/* Spacer */}
      </nav>

      <section className="px-6 pt-10 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Dominate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">Your Field</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select your sport to see how Statmize dissects your performance.
          </p>
        </div>

        {/* Sport Selector Pills */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {(Object.keys(sportsData) as Array<keyof typeof sportsData>).map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`px-8 py-3 rounded-full font-bold capitalize transition-all duration-300 border ${
                activeSport === sport 
                  ? `bg-white text-black border-white scale-105` 
                  : `bg-transparent text-gray-500 border-white/10 hover:border-white/30`
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSport}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Left: Visual Card */}
              <div className={`relative h-[400px] rounded-[3rem] bg-gradient-to-br ${currentSportData.color} p-1 overflow-hidden group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-1 bg-[#1a1a1a] rounded-[2.9rem] flex flex-col items-center justify-center relative z-10">
                   <h2 className="text-[100px] font-black text-white/5 uppercase absolute">{activeSport}</h2>
                   
                   {/* 4. FIX: Use the variable here instead of the long path */}
                   <HeroIcon size={80} className={`text-white mb-6 relative z-10`} />
                   
                   <div className="text-3xl font-bold uppercase tracking-widest relative z-10">{activeSport}</div>
                </div>
              </div>

              {/* Right: Metrics */}
              <div>
                <h3 className="text-3xl font-bold mb-4">{currentSportData.title}</h3>
                <p className="text-gray-400 text-xl mb-10">{currentSportData.desc}</p>
                
                <div className="space-y-6">
                  {currentSportData.metrics.map((m, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${currentSportData.color} bg-opacity-10`}>
                        <m.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold">{m.val}</span>
                          <span className="text-sm text-gray-400 mb-1.5">{m.unit}</span>
                        </div>
                        <span className="text-sm text-gray-500 uppercase tracking-wider font-bold">{m.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}