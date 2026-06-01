"use client";

import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Terminal, Layout, Palette, Code, Command } from "lucide-react";

export default function DocsPage() {
  return (
    <MainLayout
      leftSidebar={
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Documentation</h3>
            <div className="space-y-1">
              {[
                { name: "Getting Started", icon: <Terminal size={14} /> },
                { name: "CLI Reference", icon: <Command size={14} /> },
                { name: "Theming Guide", icon: <Palette size={14} /> },
                { name: "Component Registry", icon: <Layout size={14} /> },
                { name: "Best Practices", icon: <Code size={14} /> },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer group transition-colors">
                  <span className="text-slate-500 group-hover:text-blue-500 transition-colors">{item.icon}</span>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="p-12 max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter">Djinn Architecture</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Djinn is a registry-driven component platform designed to bridge the gap between visual design and Django development.
            </p>
          </section>

          <section className="grid grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold">Web UI (The Architect)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    The visual workspace where you browse the registry, customize components, and design theme tokens. Use it to prototype and define the visual language of your project.
                </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-500">
                    <Command size={24} />
                </div>
                <h3 className="text-xl font-bold">CLI (The Builder)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    The bridge to your local environment. Use <code>djinn add &lt;component&gt;</code> to fetch source code directly into your Django project's <code>components/ui</code> directory.
                </p>
            </div>
          </section>

          <section className="p-8 rounded-2xl bg-blue-600/10 border border-blue-600/20 space-y-6">
             <h3 className="text-xl font-bold flex items-center gap-3">
                <Palette className="text-blue-500" />
                Integration Workflow
             </h3>
             <ol className="space-y-4">
                <li className="flex gap-4">
                    <span className="flex-none w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">1</span>
                    <p className="text-sm text-slate-300"><span className="text-white font-bold">Design:</span> Use the Theme Editor to export your <code>globals.css</code> or Tailwind config.</p>
                </li>
                <li className="flex gap-4">
                    <span className="flex-none w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">2</span>
                    <p className="text-sm text-slate-300"><span className="text-white font-bold">Preview:</span> Select components in the Workbench to see them rendered with your theme.</p>
                </li>
                <li className="flex gap-4">
                    <span className="flex-none w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">3</span>
                    <p className="text-sm text-slate-300"><span className="text-white font-bold">Install:</span> Run <code>djinn add button</code> in your terminal to own the code locally.</p>
                </li>
             </ol>
          </section>
        </div>
      }
    />
  );
}
