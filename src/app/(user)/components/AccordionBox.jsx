"use client";
import { useGetCategories } from "@/hooks/useCategories";
import {
  Accordion,
  Checkbox,
  Label,
  Radio,
  RadioGroup,
  Spinner,
} from "@heroui/react";
import { ChevronDown, Layers3, ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT = [
  { value: "earliest", title: "قدیمی‌ترین", name: "product-sort", _id: "1" },
  { value: "latest", title: "جدیدترین", name: "product-sort", _id: "2" },
  { value: "popular", title: "محبوب‌ترین", name: "product-sort", _id: "3" },
];

export default function AccordionBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  const categoryParam = searchParams.get("category");
  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const sortCategory = searchParams.get("sort") || "";

  const handleSelected = (value) => {
    let updatedCategories;
    if (selectedCategories.includes(value)) {
      updatedCategories = selectedCategories.filter((c) => c !== value);
    } else {
      updatedCategories = [...selectedCategories, value];
    }

    const params = new URLSearchParams(searchParams.toString());
    if (updatedCategories.length > 0) {
      params.set("category", updatedCategories.join(","));
    } else {
      params.delete("category");
    }
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  const handleSortCategory = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <Accordion hideSeparator className="w-full space-y-2">
      {/* ---------------- بخش دسته‌بندی محصولات ---------------- */}
      <Accordion.Item>
        <Accordion.Heading>
          {/* استایل تریگر یکدست شد */}
          <Accordion.Trigger className="hover:bg-default-100 w-full rounded-xl px-3 py-3 transition-colors">
            <div className="flex flex-1 items-center gap-3">
              {/* استایل آیکون یکدست شد */}
              <div className="bg-accent/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <Layers3 className="text-accent h-4 w-4" />
              </div>
              <span className="text-foreground text-sm font-black">
                دسته‌بندی محصولات
              </span>
            </div>
            <Accordion.Indicator>
              <ChevronDown className="text-muted h-4 w-4" />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>

        <Accordion.Panel>
          {/* پدینگ‌ها و فاصله‌ها استاندارد شد */}
          <Accordion.Body className="flex flex-col gap-2 px-5 pt-1 pb-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Spinner size="sm" />
              </div>
            ) : (
              categories?.map((category) => (
                <Checkbox
                  value={category.englishTitle}
                  isSelected={selectedCategories.includes(
                    category.englishTitle,
                  )}
                  onChange={() => handleSelected(category.englishTitle)}
                  name="product-type"
                  key={category._id}
                  id={category._id}
                  variant="secondary"
                  // افکت هاور و فاصله برای چک‌باکس‌ها
                  className="hover:bg-default-100 w-full rounded-lg p-2 transition-colors"
                >
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content>
                    <Label
                      className="text-foreground/90 cursor-pointer text-xs font-bold"
                      htmlFor={category._id}
                    >
                      {category.title}
                    </Label>
                  </Checkbox.Content>
                </Checkbox>
              ))
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      {/* ---------------- بخش مرتب‌سازی محصولات ---------------- */}
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger className="hover:bg-default-100 w-full rounded-xl px-3 py-3 transition-colors">
            <div className="flex flex-1 items-center gap-3">
              <div className="bg-accent/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                <ArrowUpDown className="text-accent h-4 w-4" />
              </div>
              <span className="text-foreground text-sm font-black">
                مرتب‌سازی محصولات
              </span>
            </div>
            <Accordion.Indicator>
              <ChevronDown className="text-muted h-4 w-4" />
            </Accordion.Indicator>
          </Accordion.Trigger>
        </Accordion.Heading>

        <Accordion.Panel>
          {/* دقیقاً همون پدینگ‌های بخش بالا رو اینجا هم گذاشتم تا تراز بشن */}
          <Accordion.Body className="px-5 pt-1 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Spinner size="lg" />
              </div>
            ) : (
              <RadioGroup
                variant="secondary"
                value={sortCategory}
                onChange={handleSortCategory}
                name="product-sort"
                className="flex flex-col gap-2"
              >
                {SORT.map((item) => (
                  <Radio
                    key={item._id}
                    value={item.value}
                    // کلاس‌ها با چک‌باکس‌های بالا مچ شدند
                    className="hover:bg-default-100 w-full rounded-lg px-2 transition-colors"
                  >
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content className="flex-1">
                      <Label className="text-foreground/90 block w-full cursor-pointer text-xs font-bold">
                        {item.title}
                      </Label>
                    </Radio.Content>
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
