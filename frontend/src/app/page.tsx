"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, MousePointer2, Settings, Code, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DjinnWorkbench() {
  const [categories, setCategories] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeTab, setActiveTab] = useState('template');

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR: Component Browser */}
      <aside className="w-72 border-r border-outline bg-secondary/30 flex flex-col">
        <div className="p-4 border-b border-outline flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
             <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Djinn</h1>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full bg-secondary border border-outline rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2">
          {categories.map(cat => (
            <div key={cat.id} className="mb-4">
              <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-secondary-foreground uppercase tracking-wider cursor-pointer hover:text-foreground">
                {cat.name}
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="mt-1 space-y-1">
                {cat.components.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${selectedComponent?.id === comp.id ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-secondary'}`}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* CANVAS: Preview Area */}
        <div className="flex-1 relative bg-background overflow-hidden flex items-center justify-center">
           {/* Grid Pattern Background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

           {selectedComponent ? (
             <div className="p-12 border border-outline/50 bg-secondary/10 rounded-lg shadow-2xl min-w-[300px] flex items-center justify-center">
                {/* Visual Representation of Component */}
                <div className="text-center">
                  <p className="text-xs text-secondary-foreground mb-4 uppercase tracking-widest">Preview: {selectedComponent.name}</p>
                  {selectedComponent.name === 'button' ? (
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium transition-all shadow-lg shadow-primary/20">
                      Primary Button
                    </button>
                  ) : (
                    <div className="border border-dashed border-outline p-8 rounded text-secondary-foreground">
                      {selectedComponent.name} preview
                    </div>
                  )}
                </div>
             </div>
           ) : (
             <div className="text-center text-secondary-foreground">
               <MousePointer2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p>Select a component to preview</p>
             </div>
           )}

           {/* Canvas Controls */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-secondary/80 backdrop-blur border border-outline p-1 rounded-full shadow-xl">
             <button className="p-2 hover:bg-background rounded-full transition-colors"><Settings className="w-4 h-4" /></button>
             <div className="h-4 w-[1px] bg-outline mx-1"></div>
             <button className="px-3 py-1 text-xs hover:bg-background rounded-full">100%</button>
           </div>
        </div>

        {/* BOTTOM DRAWER: Code Viewer */}
        <div className="h-80 border-t border-outline flex flex-col bg-secondary/20">
          <div className="flex items-center px-4 border-b border-outline">
            {['template', 'metadata', 'python', 'ai'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-secondary-foreground hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto bg-[#0d1117] font-mono text-sm p-4">
             {selectedComponent ? (
               <pre className="text-slate-300">
                 {activeTab === 'template' && (selectedComponent.files.find(f => f.name.endsWith('.html'))?.content || 'No template found')}
                 {activeTab === 'metadata' && JSON.stringify(selectedComponent.metadata, null, 2)}
                 {activeTab === 'python' && (selectedComponent.files.find(f => f.name.endsWith('.py'))?.content || 'No python helper found')}
                 {activeTab === 'ai' && (
                   <div className="flex flex-col h-full italic text-secondary-foreground">
                     <p>// Djinn AI Assistant ready...</p>
                     <div className="mt-auto flex gap-2 p-2 bg-secondary/50 rounded-md border border-outline">
                        <Terminal className="w-4 h-4 text-primary" />
                        <input type="text" placeholder="Describe modification..." className="bg-transparent border-none outline-none flex-1 text-xs text-foreground" />
                     </div>
                   </div>
                 )}
               </pre>
             ) : (
               <p className="text-secondary-foreground italic">// Select a component to view code</p>
             )}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Inspector */}
      <aside className="w-72 border-l border-outline bg-secondary/30 flex flex-col">
        <div className="p-4 border-b border-outline">
          <h2 className="text-xs font-bold uppercase tracking-widest text-secondary-foreground">Inspector</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
             <h3 className="text-xs font-semibold mb-3 text-slate-500 uppercase">Variants</h3>
             <div className="grid grid-cols-2 gap-2">
               {['Primary', 'Ghost', 'Destructive', 'Outline'].map(v => (
                 <button key={v} className="px-3 py-2 text-xs bg-secondary border border-outline rounded hover:border-primary/50 transition-colors">
                   {v}
                 </button>
               ))}
             </div>
          </section>

          <section>
             <h3 className="text-xs font-semibold mb-3 text-slate-500 uppercase">Spacing</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-secondary-foreground">Padding</span>
                      <span>16px</span>
                   </div>
                   <input type="range" className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div>
                   <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-secondary-foreground">Radius</span>
                      <span>4px</span>
                   </div>
                   <input type="range" className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
             </div>
          </section>

          <section>
             <h3 className="text-xs font-semibold mb-3 text-slate-500 uppercase">Dependencies</h3>
             <div className="flex flex-wrap gap-1">
                {['tailwind', 'django-components'].map(d => (
                  <span key={d} className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">
                    {d}
                  </span>
                ))}
             </div>
          </section>
        </div>

        <div className="p-4 border-t border-outline">
           <button className="w-full bg-primary py-2 rounded text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
             <Terminal className="w-3 h-3" />
             Copy CLI Command
           </button>
        </div>
      </aside>
    </div>
  );
}
