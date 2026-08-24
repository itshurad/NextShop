"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  TextField,
  Avatar,
  toast,
  Input,
  FieldError,
  Spinner,
} from "@heroui/react";
import { useGetUser, useUpdateProfile } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const { mutateAsync } = useUpdateProfile();
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const { message } = await mutateAsync(data);
      toast.success(message || "اطلاعات با موفقیت ذخیره شد.");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      router.push("/admin/");
    } catch (error) {
      toast.danger(error?.response?.data?.message || "خطایی رخ داده است.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <Form onSubmit={onSubmit} className="w-full">
      <div className="text-foreground mx-auto w-full max-w-7xl space-y-8 py-8 lg:px-8">
        {/* 1. هدر فرم با تم داینامیک */}
        <div className="border-accent/20 bg-surface from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-linear-to-br to-transparent p-8 md:p-10">
          {/* افکت‌های نوری پس‌زمینه */}
          <div className="bg-accent/15 absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            <Avatar
              size="lg"
              className="border-surface h-20 w-20 border-4 shadow-md"
            >
              <Avatar.Image
                alt="کاربر"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback className="bg-accent/15 text-accent font-bold">
                U
              </Avatar.Fallback>
            </Avatar>

            <div>
              <span className="bg-accent/15 text-accent mb-2 inline-flex rounded-full px-3 py-1 text-xs font-bold">
                گام نهایی
              </span>
              <h1 className="text-foreground text-3xl font-black">
                تکمیل اطلاعات حساب کاربری
              </h1>
              <p className="text-muted mt-3 max-w-2xl text-sm leading-7 font-bold">
                برای شخصی‌سازی تجربه کاربری و دسترسی کامل به امکانات پنل،
                اطلاعات پروفایل خود را تکمیل کنید.
              </p>
            </div>
          </div>
        </div>

        {/* 2. محتوای اصلی و سایدبار */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* بخش فرم‌ها */}
          <div className="space-y-6 lg:col-span-8">
            {/* کارت اول: اطلاعات شناسایی */}
            <Card className="border-border bg-surface rounded-[28px] border p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <h2 className="text-foreground text-xl font-black">
                  اطلاعات هویت
                </h2>
                <p className="text-muted mt-2 text-sm font-medium">
                  این اطلاعات جهت احراز هویت و نمایش در سیستم استفاده می‌شود.
                </p>
              </div>

              <div className="grid gap-6">
                <TextField
                  className="rounded-2xl"
                  name="name"
                  defaultValue={user?.name || ""}
                  label="نام و نام خانوادگی"
                  errorMessage="لطفاً نام و نام خانوادگی خود را وارد کنید"
                >
                  <Input
                    placeholder="مثال: هوراد لیراوی"
                    className="bg-surface-secondary border-border h-12"
                  />
                </TextField>

                <TextField
                  className="rounded-2xl"
                  name="email"
                  defaultValue={user?.email || ""}
                  label="آدرس ایمیل"
                  errorMessage="وارد کردن آدرس ایمیل الزامی است"
                >
                  <Input
                    dir="ltr"
                    type="email"
                    placeholder="example@email.com"
                    className="bg-surface-secondary border-border h-12"
                  />
                </TextField>
              </div>
            </Card>

            {/* کارت دوم: اطلاعات تماس و بیوگرافی */}
            <Card className="border-border bg-surface rounded-[28px] border p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <h2 className="text-foreground text-xl font-black">
                  اطلاعات تکمیلی
                </h2>
                <p className="text-muted mt-2 text-sm font-medium">
                  پل‌های ارتباطی و خلاصه کوتاهی درباره خودتان.
                </p>
              </div>

              <div className="grid gap-6">
                <TextField
                  name="phoneNumber"
                  label="شماره تلفن همراه"
                  defaultValue={user?.phoneNumber || ""}
                  errorMessage="لطفاً شماره تلفن همراه خود را وارد کنید"
                >
                  <Input
                    placeholder="09123456789"
                    dir="ltr"
                    type="tel"
                    className="bg-surface-secondary border-border h-12"
                  />
                </TextField>

                <TextField
                  className="rounded-2xl"
                  name="biography"
                  defaultValue={user?.biography || ""}
                  label="درباره من (بیو)"
                  errorMessage="لطفاً توضیحات کوتاهی در این بخش بنویسید"
                >
                  <Input
                    placeholder="خلاصه‌ای از فعالیت‌ها یا مهارت‌های خود بنویسید..."
                    className="bg-surface-secondary border-border h-12"
                  />
                </TextField>
              </div>
            </Card>
          </div>

          {/* سایدبار عملیات و نکات */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 flex flex-col gap-6">
              {/* کارت اکشن نهایی */}
              <Card className="border-accent/20 bg-surface from-accent/15 via-accent/5 overflow-hidden rounded-[28px] border bg-linear-to-br to-transparent p-6">
                <div className="mb-5 flex items-center gap-4">
                  <div className="bg-accent/15 text-accent flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
                    ✨
                  </div>
                  <div>
                    <h2 className="text-foreground font-black">
                      تکمیل پروفایل
                    </h2>
                    <p className="text-muted mt-1 text-xs font-bold">
                      یک قدم تا فعال‌سازی کامل حساب
                    </p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7 font-medium">
                  پس از تکمیل اطلاعات، پروفایل شما آماده استفاده خواهد بود و
                  می‌توانید در بخش‌های مختلف سیستم فعالیت کنید.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  isLoading={loading}
                  className="shadow-accent/20 h-14 w-full rounded-2xl font-bold shadow-lg transition-all hover:-translate-y-0.5"
                >
                  ذخیره و ادامه
                </Button>
              </Card>

              {/* کارت نکات مهم */}
              <Card className="border-border bg-surface rounded-[28px] border p-6">
                <h3 className="text-foreground mb-4 font-black">نکات مهم</h3>

                <div className="text-muted space-y-4 text-sm font-medium">
                  <div className="flex items-start gap-3">
                    <span className="text-success text-base">✓</span>
                    <p className="leading-6">
                      نام وارد شده در بخش‌های مختلف پنل نمایش داده می‌شود.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-accent text-base">📧</span>
                    <p className="leading-6">
                      ایمیل برای اطلاع‌رسانی‌ها و بازیابی حساب استفاده خواهد شد.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-warning text-base">⚙️</span>
                    <p className="leading-6">
                      تمامی اطلاعات بعداً از بخش تنظیمات پروفایل قابل ویرایش
                      هستند.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
