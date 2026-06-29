"use client";

import { useState } from "react";
import { useGetUser } from "@/hooks/useAuth";
import { Avatar, Badge, Button, toast } from "@heroui/react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import UserMenuButton from "./UserMenuButton";
import {
  ChevronLeftIcon,
  MenuIcon,
  ShoppingCartIcon,
  XIcon,
} from "@/app/Icons/Icons";

export default function Header() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const navLinks = [
    { name: "محصولات", href: "/products", isReady: true },
    { name: "دسته‌بندی‌ها", href: "#", isReady: false },
    { name: "مجله", href: "#", isReady: false },
  ];

  const handleLinkClick = (e, link) => {
    if (!link.isReady) {
      e.preventDefault();
      toast.info(`بخش ${link.name} به زودی در دسترس قرار میگیرد`);
    } else {
      setIsOpenMenu(false);
    }
  };

  return (
    <>
      <header
        className={`border-border bg-surface/80 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ${
          isLoading ? "pointer-events-none blur-sm" : ""
        }`}
      >
        <div className="flex h-20 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsOpenMenu(true)}
              className="text-muted hover:bg-surface-secondary rounded-xl p-2 transition-colors lg:hidden"
              aria-label="باز کردن منو"
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            <Link href="/">
              <h3 className="text-foreground text-lg font-black tracking-tighter transition-all duration-300 ease-in-out hover:scale-105">
                نکست استور
              </h3>
            </Link>

            <nav className="text-muted hidden items-center gap-8 text-sm font-bold lg:flex">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="hover:text-foreground flex cursor-pointer items-center gap-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <ThemeSwitcher />

            <Link href="/cart">
              <Button
                variant="ghost"
                className="border-border bg-surface text-foreground hover:bg-surface-secondary h-10 w-10 min-w-0 rounded-xl border p-0"
              >
                <Badge.Anchor>
                  <Avatar
                    variant="default"
                    className="text-foreground bg-transparent"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </Avatar>
                </Badge.Anchor>
                {user?.cart?.products?.length > 0 && (
                  <Badge
                    variant="soft"
                    color="accent"
                    className="font-bold"
                    size="md"
                  >
                    {user?.cart?.products?.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <UserMenuButton user={user} />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 lg:hidden ${
          isOpenMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setIsOpenMenu(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        <div
          className={`bg-surface border-border absolute inset-y-0 right-0 flex w-full max-w-75 flex-col border-l p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isOpenMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="border-border flex items-center justify-between border-b pb-5">
            <span className="text-foreground text-base font-black">
              منوی اصلی
            </span>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="text-muted bg-surface-secondary hover:bg-border rounded-xl p-1 transition-colors"
              aria-label="بستن منو"
            >
              <XIcon className="h-6 w-6 stroke-2" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-foreground hover:bg-surface-secondary flex items-center justify-between rounded-2xl p-4 text-sm font-bold transition-all active:scale-[0.98]"
              >
                <span>{link.name}</span>
                <ChevronLeftIcon className="text-muted h-4 w-4" />
              </Link>
            ))}
          </nav>

          <div className="border-border text-muted mt-auto border-t pt-4 text-center text-[10px] font-bold">
            نکست استور - طراحی اختصاصی UI/UX
          </div>
        </div>
      </div>
    </>
  );
}
