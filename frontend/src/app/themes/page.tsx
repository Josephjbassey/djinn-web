"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Palette, Sparkles, Save, RotateCcw, Copy, Trash, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemesPage() {
  const [colors, setColors] = useState({
    primary: "#3b82f6",
    accent: "#f43f5e",
    background: "#0f172a",
    surface: "#1e293b",
  });
  const [typography, setTypography] = useState({
    baseSize: 16,
    lineHeight: 1.5,
  });
  const [radius, setRadius] = useState(8);
  const [exportFormat, setExportFormat] = useState("CSS");

  const resetTheme = () => {
    setColors({
      primary: "#3b82f6",
      accent: "#f43f5e",
      background: "#0f172a",
      surface: "#1e293b",
    });
    setTypography({
      baseSize: 16,
      lineHeight: 1.5,
    });
    setRadius(8);
  };

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const getExportContent = () => {
    if (exportFormat === "CSS") {
      return `:root {
  --primary: ${colors.primary};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --radius: ${radius}px;
  --font-size: ${typography.baseSize}px;
  --line-height: ${typography.lineHeight};
}`;
    }
    if (exportFormat === "Tailwind") {
      return `@theme {
  --color-primary: ${colors.primary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --radius-md: ${radius}px;
}`;
    }
    return JSON.stringify({
      colors,
      typography,
      radius
    }, null, 2);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extension = exportFormat === "JSON" ? "json" : "css";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `djinn-theme.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    alert("Theme tokens copied to clipboard!");
  };

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
               {[
                 { name: "Cyber Noir", primary: "#3b82f6", accent: "#f43f5e", bg: "#0f172a" },
                 { name: "Zinc Slate", primary: "#71717a", accent: "#27272a", bg: "#09090b" },
                 { name: "Deep Forest", primary: "#059669", accent: "#064e3b", bg: "#022c22" }
               ].map(preset => (
                 <div
                   key={preset.name}
                   onClick={() => {
                     setColors({ primary: preset.primary, accent: preset.accent, background: preset.bg, surface: "#1e293b" });
                   }}
                   className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-slate-900/50 hover:border-blue-500/30 cursor-pointer transition-all"
                 >
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                   <span className="text-xs font-bold text-slate-400">{preset.name}</span>
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
              <button
                onClick={resetTheme}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={12} /> Reset
              </button>
              <button
                onClick={() => alert("Theme configuration saved to project settings.")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
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
                  { label: "Primary", key: "primary", value: colors.primary },
                  { label: "Accent", key: "accent", value: colors.accent },
                  { label: "Background", key: "background", value: colors.background },
                  { label: "Surface", key: "surface", value: colors.surface },
                ].map(token => (
                  <div key={token.label} className="p-4 rounded-xl border border-white/5 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-lg border border-white/10 overflow-hidden">
                        <input
                          type="color"
                          value={token.value}
                          onChange={(e) => handleColorChange(token.key as any, e.target.value)}
                          className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{token.label}</div>
                        <input
                          type="text"
                          value={token.value}
                          onChange={(e) => handleColorChange(token.key as any, e.target.value)}
                          className="text-xs font-mono font-bold uppercase bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                        />
                      </div>
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(token.value);
                        }}
                        className="p-2 text-slate-600 hover:text-white transition-colors"
                    >
                        <Copy size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="font-black text-lg uppercase tracking-tight">Typography Scale</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Base Font Size</div>
                     <div className="text-xs font-mono text-blue-400 font-bold">{typography.baseSize}px</div>
                   </div>
                   <input
                     type="range"
                     min="12"
                     max="32"
                     value={typography.baseSize}
                     onChange={(e) => setTypography(prev => ({ ...prev, baseSize: parseInt(e.target.value) }))}
                     className="w-full accent-blue-600 bg-slate-800 rounded-lg h-1.5 appearance-none cursor-pointer"
                   />
                   <div className="flex justify-between text-[10px] font-mono text-slate-600">
                      <span>12px</span>
                      <span>32px</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Line Height</div>
                     <div className="text-xs font-mono text-blue-400 font-bold">{typography.lineHeight}</div>
                   </div>
                   <input
                     type="range"
                     min="1"
                     max="2"
                     step="0.1"
                     value={typography.lineHeight}
                     onChange={(e) => setTypography(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                     className="w-full accent-blue-600 bg-slate-800 rounded-lg h-1.5 appearance-none cursor-pointer"
                   />
                   <div className="flex justify-between text-[10px] font-mono text-slate-600">
                      <span>1.0</span>
                      <span>2.0</span>
                   </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-lg uppercase tracking-tight">Border Radius</h3>
                <div className="text-xs font-mono text-blue-400 font-bold">{radius}px</div>
              </div>
              <div className="max-w-md space-y-4">
                 <input
                   type="range"
                   min="0"
                   max="24"
                   value={radius}
                   onChange={(e) => setRadius(parseInt(e.target.value))}
                   className="w-full accent-blue-600 bg-slate-800 rounded-lg h-1.5 appearance-none cursor-pointer"
                 />
                 <div className="flex justify-between text-[10px] font-mono text-slate-600">
                    <span>0px</span>
                    <span>24px</span>
                 </div>
              </div>
            </section>

            <section className="pt-10">
              <div
                className="p-8 border border-white/5 space-y-8 flex flex-col items-center text-center"
                style={{
                  backgroundColor: colors.background,
                  borderRadius: `${radius * 2}px`,
                }}
              >
                 <h2 className="text-2xl font-black tracking-tighter" style={{ fontSize: `${typography.baseSize * 1.5}px` }}>Live Theme Preview</h2>
                 <div className="flex gap-4">
                    <button
                      className="px-6 py-2.5 text-white text-[10px] font-black uppercase tracking-widest transition-all"
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-6 py-2.5 text-slate-100 text-[10px] font-black uppercase tracking-widest transition-all"
                      style={{
                        backgroundColor: colors.surface,
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Secondary
                    </button>
                    <button
                      className="px-6 py-2.5 border text-white text-[10px] font-black uppercase tracking-widest transition-all"
                      style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Outline
                    </button>
                 </div>
                 <div className="space-y-2 max-w-md text-left">
                    <h3 className="text-xl font-black tracking-tight" style={{ fontSize: `${typography.baseSize * 1.25}px`, lineHeight: typography.lineHeight }}>The quick brown fox jumps over the lazy dog</h3>
                    <p className="text-sm text-slate-400 font-medium" style={{ fontSize: `${typography.baseSize}px`, lineHeight: typography.lineHeight }}>Developers visually build, preview, customize, and install reusable Django UI components directly into their projects.</p>
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
                   <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all",
                      exportFormat === format ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
                    )}
                   >
                     {format}
                   </button>
                 ))}
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] text-slate-400 overflow-auto max-h-[300px]">
                 {exportFormat === "CSS" && (
                   <div className="space-y-1">
                      <div className="text-slate-600">:root {"{"}</div>
                      <div className="pl-4">--primary: <span className="text-blue-400">{colors.primary}</span>;</div>
                      <div className="pl-4">--accent: <span className="text-rose-400">{colors.accent}</span>;</div>
                      <div className="pl-4">--background: <span className="text-slate-400">{colors.background}</span>;</div>
                      <div className="pl-4">--surface: <span className="text-slate-400">{colors.surface}</span>;</div>
                      <div className="pl-4">--radius: <span className="text-emerald-400">{radius}px</span>;</div>
                      <div className="pl-4">--font-size: <span className="text-emerald-400">{typography.baseSize}px</span>;</div>
                      <div className="pl-4">--line-height: <span className="text-emerald-400">{typography.lineHeight}</span>;</div>
                      <div className="text-slate-600">{"}"}</div>
                   </div>
                 )}
                 {exportFormat === "Tailwind" && (
                   <div className="space-y-1">
                      <div className="text-slate-600">@theme {"{"}</div>
                      <div className="pl-4">--color-primary: <span className="text-blue-400">{colors.primary}</span>;</div>
                      <div className="pl-4">--color-accent: <span className="text-rose-400">{colors.accent}</span>;</div>
                      <div className="pl-4">--color-background: <span className="text-slate-400">{colors.background}</span>;</div>
                      <div className="pl-4">--radius-md: <span className="text-emerald-400">{radius}px</span>;</div>
                      <div className="text-slate-600">{"}"}</div>
                   </div>
                 )}
                 {exportFormat === "JSON" && (
                   <div className="space-y-1">
                      <div className="text-slate-600">{"{"}</div>
                      <div className="pl-4">"colors": {"{"}</div>
                      <div className="pl-8">"primary": "{colors.primary}",</div>
                      <div className="pl-8">"accent": "{colors.accent}",</div>
                      <div className="pl-8">"background": "{colors.background}"</div>
                      <div className="pl-4">{"}"},</div>
                      <div className="pl-4">"radius": {radius}</div>
                      <div className="text-slate-600">{"}"}</div>
                   </div>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={handleCopy}
                    className="py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={14} /> Download
                  </button>
              </div>
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
                    <button
                      onClick={() => alert("AI Theme Generation started... (Demo)")}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                    >
                      Generate Theme
                    </button>
                 </div>
              </div>
           </div>
           <div className="p-6 border-t border-white/5 bg-slate-900/30">
              <button
                onClick={() => alert("Theme published to global registry!")}
                className="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
              >
                 <Save size={16} /> Publish Theme
              </button>
           </div>
        </div>
      }
      bottomDrawer={null}
    />
  );
}
