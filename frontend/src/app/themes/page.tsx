"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Palette, Sparkles, Save, RotateCcw, Copy, Trash } from "lucide-react";

export default function ThemesPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Design Tokens</h3>
            <div className="space-y-1">
              {["Colors", "Typography", "Border Radius", "Shadows", "Spacing Scale"].map(token => (
                <div key={token} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                  <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{token}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Presets</h3>
            <div className="space-y-2">
               {["Cyber Noir", "Zinc Slate", "Deep Forest"].map(preset => (
                 <div key={preset} className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-slate-900/50 hover:border-blue-500/30 cursor-pointer transition-all">
                   <div className={preset === "Cyber Noir" ? "w-3 h-3 rounded-full bg-blue-600" : preset === "Zinc Slate" ? "w-3 h-3 rounded-full bg-slate-500" : "w-3 h-3 rounded-full bg-emerald-600"} />
                   <span className="text-xs font-bold text-slate-400">{preset}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="p-8 max-w-5xl mx-auto space-y-12">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2">Theme Editor</h1>
              <p className="text-slate-400 font-medium">Manage CSS variables and Tailwind design tokens.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
                <RotateCcw size={12} /> Reset
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20">
                <Save size={12} /> Save Changes
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg uppercase tracking-tight">Brand Colors</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-blue-500">+ Add Token</button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Primary", value: "#3b82f6", color: "bg-blue-500" },
                  { label: "Accent", value: "#f43f5e", color: "bg-rose-500" },
                  { label: "Background", value: "#0f172a", color: "bg-[#0f172a]" },
                  { label: "Surface", value: "#1e293b", color: "bg-slate-800" },
                ].map(token => (
                  <div key={token.label} className="p-4 rounded-xl border border-white/5 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg border border-white/10 ${token.color}`} />
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{token.label}</div>
                        <div className="text-xs font-mono font-bold uppercase">{token.value}</div>
                      </div>
                    </div>
                    <button className="p-2 text-slate-600 hover:text-white transition-colors"><Copy size={14}/></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="font-black text-lg uppercase tracking-tight">Typography Scale</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Base Font Size</div>
                   <div className="h-1.5 w-full bg-slate-800 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full w-[40%] bg-blue-600 rounded-full" />
                      <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-600 shadow-xl shadow-blue-600/40" />
                   </div>
                   <div className="flex justify-between text-[10px] font-mono text-slate-600">
                      <span>12px</span>
                      <span className="text-blue-400 font-bold">16px</span>
                      <span>24px</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Line Height</div>
                   <div className="h-1.5 w-full bg-slate-800 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full w-[60%] bg-blue-600 rounded-full" />
                      <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-600 shadow-xl shadow-blue-600/40" />
                   </div>
                   <div className="flex justify-between text-[10px] font-mono text-slate-600">
                      <span>1.0</span>
                      <span className="text-blue-400 font-bold">1.5</span>
                      <span>2.0</span>
                   </div>
                </div>
              </div>
            </section>

            <section className="pt-10">
              <div className="p-8 rounded-2xl border border-white/5 bg-[#020617] space-y-8 flex flex-col items-center text-center">
                 <h2 className="text-2xl font-black tracking-tighter">Live Theme Preview</h2>
                 <div className="flex gap-4">
                    <button className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Primary Action</button>
                    <button className="px-6 py-2.5 bg-slate-800 text-slate-100 text-[10px] font-black uppercase tracking-widest rounded-md">Secondary</button>
                    <button className="px-6 py-2.5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-md">Outline</button>
                 </div>
                 <div className="space-y-2 max-w-md">
                    <h3 className="text-xl font-black tracking-tight">The quick brown fox jumps over the lazy dog</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Developers visually build, preview, customize, and install reusable Django UI components directly into their projects.</p>
                 </div>
              </div>
            </section>
          </div>
        </div>
      }
      rightSidebar={
        <div className="p-0 flex flex-col h-full">
           <div className="p-6 border-b border-white/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Theme Export</h3>
              <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-white/5 mb-6">
                 {["CSS", "Tailwind", "JSON"].map(format => (
                   <button key={format} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${format === "CSS" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}>{format}</button>
                 ))}
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] text-slate-400 space-y-1">
                 <div className="text-slate-600">:root {"{"}</div>
                 <div className="pl-4">--primary: <span className="text-blue-400">#3b82f6</span>;</div>
                 <div className="pl-4">--accent: <span className="text-rose-400">#f43f5e</span>;</div>
                 <div className="pl-4">--radius: <span className="text-emerald-400">0.5rem</span>;</div>
                 <div className="text-slate-600">{"}"}</div>
              </div>
              <button className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                 <Copy size={14} /> Copy to Clipboard
              </button>
           </div>
           <div className="flex-1 p-6 space-y-6">
              <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10 space-y-4">
                 <div className="flex items-center gap-2 text-blue-400">
                    <Sparkles size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Theme Generator</span>
                 </div>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                   Describe a mood or brand style to generate a matching color palette.
                 </p>
                 <div className="space-y-3">
                    <input type="text" placeholder="e.g. 'Cyberpunk neon night'" className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-[10px] focus:outline-none focus:border-blue-500/50" />
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Generate Theme</button>
                 </div>
              </div>
           </div>
           <div className="p-6 border-t border-white/5 bg-slate-900/30">
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30">
                 <Save size={16} /> Publish to Registry
              </button>
           </div>
        </div>
      }
      bottomDrawer={null}
    />
  );
}
