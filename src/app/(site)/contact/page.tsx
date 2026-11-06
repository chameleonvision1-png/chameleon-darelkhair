import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import OnderaFaqSection from "@/components/OnderaFaqSection";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

const contactTitle = "تواصل معنا والروابط الرسمية | دار الخير هايبر ماركت — مدينة بدر";
const contactDescription =
  "تواصل مع دار الخير هايبر ماركت في مدينة بدر: خدمة عملاء وتوصيل طلبات 24 ساعة عبر الهاتف (01270158888 / 01210004039) أو واتساب، وصفحاتنا الرسمية على فيسبوك وإنستجرام وتيك توك.";

export const metadata: Metadata = {
  title: "تواصل معنا والروابط الرسمية | دار الخير هايبر ماركت",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/contact",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: contactTitle,
    description: contactDescription,
    images: [
      {
        url: "/og-contact.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "تواصل مع دار الخير هايبر ماركت — مدينة بدر 01270158888",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: contactTitle,
    description: contactDescription,
    images: ["/og-contact.jpg?v=2"],
  },
};

export default async function ContactPage() {
  const { branches, settings } = await publicDB();

  return (
    <div className="pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        {/* ONDERA Hero */}
        <div className="rounded-[32px] bg-[#111613] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(17,22,19,0.4)] border border-[#027443]/30 flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#027443]/35 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 text-right">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-[#FAA006] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FAA006]" />
              <span dir="ltr" className="font-en">
                OFFICIAL CHANNELS &amp; HOTLINES • 24/7
              </span>
            </div>
            <div
              dir="ltr"
              className="font-en uppercase text-2xl sm:text-4xl text-white leading-[0.94] tracking-tight text-left"
            >
              DIRECT CUSTOMER CARE IN BADR CITY.
            </div>
            <h1 className="mt-2.5 text-xl sm:text-4xl font-black text-[#FAA006] text-right">
              تواصل معنا وكل الروابط الرسمية لدار الخير
            </h1>
            <p className="text-white/80 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
              خدمة عملاء جاهزة لمساعدتك وتلقي طلباتك في أي وقت على مدار 24 ساعة عبر الهاتف أو الواتساب داخل مدينة بدر.
            </p>
          </div>

          <a
            href="https://wa.me/201270158888"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:brightness-105 text-white font-black text-xs sm:text-sm px-6 py-3.5 shadow-sm transition shrink-0 self-start md:self-auto"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp: 01270158888</span>
          </a>
        </div>

        {/* Official Links & Channels Hub */}
        <div className="mt-8 rounded-[32px] bg-[#FCFAEB] border border-[#027443]/22 p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#027443]/15">
            <div>
              <span className="sticker-badge mb-1.5">OFFICIAL DIGITAL HUB</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#027443]">
                القنوات والروابط الرسمية لدار الخير هايبر ماركت
              </h2>
            </div>
            <a
              href="/images/magazine/darelkhair-magazine.pdf"
              download
              className="rounded-full bg-[#111613] hover:bg-[#027443] text-white font-black text-xs px-4 py-2.5 self-start sm:self-auto transition"
            >
              تحميل مجلة العروض PDF ↗
            </a>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <Link
              href="/menu"
              className="rounded-2xl bg-[#027443] hover:bg-[#015933] text-white p-4 font-black text-sm flex items-center justify-between shadow-xs transition"
            >
              <span>الكتالوج التفاعلي الكامل بالأسعار</span>
              <span>←</span>
            </Link>
            <Link
              href="/offers"
              className="rounded-2xl bg-[#FAA006] hover:brightness-105 text-[#111613] p-4 font-black text-sm flex items-center justify-between shadow-xs transition"
            >
              <span>مجلة العروض وعرض الفينو الهدية</span>
              <span>←</span>
            </Link>
            <Link
              href="/menu?cat=cheese_bakery"
              className="rounded-2xl bg-white hover:bg-[#027443] text-[#027443] hover:text-white border border-[#027443]/25 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>قسم ثلاجة الجبن وسحب الميكروويف</span>
              <span>←</span>
            </Link>

            {branches.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl bg-white border border-[#027443]/20 p-4 flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#027443]">{b.name}</span>
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-[#111613]/75 hover:text-[#027443] flex items-center gap-1"
                  >
                    <PinIcon className="w-3.5 h-3.5 text-[#027443]" />
                    <span>الخريطة ↗</span>
                  </a>
                </div>
                <p className="text-xs text-[#111613]/70">{b.address}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1" dir="ltr">
                  <a
                    href={`tel:${b.phone}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[#027443] text-white px-3 py-1 text-xs font-black hover:bg-[#015933] transition"
                  >
                    <PhoneIcon className="w-3 h-3" />
                    <span>{b.phone}</span>
                  </a>
                  {b.phone2 && (
                    <a
                      href={`tel:${b.phone2}`}
                      className="inline-flex items-center gap-1 rounded-full bg-[#FCFAEB] border border-[#027443]/30 text-[#027443] px-3 py-1 text-xs font-black hover:bg-[#FAA006] hover:text-[#111613] transition"
                    >
                      <PhoneIcon className="w-3 h-3" />
                      <span>{b.phone2}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}

            <a
              href={settings.facebook || "https://www.facebook.com/DarElkhairHyperMarket"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>فيسبوك الرسمي (11K+ متابع)</span>
              <span>↗</span>
            </a>
            <a
              href={settings.instagram || "https://www.instagram.com/darelkhairhypermarket"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>إنستجرام الرسمي (@darelkhairhypermarket)</span>
              <span>↗</span>
            </a>
            <a
              href={settings.tiktok || "https://www.tiktok.com/@darelkhairhypermarket"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>تيك توك الرسمي (@darelkhairhypermarket)</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive ONDERA FAQ Section */}
      <OnderaFaqSection />

      {/* Wholesale & Inquiry Form */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-4">
        <OccasionForm branches={branches} />
      </div>
    </div>
  );
}
