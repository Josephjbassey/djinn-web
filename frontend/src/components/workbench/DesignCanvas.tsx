"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComponentData {
  id: number;
  name: string;
  slug: string;
  template_code: string;
  metadata: any;
}

interface CanvasProps {
  component: ComponentData | null;
  variant: string;
  size: string;
}

export const DesignCanvas: React.FC<CanvasProps> = ({ component, variant, size }) => {
  if (!component) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground italic">
        Select a component to start designing
      </div>
    );
  }

  const getVariantClasses = (v: string) => {
    switch (v) {
      case "primary": return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "secondary": return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "ghost": return "hover:bg-accent hover:text-accent-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "outline": return "border border-input hover:bg-accent hover:text-accent-foreground";
      case "error": return "border-destructive focus:ring-destructive";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const getSizeClasses = (s: string) => {
    switch (s) {
      case "sm": return "h-9 px-3 text-xs";
      case "md": return "h-10 px-4 py-2 text-sm";
      case "lg": return "h-11 px-8 text-base";
      default: return "h-10 px-4";
    }
  };

  const renderMockup = (props: any = {}) => {
    const isInput = component.slug.includes("input");
    const commonClasses = cn(
      "rounded-md font-medium transition-colors",
      getVariantClasses(variant),
      getSizeClasses(size),
      props.className
    );

    if (isInput) {
      return (
        <input
          {...props}
          className={cn("bg-background border border-border px-3 py-2", commonClasses)}
          placeholder={`${component.name} placeholder...`}
          readOnly
        />
      );
    }

    return (
      <button {...props} className={cn("inline-flex items-center justify-center shadow-lg shadow-black/20", commonClasses)}>
        {component.name} Action
      </button>
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative group">
        <div className="absolute -top-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-accent/50 font-mono">W: auto | H: auto</span>
        </div>

        <div className="p-8 border border-dashed border-muted rounded-xl bg-background/50 flex items-center justify-center">
          {renderMockup()}
        </div>

        <div className="mt-12 flex gap-8">
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Hover</span>
                {renderMockup({ className: "brightness-110 shadow-none" })}
            </div>
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Disabled</span>
                {renderMockup({ disabled: true, className: "opacity-50 cursor-not-allowed shadow-none" })}
            </div>
        </div>
      </div>
    </div>
  );
};
