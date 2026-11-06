import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

const branchesTitle = "موقعنا ونطاق التوصيل في مدينة بدر (24 ساعة) | دار الخير هايبر ماركت";
const branchesDescription =
  "دار الخير هايبر ماركت — مدينة بدر: مفتوح 24 ساعة طوال أيام الأسبوع مع خدمة توصيل منزلي سريعة لكل أحياء ومجاورات مدينة بدر وكمبوند دار مصر وسكن مصر (01270158888 • 01210004039).";

export const metadata: Metadata = {
  title: "موقعنا ونطاق التوصيل في مدينة بدر (24 ساعة)",
  description: branchesDescription,
  alternates: {
    canonical: "/branches",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/branches",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: branchesTitle,
    description: branchesDescription,
    images: [
      {
        url: "/og-branches.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "دار الخير هايبر ماركت — مدينة بدر توصيل 24 ساعة",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: branchesTitle,
    description: branchesDescription,
    images: ["/og-branches.jpg?v=2"],
  },
};

export default async function BranchesPage() {
  const { branches } = await publicDB();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* ONDERA Hero Banner */}
      <div className="rounded-[32px] bg-[#111613] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(17,22,19,0.4)] border border-[#027443]/30 flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#027443]/35 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 text-right">
          <h1 className="text-2xl sm:text-4xl font-black text-white text-right">
            فرع مدينة بدر ونطاق التوصيل المنزلي
          </h1>
          <p className="text-white/80 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
            دار الخير هايبر ماركت مفتوح دائمًا لخدمتكم على مدار 24 ساعة — استلم طلبك من الفرع أو اطلب التوصيل السريع لأي حي أو مجاورة داخل مدينة بدر.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 shrink-0 flex-wrap" dir="ltr">
          <a
            href="tel:01270158888"
            className="inline-flex items-center gap-2 rounded-full bg-[#FAA006] hover:bg-white text-[#111613] font-black text-xs sm:text-sm px-5 py-3 transition"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>01270158888</span>
          </a>
          <a
            href="tel:01210004039"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white hover:text-[#111613] text-white border border-white/20 font-black text-xs sm:text-sm px-5 py-3 transition"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>01210004039</span>
          </a>
        </div>
      </div>

      {/* Interactive Branches & Neighborhood Coverage Showcase */}
      <div className="mt-8">
        <BranchesShowcase branches={branches} />
      </div>

      {/* Detailed Delivery Areas & Direct Customer Care Card */}
      <div className="mt-8 grid md:grid-cols-2 gap-5">
        {branches.map((b) => (
          <div
            key={b.id}
            className="rounded-[28px] bg-white border border-[#027443]/22 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-black text-lg sm:text-xl text-[#027443]">
                  الأحياء والمناطق المخدومة في {b.city}
                </h2>
                <PinIcon className="w-5 h-5 text-[#027443] shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-[#111613]/70 mt-1 font-semibold">
                نصلك أينما كنت داخل مدينة بدر بأسرع خدمة دليفري وأفضل حفظ للمنتجات المبردة والألبان:
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {b.deliveryAreas.map((a) => (
                  <span
                    key={a}
                    className="text-xs font-extrabold bg-[#FCFAEB] border border-[#027443]/20 text-[#111613] px-3.5 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#027443]/15 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-[#111613]/70">أرقام الطلب السريع:</span>
              <div className="flex items-center gap-2" dir="ltr">
                <a
                  href={`tel:${b.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#027443] text-white px-3.5 py-1.5 text-xs font-black hover:bg-[#015933] transition"
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>{b.phone}</span>
                </a>
                {b.phone2 && (
                  <a
                    href={`tel:${b.phone2}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FCFAEB] border border-[#027443]/30 text-[#027443] px-3.5 py-1.5 text-xs font-black hover:bg-[#FAA006] hover:text-[#111613] transition"
                  >
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>{b.phone2}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Direct WhatsApp Ordering Highlight Card */}
        <div className="rounded-[28px] bg-[#027443] text-white p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-black text-lg sm:text-2xl text-white">
              خدمة عملاء وطلبات واتساب على مدار الساعة
            </h2>
            <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed font-semibold">
              تقدر تبعت قائمة طلبات البيت في رسالة واحدة أو تختار المنتجات من الموقع وهتوصلك رسالة الطلب مفصلة بالأسعار على واتساب خدمة العملاء فورًا.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#FAA006]">
              متاح 24 ساعة طوال الأسبوع
            </span>
            <a
              href="https://wa.me/201270158888"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-full bg-[#FAA006] hover:bg-white text-[#111613] font-black text-xs sm:text-sm px-5 py-2.5 shadow-sm transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp: 01270158888</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
