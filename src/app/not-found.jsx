"use client";

import Link from "next/link";
import { ArrowRight, Home, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      {/* ۱. بک‌گراند نقطه‌ای پویا با انیمیشن پالس بسیار ملایم خود تلویند */}
      <div
        className="text-foreground pointer-events-none absolute inset-0 animate-pulse opacity-[0.04] duration-[4000ms]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ۲. عدد ۴۰۴ پس‌زمینه با افکت مقیاس ریسپانسیو برای موبایل */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-all duration-700 ease-out">
        <h1 className="text-accent/30 font-sans text-[15vw] font-black tracking-tighter opacity-80">
          404
        </h1>
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        {/* ۳. بخش آیکون تعاملی با افکت رادار و انیمیشن ترنزیشن تلویند در هاور */}
        <div className="mb-8">
          <div className="group relative cursor-pointer">
            {/* افکت رادار دور آیکون */}
            <div className="bg-primary/20 group-hover:bg-primary/30 absolute inset-0 animate-ping rounded-full opacity-60" />

            {/* باکس آیکون اصلی با افکت چرخش و زوم بومی تلویند هنگام هاور */}
            <div className="border-default-200 bg-content1 shadow-default-200/40 text-primary relative transform rounded-2xl border p-5 shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
              <SearchX className="h-10 w-10 sm:h-11 sm:w-11" />
            </div>
          </div>
        </div>

        {/* ۴. عنوان اصلی */}
        <h2 className="text-foreground z-20 mb-3 text-2xl font-black sm:text-3xl">
          صفحه مورد نظر پیدا نشد!
        </h2>

        {/* ۵. متن توضیحات */}
        <p className="text-default-500 mb-8 px-2 text-sm leading-relaxed sm:text-base">
          ممکن است آدرس صفحه تغییر کرده باشد یا این صفحه به طور کلی از روی سرور
          حذف شده باشد.
        </p>

        {/* ۶. دکمه‌های کاملاً ریسپانسیو (تمام‌عرض در موبایل، خطی در دسکتاپ) */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          {/* دکمه بازگشت */}
          <Button
            onClick={() => router.back()}
            variant="flat"
            color="default"
            size="lg"
            className="group text-foreground/80 h-12 w-full rounded-2xl text-sm font-black transition-all duration-300 active:scale-95 sm:w-auto sm:px-8"
            startContent={
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            }
          >
            بازگشت به عقب
          </Button>

          {/* دکمه خانه */}
          <Link href="/" className="block w-full sm:w-auto">
            <Button
              variant="solid"
              color="primary"
              size="lg"
              className="group shadow-primary/20 h-12 w-full rounded-2xl text-sm font-black shadow-xl transition-all duration-300 active:scale-95 sm:w-auto sm:px-8"
              startContent={
                <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              }
            >
              صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>

      {/* ۷. فوتر پایین صفحه */}
      <div className="text-default-400 absolute bottom-6 font-sans text-[10px] font-bold tracking-widest uppercase opacity-50">
        Error Code: 404
      </div>
    </div>
  );
}
