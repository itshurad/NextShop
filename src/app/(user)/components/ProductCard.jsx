"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Tag, ShoppingBag } from "lucide-react";
import { Chip } from "@heroui/react";

import LikeButton from "./LikeButton";

export default function ProductCard({ product, isPopular = false }) {
  const discountPercent =
    product.discount && product.price
      ? Math.round((product.discount / product.price) * 100)
      : 0;

  const finalPrice = Number(product.offPrice || product.price);

  return (
    <article className="group border-border/80 bg-surface shadow-accent/5 hover:shadow-accent/10 relative flex h-full w-full flex-col rounded-[20px] border p-2 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-[24px] sm:p-2.5 md:rounded-[28px] md:p-2 md:hover:-translate-y-2 md:hover:shadow-2xl">
      {/* ================= IMAGE ================= */}

      <div className="bg-surface-secondary relative aspect-square w-full shrink-0 overflow-hidden rounded-[16px] p-1.5 sm:rounded-[19px] sm:p-2 md:max-h-75 md:rounded-[22px] md:p-4">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.imageLink}
            alt={product.title}
            fill
            unoptimized
            sizes="
              (max-width: 640px) 82vw,
              (max-width: 768px) 72vw,
              (max-width: 1024px) 45vw,
              300px
            "
            className="h-full w-full rounded-[16px] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:rounded-[19px] md:rounded-[38px] md:group-hover:scale-[1.06] dark:mix-blend-normal"
          />
        </Link>

        {/* Like */}

        <div className="absolute top-2 right-2 z-10 sm:top-2.5 sm:right-2.5 md:top-4 md:right-4">
          <LikeButton
            product={product}
            className="bg-danger/10 text-danger hover:bg-danger rounded-lg p-2 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:text-white sm:rounded-xl sm:p-2.5 md:rounded-2xl md:p-3"
          />
        </div>

        {/* Discount */}

        {discountPercent > 0 && (
          <Chip className="border-danger/20 bg-danger/10 text-danger absolute top-2 left-2 h-5 rounded-md border px-1.5 text-[8px] font-black shadow-sm sm:h-6 sm:rounded-lg sm:text-[9px] md:top-4 md:left-4 md:h-7 md:rounded-xl md:px-2.5 md:text-[11px]">
            {discountPercent}% تخفیف
          </Chip>
        )}

        {/* Brand */}

        {product.brand && (
          <div className="border-border bg-surface/90 text-foreground/80 absolute right-4 bottom-4 hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-black tracking-wide shadow-sm backdrop-blur-md md:flex">
            <Tag className="text-accent h-3 w-3" />
            {product.brand}
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex flex-1 flex-col pt-2 sm:pt-3 md:p-2 md:pt-5">
        {/* Status */}

        <div className="mb-1.5 flex h-6 shrink-0 items-center justify-between gap-2 text-[7px] font-black tracking-wide sm:mb-2 sm:h-7 sm:text-[8px] md:mb-3.5 md:h-auto md:text-[10px]">
          <div className="border-success/10 bg-success/5 text-success flex items-center gap-1 rounded-md border px-2 py-0.5 sm:rounded-lg sm:px-2.5 sm:py-1 md:gap-1.5">
            <span className="bg-success h-1 w-1 animate-pulse rounded-full md:h-1.5 md:w-1.5" />
            موجود
          </div>

          <div className="bg-surface-secondary text-foreground/70 max-w-[55%] truncate rounded-md px-2 py-0.5 font-bold sm:rounded-lg sm:px-2.5 sm:py-1 md:max-w-none">
            {product.category?.title || "دیجیتال"}
          </div>
        </div>

        {/* ================= TITLE ================= */}

        <Link href={`/products/${product.slug}`} className="block shrink-0">
          <h2 className="text-foreground group-hover:text-accent mb-1.5 line-clamp-2 h-[34px] overflow-hidden text-[11px] leading-[17px] font-black tracking-tight transition-colors sm:mb-2 sm:h-[38px] sm:text-xs sm:leading-[19px] md:mb-4 md:line-clamp-1 md:h-auto md:text-xl md:leading-normal">
            {product.title}
          </h2>
        </Link>

        {/* ================= BOTTOM ================= */}

        <div className="border-border mt-auto border-t pt-2 sm:pt-2.5 md:space-y-4 md:pt-4">
          {/* PRICE */}

          <div className="flex h-[38px] items-center justify-between gap-2 sm:h-[42px] md:h-auto">
            <span className="text-muted hidden text-[11px] font-black tracking-wider uppercase md:inline">
              بهای نهایی کالا:
            </span>

            <div className="flex w-full flex-col items-end md:w-auto">
              <div className="flex items-baseline gap-0.5">
                <span className="text-foreground text-sm leading-none font-black tracking-tight sm:text-base md:text-2xl">
                  {finalPrice.toLocaleString("fa-IR")}
                </span>

                <span className="text-muted text-[8px] font-black sm:text-[9px] md:text-[10px]">
                  تومان
                </span>
              </div>

              {/* همیشه فضای قیمت قبلی حفظ شود */}

              <div className="h-[12px] text-[8px] sm:h-[13px] sm:text-[9px] md:h-auto">
                {discountPercent > 0 && (
                  <span className="text-muted font-bold tracking-tight line-through opacity-70 md:text-xs">
                    {Number(product.price).toLocaleString("fa-IR")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BUTTON */}

          <Link
            href={`/products/${product.slug}`}
            className="group/btn border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:shadow-accent/20 mt-2 flex h-9 w-full shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-[10px] font-black shadow-sm transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-lg sm:mt-2.5 sm:h-10 sm:gap-1.5 sm:rounded-xl sm:px-3 sm:text-xs md:mt-0 md:h-auto md:rounded-2xl md:px-5 md:py-4 md:text-sm"
          >
            <ShoppingBag className="h-3 w-3 shrink-0 stroke-[2.5] sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />

            <span className="hidden sm:inline">مشاهده و اصالت‌سنجی خرید</span>

            <span className="sm:hidden">خرید و بررسی</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
