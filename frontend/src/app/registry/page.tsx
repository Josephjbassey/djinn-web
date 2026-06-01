"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Grid, Search, Filter, Download, Zap, Terminal, Box } from "lucide-react";

export default function RegistryPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Categories</h3>
            <div className="space-y-1">
              {["Buttons", "Inputs", "Navigation", "Cards", "Forms", "Tables"].map(cat => (
                <div key={cat} className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{cat}</span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-blue-400">12</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Logic</h3>
            <div className="space-y-2">
               {["HTMX", "Alpine.js", "Vanilla JS"].map(logic => (
                 <label key={logic} className="flex items-center gap-2 cursor-pointer group">
                   <div className="w-4 h-4 rounded border border-white/10 bg-slate-900 group-hover:border-blue-500/50 transition-colors" />
                   <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{logic}</span>
                 </label>
               ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="p-8 max-w-6xl mx-auto space-y-12">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2">Component Registry</h1>
              <p className="text-slate-400 font-medium">Explore 240+ production-ready Django components.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                <Filter size={12} /> Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20">
                <Download size={12} /> Bulk Install
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Button", cat: "Buttons", desc: "Interactive triggers with variants", icon: <Zap size={20}/> },
              { name: "Input", cat: "Forms", desc: "Native styled form controls", icon: <Terminal size={20}/> },
              { name: "DataTable", cat: "Data Display", desc: "HTMX-powered server-side tables", icon: <Grid size={20}/> },
              { name: "Dialog", cat: "Overlays", desc: "Accessible modal interfaces", icon: <Box size={20}/> },
              { name: "Card", cat: "Layout", desc: "Content containers with headers", icon: <Grid size={20}/> },
              { name: "Navigation", cat: "Navigation", desc: "Sidebar and header systems", icon: <Zap size={20}/> },
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-white/5 bg-slate-900/50 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">{item.cat}</div>
                <h3 className="font-black text-lg mb-2">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">HTMX</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">Tailwind</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      rightSidebar={
        <div className="p-6 space-y-8">
           <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                 <button className="w-full p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-blue-500/30 transition-all text-left group">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-blue-400 transition-colors">Documentation</div>
                    <div className="text-xs font-bold">CLI Installation Guide</div>
                 </button>
                 <button className="w-full p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-blue-500/30 transition-all text-left group">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-blue-400 transition-colors">Contributions</div>
                    <div className="text-xs font-bold">Submit your component</div>
                 </button>
              </div>
           </div>
           <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-600/10 space-y-3">
              <div className="flex items-center gap-2 text-blue-400">
                <Zap size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Self-Host Registry</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Deploy Djinn inside your own VPC for private components and internal design systems.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">Learn More</button>
           </div>
        </div>
      }
      bottomDrawer={
        <div className="h-full flex flex-col">
          <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
            <div className="flex gap-6">
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 border-b-2 border-blue-400 pb-3 -mb-3">Statistics</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white pb-3 -mb-3 transition-colors">Recent Updates</button>
            </div>
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Registry v2.4.1</div>
          </div>
          <div className="flex-1 p-8 grid grid-cols-3 gap-12">
            {[
              { label: "Active Installs", value: "2,401", trend: "+12%" },
              { label: "Total Components", value: "248", trend: "+2" },
              { label: "Contributors", value: "142", trend: "+5" },
            ].map(stat => (
              <div key={stat.label} className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
