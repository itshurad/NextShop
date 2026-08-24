"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryForm from "../_/CategoryForm";

export default function EditCategoryPage() {
  const { id } = useParams();

  return (
    <div>
      <CategoryForm id={id} />
    </div>
  );
}
