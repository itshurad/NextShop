"use client";

import React from "react";
import { Button, Chip, Spinner, Table } from "@heroui/react";
import Link from "next/link";
import { useGetUsers } from "@/hooks/useAuth";

export default function UsersPage() {
  const { data, isLoading } = useGetUsers();
  const { users } = data || {};

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="border-accent/20 from-accent/15 via-accent/5 relative overflow-hidden rounded-[32px] border bg-linear-to-br to-transparent p-8">
        <div className="bg-accent/15 absolute -top-16 -right-16 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute -bottom-16 -left-16 h-52 w-52 rounded-full blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="bg-accent/15 text-accent mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold">
              مدیریت محتوا
            </span>

            <h1 className="text-foreground text-4xl font-black">کاربران</h1>

            <p className="text-muted mt-3 max-w-xl text-sm">
              مدیریت و سازماندهی اعضای پلتفرم، دسترسی‌ها و بررسی فعالیت‌های
              کاربران
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-accent/10 from-accent/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="bg-accent/15 text-accent mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
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
          <div className="text-foreground text-4xl font-black">
            {users?.length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            کل کاربران سیستم
          </div>
        </div>

        <div className="border-warning/10 from-warning/15 rounded-[28px] border bg-linear-to-br to-transparent p-6">
          <div className="bg-warning/15 text-warning mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl">
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
          <div className="text-foreground text-4xl font-black">
            {users?.filter((u) => u.isActive).length || 0}
          </div>
          <div className="text-muted mt-2 text-sm font-medium">
            کاربران فعال
          </div>
        </div>
      </div>

      {/* Loading & Content */}
      {isLoading ? (
        <div className="border-border bg-surface flex h-100 items-center justify-center rounded-[32px] border shadow-sm">
          <Spinner size="lg" color="primary" />
        </div>
      ) : users?.length === 0 ? (
        <div className="border-border bg-surface rounded-[32px] border p-20 text-center shadow-sm">
          <div className="bg-accent/10 mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full text-6xl">
            👥
          </div>
          <h3 className="text-foreground text-2xl font-black">
            هنوز کاربری وجود ندارد
          </h3>
          <p className="text-muted mt-3 text-sm font-bold">
            سیستم شما هنوز کاربر ثبت‌نام شده‌ای ندارد.
          </p>
        </div>
      ) : (
        <div className="border-border bg-surface overflow-hidden rounded-[32px] border p-2 shadow-xl shadow-black/5">
          <div className="p-6">
            <h2 className="text-foreground text-lg font-black">لیست کاربران</h2>
            <p className="text-muted mt-1 text-xs font-bold">
              مشاهده وضعیت و اطلاعات کاربران سیستم
            </p>
          </div>

          <Table>
            <Table.ScrollContainer>
              <Table.Content dir="rtl" className="text-center">
                <Table.Header className="text-nowrap">
                  <Table.Column isRowHeader>#</Table.Column>
                  <Table.Column>نام کاربری</Table.Column>
                  <Table.Column>شماره</Table.Column>
                  <Table.Column>ایمیل</Table.Column>
                  <Table.Column>فعال</Table.Column>
                  <Table.Column>محصولات</Table.Column>
                  <Table.Column>تاریخ پیوستن</Table.Column>
                </Table.Header>
                <Table.Body>
                  {users?.map((user, index) =>
                    isLoading ? (
                      <div className="flex items-center gap-4">
                        <Spinner />
                      </div>
                    ) : (
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.phoneNumber}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                          <Chip
                            key={user._id}
                            variant={`${user.isActive ? "soft" : "soft"}`}
                            color={`${user.isActive ? "accent" : "danger"}`}
                          >
                            {user.isActive ? "فعال" : "غیر فعال"}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {user?.Products.length > 0
                              ? user?.Products?.map((product, index) => (
                                  <Chip key={index} variant="secondary">
                                    {product.title}
                                  </Chip>
                                ))
                              : "-"}
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString("fa")}
                        </Table.Cell>
                      </Table.Row>
                    ),
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}
