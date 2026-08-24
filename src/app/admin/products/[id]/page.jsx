"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductForm from "../_/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  return (
    <div>
      <ProductForm id={id} />
    </div>
  );
}
