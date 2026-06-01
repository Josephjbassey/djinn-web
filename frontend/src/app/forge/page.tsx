"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Sparkles, Send, Zap, Clock, Terminal, Box } from "lucide-react";

export default function ForgePage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Recent Forges</h3>
            <div className="space-y-1">
              {["Pricing Table Grid", "Dashboard Sidebar", "Auth Modal with Social"].map(forge => (
                <div key={forge} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                  <Clock size={12} className="text-slate-600 group-hover:text-blue-500" />
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors truncate">{forge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="h-full flex flex-col bg-[#020617]">
          <div className="flex-1 overflow-auto p-8 space-y-8">
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shrink-0">
                   <Sparkles size={16} className="text-white" />
                </div>
                <div className="p-6 rounded-2xl rounded-tl-none border border-white/5 bg-slate-900/50 max-w-2xl">
                   <p className="text-sm font-medium leading-relaxed">
                      Greetings, Architect. I am the Djinn. Describe the Django component you wish to forge today.
                   </p>
                </div>
             </div>

             <div className="flex flex-row-reverse items-start gap-4">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0 text-[10px] font-black">JD</div>
                <div className="p-6 rounded-2xl rounded-tr-none border border-blue-600/20 bg-blue-600/5 max-w-2xl">
                   <p className="text-sm font-medium leading-relaxed">
                      Create a SaaS pricing card grid with three tiers. Use Tailwind for styling and include a 'Most Popular' badge on the middle card. I need it to be a reusable Django component.
                   </p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shrink-0">
                   <Sparkles size={16} className="text-white" />
                </div>
                <div className="p-6 rounded-2xl rounded-tl-none border border-white/5 bg-slate-900/50 max-w-2xl space-y-4">
                   <p className="text-sm font-medium leading-relaxed">
                      Understood. I am forging the 'Pricing Grid' component registry. I'll include variants for monthly/yearly toggles using Alpine.js for the interaction logic.
                   </p>
                   <div className="space-y-2">
                      {[
                        { label: "Analyzing design tokens...", status: "done" },
                        { label: "Scaffolding Django template structure...", status: "done" },
                        { label: "Applying Tailwind utility classes...", status: "loading" },
                        { label: "Generating Registry JSON...", status: "pending" },
                      ].map(step => (
                        <div key={step.label} className="flex items-center gap-3">
                           <div className={`w-1.5 h-1.5 rounded-full ${step.status === 'done' ? 'bg-emerald-500' : step.status === 'loading' ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`} />
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-600' : 'text-slate-400'}`}>{step.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
          <div className="p-8 border-t border-white/5 bg-slate-950/50">
             <div className="max-w-4xl mx-auto relative">
                <textarea
                  placeholder="Describe a component or ask for a modification..."
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl p-6 pr-16 text-sm focus:outline-none focus:border-blue-600/50 transition-all min-h-[120px] resize-none"
                />
                <button className="absolute right-4 bottom-4 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all">
                   <Send size={18} />
                </button>
             </div>
             <div className="flex justify-center gap-6 mt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Suggested:</span>
                {["Add HTMX loading state", "Make it dark mode only", "Convert to Alpine.js"].map(s => (
                  <button key={s} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-colors">{s}</button>
                ))}
             </div>
          </div>
        </div>
      }
      rightSidebar={
        <div className="p-6 space-y-8">
           <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Forge Parameters</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Primary Stack</div>
                    <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-white/5">
                       {["Tailwind", "Bootstrap"].map(s => (
                         <button key={s} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md ${s === 'Tailwind' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>{s}</button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Logic Engine</div>
                    <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-white/5">
                       {["Alpine", "HTMX", "Vanilla"].map(s => (
                         <button key={s} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md ${s === 'Alpine' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>{s}</button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
           <div className="pt-8 border-t border-white/5">
              <button className="w-full py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                 <Terminal size={14} /> Export All Files
              </button>
           </div>
        </div>
      }
      bottomDrawer={null}
    />
  );
}
