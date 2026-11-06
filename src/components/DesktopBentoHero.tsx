"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DesktopHeroSlide {
  id: string;
  code: string;
  enTitle: string;
  titleAr: string;
  subtitleAr: string;
  badge: string;
  href: string;
  image: string;
}

const SLIDES: DesktopHeroSlide[] = [
  {
    id: "fresh-cart",
    code: "DAR EL KHAIR 01",
    enTitle: "BADR CITY HYPERMARKET",
    titleAr: "تسوق أسهل لكل احتياجات بيتك في مدينة بدر",
    subtitleAr:
      "أقوى عروض الألبان، الزيوت، المكرونة، الأرز، المربى والحلاوة، والمعلبات مع توصيل منزلي سريع على مدار ٢٤ ساعة.",
    badge: "SUPER MAGAZINE DEALS",
    href: "/menu",
    image: "/images/hero-cart.webp",
  },
  {
    id: "cheese-fino",
    code: "DAR EL KHAIR 02",
    enTitle: "CHEESE FRIDGE & FREE FINO",
    titleAr: "عرض الجبنة جابت الفينو معاها",
    subtitleAr:
      "أي فاتورة بـ ١٠٠ جنيه من ثلاجة الجبن معاها كيس فينو طازة (٥ أرغفة) هدية، وفاتورة الـ ٢٠٠ جنيه معاها ٢ كيس فينو (١٠ أرغفة) هدية مجاناً!",
    badge: "FREE BAKERY GIFT",
    href: "/menu?cat=cheese_bakery",
    image: "/images/cheese-fino-stage.webp",
  },
  {
    id: "microwave-draw",
    code: "DAR EL KHAIR 03",
    enTitle: "1000 EGP MICROWAVE RAFFLE",
    titleAr: "عدّي الألف... واستنى السحب على الميكروويف",
    subtitleAr:
      "جمّع خزين بيتك الشهري بأكثر من ١٠٠٠ جنيه من دار الخير هايبر ماركت وادخل السحب الكبير على ميكروويف هدية.",
    badge: "MEGA GIVEAWAY",
    href: "/occasions",
    image: "/images/products/promo-microwave.webp",
  },
  {
    id: "oils-pantry",
    code: "DAR EL KHAIR 04",
    enTitle: "COOKING OILS & MONTHLY PANTRY",
    titleAr: "تخفيضات الزيوت والأرز والدقيق",
    subtitleAr:
      "زيت الممتاز ٢.٥ لتر بـ ٢٠٥ ج.م، زيت صني ١.٧٥ لتر بـ ١٥٥ ج.م، زيت قلية ٤.٥ لتر بـ ٣٧٥ ج.م، وأرز حبوبة بـ ٢٨.٥ ج.م.",
    badge: "SAVE UP TO 35 EGP",
    href: "/menu?cat=oils",
    image: "/images/departments/dept-oils.webp",
  },
  {
    id: "dairy-jams",
    code: "DAR EL KHAIR 05",
    enTitle: "FRESH DAIRY & SPREADS",
    titleAr: "الألبان الطازجة والمربى والسبريدات",
    subtitleAr:
      "لبن بخيره ١ لتر بـ ٣٩ ج.م، جهينة ١ لتر بـ ٤٩ ج.م، شوكولاتة ماكس تيلا ١ كجم بـ ١٣٥ ج.م، ومربى وحلاوة البوادي.",
    badge: "DAILY FRESH",
    href: "/menu?cat=dairy",
    image: "/images/departments/dept-dairy.webp",
  },
];

export default function DesktopBentoHero() {
  const [active, setActive] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[active];
  const nextSlide = SLIDES[(active + 1) % total];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [active, total]);

  return (
    <section className="hidden lg:block mx-auto max-w-7xl px-8 pt-5 pb-10">
      {/* ONDERA Web Outer Architectural Frame (`border-[5px] border-[#027443] rounded-[36px]`) */}
      <div className="relative rounded-[36px] border-[5px] border-[#027443] bg-white p-6 shadow-[0_28px_70px_-28px_rgba(2,116,67,0.22)]">
        {/* Top Metadata Strip above Giant Wordmark */}
        <div className="flex items-center justify-between px-2 mb-1 text-xs font-extrabold text-[#111613]/65">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#027443]" />
            <span>دار الخير هايبر ماركت — مدينة بدر (مفتوح ٢٤ ساعة)</span>
          </div>
          <div dir="ltr" className="font-en tracking-widest text-[#027443]">
            {slide.badge} • WHATSAPP 01270158888 / 01210004039
          </div>
        </div>

        {/* Giant Full-Width Edge-to-Edge Wordmark (`DAR EL KHAIR` matching `ONDERA` Web Hero) */}
        <div dir="ltr" className="w-full text-center relative z-10 select-none">
          <h1 className="font-en text-[10.4vw] xl:text-[134px] leading-[0.83] tracking-tight text-[#027443] uppercase whitespace-nowrap">
            DAR EL KHAIR
          </h1>
        </div>

        {/* Sculpted Green Stage with Overlapping Centerpiece & Bottom-Left Cutout Pocket */}
        <div className="relative -mt-3 rounded-[28px] bg-gradient-to-br from-[#027443] via-[#026239] to-[#014829] min-h-[430px] p-7 flex items-end justify-between overflow-visible">
          {/* Ambient Soft Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-[#FCFAEB]/20 blur-3xl"
          />

          {/* Centerpiece Overlapping the Bottom of `DAR EL KHAIR` Wordmark */}
          <div className="pointer-events-none absolute inset-x-0 -top-12 bottom-6 flex items-center justify-center z-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.titleAr}
              className="h-[390px] w-auto max-w-[460px] object-contain drop-shadow-[0_28px_36px_rgba(0,0,0,0.42)] transition-all duration-500"
            />
          </div>

          {/* RIGHT CIRCULAR BADGE (Matches ONDERA Web Right Black Circular Seal) */}
          <Link
            href={slide.href}
            dir="ltr"
            aria-label="تصفح الأقسام"
            className="group absolute top-6 right-7 z-30 w-24 h-24 rounded-full bg-[#111613] hover:bg-[#FAA006] text-white hover:text-[#111613] flex flex-col items-center justify-center text-center p-2 shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="font-en text-[9px] tracking-[0.16em] opacity-80 leading-tight">
              BADR CITY • 24/7
            </span>
            <span className="text-xl font-black my-0.5">↗</span>
            <span className="font-en text-[9px] tracking-[0.14em] text-[#FAA006] group-hover:text-[#111613]">
              SHOP NOW
            </span>
          </Link>

          {/* BOTTOM-LEFT INVERTED CUTOUT POCKET (`ONDERA 01` Switcher Card) */}
          <div
            dir="ltr"
            className="relative z-30 -ml-7 -mb-7 bg-white pt-3.5 pr-3.5 rounded-tr-[28px]"
          >
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % total)}
              className="group w-[195px] h-[175px] rounded-[22px] bg-[#111613] text-white p-3.5 flex flex-col justify-between text-left shadow-lg hover:bg-[#18221C] transition cursor-pointer"
            >
              <div className="w-full flex items-center justify-between">
                <span className="font-en text-[11px] tracking-wider text-[#FAA006]">
                  NEXT HIGHLIGHT
                </span>
                <span className="w-7 h-7 rounded-full bg-white/15 group-hover:bg-[#027443] text-white grid place-items-center text-xs transition-colors">
                  ↗
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nextSlide.image}
                alt={nextSlide.titleAr}
                className="w-24 h-20 mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="w-full flex items-center justify-between pt-1 border-t border-white/10 text-[11px] font-en tracking-wider">
                <span>{slide.code}</span>
                <span className="text-[#FAA006]">
                  0{active + 1} / 0{total}
                </span>
              </div>
            </button>
          </div>

          {/* BOTTOM-RIGHT ACTIVE SLIDE EDITORIAL CARD +PAIRED PILL CTA */}
          <div
            dir="rtl"
            className="relative z-30 max-w-sm bg-[#111613]/80 backdrop-blur-md border border-white/15 rounded-[24px] p-5 text-right text-white shadow-xl"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAA006] text-[#111613] text-[11px] font-black">
                عرض المجلة
              </span>
              <span className="font-en text-[11px] text-[#FCFAEB]/75 tracking-wider">
                {slide.enTitle}
              </span>
            </div>
            <h2 className="text-xl font-black text-white leading-snug">
              {slide.titleAr}
            </h2>
            <p className="text-xs font-semibold text-[#FCFAEB]/80 leading-relaxed mt-1.5">
              {slide.subtitleAr}
            </p>

            {/* ONDERA Paired Pill + Circle Arrow CTA */}
            <div className="mt-4 flex items-center justify-between gap-2" dir="ltr">
              <div className="flex items-center gap-1.5">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-label={`شريحة ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === active
                        ? "w-6 bg-[#FAA006]"
                        : "w-1.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href={slide.href}
                  className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] px-4 py-2 text-xs font-black transition"
                >
                  <span className="font-en tracking-wider">EXPLORE</span>
                  <span className="mx-1">•</span>
                  <span dir="rtl">تسوق الآن</span>
                </Link>
                <Link
                  href="/offers"
                  aria-label="مجلة العروض"
                  className="w-9 h-9 rounded-full bg-[#027443] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition"
                >
                  ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
