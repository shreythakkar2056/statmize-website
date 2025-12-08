'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKaIAPoGqG1X37Sfbhi5gfaR5_BKUc6Fs",
  authDomain: "statmize-web.firebaseapp.com",
  projectId: "statmize-web",
  storageBucket: "statmize-web.firebasestorage.app",
  messagingSenderId: "221315671548",
  appId: "1:221315671548:web:22215951627f9626e9be79"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Loader2, Download, User } from 'lucide-react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data Function
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(collection(db, "interest_leads"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-black font-sans">
      
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <span className="font-bold text-xl">Statmize Admin</span>
         </div>
         <div className="flex gap-4">
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold text-sm">
               {leads.length} Total Leads
            </div>
         </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
         <div className="flex justify-between items-end mb-6">
            <div>
               <h1 className="text-3xl font-bold mb-2">Interest Leads</h1>
               <p className="text-gray-500">Real-time submissions from the landing page.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black">
               <Download size={16} /> Export CSV
            </button>
         </div>

         {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-black" size={40} /></div>
         ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                 <User size={14} className="text-gray-500"/>
                              </div>
                              {lead.name}
                           </td>
                           <td className="p-6 text-gray-600">{lead.email}</td>
                           <td className="p-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                 lead.role === 'Investor' ? 'bg-green-100 text-green-700' :
                                 lead.role === 'Coach' ? 'bg-blue-100 text-blue-700' :
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
               {leads.length === 0 && (
                  <div className="p-12 text-center text-gray-400">No leads found yet.</div>
               )}
            </div>
         )}
      </div>
    </main>
  );
}