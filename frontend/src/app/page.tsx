"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Sparkles, Box, ArrowRight, Code, Layout, Hub, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Github Icon since it seems missing from this lucide version
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col font-sans">
      {/* Navigation */}
      <nav className="h-16 border-b border-white/5 flex items-center justify-between px-6 lg:px-12 backdrop-blur-md sticky top-0 z-50 bg-[#0f172a]/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Djinn</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/docs" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Documentation</Link>
          <Link href="/registry" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Registry</Link>
          <Link href="/themes" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Themes</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" className="p-2 text-slate-400 hover:text-white transition-colors">
            <GitHubIcon size={20} />
          </Link>
          <Link href="/registry" className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8"
          >
            The shadcn/ui for Django is here
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            OWN YOUR UI.<br />
            <span className="text-blue-600">BUILT FOR DJANGO.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-medium"
          >
            Djinn is a registry-driven component platform. Copy high-quality source code directly into your project. No abstractions, just clean Django templates and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:row gap-4 mb-20"
          >
            <Link href="/registry" className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-lg hover:bg-blue-500 transition-all flex items-center gap-3 group shadow-2xl shadow-blue-600/30">
              Browse Components <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Terminal Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-3xl rounded-2xl border border-white/5 bg-[#020617] shadow-2xl overflow-hidden text-left"
          >
            <div className="bg-slate-900/50 px-5 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest font-mono">zsh — djinn-cli</span>
            </div>
            <div className="p-8 font-mono text-sm space-y-3">
              <div className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold">$</span>
                <span>pip install djinn-cli</span>
              </div>
              <div className="text-emerald-400 font-medium">Successfully installed djinn-cli-1.0.4</div>
              <div className="flex gap-3 pt-3">
                <span className="text-blue-600 font-bold">$</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="text-white overflow-hidden whitespace-nowrap border-r-2 border-blue-600"
                >
                  djinn add button
                </motion.span>
              </div>
              <div className="text-blue-400 animate-pulse">⠋ Fetching button from registry...</div>
              <div className="text-emerald-400">✔ Created components/ui/button.html</div>
              <div className="text-emerald-400">✔ Created components/ui/button.py</div>
              <div className="flex gap-3 pt-3">
                <span className="text-blue-600 font-bold">$</span>
                <span className="w-2 h-5 bg-blue-600 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="bg-slate-950 py-24 px-6 lg:px-12 border-y border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 mx-auto">
                <Code size={28} />
              </div>
              <h3 className="font-black text-xl uppercase tracking-tight">Django Components</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Native support for django-components and template partials. No complex JS bridge required.</p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-400 mx-auto">
                <Terminal size={28} />
              </div>
              <h3 className="font-black text-xl uppercase tracking-tight">Powerful CLI</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Add, update, and diff components directly from your terminal. Built for speed.</p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-400 mx-auto">
                <Sparkles size={28} />
              </div>
              <h3 className="font-black text-xl uppercase tracking-tight">AI Assisted</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Generate custom variants or refactor existing components using our integrated AI forge.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-6 lg:px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 bg-[#020617]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-sm font-black uppercase tracking-tighter">Djinn</span>
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">© 2026 Djinn Systems. The Professional Component Registry.</p>
        <div className="flex gap-8">
          <Link href="#" className="text-slate-400 hover:text-white transition-colors"><GitHubIcon size={20} /></Link>
          <Link href="#" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Discord</Link>
          <Link href="#" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Twitter</Link>
        </div>
      </footer>
    </div>
  );
}
