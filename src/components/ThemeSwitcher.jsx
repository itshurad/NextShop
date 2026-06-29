"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { MoonIcon, SunIcon } from "@/app/Icons/Icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="ghost"
        className="border-border text-muted h-10 w-10 rounded-xl border"
      >
        <div className="bg-muted/20 h-4 w-4 animate-pulse rounded-full" />
      </Button>
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="ghost"
      className="border-border bg-surface text-foreground hover:bg-surface-secondary h-10 w-10 min-w-0 rounded-xl border p-0"
      onClick={toggleTheme}
      aria-label="تغییر پوسته سایت"
    >
      {isDarkMode ? (
        <SunIcon className="text-warning size-5 scale-100 rotate-0 stroke-2 transition-transform duration-300" />
      ) : (
        <MoonIcon className="text-accent size-5 scale-100 rotate-0 stroke-2 transition-transform duration-300" />
      )}
    </Button>
  );
}
