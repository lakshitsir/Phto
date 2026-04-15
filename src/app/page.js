"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Instagram, Send, Ghost, Check, Share2 } from 'lucide-react';

const PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e', name: 'V_01.jpg' },
  { id: 2, url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda', name: 'V_02.jpg' },
  // Add your image URLs here
];

export default function Vault() {
  const [selected, setSelected] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const downloadFile = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  };

  const handleDownload = () => {
    const list = selected.length > 0 ? PHOTOS.filter(p => selected.includes(p.id)) : PHOTOS;
    list.forEach((p, i) => setTimeout(() => downloadFile(p.url, p.name), i * 400));
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-5 flex justify-between items-center">
        <h1 className="text-xs font-black tracking-[0.6em] uppercase italic">Photo's Vault</h1>
        <div className="flex gap-4">
          <button onClick={() => setIsSelectMode(!isSelectMode)} className="text-[10px] opacity-40 uppercase tracking-widest">
            {isSelectMode ? "[ Cancel ]" : "[ Select ]"}
          </button>
          <button onClick={handleDownload} className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase">
            Download {selected.length > 0 ? `(${selected.length})` : "All"}
          </button>
        </div>
      </nav>

      {/* Grid */}
      <main className="pt-[72px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {PHOTOS.map((p) => (
          <div 
            key={p.id} 
            onClick={() => isSelectMode && setSelected(prev => prev.includes(p.id) ? prev.filter(x => x!==p.id) : [...prev, p.id])}
            className="relative aspect-square group overflow-hidden border-[0.5px] border-white/5"
          >
            <img src={p.url} className={`w-full h-full object-cover transition-transform duration-700 ${selected.includes(p.id) ? 'scale-90 opacity-40' : 'group-hover:scale-110'}`} />
            {!isSelectMode && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => downloadFile(p.url, p.name)} className="p-4 bg-white text-black rounded-full"><Download size={20}/></button>
              </div>
            )}
            {selected.includes(p.id) && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={40}/>}
          </div>
        ))}
      </main>

      {/* Footer & Socials */}
      <footer className="py-24 flex flex-col items-center bg-[#050505]">
        <div className="flex gap-12 mb-8">
          <a href="https://instagram.com/pxl.lakshit" target="_blank" className="hover:text-pink-500 transition-all"><Instagram size={28}/></a>
          <a href="https://t.me/pxllakshit" target="_blank" className="hover:text-blue-400 transition-all"><Send size={28}/></a>
          <a href="https://www.snapchat.com/add/enc.lakshitt" target="_blank" className="hover:text-yellow-400 transition-all"><Ghost size={28}/></a>
        </div>
        <p className="text-[9px] tracking-[0.5em] opacity-20 uppercase">No compression • Original Quality • Vault v2.6</p>
      </footer>
    </div>
  );
        }
        
