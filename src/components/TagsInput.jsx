"use client";

import React, { useState } from "react";
import { Chip, Input } from "@heroui/react";

export default function CustomTagsInput({ value = [], onChange, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // حذف آخرین تگ با زدن کلید Backspace
      onChange(value.slice(0, -1));
    }
  };

  const handleRemove = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border p-3 focus-within:border-primary">
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
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
      />
    </div>
  );
}