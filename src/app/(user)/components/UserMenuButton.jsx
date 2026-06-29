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
  const userRole = user?.role ? String(user.role).toLowerCase() : "profile";
  const isAdmin = userRole === "admin";

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Link
          href={`/${userRole === "user" ? "profile" : "admin"}`}
          className="block"
        >
          <Button
            variant={isAdmin ? "secondary" : "tertiary"}
            className="group relative flex h-11 items-center gap-2.5 rounded-2xl px-5 text-xs font-black shadow-sm transition-all duration-300 active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              {isAdmin ? (
                <ShieldCheckIcon className="h-5 w-5 animate-pulse" />
              ) : (
                <LayoutDashboardIcon className="h-5 w-5 stroke-2 transition-transform duration-300 group-hover:rotate-12" />
              )}
            </div>

            <span className="text-xs font-black">
              {isAdmin ? "پنل ارشد ادمین" : "داشبورد کاربری"}
            </span>
          </Button>
        </Link>
      ) : (
        <Link href="/auth" className="block">
          <Button
            variant="tertiary"
            className="group flex h-11 items-center gap-2 rounded-2xl px-5 text-xs font-black transition-all duration-300 active:scale-95"
          >
            <LogInIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>ورود / عضویت</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
