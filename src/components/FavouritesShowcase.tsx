"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { QrCodeIcon } from "./icons";

const TABS = [
  { id: "all", label: "أقوى عروض المجلة" },
  { id: "dairy", label: "الألبان" },
  { id: "jams", label: "المربى والحلاوة" },
  { id: "oils", label: "الزيوت" },
  { id: "pasta", label: "المكرونة" },
  { id: "tea_sugar", label: "شاي وسكر" },
  { id: "rice_flour", label: "الدقيق والأرز" },
  { id: "canned", label: "المعلبات" },
  { id: "tomato", label: "صلصة الطماطم" },
  { id: "cheese_bakery", label: "ثلاجة الجبن والبوكسات" },
];

export default function FavouritesShowcase({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (tab === "all") {
      const best = products.filter((p) => p.isBestSeller);
      return best.length >= 6 ? best : products.slice(0, 14);
    }
    return products.filter((p) => p.categoryId === tab);
  }, [products, tab]);

  const scrollTrack = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(320, el.clientWidth * 0.85);
    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-x-clip">
      {/* ONDERA Section Header — Zero small overlines above title */}
      <div
        dir="ltr"
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="flex flex-col items-start">
          <div className="text-left">
            <h2 className="font-en text-3xl sm:text-5xl text-[#111613] leading-[0.94] tracking-tight uppercase">
              CURATED FOR YOUR HOME.
            </h2>
          </div>
          <p
            dir="rtl"
            className="mt-2 text-xs sm:text-sm font-black text-[#027443] text-right"
          >
            جميع أصناف مجلة العروض الرسمية متاحة للطلب الفوري والتوصيل في مدينة بدر
          </p>
        </div>

        {/* Paired Pill + QR + Circle Arrow Button to Full Market */}
        <div className="flex items-center gap-2 self-start md:self-end" dir="ltr">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-menu-qr"));
              }
            }}
            className="rounded-full bg-[#FAA006] hover:bg-[#027443] text-[#111613] hover:text-white px-4 py-2.5 text-xs font-black inline-flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer"
          >
            <QrCodeIcon className="w-3.5 h-3.5" />
            <span>QR المنيو</span>
          </button>
          <Link
            href="/menu"
            className="rounded-full border border-[#111613]/20 hover:border-[#027443] bg-white px-5 py-2.5 text-xs font-black text-[#111613] hover:text-[#027443] whitespace-nowrap transition"
          >
            كل الأقسام
          </Link>
          <Link
            href="/menu"
            aria-label="كل الأقسام"
            className="w-10 h-10 rounded-full bg-[#027443] hover:bg-[#111613] text-white grid place-items-center text-sm font-black transition"
          >
            ↗
          </Link>
        </div>
      </div>

      {/* Department Filter Pills — Full-bleed edge-to-edge on mobile with unclipped vertical padding */}
      <div
        ref={tabsRef}
        className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={(e) => {
                setTab(t.id);
                const btn = e.currentTarget;
                const box = tabsRef.current;
                if (box && btn) {
                  const boxRect = box.getBoundingClientRect();
                  const btnRect = btn.getBoundingClientRect();
                  const delta =
                    btnRect.left + btnRect.width * 0.5 - (boxRect.left + boxRect.width * 0.5);
                  box.scrollBy({ left: delta, behavior: "smooth" });
                }
                if (trackRef.current) {
                  trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-black border transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-[#027443] text-white border-[#027443] shadow-[0_3px_9px_-2px_rgba(2,116,67,0.28)]"
                  : "bg-[#FCFAEB] text-[#111613]/80 border-[#111613]/12 hover:border-[#027443] hover:text-[#027443]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Swipeable Snap Carousel */}
      <div
        ref={trackRef}
        className="mt-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar"
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            className="w-[78vw] max-w-[285px] sm:w-[275px] lg:w-[290px] shrink-0 snap-center"
          >
            <ProductCard product={product} variant="grid" />
          </div>
        ))}
      </div>

      {/* Circular `<` `>` Carousel Scroll Controls */}
      {filtered.length > 1 && (
        <div dir="ltr" className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTrack("left")}
            aria-label="اسحب لليسار"
            className="w-10 h-10 rounded-full bg-[#FCFAEB] hover:bg-[#027443] border border-[#111613]/12 text-[#111613] hover:text-white grid place-items-center transition cursor-pointer"
          >
            ←
          </button>

          <span dir="rtl" className="text-xs font-black text-[#111613]/70 px-2">
            اسحب للتصفح ({filtered.length} صنف)
          </span>

          <button
            type="button"
            onClick={() => scrollTrack("right")}
            aria-label="اسحب لليمين"
            className="w-10 h-10 rounded-full bg-[#FCFAEB] hover:bg-[#027443] border border-[#111613]/12 text-[#111613] hover:text-white grid place-items-center transition cursor-pointer"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
