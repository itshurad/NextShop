"use client";
import { Suspense, useState } from "react";
import { SlidersHorizontal, X, Filter } from "lucide-react";
import { Button, Spinner } from "@heroui/react";

import SearchBox from "./SearchBox";
import FastFilter from "./FastFilter";
import ExistProducts from "./ExistProducts";
import AccordionBox from "./AccordionBox";
import ClearAllFilters from "./ClearAllFilters";

export default function MobileFilter({ totalProducts }) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <>
      <div className="border-border bg-surface sticky top-20 z-30 mb-6 flex w-full items-center justify-between rounded-2xl border p-3 shadow-md lg:hidden">
        <span className="text-foreground/80 text-xs font-black">
          تعداد کالاها: {totalProducts} عدد
        </span>
        <button
          onClick={() => setIsOpenFilter(true)}
          className="border-accent/20 bg-accent/10 text-accent flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-black shadow-sm transition-transform active:scale-95"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>فیلتر و جستجو</span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 lg:hidden ${
          isOpenFilter
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setIsOpenFilter(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        />

        <div
          className={`bg-surface absolute inset-x-0 bottom-0 flex h-[75vh] max-h-[85vh] flex-col rounded-t-[32px] p-4 shadow-2xl transition-transform duration-300 ease-out ${
            isOpenFilter ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="bg-border mx-auto mb-3 h-1.5 w-12 rounded-full" />

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-foreground text-lg font-black">فیلترها</h2>
              <p className="text-muted mt-0.5 text-[10px] font-bold tracking-wider uppercase">
                جستجوی دقیق‌تر (نسخه موبایل)
              </p>
            </div>
            <button
              onClick={() => setIsOpenFilter(false)}
              className="bg-accent/10 text-accent hover:bg-accent/20 rounded-xl p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-5 overflow-y-auto px-1 pt-2 pb-20">
            <SearchBox />
            <FastFilter />

            <div className="border-border bg-surface-secondary/30 rounded-[24px] border p-5 shadow-sm">
              <div className="text-foreground mb-6 flex items-center gap-2">
                <Filter className="text-accent h-4 w-4" />
                <h3 className="text-sm font-black tracking-wider uppercase">
                  پارامترهای فیلتر
                </h3>
              </div>

              <div className="space-y-2">
                <ExistProducts />
                <Suspense
                  fallback={
                    <div className="flex justify-center">
                      <Spinner />
                    </div>
                  }
                >
                  <AccordionBox />
                </Suspense>
              </div>

              <div className="mt-4">
                <ClearAllFilters />
              </div>
            </div>
          </div>

          <div className="border-border bg-surface absolute inset-x-0 bottom-0 border-t p-4">
            <Button
              onClick={() => setIsOpenFilter(false)}
              className="bg-accent shadow-accent/20 h-12 w-full rounded-xl text-sm font-black text-white shadow-lg"
            >
              مشاهده نتایج فیلتر شده
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
