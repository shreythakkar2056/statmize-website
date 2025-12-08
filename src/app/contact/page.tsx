'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, MapPin, Send, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#A06CD5] selection:text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="p-6 max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> <span className="font-bold">Back</span>
        </Link>
        <span className="font-extrabold text-xl tracking-tight">Contact Us</span>
        <div className="w-8" />
      </nav>

      <section className="px-6 py-12 max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
             <h1 className="text-5xl font-extrabold mb-6">Let's Talk.</h1>
             <p className="text-gray-400 text-lg mb-12">
               Have questions about the band, the app, or bulk orders for your academy? We're here to help.
             </p>

             <div className="space-y-8">
               <div className="flex items-start gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <Mail className="text-[#A06CD5]" size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">Email</h3>
                   <p className="text-gray-400">statmize.business@gmail.com</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <MapPin className="text-[#4ADE80]" size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">HQ Location</h3>
                   <p className="text-gray-400">Ahmedabad, Gujarat, India</p>
                   <Link href="https://maps.google.com/?q=Ahmedabad" target="_blank" className="text-sm text-[#4ADE80] mt-1 inline-block hover:underline">
                    View on Google Maps →
                   </Link>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
          >
             <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" placeholder="Tell us about your requirements..." />
                </div>
                <button type="button" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
             </form>
          </motion.div>

        </div>
      </section>
    </main>
  );
}