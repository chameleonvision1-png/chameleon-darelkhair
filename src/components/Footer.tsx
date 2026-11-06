"use client";

import Link from "next/link";
import type { PublicData } from "@/lib/db";
import { PhoneIcon, PinIcon, QrCodeIcon, WhatsAppIcon } from "./icons";

export default function Footer({ data }: { data: PublicData }) {
  const { settings, branches } = data;
  const mainBranch = branches[0];

  const openQrModal = () => {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative mt-14 px-2.5 sm:px-6 lg:px-8 pb-4 select-none overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        {/* =========================================================================
            ONDERA SIGNATURE DARK CROPPED-WORDMARK FOOTER (`#111613`)
           ========================================================================= */}
        <div className="rounded-[32px] sm:rounded-[38px] bg-[#111613] text-white overflow-hidden shadow-[0_24px_60px_-20px_rgba(17,22,19,0.75)]">
          {/* 1. GIANT CROPPED OLIVE-GREEN WORDMARK ACROSS THE TOP EDGE (Matches `ONDERA` Footer) */}
          <div
            dir="ltr"
            className="w-full overflow-hidden pt-4 sm:pt-6 pb-2 border-b border-white/[0.08] text-center select-none"
          >
            <div className="font-en text-[15.6vw] sm:text-[13vw] lg:text-[138px] leading-[0.82] tracking-tight text-[#027443] uppercase whitespace-nowrap">
              DAR EL KHAIR
            </div>
          </div>

          {/* 2. MULTI-COLUMN LINKS & BADR CITY CONCIERGE (Arabic Right, English Left) */}
          <div className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 border-b border-white/[0.08]">
            {/* Brand Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between gap-3" dir="ltr">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal-cream.webp"
                  alt="دار الخير هايبر ماركت"
                  className="h-12 w-auto object-contain"
                />
                <span className="px-3 py-1 rounded-full bg-[#027443] text-[#FCFAEB] font-en text-[11px] tracking-wider">
                  OPEN 24/7
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-white/75 leading-relaxed text-right">
                دار الخير هايبر ماركت — تسوق أسهل لكل احتياجات بيتك في مدينة بدر. خدمة توصيل منزلي على مدار ٢٤ ساعة لجميع الأحياء والمجاورات، وطلبات سريعة عبر الواتساب.
              </p>

              {/* Paired Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://wa.me/201270158888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#027443] hover:bg-[#019149] text-white py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-black transition"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>اطلب عبر واتساب</span>
                </a>
                <button
                  type="button"
                  onClick={openQrModal}
                  className="rounded-full border border-white/20 hover:border-[#FAA006] bg-white/5 text-white py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-black transition cursor-pointer"
                >
                  <QrCodeIcon className="w-4 h-4 text-[#FAA006]" />
                  <span>باركود المجلة</span>
                </button>
              </div>
            </div>

            {/* Explore Column (4 cols) — Matches `Explore` in ONDERA Footer */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <span className="font-black text-sm text-white text-right">
                  تصفح الأقسام والصفحات
                </span>
                <span dir="ltr" className="font-en text-sm tracking-wider text-[#FAA006] text-left">
                  EXPLORE
                </span>
              </div>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm font-bold text-white/75">
                {[
                  { href: "/menu", ar: "كتالوج الهايبر ماركت الكامل", en: "Collection" },
                  { href: "/offers", ar: "مجلة العروض والتخفيضات", en: "Magazine Deals" },
                  { href: "/occasions", ar: "كرتونة الخير وبوكسات التوفير", en: "Pantry Boxes" },
                  { href: "/menu?cat=cheese_bakery", ar: "عرض الجبنة جابت الفينو معاها", en: "Cheese & Fino" },
                  { href: "/branches", ar: "نطاق التوصيل في مدينة بدر", en: "Badr City Coverage" },
                  { href: "/about", ar: "عن دار الخير هايبر ماركت", en: "About" },
                  { href: "/contact", ar: "تواصل والروابط الرسمية", en: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-2 py-0.5 hover:text-[#FAA006] transition-colors"
                    >
                      <span className="text-right">{item.ar}</span>
                      <span dir="ltr" className="font-en text-[11px] text-white/40 text-left">
                        {item.en}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow & Direct Contact Column (4 cols) — Matches `Follow` in ONDERA Footer */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                  <span className="font-black text-sm text-white text-right">
                    تابعنا وتواصل معنا
                  </span>
                  <span dir="ltr" className="font-en text-sm tracking-wider text-[#FAA006] text-left">
                    FOLLOW & ORDER
                  </span>
                </div>

                <ul className="mt-3.5 space-y-2 text-xs sm:text-sm font-bold text-white/75">
                  <li>
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 py-0.5 hover:text-[#FAA006] transition-colors"
                    >
                      <span className="text-right">فيسبوك (+11 ألف متابع)</span>
                      <span dir="ltr" className="font-en text-[11px] text-white/45 text-left">
                        Facebook ↗
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 py-0.5 hover:text-[#FAA006] transition-colors"
                    >
                      <span className="text-right">إنستجرام الرسمي</span>
                      <span dir="ltr" className="font-en text-[11px] text-white/45 text-left">
                        Instagram ↗
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={settings.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 py-0.5 hover:text-[#FAA006] transition-colors"
                    >
                      <span className="text-right">تيك توك الرسمي</span>
                      <span dir="ltr" className="font-en text-[11px] text-white/45 text-left">
                        TikTok ↗
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/images/magazine/darelkhair-magazine.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 py-0.5 hover:text-[#FAA006] transition-colors"
                    >
                      <span className="text-right">تحميل مجلة العروض PDF</span>
                      <span dir="ltr" className="font-en text-[11px] text-[#FAA006] text-left">
                        PDF Magazine ↗
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Official Dual Phone Numbers Box (`01270158888` / `01210004039`) */}
              <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <PinIcon className="w-3.5 h-3.5 text-[#FAA006]" />
                    <span>{mainBranch?.city ?? "مدينة بدر"} — خدمة ٢٤ ساعة</span>
                  </span>
                  <span dir="ltr" className="font-en text-[10px] text-[#FAA006]">
                    HOTLINES
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2" dir="ltr">
                  <a
                    href="tel:01270158888"
                    className="rounded-xl bg-[#027443] hover:bg-[#FAA006] text-white hover:text-[#111613] py-2 px-2.5 flex items-center justify-center gap-1.5 font-en text-xs tracking-wider transition"
                  >
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>01270158888</span>
                  </a>
                  <a
                    href="tel:01210004039"
                    className="rounded-xl bg-white/10 hover:bg-[#FAA006] text-white hover:text-[#111613] py-2 px-2.5 flex items-center justify-center gap-1.5 font-en text-xs tracking-wider transition"
                  >
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>01210004039</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM COPYRIGHT BAR + ADMIN LINK + "POWERED BY CHAMELEON" PILL BADGE */}
          <div className="px-6 sm:px-10 py-5 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-white/65 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-3">
              <span className="font-bold text-white/85">
                جميع الحقوق محفوظة — دار الخير هايبر ماركت • مدينة بدر
              </span>
              <div className="flex items-center justify-center gap-2 text-[11px]">
                <span>خدمة ٢٤ ساعة: 01270158888</span>
                <span className="opacity-40">•</span>
                <Link
                  href="/admin"
                  className="font-extrabold text-[#FAA006] hover:underline transition-colors"
                >
                  لوحة تحكم الإدارة
                </Link>
              </div>
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-2.5"
              dir="ltr"
            >
              <span className="text-[11px] font-bold text-white/55 whitespace-nowrap">
                © {new Date().getFullYear()} DAR EL KHAIR HYPER MARKET
              </span>
              <a
                href="https://chameleon.vision/"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="group inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-[#027443] text-white border border-white/15 hover:border-[#FAA006]/50 transition-all duration-200 shadow-xs whitespace-nowrap"
              >
                <span className="text-[11px] font-semibold tracking-wide text-white/80 group-hover:text-white whitespace-nowrap">
                  Powered by
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/chameleon-logo.webp"
                  alt="Chameleon"
                  className="h-4 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-xs font-black tracking-wider text-[#FAA006] whitespace-nowrap">
                  Chameleon
                </span>
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="العودة لأعلى الصفحة"
                className="w-9 h-9 rounded-full bg-[#027443] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition cursor-pointer shrink-0"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
