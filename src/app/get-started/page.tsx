'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Athlete',
    sport: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Send data to Firebase
      await addDoc(collection(db, "interest_leads"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 p-10 rounded-3xl max-w-md w-full backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">You're on the list!</h2>
          <p className="text-gray-400 mb-8">
            Thanks for your interest in Statmize. We are building the future of sports analytics, and we'll reach out as soon as we launch.
          </p>
          <Link href="/">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#A06CD5] selection:text-white relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-green-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar Minimal */}
      <nav className="p-6 absolute top-0 left-0 w-full z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
          <ChevronLeft size={20} /> <span className="font-bold">Back</span>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16 min-h-screen">
        
        {/* Left: Content */}
        <div className="md:w-1/2 relative z-10">
           <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[#A06CD5] text-xs font-bold uppercase tracking-widest mb-6">
              Early Access
           </div>
           <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
             Join the <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">Revolution.</span>
           </h1>
           <p className="text-xl text-gray-400 mb-8 max-w-lg">
             We are currently in private development. Secure your spot on the waitlist to get exclusive updates and early access to the Statmize Band.
           </p>
           
           {/* Trust Signals */}
           <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#050505]" />
                 ))}
              </div>
              <p>Join 500+ athletes waiting.</p>
           </div>
        </div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 w-full"
        >
          <div className="bg-[#121212] border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
             {/* Gradient Border Line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]" />

             <h3 className="text-2xl font-bold mb-6">Request Access</h3>
             
             <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                   <label className="block text-sm font-bold text-gray-400 mb-2">Full Name</label>
                   <input 
                     required
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white placeholder-gray-600" 
                     placeholder="Jordan Smith" 
                   />
                </div>

                <div>
                   <label className="block text-sm font-bold text-gray-400 mb-2">Email Address</label>
                   <input 
                     required
                     type="email" 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white placeholder-gray-600" 
                     placeholder="jordan@example.com" 
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">I am a...</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white appearance-none"
                      >
                         <option>Athlete</option>
                         <option>Coach</option>
                         <option>Academy Owner</option>
                         <option>Investor</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">Main Sport</label>
                      <input 
                        type="text" 
                        value={formData.sport}
                        onChange={(e) => setFormData({...formData, sport: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white placeholder-gray-600" 
                        placeholder="Tennis, Cricket..." 
                      />
                   </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Join Waitlist <ArrowRight size={18} /></>}
                </button>
             </form>
          </div>
        </motion.div>

      </div>
    </main>
  );
}