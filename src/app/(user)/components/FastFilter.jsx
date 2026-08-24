"use client";
import { toast } from "@heroui/react";
import React from "react";

export default function FastFilter() {
  return (
    <div className="space-y-3">
      <h4 className="text-muted px-1 text-[10px] font-black tracking-widest uppercase">
        دسترسی سریع
      </h4>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "تخفیف‌دار", icon: "🔥" },
          { label: "موجود", icon: "📦" },
          { label: "پرفروش", icon: "⭐" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => toast.info("این بخش به زودی در دسترس قرار می‌گیرد")}
            className="border-border bg-surface text-foreground/80 hover:border-accent/20 hover:bg-accent/5 hover:text-accent flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-[11px] font-bold shadow-sm transition-all active:scale-95"
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
