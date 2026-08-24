import { Sparkles } from "lucide-react";
import queryString from "query-string";
import MobileFilter from "../../components/MobileFilter";
// import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";
import ProductCard from "../../components/ProductCard";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const result = await getProducts(queryString.stringify(params));

  const products = result?.products || [];

  return (
    <main className="mx-auto w-full px-2 pb-24 md:px-6">
      <div className="border-border from-surface to-surface-secondary/50 shadow-accent/5 relative mb-8 flex flex-col justify-between overflow-hidden rounded-[40px] border bg-linear-to-br p-6 shadow-2xl md:flex-row md:items-center md:p-12">
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

          <h1 className="text-foreground text-3xl leading-tight font-black tracking-tight md:text-6xl flex items-center gap-2">
            محصولات
            <span className="text-accent relative">
              ویژه
              <span className="bg-accent/10 absolute bottom-1 left-0 h-1/5 w-full rounded-full"></span>
            </span>
          </h1>

          <p className="text-muted max-w-xl text-sm leading-relaxed font-medium md:text-base">
            دنیایی از تکنولوژی و کیفیت در دستان شما. ما بهترین‌ها را برای سلیقه
            خاص شما گلچین کرده‌ایم؛ بدون سازش در جزئیات.
          </p>
        </div>

        <div className="border-border bg-surface/60 mt-8 hidden items-center gap-8 rounded-3xl border p-6 shadow-inner backdrop-blur-md md:mt-0 md:flex">
          <div className="flex flex-col items-center px-2">
            <span className="text-foreground text-3xl font-black tracking-tight">
              ۱۵+
            </span>
            <span className="text-muted mt-1 text-[10px] font-black tracking-wider uppercase">
              برند برتر
            </span>
          </div>
          <div className="bg-border h-10 w-px"></div>
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

      <MobileFilter totalProducts={products?.length || 0} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
