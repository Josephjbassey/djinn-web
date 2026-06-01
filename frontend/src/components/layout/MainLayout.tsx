"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Grid, Box, Palette, Terminal, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  leftSidebar: React.ReactNode;
  canvas: React.ReactNode;
  rightSidebar: React.ReactNode;
  bottomDrawer: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({
  leftSidebar,
  canvas,
  rightSidebar,
  bottomDrawer,
}) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Top Navbar */}
      <header className="h-16 border-b border-border bg-secondary/20 flex items-center justify-between px-6 glass shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tighter">Djinn</span>
          </Link>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-1">
             <Link href="/registry" className="px-3 py-1.5 hover:bg-muted rounded-md text-xs font-medium flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground">
                <Grid size={14} /> Registry
             </Link>
             <Link href="/workbench" className="px-3 py-1.5 bg-accent/20 text-accent rounded-md text-xs font-bold flex items-center gap-2">
                <Box size={14} /> Workbench
             </Link>
             <Link href="/themes" className="px-3 py-1.5 hover:bg-muted rounded-md text-xs font-medium flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground">
                <Palette size={14} /> Themes
             </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-64 bg-slate-900/50 border border-border rounded-lg py-2 pl-9 pr-4 text-[10px] focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
           </div>
           <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">JD</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[280px] border-r border-border bg-slate-950/50">
          {leftSidebar}
        </aside>

        {/* Main Area */}
        <main className="flex flex-1 flex-col overflow-hidden bg-[#020617]">
          <div className="flex-1 overflow-auto">
            {canvas}
          </div>

          {/* Bottom Drawer */}
          <footer className="h-80 border-t border-border bg-slate-950">
            {bottomDrawer}
          </footer>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[320px] border-l border-border bg-slate-950/50">
          {rightSidebar}
        </aside>
      </div>
    </div>
  );
};
