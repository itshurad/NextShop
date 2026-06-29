"use client";
import React from "react";
import { Button, Card, InputOTP } from "@heroui/react";
import {
  ArrowLeft,
  Timer,
  RotateCcw,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

function CheckOtpPage({
  phoneNumber,
  setStep,
  handelCheckOtp,
  setOtp,
  onResendOtp,
  otp,
  time,
}) {
  return (
    <form onSubmit={handelCheckOtp} className="animate-fadeIn w-full">
      <Card
        className="gap-y-8 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          borderRadius: "calc(var(--radius) * 3)",
          borderWidth: "1px",
        }}
      >
        {/* هدر تایید فرکانس امنیتی */}
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <KeyRound
                className="h-4 w-4"
                style={{ color: "var(--accent)" }}
              />
              <span
                className="text-[10px] font-black tracking-[0.15em]"
                style={{ color: "var(--accent)" }}
              >
                SECURE GATEWAY
              </span>
            </div>

            <Button
              isIconOnly
              variant="light"
              onPress={() => setStep(0)}
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
              گذرواژه یکبار مصرف
            </h1>
            <p
              className="text-xs leading-relaxed font-medium"
              style={{ color: "var(--muted)" }}
            >
              کد امنیتی ارسال شده به شماره{" "}
              <span
                className="dir-ltr mx-0.5 inline-block font-black"
                style={{ color: "var(--accent)" }}
              >
                {phoneNumber}
              </span>{" "}
              را وارد کنید.
            </p>
          </div>
        </div>

        {/* باکس‌های لوکس تایید هویت بر اساس متغیرهای تم */}
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              classNames={{
                wrapper: "gap-x-2.5",
                segment: [
                  "h-14 w-12",
                  "text-lg font-black",
                  "bg-[var(--field-background)]",
                  "border border-[var(--border)]",
                  "rounded-[var(--field-radius)]",
                  "transition-all duration-300",
                  "focus-within:!border-[var(--focus)] focus-within:shadow-[0_0_15px_var(--focus)]",
                  "focus-within:!ring-0",
                ],
                separator: "font-bold mx-0.5 text-[var(--separator)]",
              }}
              style={{ color: "var(--field-foreground)" }}
            >
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP>
          </div>

          {/* زمان‌سنج هوشمند به سبک مینی‌مال */}
          <div className="flex min-h-[40px] items-center justify-center">
            {time > 0 ? (
              <div
                className="flex items-center gap-x-2 border px-3 py-2 text-slate-400 transition-all duration-300"
                style={{
                  background: "var(--surface-secondary)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <Timer
                  className="h-3.5 w-3.5 animate-pulse"
                  style={{ color: "var(--accent)" }}
                />
                <span
                  className="text-[11px] font-bold"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    className="dir-ltr inline-block min-w-[16px] text-center font-black"
                    style={{ color: "var(--foreground)" }}
                  >
                    {time}
                  </span>{" "}
                  ثانیه تا شانس مجدد
                </span>
              </div>
            ) : (
              <Button
                variant="light"
                size="sm"
                onClick={onResendOtp}
                className="text-xs font-black transition-all duration-300 hover:opacity-80"
                style={{
                  color: "var(--accent)",
                  borderRadius: "var(--radius)",
                }}
                startContent={<RotateCcw className="h-3.5 w-3.5 stroke-[2]" />}
              >
                ارسال مجدد فرکانس کد
              </Button>
            )}
          </div>

          {/* دکمه ورود نهایی کامپتیبل با پوسته استایل اختصاصی شما */}
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
            رمزگشایی و ورود به داشبورد
          </Button>
        </div>

        {/* فوتر امنیتی پایانی */}
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

export default CheckOtpPage;
