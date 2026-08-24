"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Spinner,
  toast,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
} from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import {
  parseAbsoluteToLocal,
  today,
  CalendarDate,
  getLocalTimeZone,
} from "@internationalized/date";
import {
  useAddNewCoupon,
  useGetOneCoupon,
  useUpdateCoupon,
} from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";

export const couponTypes = [
  { label: "درصد", value: "percent" },
  { label: "ثابت", value: "fixedProduct" },
];

export default function CouponForm({ id }) {
  const isEditMode = Boolean(id);
  const router = useRouter();

  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [expireDate, setExpireDate] = useState(null);

  const { data: productsData } = useGetProducts();
  const { products } = productsData || {};

  const { data, isLoading } = useGetOneCoupon(id);
  const { coupon } = data || {};

  const { mutateAsync: updateCoupon, isPending: isUpdating } =
    useUpdateCoupon();
  const { mutateAsync: addCoupon, isPending: isAdding } = useAddNewCoupon();

  useEffect(() => {
    if (coupon) {
      if (coupon.productIds) {
        const ids = coupon.productIds.map((pro) => pro._id || pro);
        setSelectedProducts(new Set(ids));
      }
      if (coupon.expireDate) {
        try {
          const localDateTime = parseAbsoluteToLocal(coupon.expireDate);
          setExpireDate(
            new CalendarDate(
              localDateTime.year,
              localDateTime.month,
              localDateTime.day,
            ),
          );
        } catch (e) {
          console.error("Invalid date format", e);
        }
      }
    }
  }, [coupon]);

  const currentToday = today(getLocalTimeZone());

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const productIdsArray = Array.from(selectedProducts);

    const finalPayload = {
      ...formData,
      productIds: productIdsArray,
      expireDate: expireDate ? expireDate.toString() : undefined,
    };

    try {
      if (isEditMode) {
        const { message } = await updateCoupon({ id, ...finalPayload });
        toast.success(message || "کد تخفیف با موفقیت به‌روزرسانی شد");
      } else {
        const { message } = await addCoupon(finalPayload);
        toast.success(message || "کد تخفیف با موفقیت ثبت شد");
      }
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطایی در ثبت کد تخفیف رخ داد",
      );
    }
  };

  if (isEditMode && (isLoading || !coupon)) {
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
            {isEditMode ? "ویرایش کد تخفیف" : "ایجاد کد تخفیف جدید"}
          </h1>
          <p className="text-muted mt-2 text-sm">
            با تعریف کدهای تخفیف، نرخ تبدیل فروشگاه خود را افزایش دهید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            <Card className="border-border bg-surface overflow-hidden rounded-[28px] border shadow-lg">
              <div className="from-accent/10 via-accent/5 bg-linear-to-l to-transparent p-6 md:p-8">
                <h2 className="text-foreground text-xl font-black">
                  مشخصات کد تخفیف
                </h2>
                <p className="text-muted mt-2 text-sm">
                  اطلاعات اصلی شامل کد، میزان تخفیف و محدودیت‌ها را وارد کنید.
                </p>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <Input
                  label="کد تخفیف"
                  name="code"
                  placeholder="مثال: NEXT20"
                  defaultValue={coupon?.code || ""}
                  isRequired
                  variant="flat"
                  classnames={{
                    inputWrapper:
                      "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                  }}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="مقدار تخفیف"
                    name="amount"
                    type="number"
                    placeholder="مثال: 10"
                    defaultValue={coupon?.amount || ""}
                    isRequired
                    variant="flat"
                    classnames={{
                      inputWrapper:
                        "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                    }}
                  />

                  <Input
                    label="ظرفیت (تعداد دفعات مجاز استفاده)"
                    name="usageLimit"
                    type="number"
                    placeholder="مثال: 30"
                    defaultValue={coupon?.usageLimit || ""}
                    isRequired
                    variant="flat"
                    classnames={{
                      inputWrapper:
                        "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                    }}
                  />
                </div>

                <div className="grid items-end gap-5 md:grid-cols-2">
                  <Select
                    label="نوع تخفیف"
                    name="type"
                    placeholder="انتخاب نوع تخفیف"
                    isRequired
                    variant="flat"
                    defaultSelectedKeys={coupon?.type ? [coupon.type] : []}
                    classnames={{
                      trigger:
                        "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                    }}
                  >
                    {couponTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <I18nProvider locale="fa-IR-u-ca-persian">
                    <DatePicker
                      label="تاریخ انقضا"
                      name="expireDate"
                      isRequired
                      minValue={currentToday}
                      value={expireDate}
                      onChange={setExpireDate}
                      variant="flat"
                      classnames={{
                        base: "w-full",
                        inputWrapper:
                          "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                      }}
                    />
                  </I18nProvider>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              <Card className="border-border bg-surface rounded-[28px] border p-6 shadow-lg">
                <div className="mb-5">
                  <h2 className="text-foreground mb-1 font-black">
                    محصولات مشمول تخفیف
                  </h2>
                  <p className="text-muted text-xs">
                    محصولات را جستجو کرده و به لیست تخفیف اضافه کنید.
                  </p>
                </div>

                <Autocomplete
                  label="جستجوی محصول"
                  placeholder="نام محصول را تایپ کنید..."
                  variant="flat"
                  onSelectionChange={(key) => {
                    if (key) {
                      setSelectedProducts((prev) => {
                        const next = new Set(prev);
                        next.add(key);
                        return next;
                      });
                    }
                  }}
                  classnames={{
                    base: "w-full",
                    trigger:
                      "h-14 bg-surface-secondary border border-border focus-within:!border-accent rounded-2xl",
                  }}
                >
                  {products
                    ?.filter((item) => !selectedProducts.has(item._id))
                    .map((item) => (
                      <AutocompleteItem key={item._id} value={item._id}>
                        {item.title}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>

                {selectedProducts.size > 0 && (
                  <div className="border-border bg-surface-secondary/50 mt-4 space-y-2 rounded-xl border p-3">
                    <p className="text-muted mb-2 text-xs font-bold">
                      محصولات انتخاب شده:
                    </p>
                    <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                      {products
                        ?.filter((item) => selectedProducts.has(item._id))
                        .map((item) => (
                          <div
                            key={item._id}
                            className="border-border/60 bg-surface flex items-center justify-between gap-x-2 rounded-lg border p-2 text-xs"
                          >
                            <span className="text-foreground line-clamp-1 font-medium">
                              {item.title}
                            </span>
                            <Button
                              type="button"
                              variant="flat"
                              color="danger"
                              className="bg-danger/10 text-danger hover:bg-danger h-8 w-8 min-w-8 rounded-lg hover:text-white"
                              isIconOnly
                              onClick={() => {
                                setSelectedProducts((prev) => {
                                  const next = new Set(prev);
                                  next.delete(item._id);
                                  return next;
                                });
                              }}
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
                                  strokeWidth="2"
                                />
                                <path
                                  d="M13.7678 10.2322L10.2322 13.7677M13.7678 13.7677L10.2322 10.2322"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Publish */}
              <Card className="border-accent/20 bg-accent/5 rounded-[24px] border p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="bg-accent/15 flex h-11 w-11 items-center justify-center rounded-xl text-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="text-foreground font-black">آماده انتشار</h2>
                    <p className="text-muted text-xs">
                      بررسی و ثبت نهایی کد تخفیف
                    </p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7 font-medium">
                  پس از ثبت، کد تخفیف در سیستم ذخیره شده و کاربران فوراً قادر به
                  استفاده از آن خواهند بود.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  isLoading={isFormLoading}
                  className="bg-accent shadow-accent/20 h-14 w-full rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-1"
                >
                  {isEditMode ? "ذخیره تغییرات کوپن" : "ساخت کد تخفیف"}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
