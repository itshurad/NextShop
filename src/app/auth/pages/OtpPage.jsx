"use client";
import React from "react";
import { InputGroup, TextField, Button, Card, FieldError } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";

function OtpPage({ phoneNumber, setPhoneNumber, handelGetOtp }) {
  const router = useRouter();

  return (
    <form onSubmit={handelGetOtp} className="animate-fadeIn w-full">
      <Card
        className="gap-y-8 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          borderRadius: "calc(var(--radius) * 3)",
          borderWidth: "1px",
        }}
      >
        {/* هدر مینی‌مال ابهت‌دار */}
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div
                className="h-2 w-2 animate-pulse rounded-full shadow-[0_0_12px_var(--accent)]"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="text-[10px] font-black tracking-[0.15em]"
                style={{ color: "var(--muted)" }}
              >
                DIGISTORE SECURE
              </span>
            </div>

            <Button
              isIconOnly
              variant="light"
              onPress={() => router.back()}
              className="h-9 w-9 border border-transparent transition-all duration-300 hover:border-[var(--border)]"
              style={{ borderRadius: "var(--radius)", color: "var(--muted)" }}
            >
              <ArrowLeft className="h-4 w-4 stroke-[2]" />
            </Button>
          </div>

          <div className="space-y-1.5 text-right">
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              اصالت و امنیت
            </h1>
            <p
              className="text-xs leading-relaxed font-medium"
              style={{ color: "var(--muted)" }}
            >
              جهت ورود به کابین مدیریت دیجی‌استور، شماره همراه خود را احراز
              کنید.
            </p>
          </div>
        </div>

        {/* فیلد ورودی کامپتیبل با متغیرهای فرم سازنده */}
        <div className="space-y-6">
          <TextField
            isRequired
            autoComplete="false"
            variant="secondary"
            className="w-full"
            type="text"
            value={phoneNumber}
            onChange={setPhoneNumber}
          >
            <InputGroup
              className="flex h-14 w-full items-center gap-x-3 border border-transparent px-4 transition-all duration-300 focus-within:shadow-[0_0_20px_rgba(0,0,0,0.02)]"
              style={{
                background: "var(--field-background)",
                borderRadius: "var(--field-radius)",
                borderColor: "var(--border)",
              }}
            >
              <InputGroup.Prefix
                className="flex items-center justify-center"
                style={{ color: "var(--muted)" }}
              >
                <Phone className="h-4 w-4 stroke-[1.5]" />
              </InputGroup.Prefix>

              <InputGroup.Input
                dir="ltr"
                className="w-full bg-transparent text-base font-bold tracking-widest focus:outline-none"
                style={{ color: "var(--field-foreground)" }}
                placeholder="۰۹۱۲۰۰۰۰۰۰۰"
              />
            </InputGroup>
            <FieldError
              className="mt-1.5 text-right text-[10px] font-bold"
              style={{ color: "var(--danger)" }}
            />
          </TextField>

          {/* دکمه سالید و پرابهت با رنگ اکسنت بی‌پایان */}
          <Button
            type="submit"
            size="lg"
            className="h-14 w-full text-xs font-black transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              borderRadius: "var(--field-radius)",
              boxShadow: "0 10px 25px -5px var(--accent)",
            }}
          >
            درخواست صدور کد تایید
          </Button>
        </div>

        {/* خط دیوایدر بر اساس معماری جداکننده‌های تم */}
        <div
          className="flex items-center justify-center gap-x-1.5 pt-4 text-[10px] font-medium"
          style={{
            borderTop: "1px solid var(--separator)",
            color: "var(--muted)",
          }}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>پروتکل رمزنگاری شده سرتاسری TLS 1.3</span>
        </div>
      </Card>
    </form>
  );
}

export default OtpPage;
