/** @type {import('next').NextConfig} */
const nextConfig = {
  // ۱. تنظیمات عکس‌ها
  images: {
    remotePatterns: [
      {
        // برای حالت لوکال (سیستم خودتان)
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        // برای حالت پروداکشن (روی سرور Vercel)
        protocol: "https",
        hostname: "next-shop-backend-hazel.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // ۲. اضافه کردن پروکسی (Rewrites) برای حل مشکل کوکی‌ها
  async rewrites() {
    return [
      {
        // هر درخواستی که در فرانت به api/ زده شد
        source: "/api/:path*",
        // در پس‌زمینه بدون اینکه مرورگر بفهمد، بفرست به آدرس بک‌اند
        destination: "https://next-shop-backend-hazel.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
