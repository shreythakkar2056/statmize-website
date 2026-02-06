'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, Download, User, MessageSquare, Lock, LogOut, CheckCircle, ClipboardList, X, ExternalLink, Rocket
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [authError, setAuthError] = useState('');
  
  // --- TABS ---
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'surveys' | 'launch'>('leads');
  
  // --- DATA STATES ---
  const [leads, setLeads] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [launchList, setLaunchList] = useState<any[]>([]); // New State for Launch List
  
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode === 'SAD2025') {
        setIsAuthenticated(true);
        fetchData(); 
    } else {
        setAuthError('Invalid Access Code');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Interest Leads
      const q1 = query(collection(db, "interest_leads"), orderBy("createdAt", "desc"));
      const s1 = await getDocs(q1);
      setLeads(s1.docs.map(doc => ({ id: doc.id, type: 'Waitlist', ...doc.data() })));

      // 2. Contact Messages
      const q2 = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
      const s2 = await getDocs(q2);
      setContacts(s2.docs.map(doc => ({ id: doc.id, type: 'Contact', ...doc.data() })));

      // 3. Survey Responses
      const q3 = query(collection(db, "survey_responses"), orderBy("createdAt", "desc"));
      const s3 = await getDocs(q3);
      setSurveys(s3.docs.map(doc => ({ id: doc.id, type: 'Survey', ...doc.data() })));

      // 4. NEW: Launch Day Waitlist
      const q4 = query(collection(db, "launch_day_waitlist"), orderBy("timestamp", "desc"));
      const s4 = await getDocs(q4);
      setLaunchList(s4.docs.map(doc => ({ id: doc.id, type: 'Launch Access', ...doc.data() })));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
            <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl w-full max-w-sm text-center">
                <Lock size={32} className="mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="password" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} placeholder="Code" className="w-full bg-black border border-white/20 rounded-lg p-3 text-center outline-none" />
                    {authError && <p className="text-red-500 text-xs">{authError}</p>}
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-all">Unlock</button>
                </form>
            </div>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-black font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-6 flex justify-between items-center sticky top-0 z-50">
         <span className="font-black text-xl tracking-tight">Statmize Admin</span>
         <button onClick={() => setIsAuthenticated(false)} className="text-red-600 font-bold flex items-center gap-2"><LogOut size={16} /> Logout</button>
      </header>

      <div className="max-w-7xl mx-auto p-6 lg:p-12">
         {/* Layout Control */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6">
            <div className="w-full">
               <h1 className="text-3xl font-black mb-4">Database Overview</h1>
               <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl overflow-x-auto">
                   {[
                       { id: 'leads', icon: <User size={14}/>, label: 'Waitlist', count: leads.length },
                       { id: 'contacts', icon: <MessageSquare size={14}/>, label: 'Messages', count: contacts.length },
                       { id: 'surveys', icon: <ClipboardList size={14}/>, label: 'Surveys', count: surveys.length },
                       // NEW TAB
                       { id: 'launch', icon: <Rocket size={14}/>, label: 'Temporary List', count: launchList.length }
                   ].map((tab) => (
                       <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}>
                            {tab.icon} {tab.label} <span className="bg-black/5 px-2 py-0.5 rounded-md ml-1">{tab.count}</span>
                       </button>
                   ))}
               </div>
            </div>
         </div>

         {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#A06CD5]" size={40} /></div>
         ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               {/* Horizontal Scroll Container for Tables */}
               <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="p-6">Details</th>
                                {activeTab === 'leads' && <th className="p-6">Role / Sport</th>}
                                {activeTab === 'surveys' && <th className="p-6">Confusion / Sport</th>}
                                {activeTab === 'launch' && <th className="p-6">Source</th>}
                                <th className="p-6 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 cursor-pointer">
                            {(activeTab === 'leads' ? leads : activeTab === 'contacts' ? contacts : activeTab === 'surveys' ? surveys : launchList).map((item) => (
                                <tr key={item.id} onClick={() => setSelectedRecord(item)} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6">
                                        <div className="font-bold">{item.name || item.email || 'Anonymous'}</div>
                                        {item.name && <div className="text-xs text-gray-400">{item.email}</div>}
                                    </td>
                                    
                                    {/* Existing Tabs Logic */}
                                    {activeTab === 'leads' && (
                                        <td className="p-6">
                                            <div className="text-[10px] font-black uppercase text-blue-600">{item.role}</div>
                                            <div className="text-xs font-bold text-gray-500">{item.sport}</div>
                                        </td>
                                    )}
                                    {activeTab === 'surveys' && (
                                        <td className="p-6">
                                            <div className="text-[10px] font-black uppercase text-purple-600">CONFUSION: {item.confusionScale}/5</div>
                                            <div className="text-xs font-bold text-gray-500">{item.primarySport}</div>
                                        </td>
                                    )}

                                    {/* NEW: Launch List Column */}
                                    {activeTab === 'launch' && (
                                        <td className="p-6">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                {item.source || 'Genesis'}
                                            </span>
                                        </td>
                                    )}

                                    <td className="p-6 text-right text-xs text-gray-400 font-bold">
                                        {/* Handle both 'createdAt' (old) and 'timestamp' (new launch list) */}
                                        {(item.createdAt || item.timestamp)?.seconds ? new Date((item.createdAt || item.timestamp).seconds * 1000).toLocaleDateString() : 'New'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               </div>
            </div>
         )}
      </div>

      {/* --- RECORD DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRecord(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">{selectedRecord.type} Record</span>
                    <button onClick={() => setSelectedRecord(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
                </div>

                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                        <label className="text-[10px] font-black text-gray-400 uppercase">Email Address</label>
                        <div className="font-bold break-all flex items-center gap-2 text-xl">{selectedRecord.email} <ExternalLink size={16} className="text-gray-300"/></div>
                    </div>

                    {/* Launch List Specific */}
                    {selectedRecord.type === 'Launch Access' && (
                        <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                            <label className="text-[10px] font-black text-green-600 uppercase">Status</label>
                            <div className="text-lg font-black text-green-800">Early Access Requested</div>
                            <p className="text-xs text-green-600 mt-1">Source: {selectedRecord.source}</p>
                        </div>
                    )}

                    {/* Regular Contact Info (if available) */}
                    {selectedRecord.name && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <label className="text-[10px] font-black text-gray-400 uppercase">Name</label>
                                <div className="font-bold">{selectedRecord.name}</div>
                            </div>
                            {selectedRecord.phone && (
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Phone</label>
                                    <div className="font-bold">{selectedRecord.phone}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Survey Specifics */}
                    {selectedRecord.type === 'Survey' && (
                        <div className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                                <label className="text-[10px] font-black text-purple-400 uppercase">Key Frustration</label>
                                <div className="text-sm font-medium leading-relaxed italic">"{selectedRecord.frustrations}"</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Role</label>
                                    <div className="font-bold">
                                        {selectedRecord.userDescription === 'Other' ? `Other: ${selectedRecord.userDescriptionOther}` : selectedRecord.userDescription}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Sport</label>
                                    <div className="font-bold">{selectedRecord.primarySport}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedRecord.message && (
                        <div className="bg-gray-50 p-4 rounded-2xl">
                            <label className="text-[10px] font-black text-gray-400 uppercase">Message</label>
                            <div className="text-sm leading-relaxed">{selectedRecord.message}</div>
                        </div>
                    )}
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}