"use client";

import React, { useState } from "react";
import { Chip } from "@heroui/react"; // فقط Chip نیاز است

export default function CustomTagsInput({ value = [], onChange, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    // باگ برطرف شده: پشتیبانی از کامای فارسی (،)
    if (e.key === "Enter" || e.key === "," || e.key === "،") {
      e.preventDefault();
      const trimmed = inputValue.replace(/,|،/g, "").trim(); // کاما را از متن حذف می‌کنیم
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemove = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="border-border bg-default focus-within:border-accent focus-within:bg-surface focus-within:ring-accent/20 flex min-h-12 flex-wrap items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-200 focus-within:ring-2">
      {value.map((tag, index) => (
        <Chip
          key={index}
          onClose={() => handleRemove(tag)}
          variant="flat"
          color="primary"
          className="font-medium"
        >
          {tag}
        </Chip>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="text-foreground placeholder:text-muted flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
}
