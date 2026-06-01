"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ComponentExplorer } from "@/components/explorer/ComponentExplorer";
import { DesignCanvas } from "@/components/workbench/DesignCanvas";
import { PropertyInspector } from "@/components/workbench/PropertyInspector";
import { CodeDrawer } from "@/components/workbench/CodeDrawer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function WorkbenchPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [component, setComponent] = useState<any>(null);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");

  useEffect(() => {
    if (selectedComponentId) {
      fetch(`${API_BASE}/api/components/${selectedComponentId}/`)
        .then(res => res.json())
        .then(data => setComponent(data))
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
        />
      }
      rightSidebar={
        <PropertyInspector
            component={component}
            variant={variant}
            onVariantChange={setVariant}
            size={size}
            onSizeChange={setSize}
        />
      }
      bottomDrawer={
        <CodeDrawer component={component} />
      }
    />
  );
}
