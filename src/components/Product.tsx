"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import ModelViewer3D from "./ModelViewer3D";
import {
  CheckIcon,
  Cube3DIcon,
  MinusIcon,
  NoteIcon,
  PhotoIcon,
  PinIcon,
  PlusIcon,
  XIcon,
} from "./icons";

export function isUnavailable(p: Product, branchId?: string | null) {
  return !p.isAvailable || (!!branchId && p.unavailableBranches.includes(branchId));
}

function compactSizeLabel(label: string) {
  return label.replace(/\s*\([^)]*\)/g, "").trim();
}

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "menu" | "grid";
}) {
  const [open, setOpen] = useState(false);
  const [initialShow3d, setInitialShow3d] = useState(false);
  const [initialSizeId, setInitialSizeId] = useState<string | undefined>(product.sizes[0]?.id);
  const { branch } = useStore();
  const off = isUnavailable(product, branch?.id);
  const mainSize = product.sizes[0];
  const mainPrice = mainSize?.price ?? 0;

  const openModal = (sizeId?: string, startIn3d = false) => {
    if (off) return;
    setInitialSizeId(sizeId ?? product.sizes[0]?.id);
    setInitialShow3d(startIn3d);
    setOpen(true);
  };

  if (variant === "menu") {
    return (
      <>
        <article
          role="button"
          tabIndex={off ? -1 : 0}
          onClick={() => openModal()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openModal();
            }
          }}
          className={`group relative w-full max-w-full min-w-0 overflow-hidden bg-white rounded-[24px] p-3.5 sm:p-4 border border-[#111613]/12 hover:border-[#027443] shadow-[0_6px_18px_-10px_rgba(17,22,19,0.08)] hover:shadow-[0_14px_30px_-12px_rgba(2,116,67,0.2)] transition-all duration-200 flex items-center gap-3.5 text-start ${
            off ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {/* Main Menu Details — Stacked Eyebrow + Full Arabic Title (Zero Truncation) */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                {product.nameEn ? (
                  <span
                    dir="ltr"
                    className="font-en text-[10px] tracking-wider text-[#027443] uppercase truncate text-left"
                  >
                    {product.nameEn}
                  </span>
                ) : (
                  <span />
                )}
                {product.isBestSeller && (
                  <span className="shrink-0 text-[10px] font-black bg-[#FAA006]/25 text-[#111613] px-2 py-0.5 rounded-full">
                    الأكثر طلبًا
                  </span>
                )}
              </div>

              <h3 className="font-black text-sm sm:text-base text-[#111613] group-hover:text-[#027443] transition-colors leading-snug text-right">
                {product.nameAr}
              </h3>
            </div>

            <p className="text-xs text-[#111613]/65 mt-1 line-clamp-2 leading-relaxed text-right">
              {product.descriptionAr}
            </p>

            {/* Bottom Row: Official Magazine Gold & Green Price Tags + Variants */}
            <div className="mt-2.5 flex items-center justify-between gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-full bg-[#027443] text-white px-3 py-0.5 text-xs font-black whitespace-nowrap shadow-xs">
                  {formatPrice(mainPrice)}
                </span>
                {product.badge && (
                  <span
                    dir="ltr"
                    className="inline-flex items-center rounded-full bg-[#FAA006] text-[#111613] px-2.5 py-0.5 text-[10px] font-black uppercase"
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {product.sizes.length > 1 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {product.sizes.slice(0, 2).map((s) => (
                    <span
                      key={s.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(s.id);
                      }}
                      className="inline-flex items-center rounded-full bg-[#FCFAEB] hover:bg-[#027443]/10 border border-[#027443]/25 px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#111613] whitespace-nowrap transition"
                    >
                      {compactSizeLabel(s.label)} • {s.price} ج
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Cutout Thumbnail + Green Plus Button */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] overflow-hidden bg-[#FCFAEB] shrink-0 border border-[#111613]/10 p-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-contain drop-shadow-[0_8px_12px_rgba(17,22,19,0.16)] transition duration-500 group-hover:scale-108"
            />
            {off ? (
              <div className="absolute inset-0 grid place-items-center bg-[#111613]/60 backdrop-blur-[1px]">
                <span className="bg-white text-[#111613] text-[10px] font-black px-2 py-0.5 rounded-full">
                  غير متاح
                </span>
              </div>
            ) : (
              <span className="absolute top-1.5 end-1.5 w-7 h-7 rounded-full bg-[#027443] text-white grid place-items-center shadow-md group-hover:bg-[#111613] transition-colors">
                <PlusIcon className="w-4 h-4" />
              </span>
            )}
          </div>
        </article>
        {open && (
          <ProductModal
            product={product}
            initialSizeId={initialSizeId}
            initialShow3d={initialShow3d}
            onClose={() => setOpen(false)}
          />
        )}
      </>
    );
  }

  // ONDERA Sculptural Bento Product Card (Grid & Carousel Variant)
  return (
    <>
      <article
        role="button"
        tabIndex={off ? -1 : 0}
        onClick={() => openModal()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
        className={`group relative rounded-[26px] bg-white border border-[#111613]/12 hover:border-[#027443] p-4 flex flex-col justify-between shadow-[0_10px_26px_-14px_rgba(17,22,19,0.08)] hover:shadow-[0_18px_36px_-14px_rgba(2,116,67,0.22)] transition-all duration-200 text-start h-full ${
          off ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {/* Top Stage with Warm Cream Backdrop & Inverted Cutout Action Button */}
        <div className="relative aspect-[4/3] rounded-[20px] bg-[#FCFAEB] p-3 flex items-center justify-center overflow-hidden border border-[#027443]/10">
          {/* Top-Left Magazine Badge */}
          {product.badge && (
            <span
              dir="ltr"
              className="absolute top-2.5 left-2.5 z-10 inline-flex items-center rounded-full bg-[#027443] text-white px-2.5 py-0.5 text-[10px] font-en tracking-wider uppercase shadow-2xs"
            >
              {product.badge}
            </span>
          )}

          {/* Top-Right Quick Add Circle Button */}
          <span
            aria-label="أضف إلى السلة"
            className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-[#111613] group-hover:bg-[#027443] text-white grid place-items-center shadow-sm transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.nameAr}
            className="relative z-0 w-[84%] h-[84%] object-contain drop-shadow-[0_12px_18px_rgba(17,22,19,0.18)] transition duration-500 group-hover:scale-108"
          />

          {/* Bottom-Right Golden Price Pill matching Dar El Khair Magazine */}
          <span className="absolute bottom-2.5 right-2.5 z-10 inline-flex items-center rounded-full bg-[#FAA006] text-[#111613] px-3 py-1 text-xs font-black shadow-xs">
            {formatPrice(mainPrice)}
          </span>
        </div>

        {/* Bottom Details — Stacked English Eyebrow + Full Arabic Title (Never Truncated) */}
        <div className="pt-3.5 flex flex-col justify-end flex-1">
          {product.nameEn && (
            <div
              dir="ltr"
              className="font-en text-[10px] tracking-wider text-[#027443] uppercase truncate text-left mb-0.5"
            >
              {product.nameEn}
            </div>
          )}

          <h3 className="text-sm sm:text-[15px] font-black text-[#111613] group-hover:text-[#027443] transition-colors leading-snug text-right">
            {product.nameAr}
          </h3>

          <p className="text-xs text-[#111613]/65 mt-1 line-clamp-2 leading-relaxed text-right">
            {product.descriptionAr}
          </p>
        </div>
      </article>
      {open && (
        <ProductModal
          product={product}
          initialSizeId={initialSizeId}
          initialShow3d={initialShow3d}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

const HYPERMARKET_QUICK_NOTES = [
  "تاريخ إنتاج حديث",
  "بديل بنفس السعر لو غير متوفر",
  "تغليف منفصل",
  "توصيل سريع",
];

export function ProductModal({
  product,
  initialSizeId,
  initialShow3d = false,
  onClose,
}: {
  product: Product;
  initialSizeId?: string;
  initialShow3d?: boolean;
  onClose: () => void;
}) {
  const { addToCart, branch } = useStore();
  const [sizeId, setSizeId] = useState(initialSizeId ?? product.sizes[0]?.id);
  const [show3d, setShow3d] = useState(Boolean(product.model3d && initialShow3d));
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const chosen = product.addons.filter((a) => addons.includes(a.id));
  const addonsTotal = chosen.reduce((s, a) => s + a.price, 0);
  const unit = (size?.price ?? 0) + addonsTotal;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const toggleQuickNote = (chip: string) => {
    const parts = note
      .split("،")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.includes(chip)) {
      setNote(parts.filter((p) => p !== chip).join("، "));
    } else {
      setNote([...parts, chip].join("، "));
    }
  };

  const add = () => {
    if (added) return;
    addToCart({
      productId: product.id,
      name: product.nameAr,
      image: product.image,
      sizeLabel: size?.label,
      addons: chosen.map((a) => ({ label: a.label, price: a.price })),
      note: note.trim() || undefined,
      unitPrice: unit,
      qty,
    });
    setAdded(true);
    setTimeout(onClose, 500);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-stretch sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div className="hidden sm:block absolute inset-0 bg-[#111613]/70 backdrop-blur-md" />

      <div
        className={`relative w-full h-dvh sm:h-auto ${
          product.model3d ? "sm:max-w-3xl" : "sm:max-w-2xl"
        } bg-white rounded-none sm:rounded-[28px] shadow-2xl overflow-hidden sm:max-h-[88vh] flex flex-col md:flex-row sm:border border-[#027443]/25`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Showcase Column */}
        <div
          className={`relative ${
            show3d
              ? "h-[40dvh] sm:h-80 md:w-76"
              : "h-[34dvh] sm:h-68 md:w-68"
          } md:h-auto shrink-0 bg-gradient-to-b from-[#027443] via-[#026038] to-[#111613] overflow-hidden flex items-center justify-center p-6`}
        >
          {product.model3d && show3d ? (
            <ModelViewer3D
              src={product.model3d}
              poster={product.image}
              alt={product.nameAr}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.image}
              alt={product.nameAr}
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
            />
          )}

          <button
            type="button"
            onClick={onClose}
            className="md:hidden absolute top-4 end-4 z-20 w-10 h-10 rounded-full bg-white text-[#111613] shadow-md grid place-items-center"
            aria-label="إغلاق"
          >
            <XIcon className="w-5 h-5" />
          </button>

          {product.model3d && (
            <div className="absolute top-4 start-4 z-20">
              <button
                type="button"
                onClick={() => setShow3d((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-full shadow-md bg-white text-[#027443]"
              >
                {show3d ? (
                  <>
                    <PhotoIcon className="w-3.5 h-3.5" />
                    <span>الصورة</span>
                  </>
                ) : (
                  <>
                    <Cube3DIcon className="w-3.5 h-3.5" />
                    <span>عرض 3D</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Content & Customization Column */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
          <div className="px-5 pt-4 pb-3.5 border-b border-[#111613]/10 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <h2
                    id="modal-product-title"
                    className="text-lg sm:text-xl font-black text-[#111613] leading-snug truncate text-right"
                  >
                    {product.nameAr}
                  </h2>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-[#FAA006] text-[#111613] px-3 py-0.5 text-xs sm:text-sm font-black">
                    {formatPrice(size?.price ?? 0)}
                  </span>
                </div>

                {product.nameEn && (
                  <div
                    dir="ltr"
                    className="font-en text-xs tracking-wider text-[#027443] uppercase truncate text-left shrink-0 max-w-[40%]"
                  >
                    {product.nameEn}
                  </div>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#111613]/70 mt-1 leading-relaxed text-right">
                {product.descriptionAr}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="hidden md:grid w-9 h-9 rounded-full bg-[#F2FAF5] hover:bg-[#027443] text-[#111613] hover:text-white place-items-center shrink-0 transition"
              aria-label="إغلاق"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-[#111613] text-right">
                    اختار العبوة / العرض
                  </span>
                  <span dir="ltr" className="font-en text-xs text-[#027443] uppercase text-left">
                    PACK / SIZE
                  </span>
                </div>
                <div
                  className={`grid gap-2 ${
                    product.sizes.length >= 2 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {product.sizes.map((s) => {
                    const active = size?.id === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSizeId(s.id)}
                        className={`relative rounded-2xl border-2 p-3 text-start transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          active
                            ? "border-[#027443] bg-[#F2FAF5]"
                            : "border-[#111613]/12 bg-white hover:border-[#027443]/40"
                        }`}
                      >
                        <div className="min-w-0 text-right">
                          <div className="font-extrabold text-xs sm:text-sm text-[#111613] truncate">
                            {compactSizeLabel(s.label)}
                          </div>
                          <div className="text-[#027443] font-black text-xs sm:text-sm mt-0.5">
                            {formatPrice(s.price)}
                          </div>
                        </div>
                        <span
                          className={`w-4 h-4 rounded-full border-2 grid place-items-center shrink-0 transition ${
                            active
                              ? "border-[#027443] bg-[#027443] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.addons.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-[#111613] text-right">إضافات اختيارية</span>
                  <span dir="ltr" className="font-en text-xs text-[#027443] uppercase text-left">EXTRAS</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {product.addons.map((a) => {
                    const on = addons.includes(a.id);
                    return (
                      <button
                        type="button"
                        key={a.id}
                        onClick={() =>
                          setAddons((x) =>
                            on ? x.filter((i) => i !== a.id) : [...x, a.id],
                          )
                        }
                        className={`flex items-center justify-between rounded-xl border-2 px-3 py-2 text-start transition-all cursor-pointer ${
                          on
                            ? "border-[#027443] bg-[#F2FAF5]"
                            : "border-[#111613]/12 bg-white hover:border-[#027443]/40"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#111613]">
                          <span
                            className={`w-4 h-4 rounded-md grid place-items-center border-2 transition ${
                              on
                                ? "bg-[#027443] border-[#027443] text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {on && <CheckIcon className="w-3 h-3" />}
                          </span>
                          <span>{a.label}</span>
                        </span>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md text-[#027443] bg-[#F2FAF5]">
                          {a.price ? `+ ${formatPrice(a.price)}` : "مجانًا"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label
                className="flex items-center gap-1.5 text-sm font-black text-[#111613] mb-2"
                htmlFor="modal-note"
              >
                <NoteIcon className="w-4 h-4 text-[#027443]" />
                <span>ملاحظات على الصنف (اختياري)</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {HYPERMARKET_QUICK_NOTES.map((chip) => {
                  const active = note
                    .split("،")
                    .map((s) => s.trim())
                    .includes(chip);
                  return (
                    <button
                      type="button"
                      key={chip}
                      onClick={() => toggleQuickNote(chip)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                        active
                          ? "bg-[#027443] text-white border-[#027443]"
                          : "bg-[#FCFAEB] text-[#111613]/80 border-[#111613]/12 hover:border-[#027443]/40"
                      }`}
                    >
                      {active ? `✓ ${chip}` : `+ ${chip}`}
                    </button>
                  );
                })}
              </div>
              <input
                id="modal-note"
                className="input text-sm"
                placeholder="اكتب أي ملاحظة خاصة على المنتج…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="rounded-xl bg-[#FCFAEB] border border-[#027443]/15 px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#111613]/80">
                <PinIcon className="w-4 h-4 text-[#027443] shrink-0" />
                <span>
                  التوصيل: <strong className="text-[#111613]">{branch?.name ?? "دار الخير — مدينة بدر"}</strong>
                </span>
              </span>
              <span className="font-en text-[11px] font-black text-[#027443]">
                24/7 DELIVERY
              </span>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="bg-white border-t border-[#111613]/10 p-4 sm:px-5 flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#FCFAEB] border border-[#111613]/12 rounded-full p-1 shrink-0">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#027443] text-[#111613] hover:text-white grid place-items-center shadow-xs transition cursor-pointer"
                aria-label="تقليل الكمية"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-black text-base text-[#111613]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#027443] text-[#111613] hover:text-white grid place-items-center shadow-xs transition cursor-pointer"
                aria-label="زيادة الكمية"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={add}
              className={`btn flex-1 py-3 px-4 text-sm sm:text-base shadow-lg transition-all whitespace-nowrap cursor-pointer ${
                added
                  ? "bg-[#019149] text-white"
                  : "bg-[#111613] hover:bg-[#027443] text-white"
              }`}
            >
              {added ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  <span>تمت الإضافة للسلة</span>
                </>
              ) : (
                <div className="w-full flex items-center justify-between gap-2">
                  <span>أضف إلى السلة</span>
                  <span className="bg-[#FAA006] text-[#111613] px-3 py-0.5 rounded-full font-black text-xs sm:text-sm">
                    {formatPrice(unit * qty)}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
