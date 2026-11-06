"use client";

import type { Branch } from "@/lib/types";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { OrderFromBranchButton } from "./BranchButtons";

const BADR_NEIGHBORHOODS = [
  "الحي الأول والثاني والثالث",
  "الحي الرابع والخامس (الياسمين)",
  "الحي السادس والسابع (الأندلس)",
  "كمبوند دار مصر وسكن مصر",
  "الحي المتميز والفيلات",
  "منطقة زهرة العاصمة وسكن الموظفين",
];

export default function BranchesShowcase({ branches }: { branches: Branch[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {branches.map((b) => (
        <div
          key={b.id}
          className="lg:col-span-7 rounded-[32px] bg-[#FCFAEB] p-6 sm:p-8 flex flex-col border border-[#027443]/22 shadow-[0_14px_34px_-16px_rgba(2,116,67,0.12)]"
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-[#027443] mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7FBB13]" />
                <span dir="ltr" className="font-en">
                  OPEN 24/7 • BADR CITYHUB
                </span>
              </div>
              <h3 className="font-black text-xl sm:text-2xl text-[#111613] leading-snug text-right">
                {b.name}
              </h3>
            </div>
            <span className="shrink-0 text-xs font-black bg-[#FAA006] text-[#111613] px-3.5 py-1.5 rounded-full">
              {b.city} • مفتوح 24 ساعة
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#111613]/75 mt-3.5 flex items-start gap-2 font-semibold leading-relaxed text-right">
            <PinIcon className="w-4 h-4 shrink-0 text-[#027443] mt-0.5" />
            <span>{b.address}</span>
          </p>
          <p className="text-xs sm:text-sm text-[#111613]/70 mt-2 flex items-center gap-2 font-semibold text-right">
            <ClockIcon className="w-4 h-4 shrink-0 text-[#027443]" />
            <span>{b.hours}</span>
          </p>

          {/* Direct Call Links Side-by-Side */}
          <div className="mt-4 pt-4 border-t border-[#027443]/15 grid grid-cols-2 gap-2.5" dir="ltr">
            <a
              href={`tel:${b.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#027443] border border-[#027443]/25 px-3.5 py-2.5 text-xs sm:text-sm font-black text-[#027443] hover:text-white transition"
            >
              <PhoneIcon className="w-4 h-4 shrink-0" />
              <span>{b.phone}</span>
            </a>
            {b.phone2 ? (
              <a
                href={`tel:${b.phone2}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#027443] border border-[#027443]/25 px-3.5 py-2.5 text-xs sm:text-sm font-black text-[#027443] hover:text-white transition"
              >
                <PhoneIcon className="w-4 h-4 shrink-0" />
                <span>{b.phone2}</span>
              </a>
            ) : null}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5">
            {b.services.map((s) => (
              <span
                key={s}
                className="text-[11px] font-extrabold bg-white px-2.5 py-1.5 rounded-full text-[#111613]/85 border border-[#027443]/15 text-center truncate"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="mt-auto pt-5 flex items-center gap-2.5">
            <OrderFromBranchButton
              branchId={b.id}
              className="btn btn-primary text-xs sm:text-sm py-3 px-5 flex-1"
            />
            <a
              href={`https://wa.me/${b.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 shrink-0 rounded-full bg-[#25D366] text-white grid place-items-center hover:brightness-105 transition-all shadow-sm"
              aria-label="واتساب"
              title="طلب عبر واتساب"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a
              href={b.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 shrink-0 rounded-full bg-white border border-[#027443]/25 text-[#027443] grid place-items-center hover:bg-[#027443] hover:text-white transition-colors"
              aria-label="الخريطة"
              title="الاتجاهات على خرائط جوجل"
            >
              <PinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}

      {/* Badr City Neighborhood Coverage Bento Card */}
      <div className="lg:col-span-5 rounded-[32px] bg-[#111613] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#027443]/35 blur-2xl"
          aria-hidden
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold text-[#FAA006]">
              تغطية التوصيل المنزلي
            </span>
            <span dir="ltr" className="font-en text-xs text-white/55 tracking-widest">
              DELIVERY ZONES
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white text-right">
            نوصّل لكل أحياء ومجاورات مدينة بدر
          </h3>
          <p className="text-xs sm:text-sm text-white/72 mt-1.5 leading-relaxed text-right">
            أسطول توصيل دار الخير جاهز على مدار الساعة لتوصيل طلبات البيت، الألبان، والجبن الطازجة لباب شقتك في أسرع وقت.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BADR_NEIGHBORHOODS.map((zone, idx) => (
              <div
                key={zone}
                className="rounded-2xl bg-white/7 border border-white/12 px-3.5 py-2.5 flex items-center justify-between gap-2"
              >
                <span className="text-xs font-extrabold text-white text-right">{zone}</span>
                <span dir="ltr" className="font-en text-[11px] text-[#FAA006] shrink-0">
                  /0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-5 pt-4 border-t border-white/12 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-white/75">
            للطلب السريع عبر الواتساب:
          </span>
          <a
            href="https://wa.me/201270158888"
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FAA006] text-[#111613] px-4 py-1.5 text-xs font-black hover:bg-white transition"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>01270158888</span>
          </a>
        </div>
      </div>
    </div>
  );
}
