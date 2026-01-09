'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle, Loader2, ArrowRight, User, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SurveyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userDescription: '',
    userDescriptionOther: '', // Text for "Other"
    primarySport: '',
    performanceRely: '',
    performanceRelyOther: '', // Text for "Other"
    confusionScale: 3,
    frustrations: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "survey_responses"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Firebase Error:", err);
      setIsSubmitting(false);
    }
  };

  const OptionCard = ({ label, value, field }: { label: string, value: string, field: 'userDescription' | 'performanceRely' | 'frustrations' }) => (
    <div 
      onClick={() => setFormData({ ...formData, [field]: value })}
      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
        formData[field] === value 
        ? 'bg-[#A06CD5]/10 border-[#A06CD5] shadow-[0_0_20px_rgba(160,108,213,0.2)]' 
        : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex justify-between items-center">
        <span className={`font-bold text-sm md:text-base ${formData[field] === value ? 'text-white' : 'text-gray-400'}`}>{label}</span>
        {formData[field] === value && <CheckCircle size={18} className="text-[#A06CD5]" />}
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md">
          <div className="w-20 h-20 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Insights Received.</h2>
          <p className="text-gray-400 mb-8">Thank you, {formData.name || 'Athlete'}. Your feedback helps us build the perfect Statmize experience.</p>
          <Link href="/"><button className="bg-white text-black px-10 py-3 rounded-full font-bold w-full hover:bg-gray-200">Return Home</button></Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#A06CD5]">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-colors">
          <ChevronLeft size={20} /> Back
        </Link>
        <div className="relative w-28 h-8">
            <Image src="/logo.png" alt="Statmize" fill className="object-contain" sizes="150px" />
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl font-extrabold mb-2">Athlete <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A06CD5] to-[#4ADE80]">Insights.</span></h1>
          <p className="text-gray-500 mb-12">Help us refine the future of sports performance.</p>

          <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            
            {/* Contact Section */}
            <div className="grid grid-cols-1 gap-4">
                <div className="relative group">
                    <User className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#A06CD5] transition-colors" size={20} />
                    <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#A06CD5] transition-all" />
                </div>
                <div className="relative group">
                    <Mail className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#A06CD5] transition-colors" size={20} />
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#A06CD5] transition-all" />
                </div>
                <div className="relative group">
                    <Phone className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#A06CD5] transition-colors" size={20} />
                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#A06CD5] transition-all" />
                </div>
            </div>

            {/* Persona */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-200">Which best describes you? *</label>
              <div className="grid grid-cols-1 gap-3">
                {['Athlete', 'Coach / trainer', 'Fitness enthusiast', 'Other'].map(opt => (
                  <div key={opt} className="space-y-3">
                    <OptionCard label={opt} value={opt} field="userDescription" />
                    {opt === 'Other' && formData.userDescription === 'Other' && (
                        <motion.input 
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          type="text" placeholder="Please specify..." value={formData.userDescriptionOther}
                          onChange={(e) => setFormData({...formData, userDescriptionOther: e.target.value})}
                          className="w-full bg-black border border-[#A06CD5]/30 rounded-xl p-3 text-sm outline-none focus:border-[#A06CD5]"
                        />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sport */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-200">Primary sport? *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Badminton', 'Cricket', 'Tennis'].map(opt => (
                  <div 
                    key={opt}
                    onClick={() => setFormData({ ...formData, primarySport: opt })}
                    className={`p-4 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      formData.primarySport === opt ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-500'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            {/* Rely */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-200">How do you judge your performance? *</label>
              <div className="grid grid-cols-1 gap-3">
                {['Coach feedback', 'My own feeling / intuition', 'Match result', 'Basic fitness stats', 'Other'].map(opt => (
                  <div key={opt} className="space-y-3">
                    <OptionCard label={opt} value={opt} field="performanceRely" />
                    {opt === 'Other' && formData.performanceRely === 'Other' && (
                        <motion.input 
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          type="text" placeholder="Please specify..." value={formData.performanceRelyOther}
                          onChange={(e) => setFormData({...formData, performanceRelyOther: e.target.value})}
                          className="w-full bg-black border border-[#A06CD5]/30 rounded-xl p-3 text-sm outline-none focus:border-[#A06CD5]"
                        />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Confusion */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-200">Confusion about training improvement?</label>
              <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider">
                <span>Never</span>
                <span>Very Often</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button 
                    type="button" key={num}
                    onClick={() => setFormData({ ...formData, confusionScale: num })}
                    className={`flex-1 h-12 rounded-xl font-bold transition-all border ${
                      formData.confusionScale === num ? 'bg-[#A06CD5] border-[#A06CD5] text-white' : 'bg-white/5 border-white/10 text-gray-500'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Frustrations */}
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-200">What frustrates you most? *</label>
              <div className="grid grid-cols-1 gap-3">
                {['Too many numbers, no clarity', 'Not sport-specific', "Don't help improve performance", 'Only focus on health'].map(opt => (
                  <OptionCard key={opt} label={opt} value={opt} field="frustrations" />
                ))}
              </div>
            </div>

            <button 
              disabled={isSubmitting || !formData.name || !formData.primarySport}
              type="submit" 
              className="w-full bg-gradient-to-r from-[#A06CD5] to-[#4ADE80] text-black font-black py-5 rounded-2xl transition-all disabled:opacity-30 flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <>Submit Analysis <ArrowRight size={20} /></>}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}