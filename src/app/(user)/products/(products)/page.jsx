import { Sparkles } from "lucide-react";
import queryString from "query-string";
import MobileFilter from "../../components/MobileFilter";
import { getProducts } from "@/services/productService";
import ProductCard from "../../components/ProductCard";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const result = await getProducts(queryString.stringify(params));
  const products = result?.products || [];

  return (
    <main className="mx-auto w-full px-4 pb-24 md:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="border-border from-surface to-surface-secondary/50 shadow-accent/5 relative mb-6 flex flex-col justify-between overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-xl md:mb-8 md:flex-row md:items-center md:rounded-[40px] md:p-12 md:shadow-2xl">
        {/* Background Blurs (Scaled down for mobile) */}
        <div className="bg-accent/10 absolute top-0 left-0 -z-10 h-64 w-64 rounded-full blur-[100px] md:h-80 md:w-80 md:blur-[130px]" />
        <div className="bg-accent/5 absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full blur-[100px] md:h-80 md:w-80 md:blur-[130px]" />

        <div className="relative space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent h-2 w-6 rounded-full md:h-2.5 md:w-8" />
            <span className="text-accent flex items-center gap-1 text-[10px] font-black tracking-[0.2em] uppercase md:text-[11px] md:tracking-[0.25em]">
              <Sparkles className="h-3 w-3 animate-pulse" /> Explore Our Premium
              Collection
            </span>
          </div>

          <h1 className="text-foreground flex flex-wrap items-center gap-2 text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-6xl">
            محصولات
            <span className="text-accent relative">
              ویژه
              <span className="bg-accent/10 absolute bottom-1 left-0 h-1/5 w-full rounded-full"></span>
            </span>
          </h1>

          <p className="text-muted max-w-xl text-xs leading-relaxed font-medium sm:text-sm md:text-base">
            دنیایی از تکنولوژی و کیفیت در دستان شما. ما بهترین‌ها را برای سلیقه
            خاص شما گلچین کرده‌ایم؛ بدون سازش در جزئیات.
          </p>
        </div>

        {/* Stats - Hidden on mobile, visible on desktop */}
        <div className="border-border bg-surface/60 mt-8 hidden items-center gap-6 rounded-3xl border p-5 shadow-inner backdrop-blur-md md:flex lg:gap-8 lg:p-6">
          <div className="flex flex-col items-center px-2">
            <span className="text-foreground text-2xl font-black tracking-tight lg:text-3xl">
              ۱۵+
            </span>
            <span className="text-muted mt-1 text-[9px] font-black tracking-wider uppercase lg:text-[10px]">
              برند برتر
            </span>
          </div>

          <div className="bg-border h-10 w-px"></div>

          <div className="flex flex-col items-center px-2">
            <span className="text-foreground text-2xl font-black tracking-tight lg:text-3xl">
              ۹۸٪
            </span>
            <span className="text-muted mt-1 text-[9px] font-black tracking-wider uppercase lg:text-[10px]">
              رضایت مشتری
            </span>
          </div>
        </div>
      </div>

      <MobileFilter totalProducts={products?.length || 0} />

      {/* Grid: Mobile-First Strategy (1 col on mobile, 2 on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
