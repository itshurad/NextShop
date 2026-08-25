"use client";

import React from "react";
import Link from "next/link";
import {
  Headphones,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-border from-surface/50 to-surface text-foreground relative border-t bg-linear-to-b pt-16 pb-8 backdrop-blur-md">
      <div className="mx-auto max-w-350 px-4 md:px-8">
        <div className="border-border bg-surface grid grid-cols-2 gap-6 rounded-[32px] border p-6 shadow-sm sm:grid-cols-4 md:p-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="bg-accent/15 text-accent flex h-12 w-12 items-center justify-center rounded-2xl">
              <Truck className="h-6 w-6" />
            </div>
            <h4 className="text-foreground text-sm font-black">
              تحویل سریع و اکسپرس
            </h4>
            <p className="text-muted text-[10px] font-bold">
              ارسال به سراسر کشور در کمترین زمان
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="bg-accent/15 text-accent flex h-12 w-12 items-center justify-center rounded-2xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-foreground text-sm font-black">
              تضمین اصالت کالا
            </h4>
            <p className="text-muted text-[10px] font-bold">
              ۱۰۰٪ کالای اورجینال با گارانتی معتبر
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="bg-accent/15 text-accent flex h-12 w-12 items-center justify-center rounded-2xl">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h4 className="text-foreground text-sm font-black">
              ۷ روز ضمانت بازگشت
            </h4>
            <p className="text-muted text-[10px] font-bold">
              امکان مرجوعی کالا در صورت مغایرت
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="bg-accent/15 text-accent flex h-12 w-12 items-center justify-center rounded-2xl">
              <Headphones className="h-6 w-6" />
            </div>
            <h4 className="text-foreground text-sm font-black">
              پشتیبانی ۲۴ ساعته
            </h4>
            <p className="text-muted text-[10px] font-bold">
              پاسخگویی در تمام روزهای هفته
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-350 grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="from-foreground to-accent bg-linear-to-r bg-clip-text text-lg font-black text-transparent">
            نکست استور
          </h3>
          <p className="text-muted text-xs leading-relaxed font-bold">
            پلتفرم هوشمند بررسی و خرید آنلاین گجت‌ها و تجهیزات دیجیتال. ما متعهد
            به ارائه بهترین کیفیت و پایداری قیمت در بازار زنجیره تامین هستیم.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="اینستاگرام"
              className="bg-surface-secondary text-muted hover:bg-accent flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                />
                <rect
                  x="9"
                  y="9"
                  width="6"
                  height="6"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="7" r="1" fill="currentColor" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="تلگرام"
              className="bg-surface-secondary text-muted hover:bg-accent flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.214 4.87707C9.54177 5.88816 5.71936 7.24598 4.05338 8.20762C3.65544 8.43734 3.56757 8.5906 3.55188 8.62434C3.55928 8.65024 3.58827 8.71244 3.68936 8.81967C3.87466 9.0162 4.20112 9.2467 4.67149 9.49435C5.1318 9.73671 5.68563 9.97276 6.28641 10.1961C7.4877 10.6427 8.82586 11.0199 9.87219 11.2868C10.3935 11.4198 10.8385 11.5244 11.1526 11.5956C11.3095 11.6313 11.4336 11.6585 11.518 11.6767L11.614 11.6972L11.6379 11.7023L11.6449 11.7037C11.9378 11.7644 12.167 11.9933 12.2276 12.2862L12.2291 12.2934L12.2341 12.3174L12.2546 12.4133C12.2729 12.4977 12.3001 12.6218 12.3357 12.7788C12.407 13.0929 12.5116 13.5379 12.6445 14.0592C12.9114 15.1055 13.2887 16.4437 13.7352 17.645C13.9586 18.2457 14.1946 18.7996 14.437 19.2599C14.6847 19.7302 14.9152 20.0567 15.1117 20.242C15.2189 20.3431 15.2811 20.3721 15.307 20.3795C15.3408 20.3638 15.494 20.2759 15.7237 19.878C16.6854 18.212 18.0432 14.3896 19.0543 10.7173C19.5564 8.89368 19.9637 7.14058 20.1896 5.74933C20.3028 5.05203 20.3675 4.46366 20.3793 4.01131C20.3841 3.83098 20.3801 3.68164 20.3697 3.56168C20.2497 3.55128 20.1004 3.5473 19.92 3.55202C19.4677 3.56386 18.8793 3.62852 18.182 3.74176C16.7908 3.96768 15.0377 4.37496 13.214 4.87707Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-sm font-black">راهنمای خرید</h4>
          <ul className="text-muted space-y-2.5 text-xs font-bold">
            <li>
              <Link href="/faq" className="hover:text-accent transition-colors">
                سوالات متداول
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-accent transition-colors"
              >
                قوانین و مقررات سایت
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-accent transition-colors"
              >
                حریم خصوصی کاربران
              </Link>
            </li>
            <li>
              <Link
                href="/complaints"
                className="hover:text-accent transition-colors"
              >
                ثبت و پیگیری شکایات
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-sm font-black">
            اطلاعات ارتباطی
          </h4>
          <ul className="text-muted space-y-3 text-xs font-bold">
            <li className="flex items-start gap-2.5">
              <MapPin className="text-muted mt-0.5 h-4 w-4 shrink-0" />
              <span className="leading-5">
                تهران، خیابان ولیعصر، مجتمع تکنولوژی، طبقه چهارم، واحد ۴۰۲
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="text-muted h-4 w-4 shrink-0" />
              <span className="tracking-wider">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="text-muted h-4 w-4 shrink-0" />
              <span>support@nextstore.com</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground text-sm font-black">مجوزهای قانونی</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="border-border bg-surface hover:border-accent/40 flex aspect-square flex-col items-center justify-center rounded-2xl border p-3 text-center transition-colors">
              <div className="bg-surface-secondary text-muted mb-2 flex h-10 w-10 items-center justify-center rounded-xl text-[10px] font-black">
                eNamad
              </div>
              <span className="text-muted text-[9px] font-bold">
                اینماد الکترونیکی
              </span>
            </div>

            <div className="border-border bg-surface hover:border-accent/40 flex aspect-square flex-col items-center justify-center rounded-2xl border p-3 text-center transition-colors">
              <div className="bg-surface-secondary text-muted mb-2 flex h-10 w-10 items-center justify-center rounded-xl text-[10px] font-black">
                Samandehi
              </div>
              <span className="text-muted text-[9px] font-bold">
                ستاد ساماندهی
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-border/60 mx-auto mt-16 max-w-350 border-t px-4 pt-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
          <p className="text-muted text-[11px] font-bold">
            تمامی حقوق مادی و معنوی این پلتفرم متعلق به مجموعه{" "}
            <span className="text-foreground font-black">نکست استور</span>{" "}
            می‌باشد.
          </p>
          <p className="ltr text-muted text-[10px] font-bold tracking-wide">
            &copy; 2026 NextStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
