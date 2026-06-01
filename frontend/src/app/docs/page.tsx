"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Hub, MenuBook, History, Accessibility, Hub as HubIcon, ZoomIn, ZoomOut, Filter } from "lucide-react";

export default function DocsPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Dependency Graph</h3>
            <div className="space-y-1">
              {["Visualizer", "Circular Deps", "Dead Code"].map(item => (
                <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                   <span className={`text-xs font-bold ${item === "Visualizer" ? "text-white" : "text-slate-400"}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Documentation</h3>
            <div className="space-y-1">
              {["API Reference", "Accessibility", "Changelog"].map(item => (
                <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
                   <span className="text-xs font-bold text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="h-full flex flex-col relative overflow-hidden">
           <div className="absolute inset-0 bg-[#020617] bg-[radial-gradient(#3b82f611_1px,transparent_1px)] [background-size:20px_20px]" />

           <div className="relative flex-1 p-12 flex items-center justify-center">
              <div className="flex items-center gap-24">
                 <div className="p-6 rounded-2xl border border-blue-600/50 bg-blue-600/10 shadow-2xl shadow-blue-600/20 w-48 text-center space-y-2 relative">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">Core Component</div>
                    <div className="text-lg font-black tracking-tighter">Button</div>
                    <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-24 h-px bg-blue-600/50" />
                 </div>
                 <div className="space-y-12">
                    {["Icon", "Spinner", "Tooltip"].map(dep => (
                      <div key={dep} className="p-6 rounded-2xl border border-white/10 bg-slate-900 w-48 text-center space-y-1 relative">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Utility</div>
                        <div className="text-sm font-black tracking-tighter text-slate-300">{dep}</div>
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-px bg-blue-600/30" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="absolute bottom-8 right-8 flex gap-2">
              <button className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"><ZoomIn size={18}/></button>
              <button className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"><ZoomOut size={18}/></button>
              <button className="w-10 h-10 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"><Filter size={18}/></button>
           </div>
        </div>
      }
      rightSidebar={
        <div className="p-6 space-y-8">
           <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Node Inspector</h3>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                    <Box size={24} />
                 </div>
                 <div>
                    <div className="text-lg font-black tracking-tighter">Button</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">v1.2.4 • Core</div>
                 </div>
              </div>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors mb-8">Open Source</button>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Dependencies (4)</h4>
                 {["lucide-icons", "django-components", "tailwindcss", "alpinejs"].map(d => (
                   <div key={d} className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-300">{d}</span>
                      <span className="text-slate-600 uppercase text-[9px] font-black tracking-widest">{d === 'django-components' ? 'Python' : d === 'tailwindcss' ? 'CSS' : 'JS'}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      }
      bottomDrawer={null}
    />
  );
}
