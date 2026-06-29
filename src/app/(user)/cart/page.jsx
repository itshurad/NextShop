"use client";

import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import { useCreatPayment } from "@/hooks/usePayments";
import { Spinner, toast } from "@heroui/react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  Percent,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useQueryClient } from "react-query";

function CartPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetUser();
  const { cart } = data || {};
  const products = cart?.productDetail || [];
  const payDetail = cart?.payDetail;

  const { isLoading: addingToCart, mutateAsync: addToCartFn } = useAddToCart();
  const { isLoading: decrementingFromCart, mutateAsync: decrementFromCartFn } =
    useDecrementFromCart();
  const { mutateAsync: paymentsFn, isLoading: paymenting } = useCreatPayment();
  console.log(products);

  if (isLoading)
    return (
      <div className="py-20 text-center font-black">
        در حال بارگذاری سبد خرید...
      </div>
    );
  if (!products.length)
    return (
      <div className="py-20 text-center font-black text-slate-400">
        سبد خرید شما خالی است!
      </div>
    );

  const handelDecrementProducts = async (productId) => {
    try {
      const { message } = await decrementFromCartFn(productId);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.danger(error?.response?.data?.message);
    }
  };
  const handelAddProducts = async (productId) => {
    try {
      const { message } = await addToCartFn(productId);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.danger(error?.response?.data?.message);
    }
  };

  const handlePament = async () => {
    try {
      const { message } = await paymentsFn();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.danger(error?.response?.data?.message);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="relative mb-12 overflow-hidden rounded-[32px] bg-white p-8 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-50/80 via-transparent to-transparent" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                سبد خرید شما
              </h1>
              <p className="mt-1 text-sm font-bold text-slate-400">
                شما {products.length} محصول در سبد دارید
              </p>
            </div>
          </div>
          {/* نمادهای اعتماد */}
          <div className="hidden gap-6 text-xs font-black tracking-widest text-slate-500 uppercase lg:flex">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" /> ضمانت بازگشت
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-blue-500" /> ارسال اکسپرس
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
        {/* Products Side */}
        <div className="divide-accent-soft divide-y rounded-[24px] border border-slate-100 bg-white px-5 xl:col-span-2">
          {products.map((item) => (
            <div
              key={item._id}
              className="group relative flex items-center gap-6 py-5"
            >
              <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-50 p-2">
                <Image
                  src="/iphone.webp"
                  alt={item.title}
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-black text-slate-800">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 font-bold text-slate-400">
                  <span className="text-sm">
                    {item.offPrice.toLocaleString()} تومان
                  </span>
                  <span className="rounded-lg bg-rose-50 px-2 py-0.5 text-[10px] text-rose-500">
                    {Number(Math.floor((item.discount / item.price) * 100))}٪
                    تخفیف
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 p-1.5 shadow-inner">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handelDecrementProducts(item._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  {addingToCart || decrementingFromCart ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <span className="w-8 text-center text-sm font-black">
                      {item.quantity}
                    </span>
                  )}
                  <button
                    onClick={() => handelAddProducts(item._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Factor */}
        <div className="xl:col-span-1">
          <div className="sticky top-24 rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl">
            <h2 className="mb-6 text-xl font-black">خلاصه فاکتور</h2>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between text-slate-400">
                <span>قیمت کل</span>
                <span>{payDetail.totalGrossPrice.toLocaleString("fa-IR")}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>سود شما</span>
                <span>{payDetail.totalOffAmount.toLocaleString("fa-IR")}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-4 text-lg font-black">
                <span>قابل پرداخت</span>
                <span>{payDetail.totalPrice.toLocaleString("fa-IR")}</span>
              </div>
            </div>
            {/* بخش کد تخفیف (اضافه شده) */}
            <div className="mt-4 flex items-center gap-4 rounded-[24px] bg-slate-800 p-4">
              <Tag className="text-slate-400" />
              <input
                placeholder="کد تخفیف دارید؟ وارد کنید..."
                className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
              />
              <button className="rounded-xl bg-blue-600 px-6 py-2 text-xs font-black transition-all duration-300 ease-in-out hover:bg-blue-900">
                اعمال
              </button>
            </div>
            <button
              onClick={handlePament}
              className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-black transition-all hover:bg-blue-500 active:scale-95"
            >
              {paymenting ? <Spinner /> : "تکمیل سفارش و پرداخت"}
            </button>
            {/* نوار پیشنهادی (اضافه شده) */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4">
              <Percent className="h-8 w-8 text-blue-400" />
              <p className="text-[10px] leading-relaxed font-bold text-slate-400">
                با خرید بیش از ۲۰ میلیون تومان، ارسال برای شما رایگان خواهد بود!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;

// {cart:{
// coupon:null
// payDetail:{totalOffAmount: 250000000, totalPrice: 5250000000, totalGrossPrice: 5500000000, orderItems: Array(3), productIds: Array(3), …}
// productDetail: [{…}, {…}, {…}]
// _id:"6a27e11e59551e299f440dd2"}
// [[Prototype]] : Object
// payments: []
// user:{
// Products: []
// avatarUrl :null
// biography: null
// cart :{products: Array(3), coupon: null, _id: '6a2a425e5c0afeb494f1e8ee'}
// createdAt : "2026-06-09T09:47:10.530Z"
// email: "hurad@gmail.com"
// isActive: true
// isVerifiedPhoneNumber: true
// likedProducts :[]
// name: "هوراد"
// phoneNumber:"09150501580"
// resetLink:null
// role:"ADMIN"
// updatedAt:"2026-06-11T04:39:43.628Z"}}
