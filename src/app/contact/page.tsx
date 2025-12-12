'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // NEW: Short Title
    message: '',
    type: 'General' // You can use this to filter later
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // CHANGED: Saving to 'contact_messages' instead of 'interest_leads'
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'General' }); // Reset
    } catch (err) {
      console.error("Error submitting form: ", err);
      setError("Failed to send message. Please check your connection.");
      setIsSubmitting(false);
    }
  };

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
             <h1 className="text-5xl font-extrabold mb-6">Let's Connect.</h1>
             <p className="text-gray-400 text-lg mb-12 leading-relaxed">
               Whether you have feedback on our tech, want to join the Statmize team, or are looking to partner with us—we want to hear from you.
             </p>

             <div className="space-y-8">
               <div className="flex items-start gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <Mail className="text-[#A06CD5]" size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">General Inquiries</h3>
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
                   <Link href="https://maps.google.com/?q=Ahmedabad,Gujarat" target="_blank" className="text-sm text-[#4ADE80] mt-1 inline-block hover:underline">
                    View on Google Maps 
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
             {isSuccess ? (
                <div className="text-center py-10">
                   <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                   <p className="text-gray-400">Thank you for reaching out. We will review your message shortly.</p>
                   <button 
                     onClick={() => setIsSuccess(false)} 
                     className="mt-6 text-sm text-gray-500 hover:text-white underline"
                   >
                     Send another message
                   </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" 
                      placeholder="Aryan Sharma" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" 
                      placeholder="aryan@example.com" 
                    />
                  </div>

                  {/* NEW FIELD: Subject / Short Title */}
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Subject / Short Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" 
                      placeholder="Partnership Proposal / Job Application / Feedback" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#A06CD5] transition-colors text-white" 
                      placeholder="How can we help you?" 
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                  </button>
                </form>
             )}
          </motion.div>

        </div>
      </section>
    </main>
  );
}