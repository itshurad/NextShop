import { Filter, SlidersHorizontal } from "lucide-react";
import AccordionBox from "./AccordionBox";
import ClearAllFilters from "./ClearAllFilters";
import SearchBox from "./SearchBox";
import FastFilter from "./FastFilter";
import ExistProducts from "./ExistProducts";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";

export default function Sidebar() {
  return (
    <aside className="sticky top-26 w-87.5 space-y-6 xl:block">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-foreground text-xl font-black">فیلترها</h2>
          <p className="text-muted mt-0.5 text-[11px] font-bold tracking-wider uppercase">
            جستجوی دقیق‌تر
          </p>
        </div>
        <div className="bg-accent/10 text-accent rounded-2xl p-2">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <SearchBox />
      </Suspense>

      <FastFilter />

      <div className="border-border bg-surface shadow-accent/5 space-y-4 rounded-[24px] border p-5 shadow-2xl">
        <div className="text-foreground mb-6 flex items-center gap-2">
          <Filter className="text-accent h-4 w-4" />
          <h3 className="text-sm font-black tracking-wider uppercase">
            پارامترهای فیلتر
          </h3>
        </div>

        <div className="space-y-4">
          <ExistProducts />

          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <AccordionBox />
          </Suspense>
        </div>

        <ClearAllFilters />
      </div>
    </aside>
  );
}
