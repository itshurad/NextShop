"use client";
import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Spinner,
  toast,
  FieldError,
  ListBox,
  Select,
} from "@heroui/react";
import {
  useAddCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { useRouter } from "next/navigation";

export const categoryTypes = [
  { id: 1, label: "محصول", value: "product" },
  { id: 2, label: "پست", value: "post" },
  { id: 3, label: "تیکت", value: "ticket" },
  { id: 4, label: "نظرات", value: "comment" },
];

export default function CategoryForm({ id }) {
  const isEditMode = Boolean(id);
  const router = useRouter();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: addCategory } = useAddCategory();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    if (isEditMode) {
      try {
        const { message } = await updateCategory({ id, ...payload });
        toast.success(message || "عملیات با موفقیت انجام شد");
        router.push("/admin/categories");
      } catch (error) {
        toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
      }
    } else {
      try {
        const { message } = await addCategory(payload);
        toast.success(message || "عملیات با موفقیت انجام شد");
        router.push("/admin/categories");
      } catch (error) {
        toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
      }
    }
  };

  if (isEditMode && (isLoading || !category))
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  return (
    <Form onSubmit={onSubmit} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">
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
            <Card className="border-default-200 bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5 md:p-8">
              <div className="border-default-100 mb-6 border-b pb-4">
                <h2 className="text-lg font-black">اطلاعات دسته‌بندی</h2>
                <p className="text-muted mt-2 text-sm">
                  عنوان فارسی و انگلیسی دسته‌بندی
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/*  Title */}
                <TextField
                  defaultValue={category?.title || ""}
                  name="title"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    عنوان
                  </Label>
                  <Input
                    placeholder="مثال: تکنولوژی"
                    name="title"
                    className="w-full"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>
                {/* Englis Title */}
                <TextField
                  defaultValue={category?.englishTitle || ""}
                  name="englishTitle"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    عنوان انگلیسی
                  </Label>
                  <Input
                    dir="ltr"
                    placeholder="technology"
                    className="w-full"
                    name="englishTitle"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>
              </div>
            </Card>

            {/* Description */}
            <Card className="border-default-200 bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5 md:p-8">
              <div className="border-default-100 mb-6 border-b pb-4">
                <h2 className="text-lg font-black">توضیحات</h2>
                <p className="text-muted mt-2 text-sm">
                  توضیحی درباره این دسته‌بندی بنویسید
                </p>
              </div>

              <TextField
                defaultValue={category?.description || ""}
                name="description"
                variant="secondary"
                className="w-full"
                isRequired
              >
                <Label className="text-foreground mb-1.5 block text-sm font-bold">
                  توضیحات
                </Label>
                <TextArea
                  placeholder="توضیحات این دسته‌بندی..."
                  className="min-h-30 w-full md:min-h-40"
                  name="description"
                />
                <FieldError className="font-bold">
                  این بخش الزامی است
                </FieldError>
              </TextField>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              {/* Settings */}
              <Card className="border-default-200 bg-surface rounded-[24px] border p-6 shadow-lg shadow-black/5">
                <div className="border-default-100 mb-6 border-b pb-4">
                  <h2 className="font-black">نوع دسته‌بندی</h2>
                  <p className="text-muted mt-1 text-xs">
                    نوع دسته‌بندی را انتخاب کنید
                  </p>
                </div>

                {/* Select Box */}
                <Select
                  name="type"
                  className="flex-1"
                  placeholder="نوع دسته‌بندی"
                  isRequired
                  variant="secondary"
                  defaultSelectedKey={category?.type}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {categoryTypes.map((item) => (
                        <ListBox.Item
                          dir="rtl"
                          key={item.value}
                          id={item.value}
                          textValue={item.label}
                          className="hover:bg-default-100 cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors"
                        >
                          {item.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </Select>
              </Card>

              {/* Publish Card */}
              <Card className="border-accent/20 bg-accent/5 rounded-[24px] border p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="bg-accent/15 flex h-11 w-11 items-center justify-center rounded-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="font-black">انتشار</h2>
                    <p className="text-muted text-xs">ثبت نهایی دسته‌بندی</p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7">
                  پس از ثبت، این دسته‌بندی در بخش‌های مختلف سیستم قابل انتخاب
                  خواهد بود.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="shadow-accent/20 h-14 w-full rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1"
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
