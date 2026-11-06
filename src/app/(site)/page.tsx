import Link from "next/link";
import { publicDB } from "@/lib/db";
import MobileBentoHero from "@/components/MobileBentoHero";
import DesktopBentoHero from "@/components/DesktopBentoHero";
import OnderaAboutGallery from "@/components/OnderaAboutGallery";
import FavouritesShowcase from "@/components/FavouritesShowcase";
import OnderaFaqSection from "@/components/OnderaFaqSection";
import OfferCard from "@/components/OfferCard";

export default async function HomePage() {
  const data = await publicDB();
  const available = data.products.filter((p) => p.isAvailable);
  const activeOffers = data.offers.filter((o) => o.isActive);

  return (
    <>
      {/* =========================================================================
          1. ONDERA ARCHITECTURAL CUTOUT BENTO HERO (Mobile & Desktop)
         ========================================================================= */}
      <MobileBentoHero />
      <DesktopBentoHero />

      {/* =========================================================================
          2. ONDERA • ABOUT SPLIT SHOWCASE + 4-THUMBNAIL INTERACTIVE STAGE
         ========================================================================= */}
      <OnderaAboutGallery />

      {/* =========================================================================
          3. ONDERA • FEATURES & SIGNATURE PROMOS BENTO (`LIGHT THAT ADAPTS TO YOU.`)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 overflow-x-clip">
        {/* Header aligned like ONDERA Reference (`media_1793972977219_9592145c.png`) */}
        <div
          dir="ltr"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8"
        >
          <div className="flex flex-col items-start">
            <span className="ondera-label mb-2">
              FEATURES & OFFERS • عروض دار الخير الحصرية
            </span>
            <p
              dir="rtl"
              className="text-xs sm:text-sm font-semibold text-[#111613]/70 max-w-md text-right"
            >
              عروض مصممة خصيصًا لتوفير ميزانية كل بيت في مدينة بدر — من هدايا المخبوزات الطازجة مع ثلاجة الجبن إلى سحب الميكروويف الكبير.
            </p>
          </div>

          <div className="text-left md:text-right">
            <h2 className="font-en text-3xl sm:text-5xl text-[#111613] leading-[0.94] tracking-tight uppercase">
              SAVINGS THAT
              <br />
              ADAPT TO YOU.
            </h2>
          </div>
        </div>

        {/* Desktop 2-Column Equal Sculptural Bento Grid / Mobile Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Olive/Emerald Green Sculptural Card (`Sculptural Ambient Lamp` style) */}
          <div className="rounded-[28px] bg-[#027443] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[430px] relative overflow-hidden shadow-[0_18px_45px_-20px_rgba(2,116,67,0.45)]">
            <div className="flex items-center justify-between gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-[#FAA006] text-[#111613] text-xs font-black">
                عرض بداية الدراسة
              </span>
              <span dir="ltr" className="font-en text-xs tracking-wider text-[#FCFAEB]/80">
                CHEESE FRIDGE • FREE FINO
              </span>
            </div>

            <div className="my-auto py-4 flex items-center justify-center z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cheese-fino-stage.webp"
                alt="عرض الجبنة جابت الفينو معاها"
                className="w-full max-w-[380px] h-48 sm:h-56 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="z-10 pt-2">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white text-right">
                  الجبنة جابت الفينو معاها
                </h3>
                <span dir="ltr" className="font-en text-xs text-[#FAA006] text-left">
                  100 / 200 EGP
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#FCFAEB]/85 leading-relaxed text-right">
                فاتورة ١٠٠ ج.م من ثلاجة الجبن معاها كيس فينو طازة (٥ أرغفة) هدية، وفاتورة ٢٠٠ ج.م معاها ٢ كيس فينو (١٠ أرغفة) هدية مجاناً!
              </p>

              {/* ONDERA Paired Outlined Pill + Circle Arrow Button */}
              <div className="mt-4 flex items-center gap-2" dir="ltr">
                <Link
                  href="/menu?cat=cheese_bakery"
                  className="rounded-full border border-white/35 hover:bg-white text-white hover:text-[#111613] px-5 py-2 text-xs font-black transition"
                >
                  <span className="font-en tracking-wider">EXPLORE OFFER</span>
                  <span className="mx-1.5 opacity-60">•</span>
                  <span dir="rtl">اطلب العرض</span>
                </Link>
                <Link
                  href="/menu?cat=cheese_bakery"
                  aria-label="اطلب عرض الجبنة والفينو"
                  className="w-9 h-9 rounded-full bg-white/18 hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition"
                >
                  ↗
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Warm Magazine Cream Card (`#FCFAEB`) — Microwave 1000 EGP Raffle */}
          <div className="rounded-[28px] bg-[#FCFAEB] border border-[#111613]/10 text-[#111613] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[430px] relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 z-10">
              <span className="px-3 py-1 rounded-full bg-[#111613] text-[#FAA006] text-xs font-black">
                السحب الكبير
              </span>
              <span dir="ltr" className="font-en text-xs tracking-wider text-[#027443]">
                1000 EGP GIVEAWAY DRAW
              </span>
            </div>

            <div className="my-auto py-4 flex items-center justify-center z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/microwave-stage.webp"
                alt="عدّي الألف واستنى السحب على الميكروويف"
                className="w-full max-w-[380px] h-48 sm:h-56 object-cover rounded-2xl shadow-md"
              />
            </div>

            <div className="z-10 pt-2">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#111613] text-right">
                  عدّي الألف... واستنى السحب
                </h3>
                <span dir="ltr" className="font-en text-xs text-[#027443] text-left">
                  WIN A MICROWAVE
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#111613]/75 leading-relaxed text-right">
                جمّع خزين بيتك الشهري بأكثر من ١٠٠٠ جنيه من عروض دار الخير هايبر ماركت وادخل السحب مباشرة على ميكروويف هدية!
              </p>

              <div className="mt-4 flex items-center gap-2" dir="ltr">
                <Link
                  href="/occasions"
                  className="rounded-full border border-[#111613]/25 hover:border-[#027443] bg-white px-5 py-2 text-xs font-black text-[#111613] hover:text-[#027443] transition"
                >
                  <span className="font-en tracking-wider">EXPLORE BOXES</span>
                  <span className="mx-1.5 opacity-45">•</span>
                  <span dir="rtl">بوكسات الألف</span>
                </Link>
                <Link
                  href="/occasions"
                  aria-label="بوكسات التوفير"
                  className="w-9 h-9 rounded-full bg-[#027443] hover:bg-[#111613] text-white grid place-items-center text-sm font-black transition"
                >
                  ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Desktop Horizontal Olive/Green Cutout Strip Card (Matches `media_1793972976917_1bf0381e.png`) */}
        <div
          dir="ltr"
          className="mt-4 sm:mt-6 rounded-[26px] bg-gradient-to-r from-[#015933] via-[#027443] to-[#019149] text-white px-5 pt-5 pb-0 sm:px-6 sm:pt-6 sm:pb-0 flex items-end justify-between gap-4 overflow-hidden shadow-md"
        >
          <div dir="rtl" className="flex-1 text-right pb-5 sm:pb-6">
            <span className="inline-block font-en text-[10px] tracking-widest uppercase text-[#FAA006] mb-1">
              BADR CITY 24/7 EXPRESS DELIVERY
            </span>
            <h3 className="text-base sm:text-xl font-black text-white leading-snug">
              توصيل منزلي سريع لجميع أحياء ومجاورات مدينة بدر
            </h3>
            <p className="text-xs text-[#FCFAEB]/80 font-semibold mt-1">
              للطلب والاستفسار: 01270158888 / 01210004039
            </p>
            <div className="mt-3 flex items-center justify-start gap-2" dir="ltr">
              <a
                href="https://wa.me/201270158888"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/35 bg-white/10 hover:bg-white text-white hover:text-[#111613] px-4 py-1.5 text-[11px] font-black transition"
              >
                <span className="font-en tracking-wider">WHATSAPP ORDER</span>
                <span className="mx-1">•</span>
                <span dir="rtl">اطلب الآن</span>
              </a>
              <a
                href="tel:01270158888"
                aria-label="اتصال مباشر"
                className="w-8 h-8 rounded-full bg-[#FAA006] text-[#111613] grid place-items-center text-xs font-black"
              >
                ↗
              </a>
            </div>
          </div>

          {/* Right Cutout Cart Image Grounded Flush with Bottom Edge */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-end justify-center self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-cart.webp"
              alt="عربة تسوق دار الخير"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE DEPARTMENT SHELVES CAROUSEL (All 36+ Magazine Products)
         ========================================================================= */}
      <FavouritesShowcase products={available} />

      {/* =========================================================================
          5. ONDERA DARK CHARCOAL STAGE WITH BOTTOM-RIGHT INVERTED CUTOUT NOTCH
             (Matches `LIGHT IN ITS SOFTEST FORM.` in `media_1793972976521_cdcb89e2.png`)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-x-clip">
        <div className="rounded-[32px] sm:rounded-[38px] bg-[#111613] text-white p-5 sm:p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(17,22,19,0.65)]">
          {/* Top Header Row inside Dark Container */}
          <div
            dir="ltr"
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-en tracking-widest text-[#FAA006] uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAA006]" />
                <span>OFFICIAL MAGAZINE • مجلة عروض دار الخير</span>
              </div>
              <div className="text-left">
                <h2 className="font-en text-3xl sm:text-5xl text-white leading-[0.94] tracking-tight uppercase">
                  SHOPPING IN ITS
                  <br />
                  EASIEST FORM.
                </h2>
              </div>
            </div>

            <div dir="rtl" className="max-w-md text-right">
              <h3 className="text-base sm:text-lg font-black text-[#FCFAEB]">
                تصفح الـ ٩ صفحات الرسمية لمجلة عروض دار الخير
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-white/65 leading-relaxed">
                يمكنك تقليب صفحات المجلة الرسمية بالكامل هنا أو تحميلها بصيغة PDF، وطلب أي صنف منها مباشرة ليصلك حتى باب البيت في مدينة بدر.
              </p>
            </div>
          </div>

          {/* Inner Rounded Stage with Bottom-Right Inverted Cutout Notch (`EXPLORE THE OBJECT ↗`) */}
          <div className="relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#1C3829] via-[#027443] to-[#014D2C] p-4 sm:p-6 pb-16 sm:pb-16 overflow-hidden">
            {/* Horizontal Scrollable 9-Page Official Magazine Strip */}
            <div className="flex items-center gap-3.5 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pageNo) => (
                <a
                  key={pageNo}
                  href="/images/magazine/darelkhair-magazine.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative shrink-0 w-[210px] sm:w-[250px] aspect-[848/1200] rounded-2xl overflow-hidden bg-[#FCFAEB] border-2 border-white/20 hover:border-[#FAA006] shadow-lg snap-center transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/magazine/page-${pageNo}.webp`}
                    alt={`صفحة ${pageNo} من مجلة عروض دار الخير`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-[#111613]/85 text-[#FAA006] font-en text-[11px] font-black px-2.5 py-0.5">
                    PAGE 0{pageNo}
                  </span>
                </a>
              ))}
            </div>

            {/* BOTTOM-RIGHT INVERTED CUTOUT NOTCH (Exact ONDERA Dark Card Geometry!) */}
            <div
              dir="ltr"
              className="absolute bottom-0 right-0 z-20 bg-[#111613] pt-3 pl-3 rounded-tl-[26px] flex items-center gap-2"
            >
              <Link
                href="/offers"
                className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] px-5 py-2.5 text-xs font-black tracking-wider transition flex items-center gap-2 shadow-md"
              >
                <span className="font-en">EXPLORE ALL OFFERS</span>
                <span className="opacity-45">•</span>
                <span dir="rtl">كل العروض</span>
              </Link>
              <a
                href="/images/magazine/darelkhair-magazine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="تحميل المجلة PDF"
                aria-label="تحميل المجلة PDF"
                className="w-10 h-10 rounded-full bg-[#027443] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition shadow-md"
              >
                ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FEATURED BUNDLE OFFERS GRID
         ========================================================================= */}
      {activeOffers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-clip">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="ondera-label mb-1.5">
                BUNDLE DEALS • باقات التوفير الجاهزة
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111613] text-right">
                عروض وباقات دار الخير الموفرة
              </h2>
            </div>
            <Link
              href="/offers"
              dir="ltr"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#027443] hover:underline"
            >
              <span className="font-en">VIEW ALL OFFERS</span>
              <span>↗</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeOffers.slice(0, 3).map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          7. ONDERA INTERACTIVE NUMBERED PILL FAQ (`/01` – `/05`)
         ========================================================================= */}
      <OnderaFaqSection />
    </>
  );
}
