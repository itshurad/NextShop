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
    <div className="group border-border/80 bg-surface shadow-accent/5 hover:shadow-accent/10 relative flex flex-col rounded-[24px] border p-2.5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:rounded-[36px] md:p-4">
      <div className="bg-surface-secondary relative flex aspect-square max-h-75 w-full items-center justify-center overflow-hidden rounded-[18px] p-2 md:rounded-[22px] md:p-4">
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
            className="h-full w-full rounded-[18px] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06] md:rounded-[38px] dark:mix-blend-normal"
          />
        </Link>

        <div className="absolute top-2 right-2 z-10 transition-transform duration-300 hover:scale-110 md:top-4 md:right-4">
          <LikeButton
            product={product}
            className="bg-danger/10 text-danger hover:bg-danger rounded-xl p-2.5 shadow-sm backdrop-blur-md transition-all hover:text-white md:rounded-2xl md:p-3"
          />
        </div>

        {discountPercent > 0 && (
          <Chip className="border-danger/20 bg-danger/10 text-danger absolute top-2 left-2 h-6 rounded-lg border px-1.5 text-[9px] font-black shadow-sm md:top-4 md:left-4 md:h-7 md:rounded-xl md:px-2.5 md:text-[11px]">
            {discountPercent}% تخفیف
          </Chip>
        )}

        {product.brand && (
          <div className="border-border bg-surface/90 text-foreground/80 absolute right-4 bottom-4 hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-black tracking-wide shadow-sm backdrop-blur-md md:flex">
            <Tag className="text-accent h-3 w-3" />
            {product.brand}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3 md:p-4 md:pt-5">
        <div className="text-muted mb-2 flex items-center justify-between text-[8px] font-black tracking-wide md:mb-3.5 md:text-[10px]">
          <div className="border-success/10 bg-success/5 text-success flex items-center gap-1 rounded-lg border px-2.5 py-1 md:gap-1.5">
            <span className="bg-success h-1 w-1 animate-pulse rounded-full md:h-1.5 md:w-1.5"></span>
            موجود
          </div>
          <div className="bg-surface-secondary text-foreground/70 rounded-lg px-2 py-0.5 font-bold md:px-2.5 md:py-1">
            {product.category?.title || "دیجیتال"}
          </div>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h2 className="text-foreground group-hover:text-accent mb-2 line-clamp-2 text-xs font-black tracking-tight transition-colors md:mb-4 md:line-clamp-1 md:text-xl">
            {product.title}
          </h2>
        </Link>

        <div className="border-border mt-auto space-y-3 border-t pt-3 md:space-y-4 md:pt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted hidden text-[11px] font-black tracking-wider uppercase md:inline">
              بهای نهایی کالا:
            </span>
            <div className="flex w-full flex-col items-end md:w-auto">
              <div className="flex items-baseline gap-0.5">
                <span className="text-foreground text-base font-black tracking-tight md:text-2xl">
                  {Number(product.offPrice || product.price).toLocaleString(
                    "fa-IR",
                  )}
                </span>
                <span className="text-muted text-[10px] font-black">تومان</span>
              </div>
              {discountPercent > 0 && (
                <span className="text-muted text-[10px] font-bold tracking-tight line-through opacity-70 md:text-xs">
                  {product.price.toLocaleString("fa-IR")}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="group/btn border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:shadow-accent/20 flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-black shadow-sm transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-lg md:rounded-2xl md:px-5 md:py-4 md:text-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 stroke-[2.5] md:h-4 md:w-4" />
            <span className="hidden sm:inline">مشاهده و اصالت‌سنجی خرید</span>
            <span className="sm:hidden">خرید و بررسی</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
