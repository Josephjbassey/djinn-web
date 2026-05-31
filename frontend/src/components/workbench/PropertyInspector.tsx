"use client";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

interface InspectorProps {
  variant: string;
  onVariantChange: (v: string) => void;
  size: string;
  onSizeChange: (s: string) => void;
}

export const PropertyInspector: React.FC<InspectorProps> = ({
  variant,
  onVariantChange,
  size,
  onSizeChange,
}) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Variants
        </label>
        <ToggleGroup.Root
          type="single"
          value={variant}
          onValueChange={(val) => val && onVariantChange(val)}
          className="grid grid-cols-2 gap-2"
        >
          {["primary", "secondary", "ghost", "destructive", "outline"].map((v) => (
            <ToggleGroup.Item
              key={v}
              value={v}
              className={cn(
                "px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted transition-colors capitalize",
                variant === v && "bg-accent/20 border-accent text-accent"
              )}
            >
              {v}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Size
        </label>
        <ToggleGroup.Root
          type="single"
          value={size}
          onValueChange={(val) => val && onSizeChange(val)}
          className="flex gap-2"
        >
          {["sm", "md", "lg"].map((s) => (
            <ToggleGroup.Item
              key={s}
              value={s}
              className={cn(
                "flex-1 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted transition-colors uppercase",
                size === s && "bg-accent/20 border-accent text-accent"
              )}
            >
              {s}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <div className="border-t border-border pt-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Border Radius</span>
            <span className="text-[10px] font-mono text-accent">6px</span>
        </div>
        <input type="range" className="w-full accent-accent" defaultValue={60} />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Accessibility
        </label>
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-[10px] text-green-400">
            ✔ Keyboard Navigation Supported
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] text-blue-400">
            ℹ ARIA: role="button"
        </div>
      </div>
    </div>
  );
};
