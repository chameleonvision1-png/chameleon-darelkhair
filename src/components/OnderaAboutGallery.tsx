"use client";

import Link from "next/link";
import { useState } from "react";

interface GalleryItem {
  id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  image: string;
  href: string;
  bg: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "dairy",
    code: "01",
    titleAr: "قسم الألبان وثلاجة الجبن",
    titleEn: "FRESH DAIRY & DELI FRIDGE",
    subtitleAr: "لبن بخيره وجهينة ولمار بخصومات المجلة + عرض الجبنة جابت الفينو معاها",
    image: "/images/departments/dept-dairy.webp",
    href: "/menu?cat=dairy",
    bg: "from-[#111613] via-[#163826] to-[#027443]",
  },
  {
    id: "oils",
    code: "02",
    titleAr: "قسم الزيوت وخزين المطبخ",
    titleEn: "COOKING OILS & PANTRY",
    subtitleAr: "زيت الممتاز ٢.٥ لتر، صني ١.٧٥ لتر، وقلية ٢.١ و٤.٥ لتر بأقل سعر في مدينة بدر",
    image: "/images/departments/dept-oils.webp",
    href: "/menu?cat=oils",
    bg: "from-[#111613] via-[#2C3A1E] to-[#027443]",
  },
  {
    id: "pasta",
    code: "03",
    titleAr: "المكرونة والأرز والدقيق",
    titleEn: "PASTA, RICE & PREMIUM FLOUR",
    subtitleAr: "مكرونات كايرو وبساطة بـ ٩ ج.م، المطبخ ولمتنا بـ ١٢.٥ ج.م، وأرز الساعة وحبوبة",
    image: "/images/departments/dept-pasta.webp",
    href: "/menu?cat=pasta",
    bg: "from-[#111613] via-[#1B3B2B] to-[#015933]",
  },
  {
    id: "jams",
    code: "04",
    titleAr: "المربى والحلاوة والسبريدات",
    titleEn: "JAMS, HALAWA & CHOCOLATE SPREADS",
    subtitleAr: "ماكس تيلا ١ كيلو بـ ١٣٥ ج.م، مربى وحلاوة البوادي وفيتراك بأسعار زمان",
    image: "/images/departments/dept-jams.webp",
    href: "/menu?cat=jams",
    bg: "from-[#111613] via-[#33291A] to-[#027443]",
  },
];

export default function OnderaAboutGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = GALLERY_ITEMS[activeIdx];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 overflow-x-clip">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column in LTR / Editorial About Block (`NOT JUST LIGHT. A FEELING.`) */}
        <div className="lg:col-span-5 flex flex-col items-start text-right">
          <span className="ondera-label mb-2.5">
            ABOUT DAR EL KHAIR • عن دار الخير
          </span>

          <div dir="ltr" className="w-full text-left">
            <h2 className="font-en text-3xl sm:text-4xl lg:text-[44px] leading-[0.95] tracking-tight text-[#111613] uppercase">
              NOT JUST A MARKET.
              <br />
              A FAMILY HOME.
            </h2>
          </div>

          <h3 className="mt-2.5 text-base sm:text-lg font-black text-[#027443] leading-snug text-right w-full">
            دار الخير هايبر ماركت — تسوق أسهل لكل احتياجات بيتك في مدينة بدر.
          </h3>

          {/* Compact Rounded Inset Banner Card (Matches ONDERA Inset Photo Card) */}
          <div className="mt-4 w-full rounded-[22px] overflow-hidden border border-[#111613]/10 shadow-sm bg-[#019149]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/official-banner.webp"
              alt="دار الخير هايبر ماركت — 01270158888"
              className="w-full h-36 sm:h-44 object-cover"
            />
          </div>

          <p className="mt-4 text-xs sm:text-sm font-semibold text-[#111613]/75 leading-relaxed text-right">
            نخدم أهالي مدينة بدر على مدار ٢٤ ساعة بتشكيلة كاملة من السلع الغذائية، الألبان، ثلاجة الجبن، الزيوت، المكرونة، المعلبات، وبوكسات التوفير — مع توصيل منزلي سريع وخدمة عملاء جاهزة دائماً عبر الهاتف والواتساب.
          </p>

          {/* ONDERA Signature Paired Outlined Pill + Solid Olive/Green Circle Button */}
          <div className="mt-5 flex items-center gap-2" dir="ltr">
            <Link
              href="/menu"
              className="rounded-full border border-[#111613]/25 hover:border-[#027443] bg-white px-5 py-2.5 text-xs font-black text-[#111613] hover:text-[#027443] transition flex items-center gap-2"
            >
              <span className="font-en tracking-wider">DISCOVER DAR EL KHAIR</span>
              <span className="opacity-45">•</span>
              <span dir="rtl">تصفح الأقسام</span>
            </Link>
            <Link
              href="/offers"
              aria-label="عروض المجلة"
              className="w-10 h-10 rounded-full bg-[#027443] hover:bg-[#111613] text-white grid place-items-center text-sm font-black transition shadow-sm"
            >
              ↗
            </Link>
          </div>
        </div>

        {/* Right Column in LTR / 4-Thumbnail Interactive Showcase Stage */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4" dir="ltr">
          {/* Main Rounded Stage with Top-Right Inverted Cutout Button */}
          <div
            className={`relative flex-1 min-h-[300px] sm:min-h-[380px] rounded-[28px] bg-gradient-to-br ${current.bg} p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-lg`}
          >
            {/* Top-Right Inverted Cutout Notch with Dark Circle Button */}
            <div className="absolute top-0 right-0 z-20 bg-white pl-2.5 pb-2.5 rounded-bl-[24px]">
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((prev) => (prev + 1) % GALLERY_ITEMS.length)
                }
                aria-label="القسم التالي"
                className="w-11 h-11 rounded-full bg-[#111613] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition cursor-pointer"
              >
                ↻
              </button>
            </div>

            <div className="relative z-10 flex items-center gap-2 max-w-[75%]">
              <span className="px-2.5 py-1 rounded-full bg-[#FAA006] text-[#111613] font-en text-[11px] font-black">
                /{current.code}
              </span>
              <span className="font-en text-xs tracking-wider text-[#FCFAEB]/80 truncate">
                {current.titleEn}
              </span>
            </div>

            <div className="relative z-10 my-auto py-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.id}
                src={current.image}
                alt={current.titleAr}
                className="w-full max-w-[340px] h-44 sm:h-52 object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)] transition-all duration-300"
              />
            </div>

            <div dir="rtl" className="relative z-10 flex items-end justify-between gap-3 pt-2 border-t border-white/12">
              <div className="text-right">
                <h4 className="text-base sm:text-lg font-black text-white">
                  {current.titleAr}
                </h4>
                <p className="text-xs font-semibold text-[#FCFAEB]/80 mt-0.5 line-clamp-2">
                  {current.subtitleAr}
                </p>
              </div>
              <Link
                href={current.href}
                className="shrink-0 rounded-full bg-white hover:bg-[#FAA006] text-[#111613] px-3.5 py-1.5 text-xs font-black transition"
              >
                عرض المنتجات ↗
              </Link>
            </div>
          </div>

          {/* 4 Square Rounded Thumbnails (Row on Mobile, Column on Desktop — Matches ONDERA Reference) */}
          <div className="grid grid-cols-4 sm:flex sm:flex-col justify-between gap-2.5 sm:w-24 shrink-0">
            {GALLERY_ITEMS.map((item, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative aspect-square sm:flex-1 rounded-[18px] p-2 flex flex-col items-center justify-center overflow-hidden border transition cursor-pointer ${
                    active
                      ? "bg-[#027443] border-[#027443] ring-2 ring-[#027443]/30 shadow-md"
                      : "bg-[#FCFAEB] border-[#111613]/10 hover:border-[#027443]/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.titleAr}
                    className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                  <span
                    className={`absolute bottom-1 right-1.5 font-en text-[9px] font-black px-1 rounded ${
                      active
                        ? "bg-[#FAA006] text-[#111613]"
                        : "bg-[#111613]/70 text-white"
                    }`}
                  >
                    {item.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
