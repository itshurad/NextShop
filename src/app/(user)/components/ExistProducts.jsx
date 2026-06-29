import React from "react";
import SwitchBox from "./Switch";
import { Package } from "lucide-react";

function ExistProducts() {
  return (
    <div className="mx-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* هماهنگ‌سازی پس‌زمینه و آیکون با رنگ موفقیت/موجودی (Success) تم */}
        <div className="bg-success/10 rounded-lg p-1.5">
          <Package className="text-success h-4 w-4" />
        </div>
        {/* تغییر رنگ متن به رنگ اصلی متون تم */}
        <span className="text-foreground text-sm font-black">
          فقط کالاهای موجود
        </span>
      </div>
      <SwitchBox />
    </div>
  );
}

export default ExistProducts;
