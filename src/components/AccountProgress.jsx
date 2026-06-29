"use client";

import { Button } from "@heroui/react";
import React from "react";

export default function AccountProgress({
  completedSteps = 3,
  totalSteps = 4,
}) {
  const percentage = Math.round((completedSteps / totalSteps) * 100);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="border-border bg-surface text-foreground relative flex flex-col items-center justify-between overflow-hidden rounded-[32px] border p-8 shadow-sm">
      {/* افکت نوری پس‌زمینه هماهنگ با تم */}
      <div className="bg-accent/15 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl" />

      <div className="flex w-full flex-col items-center justify-center gap-y-4">
        <h2 className="text-foreground relative mb-6 text-xl font-black">
          وضعیت پروفایل
        </h2>

        {/* دایره پیشرفت با رنگ‌بندی داینامیک تم */}
        <div className="border-border bg-surface-secondary relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4">
          <svg className="absolute -top-1 -left-1 h-24 w-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="stroke-accent fill-none stroke-[4] transition-all duration-500 ease-in-out"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-foreground text-2xl font-black">
            {percentage}%
          </span>
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <h3 className="text-foreground text-sm font-black">
            {percentage === 100
              ? "حساب کاربری شما ۱۰۰٪ تکمیل شد! 🎉"
              : "حساب کاربری شما تقریباً کامل است!"}
          </h3>

          <p className="text-muted mt-2 max-w-[260px] text-center text-xs leading-relaxed font-bold">
            {percentage === 100
              ? "از امکانات کامل پلتفرم لذت ببرید."
              : `شما ${completedSteps} بخش از ${totalSteps} بخش را کامل کرده‌اید. با تکمیل اطلاعات، اولین نشان خود را بگیرید.`}
          </p>
        </div>
      </div>

      {percentage < 100 && (
        <Button className="w-full rounded-2xl py-7" size="lg">
          تکمیل اطلاعات ({totalSteps - completedSteps} گام باقی‌مانده)
        </Button>
      )}
    </div>
  );
}
