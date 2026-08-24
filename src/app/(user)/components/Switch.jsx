"use client";
import { Switch, toast } from "@heroui/react";
import React, { useState } from "react";

export default function SwitchBox() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    toast.info("این بخش به زودی در دسترس قرار می‌گیرد");
    setEnabled(!enabled);
  };

  return (
    <Switch
      isSelected={enabled}
      onChange={handleToggle}
      dir="ltr"
      color="success"
    >
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
}
