"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "@heroui/react";
export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toast.Provider dir="rtl" className="text-right" placement="top" />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
