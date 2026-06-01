"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ComponentExplorer } from "@/components/explorer/ComponentExplorer";
import { DesignCanvas } from "@/components/workbench/DesignCanvas";
import { PropertyInspector } from "@/components/workbench/PropertyInspector";
import { CodeDrawer } from "@/components/workbench/CodeDrawer";
import { Component, CustomStyles } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function WorkbenchPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [component, setComponent] = useState<Component | null>(null);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");

  const [customStyles, setCustomStyles] = useState<CustomStyles>({
    primaryColor: "#3b82f6",
    borderRadius: 6,
    animation: "none"
  });

  useEffect(() => {
    if (selectedComponentId) {
      fetch(`${API_BASE}/api/components/${selectedComponentId}/`)
        .then(res => res.json())
        .then(data => {
            setComponent(data);
            // Reset custom styles or set defaults based on component
            setCustomStyles({
                primaryColor: "#3b82f6",
                borderRadius: 6,
                animation: "none"
            });
        })
        .catch(err => console.error("Failed to fetch component detail", err));
    }
  }, [selectedComponentId]);

  return (
    <MainLayout
      leftSidebar={
        <ComponentExplorer
          onSelect={setSelectedComponentId}
          selectedId={selectedComponentId}
        />
      }
      canvas={
        <DesignCanvas
            component={component}
            variant={variant}
            size={size}
            customStyles={customStyles}
        />
      }
      rightSidebar={
        <PropertyInspector
            component={component || undefined}
            variant={variant}
            onVariantChange={setVariant}
            size={size}
            onSizeChange={setSize}
            customStyles={customStyles}
            onStylesChange={(newStyles) => setCustomStyles(prev => ({ ...prev, ...newStyles }))}
        />
      }
      bottomDrawer={
        <CodeDrawer component={component} />
      }
    />
  );
}
