"use client";
import React from "react";
import { Button, Card, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";

function OtpPage({ phoneNumber, setPhoneNumber, handleGetOtp, isLoading }) {
  const router = useRouter();

  return (
    <form onSubmit={handleGetOtp} className="animate-fadeIn w-full">
      <Card className="border-border bg-surface rounded-[24px] border p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        {/* هدر */}
        <div className="mb-8 flex flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="bg-accent h-2 w-2 animate-pulse rounded-full shadow-[0_0_12px_var(--accent)]" />
              <span className="text-muted text-[10px] font-black tracking-[0.15em]">
                DIGISTORE SECURE
              </span>
            </div>

            <Button
              isIconOnly
              variant="light"
              onPress={() => router.back()}
              className="text-muted hover:border-border h-9 w-9 rounded-xl border border-transparent transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 stroke-2" />
            </Button>
          </div>

          <div className="space-y-1.5 text-right">
            <h1 className="text-foreground text-2xl font-black tracking-tight">
              اصالت و امنیت
            </h1>
            <p className="text-muted text-xs leading-relaxed font-medium">
              جهت ورود به کابین مدیریت دیجی‌استور، شماره همراه خود را احراز
              کنید.
            </p>
          </div>
        </div>

        {/* فیلد ورودی کامپتیبل */}
        <div className="space-y-6">
          <Input
            type="tel"
            dir="ltr"
            isRequired
            autoComplete="off"
            placeholder="۰۹۱۲۰۰۰۰۰۰۰"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            startcontent={<Phone className="text-muted h-4 w-4 stroke-[1.5]" />}
            classnames={{
              inputWrapper:
                "h-14 bg-field-background border-border focus-within:!border-accent focus-within:shadow-[0_0_15px_rgba(var(--accent),0.1)] rounded-2xl transition-all",
              input:
                "text-base font-bold tracking-widest text-field-foreground placeholder:text-muted/60",
            }}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="bg-accent text-accent-foreground h-14 w-full rounded-2xl text-xs font-black shadow-[0_10px_25px_-5px_var(--accent)] transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
          >
            درخواست صدور کد تایید
          </Button>
        </div>

        {/* فوتر امنیتی */}
        <div className="border-separator text-muted mt-8 flex items-center justify-center gap-x-1.5 border-t pt-4 text-[10px] font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>پروتکل رمزنگاری شده سرتاسری TLS 1.3</span>
        </div>
      </Card>
    </form>
  );
}

export default OtpPage;
