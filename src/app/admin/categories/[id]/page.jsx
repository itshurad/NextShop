"use client";
import React from "react";
import CategoryForm from "../_/CategoryForm";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  return (
    <div>
      <CategoryForm id={id} />
    </div>
  );
}

export default page;
