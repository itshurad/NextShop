"use client";

import Link from "next/link";
import { ArrowRight, Home, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      <div
        className="text-foreground pointer-events-none absolute inset-0 animate-pulse opacity-[0.04] duration-4000"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-all duration-700 ease-out">
        <h1 className="text-accent/10 font-sans text-[20vw] font-black tracking-tighter opacity-80 sm:text-[15vw]">
          404
        </h1>
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center sm:max-w-md">
        <div className="mb-8">
          <div className="group relative cursor-pointer">
            <div className="bg-primary/20 group-hover:bg-primary/30 absolute inset-0 animate-ping rounded-full opacity-60" />
            <div className="border-border bg-surface-secondary shadow-primary/10 text-primary relative transform rounded-3xl border p-6 shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
              <SearchX className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
          </div>
        </div>

        <h2 className="text-foreground z-20 mb-3 text-2xl font-black sm:text-3xl">
          صفحه مورد نظر پیدا نشد!
        </h2>

        <p className="text-muted mb-8 px-2 text-sm leading-relaxed sm:text-base">
          ممکن است آدرس صفحه تغییر کرده باشد یا این صفحه به طور کلی از روی سرور
          حذف شده باشد.
        </p>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => router.back()}
            variant="flat"
            className="group text-foreground bg-default-100 hover:bg-default-200 h-12 w-full rounded-2xl text-sm font-black transition-all duration-300 active:scale-95 sm:w-auto sm:px-8"
            startcontent={
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            }
          >
            بازگشت به عقب
          </Button>

          <Button
            as={Link} // استفاده از خاصیت as برای تبدیل دکمه به لینک استاندارد Next.js
            href="/"
            color="primary"
            variant="solid"
            className="group shadow-primary/25 h-12 w-full rounded-2xl text-sm font-black shadow-xl transition-all duration-300 active:scale-95 sm:w-auto sm:px-8"
            startcontent={
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            }
          >
            صفحه اصلی
          </Button>
        </div>
      </div>

      <div className="text-muted absolute bottom-6 font-sans text-[10px] font-bold tracking-widest uppercase opacity-50">
        Error Code: 404
      </div>
    </main>
  );
}
