"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export interface SpecItem {
  name: string;
  value: string;
}

interface ProductSpecsEditorProps {
  specs: SpecItem[];
  setSpecs: (value: SpecItem[]) => void;
}

export function ProductSpecsEditor({ specs, setSpecs }: ProductSpecsEditorProps) {
  const addSpec = () => {
    setSpecs([...specs, { name: "", value: "" }]);
  };

  const updateSpec = (index: number, field: "name" | "value", value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-4 space-y-4 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <h3 className="font-semibold text-lg">Thông số kỹ thuật</h3>

      <div className="space-y-3">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              placeholder="Tên thông số (VD: RAM)"
              value={spec.name}
              onChange={(e) => updateSpec(i, "name", e.target.value)}
            />
            <Input
              placeholder="Giá trị (VD: 8GB DDR4)"
              value={spec.value}
              onChange={(e) => updateSpec(i, "value", e.target.value)}
            />
            <Button variant="destructive" size="icon" onClick={() => removeSpec(i)}>
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addSpec}>+ Thêm thông số</Button>
    </Card>
  );
}
