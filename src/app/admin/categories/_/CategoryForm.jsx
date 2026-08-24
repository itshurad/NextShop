"use client";

import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Textarea,
  Spinner,
  toast,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  useAddCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { useRouter } from "next/navigation";

export const categoryTypes = [
  { label: "محصول", value: "product" },
  { label: "پست", value: "post" },
  { label: "تیکت", value: "ticket" },
  { label: "نظرات", value: "comment" },
];

export default function CategoryForm({ id }) {
  const isEditMode = Boolean(id);
  const router = useRouter();

  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};

  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: addCategory, isPending: isAdding } = useAddCategory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (isEditMode) {
        const { message } = await updateCategory({ id, ...formData });
        toast.success(message || "دسته‌بندی با موفقیت به‌روزرسانی شد");
      } else {
        const { message } = await addCategory(formData);
        toast.success(message || "دسته‌بندی با موفقیت ایجاد شد");
      }
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  if (isEditMode && (isLoading || !category)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  const isFormLoading = isUpdating || isAdding;

  return (
    <Form onSubmit={onSubmit} className="text-foreground w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-foreground text-3xl font-black">
            {isEditMode ? "ویرایش دسته‌بندی" : "ساخت دسته‌بندی جدید"}
          </h1>
          <p className="text-muted mt-2 text-sm">
            {isEditMode
              ? "اطلاعات دسته‌بندی منتخب را ویرایش و به‌روزرسانی کنید."
              : "دسته‌بندی جدیدی برای مدیریت بهتر محتوای سیستم ایجاد کنید."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Main Info */}
            <Card className="border-border bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5 md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="text-foreground text-lg font-black">
                  اطلاعات دسته‌بندی
                </h2>
                <p className="text-muted mt-2 text-sm">
                  عنوان فارسی و انگلیسی دسته‌بندی
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="عنوان دسته‌بندی"
                  name="title"
                  isRequired
                  defaultValue={category?.title || ""}
                  placeholder="مثال: تکنولوژی"
                  variant="flat"
                  classnames={{
                    inputWrapper:
                      "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                  }}
                />

                <Input
                  label="عنوان انگلیسی"
                  name="englishTitle"
                  dir="ltr"
                  isRequired
                  defaultValue={category?.englishTitle || ""}
                  placeholder="مثال: technology"
                  variant="flat"
                  classnames={{
                    inputWrapper:
                      "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                  }}
                />
              </div>
            </Card>

            {/* Description */}
            <Card className="border-border bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5 md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="text-foreground text-lg font-black">توضیحات</h2>
                <p className="text-muted mt-2 text-sm">
                  توضیحی جامع درباره این دسته‌بندی بنویسید
                </p>
              </div>

              <Textarea
                label="توضیحات دسته‌بندی"
                name="description"
                isRequired
                defaultValue={category?.description || ""}
                placeholder="توضیحات این دسته‌بندی..."
                variant="flat"
                classnames={{
                  inputWrapper:
                    "min-h-32 md:min-h-40 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                }}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              {/* Settings */}
              <div className="border-border bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5">
                <div className="border-border mb-6 border-b pb-4">
                  <h2 className="text-foreground font-black">نوع دسته‌بندی</h2>
                  <p className="text-muted mt-1 text-xs">
                    نوع دسته‌بندی را انتخاب کنید
                  </p>
                </div>

                <Select
                  label="نوع دسته‌بندی"
                  name="type"
                  placeholder="یک مورد را انتخاب کنید"
                  isRequired
                  variant="flat"
                  defaultSelectedKeys={category?.type ? [category.type] : []}
                  classnames={{
                    trigger:
                      "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                  }}
                >
                  {categoryTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Publish Card */}
              <Card className="border-accent/20 bg-accent/5 rounded-[24px] border p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="bg-accent/15 flex h-11 w-11 items-center justify-center rounded-xl text-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="text-foreground font-black">انتشار</h2>
                    <p className="text-muted text-xs">ثبت نهایی دسته‌بندی</p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7 font-medium">
                  پس از ثبت، این دسته‌بندی در بخش‌های مختلف سیستم قابل انتخاب
                  خواهد بود.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  isLoading={isFormLoading}
                  className="bg-accent shadow-accent/20 h-14 w-full rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-1"
                >
                  {isEditMode ? "ذخیره تغییرات" : "ساخت دسته‌بندی"}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
