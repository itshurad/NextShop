import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="bg-background text-foreground selection:bg-accent/20 flex min-h-screen flex-col">
      <Header />
      <div className="w-full flex-1">{children}</div>
      <Footer />
    </div>
  );
}
