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
  noteTag: string;
  noteText: string;
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
    noteTag: "ملحوظة التوصيل",
    noteText: "اطلب أونلاين والتوصيل متاح ٢٤ ساعة لحد باب بيتك في بدر!",
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
    noteTag: "ملحوظة العرض",
    noteText: "فاتورة ١٠٠ ج = كيس فينو هدية • فاتورة ٢٠٠ ج = كيسين فينو!",
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
    noteTag: "ملحوظة التوفير",
    noteText: "خصم فوري حتى ٣٥ ج.م على الزيوت والسمن وأرز الساعة وحبوبة!",
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
    noteTag: "ملحوظة المجلة",
    noteText: "ماكس تيلا ١ كجم بـ ١٣٥ ج ومربى وحلاوة البوادي وفيتراك بالخصم!",
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
    noteTag: "ملحوظة الخزين",
    noteText: "مكرونة كايرو وبساطة بـ ٩ ج.م فقط • جميع أوزان الأرز والدقيق!",
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
        <div className="relative rounded-[24px] bg-[#027443] min-h-[420px] sm:min-h-[445px] flex flex-col justify-between p-4 pb-0 overflow-hidden">
          {/* Top Editorial Header inside Green Stage (Clear of Top-Right Cutout Notch via pr-16, zero small overline above title) */}
          <div dir="rtl" className="relative z-20 pr-16 pl-1 pt-1 text-right">
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              {slide.titleAr}
            </h2>
            <p className="text-xs font-bold text-[#FCFAEB]/85 leading-snug mt-1">
              {slide.subtitleAr}
            </p>
            <div className="mt-3 flex items-center justify-start gap-2 flex-wrap">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#111613] px-4 py-1.5 text-xs font-black active:scale-95 transition"
              >
                <span>تسوق الآن</span>
                <span className="font-en text-[#027443]">↗</span>
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center rounded-full border border-white/35 bg-white/10 text-white px-3.5 py-1.5 text-xs font-bold"
              >
                مجلة العروض
              </Link>
            </div>
          </div>

          {/* =====================================================================
              MIDDLE CALLOUT ZONE: Tilted Callout Note (`ملحوظة`) + Twisted/Looping
              Yellow SVG Arrows (`#FAA006`) + Decorative Sparkle Shapes
             ===================================================================== */}
          <div className="relative z-20 my-2 px-1 flex items-center justify-between gap-2">
            {/* Left Side: Looping/Twisted Golden Yellow SVG Arrow pointing from note down-right to the product */}
            <div className="relative shrink-0 w-[96px] sm:w-[115px] h-[72px] pointer-events-none select-none">
              <svg
                viewBox="0 0 130 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
                aria-hidden="true"
              >
                {/* Decorative 4-point yellow sparkle star on top-left */}
                <path
                  d="M18 8L20.2 14.8L27 17L20.2 19.2L18 26L15.8 19.2L9 17L15.8 14.8L18 8Z"
                  fill="#FAA006"
                />
                {/* Small cream diamond accent */}
                <circle cx="34" cy="10" r="2.5" fill="#FCFAEB" fillOpacity="0.8" />

                {/* Hand-drawn looping/twisted yellow arrow curving down-right toward the product */}
                <path
                  d="M28 24 C 14 42, 22 68, 46 60 C 66 53, 62 28, 44 33 C 28 38, 42 74, 82 76 C 98 77, 108 73, 118 66"
                  stroke="#FAA006"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Arrowhead pointing toward product */}
                <path
                  d="M107 60 L 120 65 L 112 77"
                  stroke="#FAA006"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Secondary dashed accent arc */}
                <path
                  d="M58 18 Q 88 22 104 44"
                  stroke="#FCFAEB"
                  strokeOpacity="0.55"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Right Side: Tilted Callout Note Card (`ملحوظة`) + Small Curved Yellow Arrow */}
            <div
              dir="rtl"
              className="relative flex-1 max-w-[235px] sm:max-w-[265px] -rotate-1 rounded-2xl bg-[#111613]/28 backdrop-blur-xs border border-[#FAA006]/55 px-3 py-2 text-right shadow-[0_8px_20px_-8px_rgba(0,0,0,0.28)]"
            >
              {/* Floating Golden Badge Pill on top-right of the note */}
              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FAA006] text-[#111613] px-2 py-0.5 text-[10px] font-black leading-none">
                  <span>★</span>
                  <span>{slide.noteTag}</span>
                </span>
                <span className="font-en text-[10px] tracking-wider text-[#FAA006]">
                  {slide.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-extrabold text-[#FCFAEB] leading-snug">
                {slide.noteText}
              </p>

              {/* Small curved yellow arrow on bottom-left of the note pointing down at the product */}
              <svg
                viewBox="0 0 44 36"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-4 w-8 h-7"
              >
                <path
                  d="M34 4 C 36 16, 26 26, 10 28"
                  stroke="#FAA006"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path
                  d="M17 22 L 8 28 L 16 33"
                  stroke="#FAA006"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Bottom Stage: Right Transparent Cutout Hero Visual */}
          <div className="relative z-20 mt-1 pl-[128px] flex items-end justify-center min-h-[215px]">
            {/* Decorative highlight rays & sparkle behind product */}
            <svg
              viewBox="0 0 60 60"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute top-2 right-3 w-8 h-8 text-[#FAA006]"
            >
              <path
                d="M30 6L33 21L48 24L33 27L30 42L27 27L12 24L27 21L30 6Z"
                fill="currentColor"
                fillOpacity="0.85"
              />
              <circle cx="48" cy="10" r="3" fill="#FCFAEB" fillOpacity="0.75" />
            </svg>

            <div
              className={`w-full flex justify-center ${
                slide.id === "fresh-cart" ? "items-end pb-0" : "items-center pb-3"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.titleAr}
                className={`w-full max-w-[230px] sm:max-w-[265px] object-contain transition-all duration-300 ${
                  slide.id === "fresh-cart"
                    ? "h-[220px] sm:h-[245px] object-bottom"
                    : "h-[185px] sm:h-[205px] object-center"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
