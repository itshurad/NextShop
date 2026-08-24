"use client";

import React from "react";
import CategoryForm from "../../_/CategoryForm";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();

  return (
    <div>
      <CategoryForm id={id} />
    </div>
  );
}
