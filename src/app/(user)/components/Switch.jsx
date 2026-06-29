"use client";
import { Switch, toast } from "@heroui/react";
import React, { useState } from "react";
function SwitchBox() {
  // const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      onChange={() => toast.info("این بخش به زودی در دسترس قرار میگیرد")}
      dir="ltr"
    >
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
}

export default SwitchBox;
