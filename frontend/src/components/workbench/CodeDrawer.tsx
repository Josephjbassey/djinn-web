"use client";

import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { Terminal, FileJson, Code, Sparkles } from "lucide-react";

interface CodeDrawerProps {
  component: any;
}

export const CodeDrawer: React.FC<CodeDrawerProps> = ({ component }) => {
  if (!component) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
        Select a component to view source
      </div>
    );
  }

  return (
    <Tabs.Root defaultValue="template" className="flex flex-col h-full">
      <Tabs.List className="flex border-b border-border bg-secondary/20">
        <Tabs.Trigger
          value="template"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-all"
        >
          <Code size={14} />
          Django Template
        </Tabs.Trigger>
        <Tabs.Trigger
          value="registry"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-all"
        >
          <FileJson size={14} />
          Registry JSON
        </Tabs.Trigger>
        <Tabs.Trigger
          value="python"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-all"
        >
          <Terminal size={14} />
          Python Logic
        </Tabs.Trigger>
        <Tabs.Trigger
          value="ai"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-all"
        >
          <Sparkles size={14} />
          AI Assistant
        </Tabs.Trigger>
      </Tabs.List>

      <div className="flex-1 overflow-auto bg-[#0d1117] p-4 text-[13px] font-mono">
        <Tabs.Content value="template" className="whitespace-pre text-blue-300 outline-none">
          {component.template_code}
        </Tabs.Content>
        <Tabs.Content value="registry" className="whitespace-pre text-green-300 outline-none">
          {JSON.stringify(component.metadata, null, 2)}
        </Tabs.Content>
        <Tabs.Content value="python" className="whitespace-pre text-purple-300 outline-none">
          {component.logic_code}
        </Tabs.Content>
        <Tabs.Content value="ai" className="outline-none">
          <div className="flex flex-col gap-4 h-full">
            <p className="text-muted-foreground italic">Describe how you want to modify this component...</p>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="e.g. 'Add a loading state variant' or 'Change default padding'"
                    className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button className="px-4 py-1.5 bg-accent text-white rounded-md text-xs font-bold">Generate</button>
            </div>
          </div>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
};
