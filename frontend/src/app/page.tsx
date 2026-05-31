"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown, MousePointer2, Settings, Code, Sparkles, Terminal, Copy, ExternalLink, Palette } from 'lucide-react';

export default function DjinnWorkbench() {
  const [registry, setRegistry] = useState<any>(null);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('template');
  const [props, setProps] = useState<any>({});
  const [theme, setTheme] = useState({
    primary: '#3b82f6',
    radius: '0.5rem',
    background: '#0f172a',
    accent: '#0ea5e9'
  });

  useEffect(() => {
    fetch('/registry.json')
      .then(res => res.json())
      .then(data => {
        setRegistry(data);
        const firstCat = Object.keys(data.categories)[0];
        if (firstCat && data.categories[firstCat].length > 0) {
           setSelectedComponent(data.categories[firstCat][0]);
        }
      })
      .catch(err => console.error("Failed to load registry:", err));
  }, []);

  const renderedHtml = useMemo(() => {
    if (!selectedComponent) return '';
    const templateName = Object.keys(selectedComponent.files).find(n => n.endsWith('.html'));
    if (!templateName) return 'Template not found';

    let html = selectedComponent.files[templateName];

    Object.entries(props).forEach(([key, value]) => {
      const regex = new RegExp(`\\{{\\s*${key}\\s*\\}}`, 'g');
      html = html.replace(regex, value as string);
    });

    const ifRegex = /\{% if (.*?) %\}(.*?)\{% elif (.*?) %\}(.*?)\{% else %\}(.*?)\{% endif %\}/gs;
    html = html.replace(ifRegex, (_match: string, p1: string, p2: string, _p3: string, _p4: string, p5: string) => {
       const propKey = p1.trim();
       if (props[propKey]) return p2;
       return p5;
    });

    html = html.replace(/\{% if (.*?) %\}(.*?)\{% endif %\}/gs, (_match: string, p1: string, p2: string) => {
        const propKey = p1.trim();
        return props[propKey] ? p2 : '';
    });

    html = html.replace(/\{%.*?%\}/g, '');
    html = html.replace(/\{\{ slot \}\}/g, 'Sample Content');
    html = html.replace(/\{\{.*?\}\}/g, '');

    return html;
  }, [selectedComponent, props]);

  const handlePropChange = (key: string, value: string) => {
    setProps((prev: any) => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    alert(msg);
  };

  if (!registry) return <div className="h-screen bg-background flex items-center justify-center text-primary animate-pulse font-mono uppercase tracking-widest text-sm">Loading Djinn Registry...</div>;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30" style={{
      '--primary': theme.primary,
      '--radius': theme.radius,
      '--background': theme.background,
      '--accent': theme.accent
    } as any}>

      <aside className="w-72 border-r border-outline bg-[#020617]/50 backdrop-blur-md flex flex-col z-20">
        <div className="p-6 border-b border-outline flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 border border-primary/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
             <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none tracking-tighter text-white">DJINN</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Registry Explorer</p>
          </div>
        </div>

        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search registry..."
              className="w-full bg-[#1e293b]/50 border border-outline rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-slate-600"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4">
          {Object.entries(registry.categories).map(([catName, components]: [string, any]) => (
            <div key={catName} className="mb-6">
              <div className="flex items-center justify-between px-2 py-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {catName}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </div>
              <div className="mt-2 space-y-1">
                {components.map((comp: any) => (
                  <button
                    key={comp.name}
                    onClick={() => {
                      setSelectedComponent(comp);
                      setProps({});
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all flex items-center justify-between group ${selectedComponent?.name === comp.name ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {comp.name}
                    <MousePointer2 className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${selectedComponent?.name === comp.name ? 'opacity-100' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 border-b border-outline flex items-center justify-between px-8 bg-background/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
               <span className="text-xs text-slate-500 font-mono tracking-tighter">registry/v{registry.version}</span>
               <div className="h-4 w-px bg-outline"></div>
               <span className="text-xs text-white font-medium flex items-center gap-2">
                 {selectedComponent?.name}
                 <ExternalLink className="w-3 h-3 text-slate-500 cursor-pointer hover:text-primary" />
               </span>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-outline rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all">
                 View Docs
               </button>
               <button
                 onClick={() => copyToClipboard(`djinn add ${selectedComponent?.name}`, "Installation command copied!")}
                 className="px-4 py-1.5 bg-primary text-white rounded-md text-[10px] font-black uppercase tracking-wider hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
               >
                 Install
               </button>
            </div>
        </header>

        <div className="flex-1 relative bg-[#020617] overflow-hidden flex items-center justify-center group/canvas">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

           <div className="relative">
             {selectedComponent ? (
               <div className="p-24 border border-outline/30 bg-white/[0.02] rounded-3xl backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/20">
                  <div className="absolute top-6 left-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"></div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Workbench Canvas • Live Render</p>
                  </div>

                  <div className="preview-container scale-150 transform-gpu" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
               </div>
             ) : (
               <div className="text-center text-slate-600">
                 <MousePointer2 className="w-16 h-16 mx-auto mb-6 opacity-10 animate-bounce" />
                 <p className="text-xl font-light tracking-tight">The forge is idle.</p>
                 <p className="text-xs uppercase tracking-widest mt-2 opacity-50 font-bold">Select a component to begin</p>
               </div>
             )}
           </div>

           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#020617]/80 backdrop-blur-xl border border-outline p-1.5 rounded-2xl shadow-2xl shadow-black/50 opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300">
             <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-primary"><Settings className="w-4 h-4" /></button>
             <div className="h-4 w-[1px] bg-outline mx-1"></div>
             <div className="flex gap-1">
                <button className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">Mobile</button>
                <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-primary text-white rounded-xl shadow-inner transition-all">Desktop</button>
             </div>
             <div className="h-4 w-[1px] bg-outline mx-1"></div>
             <button className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 hover:text-white rounded-xl">100%</button>
           </div>
        </div>

        <div className="h-80 border-t border-outline flex flex-col bg-[#020617]/80 backdrop-blur-xl z-20">
          <div className="flex items-center px-6 bg-background/50 border-b border-outline">
            {['template', 'registry', 'python'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${activeTab === tab ? 'border-primary text-primary shadow-[0_4px_10px_-4px_rgba(59,130,246,0.5)]' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1"></div>
            <span className="text-[10px] font-mono text-slate-600 mr-4 tracking-tighter">
              {selectedComponent?.name}.{activeTab === 'template' ? 'html' : activeTab === 'registry' ? 'json' : 'py'}
            </span>
          </div>
          <div className="flex-1 overflow-auto bg-[#0d1117] font-mono text-[13px] p-8 leading-relaxed relative group">
             <button
                title="Copy Code"
                className="absolute top-6 right-8 p-3 bg-secondary/80 backdrop-blur border border-outline rounded-xl opacity-0 group-hover:opacity-100 hover:border-primary hover:text-primary transition-all active:scale-90"
                onClick={() => {
                   const content = activeTab === 'template' ? selectedComponent?.files[Object.keys(selectedComponent.files).find(n => n.endsWith('.html')) || '']
                             : activeTab === 'registry' ? JSON.stringify(selectedComponent?.metadata, null, 2)
                             : selectedComponent?.files[Object.keys(selectedComponent.files).find(n => n.endsWith('.py')) || ''];
                  if (content) copyToClipboard(content, `Source copied to clipboard`);
                }}
             >
               <Copy className="w-4 h-4" />
             </button>
             {selectedComponent ? (
               <pre className="text-slate-300 whitespace-pre-wrap">
                 {activeTab === 'template' && (selectedComponent.files[Object.keys(selectedComponent.files).find(n => n.endsWith('.html')) || ''] || '// Template not found')}
                 {activeTab === 'registry' && JSON.stringify(selectedComponent.metadata, null, 2)}
                 {activeTab === 'python' && (selectedComponent.files[Object.keys(selectedComponent.files).find(n => n.endsWith('.py')) || ''] || '// Python logic not found for this component')}
               </pre>
             ) : (
               <p className="text-slate-700 italic font-light tracking-wide">// The source code will manifest once a component is selected.</p>
             )}
          </div>
        </div>
      </main>

      <aside className="w-80 border-l border-outline bg-[#020617]/50 backdrop-blur-md flex flex-col z-20 overflow-y-auto">
        <div className="p-6 border-b border-outline">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Property Inspector</h2>
        </div>
        <div className="p-6 space-y-10">

          {selectedComponent?.metadata.variants && (
            <section>
               <h3 className="text-[10px] font-black mb-4 text-slate-600 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                 Component Variants
               </h3>
               <div className="grid grid-cols-2 gap-2">
                 {selectedComponent.metadata.variants.map((v: string) => (
                   <button
                    key={v}
                    onClick={() => handlePropChange('variant', v)}
                    className={`px-3 py-2.5 text-[11px] font-bold bg-secondary/50 border rounded-xl transition-all ${props.variant === v ? 'border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-4 ring-primary/5' : 'border-outline text-slate-500 hover:border-slate-700 hover:text-slate-300'}`}
                   >
                     {v}
                   </button>
                 ))}
               </div>
            </section>
          )}

          <section>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
                   Design Tokens
                </h3>
                <button
                  onClick={() => copyToClipboard(`:root {
  --primary: ${theme.primary};
  --radius: ${theme.radius};
  --background: ${theme.background};
  --accent: ${theme.accent};
}`, "Theme CSS copied!")}
                  className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group" title="Copy Theme CSS">
                   <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-primary transition-colors" />
                </button>
             </div>
             <div className="space-y-8">
                <div>
                   <div className="flex justify-between text-[9px] mb-3">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Primary Key</span>
                      <span className="text-primary font-mono tabular-nums">{theme.primary}</span>
                   </div>
                   <div className="flex gap-2">
                     <div className="relative w-12 h-10 shrink-0 border border-outline rounded-xl overflow-hidden shadow-inner">
                        <input
                          type="color"
                          value={theme.primary}
                          onChange={(e) => setTheme({...theme, primary: e.target.value})}
                          className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer bg-transparent border-none"
                        />
                     </div>
                     <input
                        type="text"
                        value={theme.primary}
                        onChange={(e) => setTheme({...theme, primary: e.target.value})}
                        className="flex-1 bg-[#1e293b]/50 border border-outline rounded-xl px-3 text-[11px] font-mono text-white focus:outline-none focus:border-primary transition-colors"
                     />
                   </div>
                </div>

                <div>
                   <div className="flex justify-between text-[9px] mb-3">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Corner Radius</span>
                      <span className="text-slate-300 font-mono">{theme.radius}</span>
                   </div>
                   <div className="grid grid-cols-4 gap-1.5">
                     {['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '9999px'].map(r => (
                        <button
                          key={r}
                          onClick={() => setTheme({...theme, radius: r})}
                          className={`py-1.5 border rounded-lg text-[9px] font-bold transition-all ${theme.radius === r ? 'border-primary bg-primary text-white' : 'border-outline text-slate-600 hover:border-slate-700 hover:text-slate-400'}`}
                        >
                          {r === '9999px' ? 'Full' : r.replace('rem','')}
                        </button>
                     ))}
                   </div>
                </div>

                <div>
                   <div className="flex justify-between text-[9px] mb-3">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">Accent Glow</span>
                      <span className="text-accent font-mono tabular-nums">{theme.accent}</span>
                   </div>
                   <input
                    type="range"
                    min="0" max="360"
                    className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-accent"
                    onChange={(e) => {
                       const val = e.target.value;
                       setTheme({...theme, accent: `hsl(${val}, 89%, 60%)`});
                    }}
                   />
                </div>
             </div>
          </section>

          <section>
             <h3 className="text-[10px] font-black mb-4 text-slate-600 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
               Registry Context
             </h3>
             <div className="bg-[#1e293b]/30 border border-outline/50 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase font-bold tracking-tighter">Manifest</span>
                  <span className="text-primary font-mono font-bold tracking-tighter">{selectedComponent?.name || '---'}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 uppercase font-bold tracking-tighter">Integrity</span>
                  <span className="text-green-500 font-black tracking-tighter">VERIFIED</span>
                </div>
                <div className="h-[1px] bg-outline/30 w-full"></div>
                <p className="text-[9px] text-slate-500 leading-relaxed font-medium italic">
                  Live renders are generated on-the-fly using the static registry manifest. No component logic is duplicated in the browser.
                </p>
             </div>
          </section>
        </div>

        <div className="p-6 border-t border-outline bg-[#020617] mt-auto">
           <button
             onClick={() => copyToClipboard(`djinn add ${selectedComponent?.name}`, "Installation command copied!")}
             className="w-full bg-white text-black py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-slate-200 transition-all flex items-center justify-center gap-2.5 shadow-xl active:scale-[0.98]"
           >
             <Terminal className="w-4 h-4" />
             Copy Install Command
           </button>
           <div className="mt-4 flex items-center justify-center gap-4 grayscale opacity-30">
              <Code className="w-3 h-3" />
              <Palette className="w-3 h-3" />
              <Sparkles className="w-3 h-3" />
           </div>
        </div>
      </aside>
    </div>
  );
}
