import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";

const occasionsTitle = "بوكسات خزين الشهر وكرتونة الخير وطلبات الجملة | دار الخير هايبر ماركت";
const occasionsDescription =
  "اطلب بوكس خزين البيت الشهري (عدّي الألف وادخل سحب الميكروويف)، كرتونة الخير والصدقات الجارية، وتوريدات الجملة للمطاعم والشركات في مدينة بدر من دار الخير هايبر ماركت.";

export const metadata: Metadata = {
  title: "بوكسات خزين الشهر وكرتونة الخير وطلبات الجملة",
  description: occasionsDescription,
  alternates: {
    canonical: "/occasions",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/occasions",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: occasionsTitle,
    description: occasionsDescription,
    images: [
      {
        url: "/og-occasions.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "بوكسات خزين الشهر وكرتونة الخير — دار الخير هايبر ماركت",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: occasionsTitle,
    description: occasionsDescription,
    images: ["/og-occasions.jpg?v=2"],
  },
};

const packages = [
  {
    code: "/01",
    title: "بوكس خزين البيت الشهري (دخول سحب الميكروويف)",
    price: "1050 ج.م",
    text: "بوكس خزين متكامل يضم الأرز، الزيت، السمن، السكر، المكرونة، الشاي، الصلصة، والألبان — يتخطى حاجز الـ 1000 ج.م ليؤهلك مباشرة لدخول السحب على الميكروويف الهدية.",
    img: "/images/hero-cart.webp",
    href: "/menu?cat=cheese_bakery",
  },
  {
    code: "/02",
    title: "كرتونة الخير والصدقات الجارية",
    price: "من 350 ج.م",
    text: "تجهيز كراتين الخير وشنط الإطعام بأجود السلع الأساسية (أرز، سكر، زيت، سمن، مكرونة، عدس، فول، شاي، وصلصة) بأسعار الجملة مع التوصيل لأي مكان في مدينة بدر.",
    img: "/images/departments/dept-rice-flour.webp",
    href: "/menu?cat=rice_flour",
  },
  {
    code: "/03",
    title: "باكدج ثلاجة الجبن العائلي + 2 كيس فينو هدية",
    price: "200 ج.م",
    text: "تشكيلة جبن طازجة من ثلاجة دار الخير (رومي بطارخ، شيدر، فلامنك، براميلي، ملح خفيف، قشطة، وحلاوة) بقيمة 200 ج.م ومعاها كيسين عيش فينو طازج (10 أرغفة) مجانًا.",
    img: "/images/cheese-fino-stage.webp",
    href: "/menu?cat=cheese_bakery",
  },
  {
    code: "/04",
    title: "توريدات الجملة للمطاعم والكافيهات والشركات",
    price: "أسعار جملة",
    text: "نوفر توريدات دورية للمطاعم، الكافيهات، الحضانات، والشركات في مدينة بدر من الألبان، الزيوت، السمن، الدقيق، السكر، والمعلبات بأسعار تنافسية وتوصيل 24 ساعة.",
    img: "/images/departments/dept-oils.webp",
    href: "/menu?cat=oils",
  },
];

export default async function OccasionsPage() {
  const { branches } = await publicDB();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* ONDERA Hero Banner */}
      <div className="rounded-[32px] bg-[#027443] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(2,116,67,0.35)] flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FAA006]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 text-right">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-[#FAA006] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FAA006]" />
            <span dir="ltr" className="font-en">
              MONTHLY PANTRY • CHARITY BOXES • WHOLESALE
            </span>
          </div>
          <div
            dir="ltr"
            className="font-en uppercase text-2xl sm:text-4xl text-white leading-[0.94] tracking-tight text-left"
          >
            FAMILY PANTRY &amp; WHOLESALE ORDERS.
          </div>
          <h1 className="mt-2.5 text-xl sm:text-4xl font-black text-white text-right">
            خزين الشهر، كرتونة الخير، وطلبات الجملة
          </h1>
          <p className="text-white/85 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
            سواء بتجهز خزين البيت الشهري عشان تدخل سحب الميكروويف، أو بتجهز كراتين خير، أو محتاج توريد جملة لمشروعك في مدينة بدر — دار الخير معاك 24 ساعة.
          </p>
        </div>

        <Link
          href="/menu"
          className="relative z-10 rounded-full bg-[#FAA006] hover:bg-white text-[#111613] font-black text-xs sm:text-sm px-6 py-3.5 transition shrink-0 self-start md:self-auto"
        >
          تصفح كل المنتجات والأسعار
        </Link>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_450px] gap-8 items-start">
        <div className="grid sm:grid-cols-2 gap-5">
          {packages.map((p) => (
            <div
              key={p.title}
              className="rounded-[28px] bg-white border border-[#027443]/22 overflow-hidden flex flex-col justify-between p-5 shadow-xs"
            >
              <div>
                <div className="relative rounded-2xl bg-[#FCFAEB] border border-[#027443]/12 h-48 p-3 flex items-center justify-center">
                  <span
                    dir="ltr"
                    className="absolute top-3 left-3 font-en text-xs text-[#027443] bg-white border border-[#027443]/15 px-2.5 py-0.5 rounded-full"
                  >
                    {p.code}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-auto object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 mt-4">
                  <h3 className="font-black text-base sm:text-lg text-[#111613] text-right">
                    {p.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#027443] text-white px-3 py-1 text-xs font-black">
                    {p.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#111613]/70 mt-2 leading-relaxed font-medium text-right">
                  {p.text}
                </p>
              </div>
              <Link
                href={p.href}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#FCFAEB] hover:bg-[#027443] border border-[#027443]/25 text-[#027443] hover:text-white font-black text-xs py-2.5 px-4 transition"
              >
                استعرض المنتجات واطلب الآن ←
              </Link>
            </div>
          ))}
        </div>

        <OccasionForm branches={branches} />
      </div>
    </div>
  );
}
