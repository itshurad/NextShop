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

  return (
    <div className="group border-border/80 bg-surface shadow-accent/5 hover:shadow-accent/10 relative flex h-full flex-col rounded-2xl border p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-2 md:rounded-[28px] md:p-3 md:hover:-translate-y-2 md:hover:shadow-2xl">
      {/* Image Wrapper */}
      <div className="bg-surface-secondary relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl p-1.5 sm:p-2 md:rounded-[22px] md:p-4">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0"
        >
          <Image
            src={product.imageLink}
            alt={product.title}
            fill
            sizes="(max-w: 768px) 50vw, 300px"
            unoptimized
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06] dark:mix-blend-normal"
          />
        </Link>

        {/* Like Button */}
        <div className="absolute top-1.5 right-1.5 z-10 transition-transform duration-300 hover:scale-110 sm:top-2 sm:right-2 md:top-3 md:right-3">
          <LikeButton
            product={product}
            className="bg-danger/10 text-danger hover:bg-danger rounded-lg p-1.5 shadow-sm backdrop-blur-md transition-all hover:text-white sm:rounded-xl sm:p-2 md:rounded-2xl md:p-2.5"
          />
        </div>

        {/* Discount Chip */}
        {discountPercent > 0 && (
          <Chip className="border-danger/20 bg-danger/10 text-danger absolute top-1.5 left-1.5 h-5 rounded-md border px-1 text-[10px] font-black shadow-sm sm:top-2 sm:left-2 sm:h-6 sm:px-1.5 sm:text-[11px] md:top-3 md:left-3 md:h-7 md:rounded-xl md:px-2.5">
            {discountPercent}% <span className="hidden sm:inline">تخفیف</span>
          </Chip>
        )}

        {/* Brand Tag (Desktop only) */}
        {product.brand && (
          <div className="border-border bg-surface/90 text-foreground/80 absolute right-3 bottom-3 hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-black tracking-wide shadow-sm backdrop-blur-md md:flex">
            <Tag className="text-accent h-3 w-3" />
            {product.brand}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-2.5 sm:pt-3 md:pt-4">
        {/* Badges: Stock & Category */}
        <div className="text-muted mb-1.5 flex items-center justify-between text-[9px] font-black tracking-wide sm:text-[10px] md:mb-3 md:text-[11px]">
          <div className="border-success/10 bg-success/5 text-success flex items-center gap-1 rounded-md border px-1.5 py-0.5 sm:rounded-lg sm:px-2.5 sm:py-1 md:gap-1.5">
            <span className="bg-success h-1 w-1 animate-pulse rounded-full md:h-1.5 md:w-1.5"></span>
            موجود
          </div>
          <div className="bg-surface-secondary text-foreground/70 rounded-md px-1.5 py-0.5 font-bold sm:rounded-lg sm:px-2 sm:py-1 md:px-2.5">
            {product.category?.title || "دیجیتال"}
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-foreground group-hover:text-accent mb-2 line-clamp-2 text-[11px] leading-tight font-black tracking-tight transition-colors sm:text-xs md:mb-3 md:line-clamp-1 md:text-lg">
            {product.title}
          </h2>
        </Link>

        {/* Footer: Price & Action */}
        <div className="border-border mt-auto space-y-2.5 border-t pt-2.5 sm:space-y-3 sm:pt-3 md:space-y-4 md:pt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted hidden text-[11px] font-black tracking-wider uppercase md:inline">
              بهای نهایی کالا:
            </span>
            <div className="flex w-full flex-col items-end md:w-auto">
              <div className="flex items-baseline gap-0.5">
                <span className="text-foreground text-sm font-black tracking-tight sm:text-base md:text-xl">
                  {Number(product.offPrice || product.price).toLocaleString(
                    "fa-IR",
                  )}
                </span>
                <span className="text-muted text-[9px] font-black sm:text-[10px]">
                  تومان
                </span>
              </div>
              {discountPercent > 0 && (
                <span className="text-muted text-[10px] font-bold tracking-tight line-through opacity-70 sm:text-[11px] md:text-xs">
                  {product.price.toLocaleString("fa-IR")}
                </span>
              )}
            </div>
          </div>

          {/* Buy Button */}
          <Link
            href={`/products/${product.slug}`}
            className="group/btn border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:shadow-accent/20 flex w-full items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[10px] font-black shadow-sm transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-md sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-xs md:rounded-2xl md:px-5 md:py-3.5 md:text-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 stroke-[2.5] md:h-4 md:w-4" />
            <span className="hidden sm:inline">مشاهده و اصالت‌سنجی</span>
            <span className="sm:hidden">بررسی محصول</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
