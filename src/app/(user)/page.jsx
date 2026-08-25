import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronLeft,
  Sparkles,
  Flame,
  Smartphone,
  Grid,
  ArrowLeft,
  BookOpen,
  Refrigerator,
  Shirt,
  CookingPot,
  Laptop,
  Layers,
} from "lucide-react";

import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import ProductCard from "./components/ProductCard";

const categoryIcons = {
  mobile: Smartphone,
  "book-and-media": BookOpen,
  "personal-appliance": Sparkles,
  "category-home-appliance": Refrigerator,
  laptop: Laptop,
  apparel: Shirt,
  "home-and-kitchen": CookingPot,
};

export default async function HomePage() {
  const results = await Promise.allSettled([
    getCategories(),
    getProducts("sort=popular"),
    getProducts("category=mobile"),
    getProducts("sort=latest"),
  ]);

  const getResultData = (result) => {
    if (result.status !== "fulfilled") return [];
    return result.value;
  };

  const categoriesData = getResultData(results[0]);
  const popularData = getResultData(results[1]);
  const mobileData = getResultData(results[2]);
  const latestData = getResultData(results[3]);

  const categories =
    categoriesData?.data?.categories || categoriesData?.categories || [];
  const latestProducts =
    latestData?.data?.products || latestData?.products || [];
  const popularProducts =
    popularData?.data?.products || popularData?.products || [];
  const mobileProducts =
    mobileData?.data?.products || mobileData?.products || [];

  return (
    <main className="mx-auto max-w-7xl space-y-16 px-4 pt-6 md:space-y-24 md:px-8 lg:px-12 lg:pt-10">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Main Hero */}
        <div className="group from-foreground via-foreground/95 to-accent/40 text-background shadow-accent/20 relative flex min-h-100 flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br p-6 shadow-2xl md:min-h-120 md:rounded-[40px] md:p-12 lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="from-accent/30 to-accent/0 absolute -top-20 -left-20 h-72 w-72 rounded-full bg-linear-to-br blur-3xl transition-transform duration-700 group-hover:scale-110 md:h-96 md:w-96" />
            <div className="bg-accent/10 absolute right-1/4 -bottom-20 h-60 w-60 rounded-full blur-3xl md:h-80 md:w-80" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,transparent_30%,#000_100%)] bg-size-[20px_20px]" />
          </div>

          <div className="relative z-10 max-w-lg space-y-4 md:space-y-6">
            <span className="border-accent/30 bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black tracking-wide shadow-inner backdrop-blur-xl md:text-xs">
              <Sparkles className="text-accent h-4 w-4 animate-pulse" />
              <span>بازار هوشمند گجت‌ها</span>
            </span>

            <h1 className="text-3xl leading-tight font-black text-balance sm:text-4xl lg:text-5xl lg:leading-[1.35]">
              پیشرفته‌ترین گجت‌ها،
              <br />
              <span className="from-accent via-accent/80 to-accent/60 bg-linear-to-r bg-clip-text text-transparent drop-shadow-sm">
                در ساختاری هوشمند
              </span>
            </h1>

            <p className="text-background/80 max-w-md text-xs leading-relaxed font-medium text-balance md:text-sm">
              بررسی تخصصی، انتخاب هوشمندانه و خرید آنلاین محصولات تراز اول
              دیجیتال با تضمین اصالت و پایداری قیمت در زنجیره تامین.
            </p>
          </div>

          <div className="relative z-10 pt-8">
            <Link
              href="/products"
              className="group/btn bg-background text-foreground hover:bg-surface-secondary inline-flex min-h-12 items-center gap-2.5 rounded-2xl px-8 py-3 text-sm font-black shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              شروع کاوش در بازار
              <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Hero Side Cards */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Popular Hero Card */}
          <div className="group border-border bg-surface hover:border-accent/50 relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="bg-danger/10 text-danger inline-flex items-center gap-1 rounded-md px-2 py-1 font-black">
                  <Flame className="h-4 w-4" />
                  <span className="text-[10px] md:text-xs">
                    برگزیده کاربران
                  </span>
                </div>
                <h3 className="text-foreground group-hover:text-accent line-clamp-1 text-sm font-black tracking-tight transition-colors md:text-base">
                  {popularProducts?.[0]?.title || "محصول پرطرفدار روز"}
                </h3>
                <p className="text-muted line-clamp-2 text-[11px] font-medium">
                  محبوب‌ترین گجت هفته بر اساس بازخورد جامعه کاربری
                </p>
              </div>

              {popularProducts?.[0] && (
                <div className="bg-surface-secondary dark:bg-surface relative size-20 shrink-0 overflow-hidden rounded-xl p-1 md:size-24">
                  <Image
                    src={popularProducts[0].imageLink}
                    alt={popularProducts[0].title || "Popular Product"}
                    unoptimized
                    fill
                    className="rounded-xl object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              )}
            </div>

            <div className="border-border/40 mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-foreground text-sm font-black md:text-base">
                {popularProducts?.[0]
                  ? Number(
                      popularProducts[0].offPrice || popularProducts[0].price,
                    ).toLocaleString("fa-IR") + " تومان"
                  : "مشاهده قیمت"}
              </span>
              <Link
                href={`/products/${popularProducts?.[0]?.slug || ""}`}
                className="text-accent inline-flex items-center gap-0.5 text-xs font-black"
              >
                بررسی و خرید
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Mobile Hero Card */}
          <div className="group border-border bg-surface hover:border-accent/50 relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="bg-accent/10 text-accent inline-flex items-center gap-1 rounded-md px-2 py-1 font-black">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-[10px] md:text-xs">
                    اکوسیستم ارتباطات
                  </span>
                </div>
                <h3 className="text-foreground group-hover:text-accent line-clamp-1 text-sm font-black tracking-tight transition-colors md:text-base">
                  {mobileProducts?.[0]?.title || "دنیای گوشی‌های هوشمند"}
                </h3>
                <p className="text-muted line-clamp-2 text-[11px] font-medium">
                  آخرین پرچمداران و ترندهای تکنولوژی موبایل همراه با رجیستری
                </p>
              </div>

              {mobileProducts?.[0] && (
                <div className="bg-surface-secondary dark:bg-surface relative size-20 shrink-0 overflow-hidden rounded-xl p-1 md:size-24">
                  <Image
                    src={mobileProducts[0].imageLink}
                    unoptimized
                    alt={mobileProducts[0].title || "Mobile Product"}
                    fill
                    className="rounded-xl object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              )}
            </div>

            <div className="border-border/40 mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-foreground text-sm font-black md:text-base">
                {mobileProducts?.[0]
                  ? Number(
                      mobileProducts[0].offPrice || mobileProducts[0].price,
                    ).toLocaleString("fa-IR") + " تومان"
                  : "مشاهده قیمت"}
              </span>
              <Link
                href={`/products/${mobileProducts?.[0]?.slug || ""}`}
                className="text-accent inline-flex items-center gap-0.5 text-xs font-black"
              >
                مشاهده کالا
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES (Refactored to modern Grid)
      ========================================================= */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-foreground flex items-center gap-2 text-lg font-black md:text-xl">
            <Grid className="h-5 w-5 md:h-6 md:w-6" />
            دسته‌بندی‌های برگزیده
          </h2>
          <p className="text-muted text-xs font-medium md:text-sm">
            گروه‌بندی هوشمند محصولات جهت دسترسی سریع
          </p>
        </div>

        {/* استفاده از گرید منعطف برای دسته‌بندی‌ها */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
          {categories?.map((cat) => {
            const IconComponent =
              categoryIcons[cat.englishTitle?.toLowerCase()] || Layers;

            return (
              <Link
                href={`/products?category=${cat.englishTitle}`}
                key={cat._id}
                className="group border-border bg-surface hover:border-accent/40 hover:shadow-accent/5 relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-[28px] md:p-6"
              >
                <div className="bg-accent/0 group-hover:bg-accent/20 absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl transition-all duration-500" />
                <div className="bg-surface-secondary group-hover:border-accent/20 group-hover:bg-accent/10 text-foreground/80 group-hover:text-accent mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] border border-transparent shadow-xs transition-all duration-500 group-hover:rotate-6 md:mb-4 md:h-14 md:w-14 md:rounded-2xl">
                  <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 md:h-6 md:w-6" />
                </div>
                <span className="text-foreground group-hover:text-accent block text-xs font-black tracking-tight transition-colors md:text-sm">
                  {cat.title}
                </span>
                <span className="bg-accent absolute bottom-0 h-1 w-0 rounded-full transition-all duration-300 group-hover:w-10" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          LATEST PRODUCTS
      ========================================================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-foreground flex items-center gap-2 text-lg font-black md:text-xl">
              <Sparkles className="text-accent h-5 w-5" />
              جدیدترین ورودی‌ها
            </h2>
            <p className="text-muted text-xs font-medium md:text-sm">
              آخرین تکنولوژی‌های موجود شده در انبار
            </p>
          </div>
          <Link
            href="/products?sort=latest"
            className="border-border bg-surface text-foreground hover:bg-surface-secondary flex items-center gap-1 rounded-xl border px-3 py-2 text-[11px] font-bold transition-colors md:text-xs"
          >
            مشاهده همه
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {latestProducts?.slice(0, 3).map((product) => (
              <div
                key={product._id}
                className="w-70 shrink-0 snap-center sm:w-[320px] md:w-auto md:shrink"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          POPULAR PRODUCTS
      ========================================================= */}
      <section className="border-border from-danger/10 to-surface/40 relative overflow-hidden rounded-[28px] border bg-linear-to-b p-5 shadow-inner backdrop-blur-sm md:rounded-[40px] md:p-10">
        <div className="bg-danger/5 pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl md:h-80 md:w-80" />
        <div className="bg-warning/5 pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl md:h-80 md:w-80" />


        <div className="relative mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black md:text-2xl">
              <Flame className="fill-danger text-danger h-6 w-6 shrink-0" />
              محصولات پرطرفدار
            </h2>
            <p className="text-muted text-xs font-medium md:text-sm">
              محبوب‌ترین گجت‌ها بر اساس بازخورد کاربران
            </p>
          </div>
          <Link
            href="/products?sort=popular"
            className="text-danger inline-flex w-fit items-center gap-1 text-xs font-black transition-opacity hover:opacity-70 md:text-sm"
          >
            لیست کامل برترین‌ها
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative -mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {popularProducts?.slice(0, 3).map((product) => (
              <div
                key={product._id}
                className="w-70 shrink-0 snap-center sm:w-[320px] md:w-auto md:shrink"
              >
                <ProductCard product={product} isPopular />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
