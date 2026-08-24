import "./globals.css";
import { iranFont } from "@/constants/localFont";
import Providers from "./Providers";

export const metadata = {
  title: {
    template: "%s | نکست استور",
    default: "نکست استور | فروشگاه اینترنتی",
  },
  description: "بهترین تجربه خرید اینترنتی با نکست استور",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${iranFont.variable} min-h-screen antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
