"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ComponentExplorer } from "@/components/explorer/ComponentExplorer";
import { DesignCanvas } from "@/components/workbench/DesignCanvas";
import { PropertyInspector } from "@/components/workbench/PropertyInspector";
import { CodeDrawer } from "@/components/workbench/CodeDrawer";

export default function WorkbenchPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  return (
    <MainLayout
      leftSidebar={
        <ComponentExplorer
          onSelect={setSelectedComponentId}
          selectedId={selectedComponentId}
        />
      }
      canvas={
        <DesignCanvas componentId={selectedComponentId} />
      }
      rightSidebar={
        <PropertyInspector componentId={selectedComponentId} />
      }
      bottomDrawer={
        <CodeDrawer componentId={selectedComponentId} />
      }
    />
  );
}
