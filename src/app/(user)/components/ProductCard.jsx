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
    <div className="group border-border/80 bg-surface hover:shadow-accent/10 relative flex h-full flex-col rounded-2xl border p-3 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl md:rounded-[28px] md:p-4">
      <div className="bg-surface-secondary relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl p-4 md:rounded-[22px]">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0 flex items-center justify-center p-4"
        >
          <Image
            src={product.imageLink}
            alt={product.title}
            fill
            sizes="(max-w: 768px) 100vw, 300px"
            unoptimized
            className="rounded-xl object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.08] dark:mix-blend-normal"
          />
        </Link>

        <div className="absolute top-2 right-2 z-10 transition-transform duration-300 hover:scale-110 md:top-3 md:right-3">
          <LikeButton
            product={product}
            className="bg-surface/80 text-danger hover:bg-danger rounded-xl p-2 shadow-sm backdrop-blur-md transition-all hover:text-white"
          />
        </div>

        {discountPercent > 0 && (
          <Chip className="border-danger/20 bg-danger/10 text-danger absolute top-2 left-2 h-6 rounded-lg border px-2 text-[10px] font-black shadow-sm md:top-3 md:left-3 md:h-7 md:text-[11px]">
            {discountPercent}% تخفیف
          </Chip>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="text-muted mb-2 flex items-center justify-between text-[10px] font-black tracking-wide md:mb-3 md:text-xs">
          <div className="border-success/10 bg-success/5 text-success flex items-center gap-1.5 rounded-md border px-2 py-1">
            <span className="bg-success h-1.5 w-1.5 animate-pulse rounded-full"></span>
            موجود
          </div>
          <div className="bg-surface-secondary text-foreground/70 rounded-md px-2.5 py-1 font-bold">
            {product.category?.title || "دیجیتال"}
          </div>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h2 className="text-foreground group-hover:text-accent mb-4 line-clamp-2 text-sm font-black tracking-tight transition-colors md:text-base">
            {product.title}
          </h2>
        </Link>

        {/* استفاده از mt-auto برای هل دادن بخش قیمت و دکمه به پایین‌ترین نقطه ممکن */}
        <div className="border-border mt-auto space-y-4 border-t pt-4">
          <div className="flex items-end justify-between">
            <span className="text-muted hidden text-sm font-black tracking-wider uppercase sm:inline">
              بهای کالا:
            </span>
            <div className="flex w-full flex-col items-end sm:w-auto sm:items-end">
              <div className="flex items-baseline gap-1">
                <span className="text-foreground text-lg font-black tracking-tight md:text-xl">
                  {Number(product.offPrice || product.price).toLocaleString(
                    "fa-IR",
                  )}
                </span>
                <span className="text-muted text-[10px] font-black md:text-xs">
                  تومان
                </span>
              </div>

              {/* ترفند رزرو فضا: استفاده از invisible برای حفظ ارتفاع حتی زمانی که تخفیف وجود ندارد */}
              <span
                className={`text-muted/70 text-[10px] font-bold tracking-tight line-through md:text-xs ${discountPercent > 0 ? "visible" : "invisible"}`}
              >
                {product.price ? product.price.toLocaleString("fa-IR") : "0"}
              </span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:shadow-accent/20 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-black shadow-sm transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-lg md:text-sm"
          >
            <ShoppingBag className="h-4 w-4 md:h-4.5 md:w-4.5" />
            <span>مشاهده و خرید</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
