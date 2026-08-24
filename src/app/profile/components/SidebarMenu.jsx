"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PROFILE_MENU_ITEMS = [
  {
    title: "داشبورد",
    href: "/profile",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          d="M3.67782 8.87918H12M12 15.1208H20.3222M12 3.67782L12 20.3222M3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496Z"
        />
      </svg>
    ),
  },
  // برای اضافه کردن منوهای جدید مثل "سفارش‌های من" فقط کافیه یک آبجکت اینجا اضافه کنی
];

function SidebarMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-y-1">
      {PROFILE_MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li className="flex" key={item.href}>
            <Link
              href={item.href}
              className={`hover:border-accent-hover hover:bg-accent-soft-hover hover:text-accent-soft-foreground flex w-full items-center gap-x-2 rounded-2xl border px-3 py-2 transition-all duration-300 ease-in-out ${
                isActive
                  ? "border-accent bg-accent-soft text-accent-soft-foreground stroke-2 font-bold"
                  : "border-transparent bg-none stroke-[1.5] font-medium"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SidebarMenu;
