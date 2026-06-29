"use client";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function SearchBox() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  // همگام‌سازی استیت با URL در صورتی که فیلترها از بیرون پاک شوند
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      {/* دکمه اینتر و آیکون جستجو با رنگ تم سفارشی */}
      <button
        type="submit"
        className="text-muted hover:text-accent absolute top-1/2 right-4 z-10 -translate-y-1/2 p-1 transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* استفاده از استاندارد کامپوننت اینپوت HeroUI جهت اعمال بی‌نقص استایل‌ها */}
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو در محصولات..."
        radius="lg"
        variant="bordered"
        className="h-14 w-full rounded-2xl border-none bg-surface py-3 pr-12 pl-4 text-sm font-bold shadow-sm transition-all placeholder:text-mute focus:ring-2 focus:ring-accent"
      />
    </form>
  );
}

export default SearchBox;
