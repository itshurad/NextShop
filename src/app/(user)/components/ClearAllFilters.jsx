"use client";
import { Button } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function ClearAllFilters() {
  const router = useRouter();
  const handleClear = () => {
    router.push("/products");
  };
  return (
    <Button
      onClick={handleClear}
      variant="danger-soft"
      className="w-full rounded-2xl py-6"
    >
      <RotateCcw className="h-3.5 w-3.5" />
      حذف تمام فیلترها
    </Button>
  );
}

export default ClearAllFilters;
