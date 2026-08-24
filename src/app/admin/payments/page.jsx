"use client";

import React from "react";
import { Chip, Spinner, Table } from "@heroui/react";
import { useGetPayments } from "@/hooks/usePayments";

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num);

export default function AdminPaymentsPage() {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="border-accent/20 from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-linear-to-br to-transparent p-8">
        <div className="bg-accent/15 absolute -top-16 -right-16 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute -bottom-16 -left-16 h-52 w-52 rounded-full blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="bg-accent/15 text-accent mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold">
              مدیریت سفارش‌ها
            </span>

            <h1 className="text-foreground text-4xl font-black">سفارش‌ها</h1>

            <p className="text-muted mt-3 max-w-xl text-sm">
              مدیریت و مشاهده وضعیت سفارش‌های موفق و ناموفق، پیگیری مالی و
              صورت‌حساب‌ها
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* کل سفارش‌ها */}
        <div className="border-accent/10 from-accent/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="bg-accent/15 text-accent-soft-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M3.86241 10.7032C3.38351 12.513 3.37707 14.4414 3.85597 16.2511C4.44153 18.464 6.22102 20.1547 8.45287 20.6188L8.60824 20.6511C10.8457 21.1163 13.1543 21.1163 15.3918 20.6511L15.5471 20.6188C17.779 20.1547 19.5585 18.464 20.144 16.2511C20.6229 14.4414 20.6165 12.513 20.1376 10.7032C19.5611 8.52447 17.8007 6.82847 15.6032 6.37155C13.2263 5.87731 10.7737 5.87731 8.39677 6.37155M8.39677 6.37155C9.58417 6.12466 12.04 6.04503 13.2463 6.04481C12.5221 4.31117 10.5489 3 8.8677 3H8.00974C7.53975 3 7.06583 3.06524 6.61272 3.19064C4.79687 3.69319 3.51146 5.3599 3.51146 7.25212V12.9952C3.54685 12.2221 3.66414 11.4525 3.86241 10.7032C4.43895 8.52447 6.1993 6.82847 8.39677 6.37155ZM14.6103 8.76913L14.6529 8.77627C16.4358 9.07479 17.7426 10.6245 17.7426 12.4404M3.51146 13.9964V14.0138L3.5124 14.0164C3.51208 14.0097 3.51177 14.0031 3.51146 13.9964Z"
              />
            </svg>
          </div>
          <div className="text-accent-soft-foreground text-4xl font-black">
            {payments?.length || 0}
          </div>
          <div className="text-accent-soft-foreground mt-2 text-sm font-medium">
            کل سفارش‌های ثبت‌شده
          </div>
        </div>

        {/* سفارش‌های ناموفق */}
        <div className="border-warning/10 from-warning/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="bg-warning/15 text-warning-soft-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.22977 14.013L5.95838 13.8352L5.22977 14.013ZM5.22977 8.71362L4.50116 8.53578L5.22977 8.71362ZM20.1816 8.71363L20.9102 8.53578V8.53578L20.1816 8.71363ZM20.1816 14.013L20.9102 14.1909L20.1816 14.013ZM15.2447 18.5967L15.0798 17.8651V17.8651L15.2447 18.5967ZM10.1666 18.5967L10.0017 19.3284H10.0017L10.1666 18.5967ZM10.1666 4.12989L10.3316 4.86154V4.86154L10.1666 4.12989ZM15.2447 4.12989L15.4096 3.39825V3.39825L15.2447 4.12989ZM9.71943 18.4959L9.88435 17.7643L9.88435 17.7643L9.71943 18.4959ZM15.6919 18.4959L15.8568 19.2276H15.8568L15.6919 18.4959ZM15.6919 4.2307L15.527 4.96234V4.96234L15.6919 4.2307ZM9.71943 4.2307L9.5545 3.49906V3.49906L9.71943 4.2307ZM6.07315 5.61107L5.33541 5.74609V5.74609L6.07315 5.61107ZM5.46979 6.48034C5.54435 6.88779 5.9351 7.15764 6.34255 7.08307C6.75 7.00851 7.01985 6.61776 6.94528 6.21031L5.46979 6.48034ZM3.63181 2.26167C3.22404 2.18888 2.83447 2.46042 2.76167 2.86819C2.68888 3.27596 2.96042 3.66553 3.36819 3.73833L3.63181 2.26167ZM9.17092 18.8331C9.2458 18.9941 9.27487 19.1753 9.25344 19.3546L10.7428 19.5327C10.7972 19.0778 10.7241 18.6158 10.531 18.2006L9.17092 18.8331ZM9.25344 19.3546C9.23201 19.5338 9.16138 19.7007 9.0526 19.836L10.2215 20.776C10.5085 20.4192 10.6884 19.9875 10.7428 19.5327L9.25344 19.3546ZM9.0526 19.836C8.94398 19.9711 8.80246 20.0685 8.64656 20.1199L9.11662 21.5443C9.55163 21.4008 9.93443 21.133 10.2215 20.776L9.0526 19.836ZM8.64656 20.1199C8.49086 20.1713 8.32484 20.1756 8.16715 20.1326L7.77249 21.5798C8.21464 21.7003 8.68141 21.688 9.11662 21.5443L8.64656 20.1199ZM8.16715 20.1326C8.00929 20.0896 7.86365 20 7.74891 19.8714L6.62941 20.8698C6.93436 21.2117 7.33051 21.4592 7.77249 21.5798L8.16715 20.1326ZM7.74891 19.8714C7.63399 19.7425 7.55531 19.58 7.52502 19.4024L6.04634 19.6544C6.12331 20.106 6.32465 20.528 6.62941 20.8698L7.74891 19.8714ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.58163 18.8768C7.64853 18.7117 7.75861 18.5731 7.89583 18.4752L7.02418 17.2544C6.6515 17.5205 6.36359 17.8887 6.19149 18.3133L7.58163 18.8768ZM17.428 18.6178C17.5565 18.7305 17.6535 18.8813 17.7043 19.0537L19.1431 18.6298C19.0133 18.1891 18.7623 17.7929 18.417 17.4901L17.428 18.6178ZM17.7043 19.0537C17.7551 19.2263 17.7568 19.4108 17.709 19.5844L19.1552 19.9826C19.2771 19.5397 19.273 19.0705 19.1431 18.6298L17.7043 19.0537ZM17.709 19.5844C17.6612 19.758 17.5668 19.9107 17.4402 20.0259L18.4497 21.1354C18.7894 20.8262 19.0332 20.4256 19.1552 19.9826L17.709 19.5844ZM17.4402 20.0259C17.3137 20.141 17.1604 20.2141 16.9991 20.2397L17.2344 21.7212C17.6883 21.6491 18.1098 21.4447 18.4497 21.1354L17.4402 20.0259ZM16.9991 20.2397C16.838 20.2653 16.6726 20.2429 16.5218 20.174L15.8984 21.5383C16.3164 21.7294 16.7804 21.7933 17.2344 21.7212L16.9991 20.2397ZM16.5218 20.174C16.3708 20.105 16.2389 19.9912 16.1442 19.8432L14.8805 20.6513C15.1281 21.0384 15.4805 21.3474 15.8984 21.5383L16.5218 20.174ZM16.1442 19.8432C16.0493 19.6949 15.9967 19.5196 15.9947 19.3383L14.4947 19.3551C14.4999 19.8145 14.633 20.2644 14.8805 20.6513L16.1442 19.8432ZM15.9947 19.3383C15.9926 19.1569 16.0413 18.9803 16.1329 18.8295L14.8511 18.0504C14.6126 18.4429 14.4896 18.8957 14.4947 19.3551L15.9947 19.3383ZM9.88435 4.96234L10.3316 4.86154L10.0017 3.39825L9.5545 3.49906L9.88435 4.96234ZM15.0798 4.86154L15.527 4.96234L15.8568 3.49906L15.4096 3.39825L15.0798 4.86154ZM15.527 17.7643L15.0798 17.8651L15.4096 19.3284L15.8568 19.2276L15.527 17.7643ZM10.3316 17.8651L9.88435 17.7643L9.5545 19.2276L10.0017 19.3284L10.3316 17.8651ZM5.95838 13.8352C5.56232 12.2126 5.56232 10.514 5.95838 8.89147L4.50116 8.53578C4.04806 10.392 4.04806 12.3346 4.50116 14.1909L5.95838 13.8352ZM19.453 8.89148C19.849 10.514 19.849 12.2126 19.453 13.8352L20.9102 14.1909C21.3633 12.3346 21.3633 10.392 20.9102 8.53578L19.453 8.89148ZM15.0798 17.8651C13.5155 18.2177 11.8959 18.2177 10.3316 17.8651L10.0017 19.3284C11.7832 19.73 13.6282 19.73 15.4096 19.3284L15.0798 17.8651ZM10.3316 4.86154C11.8959 4.50892 13.5155 4.50892 15.0798 4.86154L15.4096 3.39825C13.6282 2.99668 11.7832 2.99668 10.0017 3.39825L10.3316 4.86154ZM9.88435 17.7643C7.96997 17.3328 6.44241 15.8182 5.95838 13.8352L4.50116 14.1909C5.1157 16.7085 7.06608 18.6666 9.5545 19.2276L9.88435 17.7643ZM15.8568 19.2276C18.3453 18.6666 20.2956 16.7085 20.9102 14.1909L19.453 13.8352C18.9689 15.8182 17.4414 17.3328 15.527 17.7643L15.8568 19.2276ZM15.527 4.96234C17.4414 5.39388 18.9689 6.90847 19.453 8.89148L20.9102 8.53578C20.2956 6.01813 18.3453 4.05999 15.8568 3.49906L15.527 4.96234ZM9.5545 3.49906C7.06607 4.05999 5.1157 6.01813 4.50116 8.53578L5.95838 8.89147C6.44241 6.90847 7.96997 5.39388 9.88435 4.96234L9.5545 3.49906ZM5.66602 15.4586H19.7453V13.9586H5.66602V15.4586ZM5.33541 5.74609L5.46979 6.48034L6.94528 6.21031L6.8109 5.47605L5.33541 5.74609ZM3.36819 3.73833C4.35153 3.91388 5.14482 4.70471 5.33541 5.74609L6.8109 5.47605C6.51183 3.8419 5.25386 2.55125 3.63181 2.26167L3.36819 3.73833Z"
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
          <div className="text-warning-soft-foreground text-4xl font-black">
            {payments?.filter((p) => p.status !== "COMPLETED").length || 0}
          </div>
          <div className="text-warning-soft-foreground mt-2 text-sm font-medium">
            سفارش‌های ناموفق
          </div>
        </div>

        {/* محصولات فروخته شده */}
        <div className="border-success/10 from-success/15 rounded-[28px] border bg-linear-to-br to-transparent p-6 md:col-span-2 xl:col-span-1">
          <div className="bg-success/15 text-success-soft-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
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
          <div className="text-success-soft-foreground text-4xl font-black">
            {payments?.reduce(
              (acc, c) => acc + (c?.cart?.productDetail?.length || 0),
              0,
            ) || 0}
          </div>
          <div className="text-success-soft-foreground mt-2 text-sm font-medium">
            تعداد محصولات فروخته شده
          </div>
        </div>
      </div>

      {/* Loading & Content */}
      {isLoading ? (
        <div className="border-border bg-surface flex h-125 items-center justify-center rounded-[32px] border">
          <Spinner size="lg" color="primary" />
        </div>
      ) : payments?.length === 0 ? (
        <div className="border-border bg-surface rounded-[32px] border p-20 text-center shadow-sm">
          <div className="bg-accent/10 mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full text-6xl">
            📂
          </div>
          <h3 className="text-foreground text-2xl font-black">
            هنوز سفارشی ثبت نشده است
          </h3>
          <p className="text-muted mt-3 text-sm font-bold">
            اولین سفارش را ایجاد کنید و مدیریت مالی را آغاز کنید.
          </p>
        </div>
      ) : (
        <div className="border-border bg-surface overflow-hidden rounded-[32px] border p-2 shadow-xl shadow-black/5">
          <div className="p-6">
            <h2 className="text-foreground text-lg font-black">
              لیست سفارش‌ها
            </h2>
            <p className="text-muted mt-1 text-xs font-bold">
              مشاهده تاریخچه و پیگیری تراکنش‌ها
            </p>
          </div>

          <Table aria-label="جدول سفارشات فروشگاه">
            <Table.ScrollContainer>
              <Table.Content dir="rtl" className="text-center">
                <Table.Header className="text-nowrap">
                  <Table.Column isRowHeader>#</Table.Column>
                  <Table.Column>شماره فاکتور</Table.Column>
                  <Table.Column>توضیحات</Table.Column>
                  <Table.Column>محصولات خریداری شده</Table.Column>
                  <Table.Column>مبلغ</Table.Column>
                  <Table.Column>تاریخ</Table.Column>
                  <Table.Column>وضعیت</Table.Column>
                </Table.Header>
                <Table.Body className="text-nowrap">
                  {payments?.map((payment, index) => (
                    <Table.Row key={payment._id}>
                      <Table.Cell className="text-muted font-bold">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell className="text-foreground truncate font-black">
                        {payment.invoiceNumber}
                      </Table.Cell>
                      <Table.Cell className="text-muted truncate text-xs font-bold">
                        {payment.description}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {payment?.cart?.productDetail?.length > 0 ? (
                            payment?.cart?.productDetail?.map((item) => (
                              <Chip
                                key={item._id}
                                variant="flat"
                                color="warning"
                                size="sm"
                                className="text-[10px] font-bold"
                              >
                                {item.title}
                              </Chip>
                            ))
                          ) : (
                            <span className="text-muted font-bold">-</span>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-foreground font-black">
                        {formatNumber(payment.amount)} تومان
                      </Table.Cell>
                      <Table.Cell className="text-muted text-xs font-bold">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "fa-IR",
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          className="text-[10px] font-black"
                          variant="flat"
                          color={
                            payment.status === "COMPLETED"
                              ? "success"
                              : "danger"
                          }
                        >
                          {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}
