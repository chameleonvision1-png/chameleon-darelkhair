"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { useStore } from "./store";
import {
  ChevronIcon,
  FireIcon,
  GridIcon,
  ListIcon,
  PinIcon,
  QrCodeIcon,
  SearchIcon,
  SparkleIcon,
  UsersIcon,
  XIcon,
} from "./icons";

const filters = [
  { id: "all", label: "كل الأقسام", icon: null },
  { id: "best", label: "الأكثر طلبًا", icon: "fire" as const },
  { id: "offers", label: "عروض المجلة", icon: "sparkle" as const },
  { id: "cheese", label: "ثلاجة الجبن والفينو", icon: null },
  { id: "family", label: "خزين البيت والعيلة", icon: "users" as const },
];

const categoryDescriptions: Record<string, string> = {
  dairy:
    "حليب المراعي، جهينة، لمار، بشاير، وزبادي المراعي وجبنة مثلثات طازجة بأسعار التوفير اليومية",
  jams:
    "مربى فيتراك (فراولة وتين)، حلاوة طحينية البوادي السادة وبالشوكولاتة، وعسل نحل امتنان الطبيعي",
  oils:
    "زيت عافية ذرة ودوار الشمس، زيت كريستال، زيت قلية، سمن روابي وجنة، وزبدة فيرن ولورباك",
  pasta:
    "مكرونة الملكة، إيطاليانو، الضحى، ستار، وشعرية ولسان عصفور بجميع الأشكال والأوزان",
  tea_sugar:
    "شاي العروسة، شاي ليبتون خرز وفتلة، وسكر أبيض نقي للتحلية اليومية",
  rice_flour:
    "أرز الضحى والساعة المصري الفاخر، ودقيق الضحى والكوثر متعدد الاستخدامات للمخبوزات",
  canned:
    "تونة صن شاين، فول مدمس حدائق كاليفورنيا، وذرة حلوة ومشروم وكمبوت",
  tomato:
    "صلصة طماطم هاينز وهارفست وبيوريه الطماطم المركز وخل قصب طبيعي",
  cheese_bakery:
    "عرض الجبنة جابت الفينو معاها (فاتورة 100 ج = كيس فينو هدية • 200 ج = كيسين فينو هدية) وبوكس الألف جنيه لسحب الميكروويف",
};

const MENU_SHEETS = [
  { src: "/images/magazine/page-1.webp", title: "غلاف مجلة عروض دار الخير (١)" },
  { src: "/images/magazine/page-2.webp", title: "قسم الألبان والزبادي وسحب الميكروويف (٢)" },
  { src: "/images/magazine/page-3.webp", title: "قسم المربى والحلاوة الطحينية والعسل (٣)" },
  { src: "/images/magazine/page-4.webp", title: "قسم الزيوت والسمن والزبدة (٤)" },
  { src: "/images/magazine/page-5.webp", title: "قسم المكرونة والشعرية (٥)" },
  { src: "/images/magazine/page-6.webp", title: "قسم الشاي والسكر والأرز والدقيق (٦)" },
  { src: "/images/magazine/page-7.webp", title: "قسم التونة والفول والصلصة والخل (٧)" },
  { src: "/images/magazine/page-8.webp", title: "عرض ثلاجة الجبن والفينو الهدية (٨)" },
  { src: "/images/magazine/page-9.webp", title: "بيانات التواصل والتوصيل بمدينة بدر (٩)" },
];

const MenuChapters = memo(function MenuChapters({
  visibleCats,
  filtered,
  view,
  setSectionRef,
}: {
  visibleCats: Category[];
  filtered: Product[];
  view: "menu" | "grid";
  setSectionRef: (id: string, el: HTMLElement | null) => void;
}) {
  return (
    <div className="space-y-8 min-w-0 w-full max-w-full">
      {visibleCats.map((c, idx) => {
        const items = filtered.filter((p) => p.categoryId === c.id);
        const desc =
          categoryDescriptions[c.id] ||
          "متوفر طازجًا يوميًا في دار الخير هايبر ماركت — مدينة بدر مع توصيل سريع 24 ساعة";
        return (
          <section
            key={c.id}
            id={`cat-${c.id}`}
            ref={(el) => setSectionRef(c.id, el)}
            className="scroll-mt-36 w-full max-w-full min-w-0 overflow-hidden bg-white rounded-[32px] p-4 sm:p-6 border border-[#027443]/18 shadow-[0_10px_28px_-14px_rgba(2,116,67,0.1)]"
          >
            {/* Menu Chapter Header */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-5 pb-4 border-b border-[#027443]/12 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FCFAEB] border border-[#027443]/15 p-1.5 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.nameAr}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      dir="ltr"
                      className="font-en text-xs text-[#027443] bg-[#FCFAEB] border border-[#027443]/20 px-2.5 py-0.5 rounded-full"
                    >
                      /{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="inline-flex items-center rounded-xl bg-[#027443] text-white px-3.5 py-1 text-base sm:text-xl font-black shadow-xs text-right">
                      {c.nameAr}
                    </h2>
                    <span className="text-xs font-extrabold bg-[#FAA006] text-[#111613] px-2.5 py-0.5 rounded-full">
                      {items.length} منتج
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#111613]/68 mt-1.5 text-right">{desc}</p>
              </div>
            </div>

            {/* Menu Items List / Horizontal Carousel in Card View on Mobile */}
            {view === "menu" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 min-w-0 w-full">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="menu" />
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible min-w-0 w-full">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="w-[78vw] max-w-[290px] shrink-0 snap-center sm:w-auto sm:max-w-none"
                  >
                    <ProductCard product={p} variant="grid" />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
});

export default function MenuClient({
  categories,
  products,
  initialCat,
}: {
  categories: Category[];
  products: Product[];
  initialCat?: string;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"menu" | "grid" | "sheets">("menu");
  const [sheetIdx, setSheetIdx] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState(initialCat ?? categories[0]?.id);
  const activeCatRef = useRef(activeCat);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRafRef = useRef<number>(0);
  const animatingCatRef = useRef<string | null>(null);
  const isStripTouchingRef = useRef(false);
  const stripTouchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { branch, openPicker, hydrated } = useStore();

  useEffect(() => {
    activeCatRef.current = activeCat;
  }, [activeCat]);

  const setSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (
        term &&
        !(
          p.nameAr.toLowerCase().includes(term) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(term)) ||
          p.descriptionAr.toLowerCase().includes(term)
        )
      ) {
        return false;
      }
      switch (filter) {
        case "best":
          return p.isBestSeller;
        case "offers":
          return Boolean(p.badge || p.isNew);
        case "cheese":
          return p.categoryId === "cheese_bakery" || p.categoryId === "dairy";
        case "family":
          return Boolean(p.forFamily || p.categoryId === "oils" || p.categoryId === "rice_flour");
        default:
          return true;
      }
    });
  }, [q, filter, products]);

  const visibleCats = useMemo(
    () => categories.filter((c) => filtered.some((p) => p.categoryId === c.id)),
    [categories, filtered],
  );

  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of filtered) {
      map[p.categoryId] = (map[p.categoryId] || 0) + 1;
    }
    return map;
  }, [filtered]);

  const centerActivePill = useCallback((catId: string, immediate = false) => {
    const box = pillsRef.current;
    const pill = box?.querySelector<HTMLElement>(`[data-cat="${catId}"]`);
    if (!box || !pill) return;

    if (!immediate && pillRafRef.current && animatingCatRef.current === catId) {
      return;
    }

    if (pillRafRef.current) {
      cancelAnimationFrame(pillRafRef.current);
      pillRafRef.current = 0;
    }

    const boxRect = box.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta =
      pillRect.left + pillRect.width * 0.5 - (boxRect.left + boxRect.width * 0.5);

    if (Math.abs(delta) < 2) {
      animatingCatRef.current = null;
      return;
    }

    const startScrollLeft = box.scrollLeft;
    if (immediate) {
      box.scrollLeft = startScrollLeft + delta;
      animatingCatRef.current = null;
      return;
    }

    animatingCatRef.current = catId;
    const startTime = performance.now();
    const duration = Math.min(360, Math.max(240, Math.abs(delta) * 1.1));

    const step = (now: number) => {
      if (isStripTouchingRef.current) {
        pillRafRef.current = 0;
        animatingCatRef.current = null;
        return;
      }
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      box.scrollLeft = startScrollLeft + delta * eased;

      if (t < 1) {
        pillRafRef.current = requestAnimationFrame(step);
      } else {
        pillRafRef.current = 0;
        animatingCatRef.current = null;
      }
    };
    pillRafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!activeCat || view === "sheets") return;
    if (!isStripTouchingRef.current) {
      centerActivePill(activeCat, false);
    }
  }, [activeCat, visibleCats, view, centerActivePill]);

  useEffect(() => {
    if (initialCat) {
      setTimeout(() => {
        const el = sectionRefs.current[initialCat];
        if (!el) return;
        const stickyBottom = stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
        const top = window.scrollY + el.getBoundingClientRect().top - stickyBottom - 14;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }, 40);
    }
  }, [initialCat]);

  useEffect(() => {
    if (view === "sheets" || visibleCats.length === 0) return;
    let ticking = false;

    const unlockJumpOnManualInput = () => {
      if (isJumpingRef.current) {
        isJumpingRef.current = false;
        if (jumpTimerRef.current) {
          clearTimeout(jumpTimerRef.current);
          jumpTimerRef.current = null;
        }
      }
    };

    const onScroll = () => {
      if (isJumpingRef.current || ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const stickyBottom =
          stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
        const triggerLine = stickyBottom + 24;
        const hysteresis = 20;
        const prevId = activeCatRef.current;
        let candidateId = visibleCats[0].id;

        for (const c of visibleCats) {
          const el = sectionRefs.current[c.id];
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          const threshold =
            c.id === prevId ? triggerLine + hysteresis : triggerLine - hysteresis;
          if (top <= threshold) {
            candidateId = c.id;
          } else {
            break;
          }
        }

        if (candidateId !== prevId) {
          activeCatRef.current = candidateId;
          setActiveCat(candidateId);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", unlockJumpOnManualInput, { passive: true });
    window.addEventListener("touchmove", unlockJumpOnManualInput, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", unlockJumpOnManualInput);
      window.removeEventListener("touchmove", unlockJumpOnManualInput);
    };
  }, [visibleCats, view]);

  const jump = (id: string) => {
    if (view === "sheets") setView("menu");
    isStripTouchingRef.current = false;
    activeCatRef.current = id;
    setActiveCat(id);
    centerActivePill(id, false);

    isJumpingRef.current = true;
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
    }, 750);

    setTimeout(() => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const stickyBottom =
        stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
      const top = window.scrollY + el.getBoundingClientRect().top - stickyBottom - 14;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 10);
  };

  const openQrModal = () => {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  };

  return (
    <div className="min-h-screen pb-16 bg-white w-full max-w-full min-w-0">
      {/* ONDERA Forest Green Architectural Catalog Header */}
      <section className="pt-4 pb-3 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full min-w-0">
        <div className="relative overflow-hidden rounded-[32px] bg-[#111613] text-white p-5 sm:p-8 md:p-10 shadow-[0_18px_40px_-16px_rgba(17,22,19,0.35)] border border-[#027443]/30">
          <div
            className="pointer-events-none absolute -top-24 -end-24 w-80 h-80 rounded-full bg-[#027443]/35 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 min-w-0">
            <div className="flex-1 min-w-0 flex flex-col items-start text-right">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white text-right">
                أقسام ومجلة عروض دار الخير هايبر ماركت
              </h1>
              <p className="text-white/80 mt-2 text-xs sm:text-base max-w-2xl leading-relaxed font-semibold text-right">
                الألبان والجبن، المربى والحلاوة والعسل، الزيوت والسمن، المكرونة، الشاي والسكر، الأرز والدقيق، المعلبات والصلصة، وعرض الجبنة جابت الفينو معاها — اضغط على أي منتج لإضافته للسلة.
              </p>
            </div>

            {/* Branch & QR Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 min-w-0">
              <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:min-w-[260px] flex items-center justify-between gap-3 min-w-0">
                <div className="min-w-0 text-right">
                  <div className="text-[11px] font-bold text-[#FAA006]">
                    نطاق التوصيل (24 ساعة)
                  </div>
                  <div className="font-black text-sm sm:text-base text-white truncate mt-0.5">
                    {hydrated && branch ? branch.name : "دار الخير — مدينة بدر"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openPicker}
                  className="shrink-0 rounded-xl bg-[#027443] text-white hover:bg-[#FAA006] hover:text-[#111613] font-black text-xs px-3.5 py-2.5 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <PinIcon className="w-3.5 h-3.5" />
                  <span>التفاصيل</span>
                </button>
              </div>

              <button
                type="button"
                onClick={openQrModal}
                className="rounded-2xl bg-[#FAA006] hover:bg-white text-[#111613] font-black text-xs sm:text-sm px-4 py-3.5 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCodeIcon className="w-5 h-5 text-[#111613]" />
                <span>باركود الكتالوج QR</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search, Filters & View Switcher */}
      <div className="bg-[#FCFAEB] border-y border-[#027443]/15 mt-2 w-full max-w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2.5 min-w-0 w-full">
            {/* Search Box */}
            <div className="relative w-full md:w-72 lg:w-88 shrink-0 min-w-0">
              <SearchIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3.5 text-[#111613]/45 pointer-events-none" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  if (view === "sheets") setView("menu");
                }}
                placeholder="ابحث في دار الخير… المراعي، عافية، الضحى، فينو، جبنة"
                className="w-full rounded-full border border-[#027443]/25 bg-white focus:border-[#027443] ps-10 pe-9 py-2 text-sm font-bold text-[#111613] placeholder:font-normal placeholder:text-[#111613]/45 outline-none transition"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 rounded-full bg-[#111613]/10 hover:bg-[#111613]/20 text-[#111613]/70 grid place-items-center"
                  aria-label="مسح البحث"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Chips — Full-bleed edge-to-edge on mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar md:w-auto md:flex-1 -mx-4 px-4 sm:mx-0 sm:px-0 py-1.5">
              {filters.map((f) => {
                const active = filter === f.id && view !== "sheets";
                return (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => {
                      setFilter(f.id);
                      if (view === "sheets") setView("menu");
                    }}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-colors cursor-pointer ${
                      active
                        ? "bg-[#027443] text-white border-[#027443] shadow-xs"
                        : "border-[#027443]/22 text-[#111613]/80 bg-white hover:border-[#027443] hover:text-[#027443]"
                    }`}
                  >
                    {f.icon === "fire" && (
                      <FireIcon
                        className={`w-3.5 h-3.5 ${active ? "text-[#FAA006]" : "text-[#027443]"}`}
                      />
                    )}
                    {f.icon === "sparkle" && (
                      <SparkleIcon
                        className={`w-3.5 h-3.5 ${active ? "text-[#FAA006]" : "text-[#027443]"}`}
                      />
                    )}
                    {f.icon === "users" && <UsersIcon className="w-3.5 h-3.5" />}
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Toggle — Fits 100% cleanly on mobile without clipping */}
            <div className="grid grid-cols-3 sm:flex items-center bg-white p-1 rounded-full border border-[#027443]/25 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setView("menu")}
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-colors cursor-pointer whitespace-nowrap ${
                  view === "menu"
                    ? "bg-[#027443] text-white shadow-xs"
                    : "text-[#111613]/75 hover:text-[#027443]"
                }`}
              >
                <ListIcon className="w-3.5 h-3.5 shrink-0" />
                <span>الكتالوج التفاعلي</span>
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-colors cursor-pointer whitespace-nowrap ${
                  view === "grid"
                    ? "bg-[#027443] text-white shadow-xs"
                    : "text-[#111613]/75 hover:text-[#027443]"
                }`}
              >
                <GridIcon className="w-3.5 h-3.5 shrink-0" />
                <span>بطاقات</span>
              </button>
              <button
                type="button"
                onClick={() => setView("sheets")}
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-colors cursor-pointer whitespace-nowrap ${
                  view === "sheets"
                    ? "bg-[#027443] text-white shadow-xs"
                    : "text-[#111613]/75 hover:text-[#027443]"
                }`}
              >
                <span>صور المجلة (9)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Category Bar — Full-bleed edge-to-edge scroll & unclipped vertical padding */}
      {view !== "sheets" && visibleCats.length > 0 && (
        <div
          ref={stickyBarRef}
          className="sticky top-14 lg:top-16 z-30 w-full max-w-full bg-white/95 backdrop-blur-md border-b border-[#111613]/[0.08] shadow-[0_8px_20px_-12px_rgba(17,22,19,0.10)]"
        >
          <div className="mx-auto max-w-7xl min-w-0">
            <div
              ref={pillsRef}
              onPointerDown={() => {
                isStripTouchingRef.current = true;
                if (stripTouchTimerRef.current) clearTimeout(stripTouchTimerRef.current);
                if (pillRafRef.current) {
                  cancelAnimationFrame(pillRafRef.current);
                  pillRafRef.current = 0;
                }
              }}
              onPointerUp={() => {
                if (stripTouchTimerRef.current) clearTimeout(stripTouchTimerRef.current);
                stripTouchTimerRef.current = setTimeout(() => {
                  isStripTouchingRef.current = false;
                }, 650);
              }}
              onPointerCancel={() => {
                isStripTouchingRef.current = false;
              }}
              onTouchStart={() => {
                isStripTouchingRef.current = true;
                if (stripTouchTimerRef.current) clearTimeout(stripTouchTimerRef.current);
                if (pillRafRef.current) {
                  cancelAnimationFrame(pillRafRef.current);
                  pillRafRef.current = 0;
                }
              }}
              onTouchEnd={() => {
                if (stripTouchTimerRef.current) clearTimeout(stripTouchTimerRef.current);
                stripTouchTimerRef.current = setTimeout(() => {
                  isStripTouchingRef.current = false;
                }, 650);
              }}
              className="w-full max-w-full overflow-x-auto no-scrollbar px-3.5 sm:px-6 lg:px-8 py-2.5"
            >
              <div className="flex gap-2 items-center min-w-max">
                {visibleCats.map((c) => {
                  const active = activeCat === c.id;
                  const countInCat = catCounts[c.id] || 0;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      data-cat={c.id}
                      onClick={() => jump(c.id)}
                      className={`relative shrink-0 flex items-center gap-2 pe-3.5 ps-1.5 py-1.5 rounded-full text-xs font-black border transition-all duration-200 ease-out cursor-pointer ${
                        active
                          ? "bg-[#027443] text-white border-[#027443] shadow-[0_3px_9px_-2px_rgba(2,116,67,0.28)]"
                          : "bg-[#FCFAEB] text-[#111613]/85 border-[#111613]/12 hover:border-[#027443]/45 hover:bg-[#F2FAF5] hover:text-[#027443]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt=""
                        className={`w-6 h-6 rounded-full object-contain bg-white p-0.5 border shrink-0 transition-transform duration-200 ${
                          active
                            ? "border-[#FAA006] scale-105"
                            : "border-[#111613]/10"
                        }`}
                      />
                      <span>{c.nameAr}</span>
                      <span
                        dir="ltr"
                        className={`font-en text-[10px] font-black px-2 py-0.5 rounded-full leading-none transition-colors duration-200 ${
                          active
                            ? "bg-[#FAA006] text-[#111613]"
                            : "bg-white text-[#027443] border border-[#027443]/15"
                        }`}
                      >
                        {countInCat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        {view === "sheets" ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-[#FCFAEB] p-5 rounded-3xl border border-[#027443]/25">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#027443]">
                  مجلة عروض دار الخير هايبر ماركت الرسمية ({MENU_SHEETS.length} صفحات)
                </h2>
                <p className="text-xs sm:text-sm text-[#111613]/68 mt-0.5">
                  اضغط على أي صفحة لتكبيرها، أو حمّل ملف الـ PDF الرسمي، أو انتقل إلى «الكتالوج التفاعلي» لإضافة المنتجات مباشرة إلى السلة.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <a
                  href="/images/magazine/darelkhair-magazine.pdf"
                  download
                  className="btn bg-[#111613] hover:bg-[#027443] text-white text-xs sm:text-sm py-2.5 px-4"
                >
                  تحميل المجلة PDF
                </a>
                <button
                  type="button"
                  onClick={() => setView("menu")}
                  className="btn bg-[#027443] hover:bg-[#015933] text-white text-xs sm:text-sm py-2.5 px-5 cursor-pointer"
                >
                  اطلب من الكتالوج التفاعلي
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {MENU_SHEETS.map((sheet, idx) => (
                <button
                  type="button"
                  key={sheet.src}
                  onClick={() => setSheetIdx(idx)}
                  className="group bg-white rounded-3xl p-2.5 border border-[#027443]/22 hover:border-[#027443] shadow-xs hover:shadow-xl transition-all text-start cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#FCFAEB]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sheet.src}
                      alt={sheet.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                    />
                  </div>
                  <div className="px-2 pt-2.5 pb-1 flex items-center justify-between gap-2">
                    <span className="font-black text-xs sm:text-sm text-[#111613] group-hover:text-[#027443] text-right">
                      {sheet.title}
                    </span>
                    <span className="text-[11px] font-bold text-[#027443] shrink-0">
                      تكبير
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : visibleCats.length === 0 ? (
          <div className="bg-[#FCFAEB] rounded-3xl border border-[#027443]/25 text-center py-20 px-4 max-w-lg mx-auto my-8 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#027443] mx-auto grid place-items-center mb-4">
              <SearchIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-[#111613]">
              لم نجد منتجات مطابقة لبحثك
            </h2>
            <p className="text-sm text-[#111613]/60 mt-1">
              جرّب البحث بكلمة أخرى أو امسح الفلتر لعرض كافة أقسام دار الخير هايبر ماركت.
            </p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setFilter("all");
              }}
              className="btn btn-primary mt-5 text-sm py-2.5 px-6 cursor-pointer"
            >
              عرض كل الأقسام
            </button>
          </div>
        ) : (
          <MenuChapters
            visibleCats={visibleCats}
            filtered={filtered}
            view={view}
            setSectionRef={setSectionRef}
          />
        )}
      </div>

      {/* Lightbox for Official Magazine Pages */}
      {sheetIdx !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[95] bg-[#111613]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
            onClick={() => setSheetIdx(null)}
          >
            <button
              type="button"
              onClick={() => setSheetIdx(null)}
              className="absolute top-4 end-4 w-11 h-11 rounded-full bg-white text-[#027443] grid place-items-center shadow-lg z-10 cursor-pointer"
              aria-label="إغلاق"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSheetIdx((i) =>
                  i === null ? 0 : (i - 1 + MENU_SHEETS.length) % MENU_SHEETS.length,
                );
              }}
              className="absolute start-3 sm:start-6 w-11 h-11 rounded-full bg-white text-[#027443] grid place-items-center shadow-lg z-10 cursor-pointer"
              aria-label="السابق"
            >
              <ChevronIcon className="w-6 h-6 rotate-180" />
            </button>

            <div
              className="max-h-[90vh] max-w-xl w-full flex flex-col items-center animate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MENU_SHEETS[sheetIdx].src}
                alt={MENU_SHEETS[sheetIdx].title}
                className="max-h-[82vh] w-auto rounded-2xl shadow-2xl object-contain"
              />
              <div className="mt-3 text-[#111613] font-black text-sm bg-[#FAA006] px-4 py-1.5 rounded-full shadow-md">
                {MENU_SHEETS[sheetIdx].title} ({sheetIdx + 1} / {MENU_SHEETS.length})
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSheetIdx((i) =>
                  i === null ? 0 : (i + 1) % MENU_SHEETS.length,
                );
              }}
              className="absolute end-3 sm:end-6 w-11 h-11 rounded-full bg-white text-[#027443] grid place-items-center shadow-lg z-10 cursor-pointer"
              aria-label="التالي"
            >
              <ChevronIcon className="w-6 h-6" />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
