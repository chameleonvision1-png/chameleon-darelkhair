import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OfferCard from "@/components/OfferCard";
import OpenQrButton from "@/components/OpenQrButton";

const offersTitle = "مجلة العروض والتوفير | دار الخير هايبر ماركت — مدينة بدر";
const offersDescription =
  "تصفح مجلة عروض دار الخير هايبر ماركت الرسمية (9 صفحات): عرض الجبنة جابت الفينو معاها (فاتورة 100 ج = كيس فينو هدية • 200 ج = كيسين فينو هدية)، سحب الميكروويف على الفواتير فوق 1000 ج، وخصومات الألبان والزيوت والسمن والأرز والمكرونة في مدينة بدر.";

export const metadata: Metadata = {
  title: "مجلة العروض والتوفير",
  description: offersDescription,
  alternates: {
    canonical: "/offers",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/offers",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: offersTitle,
    description: offersDescription,
    images: [
      {
        url: "/og-offers.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "مجلة عروض دار الخير هايبر ماركت — Dar El Khair Offers",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: offersTitle,
    description: offersDescription,
    images: ["/og-offers.jpg?v=3"],
  },
};

const MAGAZINE_PAGES = [
  { page: 1, src: "/images/magazine/page-1.webp", title: "غلاف المجلة الرسمي" },
  { page: 2, src: "/images/magazine/page-2.webp", title: "الألبان والزبادي وسحب الميكروويف" },
  { page: 3, src: "/images/magazine/page-3.webp", title: "المربى والحلاوة الطحينية والعسل" },
  { page: 4, src: "/images/magazine/page-4.webp", title: "الزيوت والسمن والزبدة" },
  { page: 5, src: "/images/magazine/page-5.webp", title: "المكرونة والشعرية ولسان العصفور" },
  { page: 6, src: "/images/magazine/page-6.webp", title: "الشاي والسكر والأرز والدقيق" },
  { page: 7, src: "/images/magazine/page-7.webp", title: "المعلبات والصلصة والخل" },
  { page: 8, src: "/images/magazine/page-8.webp", title: "عرض الجبنة جابت الفينو معاها" },
  { page: 9, src: "/images/magazine/page-9.webp", title: "خدمة العملاء والتوصيل بمدينة بدر" },
];

export default async function OffersPage() {
  const { offers } = await publicDB();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* ONDERA Dark Charcoal & Emerald Hero Banner */}
      <div className="rounded-[32px] bg-[#111613] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(17,22,19,0.4)] border border-[#027443]/30 flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#027443]/35 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 text-right">
          <h1 className="text-2xl sm:text-4xl font-black text-white text-right">
            مجلة عروض دار الخير هايبر ماركت
          </h1>
          <p className="text-white/80 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
            أقوى عروض التوفير في مدينة بدر: عرض «الجبنة جابت الفينو معاها»، سحب الميكروويف على الفواتير فوق 1000 ج.م، وخصومات الألبان والزيوت والسمن والأرز والمكرونة.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 shrink-0 flex-wrap">
          <OpenQrButton label="باركود المنيو QR" />
          <a
            href="/images/magazine/darelkhair-magazine.pdf"
            download
            className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] font-black text-xs sm:text-sm px-5 py-3 transition shadow-sm"
          >
            تحميل المجلة PDF
          </a>
          <Link
            href="/menu"
            className="rounded-full bg-[#027443] hover:bg-[#015933] text-white font-black text-xs sm:text-sm px-5 py-3 transition shadow-sm"
          >
            اطلب من الكتالوج التفاعلي
          </Link>
        </div>
      </div>

      {/* Active Offers Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between gap-3 mb-5">
          <h2 className="text-xl sm:text-3xl font-black text-[#111613]">
            باقات وعروض التوفير الجاهزة للطلب
          </h2>
          <Link href="/menu" className="text-xs sm:text-sm font-black text-[#027443] hover:underline">
            عرض كل المنتجات (39 منتج) ←
          </Link>
        </div>

        {offers.length === 0 ? (
          <div className="rounded-3xl bg-[#FCFAEB] border border-[#027443]/25 text-center py-16 px-4">
            <p className="mt-3 text-[#111613]/70 font-bold">
              يمكنك طلب كافة المنتجات والعروض مباشرة من الكتالوج التفاعلي.
            </p>
            <Link href="/menu" className="btn btn-primary mt-5">
              تصفح الكتالوج الكامل
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        )}
      </div>

      {/* Full 9-Page Official Magazine Showcase */}
      <div className="mt-12 rounded-[32px] bg-[#FCFAEB] border border-[#027443]/22 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#027443]">
              صفحات مجلة عروض دار الخير الرسمية (9 صفحات كاملة)
            </h2>
            <p className="text-xs sm:text-sm text-[#111613]/70 mt-1">
              جميع المنتجات المعروضة في المجلة متوفرة للطلب المباشر بالقطعة أو بالباكدج في الكتالوج التفاعلي.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/images/magazine/darelkhair-magazine.pdf"
              download
              className="btn bg-[#111613] hover:bg-[#027443] text-white text-xs sm:text-sm py-2.5 px-4"
            >
              تنزيل ملف PDF
            </a>
            <Link href="/menu" className="btn btn-primary text-xs sm:text-sm py-2.5 px-5">
              اطلب المنتجات الآن
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MAGAZINE_PAGES.map((item) => (
            <div
              key={item.page}
              className="rounded-[24px] overflow-hidden border border-[#027443]/20 bg-white p-3 flex flex-col justify-between shadow-xs"
            >
              <div className="rounded-2xl overflow-hidden bg-[#FCFAEB] aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between gap-2">
                <span className="font-black text-xs sm:text-sm text-[#111613] text-right">
                  {item.title}
                </span>
                <span
                  dir="ltr"
                  className="font-en text-xs bg-[#027443] text-white px-2.5 py-0.5 rounded-full shrink-0"
                >
                  PAGE 0{item.page}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
