"use client";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { Button, toast } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

function AddToCart({ products }) {
  const queryClient = useQueryClient();
  const { data } = useGetUser();
  const { user } = data || {};
  const { mutateAsync, isLoading } = useAddToCart();

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("نیاز به ورود به سایت دارید.");
      return;
    }
    try {
      const { message } = await mutateAsync(products._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  // بررسی ایمن وجود محصول در سبد خرید کاربر
  const isProductInCart = user?.cart?.products?.some(
    (p) => p.productId === products._id,
  );

  return (
    <div className="w-full">
      {isProductInCart ? (
        <Link href="/cart" className="block w-full">
          {/* دکمه ثانویه لوکس با بوردر پویا و هوور ملایم تم */}
          <Button
            size="lg"
            variant="bordered"
            className="border-accent text-accent bg-accent/5 hover:bg-accent/10 h-14 w-full rounded-2xl text-sm font-black transition-all"
          >
            رفتن به سبد خرید
          </Button>
        </Link>
      ) : (
        /* دکمه اکشن اصلی مقتدر و حجیم با رنگ ملایم شده‌ی Accent و هندلینگ بومی لودینگ */
        <Button
          size="lg"
          onClick={handleAddToCart}
          isLoading={isLoading}
          className="bg-accent shadow-accent/20 h-14 w-full rounded-2xl text-sm font-black text-white shadow-xl transition-all hover:opacity-90"
        >
          افزودن به سبد خرید
        </Button>
      )}
    </div>
  );
}

export default AddToCart;
