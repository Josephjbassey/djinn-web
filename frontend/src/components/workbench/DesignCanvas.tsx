"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Component, CustomStyles } from "@/types";

interface CanvasProps {
  component: Component | null;
  variant: string;
  size: string;
  customStyles: CustomStyles;
}

export const DesignCanvas: React.FC<CanvasProps> = ({ component, variant, size, customStyles }) => {
  if (!component) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground italic">
        Select a component to start designing
      </div>
    );
  }

  const getVariantClasses = (v: string) => {
    switch (v) {
      case "primary": return "text-primary-foreground";
      case "secondary": return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "ghost": return "hover:bg-accent hover:text-accent-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "outline": return "border border-input hover:bg-accent hover:text-accent-foreground";
      case "error": return "border-destructive focus:ring-destructive";
      default: return "text-primary-foreground";
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

  const getAnimationClass = (a: string) => {
    switch (a) {
      case "pulse": return "animate-pulse";
      case "bounce": return "animate-bounce";
      case "spin": return "animate-spin";
      case "ping": return "animate-ping";
      default: return "";
    }
  };

  const renderMockup = (props: React.HTMLAttributes<HTMLElement> & { disabled?: boolean } = {}) => {
    const isInput = component.slug.includes("input");
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);
    const animationClass = getAnimationClass(customStyles.animation);

    const style: React.CSSProperties = {
        borderRadius: `${customStyles.borderRadius}px`,
        ...props.style
    };

    if (variant === "primary") {
        style.backgroundColor = customStyles.primaryColor;
    }

    const commonClasses = cn(
      "font-medium transition-all duration-200",
      variantClasses,
      sizeClasses,
      animationClass,
      props.className
    );

    if (isInput) {
      return (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          style={style}
          className={cn("bg-background border border-border px-3 py-2", commonClasses)}
          placeholder={`${component.name} placeholder...`}
          readOnly
        />
      );
    }

    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        style={style}
        className={cn("inline-flex items-center justify-center shadow-lg shadow-black/20", commonClasses)}
      >
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

        <div className="p-12 border border-dashed border-muted rounded-2xl bg-background/50 flex items-center justify-center min-w-[300px]">
          {renderMockup()}
        </div>

        <div className="mt-12 flex gap-8 justify-center">
            <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Normal</span>
                {renderMockup({ className: "shadow-none" })}
            </div>
            <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Hover</span>
                {renderMockup({ className: "brightness-110 shadow-xl scale-105" })}
            </div>
            <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Disabled</span>
                {renderMockup({ disabled: true, className: "opacity-40 cursor-not-allowed shadow-none grayscale" })}
            </div>
        </div>
      </div>
    </div>
  );
};
