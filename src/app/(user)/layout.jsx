import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-1 md:flex-auto">{children}</div>
      <Footer />
    </div>
  );
}
