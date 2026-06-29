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
    <footer className="border-border from-surface/50 to-surface text-foreground relative mt-20 border-t bg-gradient-to-b pt-16 pb-8 backdrop-blur-md">
      {/* ۱. بخش مزایای رقابتی فروشگاه (Features) */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
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

      {/* ۲. بخش لینک‌ها و اطلاعات اصلی */}
      <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* ستون اول: درباره فروشگاه */}
        <div className="space-y-4">
          <h3 className="text-foreground from-foreground to-accent bg-gradient-to-r bg-clip-text text-lg font-black">
            نکست استور
          </h3>
          <p className="text-muted text-xs leading-relaxed font-bold">
            پلتفرم هوشمند بررسی و خرید آنلاین گجت‌ها و تجهیزات دیجیتال. ما متعهد
            به ارائه بهترین کیفیت و پایداری قیمت در بازار زنجیره تامین هستیم.
          </p>

          {/* شبکه‌های اجتماعی هماهنگ با تم */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="اینستاگرام نکست استور"
              className="bg-surface-secondary text-muted hover:bg-accent flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
              aria-label="کانال تلگرام نکست استور"
              className="bg-surface-secondary text-muted hover:bg-accent flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.214 4.87707C9.54177 5.88816 5.71936 7.24598 4.05338 8.20762C3.65544 8.43734 3.56757 8.5906 3.55188 8.62434C3.55928 8.65024 3.58827 8.71244 3.68936 8.81967C3.87466 9.0162 4.20112 9.2467 4.67149 9.49435C5.1318 9.73671 5.68563 9.97276 6.28641 10.1961C7.4877 10.6427 8.82586 11.0199 9.87219 11.2868C10.3935 11.4198 10.8385 11.5244 11.1526 11.5956C11.3095 11.6313 11.4336 11.6585 11.518 11.6767L11.614 11.6972L11.6379 11.7023L11.6449 11.7037C11.9378 11.7644 12.167 11.9933 12.2276 12.2862L12.2291 12.2934L12.2341 12.3174L12.2546 12.4133C12.2729 12.4977 12.3001 12.6218 12.3357 12.7788C12.407 13.0929 12.5116 13.5379 12.6445 14.0592C12.9114 15.1055 13.2887 16.4437 13.7352 17.645C13.9586 18.2457 14.1946 18.7996 14.437 19.2599C14.6847 19.7302 14.9152 20.0567 15.1117 20.242C15.2189 20.3431 15.2811 20.3721 15.307 20.3795C15.3408 20.3638 15.494 20.2759 15.7237 19.878C16.6854 18.212 18.0432 14.3896 19.0543 10.7173C19.5564 8.89368 19.9637 7.14058 20.1896 5.74933C20.3028 5.05203 20.3675 4.46366 20.3793 4.01131C20.3841 3.83098 20.3801 3.68164 20.3697 3.56168C20.2497 3.55128 20.1004 3.5473 19.92 3.55202C19.4677 3.56386 18.8793 3.62852 18.182 3.74176C16.7908 3.96768 15.0377 4.37496 13.214 4.87707ZM15.3213 20.3813C15.3214 20.3819 15.3181 20.3822 15.3112 20.3806C15.3177 20.38 15.3212 20.3808 15.3213 20.3813ZM10.8633 13.0681C10.8493 13.065 10.8352 13.0618 10.8207 13.0585C10.4961 12.9849 10.0379 12.8771 9.50145 12.7403C8.43222 12.4675 7.03634 12.0752 5.76371 11.6021C5.12753 11.3656 4.50943 11.1042 3.97267 10.8216C3.44596 10.5443 2.95021 10.2223 2.59796 9.84867C2.24692 9.47634 1.93519 8.93318 2.08966 8.28396C2.23298 7.6816 2.72525 7.24232 3.30348 6.90853C5.14965 5.84287 9.13531 4.44425 12.8158 3.43089C14.6685 2.92078 16.478 2.49882 17.9416 2.26115C18.6717 2.14259 19.3338 2.06685 19.8808 2.05254C20.1543 2.04538 20.4138 2.05311 20.6467 2.08305C20.8706 2.11184 21.1184 2.16686 21.3381 2.28385C21.4697 2.35394 21.5774 2.46166 21.6475 2.59326C21.7645 2.81293 21.8195 3.06072 21.8483 3.28464C21.8783 3.51758 21.886 3.77704 21.8788 4.05055C21.8645 4.59753 21.7888 5.25965 21.6702 5.98977C21.4325 7.45335 21.0106 9.26282 20.5005 11.1155C19.4871 14.796 18.0885 18.7817 17.0228 20.6279C16.6891 21.2061 16.2498 21.6984 15.6474 21.8417C14.9982 21.9962 14.455 21.6844 14.0827 21.3334C13.7091 20.9812 13.387 20.4854 13.1097 19.9587C12.8271 19.4219 12.5658 18.8038 12.3293 18.1676C11.8561 16.895 11.4638 15.4991 11.1911 14.4299C11.0542 13.8934 10.9465 13.4352 10.8729 13.1106C10.8696 13.0962 10.8664 13.082 10.8633 13.0681ZM3.55002 8.61006C3.55057 8.61016 3.55137 8.61361 3.55079 8.62014C3.54918 8.61323 3.54947 8.60997 3.55002 8.61006Z"
                  fill="currentColor"
                />
                <path
                  d="M21.5159 2.41547C21.8088 2.70836 21.8088 3.18324 21.5159 3.47613L12.0235 12.9685C11.7306 13.2614 11.2557 13.2614 10.9628 12.9685C10.6699 12.6756 10.6699 12.2008 10.9628 11.9079L20.4552 2.41547C20.7481 2.12258 21.223 2.12258 21.5159 2.41547Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ستون دوم: دسترسی سریع */}
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

        {/* ستون سوم: اطلاعات تماس */}
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

        {/* ستون چهارم: مجوزها و اینماد با استایل داینامیک */}
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

      {/* ۳. بخش کپی‌رایت نهایی زیرین */}
      <div className="border-border/60 mx-auto mt-16 max-w-[1400px] border-t px-4 pt-6 md:px-8">
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
