"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QrCodeIcon } from "./icons";

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
    id: "dairy-cheese",
    code: "DAR EL KHAIR 02",
    enTitle: "FRESH DAIRY & CHEESE FRIDGE",
    titleAr: "قسم الألبان الطازجة وثلاجة الجبن",
    subtitleAr:
      "أي فاتورة بـ ١٠٠ جنيه من ثلاجة الجبن معاها كيس فينو طازة هدية، وفاتورة الـ ٢٠٠ جنيه معاها ٢ كيس فينو هدية مجاناً!",
    badge: "FREE BAKERY GIFT",
    href: "/menu?cat=dairy",
    image: "/images/departments/dept-dairy.webp",
  },
  {
    id: "oils-pantry",
    code: "DAR EL KHAIR 03",
    enTitle: "COOKING OILS & MONTHLY PANTRY",
    titleAr: "تخفيضات الزيوت والأرز والدقيق",
    subtitleAr:
      "زيت الممتاز ٢.٥ لتر بـ ٢٠٥ ج.م، زيت صني ١.٧٥ لتر بـ ١٥٥ ج.م، زيت قلية ٤.٥ لتر بـ ٣٧٥ ج.م، وأرز حبوبة بـ ٢٨.٥ ج.م.",
    badge: "SAVE UP TO 35 EGP",
    href: "/menu?cat=oils",
    image: "/images/departments/dept-oils.webp",
  },
  {
    id: "jams-spreads",
    code: "DAR EL KHAIR 04",
    enTitle: "JAMS, HALAWA & SPREADS",
    titleAr: "المربى والحلاوة وشوكولاتة ماكس تيلا",
    subtitleAr:
      "شوكولاتة ماكس تيلا ١ كجم بـ ١٣٥ ج.م، ومربى وحلاوة البوادي وفيتراك بخصومات مجلة دار الخير.",
    badge: "DAILY FRESH",
    href: "/menu?cat=jams",
    image: "/images/departments/dept-jams.webp",
  },
  {
    id: "pasta-rice",
    code: "DAR EL KHAIR 05",
    enTitle: "PASTA, RICE & PREMIUM FLOUR",
    titleAr: "المكرونة والأرز والدقيق الفاخر",
    subtitleAr:
      "مكرونات كايرو وبساطة بـ ٩ ج.م، المطبخ ولمتنا بـ ١٢.٥ ج.م، وأرز الساعة وحبوبة ودقيق حبوبة ١ كجم.",
    badge: "PANTRY ESSENTIALS",
    href: "/menu?cat=pasta",
    image: "/images/departments/dept-pasta.webp",
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
    <section className="hidden lg:block mx-auto max-w-7xl px-8 pt-4 pb-10">
      {/* ONDERA Web Outer Architectural Frame (`border-[5px] border-[#027443] rounded-[36px]`, zero box-shadow) */}
      <div className="relative rounded-[36px] border-[5px] border-[#027443] bg-white p-6">
        {/* Giant Full-Width Edge-to-Edge Wordmark (`DAR EL KHAIR` matching `ONDERA` Web Hero — Zero text above it!) */}
        <div dir="ltr" className="w-full text-center relative z-10 select-none">
          <h1 className="font-en text-[10.4vw] xl:text-[134px] leading-[0.83] tracking-tight text-[#027443] uppercase whitespace-nowrap">
            DAR EL KHAIR
          </h1>
        </div>

        {/* Sculpted Green Stage with Overlapping Centerpiece & Bottom-Left Cutout Pocket */}
        <div dir="ltr" className="relative -mt-2">
          {/* BOTTOM-LEFT INVERTED CUTOUT POCKET (`DAR EL KHAIR 01` Switcher Card) — Outside overflow-hidden */}
          <div
            dir="ltr"
            className="absolute bottom-0 left-0 z-30 bg-white pt-3.5 pr-3.5 rounded-tr-[28px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 -top-[23px] w-6 h-6"
              style={{
                background:
                  "radial-gradient(circle at 100% 0%, transparent 23.5px, #ffffff 24px)",
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-[23px] bottom-0 w-6 h-6"
              style={{
                background:
                  "radial-gradient(circle at 100% 0%, transparent 23.5px, #ffffff 24px)",
              }}
            />
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % total)}
              className="group w-[190px] h-[172px] rounded-[22px] bg-[#111613] text-white p-3.5 flex flex-col justify-between text-left hover:bg-[#18221C] transition cursor-pointer"
            >
              <div className="w-full flex items-center justify-between">
                <span className="font-en text-[10px] tracking-wider text-[#FAA006]">
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
              <div className="w-full flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-en tracking-wider">
                <span>{slide.code}</span>
                <span className="text-[#FAA006]">
                  0{active + 1} / 0{total}
                </span>
              </div>
            </button>
          </div>

          <div className="relative rounded-[28px] bg-[#027443] min-h-[430px] p-7 flex items-end justify-between overflow-hidden">
            {/* Centerpiece Flush with Bottom Edge (for cart) or Centered cleanly (for department cutouts) */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 bottom-0 flex justify-center z-20 ${
                slide.id === "fresh-cart" ? "items-end" : "items-center"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.titleAr}
                className={`w-auto max-w-[460px] object-contain transition-all duration-500 ${
                  slide.id === "fresh-cart"
                    ? "h-[410px] object-bottom"
                    : "h-[330px] object-center"
                }`}
              />
            </div>

            {/* RIGHT CIRCULAR BADGE (Matches ONDERA Web Right Black Circular Seal) */}
            <Link
              href={slide.href}
              dir="ltr"
              aria-label="تصفح الأقسام"
              className="group absolute top-6 right-7 z-30 w-22 h-22 rounded-full bg-[#111613] hover:bg-[#FAA006] text-white hover:text-[#111613] flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:scale-105"
            >
              <span className="font-en text-[8.5px] tracking-[0.15em] opacity-80 leading-tight">
                BADR CITY • 24/7
              </span>
              <span className="text-lg font-black my-0.5">↗</span>
              <span className="font-en text-[8.5px] tracking-[0.14em] text-[#FAA006] group-hover:text-[#111613]">
                SHOP NOW
              </span>
            </Link>

            {/* BOTTOM-RIGHT ACTIVE SLIDE EDITORIAL CARD + PAIRED PILL CTA (Zero small overline above title) */}
            <div
              dir="rtl"
              className="relative z-30 ml-auto max-w-[330px] bg-[#111613]/90 border border-white/15 rounded-[24px] p-4 text-right text-white"
            >
              <h2 className="text-lg font-black text-white leading-snug">
                {slide.titleAr}
              </h2>
              <p className="text-xs font-semibold text-[#FCFAEB]/80 leading-relaxed mt-1 line-clamp-2">
                {slide.subtitleAr}
              </p>

              {/* ONDERA Paired Pill + Circle Arrow CTA */}
              <div className="mt-3.5 flex items-center justify-between gap-2" dir="ltr">
                <div className="flex items-center gap-1.5">
                  {SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-label={`شريحة ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === active
                          ? "w-5 bg-[#FAA006]"
                          : "w-1.5 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-menu-qr"));
                      }
                    }}
                    title="باركود المنيو (QR)"
                    className="rounded-full bg-[#FAA006] hover:bg-white text-[#111613] px-3 py-1.5 text-xs font-black inline-flex items-center gap-1 transition cursor-pointer"
                  >
                    <QrCodeIcon className="w-3.5 h-3.5" />
                    <span className="font-en">QR</span>
                  </button>
                  <Link
                    href={slide.href}
                    className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] px-4 py-1.5 text-xs font-black transition"
                  >
                    تسوق الآن
                  </Link>
                  <Link
                    href="/offers"
                    aria-label="مجلة العروض"
                    className="w-8 h-8 rounded-full bg-[#027443] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-xs font-black transition"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
