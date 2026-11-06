"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import {
  CartIcon,
  ChevronIcon,
  CloseIcon,
  PhoneIcon,
  QrCodeIcon,
  WhatsAppIcon,
} from "./icons";
import MenuQrModal from "./MenuQrModal";

const NAV_LINKS = [
  { href: "/", labelAr: "الرئيسية", labelEn: "HOME" },
  { href: "/offers", labelAr: "مجلة العروض", labelEn: "MAGAZINE" },
  { href: "/occasions", labelAr: "كرتونة الخير", labelEn: "BOXES" },
  { href: "/branches", labelAr: "التوصيل بمدينة بدر", labelEn: "DELIVERY" },
  { href: "/about", labelAr: "عن دار الخير", labelEn: "ABOUT" },
  { href: "/contact", labelAr: "تواصل معنا", labelEn: "CONTACT" },
];

const QUICK_CATEGORIES = [
  { href: "/menu?cat=dairy", labelAr: "الألبان والحليب", labelEn: "DAIRY" },
  { href: "/menu?cat=jams", labelAr: "المربى والحلاوة والسبريد", labelEn: "JAMS & SPREADS" },
  { href: "/menu?cat=oils", labelAr: "الزيوت والسمن", labelEn: "COOKING OILS" },
  { href: "/menu?cat=pasta", labelAr: "المكرونة", labelEn: "PASTA" },
  { href: "/menu?cat=tea_sugar", labelAr: "الشاي والسكر", labelEn: "TEA & SUGAR" },
  { href: "/menu?cat=rice_flour", labelAr: "الدقيق والأرز", labelEn: "RICE & FLOUR" },
  { href: "/menu?cat=canned", labelAr: "المعلبات والتونة", labelEn: "CANNED GOODS" },
  { href: "/menu?cat=tomato", labelAr: "صلصة الطماطم", labelEn: "TOMATO SAUCE" },
  { href: "/menu?cat=cheese_bakery", labelAr: "ثلاجة الجبن وعرض الفينو", labelEn: "CHEESE & FINO" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, subtotal, bump, hydrated } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<"pages" | "cats" | null>("pages");
  const savedScrollYRef = useRef(0);
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    const onOpenQr = () => setQrOpen(true);
    const onOpenDrawer = () => setDrawerOpen(true);
    window.addEventListener("open-menu-qr", onOpenQr);
    window.addEventListener("open-mobile-drawer", onOpenDrawer);
    return () => {
      window.removeEventListener("open-menu-qr", onOpenQr);
      window.removeEventListener("open-mobile-drawer", onOpenDrawer);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (drawerOpen) {
      savedScrollYRef.current = window.scrollY;
      lastPathnameRef.current = pathname;

      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";
      body.style.position = "fixed";
      body.style.top = `-${savedScrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      const wasLocked = body.style.position === "fixed";
      const targetScrollY = savedScrollYRef.current;
      const sameRoute = lastPathnameRef.current === pathname;

      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      if (wasLocked && sameRoute) {
        window.scrollTo(0, targetScrollY);
      }
    }

    return () => {
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
    };
  }, [drawerOpen, pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#111613]/[0.07]">
        <div
          dir="ltr"
          className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-3"
        >
          {/* Far Left (شمال): Brand Identity Lockup */}
          <Link
            href="/"
            dir="ltr"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-horizontal.webp"
              alt="دار الخير هايبر ماركت"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="hidden sm:flex flex-col text-right border-l border-[#111613]/12 pl-2.5" dir="rtl">
              <span className="font-en text-xs tracking-wider text-[#027443] leading-none">
                DAR EL KHAIR
              </span>
              <span className="text-[10px] font-bold text-[#111613]/65 leading-tight mt-0.5">
                هايبر ماركت • مدينة بدر
              </span>
            </div>
          </Link>

          {/* Center Desktop Minimalist Navigation */}
          <nav dir="rtl" className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-colors whitespace-nowrap ${
                    active
                      ? "bg-[#027443] text-white"
                      : "text-[#111613]/75 hover:text-[#027443] hover:bg-[#027443]/[0.06]"
                  }`}
                >
                  {item.labelAr}
                </Link>
              );
            })}

            {/* Cohesive Split Shopping Departments + QR Pill (Matches alban3sal & BurgerStorm) */}
            <div
              className={`ms-1 inline-flex items-center rounded-full border p-0.5 transition-all ${
                pathname.startsWith("/menu")
                  ? "bg-[#027443] text-white border-[#027443]"
                  : "bg-[#FCFAEB] text-[#027443] border-[#027443]/25 hover:border-[#027443]/50"
              }`}
            >
              <Link
                href="/menu"
                className={`ps-3.5 pe-2.5 py-1 rounded-s-full font-extrabold text-xs flex items-center gap-1.5 transition whitespace-nowrap ${
                  pathname.startsWith("/menu")
                    ? "text-white hover:bg-white/10"
                    : "text-[#027443] hover:bg-white/80"
                }`}
              >
                <span>أقسام المشتريات</span>
              </Link>
              <span
                className={`w-px h-3.5 ${
                  pathname.startsWith("/menu") ? "bg-white/25" : "bg-[#027443]/20"
                }`}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                title="باركود ومشاركة أقسام المشتريات (QR)"
                aria-label="باركود ومشاركة أقسام المشتريات"
                className={`ps-2.5 pe-3 py-1 rounded-e-full flex items-center gap-1 text-[11px] font-black transition active:scale-95 cursor-pointer ${
                  pathname.startsWith("/menu")
                    ? "text-[#FAA006] hover:bg-white/15"
                    : "text-[#111613] hover:text-[#027443] hover:bg-white/90"
                }`}
              >
                <QrCodeIcon className="w-3.5 h-3.5 text-[#FAA006]" />
                <span className="font-en tracking-wider">QR</span>
              </button>
            </div>
          </nav>

          {/* Right Side (يمين): On Mobile ONLY Burger Menu Button; On Desktop Cart Pill */}
          <div className="flex items-center gap-2 shrink-0" dir="ltr">
            {/* Desktop Cart Pill (Hidden on mobile so mobile top header has ONLY Logo + Burger Menu button) */}
            <Link
              href="/cart"
              key={bump}
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#111613] hover:bg-[#027443] text-white pl-3.5 pr-1.5 py-1.5 text-xs font-extrabold transition-colors"
            >
              <span className="font-en tracking-wider">CART</span>
              <span dir="rtl" className="font-bold">
                {hydrated && count > 0 ? `${count} منتج` : "شنطة المشتريات"}
              </span>
              <span className="w-6 h-6 rounded-full bg-white text-[#111613] grid place-items-center text-[11px] font-black">
                {hydrated && count > 0 ? count : "↗"}
              </span>
            </Link>

            {/* Mobile Far Right (أقصى اليمين): ONLY the Burger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="فتح القائمة"
              aria-expanded={drawerOpen}
              className="lg:hidden w-10 h-10 rounded-full border border-[#111613]/15 bg-white hover:bg-[#F2FAF5] text-[#111613] grid place-items-center transition active:scale-95 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <line x1="4" y1="9" x2="20" y2="9" strokeLinecap="round" />
                <line x1="4" y1="15" x2="16" y2="15" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer — Portal to document.body with pinned top/bottom & isolated internal scroll */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            dir="ltr"
            role="dialog"
            aria-modal="true"
            aria-label="القائمة الجانبية"
            className="fixed inset-0 z-[80] lg:hidden overflow-hidden overscroll-none"
          >
            {/* Full-viewport Backdrop (blocks touch-scroll chaining to page behind) */}
            <div
              className="fixed inset-0 bg-[#111613]/60 backdrop-blur-xs touch-none"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Right-aligned Sidebar Panel (`w-[88vw] max-w-[370px] h-[100dvh]`) */}
            <aside
              dir="rtl"
              className="fixed top-0 bottom-0 right-0 z-10 w-[88vw] max-w-[370px] h-[100dvh] max-h-[100dvh] bg-white text-[#111613] shadow-2xl border-l border-[#111613]/10 flex flex-col overflow-hidden overscroll-contain"
            >
              {/* 1. Pinned Top Drawer Header (`shrink-0`) */}
              <div className="shrink-0 p-4 pb-3 border-b border-[#111613]/10 bg-white space-y-2.5">
                <div className="flex items-center justify-between" dir="ltr">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-horizontal.webp"
                    alt="دار الخير هايبر ماركت"
                    className="h-9 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="إغلاق القائمة"
                    className="w-9 h-9 rounded-full bg-[#111613]/5 hover:bg-[#111613]/10 text-[#111613] grid place-items-center cursor-pointer"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Status & Delivery Pill */}
                <div className="rounded-2xl bg-[#027443] text-white p-3 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-black">مفتوح دائمًا ٢٤ ساعة</div>
                      <div className="text-[11px] text-[#FCFAEB]/85 font-semibold mt-0.5">
                        توصيل سريع لجميع أحياء مدينة بدر
                      </div>
                    </div>
                    <span className="font-en text-[11px] bg-[#FAA006] text-[#111613] px-2.5 py-1 rounded-full font-black shrink-0">
                      24/7 OPEN
                    </span>
                  </div>

                  {/* Quick Shopping Departments + QR Pill Row inside Top Banner (Matches BurgerStorm) */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <Link
                      href="/menu"
                      onClick={() => setDrawerOpen(false)}
                      className="flex-1 rounded-full bg-[#FCFAEB] hover:bg-[#FAA006] text-[#027443] hover:text-[#111613] font-black text-xs py-2 px-3.5 text-center transition"
                    >
                      تصفح أقسام المشتريات
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerOpen(false);
                        setQrOpen(true);
                      }}
                      className="shrink-0 rounded-full bg-[#FAA006] hover:bg-white text-[#111613] font-black text-xs py-2 px-3.5 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <QrCodeIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>QR الأقسام</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Independently Scrollable Middle Content (`flex-1 min-h-0 overflow-y-auto overscroll-contain`) */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-3">
                {/* Shopping Bag (`شنطة المشتريات`) Row inside Sidebar Drawer (Matches alban3sal & BurgerStorm) */}
                <Link
                  href="/cart"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm border transition ${
                    pathname === "/cart"
                      ? "bg-[#027443] text-white border-[#027443]"
                      : "bg-[#FCFAEB] text-[#027443] border-[#027443]/25 hover:border-[#027443]"
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <CartIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate font-black">شنطة المشتريات</span>
                  </span>

                  <span className="flex items-center gap-1.5 shrink-0">
                    {hydrated && count > 0 ? (
                      <span
                        key={bump}
                        className="animate-pop px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#027443] text-white"
                      >
                        {count} • {formatPrice(subtotal)}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#111613]/60">
                        عرض الشنطة
                      </span>
                    )}
                    <ChevronIcon className="w-4 h-4 shrink-0" />
                  </span>
                </Link>

                {/* Accordion 1: Main Pages */}
                <div className="rounded-2xl border border-[#111613]/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === "pages" ? null : "pages")
                    }
                    className="w-full px-4 py-3 bg-[#FCFAEB] flex items-center justify-between text-sm font-black text-[#111613] cursor-pointer"
                  >
                    <span>صفحات الموقع</span>
                    <span className="font-en text-xs text-[#027443]">
                      {openAccordion === "pages" ? "−" : "+"}
                    </span>
                  </button>
                  {openAccordion === "pages" && (
                    <div className="divide-y divide-[#111613]/[0.06] bg-white">
                      {NAV_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-xs font-extrabold hover:bg-[#F2FAF5] transition-colors"
                        >
                          <span className="text-right text-[#111613]">{item.labelAr}</span>
                          <span className="font-en text-[11px] text-[#111613]/45 text-left">
                            {item.labelEn}
                          </span>
                        </Link>
                      ))}

                      {/* Clean Split Row for `أقسام المشتريات` + `QR` (Matches alban3sal lines 284-311) */}
                      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#FCFAEB]/65">
                        <Link
                          href="/menu"
                          onClick={() => setDrawerOpen(false)}
                          className="flex-1 px-2 py-1.5 rounded-xl text-xs font-black text-[#027443] hover:bg-[#027443]/10 flex items-center justify-between transition"
                        >
                          <span>أقسام المشتريات</span>
                          <span className="font-en text-[11px] text-[#027443]/75">MARKET</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            setQrOpen(true);
                          }}
                          aria-label="باركود ومشاركة أقسام المشتريات QR"
                          title="باركود ومشاركة أقسام المشتريات (QR)"
                          className="shrink-0 h-8 px-3 rounded-xl bg-[#027443] hover:bg-[#111613] text-white flex items-center justify-center gap-1.5 font-extrabold text-xs transition active:scale-95 cursor-pointer"
                        >
                          <QrCodeIcon className="w-3.5 h-3.5 text-[#FAA006] shrink-0" />
                          <span className="font-en">QR</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Hypermarket Departments (`أقسام المشتريات`) */}
                <div className="rounded-2xl border border-[#111613]/10 overflow-hidden">
                  <div className="w-full px-3 py-2.5 bg-[#FCFAEB] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAccordion(openAccordion === "cats" ? null : "cats")
                      }
                      className="flex-1 flex items-center justify-between text-sm font-black text-[#111613] cursor-pointer"
                    >
                      <span>أقسام المشتريات (٩ أقسام)</span>
                      <span className="font-en text-xs text-[#027443] px-1">
                        {openAccordion === "cats" ? "−" : "+"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerOpen(false);
                        setQrOpen(true);
                      }}
                      aria-label="باركود أقسام المشتريات QR"
                      title="باركود أقسام المشتريات (QR)"
                      className="shrink-0 h-7 px-2.5 rounded-lg bg-[#FAA006] hover:brightness-105 text-[#111613] flex items-center gap-1 font-black text-[11px] transition active:scale-95 cursor-pointer"
                    >
                      <QrCodeIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-en">QR</span>
                    </button>
                  </div>
                  {openAccordion === "cats" && (
                    <div className="divide-y divide-[#111613]/[0.06] bg-white">
                      {QUICK_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-xs font-extrabold hover:bg-[#F2FAF5] transition-colors"
                        >
                          <span className="text-right text-[#111613]">{cat.labelAr}</span>
                          <span className="font-en text-[10px] text-[#027443] text-left">
                            {cat.labelEn}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Pinned Bottom Actions in Drawer (`shrink-0`) */}
              <div className="shrink-0 p-4 pt-3 border-t border-[#111613]/10 bg-white space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/201270158888"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#027443] text-white py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-black"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>واتساب الطلبات</span>
                  </a>
                  <a
                    href="tel:01270158888"
                    className="rounded-full border border-[#111613]/20 bg-white text-[#111613] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-black"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 text-[#027443]" />
                    <span className="font-en">01270158888</span>
                  </a>
                </div>

                {/* Paired Action CTA at bottom of Drawer (Matches BurgerStorm lines 560-580) */}
                <div className="flex items-center gap-2 pt-0.5">
                  <Link
                    href="/menu"
                    onClick={() => setDrawerOpen(false)}
                    className="flex-1 rounded-full bg-[#111613] hover:bg-[#027443] text-white font-black text-xs py-2.5 px-4 text-center transition"
                  >
                    اطلب الآن من أقسام المشتريات
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      setQrOpen(true);
                    }}
                    aria-label="باركود أقسام المشتريات"
                    title="باركود أقسام المشتريات (QR)"
                    className="w-10 h-10 rounded-full bg-[#FAA006] text-[#111613] grid place-items-center hover:brightness-105 transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <QrCodeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </aside>
          </div>,
          document.body,
        )}

      <MenuQrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}
