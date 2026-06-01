"use client";

import React, { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, Search, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

interface ComponentItem {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  components: ComponentItem[];
}

interface ExplorerProps {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

export const ComponentExplorer: React.FC<ExplorerProps> = ({ onSelect, selectedId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${API_BASE}/api/categories/`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Failed to fetch categories", err);
        }
      });

    return () => controller.abort();
  }, []);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    components: cat.components.filter(comp =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.components.length > 0);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search registry..."
            aria-label="Search registry"
            className="w-full bg-background border border-border rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {filteredCategories.map((category) => (
          <Collapsible.Root key={category.id} defaultOpen className="mb-2">
            <Collapsible.Trigger className="flex w-full items-center justify-between p-2 text-sm font-semibold hover:bg-muted/50 rounded-md group">
              <span className="flex items-center gap-2">
                <Box size={14} className="text-accent" />
                {category.name}
              </span>
              <ChevronDown size={14} className="group-data-[state=closed]:hidden" />
              <ChevronRight size={14} className="group-data-[state=open]:hidden" />
            </Collapsible.Trigger>
            <Collapsible.Content className="pl-4 mt-1 space-y-1">
              {category.components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => onSelect(component.id)}
                  className={cn(
                    "w-full text-left p-2 text-xs rounded-md transition-colors",
                    selectedId === component.id
                      ? "bg-accent/20 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {component.name}
                </button>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </div>
    </div>
  );
};
