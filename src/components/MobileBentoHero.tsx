"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeroSlide {
  id: string;
  code: string;
  enTag: string;
  titleAr: string;
  subtitleAr: string;
  badge: string;
  href: string;
  image: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: "fresh-cart",
    code: "DAR EL KHAIR 01",
    enTag: "SUPERMARKET & HYPERMARKET",
    titleAr: "كل احتياجات بيتك في مدينة بدر",
    subtitleAr: "ألبان • زيوت • خزين الشهر • توصيل ٢٤ ساعة",
    badge: "عروض المجلة",
    href: "/menu",
    image: "/images/hero-cart.webp",
  },
  {
    id: "cheese-fino",
    code: "DAR EL KHAIR 02",
    enTag: "CHEESE FRIDGE OFFER",
    titleAr: "الجبنة جابت الفينو معاها",
    subtitleAr: "فاتورة ١٠٠ أو ٢٠٠ ج.م معاها عيش فينو طازة هدية",
    badge: "هدية فورية",
    href: "/menu?cat=cheese_bakery",
    image: "/images/cheese-fino-stage.webp",
  },
  {
    id: "microwave-draw",
    code: "DAR EL KHAIR 03",
    enTag: "1000 EGP MEGA GIVEAWAY",
    titleAr: "عدّي الألف واستنى السحب",
    subtitleAr: "تسوق بأكثر من ١٠٠٠ ج.م وادخل السحب على ميكروويف",
    badge: "سحب الميكروويف",
    href: "/occasions",
    image: "/images/products/promo-microwave.webp",
  },
  {
    id: "oils-pantry",
    code: "DAR EL KHAIR 04",
    enTag: "COOKING OILS & PANTRY",
    titleAr: "أقوى خصومات الزيوت والخزين",
    subtitleAr: "الممتاز • صني • قلية • أرز الساعة وحبوبة",
    badge: "وفر حتى ٣٥ ج.م",
    href: "/menu?cat=oils",
    image: "/images/departments/dept-oils.webp",
  },
  {
    id: "dairy-jams",
    code: "DAR EL KHAIR 05",
    enTag: "DAIRY & BREAKFAST SPREADS",
    titleAr: "الألبان والمربى والسبريدات",
    subtitleAr: "جهينة • بخيره • لمار • ماكس تيلا وحلاوة البوادي",
    badge: "طازج يوميًا",
    href: "/menu?cat=dairy",
    image: "/images/departments/dept-dairy.webp",
  },
];

export default function MobileBentoHero() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = SLIDES.length;
  const slide = SLIDES[active];
  const nextSlide = SLIDES[(active + 1) % total];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 36 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 0) {
      setActive((prev) => (prev - 1 + total) % total);
    } else {
      setActive((prev) => (prev + 1) % total);
    }
  };

  return (
    <section className="lg:hidden w-full bg-white px-3.5 pt-2 pb-6 overflow-x-clip">
      {/* Top Bilingual Micro Bar */}
      <div className="flex items-center justify-between text-[11px] font-extrabold text-[#111613]/65 mb-1 px-0.5">
        <span className="text-right text-[#027443] font-black">
          دار الخير هايبر ماركت • مدينة بدر
        </span>
        <span className="font-en tracking-wider text-left text-[#111613]/55">
          OPEN 24/7 • 01270158888
        </span>
      </div>

      {/* Giant Edge-to-Edge ONDERA Wordmark (100% visible above green stage) */}
      <div dir="ltr" className="w-full text-center relative z-10 select-none mb-1.5">
        <h1 className="font-en text-[15vw] leading-[0.88] tracking-tight text-[#027443] uppercase whitespace-nowrap">
          DAR EL KHAIR
        </h1>
      </div>

      {/* Main Sculptural Green Stage Card with Top-Right & Bottom-Left Inverted Cutout Notches */}
      <div
        dir="ltr"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative rounded-[28px] bg-gradient-to-b from-[#027443] via-[#02663B] to-[#014D2C] min-h-[430px] sm:min-h-[460px] flex flex-col justify-between p-4 pb-0 overflow-hidden shadow-[0_20px_50px_-20px_rgba(2,116,67,0.45)]"
      >
        {/* Subtle Radial Ambient Glow behind Centerpiece (ONDERA Lamp Glow style) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FCFAEB]/20 blur-3xl"
        />

        {/* TOP-RIGHT INVERTED CUTOUT NOTCH (Matches ONDERA Mobile Top-Right Dark Circle Button) */}
        <div className="absolute top-0 right-0 z-30 bg-white pl-2.5 pb-2.5 rounded-bl-[26px]">
          <Link
            href={slide.href}
            aria-label="تصفح القسم"
            className="w-12 h-12 rounded-full bg-[#111613] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center shadow-md transition active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="w-5 h-5"
            >
              <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Top Editorial Header inside Green Stage (Clear of Top-Right Cutout Notch via pr-16) */}
        <div dir="rtl" className="relative z-20 pr-16 pl-1 text-right">
          <div className="flex items-center justify-start gap-2 mb-1.5">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#FAA006] text-[#111613] text-[11px] font-black shadow-xs">
              {slide.badge}
            </span>
            <span dir="ltr" className="font-en text-[10px] tracking-wider text-[#FCFAEB]/80 truncate">
              {slide.enTag}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
            {slide.titleAr}
          </h2>
          <p className="text-xs font-bold text-[#FCFAEB]/85 leading-snug mt-0.5">
            {slide.subtitleAr}
          </p>
          <div className="mt-2.5 flex items-center justify-start gap-2">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#111613] px-3.5 py-1.5 text-[11px] font-black shadow-sm active:scale-95 transition"
            >
              <span>تسوق الآن</span>
              <span className="font-en text-[#027443]">↗</span>
            </Link>
            <Link
              href="/offers"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 text-white px-3 py-1.5 text-[11px] font-bold"
            >
              مجلة العروض
            </Link>
          </div>
        </div>

        {/* Bottom Stage: Left Cutout Switcher Window + Right Grounded Hero Visual (Flush at Bottom-0) */}
        <div className="relative z-20 mt-3 flex items-end justify-between gap-2 min-h-[245px]">
          {/* BOTTOM-LEFT INVERTED CUTOUT POCKET (Matches `ONDERA 01` Mini Thumbnail Switcher) */}
          <div className="-ml-4 bg-white pt-2.5 pr-2.5 rounded-tr-[24px] shrink-0 self-end">
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % total)}
              className="group relative w-[122px] h-[126px] rounded-[20px] bg-[#111613] text-white p-2.5 flex flex-col justify-between text-left overflow-hidden shadow-md active:scale-95 transition"
            >
              <div className="w-full flex items-center justify-between">
                <span className="font-en text-[9px] tracking-wider text-[#FAA006]">
                  NEXT
                </span>
                <span className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-[#027443] text-white grid place-items-center text-xs transition-colors">
                  ↗
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nextSlide.image}
                alt={nextSlide.titleAr}
                className="w-16 h-14 mx-auto object-contain rounded-lg"
              />
              <div className="w-full flex items-center justify-between text-[9px] font-en tracking-wider text-white/90 truncate">
                <span className="truncate">{slide.code}</span>
                <span className="text-[#FAA006]">0{active + 1}</span>
              </div>
            </button>
          </div>

          {/* Grounded Hero Visual Flush with Bottom Edge (No Floating Cut Line!) */}
          <div className="flex-1 flex items-end justify-center self-end pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.titleAr}
              className={`w-full max-w-[235px] sm:max-w-[270px] h-[230px] sm:h-[255px] object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.42)] transition-all duration-300 ${
                slide.id === "cheese-fino" || slide.id === "microwave-draw"
                  ? "rounded-t-2xl"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
