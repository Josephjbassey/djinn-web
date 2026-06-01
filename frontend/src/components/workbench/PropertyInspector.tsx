"use client";

import React, { useId } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { Component, CustomStyles } from "@/types";
import { Download, Save } from "lucide-react";

interface InspectorProps {
  variant: string;
  onVariantChange: (v: string) => void;
  size: string;
  onSizeChange: (s: string) => void;
  component?: Component;
  customStyles: CustomStyles;
  onStylesChange: (styles: Partial<CustomStyles>) => void;
}

export const PropertyInspector: React.FC<InspectorProps> = ({
  variant,
  onVariantChange,
  size,
  onSizeChange,
  component,
  customStyles,
  onStylesChange,
}) => {
  const baseId = useId();
  const accessibility = component?.metadata?.accessibility || {
    keyboard_supported: true,
    role: component?.slug?.includes("input") ? "textbox" : "button"
  };

  const availableVariants = component?.metadata?.variants || ["primary", "secondary", "ghost", "destructive", "outline"];

  const handleExport = () => {
    if (!component) return;
    const blob = new Blob([component.template_code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${component.slug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          {availableVariants.map((v: string) => (
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

      <div className="border-t border-border pt-6 space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
              <label htmlFor={`${baseId}-primary-color`} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">
                Primary Color
              </label>
              <span className="text-[10px] font-mono text-accent">{customStyles.primaryColor}</span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              id={`${baseId}-primary-color`}
              type="color"
              value={customStyles.primaryColor}
              onChange={(e) => onStylesChange({ primaryColor: e.target.value })}
              className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={customStyles.primaryColor}
              onChange={(e) => onStylesChange({ primaryColor: e.target.value })}
              className="flex-1 bg-slate-900 border border-border rounded px-2 py-1 text-[10px] font-mono focus:outline-hidden focus:border-accent"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
              <label htmlFor={`${baseId}-border-radius`} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">
                Border Radius
              </label>
              <span className="text-[10px] font-mono text-accent">{customStyles.borderRadius}px</span>
          </div>
          <input
            id={`${baseId}-border-radius`}
            type="range"
            min="0"
            max="24"
            value={customStyles.borderRadius}
            onChange={(e) => onStylesChange({ borderRadius: parseInt(e.target.value) })}
            className="w-full accent-accent"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor={`${baseId}-animation`} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">
            Animation
          </label>
          <select
            id={`${baseId}-animation`}
            value={customStyles.animation}
            onChange={(e) => onStylesChange({ animation: e.target.value as any })}
            className="w-full bg-slate-900 border border-border rounded-md px-3 py-1.5 text-xs focus:outline-hidden focus:border-accent appearance-none cursor-pointer"
          >
            <option value="none">None</option>
            <option value="pulse">Pulse</option>
            <option value="bounce">Bounce</option>
            <option value="spin">Spin</option>
            <option value="ping">Ping</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Accessibility
        </label>
        {accessibility.keyboard_supported && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-[10px] text-green-400">
              ✔ Keyboard Navigation Supported
          </div>
        )}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] text-blue-400">
            ℹ ARIA: role="{accessibility.role}"
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={() => alert("Changes saved to component configuration (Demo)")}
          className="flex-1 px-4 py-2 bg-accent text-white rounded-md text-xs font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <Save size={14} /> Save
        </button>
        <button
          onClick={handleExport}
          disabled={!component}
          className="px-4 py-2 border border-border rounded-md text-xs font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download size={14} /> Export
        </button>
      </div>
    </div>
  );
};
