/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**", // این یعنی اجازه دسترسی به تمام فولدرها روی پورت 5000 لوکال‌هاست
      },
    ],
  },
};

export default nextConfig;
