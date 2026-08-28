"use client";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
  TextField,
  toast,
  DatePicker,
  I18nProvider,
  ListBox,
  Select,
  FieldError,
  useFilter,
  Label,
  Autocomplete,
  EmptyState,
  SearchField,
  Calendar,
  DateField,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
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
  { id: 1, label: "درصد", value: "percent" },
  { id: 2, label: "ثابت", value: "fixedProduct" },
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
  const { contains } = useFilter({ sensitivity: "base" });
  const { mutateAsync: updateCoupon } = useUpdateCoupon();
  const { mutateAsync: addCoupon } = useAddNewCoupon();

  useEffect(() => {
    if (coupon) {
      if (coupon.productIds) {
        const ids = coupon.productIds.map((pro) => pro._id || pro);
        setSelectedProducts(new Set(ids));
      }
      if (coupon.expireDate) {
        try {
          // تبدیل تاریخ مطلق به تاریخ محلی بدون ساعت
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
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const productIdsArray = Array.from(selectedProducts);
    const finalPayload = {
      ...payload,
      productIds: productIdsArray,
      expireDate: expireDate ? expireDate.toString() : undefined,
    };
    if (isEditMode) {
      try {
        const { message } = await updateCoupon({ id, ...finalPayload });
        toast.success(message || "عملیات با موفقیت انجام شد");
        router.push("/admin/coupons");
      } catch (error) {
        toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
      }
    } else {
      try {
        const { message } = await addCoupon(finalPayload);
        toast.success(message || "عملیات با موفقیت انجام شد");
        router.push("/admin/coupons");
      } catch (error) {
        toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
      }
    }
  };

  if (isEditMode && (isLoading || !coupon))
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  return (
    <Form onSubmit={onSubmit}>
      <div className="mx-auto max-w-7xl px-1 py-6 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">
            {isEditMode ? "ویرایش کد تخفیف" : "ایجاد کد تخفیف جدید"}
          </h1>
          <p className="text-muted mt-2 text-sm">
            با تعریف کدهای تخفیف، نرخ تبدیل فروشگاه خود را افزایش دهید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            <Card className="border-border bg-surface overflow-hidden rounded-[28px] border p-0 shadow-lg">
              <div className="from-acbg-accent/10 via-acbg-accent/5 bg-linear-to-l to-transparent p-6 md:p-8">
                <h2 className="text-xl font-black">مشخصات کد تخفیف</h2>
                <p className="text-muted mt-2 text-sm">
                  اطلاعات اصلی شامل کد، میزان تخفیف و محدودیت‌ها را وارد کنید.
                </p>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <TextField
                  defaultValue={coupon?.code || ""}
                  name="code"
                  label="کد"
                  variant="secondary"
                  isRequired
                >
                  <label
                    htmlFor="code"
                    className="text-foreground mb-1.5 block text-sm font-bold"
                  >
                    کد
                  </label>
                  <InputGroup>
                    <InputGroup.Input placeholder="مثال: FREE" />
                  </InputGroup>
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>

                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    defaultValue={coupon?.amount || ""}
                    name="amount"
                    label="مقدار"
                    isRequired
                    variant="secondary"
                  >
                    <label
                      htmlFor="amount"
                      className="text-foreground mb-1.5 block text-sm font-bold"
                    >
                      مقدار
                    </label>
                    <InputGroup>
                      <InputGroup.Input placeholder="مثال: 10 درصد" />
                    </InputGroup>
                    <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                  </TextField>

                  <TextField
                    defaultValue={coupon?.usageLimit || ""}
                    name="usageLimit"
                    label="ظرفیت"
                    isRequired
                    variant="secondary"
                  >
                    <label
                      htmlFor="usageLimit"
                      className="text-foreground mb-1.5 block text-sm font-bold"
                    >
                      ظرفیت
                    </label>
                    <InputGroup>
                      <InputGroup.Input placeholder="مثال: 30 عدد" />
                    </InputGroup>
                    <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                  </TextField>
                </div>

                <div className="grid items-end gap-5 md:grid-cols-2">
                  <Select
                    name="type"
                    className="flex-1"
                    placeholder="انتخاب نوع"
                    isRequired
                    variant="secondary"
                    defaultSelectedKey={coupon?.type}
                  >
                    <label
                      htmlFor="type"
                      className="text-foreground mb-1.5 block text-sm font-bold"
                    >
                      نوع
                    </label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {couponTypes.map((item) => (
                          <ListBox.Item
                            dir="rtl"
                            key={item.value}
                            id={item.value}
                            textValue={item.label}
                            className="hover:bg-default cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors"
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

                  <div className="flex flex-col gap-y-1">
                    <I18nProvider locale="fa-IR-u-ca-persian">
                      <DatePicker
                        name="expireDate"
                        className="w-full"
                        isRequired
                        minValue={currentToday} // غیرفعال کردن روزهای قبل از امروز
                        value={expireDate}
                        onChange={setExpireDate}
                        granularity="day" // 👈 حذف قطعی بخش ساعت و دقیقه در کل فیلد و پاپ‌آپ
                      >
                        <Label className="text-foreground mb-1.5 block text-sm font-bold">
                          تاریخ انقضا
                        </Label>

                        <DateField.Group
                          fullWidth
                          className="bg-default border-border flex items-center justify-between rounded-xl border p-2"
                        >
                          <DateField.Input className="flex gap-x-0.5 text-sm">
                            {(segment) => (
                              <DateField.Segment
                                segment={segment}
                                className="data-[placeholder=true]:text-muted rounded px-0.5 outline-none"
                              />
                            )}
                          </DateField.Input>

                          <DateField.Suffix>
                            <DatePicker.Trigger className="text-muted hover:bg-surface-secondary rounded-lg p-1 transition-colors">
                              <DatePicker.TriggerIndicator />
                            </DatePicker.Trigger>
                          </DateField.Suffix>
                        </DateField.Group>

                        <DatePicker.Popover className="border-border bg-surface z-50 max-w-[320px] rounded-2xl border p-4 shadow-xl">
                          {/* اضافه کردن weekdayStyle="short" برای خلاصه کردن نام روزها به (ش، ی، د...) و جلوگیری از به هم ریختن کادر */}
                          <Calendar
                            aria-label="انتخاب تاریخ انقضا"
                            weekdayStyle="short"
                          >
                            <Calendar.Header className="flex items-center justify-between pb-2">
                              <Calendar.YearPickerTrigger className="text-foreground flex items-center gap-1 font-bold">
                                <Calendar.YearPickerTriggerHeading />
                                <Calendar.YearPickerTriggerIndicator />
                              </Calendar.YearPickerTrigger>
                              <div className="flex gap-1">
                                <Calendar.NavButton
                                  slot="previous"
                                  className="hover:bg-default rounded-lg p-1"
                                />
                                <Calendar.NavButton
                                  slot="next"
                                  className="hover:bg-default rounded-lg p-1"
                                />
                              </div>
                            </Calendar.Header>

                            <Calendar.Grid className="w-full border-collapse">
                              <Calendar.GridHeader>
                                {(day) => (
                                  <Calendar.HeaderCell className="text-muted p-1 text-center text-xs font-bold">
                                    {day}
                                  </Calendar.HeaderCell>
                                )}
                              </Calendar.GridHeader>
                              <Calendar.GridBody>
                                {(date) => (
                                  <Calendar.Cell
                                    date={date}
                                    className="hover:bg-accent/10 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground h-9 w-9 rounded-lg text-center text-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-20"
                                  />
                                )}
                              </Calendar.GridBody>
                            </Calendar.Grid>

                            <Calendar.YearPickerGrid>
                              <Calendar.YearPickerGridBody>
                                {({ year }) => (
                                  <Calendar.YearPickerCell
                                    year={year}
                                    className="hover:bg-accent/10 data-[selected=true]:bg-accent rounded-lg p-2 text-center"
                                  />
                                )}
                              </Calendar.YearPickerGridBody>
                            </Calendar.YearPickerGrid>
                          </Calendar>
                        </DatePicker.Popover>
                            <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                      </DatePicker>
                    </I18nProvider>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              <Card className="border-border bg-surface rounded-[28px] border p-6 shadow-lg">
                <div className="mb-5">
                  <h2 className="mb-1 font-black">محصولات مشمول تخفیف</h2>
                  <p className="text-muted text-xs">
                    محصولات را جستجو کرده و به لیست تخفیف اضافه کنید.
                  </p>
                </div>

                <Autocomplete
                  fullWidth
                  isRequired
                  placeholder="جستجوی محصول..."
                  variant="secondary"
                  onSelectionChange={(key) => {
                    if (key) {
                      setSelectedProducts((prev) => {
                        const next = new Set(prev);
                        next.add(key);
                        return next;
                      });
                    }
                  }}
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    محصول
                  </Label>
                  <Autocomplete.Trigger className="border-border bg-field rounded-xl border p-2">
                    <Autocomplete.Value />
                    <Autocomplete.ClearButton />
                    <Autocomplete.Indicator />
                  </Autocomplete.Trigger>

                  <Autocomplete.Popover className="border-border bg-surface z-50 rounded-2xl border p-4 shadow-xl">
                    <Autocomplete.Filter filter={contains}>
                      <SearchField
                        autoFocus
                        name="search"
                        variant="secondary"
                        className="mb-2"
                      >
                        <SearchField.Group className="border-border bg-field flex items-center gap-2 rounded-xl border p-2">
                          <SearchField.SearchIcon />
                          <SearchField.Input
                            placeholder="تایپ کنید..."
                            className="w-full bg-transparent text-sm outline-none"
                          />
                          <SearchField.ClearButton />
                        </SearchField.Group>
                      </SearchField>

                      <ListBox
                        renderEmptyState={() => (
                          <EmptyState className="text-muted p-4 text-center text-xs">
                            محصولی یافت نشد
                          </EmptyState>
                        )}
                      >
                        {products
                          // حذف مواردی که قبلاً انتخاب شده‌اند از منوی بازشو
                          ?.filter((item) => !selectedProducts.has(item._id))
                          .map((item) => (
                            <ListBox.Item
                              key={item._id}
                              id={item._id}
                              textValue={item.title}
                              className="hover:bg-default cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors"
                            >
                              {item.title}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                      </ListBox>
                    </Autocomplete.Filter>
                    
                  </Autocomplete.Popover>
                      <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                </Autocomplete>

                {/* نمایش لیست محصولات انتخاب شده (کاملاً هماهنگ با لود اولیه ادیت مود و قابلیت حذف) */}
                {selectedProducts.size > 0 && (
                  <div className="border-border bg-field mt-4 space-y-2 rounded-xl border p-3">
                    <p className="text-muted mb-2 text-xs font-bold">
                      محصولات انتخاب شده:
                    </p>

                    <div className="dir-rtl max-h-48 space-y-1.5 overflow-y-auto">
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
                              className="size-8"
                              variant="danger-soft"
                              onClick={() => {
                                setSelectedProducts((prev) => {
                                  const next = new Set(prev);
                                  next.delete(item._id);
                                  return next;
                                });
                              }}
                            >
                              <span>
                                <svg
                                  className="h-5 w-5"
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
                              </span>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* فیلد مخفی جهت فعال نگه داشتن اعتبارسنجی isRequired بومی فرم HTML5 */}
                {selectedProducts.size === 0 && (
                  <input type="hidden" name="productIds" required />
                )}
              </Card>

              {/* Publish */}
              <Card className="border-acbg-accent/20 bg-accent/5 rounded-[24px] border p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="bg-accent/15 flex h-11 w-11 items-center justify-center rounded-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="font-black">آماده انتشار</h2>
                    <p className="text-muted text-xs">
                      بررسی و ثبت نهایی کد تخفیف
                    </p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7">
                  پس از ثبت، کد تخفیف در فروشگاه ذخیره شده و آماده استفاده
                  کاربران خواهد بود.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="bg-accent text-accent-foreground h-14 w-full rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1"
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
