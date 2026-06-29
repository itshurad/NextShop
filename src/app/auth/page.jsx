"use client";
import React, { useEffect, useState } from "react";
import OtpPage from "./pages/OtpPage";
import CheckOtpPage from "./pages/CheckOtpPage";
import { useCheckOtp, useGetOtp } from "@/hooks/useAuth";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

const RESEND_TIME = 60;

function Page() {
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const [otp, setOtp] = useState("");

  const { mutateAsync: checkOtp } = useCheckOtp();
  const { mutateAsync: getOtp } = useGetOtp();
  const router = useRouter();

  const handelGetOtp = async (e) => {
    e.preventDefault();
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

  const handelCheckOtp = async (e) => {
    e.preventDefault();
    try {
      const { message } = await checkOtp({ phoneNumber, otp });
      toast.success(message || "احراز هویت انجام شد.");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "کد وارد شده معتبر نیست.");
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden p-4 [color:var(--foreground)] antialiased transition-colors duration-500 select-none [background:var(--background)]">
      {/* هاله‌های نوری شناور که بر اساس رنگ اکسنت تم تو هندل می‌شوند */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[140px] [background:var(--accent)]" />

      <div className="z-10 w-full max-w-[420px]">
        {step === 0 ? (
          <OtpPage
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setStep={setStep}
            handelGetOtp={handelGetOtp}
          />
        ) : (
          <CheckOtpPage
            phoneNumber={phoneNumber}
            setStep={setStep}
            handelCheckOtp={handelCheckOtp}
            setOtp={setOtp}
            otp={otp}
            time={time}
            onResendOtp={handelGetOtp}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
