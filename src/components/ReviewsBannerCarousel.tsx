"use client";

import { useState } from "react";
import type { Review } from "@/lib/types";
import { StarIcon } from "./icons";

export default function ReviewsBannerCarousel({ reviews }: { reviews: Review[] }) {
  const [idx, setIdx] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  const total = reviews.length;
  const active = reviews[idx % total];

  const handlePrev = () => {
    setIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setIdx((prev) => (prev + 1) % total);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
      <div className="rounded-[32px] overflow-hidden bg-[#111613] text-white p-6 sm:p-10 relative shadow-[0_20px_50px_-20px_rgba(17,22,19,0.45)]">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#027443]/35 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 text-right">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-[#FAA006] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FAA006]" />
              <span dir="ltr" className="font-en">
                COMMUNITY TRUST • 11K+ FOLLOWERS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ثقة عائلات مدينة بدر في دار الخير
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/72 leading-relaxed">
              أكثر من 11 ألف متابع من سكان مدينة بدر يعتمدون على دار الخير هايبر ماركت يوميًا لتوصيل الطلبات بأسعار المجلة الرسمية.
            </p>
          </div>

          <div className="lg:col-span-7">
            <figure className="rounded-[26px] bg-[#FCFAEB] text-[#111613] border border-[#027443]/20 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1 text-[#FAA006]">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span dir="ltr" className="font-en text-xs text-[#027443]">
                  /0{idx + 1} — 0{total}
                </span>
              </div>

              <blockquote className="text-sm sm:text-lg font-extrabold text-[#111613] leading-7 sm:leading-8 text-right">
                &ldquo;{active.text}&rdquo;
              </blockquote>

              <div className="mt-5 pt-4 border-t border-[#027443]/12 flex items-center justify-between gap-3">
                <figcaption className="text-xs sm:text-sm font-black text-[#027443]">
                  {active.name}
                </figcaption>

                <div dir="ltr" className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="الرأي السابق"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 grid place-items-center transition cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="الرأي التالي"
                    className="w-9 h-9 rounded-full bg-[#027443] hover:bg-[#111613] text-white grid place-items-center transition cursor-pointer"
                  >
                    ›
                  </button>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
