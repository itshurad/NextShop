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
  handleCheckOtp,
  setOtp,
  onResendOtp,
  otp,
  time,
  isLoadingCheck,
  isLoadingResend,
}) {
  return (
    <form onSubmit={handleCheckOtp} className="animate-fadeIn w-full">
      <Card className="border-border bg-surface rounded-[24px] border p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        {/* هدر تایید فرکانس امنیتی */}
        <div className="mb-8 flex flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <div className="text-accent flex items-center gap-x-2">
              <KeyRound className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-[0.15em]">
                SECURE GATEWAY
              </span>
            </div>

            <Button
              isIconOnly
              variant="light"
              onPress={() => setStep(0)}
              className="text-muted hover:border-border h-9 w-9 rounded-xl border border-transparent transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 stroke-2" />
            </Button>
          </div>

          <div className="space-y-1.5 text-right">
            <h1 className="text-foreground text-2xl font-black tracking-tight">
              گذرواژه یکبار مصرف
            </h1>
            <p className="text-muted text-xs leading-relaxed font-medium">
              کد امنیتی ارسال شده به شماره{" "}
              <span className="dir-ltr text-accent mx-0.5 inline-block font-black">
                {phoneNumber}
              </span>{" "}
              را وارد کنید.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          {/* باکس‌های لوکس ورود کد */}
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              classnames={{
                wrapper: "gap-x-2",
                segment: [
                  "h-14 w-12 rounded-2xl",
                  "text-lg font-black text-field-foreground",
                  "bg-field-accent border-border",
                  "transition-all duration-300",
                  "focus-within:!border-accent focus-within:shadow-[0_0_15px_rgba(var(--accent),0.1)]",
                ],
                separator: "font-bold mx-1 text-separator",
              }}
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
          <div className="flex min-h-10 items-center justify-center">
            {time > 0 ? (
              <div className="border-border bg-surface-secondary flex items-center gap-x-2 rounded-xl border px-3 py-2 transition-all duration-300">
                <Timer className="text-accent h-3.5 w-3.5 animate-pulse" />
                <span className="text-muted text-[11px] font-bold">
                  <span className="dir-ltr text-foreground mx-1 inline-block min-w-4 text-center font-black">
                    {time}
                  </span>
                  ثانیه تا شانس مجدد
                </span>
              </div>
            ) : (
              <Button
                variant="light"
                size="sm"
                onClick={onResendOtp}
                isLoading={isLoadingResend}
                className="text-accent hover:bg-accent/10 rounded-xl text-xs font-black transition-all duration-300"
                startcontent={
                  !isLoadingResend && (
                    <RotateCcw className="h-3.5 w-3.5 stroke-2" />
                  )
                }
              >
                ارسال مجدد فرکانس کد
              </Button>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isLoadingCheck}
            className="bg-accent text-accent-foreground h-14 w-full rounded-2xl text-xs font-black shadow-[0_10px_25px_-5px_var(--accent)] transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
          >
            رمزگشایی و ورود به داشبورد
          </Button>
        </div>

        {/* فوتر امنیتی پایانی */}
        <div className="border-separator text-muted mt-8 flex items-center justify-center gap-x-1.5 border-t pt-4 text-[10px] font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>پروتکل رمزنگاری شده سرتاسری TLS 1.3</span>
        </div>
      </Card>
    </form>
  );
}

export default CheckOtpPage;
