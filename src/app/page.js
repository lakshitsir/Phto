"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Instagram, Send, Ghost, CheckCircle2, MousePointer2 } from 'lucide-react';

const PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', name: 'Vault_01.jpg' },
  { id: 2, url: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02', name: 'Vault_02.jpg' },
  { id: 3, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1', name: 'Vault_03.jpg' },
  { id: 4, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', name: 'Vault_04.jpg' },
  // More photos...
];

export default function Vault() {
  const [selected, setSelected] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  // Direct Download Logic (No Zip)
  const downloadFile = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSelected = () => {
    const items = selected.length > 0 ? PHOTOS.filter(p => selected.includes(p.id)) : PHOTOS;
    items.forEach((p, index) => {
      setTimeout(() => downloadFile(p.url, p.name), index * 300); // Small delay for browser stability
    });
  };

  return (
    <div className="min-h-screen bg-[#000] text-[#fff] font-sans selection:bg-white selection:text-black">
      {/* 2026 Stealth Navbar */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/80 backdrop-blur-3xl px-6 py-5 flex justify-between items-center">
        <h1 className="text-sm font-bold tracking-[0.5em] uppercase opacity-80">Photo's Vault</h1>
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => {setIsSelectMode(!isSelectMode); setSelected([]);}}
            className="text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition"
          >
            {isSelectMode ? "[ Cancel ]" : "[ Select Mode ]"}
          </button>
          <button 
            onClick={downloadSelected}
            className="bg-white text-black px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:invert transition active:scale-95"
          >
            {selected.length > 0 ? `Get ${selected.length} Files` : "Download All"}
          </button>
        </div>
      </nav>

      {/* Zero-Gap Premium Grid */}
      <main className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
        {PHOTOS.map((photo) => (
          <motion.div 
            key={photo.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative aspect-square group cursor-crosshair overflow-hidden"
            onClick={() => isSelectMode && setSelected(prev => prev.includes(photo.id) ? prev.filter(i => i !== photo.id) : [...prev, photo.id])}
          >
            <img 
              src={photo.url} 
              className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${selected.includes(photo.id) ? 'scale-90 opacity-50' : ''}`}
              alt="Vault Item"
            />
            
            {/* Minimalist Overlay */}
            {!isSelectMode && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); downloadFile(photo.url, photo.name); }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition"
                >
                  <Download size={20} />
                </button>
              </div>
            )}

            {isSelectMode && selected.includes(photo.id) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 size={40} className="text-white drop-shadow-2xl" />
              </div>
            )}
          </motion.div>
        ))}
      </main>

      {/* Aesthetic Social Footer */}
      <footer className="py-20 px-6 border-t border-white/5 flex flex-col items-center">
        <div className="flex gap-12 mb-12">
          <a href="https://instagram.com/pxl.lakshit" target="_blank" className="opacity-40 hover:opacity-100 hover:scale-125 transition">
            <Instagram size={24} />
          </a>
          <a href="https://t.me/pxllakshit" target="_blank" className="opacity-40 hover:opacity-100 hover:scale-125 transition">
            <Send size={24} />
          </a>
          <a href="https://www.snapchat.com/add/enc.lakshitt" target="_blank" className="opacity-40 hover:opacity-100 hover:scale-125 transition">
            <Ghost size={24} />
          </a>
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase opacity-20">Securely Hosted on Vercel Edge</p>
      </footer>
    </div>
  );
  }
    
