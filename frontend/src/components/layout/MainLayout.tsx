"use client";

import React from "react";
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
      {/* Top Navbar Placeholder */}
      <header className="flex h-12 items-center border-b border-border px-4 font-bold text-accent">
        DJINN / WORKBENCH
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[280px] border-r border-border bg-secondary/50">
          {leftSidebar}
        </aside>

        {/* Main Area */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-[#020617]">
            {canvas}
          </div>

          {/* Bottom Drawer */}
          <footer className="h-64 border-t border-border bg-secondary/30">
            {bottomDrawer}
          </footer>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[320px] border-l border-border bg-secondary/50">
          {rightSidebar}
        </aside>
      </div>
    </div>
  );
};
