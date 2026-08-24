"use client";

import React from "react";
import { Ticket, MapPin } from "lucide-react";
import { useGetUser, useGetUsers } from "@/hooks/useAuth";
import { useGetPayments } from "@/hooks/usePayments";
import { toast } from "@heroui/react";
import AccountProgress from "./components/AccountProgress";

export default function DashboardPage() {
  const { data: userData, isLoading: gettingUser } = useGetUser();
  const { user } = userData || {};

  // بهینه‌سازی فوق‌العاده تمیز برای شمارش فیلدهای پر شده (Clean Code)
  const completedSteps = [
    user?.name,
    user?.email,
    user?.phoneNumber,
    user?.biography,
  ].filter(Boolean).length;

  // این متغیرها در کدهای شما استفاده نشده بودند، اگر نیازشان نداری کامنت کن تا پرفورمنس بالاتر برود
  // const { data: paymentsData, isLoading: gettingPayments } = useGetPayments();
  // const { data: usersData, isLoading: gettingUsers } = useGetUsers();
  // const recentPayments = paymentsData?.payments ? [...paymentsData.payments].slice(-4).reverse() : [];

  return (
    <main
      className={`text-foreground space-y-8 py-8 transition-all duration-500 lg:px-8 ${
        gettingUser ? "opacity-50 blur-sm" : "blur-0 opacity-100"
      }`}
    >
      {/* 1. هدر اصلی با افکت‌های نوری (بدون تغییر، طراحی بسیار زیباست) */}
      <div className="border-accent/20 bg-surface from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-linear-to-br to-transparent p-8 shadow-sm">
        <div className="bg-accent/15 absolute -top-16 -right-16 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute -bottom-16 -left-16 h-52 w-52 rounded-full blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="bg-accent/15 text-accent mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold">
              پنل کاربری من
            </span>
            <h1 className="text-foreground text-4xl font-black">
              سلام، {user?.name || "کاربر عزیز"}
            </h1>
            <p className="text-muted mt-3 max-w-xl text-sm font-bold">
              به داشبورد خود خوش آمدید. از اینجا می‌توانید سفارشات،
              علاقه‌مندی‌ها، تیکت‌ها و اطلاعات حساب خود را به راحتی مدیریت کنید.
            </p>
          </div>
        </div>
      </div>

      {/* 2. کارت‌های آماری */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="border-danger/10 bg-surface from-danger/15 rounded-[28px] border bg-linear-to-br to-transparent p-6 transition-transform hover:scale-[1.02]">
          <div className="bg-danger/15 text-danger mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              {/* آیکون قلب */}
              <path d="M17.6314 10.6994H17.6564C18.0584 10.6994 18.3914 10.3804 18.4054 9.97438C18.4644 8.22938 17.4234 6.94638 15.8154 6.78138C15.4114 6.74738 15.0354 7.03838 14.9924 7.45038C14.9504 7.86238 15.2504 8.23038 15.6624 8.27338C16.4734 8.35638 16.9384 8.97338 16.9064 9.92438C16.8924 10.3384 17.2174 10.6854 17.6314 10.6994Z" />
              <path d="M2.15932 12.6389C3.95332 18.2229 9.94632 21.2359 12.0023 21.2359C14.0733 21.2359 20.0863 18.2219 21.8423 12.6379C22.9923 9.04591 21.7173 4.35791 17.6513 3.04791C15.9193 2.49291 13.5463 2.69691 11.9803 4.28991C10.5293 2.89591 8.37332 2.39291 6.34232 3.04891C2.28032 4.35591 1.00732 9.04491 2.15832 12.6379L2.15932 12.6389ZM12.0023 19.7359C10.8173 19.7359 5.23432 17.3059 3.58732 12.1809C2.65632 9.27291 3.62032 5.50091 6.80232 4.47591C8.19332 4.02691 10.2253 4.27891 11.3943 5.89291C11.5393 6.09191 11.7713 6.19191 12.0183 6.20191C12.2643 6.19691 12.4923 6.07091 12.6283 5.86591C13.6943 4.24791 15.7423 4.01191 17.1923 4.47591C20.3773 5.50191 21.3433 9.27391 20.4123 12.1839C18.8013 17.3069 13.1963 19.7359 12.0023 19.7359Z" />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {user?.likedProducts?.length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            محصولات پسندیده
          </div>
        </div>

        <div className="border-warning/10 bg-surface from-warning/15 rounded-[28px] border bg-linear-to-br to-transparent p-6 transition-transform hover:scale-[1.02]">
          <div className="bg-warning/15 text-warning mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              {/* آیکون سبد/محصول */}
              <path d="M5.22977 14.013L5.95838 13.8352L5.22977 14.013ZM5.22977 8.71362L4.50116 8.53578L5.22977 8.71362ZM20.1816 8.71363L20.9102 8.53578V8.53578L20.1816 8.71363ZM20.1816 14.013L20.9102 14.1909L20.1816 14.013ZM15.2447 18.5967L15.0798 17.8651V17.8651L15.2447 18.5967ZM10.1666 18.5967L10.0017 19.3284H10.0017L10.1666 18.5967ZM10.1666 4.12989L10.3316 4.86154V4.86154L10.1666 4.12989ZM15.2447 4.12989L15.4096 3.39825V3.39825L15.2447 4.12989ZM9.71943 18.4959L9.88435 17.7643L9.88435 17.7643L9.71943 18.4959ZM15.6919 18.4959L15.8568 19.2276H15.8568L15.6919 18.4959ZM15.6919 4.2307L15.527 4.96234V4.96234L15.6919 4.2307ZM9.71943 4.2307L9.5545 3.49906V3.49906L9.71943 4.2307ZM6.07315 5.61107L5.33541 5.74609V5.74609L6.07315 5.61107ZM5.46979 6.48034C5.54435 6.88779 5.9351 7.15764 6.34255 7.08307C6.75 7.00851 7.01985 6.61776 6.94528 6.21031L5.46979 6.48034ZM3.63181 2.26167C3.22404 2.18888 2.83447 2.46042 2.76167 2.86819C2.68888 3.27596 2.96042 3.66553 3.36819 3.73833L3.63181 2.26167ZM9.17092 18.8331C9.2458 18.9941 9.27487 19.1753 9.25344 19.3546L10.7428 19.5327C10.7972 19.0778 10.7241 18.6158 10.531 18.2006L9.17092 18.8331ZM9.25344 19.3546C9.23201 19.5338 9.16138 19.7007 9.0526 19.836L10.2215 20.776C10.5085 20.4192 10.6884 19.9875 10.7428 19.5327L9.25344 19.3546ZM9.0526 19.836C8.94398 19.9711 8.80246 20.0685 8.64656 20.1199L9.11662 21.5443C9.55163 21.4008 9.93443 21.133 10.2215 20.776L9.0526 19.836ZM8.64656 20.1199C8.49086 20.1713 8.32484 20.1756 8.16715 20.1326L7.77249 21.5798C8.21464 21.7003 8.68141 21.688 9.11662 21.5443L8.64656 20.1199ZM8.16715 20.1326C8.00929 20.0896 7.86365 20 7.74891 19.8714L6.62941 20.8698C6.93436 21.2117 7.33051 21.4592 7.77249 21.5798L8.16715 20.1326ZM7.74891 19.8714C7.63399 19.7425 7.55531 19.58 7.52502 19.4024L6.04634 19.6544C6.12331 20.106 6.32465 20.528 6.62941 20.8698L7.74891 19.8714ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.58163 18.8768C7.64853 18.7117 7.75861 18.5731 7.89583 18.4752L7.02418 17.2544C6.6515 17.5205 6.36359 17.8887 6.19149 18.3133L7.58163 18.8768ZM17.428 18.6178C17.5565 18.7305 17.6535 18.8813 17.7043 19.0537L19.1431 18.6298C19.0133 18.1891 18.7623 17.7929 18.417 17.4901L17.428 18.6178ZM17.7043 19.0537C17.7551 19.2263 17.7568 19.4108 17.709 19.5844L19.1552 19.9826C19.2771 19.5397 19.273 19.0705 19.1431 18.6298L17.7043 19.0537ZM17.709 19.5844C17.6612 19.758 17.5668 19.9107 17.4402 20.0259L18.4497 21.1354C18.7894 20.8262 19.0332 20.4256 19.1552 19.9826L17.709 19.5844ZM17.4402 20.0259C17.3137 20.141 17.1604 20.2141 16.9991 20.2397L17.2344 21.7212C17.6883 21.6491 18.1098 21.4447 18.4497 21.1354L17.4402 20.0259ZM16.9991 20.2397C16.838 20.2653 16.6726 20.2429 16.5218 20.174L15.8984 21.5383C16.3164 21.7294 16.7804 21.7933 17.2344 21.7212L16.9991 20.2397ZM16.5218 20.174C16.3708 20.105 16.2389 19.9912 16.1442 19.8432L14.8805 20.6513C15.1281 21.0384 15.4805 21.3474 15.8984 21.5383L16.5218 20.174ZM16.1442 19.8432C16.0493 19.6949 15.9967 19.5196 15.9947 19.3383L14.4947 19.3551C14.4999 19.8145 14.633 20.2644 14.8805 20.6513L16.1442 19.8432ZM15.9947 19.3383C15.9926 19.1569 16.0413 18.9803 16.1329 18.8295L14.8511 18.0504C14.6126 18.4429 14.4896 18.8957 14.4947 19.3551L15.9947 19.3383ZM9.88435 4.96234L10.3316 4.86154L10.0017 3.39825L9.5545 3.49906L9.88435 4.96234ZM15.0798 4.86154L15.527 4.96234L15.8568 3.49906L15.4096 3.39825L15.0798 4.86154ZM15.527 17.7643L15.0798 17.8651L15.4096 19.3284L15.8568 19.2276L15.527 17.7643ZM10.3316 17.8651L9.88435 17.7643L9.5545 19.2276L10.0017 19.3284L10.3316 17.8651ZM5.95838 13.8352C5.56232 12.2126 5.56232 10.514 5.95838 8.89147L4.50116 8.53578C4.04806 10.392 4.04806 12.3346 4.50116 14.1909L5.95838 13.8352ZM19.453 8.89148C19.849 10.514 19.849 12.2126 19.453 13.8352L20.9102 14.1909C21.3633 12.3346 21.3633 10.392 20.9102 8.53578L19.453 8.89148ZM15.0798 17.8651C13.5155 18.2177 11.8959 18.2177 10.3316 17.8651L10.0017 19.3284C11.7832 19.73 13.6282 19.73 15.4096 19.3284L15.0798 17.8651ZM10.3316 4.86154C11.8959 4.50892 13.5155 4.50892 15.0798 4.86154L15.4096 3.39825C13.6282 2.99668 11.7832 2.99668 10.0017 3.39825L10.3316 4.86154ZM9.88435 17.7643C7.96997 17.3328 6.44241 15.8182 5.95838 13.8352L4.50116 14.1909C5.1157 16.7085 7.06608 18.6666 9.5545 19.2276L9.88435 17.7643ZM15.8568 19.2276C18.3453 18.6666 20.2956 16.7085 20.9102 14.1909L19.453 13.8352C18.9689 15.8182 17.4414 17.3328 15.527 17.7643L15.8568 19.2276ZM15.527 4.96234C17.4414 5.39388 18.9689 6.90847 19.453 8.89148L20.9102 8.53578C20.2956 6.01813 18.3453 4.05999 15.8568 3.49906L15.527 4.96234ZM9.5545 3.49906C7.06607 4.05999 5.1157 6.01813 4.50116 8.53578L5.95838 8.89147C6.44241 6.90847 7.96997 5.39388 9.88435 4.96234L9.5545 3.49906ZM5.66602 15.4586H19.7453V13.9586H5.66602V15.4586ZM5.33541 5.74609L5.46979 6.48034L6.94528 6.21031L6.8109 5.47605L5.33541 5.74609ZM3.36819 3.73833C4.35153 3.91388 5.14482 4.70471 5.33541 5.74609L6.8109 5.47605C6.51183 3.8419 5.25386 2.55125 3.63181 2.26167L3.36819 3.73833Z" />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M14 7L14.0408 7.00583C15.7484 7.24978 17 8.51614 17 10"
              />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {user?.Products?.length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            محصولات ثبت‌شده
          </div>
        </div>
      </section>

      {/* 3. بخش‌های عملیاتی (ردیف اول) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* وضعیت تکمیل پروفایل */}
        <AccountProgress completedSteps={completedSteps} />

        {/* تیکت‌های پشتیبانی */}
        <div className="border-border bg-surface rounded-[32px] border p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
              <Ticket className="text-accent h-5 w-5" /> تیکت‌های اخیر
            </h2>
            <button
              onClick={() =>
                toast.info("این بخش به زودی در دسترس قرار می‌گیرد")
              }
              className="bg-accent/10 text-accent hover:bg-accent/20 rounded-xl px-3 py-1.5 text-xs font-black transition-colors"
            >
              ثبت تیکت جدید
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-surface-secondary flex items-center justify-between rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-success h-2 w-2 rounded-full"></div>
                <div>
                  <p className="text-foreground text-sm font-black">
                    پیگیری تاخیر در ارسال
                  </p>
                  <p className="text-muted text-[10px] font-bold">
                    بخش: پشتیبانی فروش
                  </p>
                </div>
              </div>
              <span className="text-muted text-xs font-black">
                پاسخ داده شد
              </span>
            </div>
          </div>
        </div>

        {/* آدرس‌های منتخب */}
        <div className="border-border bg-surface rounded-[32px] border p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
              <MapPin className="text-danger h-5 w-5" /> آدرس پیش‌فرض
            </h2>
            <button
              onClick={() =>
                toast.info("این بخش به زودی در دسترس قرار می‌گیرد")
              }
              className="text-muted hover:text-foreground text-xs font-black transition-opacity"
            >
              ویرایش
            </button>
          </div>
          <div className="border-border hover:border-foreground/20 flex items-start gap-4 rounded-2xl border p-5 transition-colors">
            <div className="bg-surface-secondary rounded-xl p-3">
              <MapPin className="text-muted h-5 w-5" />
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-black">خانه</p>
              <p className="text-muted text-xs leading-relaxed font-bold">
                تهران، سعادت آباد، خیابان سرو غربی، پلاک ۱۲، واحد ۴
              </p>
              <p className="text-muted mt-2 text-[10px] font-black">
                گیرنده: {user?.name || "هوراد"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
