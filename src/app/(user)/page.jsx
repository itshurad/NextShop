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
} from "lucide-react";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import {
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  Layers,
} from "lucide-react";
import { FireIcon, MobileIcon } from "../Icons/Icons";

const categoryIcons = {
  mobile: Smartphone,
  laptop: Laptop,
  watch: Watch,
  audio: Headphones,
  camera: Camera,
  gaming: Gamepad2,
};

export default async function HomePage() {
  const categoriesData = await getCategories();
  const popularData = await getProducts("sort=popular");
  const mobileData = await getProducts("category=mobile");
  const latestData = await getProducts("sort=latest");

  const categories =
    categoriesData?.data?.categories || categoriesData?.categories || [];
  const latestProducts =
    latestData?.data?.products || latestData?.products || [];
  const popularProducts =
    popularData?.data?.products || popularData?.products || [];
  const mobileProducts =
    mobileData?.data?.products || mobileData?.products || [];

  return (
    <main className="mx-auto max-w-7xl space-y-20 px-4 pt-4 md:px-8">
      {/* ۱. بخش هیرو مدرن (ترکیب شیشه و مینیمالیسم) */}
      <section className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-3">
        {/* بخش اول: کارت بزرگ و سینمایی - معرفی هویت فروشگاه */}
        <div className="group from-foreground via-foreground/95 to-accent/40 text-background shadow-accent/20 relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[36px] bg-linear-to-br p-8 shadow-2xl md:p-12 lg:col-span-2">
          {/* لایه نوری پس‌زمینه */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="from-accent/30 to-accent/0 absolute -top-20 -left-20 h-96 w-96 rounded-full bg-linear-to-br blur-3xl transition-transform duration-700 group-hover:scale-110" />
            <div className="bg-accent/10 absolute right-1/4 -bottom-20 h-80 w-80 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_100%)] bg-[size:20px_20px]" />
          </div>

          {/* محتوای متنی */}
          <div className="relative z-10 max-w-md space-y-5">
            <span className="border-accent/30 bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-black tracking-wide shadow-inner backdrop-blur-xl">
              <Sparkles className="text-accent h-3.5 w-3.5 animate-pulse" />
              <span>بازار هوشمند گجت‌ها</span>
            </span>

            <h1 className="text-3xl leading-[1.35] font-black sm:text-4xl lg:text-5xl">
              پیشرفته‌ترین گجت‌ها، <br />
              <span className="from-accent via-accent/80 to-accent/60 bg-linear-to-r bg-clip-text text-transparent drop-shadow-sm">
                در ساختاری هوشمند
              </span>
            </h1>

            <p className="text-background/80 max-w-sm text-xs leading-relaxed font-bold">
              بررسی تخصصی، انتخاب هوشمندانه و خرید آنلاین محصولات تراز اول
              دیجیتال با تضمین اصالت و پایداری قیمت در زنجیره تامین.
            </p>
          </div>

          {/* دکمه انتقال به صفحه محصولات */}
          <div className="relative z-10 pt-8">
            <Link
              href="/products"
              className="hover:bg-surface-secondary bg-background text-foreground shadow-background/5 inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-xs font-black shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              شروع کاوش در بازار
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ستون سمت راست: پرطرفدار و دسته‌بندی موبایل */}
        <div className="flex flex-col gap-4">
          {/* بخش دوم: فوکوس بر محبوب‌ترین محصول دیتابیس */}
          <div className="group border-border bg-surface hover:border-accent/50 relative flex flex-1 flex-col justify-between overflow-hidden rounded-[30px] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="bg-danger/10 text-danger inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-black">
                  <FireIcon className="fill-danger h-4 w-4" />
                  <span className="text-[10px]">برگزیده کاربران</span>
                </div>
                <h3 className="group-hover:text-accent text-foreground line-clamp-1 text-sm font-black tracking-tight transition-colors">
                  {popularProducts?.[0]?.title || "محصول پرطرفدار روز"}
                </h3>
                <p className="text-muted text-[11px] font-bold">
                  محبوب‌ترین گجت هفته بر اساس بازخورد جامعه کاربری
                </p>
              </div>

              {/* تصویر محصول محبوب */}
              {popularProducts?.[0] && (
                <div className="bg-surface-secondary dark:bg-surface relative h-16 w-16 shrink-0 overflow-hidden rounded-xl p-1">
                  <Image
                    src={popularProducts[0].imageLink}
                    alt="Popular Product"
                    unoptimized
                    fill
                    className="rounded-xl object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              )}
            </div>

            <div className="border-border/40 mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-foreground text-sm font-black">
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
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* بخش سوم: فوکوس بر دسته‌بندی موبایل */}
          <div className="group border-border bg-surface hover:border-accent/50 relative flex flex-1 flex-col justify-between overflow-hidden rounded-[30px] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="bg-accent/10 text-accent inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-black">
                  <MobileIcon className="text-accent h-4 w-4" />
                  <span className="text-[10px]">اکوسیستم ارتباطات</span>
                </div>
                <h3 className="group-hover:text-accent text-foreground line-clamp-1 text-sm font-black tracking-tight transition-colors">
                  {mobileProducts?.[0]?.title || "دنیای گوشی‌های هوشمند"}
                </h3>
                <p className="text-muted text-[11px] font-bold">
                  آخرین پرچمداران و ترندهای تکنولوژی موبایل همراه با رجیستری
                </p>
              </div>

              {/* تصویر کالا از دسته موبایل */}
              {mobileProducts?.[0] && (
                <div className="bg-surface-secondary dark:bg-surface relative h-16 w-16 shrink-0 overflow-hidden rounded-xl p-1">
                  <Image
                    src={mobileProducts[0].imageLink}
                    unoptimized
                    alt="Mobile Product"
                    fill
                    className="rounded-xl object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              )}
            </div>

            <div className="border-border/40 mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-foreground text-sm font-black">
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
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ۲. بخش دسته‌بندی‌ها */}
      <section className="space-y-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
            <Grid className="text-foreground h-5 w-5" /> دسته‌بندی‌های برگزیده
          </h2>
          <p className="text-muted text-xs font-bold">
            گروه‌بندی هوشمند محصولات جهت دسترسی سریع
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {categories?.map((cat) => {
            const IconComponent =
              categoryIcons[cat.englishTitle?.toLowerCase()] || Layers;

            return (
              <Link
                href={`/products?category=${cat.englishTitle}`}
                key={cat._id}
                className="group border-border bg-surface hover:border-accent/40 hover:shadow-accent/5 relative flex w-[calc(50%-10px)] min-w-[140px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[28px] border p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:w-[calc(33.333%-14px)] md:w-[calc(25%-15px)] lg:w-[calc(16.666%-17px)]"
              >
                {/* افکت نوری و هاله‌ای پشت آیکون در حالت هاور */}
                <div className="bg-accent/0 group-hover:bg-accent/20 absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl transition-all duration-500" />

                {/* کانتینر آیکون با استایل نئومورفیسم ملایم */}
                <div className="group-hover:text-accent bg-surface-secondary text-foreground/80 group-hover:bg-accent/10 group-hover:border-accent/20 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-transparent shadow-xs transition-all duration-500 group-hover:rotate-6">
                  <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* عنوان دسته‌بندی */}
                <span className="group-hover:text-accent text-foreground block text-xs font-black tracking-tight transition-colors">
                  {cat.title}
                </span>

                {/* یک خط دکوراتیو بسیار کوچک که در هاور ظاهر می‌شود */}
                <span className="bg-accent absolute bottom-0 h-[3px] w-0 rounded-full transition-all duration-300 group-hover:w-10" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ۳. بخش آخرین محصولات */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
              <Sparkles className="text-accent h-5 w-5" />
              <span>جدیدترین ورودی‌ها</span>
            </h2>
            <p className="text-muted text-xs font-bold">
              آخرین تکنولوژی‌های موجود شده در انبار فروشگاه
            </p>
          </div>
          <Link
            href="/products?sort=latest"
            className="hover:bg-surface-secondary border-border bg-surface text-foreground flex items-center gap-1 rounded-xl border px-4 py-2 text-xs font-bold transition-colors"
          >
            مشاهده همه <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestProducts?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* ۴. بخش محبوب‌ترین‌ها (طرح شیشه‌ای) */}
      <section className="from-danger/10 border-border to-surface/40 relative overflow-hidden rounded-[36px] border bg-linear-to-b p-6 shadow-inner backdrop-blur-sm md:p-10">
        <div className="bg-danger/5 absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-warning/5 absolute bottom-0 left-0 h-72 w-72 rounded-full blur-3xl" />

        <div className="relative mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
              <Flame className="fill-danger text-danger h-5 w-5" />
              محصولات پرطرفدار
            </h2>
            <p className="text-muted text-xs font-bold">
              محبوب‌ترین گجت‌ها بر اساس لایک و بازخورد کاربران شما
            </p>
          </div>
          <Link
            href="/products?sort=popular"
            className="text-danger text-xs font-black"
          >
            لیست کامل برترین‌ها
          </Link>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularProducts?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} isPopular />
          ))}
        </div>
      </section>

      {/* ۵. دنیای موبایل */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
            <Smartphone className="text-foreground h-5 w-5" /> دنیای گوشی‌های
            هوشمند
          </h2>
          <p className="text-muted text-xs font-bold">
            پرچمداران و میان‌رده‌های دنیای موبایل
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {mobileProducts?.slice(0, 2).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* کارت تبلیغاتی سایدبار اختصاصی */}
          <div className="group bg-foreground text-background shadow-accent/20 relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[36px] p-8 shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="bg-accent/20 absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div className="bg-success/10 absolute -bottom-12 -left-12 h-36 w-36 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            {mobileProducts?.[0] && (
              <div className="pointer-events-none absolute top-12 bottom-12 -left-20 z-0 h-full w-full opacity-15 transition-all duration-700 group-hover:scale-110 group-hover:opacity-25">
                <Image
                  src="/apple.png"
                  alt="Featured Mobile background"
                  fill
                  className="h-full w-full rounded-xl object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06] dark:mix-blend-normal"
                />
              </div>
            )}

            <div className="relative z-10 space-y-3">
              <span className="border-background/10 bg-background/5 text-background/80 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black tracking-wide backdrop-blur-md">
                <span className="bg-background/80 h-1.5 w-1.5 animate-pulse rounded-full" />
                گارانتی و رجیستری جامع
              </span>

              <h3 className="text-background text-xl leading-[1.4] font-black tracking-tight">
                اکوسیستم{" "}
                <span className="from-accent to-accent/60 bg-linear-to-l bg-clip-text text-transparent">
                  موبایل هوشمند
                </span>{" "}
                <br />
                همراه با اصالت شرکتی
              </h3>

              <p className="text-background/70 max-w-[200px] text-[11px] leading-relaxed font-bold">
                تضمین ۱۰۰٪ کدهای همتا، فعال‌سازی آنی و پشتیبانی فنی در سراسر
                کشور.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/products?category=mobile"
                className="border-background/10 bg-background/5 text-background hover:bg-background hover:text-foreground hover:shadow-background/5 flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-center text-xs font-black backdrop-blur-md transition-all duration-300 hover:shadow-lg"
              >
                ورود به بخش اختصاصی موبایل
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

{
  /* 🧱 کامپوننت فرعی کارت محصول */
}
function ProductCard({ product, isPopular = false }) {
  return (
    <div className="group border-border bg-surface hover:shadow-border flex flex-col rounded-[28px] border p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
      <div className="bg-surface-secondary dark:bg-surface relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[22px] p-4">
        <Image
          src={product.imageLink}
          alt={product.title}
          fill
          unoptimized
          sizes="(max-w: 600px) 100vw, 300px"
          className="h-full w-full rounded-xl object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06] dark:mix-blend-normal"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pt-3">
        <div className="text-muted mb-1 flex items-center justify-between text-[10px] font-bold">
          <span>{product.category?.title || "دیجیتال"}</span>
          {product.brand && <span className="text-muted">{product.brand}</span>}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="group-hover:text-accent text-foreground mb-4 line-clamp-1 text-sm font-black transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="border-border/40 mt-auto flex items-center justify-between border-t pt-3">
          <div className="flex flex-col">
            <span className="text-foreground text-base font-black">
              {Number(product.offPrice || product.price).toLocaleString(
                "fa-IR",
              )}
              <span className="text-muted text-[10px] font-bold"> تومان</span>
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
              isPopular
                ? "bg-danger/10 text-danger hover:bg-danger hover:text-danger-foreground"
                : "bg-surface-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  );
}
