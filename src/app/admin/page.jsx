"use client";

import React from "react";
import { Package, ChevronLeft, Ticket, MapPin } from "lucide-react";
import { useGetUser, useGetUsers } from "@/hooks/useAuth";
import { useGetPayments } from "@/hooks/usePayments";
import { Chip, toast } from "@heroui/react";
import Link from "next/link";
import AccountProgress from "@/components/AccountProgress";

export default function DashboardPage() {
  const { data: userDate, isLoading: gettingUser } = useGetUser();
  const { user } = userDate || {};
  let userInfoCount = 0;
  const userInfo = {
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    biography: user?.biography,
  };
  Object.keys(userInfo).map((key) => {
    if (userInfo[key] !== "") {
      userInfoCount++;
    }
  });

  const { data: paymentsData, isLoading: gettingPayments } = useGetPayments();
  const { payments } = paymentsData || {};
  const { data: usersData, isLoading: gettingUsers } = useGetUsers();
  const { users } = usersData || {};
  const recentPayments = payments ? [...payments].slice(-4).reverse() : [];

  return (
    <main
      className={`text-foreground space-y-8 py-8 lg:px-8 ${
        (gettingUser || gettingPayments || gettingUsers) && "blur"
      }`}
    >
      {/* 1. هدر اصلی با تم داینامیک */}
      <div className="border-accent/20 bg-surface from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-gradient-to-br to-transparent p-8 shadow-sm">
        {/* افکت‌های نوری پس‌زمینه */}
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

      {/* 2. کارت‌های آماری (استیت‌ها) */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* سفارش‌های فعال */}
        <div className="border-accent/10 bg-surface from-accent/15 rounded-[28px] border bg-gradient-to-br to-transparent p-6">
          <div className="bg-accent/15 text-accent mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6 stroke-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.35288 14.8117L4.08229 14.6372L3.35288 14.8117ZM3.35288 8.83297L4.08229 9.00752L3.35288 8.83297ZM20.6471 8.83298L19.9177 9.00752L20.6471 8.83298ZM20.6471 14.8117L19.9177 14.6372L20.6471 14.8117ZM15.0496 20.2988L14.8815 19.5679L15.0496 20.2988ZM8.95044 20.2988L8.78237 21.0297L8.95044 20.2988ZM8.95043 3.34591L9.1185 4.07684V4.07684L8.95043 3.34591ZM15.0496 3.34591L14.8815 4.07684L15.0496 3.34591ZM4.08229 14.6372C3.63924 12.7857 3.63924 10.859 4.08229 9.00752L2.62347 8.65843C2.12551 10.7394 2.12551 12.9053 2.62347 14.9863L4.08229 14.6372ZM19.9177 9.00752C20.3608 10.859 20.3608 12.7857 19.9177 14.6372L21.3765 14.9863C21.8745 12.9053 21.8745 10.7394 21.3765 8.65844L19.9177 9.00752ZM14.8815 19.5679C12.9863 20.0036 11.0137 20.0036 9.1185 19.5679L8.78237 21.0297C10.8988 21.5164 13.1012 21.5164 15.2176 21.0297L14.8815 19.5679ZM9.1185 4.07684C11.0137 3.64105 12.9863 3.64105 14.8815 4.07684L15.2176 2.61498C13.1012 2.12834 10.8988 2.12834 8.78237 2.61499L9.1185 4.07684ZM9.1185 19.5679C6.61229 18.9916 4.66599 17.0765 4.08229 14.6372L2.62347 14.9863C3.34276 17.9922 5.73374 20.3287 8.78237 21.0297L9.1185 19.5679ZM15.2176 21.0297C18.2663 20.3287 20.6572 17.9922 21.3765 14.9863L19.9177 14.6372C19.334 17.0765 17.3877 18.9916 14.8815 19.5679L15.2176 21.0297ZM14.8815 4.07684C17.3877 4.65311 19.334 6.56823 19.9177 9.00752L21.3765 8.65844C20.6572 5.65253 18.2663 3.31598 15.2176 2.61498L14.8815 4.07684ZM8.78237 2.61499C5.73373 3.31598 3.34276 5.65252 2.62347 8.65843L4.08229 9.00752C4.66599 6.56823 6.61228 4.65311 9.1185 4.07684L8.78237 2.61499ZM14.8305 21C14.8305 19.5363 14.8322 18.5154 14.9378 17.7451C15.0403 16.998 15.2278 16.5993 15.5196 16.3132L14.4696 15.242C13.8474 15.852 13.5778 16.6223 13.4518 17.5413C13.3289 18.4372 13.3305 19.5795 13.3305 21H14.8305ZM20.3222 14.1316C18.8718 14.1316 17.7101 14.13 16.7998 14.25C15.8695 14.3726 15.0897 14.6341 14.4696 15.242L15.5196 16.3132C15.8135 16.0251 16.2264 15.8385 16.9958 15.7371C17.7852 15.6331 18.8302 15.6316 20.3222 15.6316V14.1316Z"
                fill="currentColor"
              />
              <path
                d="M9 9H12M9 12H14"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {payments?.length}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            سفارش‌های فعال
          </div>
        </div>

        {/* محصولات پسندیده */}
        <div className="border-danger/10 bg-surface from-danger/15 rounded-[28px] border bg-gradient-to-br to-transparent p-6">
          <div className="bg-danger/15 text-danger mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6314 10.6994H17.6564C18.0584 10.6994 18.3914 10.3804 18.4054 9.97438C18.4644 8.22938 17.4234 6.94638 15.8154 6.78138C15.4114 6.74738 15.0354 7.03838 14.9924 7.45038C14.9504 7.86238 15.2504 8.23038 15.6624 8.27338C16.4734 8.35638 16.9384 8.97338 16.9064 9.92438C16.8924 10.3384 17.2174 10.6854 17.6314 10.6994Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.15932 12.6389C3.95332 18.2229 9.94632 21.2359 12.0023 21.2359C14.0733 21.2359 20.0863 18.2219 21.8423 12.6379C22.9923 9.04591 21.7173 4.35791 17.6513 3.04791C15.9193 2.49291 13.5463 2.69691 11.9803 4.28991C10.5293 2.89591 8.37332 2.39291 6.34232 3.04891C2.28032 4.35591 1.00732 9.04491 2.15832 12.6379L2.15932 12.6389ZM12.0023 19.7359C10.8173 19.7359 5.23432 17.3059 3.58732 12.1809C2.65632 9.27291 3.62032 5.50091 6.80232 4.47591C8.19332 4.02691 10.2253 4.27891 11.3943 5.89291C11.5393 6.09191 11.7713 6.19191 12.0183 6.20191C12.2643 6.19691 12.4923 6.07091 12.6283 5.86591C13.6943 4.24791 15.7423 4.01191 17.1923 4.47591C20.3773 5.50191 21.3433 9.27391 20.4123 12.1839C18.8013 17.3069 13.1963 19.7359 12.0023 19.7359Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {user?.likedProducts?.length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            محصولات پسندیده
          </div>
        </div>

        {/* محصولات */}
        <div className="border-warning/10 bg-surface from-warning/15 rounded-[28px] border bg-gradient-to-br to-transparent p-6 xl:col-span-1">
          <div className="bg-warning/15 text-warning mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.22977 14.013L5.95838 13.8352L5.22977 14.013ZM5.22977 8.71362L4.50116 8.53578L5.22977 8.71362ZM20.1816 8.71363L20.9102 8.53578V8.53578L20.1816 8.71363ZM20.1816 14.013L20.9102 14.1909L20.1816 14.013ZM15.2447 18.5967L15.0798 17.8651V17.8651L15.2447 18.5967ZM10.1666 18.5967L10.0017 19.3284H10.0017L10.1666 18.5967ZM10.1666 4.12989L10.3316 4.86154V4.86154L10.1666 4.12989ZM15.2447 4.12989L15.4096 3.39825V3.39825L15.2447 4.12989ZM9.71943 18.4959L9.88435 17.7643L9.88435 17.7643L9.71943 18.4959ZM15.6919 18.4959L15.8568 19.2276H15.8568L15.6919 18.4959ZM15.6919 4.2307L15.527 4.96234V4.96234L15.6919 4.2307ZM9.71943 4.2307L9.5545 3.49906V3.49906L9.71943 4.2307ZM6.07315 5.61107L5.33541 5.74609V5.74609L6.07315 5.61107ZM5.46979 6.48034C5.54435 6.88779 5.9351 7.15764 6.34255 7.08307C6.75 7.00851 7.01985 6.61776 6.94528 6.21031L5.46979 6.48034ZM3.63181 2.26167C3.22404 2.18888 2.83447 2.46042 2.76167 2.86819C2.68888 3.27596 2.96042 3.66553 3.36819 3.73833L3.63181 2.26167ZM9.17092 18.8331C9.2458 18.9941 9.27487 19.1753 9.25344 19.3546L10.7428 19.5327C10.7972 19.0778 10.7241 18.6158 10.531 18.2006L9.17092 18.8331ZM9.25344 19.3546C9.23201 19.5338 9.16138 19.7007 9.0526 19.836L10.2215 20.776C10.5085 20.4192 10.6884 19.9875 10.7428 19.5327L9.25344 19.3546ZM9.0526 19.836C8.94398 19.9711 8.80246 20.0685 8.64656 20.1199L9.11662 21.5443C9.55163 21.4008 9.93443 21.133 10.2215 20.776L9.0526 19.836ZM8.64656 20.1199C8.49086 20.1713 8.32484 20.1756 8.16715 20.1326L7.77249 21.5798C8.21464 21.7003 8.68141 21.688 9.11662 21.5443L8.64656 20.1199ZM8.16715 20.1326C8.00929 20.0896 7.86365 20 7.74891 19.8714L6.62941 20.8698C6.93436 21.2117 7.33051 21.4592 7.77249 21.5798L8.16715 20.1326ZM7.74891 19.8714C7.63399 19.7425 7.55531 19.58 7.52502 19.4024L6.04634 19.6544C6.12331 20.106 6.32465 20.528 6.62941 20.8698L7.74891 19.8714ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.58163 18.8768C7.64853 18.7117 7.75861 18.5731 7.89583 18.4752L7.02418 17.2544C6.6515 17.5205 6.36359 17.8887 6.19149 18.3133L7.58163 18.8768ZM17.428 18.6178C17.5565 18.7305 17.6535 18.8813 17.7043 19.0537L19.1431 18.6298C19.0133 18.1891 18.7623 17.7929 18.417 17.4901L17.428 18.6178ZM17.7043 19.0537C17.7551 19.2263 17.7568 19.4108 17.709 19.5844L19.1552 19.9826C19.2771 19.5397 19.273 19.0705 19.1431 18.6298L17.7043 19.0537ZM17.709 19.5844C17.6612 19.758 17.5668 19.9107 17.4402 20.0259L18.4497 21.1354C18.7894 20.8262 19.0332 20.4256 19.1552 19.9826L17.709 19.5844ZM17.4402 20.0259C17.3137 20.141 17.1604 20.2141 16.9991 20.2397L17.2344 21.7212C17.6883 21.6491 18.1098 21.4447 18.4497 21.1354L17.4402 20.0259ZM16.9991 20.2397C16.838 20.2653 16.6726 20.2429 16.5218 20.174L15.8984 21.5383C16.3164 21.7294 16.7804 21.7933 17.2344 21.7212L16.9991 20.2397ZM16.5218 20.174C16.3708 20.105 16.2389 19.9912 16.1442 19.8432L14.8805 20.6513C15.1281 21.0384 15.4805 21.3474 15.8984 21.5383L16.5218 20.174ZM16.1442 19.8432C16.0493 19.6949 15.9967 19.5196 15.9947 19.3383L14.4947 19.3551C14.4999 19.8145 14.633 20.2644 14.8805 20.6513L16.1442 19.8432ZM15.9947 19.3383C15.9926 19.1569 16.0413 18.9803 16.1329 18.8295L14.8511 18.0504C14.6126 18.4429 14.4896 18.8957 14.4947 19.3551L15.9947 19.3383ZM9.88435 4.2307L10.3316 4.12989L10.0017 2.66661L9.5545 2.76742L9.88435 4.2307ZM15.0798 4.12989L15.527 4.2307L15.8568 2.76742L15.4096 2.66661L15.0798 4.12989ZM15.527 18.4959L15.0798 18.5967L15.4096 20.06H15.8568L15.527 18.4959ZM10.3316 18.5967L9.88435 18.4959L9.5545 20.06L10.0017 20.06L10.3316 18.5967ZM5.95838 13.8352C5.56232 12.2126 5.56232 10.514 5.95838 8.89147L4.50116 8.53578C4.04806 10.392 4.04806 12.3346 4.50116 14.1909L5.95838 13.8352ZM19.453 8.89148C19.849 10.514 19.849 12.2126 19.453 13.8352L20.9102 14.1909C21.3633 12.3346 21.3633 10.392 20.9102 8.53578L19.453 8.89148ZM15.0798 18.5967C13.5155 18.9493 11.8959 18.9493 10.3316 18.5967L10.0017 20.06C11.7832 20.4616 13.6282 20.4616 15.4096 20.06L15.0798 18.5967ZM10.3316 4.12989C11.8959 3.77727 13.5155 3.77727 15.0798 4.12989L15.4096 2.66661C13.6282 2.26503 11.7832 2.26503 10.0017 2.66661L10.3316 4.12989ZM9.88435 18.4959C7.96997 18.0644 6.44241 16.5498 5.95838 14.5668L4.50116 14.9225C5.1157 17.4401 7.06608 19.3982 9.5545 19.9592L9.88435 18.4959ZM15.8568 20.06C18.3453 19.499 20.2956 17.5409 20.9102 15.0232L19.453 14.6675C18.9689 16.6505 17.4414 18.1651 15.527 18.5967L15.8568 20.06ZM15.527 4.2307C17.4414 4.66224 18.9689 6.17683 19.453 8.15984L20.9102 7.80415C20.2956 5.2865 18.3453 3.32835 15.8568 2.76742L15.527 4.2307ZM9.5545 2.76742C7.06607 3.32835 5.1157 5.2865 4.50116 7.80415L5.95838 8.15984C6.44241 6.17683 7.96997 4.66224 9.88435 4.2307L9.5545 2.76742ZM5.66602 14.7102H19.7453V13.2102H5.66602V14.7102ZM5.33541 5.74609L5.46979 6.48034L6.94528 6.21031L6.8109 5.47605L5.33541 5.74609ZM3.36819 3.73833C4.35153 3.91388 5.14482 4.70471 5.33541 5.74609L6.8109 5.47605C6.51183 3.8419 5.25386 2.55125 3.63181 2.26167L3.36819 3.73833Z"
                fill="currentColor"
              />
              <path
                d="M14 7L14.0408 7.00583C15.7484 7.24978 17 8.51614 17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {user?.Products?.length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">محصولات</div>
        </div>

        {/* کاربران */}
        <div className="border-success/10 bg-surface from-success/15 rounded-[28px] border bg-gradient-to-br to-transparent p-6 xl:col-span-1">
          <div className="bg-success/15 text-success mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9617 11.892H11.9927C14.8247 11.892 17.1287 9.58802 17.1287 6.75602C17.1287 3.92402 14.8247 1.61902 11.9927 1.61902C9.15975 1.61902 6.85575 3.92402 6.85575 6.75302C6.85075 8.12202 7.37975 9.41002 8.34375 10.381C9.30675 11.351 10.5917 11.888 11.9617 11.892ZM8.35575 6.75602C8.35575 4.75102 9.98775 3.11902 11.9927 3.11902C13.9977 3.11902 15.6287 4.75102 15.6287 6.75602C15.6287 8.76102 13.9977 10.392 11.9927 10.392H11.9647C10.9967 10.39 10.0897 10.01 9.40775 9.32302C8.72575 8.63702 8.35275 7.72602 8.35575 6.75602Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.40552 18.7559C4.40552 22.3809 10.1215 22.3809 11.9995 22.3809C13.8775 22.3809 19.5945 22.3809 19.5945 18.7339C19.5945 15.9409 16.1165 13.5809 11.9995 13.5809C7.88352 13.5809 4.40552 15.9509 4.40552 18.7559ZM5.90552 18.7559C5.90552 17.0209 8.51152 15.0809 11.9995 15.0809C15.4885 15.0809 18.0945 17.0099 18.0945 18.7339C18.0945 20.1579 16.0435 20.8809 11.9995 20.8809C7.95652 20.8809 5.90552 20.1659 5.90552 18.7559Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-foreground text-4xl font-black">
            {users?.length}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">کاربران</div>
        </div>
      </section>

      {/* 3. بخش‌های عملیاتی (ردیف اول) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* لیست سفارشات - محدود به ۴ سفارش اخیر */}
        <div className="border-border bg-surface relative overflow-hidden rounded-[32px] border p-8 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground text-xl font-black">
              سفارشات در حال پردازش
            </h2>
            <Link href="/admin/payments">
              <button className="text-accent flex items-center gap-1 text-xs font-black">
                همه سفارشات <ChevronLeft className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentPayments.length > 0 ? (
              recentPayments.map((item) => (
                <div
                  key={item._id}
                  className="border-border bg-surface-secondary flex items-center justify-between gap-4 rounded-2xl border p-4 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-surface text-accent flex h-12 w-12 items-center justify-center rounded-xl shadow-sm">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground text-sm font-black">
                        کد پیگیری: {item.invoiceNumber}
                      </p>
                      <p className="text-muted flex items-center gap-x-1 text-[10px] font-bold">
                        <span>ثبت شده در</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-sm font-black">
                      {item.amount.toLocaleString()}
                      <span className="text-muted text-[10px]"> تومان</span>
                    </p>
                    <Chip
                      className="font-bold"
                      variant="soft"
                      color={item.status === "COMPLETED" ? "success" : "danger"}
                    >
                      {item.status === "COMPLETED" ? "موفق" : "ناموفق"}
                    </Chip>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center text-sm">
                هیچ سفارشی ثبت نشده است.
              </p>
            )}
          </div>
        </div>

        {/* وضعیت تکمیل پروفایل */}
        <AccountProgress completedSteps={userInfoCount} />
      </section>

      {/* 4. بخش‌های عملیاتی (ردیف دوم) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* تیکت‌های پشتیبانی */}
        <div className="border-border bg-surface rounded-[32px] border p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-foreground flex items-center gap-2 text-xl font-black">
              <Ticket className="text-accent h-5 w-5" /> تیکت‌های اخیر
            </h2>
            <button
              onClick={() => toast.info("این بخش به زودی در دسترس قرار میگیرد")}
              className="bg-accent/10 text-accent rounded-xl px-3 py-1.5 text-xs font-black"
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
              onClick={() => toast.info("این بخش به زودی در دسترس قرار میگیرد")}
              className="text-muted text-xs font-black hover:opacity-80"
            >
              ویرایش
            </button>
          </div>
          <div className="border-border flex items-start gap-4 rounded-2xl border p-5">
            <div className="bg-surface-secondary rounded-xl p-3">
              <MapPin className="text-muted h-5 w-5" />
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-black">خانه</p>
              <p className="text-muted text-xs leading-relaxed font-bold">
                تهران، سعادت آباد، خیابان سرو غربی، پلاک ۱۲، واحد ۴
              </p>
              <p className="text-muted mt-2 text-[10px] font-black">
                گیرنده: {"هوراد"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
