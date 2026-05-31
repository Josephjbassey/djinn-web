"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ComponentExplorer } from "@/components/explorer/ComponentExplorer";
import { DesignCanvas } from "@/components/workbench/DesignCanvas";
import { PropertyInspector } from "@/components/workbench/PropertyInspector";
import { CodeDrawer } from "@/components/workbench/CodeDrawer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function Home() {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);
  const [componentData, setComponentData] = useState<any>(null);
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedComponentId) {
      const controller = new AbortController();
      const signal = controller.signal;

      fetch(`${API_BASE}/api/components/${selectedComponentId}/`, { signal })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch component details");
          return res.json();
        })
        .then((data) => {
          setComponentData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error("Failed to fetch component", err);
            setError("Failed to load component details");
          }
        });

      return () => controller.abort();
    } else {
      setComponentData(null);
    }
  }, [selectedComponentId]);

  return (
    <MainLayout
      leftSidebar={<ComponentExplorer onSelect={setSelectedComponentId} selectedId={selectedComponentId} />}
      canvas={
        error ? (
          <div className="flex h-full items-center justify-center text-destructive">{error}</div>
        ) : (
          <DesignCanvas component={componentData} variant={variant} size={size} />
        )
      }
      rightSidebar={
        <PropertyInspector
          variant={variant}
          onVariantChange={setVariant}
          size={size}
          onSizeChange={setSize}
          component={componentData}
        />
      }
      bottomDrawer={<CodeDrawer component={componentData} />}
    />
  );
}
