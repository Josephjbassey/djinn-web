"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ComponentExplorer } from "@/components/explorer/ComponentExplorer";
import { DesignCanvas } from "@/components/workbench/DesignCanvas";
import { PropertyInspector } from "@/components/workbench/PropertyInspector";
import { CodeDrawer } from "@/components/workbench/CodeDrawer";

export default function Home() {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [componentData, setComponentData] = useState<any>(null);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");

  useEffect(() => {
    if (selectedComponentId) {
      fetch(`http://localhost:8000/api/components/${selectedComponentId}/`)
        .then((res) => res.json())
        .then((data) => setComponentData(data))
        .catch((err) => console.error("Failed to fetch component", err));
    } else {
      setComponentData(null);
    }
  }, [selectedComponentId]);

  return (
    <MainLayout
      leftSidebar={<ComponentExplorer onSelect={setSelectedComponentId} selectedId={selectedComponentId} />}
      canvas={<DesignCanvas component={componentData} variant={variant} size={size} />}
      rightSidebar={
        <PropertyInspector
          variant={variant}
          onVariantChange={setVariant}
          size={size}
          onSizeChange={setSize}
        />
      }
      bottomDrawer={<CodeDrawer component={componentData} />}
    />
  );
}
