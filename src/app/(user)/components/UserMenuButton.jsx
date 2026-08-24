"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  LayoutDashboardIcon,
  LogInIcon,
  ShieldCheckIcon,
} from "@/app/Icons/Icons";

export default function UserMenuButton({ user }) {
  const userRole = user?.role ? String(user.role).toLowerCase() : "user";
  const isAdmin = userRole === "admin";

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Link
          href={`/${userRole === "user" ? "profile" : "admin"}`}
          className="block"
        >
          <Button
            variant={isAdmin ? "secondary" : "flat"} // flat در HeroUI زیباترین حالت برای این باتن است
            className={`group relative flex h-10 items-center gap-2.5 rounded-2xl px-4 text-xs font-black shadow-sm transition-all duration-300 active:scale-95 md:h-11 md:px-5 ${
              isAdmin
                ? "bg-accent/10 text-accent hover:bg-accent/20"
                : "bg-surface-secondary text-foreground hover:bg-border/50"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {isAdmin ? (
                <ShieldCheckIcon className="text-accent h-5 w-5 animate-pulse" />
              ) : (
                <LayoutDashboardIcon className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:rotate-12 md:h-5 md:w-5" />
              )}
            </div>

            <span className="hidden sm:inline">
              {isAdmin ? "پنل ارشد ادمین" : "داشبورد کاربری"}
            </span>
            <span className="sm:hidden">پنل</span>
          </Button>
        </Link>
      ) : (
        <Link href="/auth" className="block">
          <Button
            variant="flat"
            className="group bg-surface-secondary text-foreground hover:bg-border/50 flex h-10 items-center gap-2 rounded-2xl px-4 text-xs font-black transition-all duration-300 active:scale-95 md:h-11 md:px-5"
          >
            <LogInIcon className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:-translate-x-0.5 md:h-5 md:w-5" />
            <span className="hidden sm:inline">ورود / عضویت</span>
            <span className="sm:hidden">ورود</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
