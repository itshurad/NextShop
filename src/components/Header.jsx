"use client";
import React from "react";
import { Button, toast } from "@heroui/react";
import { Bell, TrendingUp, Menu } from "lucide-react";
import { useGetUser } from "@/hooks/useAuth";
import { ThemeSwitcher } from "./ThemeSwitcher";

function Header({ onOpenSidebar }) {
  const { data, isLoading } = useGetUser();
  const { cart, user } = data || {};
  return (
    <header
      className={`border-border bg-surface sticky top-0 z-40 w-full border-b p-4 shadow-[0_8px_32px_rgba(0,0,0,0.01)] backdrop-blur-xl transition-all duration-300 lg:p-6 ${
        isLoading && "blur-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <button
            onClick={onOpenSidebar}
            className="flex rounded-xl border border-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="border-border/50 bg-surface-secondary/20 flex items-center gap-x-2 rounded-xl border px-3 py-2">
            <div className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${user?.isActive ? "bg-success" : "bg-warning"}`}
              ></span>
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${user?.isActive ? "bg-success" : "bg-warning"}`}
              ></span>
            </div>
            <span className="text-muted text-[11px] font-bold">
              وضعیت:
              <strong className="text-foreground mr-0.5 font-black">
                {user?.isActive ? "فعال" : "غیر فعال"}
              </strong>
            </span>
          </div>

          <div className="border-success/10 bg-success-soft/20 hidden items-center gap-x-2 rounded-xl border px-3 py-2 sm:flex">
            <TrendingUp className="text-success h-3.5 w-3.5 stroke-2" />
            <span className="text-foreground text-[11px] font-bold">
              سبد خرید:
              <strong className="text-success mr-0.5 font-black">
                {cart?.payDetail.totalGrossPrice.toLocaleString("fa-IR")}
              </strong>
              <span className="text-success/70 mr-0.5 text-[9px] font-bold">
                تومان
              </span>
            </span>
          </div>
        </div>

        <div className="border-border bg-surface-secondary flex items-center gap-x-1 rounded-xl border p-1">
          <Button
            onClick={() => toast.info("این قابلیت بعدا اضافه میشود")}
            isIconOnly
            variant="ghost"
            className="rounded-lg"
          >
            <Bell className="h-4 w-4 stroke-[1.5]" />
          </Button>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
