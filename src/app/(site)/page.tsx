import Link from "next/link";
import { publicDB } from "@/lib/db";
import MobileBentoHero from "@/components/MobileBentoHero";
import DesktopBentoHero from "@/components/DesktopBentoHero";
import OnderaAboutGallery from "@/components/OnderaAboutGallery";
import FavouritesShowcase from "@/components/FavouritesShowcase";
import OnderaFaqSection from "@/components/OnderaFaqSection";
import OfferCard from "@/components/OfferCard";
import OpenQrButton from "@/components/OpenQrButton";

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
          <div className="text-left md:order-2 md:text-right">
            <h2 className="font-en text-3xl sm:text-5xl text-[#111613] leading-[0.94] tracking-tight uppercase">
              SAVINGS THAT
              <br />
              ADAPT TO YOU.
            </h2>
          </div>

          <p
            dir="rtl"
            className="md:order-1 text-xs sm:text-sm font-semibold text-[#111613]/70 max-w-md text-right"
          >
            عروض مصممة خصيصًا لتوفير ميزانية كل بيت في مدينة بدر — من هدايا المخبوزات الطازجة مع ثلاجة الجبن إلى سحب الميكروويف الكبير.
          </p>
        </div>

        {/* Desktop 2-Column Equal Sculptural Bento Grid / Mobile Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Olive/Emerald Green Sculptural Card (`Sculptural Ambient Lamp` style) */}
          <div className="rounded-[28px] bg-[#027443] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[410px] relative overflow-hidden shadow-[0_18px_45px_-20px_rgba(2,116,67,0.45)]">
            <div className="my-auto pb-4 flex items-center justify-center z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cheese-fino-stage.webp"
                alt="عرض الجبنة جابت الفينو معاها"
                className="w-full max-w-[380px] h-48 sm:h-56 object-cover object-top rounded-2xl shadow-lg"
              />
            </div>

            <div className="z-10 pt-1">
              <h3 className="text-xl sm:text-2xl font-black text-white text-right">
                الجبنة جابت الفينو معاها
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#FCFAEB]/85 leading-relaxed text-right">
                فاتورة ١٠٠ ج.م من ثلاجة الجبن معاها كيس فينو طازة (٥ أرغفة) هدية، وفاتورة ٢٠٠ ج.م معاها ٢ كيس فينو (١٠ أرغفة) هدية مجاناً!
              </p>

              {/* ONDERA Paired Outlined Pill + Circle Arrow Button */}
              <div className="mt-4 flex items-center gap-2" dir="ltr">
                <Link
                  href="/menu?cat=cheese_bakery"
                  className="rounded-full border border-white/35 hover:bg-white text-white hover:text-[#111613] px-5 py-2 text-xs font-black whitespace-nowrap transition"
                >
                  اطلب العرض
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
          <div className="rounded-[28px] bg-[#FCFAEB] border border-[#111613]/10 text-[#111613] p-6 sm:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[410px] relative overflow-hidden">
            <div className="my-auto pb-4 flex items-center justify-center z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/microwave-stage.webp"
                alt="عدّي الألف واستنى السحب على الميكروويف"
                className="w-full max-w-[380px] h-48 sm:h-56 object-cover rounded-2xl shadow-md"
              />
            </div>

            <div className="z-10 pt-1">
              <h3 className="text-xl sm:text-2xl font-black text-[#111613] text-right">
                عدّي الألف... واستنى السحب
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#111613]/75 leading-relaxed text-right">
                جمّع خزين بيتك الشهري بأكثر من ١٠٠٠ جنيه من عروض دار الخير هايبر ماركت وادخل السحب مباشرة على ميكروويف هدية!
              </p>

              <div className="mt-4 flex items-center gap-2" dir="ltr">
                <Link
                  href="/occasions"
                  className="rounded-full border border-[#111613]/25 hover:border-[#027443] bg-white px-5 py-2 text-xs font-black text-[#111613] hover:text-[#027443] whitespace-nowrap transition"
                >
                  بوكسات الألف
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
          className="mt-4 sm:mt-6 rounded-[26px] bg-gradient-to-r from-[#015933] via-[#027443] to-[#019149] text-white px-5 pt-5 pb-0 sm:px-6 sm:pt-6 sm:pb-0 flex items-end justify-between gap-4 overflow-hidden"
        >
          <div dir="rtl" className="flex-1 text-right pb-5 sm:pb-6">
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
                className="rounded-full border border-white/35 bg-white/10 hover:bg-white text-white hover:text-[#111613] px-4 py-1.5 text-xs font-black whitespace-nowrap transition"
              >
                اطلب عبر واتساب
              </a>
              <a
                href="tel:01270158888"
                aria-label="اتصال مباشر"
                className="w-8 h-8 rounded-full bg-[#FAA006] text-[#111613] grid place-items-center text-xs font-black shrink-0"
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
              className="w-full h-full object-contain object-bottom"
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
        <div className="rounded-[32px] sm:rounded-[38px] bg-[#111613] text-white p-5 sm:p-8 lg:p-10">
          {/* Top Header Row inside Dark Container — Zero small overlines above title */}
          <div
            dir="ltr"
            className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-5 sm:mb-6"
          >
            <div className="text-left">
              <h2 className="font-en text-3xl sm:text-5xl text-white leading-[0.94] tracking-tight uppercase">
                SHOPPING IN ITS
                <br />
                EASIEST FORM.
              </h2>
            </div>

            <p
              dir="rtl"
              className="max-w-md text-xs sm:text-sm font-semibold text-white/70 leading-relaxed text-right"
            >
              تصفح الـ ٩ صفحات الرسمية لمجلة عروض دار الخير بالكامل أو حمّلها بصيغة PDF، واطلب أي صنف منها مباشرة ليصلك حتى باب البيت في مدينة بدر.
            </p>
          </div>

          {/* Full-Bleed Rounded Stage with Compact Bottom-Right Inverted Cutout Notch */}
          <div className="relative" dir="ltr">
            <Link
              href="/offers"
              className="block rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#027443]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/magazine-stage.webp"
                alt="مجلة عروض دار الخير هايبر ماركت — ٩ صفحات رسمية"
                className="w-full h-auto sm:max-h-[540px] object-cover object-center block"
              />
            </Link>

            {/* BOTTOM-RIGHT INVERTED CUTOUT NOTCH (`كل العروض ↗`) — Outside overflow-hidden so circle is never clipped */}
            <div className="absolute bottom-0 right-0 z-20 bg-[#111613] pt-2.5 pl-2.5 rounded-tl-[24px] flex items-center gap-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 -top-[19px] w-5 h-5"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, transparent 19.5px, #111613 20px)",
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-[19px] bottom-0 w-5 h-5"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, transparent 19.5px, #111613 20px)",
                }}
              />
              <Link
                href="/offers"
                className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] px-5 py-2.5 text-xs font-black whitespace-nowrap transition"
              >
                كل العروض
              </Link>
              <OpenQrButton
                label="QR المنيو"
                className="rounded-full bg-[#FAA006] hover:bg-white text-[#111613] px-3.5 py-2.5 text-xs font-black inline-flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer"
                iconClassName="w-3.5 h-3.5 shrink-0"
              />
              <a
                href="/images/magazine/darelkhair-magazine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="تحميل المجلة PDF"
                aria-label="تحميل المجلة PDF"
                className="w-10 h-10 rounded-full bg-[#3D5245] hover:bg-[#FAA006] text-white hover:text-[#111613] grid place-items-center text-sm font-black transition shrink-0"
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
            <h2 className="text-2xl sm:text-3xl font-black text-[#111613] text-right">
              عروض وباقات دار الخير الموفرة
            </h2>
            <Link
              href="/offers"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#027443] hover:underline self-start sm:self-auto"
            >
              <span>كل العروض</span>
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
