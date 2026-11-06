import type { Metadata } from "next";
import Link from "next/link";
import OnderaAboutGallery from "@/components/OnderaAboutGallery";
import OpenQrButton from "@/components/OpenQrButton";

const aboutTitle = "عن دار الخير هايبر ماركت | تسوق أسهل لكل احتياجات بيتك في مدينة بدر";
const aboutDescription =
  "تعرف على دار الخير هايبر ماركت (Dar El Khair Hyper Market) في مدينة بدر: سوبر ماركت وهايبر ماركت متكامل مفتوح 24 ساعة مع توصيل منزلي سريع ومجلة عروض حقيقية لكل بيت.";

export const metadata: Metadata = {
  title: "عن دار الخير هايبر ماركت | مدينة بدر",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/about",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: aboutTitle,
    description: aboutDescription,
    images: [
      {
        url: "/og-about.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "عن دار الخير هايبر ماركت — مدينة بدر",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutTitle,
    description: aboutDescription,
    images: ["/og-about.jpg?v=3"],
  },
};

const blocks = [
  {
    code: "/01",
    en: "EVERYDAY FAMILY HYPERMARKET",
    title: "كل احتياجات بيتك تحت سقف واحد في مدينة بدر",
    text: "في دار الخير هايبر ماركت جمعنالك كل الأقسام الأساسية لبيتك من أشهر الماركات الموثوقة: الألبان والزبادي، ثلاجة الجبن الطازجة والمخبوزات، الزيوت والسمن والزبدة، الأرز والمكرونة والدقيق، المربى والحلاوة الطحينية والعسل، والشاي والسكر والمعلبات.",
    img: "/images/hero-cart.webp",
  },
  {
    code: "/02",
    en: "REAL OFFERS & FREE FINO",
    title: "عروض توفير حقيقية ومفاجآت يومية",
    text: "بنؤمن إن التوفير الحقيقي يبدأ من الأساسيات اليومية؛ عشان كدة أطلقنا مجلة عروض دار الخير وعرض «الجبنة جابت الفينو معاها» (كل 100 ج من ثلاجة الجبن ليها كيس فينو هدية، والـ 200 ج ليها كيسين فينو هدية)، بالإضافة إلى سحب الميكروويف لكل فاتورة تتخطى 1000 ج.م.",
    img: "/images/cheese-fino-stage.webp",
  },
  {
    code: "/03",
    en: "24/7 BADR CITY DELIVERY",
    title: "مفتوح دائمًا 24 ساعة وتوصيل سريع لباب البيت",
    text: "فريق خدمة العملاء والتوصيل في دار الخير جاهز لخدمة أهالي مدينة بدر على مدار 24 ساعة عبر الهاتف (01270158888 / 01210004039) أو عبر الواتساب المباشر، مع عناية فائقة بحفظ الألبان والجبن والمنتجات المبردة حتى وصولها لباب شقتك.",
    img: "/images/official-banner.webp",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        {/* ONDERA Hero Card */}
        <div className="rounded-[32px] bg-[#027443] text-white p-6 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_18px_40px_-16px_rgba(2,116,67,0.38)]">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[28px] bg-[#015933] p-3 ring-2 ring-[#FAA006] shrink-0 shadow-xl grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-emblem-cream.webp"
              alt="دار الخير هايبر ماركت"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 w-full text-right">
            <h1 className="text-2xl sm:text-4xl font-black text-white text-right">
              دار الخير هايبر ماركت — تسوق أسهل لكل احتياجات بيتك
            </h1>
            <p className="text-white/88 mt-2 text-sm sm:text-lg max-w-2xl leading-relaxed font-semibold text-right">
              وجهتك العائلية الأولى في مدينة بدر للسلع الغذائية، الألبان، الجبن، وخزين البيت بأقوى العروض وخدمة توصيل لا تتوقف 24 ساعة.
            </p>
            <div className="mt-5 flex items-center gap-2.5 flex-wrap">
              <Link
                href="/menu"
                className="rounded-full bg-white hover:bg-[#FAA006] text-[#111613] font-black text-xs sm:text-sm px-5 py-3 transition"
              >
                تصفح المنيو الكامل
              </Link>
              <OpenQrButton label="باركود المنيو QR" />
            </div>
          </div>
        </div>
      </div>

      {/* ONDERA Interactive Gallery Section */}
      <OnderaAboutGallery />

      {/* Architectural Story Blocks */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className={`rounded-[32px] bg-[#FCFAEB] border border-[#027443]/20 p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center shadow-xs ${
              i % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="rounded-[24px] bg-white border border-[#027443]/15 aspect-[16/10] p-4 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-black text-[#111613] text-right">
                {b.title}
              </h2>
              <p className="text-[#111613]/75 leading-8 mt-3 text-sm sm:text-base font-medium text-right">
                {b.text}
              </p>
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <Link href="/menu" className="btn btn-primary text-base sm:text-lg px-10 py-3.5">
            تصفح أقسام دار الخير واطلب الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
