"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toast } from "@heroui/react";

export default function Providers({ children }) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
        <Toast.Provider
          dir="rtl"
          className="text-right font-sans"
          placement="top"
        />
        {children}
      {/* </NextThemesProvider> */}
    </QueryClientProvider>
  );
}
