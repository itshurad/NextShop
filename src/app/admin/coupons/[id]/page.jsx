"use client";
import React from "react";
import { useParams } from "next/navigation";
import CouponForm from "../_/CouponForm";

export default function page() {
  const { id } = useParams();
  return (
    <div>
      <CouponForm id={id} />
    </div>
  );
}
