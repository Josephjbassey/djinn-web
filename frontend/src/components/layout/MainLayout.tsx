"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Grid, Box, Palette, Terminal, Search, RefreshCw, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  leftSidebar: React.ReactNode;
  canvas: React.ReactNode;
  rightSidebar?: React.ReactNode;
  bottomDrawer?: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({
  leftSidebar,
  canvas,
  rightSidebar,
  bottomDrawer,
}) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
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
             <Link href="/registry" className={cn(
               "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors",
               isActive("/registry") ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
             )}>
                <Grid size={14} /> Registry
             </Link>
             <Link href="/workbench" className={cn(
               "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors",
               isActive("/workbench") ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
             )}>
                <Box size={14} /> Workbench
             </Link>
             <Link href="/themes" className={cn(
               "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors",
               isActive("/themes") ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
             )}>
                <Palette size={14} /> Themes
             </Link>
             <Link href="/sync" className={cn(
               "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors",
               isActive("/sync") ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
             )}>
                <RefreshCw size={14} /> Sync
             </Link>
             <Link href="/docs" className={cn(
               "px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors",
               isActive("/docs") ? "bg-accent/20 text-accent font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
             )}>
                <FileText size={14} /> Docs
             </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Quick search..."
                aria-label="Quick search"
                className="w-64 bg-slate-900/50 border border-border rounded-lg py-2 pl-9 pr-4 text-[10px] focus:outline-hidden focus:ring-1 focus:ring-accent transition-all"
              />
           </div>
           <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">JD</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[280px] border-r border-border bg-slate-950/50 flex-none">
          {leftSidebar}
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden bg-[#020617]">
          <div className="flex-1 overflow-auto">
            {canvas}
          </div>

          {bottomDrawer && (
            <footer className="h-80 border-t border-border bg-slate-950 flex-none">
              {bottomDrawer}
            </footer>
          )}
        </main>

        {rightSidebar && (
          <aside className="w-[320px] border-l border-border bg-slate-950/50 flex-none">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
};
