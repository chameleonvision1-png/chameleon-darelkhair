"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QrCodeIcon } from "./icons";

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
    id: "dairy-cheese",
    code: "DAR EL KHAIR 02",
    enTag: "FRESH DAIRY & CHEESE FRIDGE",
    titleAr: "الألبان الطازجة وثلاجة الجبن",
    subtitleAr: "فاتورة ١٠٠ أو ٢٠٠ ج.م من الجبن معاها فينو طازة هدية",
    badge: "هدية فورية",
    href: "/menu?cat=dairy",
    image: "/images/departments/dept-dairy.webp",
  },
  {
    id: "oils-pantry",
    code: "DAR EL KHAIR 03",
    enTag: "COOKING OILS & PANTRY",
    titleAr: "أقوى خصومات الزيوت والخزين",
    subtitleAr: "الممتاز • صني • قلية • أرز الساعة وحبوبة",
    badge: "وفر حتى ٣٥ ج.م",
    href: "/menu?cat=oils",
    image: "/images/departments/dept-oils.webp",
  },
  {
    id: "jams-spreads",
    code: "DAR EL KHAIR 04",
    enTag: "JAMS, HALAWA & SPREADS",
    titleAr: "المربى والحلاوة والسبريدات",
    subtitleAr: "ماكس تيلا ١ كجم • مربى وحلاوة البوادي وفيتراك",
    badge: "أسعار المجلة",
    href: "/menu?cat=jams",
    image: "/images/departments/dept-jams.webp",
  },
  {
    id: "pasta-rice",
    code: "DAR EL KHAIR 05",
    enTag: "PASTA, RICE & FLOUR",
    titleAr: "المكرونة والأرز والدقيق",
    subtitleAr: "مكرونة كايرو وبساطة بـ ٩ ج.م • المطبخ ولمتنا بـ ١٢.٥ ج.م",
    badge: "خزين الشهر",
    href: "/menu?cat=pasta",
    image: "/images/departments/dept-pasta.webp",
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
      {/* Giant Edge-to-Edge ONDERA Wordmark directly below Header (Zero extra text above it) */}
      <div dir="ltr" className="w-full text-center relative z-10 select-none mb-1.5">
        <h1 className="font-en text-[15vw] leading-[0.88] tracking-tight text-[#027443] uppercase whitespace-nowrap">
          DAR EL KHAIR
        </h1>
      </div>

      {/* Main Flat Sculptural Green Stage Card (Cutout notches sit outside overflow-hidden so corners are never shaved) */}
      <div
        dir="ltr"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative"
      >
        {/* TOP-RIGHT INVERTED CUTOUT NOTCH with Smooth Radial Concave Fillets */}
        <div className="absolute top-0 right-0 z-30 bg-white pl-2.5 pb-2.5 rounded-bl-[24px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[19px] top-0 w-5 h-5"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, transparent 19.5px, #ffffff 20px)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 -bottom-[19px] w-5 h-5"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, transparent 19.5px, #ffffff 20px)",
            }}
          />
          <Link
            href={slide.href}
            aria-label="تصفح القسم"
            className="w-12 h-12 rounded-full bg-[#111613] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center transition active:scale-95"
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

        {/* BOTTOM-LEFT INVERTED CUTOUT POCKET Pinned to Exact Bottom-Left Corner */}
        <div className="absolute bottom-0 left-0 z-30 bg-white pt-2.5 pr-2.5 rounded-tr-[24px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 -top-[19px] w-5 h-5"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, transparent 19.5px, #ffffff 20px)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[19px] bottom-0 w-5 h-5"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, transparent 19.5px, #ffffff 20px)",
            }}
          />
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % total)}
            className="group relative w-[120px] h-[122px] rounded-[20px] bg-[#111613] text-white p-2.5 flex flex-col justify-between text-left overflow-hidden active:scale-95 transition cursor-pointer"
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
              className="w-16 h-14 mx-auto object-contain"
            />
            <div className="w-full flex items-center justify-between text-[9px] font-en tracking-wider text-white/90 truncate">
              <span className="truncate">{slide.code}</span>
              <span className="text-[#FAA006]">0{active + 1}</span>
            </div>
          </button>
        </div>

        {/* Inner Clipped Green Stage */}
        <div className="rounded-[24px] bg-[#027443] min-h-[410px] sm:min-h-[440px] flex flex-col justify-between p-4 pb-0 overflow-hidden">
          {/* Top Editorial Header inside Green Stage (Clear of Top-Right Cutout Notch via pr-16, zero small overline above title) */}
          <div dir="rtl" className="relative z-20 pr-16 pl-1 pt-1 text-right">
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              {slide.titleAr}
            </h2>
            <p className="text-xs font-bold text-[#FCFAEB]/85 leading-snug mt-1">
              {slide.subtitleAr}
            </p>
            <div className="mt-3 flex items-center justify-start gap-1.5 flex-wrap">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#111613] px-3.5 py-1.5 text-[11px] font-black active:scale-95 transition"
              >
                <span>تسوق الآن</span>
                <span className="font-en text-[#027443]">↗</span>
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center rounded-full border border-white/35 bg-white/10 text-white px-3 py-1.5 text-[11px] font-bold"
              >
                مجلة العروض
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-menu-qr"));
                  }
                }}
                className="inline-flex items-center gap-1 rounded-full bg-[#FAA006] text-[#111613] px-3 py-1.5 text-[11px] font-black active:scale-95 transition cursor-pointer"
              >
                <QrCodeIcon className="w-3.5 h-3.5" />
                <span>QR المنيو</span>
              </button>
            </div>
          </div>

          {/* Bottom Stage: Right Transparent Cutout Hero Visual */}
          <div className="relative z-20 mt-3 pl-[128px] flex items-end justify-center min-h-[240px]">
            <div
              className={`w-full flex justify-center ${
                slide.id === "fresh-cart" ? "items-end pb-0" : "items-center pb-4"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.titleAr}
                className={`w-full max-w-[235px] sm:max-w-[270px] object-contain transition-all duration-300 ${
                  slide.id === "fresh-cart"
                    ? "h-[235px] sm:h-[255px] object-bottom"
                    : "h-[195px] sm:h-[215px] object-center"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
