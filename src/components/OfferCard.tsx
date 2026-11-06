"use client";

import { useState } from "react";
import type { Offer } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, ClockIcon, PlusIcon } from "./icons";

export default function OfferCard({ offer }: { offer: Offer }) {
  const { addToCart, branch } = useStore();
  const [added, setAdded] = useState(false);

  const notHere =
    !!branch && offer.branchIds.length > 0 && !offer.branchIds.includes(branch.id);
  const discount =
    offer.oldPrice > offer.price
      ? Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)
      : 0;
  const isFullBleedStage =
    offer.image.includes("cheese-fino") || offer.image.includes("microwave");

  return (
    <article className="rounded-[28px] bg-white overflow-hidden flex flex-col h-full group border border-[#111613]/12 hover:border-[#027443] shadow-[0_10px_26px_-14px_rgba(17,22,19,0.08)] hover:shadow-[0_18px_38px_-14px_rgba(2,116,67,0.22)] transition-all duration-200">
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#027443] via-[#015933] to-[#111613] flex items-center justify-center ${
          isFullBleedStage ? "p-0" : "p-4"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offer.image}
          alt={offer.title}
          className={`w-full h-full group-hover:scale-105 transition duration-500 ${
            isFullBleedStage
              ? "object-cover object-center"
              : "object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)]"
          }`}
        />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 z-10">
          {discount > 0 ? (
            <span className="bg-[#111613] text-white font-black text-xs px-3 py-1 rounded-full shadow-md text-right">
              وفّر {discount}%
            </span>
          ) : (
            <span />
          )}
          {offer.badge && (
            <span
              dir="ltr"
              className="bg-[#FAA006] text-[#111613] font-black text-[11px] px-3 py-1 rounded-full shadow-md uppercase text-left"
            >
              {offer.badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {offer.titleEn && (
          <div
            dir="ltr"
            className="font-en text-[11px] text-[#027443] uppercase tracking-wider text-left truncate mb-1"
          >
            {offer.titleEn}
          </div>
        )}
        <h3 className="font-black text-base sm:text-lg text-[#111613] group-hover:text-[#027443] transition-colors leading-snug text-right">
          {offer.title}
        </h3>
        <p className="text-[#111613]/68 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed flex-1 font-medium text-right">
          {offer.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FCFAEB] border border-[#027443]/20 text-[#027443] px-2.5 py-0.5 text-[11px] font-extrabold">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>متاح يوميًا • توصيل ٢٤ ساعة</span>
          </span>
          {offer.terms && (
            <span className="text-[11px] text-[#111613]/55 line-clamp-1 font-semibold">
              {offer.terms}
            </span>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#111613]/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#FAA006] text-[#111613] px-3.5 py-1 text-sm sm:text-base font-black whitespace-nowrap">
              {formatPrice(offer.price)}
            </span>
            {offer.oldPrice > offer.price && (
              <span className="text-xs sm:text-sm font-bold text-[#111613]/40 line-through whitespace-nowrap">
                {formatPrice(offer.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={notHere}
            onClick={() => {
              addToCart({
                productId: `offer:${offer.id}`,
                name: `عرض: ${offer.title}`,
                image: offer.image,
                addons: [],
                unitPrice: offer.price,
                qty: 1,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`rounded-full px-4 py-2 text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
              added
                ? "bg-[#019149] text-white"
                : "bg-[#111613] hover:bg-[#027443] text-white"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>أُضيف</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                <span>أضف العرض</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
