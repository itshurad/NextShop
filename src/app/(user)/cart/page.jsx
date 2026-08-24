"use client";

import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import { useCreatPayment } from "@/hooks/usePayments";
import { Button, Spinner, toast, Input } from "@heroui/react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  Percent,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function CartPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUser();
  const { cart } = data || {};
  const products = cart?.productDetail || [];
  const payDetail = cart?.payDetail;

  const [couponCode, setCouponCode] = useState("");

  const { isPending: isAdding, mutateAsync: addToCartFn } = useAddToCart();
  const { isPending: isDecrementing, mutateAsync: decrementFromCartFn } =
    useDecrementFromCart();
  const { isPending: isPaying, mutateAsync: paymentsFn } = useCreatPayment();

  const handleDecrementProduct = async (productId) => {
    try {
      const { message } = await decrementFromCartFn(productId);
      toast.success(message || "محصول از سبد خرید کم شد");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  const handleAddProduct = async (productId) => {
    try {
      const { message } = await addToCartFn(productId);
      toast.success(message || "محصول به سبد خرید اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  const handlePayment = async () => {
    try {
      const { message } = await paymentsFn();
      toast.success(message || "در حال انتقال به درگاه پرداخت...");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی در پرداخت رخ داد");
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    toast.info("بخش اعمال کد تخفیف به زودی فعال می‌شود");
    setCouponCode("");
  };

  // حالت لودینگ اولیه
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-muted text-sm font-black">
          در حال بارگذاری سبد خرید...
        </p>
      </div>
    );
  }

  // حالت سبد خرید خالی
  if (!products.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="bg-surface-secondary flex h-32 w-32 items-center justify-center rounded-full shadow-inner">
          <ShoppingBag className="text-muted/50 h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-foreground text-2xl font-black">
            سبد خرید شما خالی است!
          </h2>
          <p className="text-muted text-sm font-bold">
            هنوز هیچ محصولی به سبد خرید خود اضافه نکرده‌اید.
          </p>
        </div>
        <Link href="/products">
          <Button
            size="lg"
            className="bg-accent shadow-accent/20 mt-4 rounded-2xl px-8 font-black text-white shadow-lg transition-transform active:scale-95"
          >
            مشاهده محصولات فروشگاه
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:py-12 lg:px-8">
      {/* هدر سبد خرید منطبق با تم داینامیک */}
      <div className="border-border bg-surface relative mb-8 overflow-hidden rounded-[32px] border p-8 shadow-sm md:mb-12">
        <div className="from-accent/10 absolute inset-0 bg-linear-to-l via-transparent to-transparent opacity-50" />
        <div className="bg-accent/10 absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="bg-accent text-accent-foreground shadow-accent/20 flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl shadow-xl">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-foreground text-3xl font-black tracking-tighter md:text-4xl">
                سبد خرید شما
              </h1>
              <p className="text-muted mt-2 text-sm font-bold">
                شما{" "}
                <span className="text-accent">
                  {products.length.toLocaleString("fa-IR")}
                </span>{" "}
                محصول در سبد دارید
              </p>
            </div>
          </div>

          {/* نمادهای اعتماد */}
          <div className="text-muted hidden shrink-0 flex-col gap-4 text-xs font-black tracking-widest uppercase lg:flex">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-success h-4 w-4" /> ضمانت بازگشت
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-accent h-4 w-4" /> ارسال اکسپرس
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-12">
        {/* لیست محصولات (ستون راست) */}
        <div className="flex flex-col gap-4 xl:col-span-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-foreground text-lg font-black">
              آیتم‌های سفارش
            </h2>
            <Link
              href="/products"
              className="group text-muted hover:text-accent flex items-center gap-1 text-xs font-black transition-colors"
            >
              ادامه خرید
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="divide-border/50 border-border bg-surface divide-y rounded-[28px] border px-4 shadow-sm md:px-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-6 md:py-6"
              >
                {/* تصویر محصول (داینامیک شده) */}
                <div className="bg-surface-secondary relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl p-2 transition-transform group-hover:scale-105">
                  <Image
                    src={item.imageLink}
                    alt={item.title}
                    fill
                    sizes="96px"
                    unoptimized
                    className="object-contain p-1 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>

                <div className="flex flex-1 flex-col space-y-2">
                  <h3 className="text-foreground line-clamp-2 text-base font-black md:text-lg">
                    {item.title}
                  </h3>

                  <div className="text-muted flex flex-wrap items-center gap-2 font-bold">
                    <span className="text-foreground text-sm">
                      {Number(item.offPrice || item.price).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </span>

                    {item.discount > 0 && (
                      <span className="bg-danger/10 text-danger rounded-lg px-2 py-0.5 text-[10px] font-black">
                        {Math.round(
                          (item.discount / item.price) * 100,
                        ).toLocaleString("fa-IR")}
                        ٪ تخفیف
                      </span>
                    )}
                  </div>
                </div>

                {/* کنترل‌کننده‌های تعداد */}
                <div className="border-border bg-surface-secondary flex shrink-0 items-center justify-center gap-3 rounded-2xl border p-1.5 shadow-inner sm:w-auto">
                  <button
                    onClick={() => handleDecrementProduct(item._id)}
                    disabled={isAdding || isDecrementing}
                    className="bg-surface text-muted hover:bg-border/60 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-50"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="text-danger h-4 w-4" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </button>

                  <span className="text-foreground w-6 text-center text-sm font-black">
                    {item.quantity.toLocaleString("fa-IR")}
                  </span>

                  <button
                    onClick={() => handleAddProduct(item._id)}
                    disabled={
                      isAdding ||
                      isDecrementing ||
                      item.quantity >= item.countInStock
                    }
                    className="bg-surface text-muted hover:bg-border/60 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* فاکتور و پرداخت (ستون چپ) */}
        <div className="xl:col-span-4">
          <div className="border-border bg-surface-secondary shadow-accent/5 sticky top-28 rounded-[32px] border p-6 shadow-2xl md:p-8">
            <h2 className="text-foreground mb-6 flex items-center gap-2 text-xl font-black">
              <ShoppingBag className="text-accent h-5 w-5" /> خلاصه فاکتور
            </h2>

            <div className="space-y-4 text-sm font-bold">
              <div className="text-muted flex justify-between">
                <span>قیمت کل محصولات</span>
                <span className="text-foreground">
                  {payDetail.totalGrossPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="text-danger flex justify-between">
                <span>سود شما از خرید</span>
                <span>
                  {payDetail.totalOffAmount.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="border-border flex justify-between border-t pt-4 text-lg font-black">
                <span className="text-foreground">قابل پرداخت</span>
                <span className="text-accent">
                  {payDetail.totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            {/* بخش کد تخفیف با کامپوننت HeroUI */}
            <form
              onSubmit={handleApplyCoupon}
              className="border-border bg-surface mt-6 flex items-center gap-2 rounded-[24px] border p-2 shadow-inner"
            >
              <div className="text-muted pr-3 pl-2">
                <Tag className="h-4 w-4" />
              </div>
              <Input
                type="text"
                placeholder="کد تخفیف دارید؟"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                classnames={{
                  inputWrapper:
                    "bg-transparent border-none shadow-none h-10 px-0",
                  input: "text-xs font-bold",
                }}
              />
              <Button
                type="submit"
                className="bg-accent min-w-0 shrink-0 rounded-xl px-4 py-2 text-xs font-black text-white"
              >
                اعمال
              </Button>
            </form>

            <Button
              size="lg"
              onClick={handlePayment}
              isLoading={isPaying}
              className="bg-accent shadow-accent/20 mt-8 h-14 w-full rounded-2xl text-sm font-black text-white shadow-xl transition-all hover:-translate-y-0.5"
            >
              تکمیل سفارش و پرداخت
            </Button>

            {/* نوار پیشنهادی با رنگ‌بندی داینامیک */}
            <div className="border-success/20 bg-success/10 mt-6 flex items-center gap-3 rounded-2xl border p-4">
              <Percent className="text-success h-8 w-8 shrink-0" />
              <p className="text-success/80 text-[10px] leading-relaxed font-bold">
                با خرید بیش از ۲۰ میلیون تومان، ارسال برای شما{" "}
                <span className="font-black">رایگان</span> خواهد بود!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
