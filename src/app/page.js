"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Instagram, Send, Ghost, Check, X, Maximize2, Layers } from 'lucide-react';

// 50 Photos Logic
const TOTAL_PHOTOS = 50;
const VAULT_NAME = "Photo's Vault";

// Yahan tum apne Supabase ya kisi bhi Storage ke links daaloge
const PHOTOS = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
  id: i + 1,
  url: `https://your-storage-link.com/lakshit_${(i + 1).toString().padStart(2, '0')}.jpg`,
  name: `lakshit_${(i + 1).toString().padStart(2, '0')}.jpg`
}));

export default function Vault() {
  const [selected, setSelected] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [preview, setPreview] = useState(null);

  const downloadFile = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAllDownload = () => {
    const list = selected.length > 0 ? PHOTOS.filter(p => selected.includes(p.id)) : PHOTOS;
    list.forEach((p, i) => {
      setTimeout(() => downloadFile(p.url, p.name), i * 500); // 50+ photos ke liye safe delay
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* 2026 Minimalist Header */}
      <nav className="fixed top-0 w-full z-[100] bg-black/40 backdrop-blur-3xl border-b border-white/5 px-6 py-6 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xs font-black tracking-[0.8em] uppercase italic opacity-80">{VAULT_NAME}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] tracking-[0.2em] uppercase opacity-40">Direct Raw Access • {TOTAL_PHOTOS} Items</span>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <button onClick={() => {setIsSelectMode(!isSelectMode); setSelected([]);}} className="text-[9px] tracking-widest uppercase opacity-40 hover:opacity-100 transition">
            {isSelectMode ? "[ Cancel ]" : "[ Select Mode ]"}
          </button>
          <button onClick={handleAllDownload} className="bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tighter hover:invert transition-all active:scale-95">
             {selected.length > 0 ? `Get ${selected.length} RAWs` : "Download All"}
          </button>
        </div>
      </nav>

      {/* Zero Gap Bento-Style Grid */}
      <main className="pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-0">
        {PHOTOS.map((p) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden group border-[0.2px] border-white/5 bg-zinc-900"
            onClick={() => isSelectMode && setSelected(prev => prev.includes(p.id) ? prev.filter(x => x!==p.id) : [...prev, p.id])}
          >
            <img 
              src={p.url} 
              className={`w-full h-full object-cover transition-transform duration-[2s] ease-in-out 
                ${selected.includes(p.id) ? 'scale-75 opacity-30 grayscale' : 'group-hover:scale-110'}`}
              alt={p.name}
              loading="lazy"
            />
            
            {/* Minimalist Controls */}
            {!isSelectMode && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                <button onClick={(e) => {e.stopPropagation(); setPreview(p);}} className="p-3 glass rounded-full hover:bg-white hover:text-black transition"><Maximize2 size={18}/></button>
                <button onClick={(e) => {e.stopPropagation(); downloadFile(p.url, p.name);}} className="p-3 bg-white text-black rounded-full hover:scale-110 transition"><Download size={18}/></button>
              </div>
            )}

            {isSelectMode && selected.includes(p.id) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white text-black p-2 rounded-full ring-8 ring-black/50">
                   <Check size={20} strokeWidth={4}/>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </main>

      {/* Socials & Profile - Aesthetic Branding */}
      <footer className="py-40 bg-black border-t border-white/5 flex flex-col items-center">
        <div className="flex gap-16 mb-16">
          <a href="https://instagram.com/pxl.lakshit" target="_blank" className="opacity-30 hover:opacity-100 hover:scale-125 transition-all text-white">
            <Instagram size={24}/>
          </a>
          <a href="https://t.me/pxllakshit" target="_blank" className="opacity-30 hover:opacity-100 hover:scale-125 transition-all text-white">
            <Send size={24}/>
          </a>
          <a href="https://www.snapchat.com/add/enc.lakshitt" target="_blank" className="opacity-30 hover:opacity-100 hover:scale-125 transition-all text-white">
            <Ghost size={24}/>
          </a>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-[9px] tracking-[0.8em] opacity-20 uppercase italic">Maximum Quality Secured</p>
          <p className="text-[8px] tracking-[0.4em] opacity-10 uppercase font-bold">Encrypted Endpoints • No Compression</p>
        </div>
      </footer>

      {/* Fullscreen Preview (0% Drop) */}
      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
             <button onClick={() => setPreview(null)} className="absolute top-10 right-10 p-2 opacity-50 hover:opacity-100 transition"><X size={32}/></button>
             <img src={preview.url} className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" />
             <div className="mt-10 text-center">
                <p className="text-xs tracking-widest opacity-40 mb-4">{preview.name}</p>
                <button onClick={() => downloadFile(preview.url, preview.name)} className="bg-white text-black px-12 py-4 rounded-full font-black text-[11px] uppercase tracking-tighter">Download Original File</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
    }
    
