"use client";
import { useState } from 'react';

export default function Admin() {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);

  if(!auth) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <input 
        type="password" 
        placeholder="Master Key" 
        className="bg-zinc-900 border border-white/10 p-4 rounded-xl text-center outline-none"
        onChange={(e) => e.target.value === "VAULT2026" && setAuth(true)}
      />
    </div>
  )

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black mb-10">ADMIN DASHBOARD</h1>
      <div className="border-2 border-dashed border-zinc-800 p-20 text-center rounded-3xl">
        <p className="opacity-40">Drag & Drop original RAW files here to upload to Vercel/Supabase</p>
      </div>
    </div>
  )
    }
          
