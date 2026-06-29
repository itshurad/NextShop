import { getOneProdcutBySlug, getProducts } from "@/services/productService";
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
import Image from "next/image";
import React from "react";
import AddToCart from "../../components/AddToCart";
import LikeButton from "../../components/LikeButton";

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function page({ params }) {
  const { slug } = await params;
  const { product } = await getOneProdcutBySlug(slug);

  // 📐 محاسبه ریاضی درصد تخفیف واقعی
  const discountPercent =
    product.price && product.offPrice
      ? Math.round(((product.price - product.offPrice) / product.price) * 100)
      : 0;

  return (
    <main className="mx-auto max-w-[1440px] space-y-12 px-4 pt-8 pb-32 md:px-10">
      {/* 🗺️ سیستم ناوبری خطی لوکس و مینیمال (Breadcrumb) */}
      <nav className="text-muted flex items-center gap-2.5 text-[11px] font-black tracking-wide">
        <span className="hover:text-accent cursor-pointer transition-colors">
          خانه
        </span>
        <ChevronRight className="h-3 w-3 opacity-50" />
        <span className="hover:text-accent cursor-pointer transition-colors">
          محصولات هوشمند
        </span>
        <ChevronRight className="h-3 w-3 opacity-50" />
        <span className="text-foreground line-clamp-1">{product.title}</span>
      </nav>

      {/* ⚡ شبکه معماری حجیم و پرابهت */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* 🟥 ستون اول (۶ از ۱۲): کانتینر ماکسیمال تصویر محصول */}
        <div className="relative w-full lg:col-span-6">
          <div className="group sticky top-28 space-y-6">
            <div className="border-border bg-surface shadow-accent/5 relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[48px] border p-12 shadow-2xl transition-all duration-700">
              {/* هاله نور محیطی انتزاعی متحرک در پس‌زمینه تصویر */}
              <div className="bg-accent/5 group-hover:bg-accent/10 absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-all duration-700" />

              {/* دکمه لایک معلق شیشه‌ای پریمیوم روی تصویر */}
              <div className="absolute top-6 right-6 z-10 transition-transform duration-300 hover:scale-110">
                <LikeButton
                  product={product}
                  className="bg-danger/10 text-danger hover:bg-danger rounded-2xl p-3 shadow-sm backdrop-blur-md transition-all hover:text-white"
                />
              </div>

              <Image
                src={product.imageLink}
                alt={product.title}
                width={900}
                height={900}
                unoptimized
                priority
                className="z-0 h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.04] dark:mix-blend-normal dark:brightness-95"
              />
            </div>

            {/* گارانتی‌های مایکرو لوکس با افکت شیشه‌ای */}
            <div className="text-muted grid grid-cols-3 gap-3 text-center text-[10px] font-black tracking-wide">
              <div className="border-border from-surface rounded-2xl border bg-gradient-to-b to-transparent p-4 backdrop-blur-sm">
                اصالت ۱۰۰٪ کالا
              </div>
              <div className="border-border from-surface rounded-2xl border bg-gradient-to-b to-transparent p-4 backdrop-blur-sm">
                پک اصلی رجیستر شده
              </div>
              <div className="border-border from-surface rounded-2xl border bg-gradient-to-b to-transparent p-4 backdrop-blur-sm">
                تحویل فوق‌سریع
              </div>
            </div>
          </div>
        </div>

        {/* 🟩 ستون دوم (۶ از ۱۲): شناسنامه کالا، جداول فنی و کارت خرید */}
        <div className="space-y-10 lg:col-span-6">
          {/* هدر اطلاعات و عنوان غول‌پیکر */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border-accent/20 bg-accent/5 text-accent inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-inner">
                <Sparkles className="h-3 w-3 animate-pulse" />
                {product.brand || "PREMIUM FLAGSHIP"}
              </span>

              {/* شاخص وضعیت انبار زنده */}
              {product.countInStock > 0 ? (
                <span className="border-success/20 bg-success/10 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black">
                  <span className="bg-success h-2 w-2 animate-ping rounded-full" />
                  موجود در انبار مرکزی ({product.countInStock} عدد)
                </span>
              ) : (
                <span className="border-danger/20 bg-danger/10 text-danger inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black">
                  <span className="bg-danger h-2 w-2 rounded-full" />
                  ناموجود در انبار
                </span>
              )}
            </div>

            <h1 className="text-foreground text-3xl leading-[1.2] font-black tracking-tight text-balance md:text-[44px]">
              {product.title}
            </h1>

            {/* ریتینگ و آمار بازدید کالا */}
            <div className="text-muted flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1 rounded-lg bg-amber-400/10 px-2 py-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-black">
                  {product.rating || "۴.۹"}
                </span>
              </div>
              <div className="bg-border h-4 w-[1px]" />
              <span>{product.numReviews || "۱۲۸"} دیدگاه تایید شده</span>
              <div className="bg-border h-4 w-[1px]" />
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                {product.category?.title || "دیجیتال"}
              </span>
            </div>
          </div>

          {/* ساختار قیمت‌گذاری و اکشن باکس حجیم */}
          <div className="border-border from-surface to-foreground/[0.02] shadow-accent/5 relative space-y-8 overflow-hidden rounded-[40px] border bg-gradient-to-br p-8 shadow-2xl">
            <div className="flex items-center justify-between">
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
                  <span className="text-muted text-sm font-bold">تومان</span>
                </div>
              </div>

              {discountPercent > 0 && (
                <div className="space-y-1 text-left">
                  <span className="text-muted/60 block text-sm font-bold line-through">
                    {product.price.toLocaleString("fa-IR")}
                  </span>
                  <span className="border-danger/15 bg-danger/8 text-danger inline-block rounded-xl border px-3 py-1 text-[11px] font-black">
                    صرفه‌جویی {discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* کامپوننت دکمه خرید سراسری کالا */}
            <div className="pt-2">
              <AddToCart products={product} />
            </div>
          </div>

          {/* توضیحات محصول با دیزاین مجله‌ای متراکم */}
          <div className="space-y-3 p-2">
            <h3 className="text-muted flex items-center gap-2 text-xs font-black tracking-wider uppercase">
              <Info className="text-accent h-4 w-4" /> بیانیه و بررسی اجمالی
              مهندسی
            </h3>
            <p className="text-foreground/90 text-justify text-sm leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* جدول مشخصات فنی عمیق */}
          <div className="space-y-4">
            <h3 className="text-muted flex items-center gap-2 text-xs font-black tracking-wider uppercase">
              <Sliders className="text-accent h-4 w-4" /> ساختار و شناسنامه
              اصالت فنی کالا
            </h3>

            <div className="border-border bg-surface overflow-hidden rounded-[28px] border text-xs">
              <div className="border-border hover:bg-foreground/[0.02] grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">
                  خانواده ساختاری گجت
                </span>
                <span className="text-foreground text-left font-black">
                  {product.category?.title || "تکنولوژی نوین"}
                </span>
              </div>
              <div className="border-border hover:bg-foreground/[0.02] grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">
                  آدرس یکتای سیستم (Slug)
                </span>
                <span className="text-foreground text-left font-black tracking-tight">
                  {product.slug}
                </span>
              </div>
              <div className="border-border hover:bg-foreground/[0.02] grid grid-cols-2 border-b p-4 transition-colors">
                <span className="text-muted font-bold">
                  ثبت اولیه دیتابیس انبار
                </span>
                <span className="text-foreground flex items-center justify-end gap-1.5 text-left font-black">
                  <Calendar className="h-3.5 w-3.5 opacity-50" />
                  {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <div className="hover:bg-foreground/[0.02] grid grid-cols-2 p-4 transition-colors">
                <span className="text-muted font-bold">
                  آخرین بازبینی پایداری زنجیره
                </span>
                <span className="text-foreground flex items-center justify-end gap-1.5 text-left font-black">
                  <Clock className="h-3.5 w-3.5 opacity-50" />
                  {new Date(product.updatedAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          </div>

          {/* باکس‌های لوکس سه‌گانه ارزش‌آفرینی */}
          <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-gradient-to-b to-transparent p-5">
              <ShieldCheck className="text-success h-5 w-5" />
              <h4 className="text-foreground text-xs font-black">
                گارانتی طلایی اصالت
              </h4>
              <p className="text-muted text-[11px] font-medium">
                تضمین عودت ۱۰۰٪ وجه در صورت عدم تطابق کدهای همتا کالا.
              </p>
            </div>
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-gradient-to-b to-transparent p-5">
              <Truck className="text-accent h-5 w-5" />
              <h4 className="text-foreground text-xs font-black">
                ارسال ایمن و اختصاصی
              </h4>
              <p className="text-muted text-[11px] font-medium">
                بسته‌بندی ضدضربه تخصصی همراه با بیمه کامل مرسولات گران‌قیمت.
              </p>
            </div>
            <div className="border-border from-surface space-y-2 rounded-2xl border bg-gradient-to-b to-transparent p-5">
              <RotateCcw className="h-5 w-5 text-amber-500" />
              <h4 className="text-foreground text-xs font-black">
                ۷ روز مهلت تست فنی
              </h4>
              <p className="text-muted text-[11px] font-medium">
                امکان بررسی و عودت بی قید و شرط کالا در صورت بروز هرگونه عیب
                ساختاری.
              </p>
            </div>
          </div>

          {/* تگ‌های هویتی محصول */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="border-border bg-surface text-muted hover:border-accent hover:text-accent cursor-pointer rounded-xl border px-3 py-1.5 text-[10px] font-black backdrop-blur-md transition-all duration-300"
                >
                  <Tag className="ml-1 inline h-3 w-3 opacity-60" /> {tag}
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
