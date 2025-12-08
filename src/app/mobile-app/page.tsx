'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Smartphone, Share2, Trophy, LineChart, Download } from 'lucide-react';
import Link from 'next/link';

export default function AppPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#A06CD5] selection:text-white">
       {/* Navbar */}
       <nav className="p-6 max-w-7xl mx-auto flex items-center justify-between absolute top-0 left-0 right-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
          <ChevronLeft size={20} /> <span className="font-bold">Back</span>
        </Link>
        <span className="font-extrabold text-xl tracking-tight">Statmize App</span>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold">Download</button>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
             <span className="text-[#A06CD5] font-bold tracking-widest uppercase text-xs mb-4 block">iOS & Android</span>
             <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
               Your Pocket <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">AI Coach</span>
             </h1>
             <p className="text-xl text-gray-500 mb-8 max-w-md">
               Visualize your progress, join global challenges, and receive personalized drills based on your sensor data.
             </p>
             <div className="flex gap-4">
               <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
                 <Smartphone size={20} /> App Store
               </button>
               <button className="flex items-center gap-3 bg-gray-100 text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors">
                 <Smartphone size={20} /> Play Store
               </button>
             </div>
           </motion.div>
        </div>

        {/* Phone Mockup */}
        <div className="md:w-1/2 flex justify-center relative">
           <motion.div 
             initial={{ opacity: 0, rotate: 10, y: 50 }} 
             animate={{ opacity: 1, rotate: 0, y: 0 }} 
             transition={{ duration: 1, delay: 0.2 }}
             className="w-[320px] h-[650px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden relative z-10"
           >
              {/* Screen Content */}
              <div className="w-full h-full bg-[#121212] text-white p-6 pt-12">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-xl">Dashboard</h3>
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                 </div>
                 
                 {/* Chart Card */}
                 <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                    <div className="text-xs text-gray-400 mb-2">Weekly Load</div>
                    <div className="flex items-end gap-2 h-24">
                       {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-purple-500 rounded-t-sm opacity-80" />
                       ))}
                    </div>
                 </div>

                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-600 rounded-2xl p-4 h-32 flex flex-col justify-between">
                       <LineChart className="text-white/50" />
                       <span className="font-bold text-2xl">98% <span className="text-xs font-normal">Accuracy</span></span>
                    </div>
                    <div className="bg-green-500 rounded-2xl p-4 h-32 flex flex-col justify-between">
                       <Trophy className="text-white/50" />
                       <span className="font-bold text-2xl">#1 <span className="text-xs font-normal">Rank</span></span>
                    </div>
                 </div>
              </div>
           </motion.div>
           
           {/* Decorative Blob */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full blur-[100px] -z-10" />
        </div>
      </section>

      {/* Feature List */}
      <section className="bg-[#F5F5F7] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
             {[
             { title: "Data Visualization", desc: "See detailed insights from your sensor data with interactive charts.", icon: LineChart },
             { title: "Leaderboards", desc: "Compete with friends worldwide and climb the global rankings.", icon: Trophy },
             { title: "Data Export", desc: "Download raw data for analysis and external use.", icon: Download },
             ].map((f, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
             >
               <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
               <f.icon size={24} />
               </div>
               <h3 className="font-bold text-xl mb-2">{f.title}</h3>
               <p className="text-gray-500">{f.desc}</p>
             </motion.div>
             ))}
        </div>
      </section>
    </main>
  );
}