import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Layers,
  Tag,
  Info,
  Sliders,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";

import AddToCart from "../../components/AddToCart";
import LikeButton from "../../components/LikeButton";
import { getOneProductBySlug, getProducts } from "@/services/productService";

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = null;

  try {
    const response = await getOneProductBySlug(slug);
    product = response?.product;
    if (!product) notFound();
  } catch (error) {
    console.error(`[Build Skip] Product not found: ${slug}`);
    notFound();
  }

  const discountPercent =
    product.price && product.offPrice
      ? Math.round(((product.price - product.offPrice) / product.price) * 100)
      : 0;

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 pt-6 pb-24 md:space-y-12 md:px-8 md:pt-10 md:pb-32">
      {/* Breadcrumb */}
      <nav className="text-muted flex [scrollbar-width:none] items-center gap-2 overflow-x-auto pb-2 text-[10px] font-black tracking-wide whitespace-nowrap md:text-xs">
        <span className="hover:text-accent cursor-pointer transition-colors">
          خانه
        </span>
        <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
        <span className="hover:text-accent cursor-pointer transition-colors">
          محصولات هوشمند
        </span>
        <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Product Image Section */}
        <div className="relative w-full lg:col-span-5 xl:col-span-6">
          <div className="group sticky top-24 space-y-4 md:space-y-6">
            <div className="border-border bg-surface shadow-accent/5 relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[32px] border p-8 shadow-2xl transition-all duration-700 md:rounded-[48px] md:p-12">
              <div className="bg-accent/5 group-hover:bg-accent/10 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-700 md:h-80 md:w-80 md:blur-[120px]" />

              <div className="absolute top-4 right-4 z-10 transition-transform duration-300 hover:scale-110 md:top-6 md:right-6">
                <LikeButton
                  product={product}
                  className="bg-danger/10 text-danger hover:bg-danger rounded-xl p-2 shadow-sm backdrop-blur-md transition-all hover:text-white md:rounded-2xl md:p-3"
                />
              </div>

              <Image
                src={product.imageLink}
                alt={product.title}
                width={800}
                height={800}
                unoptimized
                priority
                className="z-0 h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.05] dark:mix-blend-normal dark:brightness-95"
              />
            </div>

            {/* Features (Badges) */}
            <div className="text-muted grid grid-cols-3 gap-2 text-center text-[9px] font-black tracking-wide md:gap-3 md:text-[10px]">
              <div className="border-border from-surface rounded-xl border bg-linear-to-b to-transparent p-3 backdrop-blur-sm md:rounded-2xl md:p-4">
                اصالت ۱۰۰٪ کالا
              </div>
              <div className="border-border from-surface rounded-xl border bg-linear-to-b to-transparent p-3 backdrop-blur-sm md:rounded-2xl md:p-4">
                پک اصلی رجیستر شده
              </div>
              <div className="border-border from-surface rounded-xl border bg-linear-to-b to-transparent p-3 backdrop-blur-sm md:rounded-2xl md:p-4">
                تحویل فوق‌سریع
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-8 md:space-y-10 lg:col-span-7 xl:col-span-6">
          <div className="space-y-4 md:space-y-5">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="border-accent/20 bg-accent/5 text-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-inner md:px-4">
                <Sparkles className="h-3 w-3 animate-pulse" />
                {product.brand || "PREMIUM FLAGSHIP"}
              </span>

              {product.countInStock > 0 ? (
                <span className="border-success/20 bg-success/10 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black">
                  <span className="bg-success h-2 w-2 animate-ping rounded-full" />
                  موجود در انبار ({product.countInStock} عدد)
                </span>
              ) : (
                <span className="border-danger/20 bg-danger/10 text-danger inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black">
                  <span className="bg-danger h-2 w-2 rounded-full" />
                  ناموجود در انبار
                </span>
              )}
            </div>

            <h1 className="text-foreground text-2xl leading-tight font-black tracking-tight text-balance md:text-4xl lg:text-[44px]">
              {product.title}
            </h1>

            <div className="text-muted flex flex-wrap items-center gap-3 text-xs font-bold md:gap-4">
              <div className="flex items-center gap-1 rounded-lg bg-amber-400/10 px-2.5 py-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-black">
                  {product.rating || "۴.۹"}
                </span>
              </div>
              <div className="bg-border hidden h-4 w-px sm:block" />
              <span>{product.numReviews || "۱۲۸"} دیدگاه تایید شده</span>
              <div className="bg-border hidden h-4 w-px sm:block" />
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                {product.category?.title || "دیجیتال"}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="border-border from-surface to-foreground/5 shadow-accent/5 relative space-y-6 overflow-hidden rounded-[32px] border bg-linear-to-br p-6 shadow-2xl md:space-y-8 md:rounded-[40px] md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1.5">
                <span className="text-muted block text-[10px] font-black tracking-widest uppercase">
                  بهای مصوب با احتساب مالیات:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground text-3xl font-black tracking-tight md:text-4xl">
                    {(product.offPrice || product.price).toLocaleString(
                      "fa-IR",
                    )}
                  </span>
                  <span className="text-muted text-xs font-bold md:text-sm">
                    تومان
                  </span>
                </div>
              </div>

              {discountPercent > 0 && (
                <div className="flex flex-row items-center gap-3 text-left md:flex-col md:items-end md:gap-1">
                  <span className="text-muted/60 text-sm font-bold line-through md:text-base">
                    {product.price.toLocaleString("fa-IR")}
                  </span>
                  <span className="border-danger/15 bg-danger/10 text-danger inline-block rounded-xl border px-3 py-1 text-[11px] font-black">
                    صرفه‌جویی {discountPercent}%
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <AddToCart product={product} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 p-2">
            <h3 className="text-muted flex items-center gap-2 text-xs font-black tracking-wider uppercase">
              <Info className="text-accent h-4 w-4" /> بیانیه و بررسی اجمالی
              مهندسی
            </h3>
            <p className="text-foreground/80 text-justify text-sm leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Technical Specs */}
          <div className="space-y-4">
            <h3 className="text-muted flex items-center gap-2 text-xs font-black tracking-wider uppercase">
              <Sliders className="text-accent h-4 w-4" /> ساختار و شناسنامه
              اصالت فنی کالا
            </h3>
            <div className="border-border bg-surface overflow-hidden rounded-2xl border text-[11px] md:rounded-[28px] md:text-xs">
              <div className="border-border hover:bg-foreground/5 grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">خانواده ساختاری</span>
                <span className="text-foreground text-left font-black">
                  {product.category?.title || "تکنولوژی نوین"}
                </span>
              </div>
              <div className="border-border hover:bg-foreground/5 grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">آدرس یکتا (Slug)</span>
                <span className="text-foreground text-left font-black tracking-tight">
                  {product.slug}
                </span>
              </div>
              <div className="border-border hover:bg-foreground/5 grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">ثبت اولیه دیتابیس</span>
                <span className="text-foreground flex items-center justify-end gap-1.5 text-left font-black">
                  <Calendar className="h-4 w-4 opacity-50" />
                  {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <div className="hover:bg-foreground/5 grid grid-cols-2 p-4 transition-colors">
                <span className="text-muted font-bold">آخرین بازبینی</span>
                <span className="text-foreground flex items-center justify-end gap-1.5 text-left font-black">
                  <Clock className="h-4 w-4 opacity-50" />
                  {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          </div>

          {/* Guarantee Cards */}
          <div className="grid grid-cols-1 gap-3 pt-4 md:grid-cols-3 md:gap-4">
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-linear-to-b to-transparent p-4 md:p-5">
              <ShieldCheck className="text-success h-5 w-5 md:h-6 md:w-6" />
              <h4 className="text-foreground text-xs font-black md:text-sm">
                گارانتی طلایی اصالت
              </h4>
              <p className="text-muted text-[10px] font-medium md:text-[11px]">
                تضمین عودت ۱۰۰٪ وجه در صورت عدم تطابق کالا.
              </p>
            </div>
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-linear-to-b to-transparent p-4 md:p-5">
              <Truck className="text-accent h-5 w-5 md:h-6 md:w-6" />
              <h4 className="text-foreground text-xs font-black md:text-sm">
                ارسال ایمن اختصاصی
              </h4>
              <p className="text-muted text-[10px] font-medium md:text-[11px]">
                بسته‌بندی ضدضربه همراه با بیمه کامل مرسولات.
              </p>
            </div>
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-linear-to-b to-transparent p-4 md:p-5">
              <RotateCcw className="h-5 w-5 text-amber-500 md:h-6 md:w-6" />
              <h4 className="text-foreground text-xs font-black md:text-sm">
                ۷ روز مهلت تست فنی
              </h4>
              <p className="text-muted text-[10px] font-medium md:text-[11px]">
                امکان بررسی و عودت کالا در صورت بروز عیب ساختاری.
              </p>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="border-border bg-surface text-muted hover:border-accent hover:text-accent flex cursor-pointer items-center gap-1 rounded-xl border px-3 py-1.5 text-[10px] font-black backdrop-blur-md transition-all duration-300 md:text-[11px]"
                >
                  <Tag className="h-3 w-3 opacity-60" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
