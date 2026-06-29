"use client";

import React from "react";
import { Chip, Spinner, Table } from "@heroui/react";
import { useGetPayments } from "@/hooks/usePayments";

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num);
function page() {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="border-accent/20 from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-linear-to-br to-transparent p-8">
        <div className="bg-accent/15 absolute -top-16 -right-16 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute -bottom-16 -left-16 h-52 w-52 rounded-full blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="bg-accent/15 text-accent mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold">
              مدیریت سفارش‌ها
            </span>

            <h1 className="text-4xl font-black">سفارش‌ها</h1>

            <p className="text-muted mt-3 max-w-xl text-sm">
              مدیریت و مشاهده وضعیت سفارش‌ها موفق و ناموفق
            </p>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="border-accent/10 from-accent/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="text-accent-soft-foreground bg-accent/15 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.86241 10.7032C3.38351 12.513 3.37707 14.4414 3.85597 16.2511C4.44153 18.464 6.22102 20.1547 8.45287 20.6188L8.60824 20.6511C10.8457 21.1163 13.1543 21.1163 15.3918 20.6511L15.5471 20.6188C17.779 20.1547 19.5585 18.464 20.144 16.2511C20.6229 14.4414 20.6165 12.513 20.1376 10.7032C19.5611 8.52447 17.8007 6.82847 15.6032 6.37155C13.2263 5.87731 10.7737 5.87731 8.39677 6.37155M8.39677 6.37155C9.58417 6.12466 12.04 6.04503 13.2463 6.04481C12.5221 4.31117 10.5489 3 8.8677 3H8.00974C7.53975 3 7.06583 3.06524 6.61272 3.19064C4.79687 3.69319 3.51146 5.3599 3.51146 7.25212V12.9952C3.54685 12.2221 3.66414 11.4525 3.86241 10.7032C4.43895 8.52447 6.1993 6.82847 8.39677 6.37155ZM14.6103 8.76913L14.6529 8.77627C16.4358 9.07479 17.7426 10.6245 17.7426 12.4404M3.51146 13.9964V14.0138L3.5124 14.0164C3.51208 14.0097 3.51177 14.0031 3.51146 13.9964Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-accent-soft-foreground text-4xl font-black">
            {payments?.length || 0}
          </div>
          <div className="text-accent-soft-foreground mt-2 text-sm font-medium">
            کل کدهای تعریف شده
          </div>
        </div>

        <div className="border-warning/10 from-warning/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="text-warning-soft-foreground bg-warning/15 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.22977 14.013L5.95838 13.8352L5.22977 14.013ZM5.22977 8.71362L4.50116 8.53578L5.22977 8.71362ZM20.1816 8.71363L20.9102 8.53578V8.53578L20.1816 8.71363ZM20.1816 14.013L20.9102 14.1909L20.1816 14.013ZM15.2447 18.5967L15.0798 17.8651V17.8651L15.2447 18.5967ZM10.1666 18.5967L10.0017 19.3284H10.0017L10.1666 18.5967ZM10.1666 4.12989L10.3316 4.86154V4.86154L10.1666 4.12989ZM15.2447 4.12989L15.4096 3.39825V3.39825L15.2447 4.12989ZM9.71943 18.4959L9.88435 17.7643L9.88435 17.7643L9.71943 18.4959ZM15.6919 18.4959L15.8568 19.2276H15.8568L15.6919 18.4959ZM15.6919 4.2307L15.527 4.96234V4.96234L15.6919 4.2307ZM9.71943 4.2307L9.5545 3.49906V3.49906L9.71943 4.2307ZM6.07315 5.61107L5.33541 5.74609V5.74609L6.07315 5.61107ZM5.46979 6.48034C5.54435 6.88779 5.9351 7.15764 6.34255 7.08307C6.75 7.00851 7.01985 6.61776 6.94528 6.21031L5.46979 6.48034ZM3.63181 2.26167C3.22404 2.18888 2.83447 2.46042 2.76167 2.86819C2.68888 3.27596 2.96042 3.66553 3.36819 3.73833L3.63181 2.26167ZM9.17092 18.8331C9.2458 18.9941 9.27487 19.1753 9.25344 19.3546L10.7428 19.5327C10.7972 19.0778 10.7241 18.6158 10.531 18.2006L9.17092 18.8331ZM9.25344 19.3546C9.23201 19.5338 9.16138 19.7007 9.0526 19.836L10.2215 20.776C10.5085 20.4192 10.6884 19.9875 10.7428 19.5327L9.25344 19.3546ZM9.0526 19.836C8.94398 19.9711 8.80246 20.0685 8.64656 20.1199L9.11662 21.5443C9.55163 21.4008 9.93443 21.133 10.2215 20.776L9.0526 19.836ZM8.64656 20.1199C8.49086 20.1713 8.32484 20.1756 8.16715 20.1326L7.77249 21.5798C8.21464 21.7003 8.68141 21.688 9.11662 21.5443L8.64656 20.1199ZM8.16715 20.1326C8.00929 20.0896 7.86365 20 7.74891 19.8714L6.62941 20.8698C6.93436 21.2117 7.33051 21.4592 7.77249 21.5798L8.16715 20.1326ZM7.74891 19.8714C7.63399 19.7425 7.55531 19.58 7.52502 19.4024L6.04634 19.6544C6.12331 20.106 6.32465 20.528 6.62941 20.8698L7.74891 19.8714ZM7.52502 19.4024C7.49473 19.2246 7.51468 19.042 7.58163 18.8768L6.19149 18.3133C6.01945 18.7377 5.96939 19.2028 6.04634 19.6544L7.52502 19.4024ZM7.58163 18.8768C7.64853 18.7117 7.75861 18.5731 7.89583 18.4752L7.02418 17.2544C6.6515 17.5205 6.36359 17.8887 6.19149 18.3133L7.58163 18.8768ZM17.428 18.6178C17.5565 18.7305 17.6535 18.8813 17.7043 19.0537L19.1431 18.6298C19.0133 18.1891 18.7623 17.7929 18.417 17.4901L17.428 18.6178ZM17.7043 19.0537C17.7551 19.2263 17.7568 19.4108 17.709 19.5844L19.1552 19.9826C19.2771 19.5397 19.273 19.0705 19.1431 18.6298L17.7043 19.0537ZM17.709 19.5844C17.6612 19.758 17.5668 19.9107 17.4402 20.0259L18.4497 21.1354C18.7894 20.8262 19.0332 20.4256 19.1552 19.9826L17.709 19.5844ZM17.4402 20.0259C17.3137 20.141 17.1604 20.2141 16.9991 20.2397L17.2344 21.7212C17.6883 21.6491 18.1098 21.4447 18.4497 21.1354L17.4402 20.0259ZM16.9991 20.2397C16.838 20.2653 16.6726 20.2429 16.5218 20.174L15.8984 21.5383C16.3164 21.7294 16.7804 21.7933 17.2344 21.7212L16.9991 20.2397ZM16.5218 20.174C16.3708 20.105 16.2389 19.9912 16.1442 19.8432L14.8805 20.6513C15.1281 21.0384 15.4805 21.3474 15.8984 21.5383L16.5218 20.174ZM16.1442 19.8432C16.0493 19.6949 15.9967 19.5196 15.9947 19.3383L14.4947 19.3551C14.4999 19.8145 14.633 20.2644 14.8805 20.6513L16.1442 19.8432ZM15.9947 19.3383C15.9926 19.1569 16.0413 18.9803 16.1329 18.8295L14.8511 18.0504C14.6126 18.4429 14.4896 18.8957 14.4947 19.3551L15.9947 19.3383ZM9.88435 4.96234L10.3316 4.86154L10.0017 3.39825L9.5545 3.49906L9.88435 4.96234ZM15.0798 4.86154L15.527 4.96234L15.8568 3.49906L15.4096 3.39825L15.0798 4.86154ZM15.527 17.7643L15.0798 17.8651L15.4096 19.3284L15.8568 19.2276L15.527 17.7643ZM10.3316 17.8651L9.88435 17.7643L9.5545 19.2276L10.0017 19.3284L10.3316 17.8651ZM5.95838 13.8352C5.56232 12.2126 5.56232 10.514 5.95838 8.89147L4.50116 8.53578C4.04806 10.392 4.04806 12.3346 4.50116 14.1909L5.95838 13.8352ZM19.453 8.89148C19.849 10.514 19.849 12.2126 19.453 13.8352L20.9102 14.1909C21.3633 12.3346 21.3633 10.392 20.9102 8.53578L19.453 8.89148ZM15.0798 17.8651C13.5155 18.2177 11.8959 18.2177 10.3316 17.8651L10.0017 19.3284C11.7832 19.73 13.6282 19.73 15.4096 19.3284L15.0798 17.8651ZM10.3316 4.86154C11.8959 4.50892 13.5155 4.50892 15.0798 4.86154L15.4096 3.39825C13.6282 2.99668 11.7832 2.99668 10.0017 3.39825L10.3316 4.86154ZM9.88435 17.7643C7.96997 17.3328 6.44241 15.8182 5.95838 13.8352L4.50116 14.1909C5.1157 16.7085 7.06608 18.6666 9.5545 19.2276L9.88435 17.7643ZM15.8568 19.2276C18.3453 18.6666 20.2956 16.7085 20.9102 14.1909L19.453 13.8352C18.9689 15.8182 17.4414 17.3328 15.527 17.7643L15.8568 19.2276ZM15.527 4.96234C17.4414 5.39388 18.9689 6.90847 19.453 8.89148L20.9102 8.53578C20.2956 6.01813 18.3453 4.05999 15.8568 3.49906L15.527 4.96234ZM9.5545 3.49906C7.06607 4.05999 5.1157 6.01813 4.50116 8.53578L5.95838 8.89147C6.44241 6.90847 7.96997 5.39388 9.88435 4.96234L9.5545 3.49906ZM5.66602 15.4586H19.7453V13.9586H5.66602V15.4586ZM5.33541 5.74609L5.46979 6.48034L6.94528 6.21031L6.8109 5.47605L5.33541 5.74609ZM3.36819 3.73833C4.35153 3.91388 5.14482 4.70471 5.33541 5.74609L6.8109 5.47605C6.51183 3.8419 5.25386 2.55125 3.63181 2.26167L3.36819 3.73833Z"
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
            {payments?.filter((c) => new Date(c.expireDate) > new Date())
              .length || 0}
          </div>
          <div className="text-warning-soft-foreground mt-2 text-sm font-medium">
            کدهای فعال
          </div>
        </div>

        <div className="border-success/10 from-success/15 rounded-[28px] border bg-linear-to-br to-transparent p-6 md:col-span-2 xl:col-span-1">
          <div className="text-success-soft-foreground bg-success/15 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
            <svg
              className="h-6 w-6"
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-success-soft-foreground text-4xl font-black">
            {payments?.reduce((acc, c) => acc + c.usageCount, 0) || 0}
          </div>
          <div className="text-success-soft-foreground mt-2 text-sm font-medium">
            مجموع دفعات استفاده
          </div>
        </div>
      </div>
      {/* Loading */}
      {isLoading ? (
        <div className="border-default-200 bg-surface flex h-[500px] items-center justify-center rounded-[32px] border">
          <Spinner size="lg" />
        </div>
      ) : payments?.length === 0 ? (
        <div className="border-default-200 bg-surface rounded-[32px] border p-20 text-center">
          <div className="bg-accent/10 mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full text-6xl">
            📂
          </div>
          <h3 className="text-2xl font-black">هنوز سفارش‌های ثبت نشده است</h3>{" "}
          <p className="text-muted mt-3 text-sm">
            اولین سفارش‌ها را ایجاد کنید و مدیریت تخفیف را آغاز کنید.
          </p>
        </div>
      ) : (
        <div className="border-default-200 bg-surface overflow-hidden rounded-[32px] border p-2 shadow-xl shadow-black/5">
          {/* Table Header */}
          <div className="p-6">
            <h2 className="text-lg font-black">لیست سفارش‌ها</h2>
            <p className="text-muted mt-1 text-xs">مشاهده سفارش‌ها موجود</p>
          </div>

          <Table aria-label="Product Table">
            <Table.ScrollContainer>
              <Table.Content dir="rtl" className="text-center">
                <Table.Header className="text-nowrap">
                  <Table.Column isRowHeader>#</Table.Column>
                  <Table.Column>شماره فاکتور</Table.Column>
                  <Table.Column>توضحیات</Table.Column>
                  <Table.Column>محصولات</Table.Column>
                  <Table.Column>مبلغ</Table.Column>
                  <Table.Column>تاریخ</Table.Column>
                  <Table.Column>وضعیت</Table.Column>
                </Table.Header>
                <Table.Body className="text-nowrap">
                  {payments?.map((payment, index) => (
                    <Table.Row key={payment._id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="truncate font-bold">
                        {payment.invoiceNumber}
                      </Table.Cell>
                      <Table.Cell className="truncate">
                        {payment.description}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-wrap items-center justify-center gap-1">
                          {payment?.cart?.productDetail?.length > 0
                            ? payment?.cart?.productDetail?.map((item) => (
                                <Chip
                                  key={item._id}
                                  variant="soft"
                                  color="warning"
                                >
                                  {item.title}
                                </Chip>
                              ))
                            : "-"}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {formatNumber(payment.amount)} تومان
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(payment.createdAt).toLocaleDateString(
                          "fa-IR",
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          className="font-bold"
                          variant="soft"
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

export default page;
