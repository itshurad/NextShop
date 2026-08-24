"use client";
import React from "react";
import { Button, toast } from "@heroui/react";
import { Bell, TrendingUp, Menu } from "lucide-react";
import { useGetUser } from "@/hooks/useAuth";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

function Header({ onOpenSidebar }) {
  const { data, isLoading } = useGetUser();
  const { cart, user } = data || {};

  return (
    <header
      className={`border-border bg-surface/80 sticky top-0 z-40 w-full border-b p-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-500 lg:p-6 ${
        isLoading ? "opacity-50 blur-sm" : "blur-0 opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <button
            onClick={onOpenSidebar}
            className="border-border text-foreground hover:bg-surface-secondary flex rounded-xl border p-2.5 transition-colors lg:hidden"
            aria-label="باز کردن منو"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="border-border/50 bg-surface-secondary/50 flex items-center gap-x-2 rounded-xl border px-3 py-2">
            <div className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  user?.isActive ? "bg-success" : "bg-warning"
                }`}
              ></span>
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  user?.isActive ? "bg-success" : "bg-warning"
                }`}
              ></span>
            </div>
            <span className="text-muted text-[11px] font-bold">
              وضعیت:
              <strong className="text-foreground mr-1 font-black">
                {user?.isActive ? "فعال" : "غیر فعال"}
              </strong>
            </span>
          </div>

          {cart && cart.payDetail && (
            <div className="border-success/20 bg-success/10 hidden items-center gap-x-2 rounded-xl border px-3 py-2 sm:flex">
              <TrendingUp className="text-success h-4 w-4 stroke-2" />
              <span className="text-foreground text-[11px] font-bold">
                سبد خرید:
                <strong className="text-success mr-1 font-black">
                  {cart.payDetail.totalGrossPrice.toLocaleString("fa-IR")}
                </strong>
                <span className="text-success/70 mr-0.5 text-[9px] font-bold">
                  تومان
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="border-border bg-surface-secondary flex items-center gap-x-1 rounded-xl border p-1">
          <Button
            onClick={() => toast.info("این قابلیت بعدا اضافه میشود")}
            isIconOnly
            variant="light"
            className="text-foreground rounded-lg"
            aria-label="اعلان‌ها"
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
