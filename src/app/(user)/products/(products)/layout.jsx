import React from "react";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* سایدبار در دسکتاپ نمایش داده می‌شود و در موبایل مدیریت آن با هدر است */}
      <div className="hidden pt-4 pr-4 md:pt-6 md:pr-6 lg:sticky lg:top-0 lg:block lg:h-screen lg:py-8 lg:pr-8">
        <Sidebar />
      </div>

      {/* محتوای اصلی */}
      <div className="w-full flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
