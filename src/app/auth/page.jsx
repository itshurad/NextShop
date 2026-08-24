"use client";
import React, { useEffect, useState } from "react";
import OtpPage from "./pages/OtpPage";
import CheckOtpPage from "./pages/CheckOtpPage";
import { useCheckOtp, useGetOtp } from "@/hooks/useAuth";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const RESEND_TIME = 60;

export default function AuthPage() {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const [otp, setOtp] = useState("");

  // استخراج isPending برای جلوگیری از کلیک‌های تکراری و نمایش لودینگ
  const { mutateAsync: checkOtp, isPending: isChecking } = useCheckOtp();
  const { mutateAsync: getOtp, isPending: isGetting } = useGetOtp();
  const router = useRouter();

  const handleGetOtp = async (e) => {
    if (e) e.preventDefault();
    try {
      const { message } = await getOtp({ phoneNumber });
      toast.success(message || "کد امنیتی صادر شد.");
      setTime(RESEND_TIME);
      setStep(1);
      setOtp("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در برقراری ارتباط با سرور",
      );
    }
  };

  const handleCheckOtp = async (e) => {
    e.preventDefault();
    try {
      const { message } = await checkOtp({ phoneNumber, otp });
      toast.success(message || "احراز هویت انجام شد.");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "کد وارد شده معتبر نیست.");
    }
  };

  // تایمر بهینه و استاندارد جلوگیری از Memory Leak
  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 antialiased transition-colors duration-500 select-none">
      {/* هاله نوری پس‌زمینه */}
      <div className="bg-accent pointer-events-none absolute top-1/4 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 rounded-full opacity-[0.05] blur-[140px]" />

      <div className="z-10 w-full max-w-105">
        {step === 0 ? (
          <OtpPage
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setStep={setStep}
            handleGetOtp={handleGetOtp}
            isLoading={isGetting}
          />
        ) : (
          <CheckOtpPage
            phoneNumber={phoneNumber}
            setStep={setStep}
            handleCheckOtp={handleCheckOtp}
            setOtp={setOtp}
            otp={otp}
            time={time}
            onResendOtp={handleGetOtp}
            isLoadingCheck={isChecking}
            isLoadingResend={isGetting}
          />
        )}
      </div>
    </div>
  );
}
