import { getProducts } from "@/services/productService";
import Link from "next/link";
import Image from "next/image";
import { Tag, Sparkles, ArrowLeft, ShoppingBag } from "lucide-react";
import { Chip } from "@heroui/react";
import queryString from "query-string";
import LikeButton from "../../components/LikeButton";
// 🟢 وارد کردن کامپوننت کلاینتی فیلتر موبایل
import MobileFilter from "../../components/MobileFilter";

export default async function page({ searchParams }) {
  const { products } = await getProducts(
    queryString.stringify(await searchParams),
  );

  return (
    <main className="mx-auto w-full px-2 pb-24 md:px-6">
      {/* 🔮 هدر غول‌پیکر و باابهت بالای صفحه (Hero Header) */}
      <div className="border-border from-surface to-surface-secondary/50 shadow-accent/5 relative mb-8 flex flex-col justify-between overflow-hidden rounded-[40px] border bg-gradient-to-br p-6 shadow-2xl md:flex-row md:items-center md:p-12">
        <div className="bg-accent/10 absolute top-0 left-0 -z-10 h-80 w-80 rounded-full blur-[130px]" />
        <div className="bg-accent/5 absolute right-0 bottom-0 -z-10 h-80 w-80 rounded-full blur-[130px]" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-accent h-2.5 w-8 rounded-full" />
            <span className="text-accent flex items-center gap-1 text-[11px] font-black tracking-[0.25em] uppercase">
              <Sparkles className="h-3 w-3 animate-pulse" /> Explore Our Premium
              Collection
            </span>
          </div>

          <h1 className="text-foreground text-3xl leading-tight font-black tracking-tight md:text-6xl">
            محصولات{" "}
            <span className="text-accent relative">
              ویژه
              <span className="bg-accent/10 absolute bottom-1 left-0 h-[6px] w-full rounded-full"></span>
            </span>
          </h1>

          <p className="text-muted max-w-xl text-sm leading-relaxed font-medium md:text-base">
            دنیایی از تکنولوژی و کیفیت در دستان شما. ما بهترین‌ها را برای سلیقه
            خاص شما گلچین کرده‌ایم؛ بدون سازش در جزئیات.
          </p>
        </div>

        {/* بخش آمار لوکس سایدبار هدر */}
        <div className="border-border bg-surface/60 mt-8 hidden items-center gap-8 rounded-3xl border p-6 shadow-inner backdrop-blur-md md:mt-0 md:flex">
          <div className="flex flex-col items-center px-2">
            <span className="text-foreground text-3xl font-black tracking-tight">
              ۱۵+
            </span>
            <span className="text-muted mt-1 text-[10px] font-black tracking-wider uppercase">
              برند برتر
            </span>
          </div>
          <div className="bg-border h-10 w-[1px]"></div>
          <div className="flex flex-col items-center px-2">
            <span className="text-foreground text-3xl font-black tracking-tight">
              ۹۸٪
            </span>
            <span className="text-muted mt-1 text-[10px] font-black tracking-wider uppercase">
              رضایت مشتری
            </span>
          </div>
        </div>
      </div>

      {/* 🟢 تزریق کامپوننت فیلتر موبایل (بدون ایجاد خلل در حالت سرور ساید کل صفحه) */}
      <MobileFilter totalProducts={products?.length || 0} />

      {/* ⚡ گرید محصولات حجیم و مقتدر */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {products?.map((product) => {
          const discountPercent =
            product.discount && product.price
              ? Math.round((product.discount / product.price) * 100)
              : 0;

          return (
            <div
              key={product._id}
              className="group border-border/80 bg-surface shadow-accent/5 hover:shadow-accent/10 relative flex flex-col rounded-[24px] border p-2.5 shadow-2xl transition-all duration-500 hover:-translate-y-2.5 md:rounded-[36px] md:p-4"
            >
              {/* 🖼️ کانتینر تصویر محصول */}
              <div className="bg-surface-secondary relative flex aspect-square max-h-[300px] w-full items-center justify-center overflow-hidden rounded-[18px] p-2 md:rounded-[22px] md:p-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={product.imageLink}
                    alt={product.title}
                    fill
                    sizes="(max-w: 768px) 50vw, 300px"
                    unoptimized
                    className="h-full w-full rounded-[18px] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06] md:rounded-[38px]"
                  />
                </Link>

                {/* دکمه لایک معلق شیشه‌ای لوکس روی تصویر */}
                <div className="absolute top-2 right-2 z-10 transition-transform duration-300 hover:scale-110 md:top-4 md:right-4">
                  <LikeButton
                    product={product}
                    className="bg-danger/10 text-danger hover:bg-danger rounded-xl p-2.5 shadow-sm backdrop-blur-md transition-all hover:text-white md:rounded-2xl md:p-3"
                  />
                </div>

                {/* بج تخفیف شیک */}
                {discountPercent > 0 && (
                  <Chip className="bg-danger/10 text-danger border-danger/20 absolute top-2 left-2 h-6 rounded-lg border px-1.5 text-[9px] font-black shadow-sm md:top-4 md:left-4 md:h-7 md:rounded-xl md:px-2.5 md:text-[11px]">
                    {discountPercent}% تخفیف
                  </Chip>
                )}

                {/* بج برند مهندسی شده */}
                <div className="border-border bg-surface/90 text-foreground/80 absolute right-4 bottom-4 hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[10px] font-black tracking-wide shadow-sm backdrop-blur-md md:flex">
                  <Tag className="text-accent h-3 w-3" />
                  {product.brand || "FLAGSHIP"}
                </div>
              </div>

              {/* 📋 محتوای بدنه کارت با پدینگ و خوانایی متراکم */}
              <div className="flex flex-1 flex-col pt-3 md:p-4 md:pt-5">
                {/* وضعیت موجودی زنده انبار و دسته‌بندی */}
                <div className="text-muted mb-2 flex items-center justify-between text-[8px] font-black tracking-wide md:mb-3.5 md:text-[10px]">
                  <div className="border-success/10 bg-success/5 text-success flex items-center gap-1 rounded-lg border md:gap-1.5 md:px-2.5 md:py-1">
                    <span className="bg-success h-1 w-1 animate-pulse rounded-full md:h-1.5 md:w-1.5"></span>
                    موجود
                  </div>
                  <div className="bg-surface-secondary text-foreground/70 rounded-lg px-2 py-0.5 font-bold md:px-2.5 md:py-1">
                    {product.category?.title}
                  </div>
                </div>

                {/* عنوان محصول باابهت و خوانا */}
                <Link href={`/products/${product.slug}`}>
                  <h2 className="group-hover:text-accent text-foreground mb-2 line-clamp-2 text-xs font-black tracking-tight transition-colors md:mb-4 md:line-clamp-1 md:text-xl">
                    {product.title}
                  </h2>
                </Link>

                {/* 💳 فوتر کارت: ساختار لایه‌ای قیمت و دکمه اکشن خرید */}
                <div className="border-border mt-auto space-y-3 border-t pt-3 md:space-y-4 md:pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted hidden text-[11px] font-black tracking-wider uppercase md:inline">
                      بهای نهایی کالا:
                    </span>
                    <div className="flex w-full flex-col items-end md:w-auto">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-foreground text-base font-black tracking-tight md:text-2xl">
                          {(product.offPrice || product.price).toLocaleString(
                            "fa-IR",
                          )}
                        </span>
                        <span className="text-muted text-[10px] font-black">
                          تومان
                        </span>
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-muted text-[10px] font-bold tracking-tight line-through opacity-70 md:text-xs">
                          {product.price.toLocaleString("fa-IR")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* دکمه اکشن ماکسیمال */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="group/btn border-accent/20 bg-accent/5 text-accent hover:bg-accent hover:shadow-accent/20 flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-black shadow-sm transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-lg md:rounded-2xl md:px-5 md:py-4 md:text-sm"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 stroke-[2.5] md:h-4 md:w-4" />
                    <span className="hidden sm:inline">
                      مشاهده و اصالت‌سنجی خرید
                    </span>
                    <span className="sm:hidden">خرید و بررسی</span>
                    <ArrowLeft className="mr-0.5 h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover/btn:-translate-x-1 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
