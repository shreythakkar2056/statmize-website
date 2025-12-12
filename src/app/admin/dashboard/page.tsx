'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase'; // Ensure you have this set up from previous steps
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Loader2, Download, User, MessageSquare, Lock, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [authError, setAuthError] = useState('');

  // --- DATA STATE ---
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. HANDLE LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // CHANGE THIS CODE TO WHATEVER YOU WANT
    if (secretCode === 'SAD2025') {
        setIsAuthenticated(true);
        fetchData(); // Load data only after login
    } else {
        setAuthError('Invalid Access Code');
    }
  };

  // --- 2. FETCH DATA (Both Collections) ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Interest Leads
      const leadsQuery = query(collection(db, "interest_leads"), orderBy("createdAt", "desc"));
      const leadsSnap = await getDocs(leadsQuery);
      setLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Contact Messages
      const contactsQuery = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
      const contactsSnap = await getDocs(contactsQuery);
      setContacts(contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <Lock size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                <p className="text-gray-400 mb-6 text-sm">Enter the secret code to view the dashboard.</p>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="password" 
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        placeholder="Enter Code"
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-center focus:border-[#A06CD5] outline-none transition-colors"
                    />
                    {authError && <p className="text-red-500 text-xs">{authError}</p>}
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </main>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <main className="min-h-screen bg-[#F5F5F7] text-black font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
         <div className="flex items-center gap-3">
            <span className="font-bold text-xl">Statmize Admin</span>
         </div>
         <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
         </button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
         
         {/* Stats & Controls */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-bold mb-2">Overview</h1>
               <div className="flex gap-4">
                   <div onClick={() => setActiveTab('leads')} className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'leads' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                        <User size={16} /> Waitlist Leads <span className="bg-white/20 px-2 rounded-full text-xs">{leads.length}</span>
                   </div>
                   <div onClick={() => setActiveTab('contacts')} className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'contacts' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                        <MessageSquare size={16} /> Contact Msgs <span className="bg-white/20 px-2 rounded-full text-xs">{contacts.length}</span>
                   </div>
               </div>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black bg-white px-4 py-2 rounded-lg border border-gray-200">
               <Download size={16} /> Export CSV
            </button>
         </div>

         {/* Loading State */}
         {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-black" size={40} /></div>
         ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               
               {/* --- TABLE: INTEREST LEADS --- */}
               {activeTab === 'leads' && (
                   <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100">
                         <tr>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Sport</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                               <td className="p-6 font-bold flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><User size={14}/></div>
                                  {lead.name}
                               </td>
                               <td className="p-6 text-gray-600">{lead.email}</td>
                               <td className="p-6">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                     lead.role === 'Investor' ? 'bg-green-100 text-green-700' :
                                     lead.role === 'Coach' ? 'bg-purple-100 text-purple-700' :
                                     'bg-gray-100 text-gray-700'
                                  }`}>
                                     {lead.role}
                                  </span>
                               </td>
                               <td className="p-6 text-gray-600">{lead.sport}</td>
                               <td className="p-6 text-gray-400 text-sm">
                                  {lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
               )}

               {/* --- TABLE: CONTACT MESSAGES --- */}
               {activeTab === 'contacts' && (
                   <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100">
                         <tr>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">From</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Message</th>
                            <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {contacts.map((msg) => (
                            <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                               <td className="p-6">
                                  <div className="font-bold text-black">{msg.name}</div>
                                  <div className="text-xs text-gray-500">{msg.email}</div>
                               </td>
                               <td className="p-6">
                                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                                     {msg.subject || 'General'}
                                  </span>
                               </td>
                               <td className="p-6 text-gray-600 max-w-md truncate" title={msg.message}>
                                  {msg.message}
                               </td>
                               <td className="p-6 text-gray-400 text-sm">
                                  {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
               )}

               {/* Empty State */}
               {((activeTab === 'leads' && leads.length === 0) || (activeTab === 'contacts' && contacts.length === 0)) && (
                  <div className="p-20 text-center text-gray-400 flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle className="text-gray-300" size={32} />
                      </div>
                      <p>No data found in this category yet.</p>
                  </div>
               )}
            </div>
         )}
      </div>
    </main>
  );
}