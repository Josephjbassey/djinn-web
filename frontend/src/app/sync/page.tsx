"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Sync, Folder, RefreshCw, AlertCircle, CheckCircle2, Terminal } from "lucide-react";

export default function SyncPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Local Projects</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600/10 border border-blue-600/20 cursor-pointer transition-colors">
                <Folder size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-white">nexus_dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                <Folder size={14} className="text-slate-600 group-hover:text-white" />
                <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">djinn_registry</span>
              </div>
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="p-12 max-w-6xl mx-auto space-y-12">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2">Project Sync Dashboard</h1>
              <p className="text-slate-400 font-medium">Managing components in <span className="font-mono text-blue-400">/users/dev/projects/nexus_dashboard</span></p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20">
               Sync All Outdated
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8">
             {[
               { label: "Installed", value: "24", trend: "+2", color: "text-white" },
               { label: "Outdated", value: "3", trend: "Action required", color: "text-amber-400" },
               { label: "Registry Version", value: "v2.4.1", trend: null, color: "text-blue-400" },
             ].map(stat => (
               <div key={stat.label} className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                  <div className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</div>
                  {stat.trend && <div className="text-[10px] font-bold text-slate-400 opacity-60">{stat.trend}</div>}
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="font-black text-xl tracking-tight">Component Status</h3>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                   <RefreshCw size={12} /> Refresh Local Scan
                </button>
             </div>
             <div className="space-y-3">
                {[
                  { name: "Button", path: "components/ui/button.html", status: "outdated", icon: <AlertCircle className="text-amber-500" size={16}/> },
                  { name: "DataTable", path: "components/ui/table.py", status: "synced", icon: <CheckCircle2 className="text-emerald-500" size={16}/> },
                  { name: "Dialog", path: "components/ui/modal.html", status: "synced", icon: <CheckCircle2 className="text-emerald-500" size={16}/> },
                ].map(comp => (
                  <div key={comp.name} className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 flex items-center justify-between group hover:border-white/10 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5">
                           {comp.icon}
                        </div>
                        <div>
                           <div className="font-bold text-sm mb-0.5">{comp.name}</div>
                           <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">{comp.path}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${comp.status === 'outdated' ? 'text-amber-500' : 'text-emerald-500'}`}>{comp.status}</span>
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">Details</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      }
      rightSidebar={
        <div className="p-8 space-y-12">
           <div className="space-y-6">
              <div className="flex items-center gap-3 text-blue-400">
                 <Terminal size={24} />
                 <h3 className="text-lg font-black tracking-tighter">CLI Sync</h3>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                 You can also run <code className="text-blue-400 bg-blue-400/10 px-1 rounded">djinn status</code> in your terminal to see this information directly in your development workflow.
              </p>
              <div className="p-6 rounded-2xl bg-slate-950 border border-white/5 font-mono text-[11px] text-emerald-400">
                 $ djinn sync --project nexus_dashboard
              </div>
           </div>
        </div>
      }
      bottomDrawer={null}
    />
  );
}
