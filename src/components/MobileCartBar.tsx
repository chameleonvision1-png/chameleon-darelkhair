"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { CartIcon, ChevronIcon } from "./icons";

export default function MobileCartBar() {
  const { count, subtotal, hydrated, bump } = useStore();
  const pathname = usePathname();

  if (pathname === "/cart" || pathname.startsWith("/order")) return null;

  const hasItems = hydrated && count > 0;
  if (!hasItems) return null;

  return (
    <div
      className="fixed inset-x-4 md:inset-x-6 z-40 pointer-events-none flex flex-col items-start gap-2.5"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <Link
        href="/cart"
        className="pointer-events-auto w-full md:w-auto md:min-w-[290px] md:gap-6 h-[54px] rounded-full bg-[#111613] hover:bg-[#027443] text-white ps-1.5 pe-5 flex items-center justify-between ring-2 ring-[#FAA006]/70 active:scale-[0.98] transition-all"
      >
        <span className="flex items-center gap-3">
          <span className="relative w-10 h-10 rounded-full bg-[#027443] ring-1 ring-white/20 grid place-items-center">
            <CartIcon className="w-[18px] h-[18px]" />
            <span
              key={bump}
              className="animate-pop absolute -top-1 -end-1 min-w-5 h-5 px-1 rounded-full bg-[#FAA006] text-[#111613] text-[10px] font-black grid place-items-center ring-2 ring-[#111613]"
            >
              {count}
            </span>
          </span>
          <span className="text-sm font-extrabold tracking-tight">إتمام الطلب عبر واتساب</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-sm font-black text-[#FAA006] tabular-nums">{formatPrice(subtotal)}</span>
          <ChevronIcon className="w-4 h-4 text-white/75" />
        </span>
      </Link>
    </div>
  );
}
