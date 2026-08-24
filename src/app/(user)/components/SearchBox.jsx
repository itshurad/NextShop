"use client";

import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SearchBox() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <Input
        type="text"
        value={search}
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو در محصولات..."
        variant="flat"
        classnames={{
          inputWrapper:
            "h-16 bg-surface rounded-2xl shadow-sm border border-border focus-within:!border-accent focus-within:!bg-surface transition-all",
          input:
            "text-sm font-bold text-foreground placeholder:text-muted/60 pr-2",
        }}
        startcontent={
          <button
            type="submit"
            className="text-muted hover:text-accent transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        }
      />
    </form>
  );
}
