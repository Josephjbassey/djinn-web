"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RefreshCw, CheckCircle, AlertCircle, Terminal, Command } from "lucide-react";

export default function SyncPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Project Overview</h3>
          <div className="space-y-4">
             <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Project</div>
                <div className="text-sm font-bold">djinn-preview-project</div>
             </div>
             <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Components Tracked</div>
                <div className="text-sm font-bold">12 / 144</div>
             </div>
          </div>
        </div>
      }
      canvas={
        <div className="p-12 max-w-4xl mx-auto space-y-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black tracking-tighter">CLI Sync</h1>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
                <RefreshCw size={14} /> Full Sync
            </button>
          </div>

          <div className="space-y-6">
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold">CLI Connection Active</h4>
                        <p className="text-xs text-slate-500">Waiting for local changes in ~/projects/my-django-app</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Connected</div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Terminal size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Local Status</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Modified:</span>
                            <span className="text-white font-mono font-bold">button.html</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Added:</span>
                            <span className="text-white font-mono font-bold">input_search.html</span>
                        </div>
                    </div>
                 </div>
                 <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Command size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Registry Sync</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Push local customizations back to your private registry to share across projects.
                    </p>
                    <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Push Updates</button>
                 </div>
             </div>

             <div className="space-y-4 pt-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal Integration</h3>
                <div className="p-6 bg-black rounded-2xl border border-white/10 font-mono text-sm space-y-2">
                    <div className="flex gap-2 text-slate-500">
                        <span>$</span>
                        <span className="text-blue-400">djinn sync</span>
                    </div>
                    <div className="text-slate-300">⠋ Analyzing project structure...</div>
                    <div className="text-emerald-400">✔ Found components/ui directory</div>
                    <div className="text-slate-300">⠋ Syncing 12 components with registry...</div>
                    <div className="text-white">✔ Sync complete. Local project is up to date.</div>
                </div>
             </div>
          </div>
        </div>
      }
    />
  );
}
