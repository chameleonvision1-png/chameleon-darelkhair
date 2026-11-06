"use client";

import { useState } from "react";

interface FaqItem {
  num: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  image: string;
}

const FAQS: FaqItem[] = [
  {
    num: "/01",
    questionAr: "ما هي مواعيد عمل دار الخير ونطاق التوصيل في مدينة بدر؟",
    questionEn: "What are your opening hours & delivery areas in Badr City?",
    answerAr:
      "دار الخير هايبر ماركت مفتوح لخدمتكم ٢٤ ساعة طوال أيام الأسبوع. نوفر خدمة التوصيل المنزلي السريع لجميع أحياء ومجاورات مدينة بدر (الحي الأول حتى السابع، دار مصر، سكن مصر، الحي المتميز، ومنطقة الجامعات).",
    image: "/images/departments/dept-rice-flour.webp",
  },
  {
    num: "/02",
    questionAr: "كيف أستفيد من عرض «الجبنة جابت الفينو معاها»؟",
    questionEn: "How does the Free Fresh Fino with Cheese Fridge offer work?",
    answerAr:
      "عند شرائك أي فاتورة بقيمة ١٠٠ جنيه من ثلاجة الجبن تحصل على كيس عيش فينو طازة (٥ أرغفة) هدية مجاناً، وعند الشراء بـ ٢٠٠ جنيه من ثلاجة الجبن تحصل على ٢ كيس فينو طازة (١٠ أرغفة) هدية فورية مع طلبك.",
    image: "/images/cheese-fino-stage.webp",
  },
  {
    num: "/03",
    questionAr: "كيف أدخل السحب على الميكروويف في عرض الألف جنيه؟",
    questionEn: "How do I enter the 1000 EGP Microwave raffle draw?",
    answerAr:
      "في عرض «عدّي الألف... واستنى السحب»، كل فاتورة مشتريات تتخطى ١٠٠٠ جنيه (سواء من الفرع أو عبر الطلب أونلاين والواتساب) تؤهلك مباشرة لدخول السحب الكبير على ميكروويف هدية.",
    image: "/images/microwave-stage.webp",
  },
  {
    num: "/04",
    questionAr: "كيف أطلب عبر الموقع أو الواتساب وكم يستغرق التوصيل؟",
    questionEn: "How can I order online or via WhatsApp?",
    answerAr:
      "يمكنك إضافة كل منتجاتك للسلة من الموقع وإرسال الطلب بضغطة واحدة ليتحول تلقائياً لرسالة منظمة بالتفاصيل والأسعار على واتساب خدمة العملاء (01270158888)، أو الاتصال مباشرة على 01270158888 / 01210004039.",
    image: "/images/departments/dept-oils.webp",
  },
  {
    num: "/05",
    questionAr: "هل الأسعار المعروضة على الموقع هي نفس أسعار مجلة العروض؟",
    questionEn: "Are website prices identical to the official magazine deals?",
    answerAr:
      "نعم ١٠٠٪! جميع أسعار الموقع مطابقة تماماً لمجلة عروض دار الخير الرسمية (الألبان، الزيوت، المكرونة، المربى، الشاي والسكر، الدقيق والأرز، المعلبات، والصلصة) مع إمكانية تصفح وتحميل نسخة الـ PDF الكاملة للمجلة.",
    image: "/images/departments/dept-dairy.webp",
  },
];

export default function OnderaFaqSection() {
  const [active, setActive] = useState(2); // Default to /03 just like ONDERA reference!
  const current = FAQS[active];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 overflow-x-clip">
      {/* Header Row matching `YOUR QUESTIONS. OUR ANSWERS.` — Zero small overlines above title */}
      <div
        dir="ltr"
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div className="text-left">
          <h2 className="font-en text-3xl sm:text-5xl text-[#111613] leading-[0.94] tracking-tight uppercase">
            YOUR QUESTIONS.
            <br />
            OUR ANSWERS.
          </h2>
        </div>
        <p
          dir="rtl"
          className="text-xs sm:text-sm font-bold text-[#111613]/65 max-w-md text-right"
        >
          تعرف على كل تفاصيل التوصيل في مدينة بدر، عروض المجلة الرسمية، هدايا ثلاجة الجبن، وسحب الميكروويف في دار الخير هايبر ماركت.
        </p>
      </div>

      {/* 2-Column Interactive Layout matching ONDERA Desktop & Mobile (`media_1793972976521_cdcb89e2.png`) */}
      <div
        dir="ltr"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
      >
        {/* Left Column: Active Answer Card with `/03` + Horizontal Image Side-by-Side on Desktop & Full Answer Below */}
        <div className="lg:col-span-5 rounded-[28px] bg-[#FCFAEB] border border-[#111613]/10 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="font-en text-5xl sm:text-6xl text-[#027443]/30 leading-none select-none shrink-0">
              {current.num}
            </span>
            <div className="flex-1 h-36 sm:h-44 rounded-[20px] bg-[#111613] overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.num}
                src={current.image}
                alt={current.questionAr}
                className={`w-full h-full transition-all duration-300 ${
                  current.image.includes("stage")
                    ? "object-cover"
                    : "object-contain p-3"
                }`}
              />
            </div>
          </div>

          <div dir="rtl" className="mt-5 text-right">
            <h3 className="text-base sm:text-lg font-black text-[#111613] leading-snug">
              {current.questionAr}
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-[#111613]/75 leading-relaxed">
              {current.answerAr}
            </p>
          </div>
        </div>

        {/* Right Column: Numbered Pill Selector Rows (`/01`..`/05` with solid Olive/Green active fill & Zero Truncation) */}
        <div className="lg:col-span-7 flex flex-col gap-2.5" dir="rtl">
          {FAQS.map((item, idx) => {
            const isSelected = idx === active;
            return (
              <div key={item.num} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`w-full rounded-[24px] px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-right transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#027443] border-[#027443] text-white shadow-[0_12px_28px_-10px_rgba(2,116,67,0.55)]"
                      : "bg-white hover:bg-[#F2FAF5] border-[#111613]/12 text-[#111613]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      dir="ltr"
                      className={`font-en text-xs sm:text-sm shrink-0 ${
                        isSelected ? "text-[#FAA006]" : "text-[#111613]/45"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="text-xs sm:text-sm font-black leading-snug text-right">
                      {item.questionAr}
                    </span>
                  </div>
                  <span
                    dir="ltr"
                    className={`font-en text-base sm:text-lg leading-none shrink-0 ${
                      isSelected ? "text-white" : "text-[#027443]"
                    }`}
                  >
                    {isSelected ? "−" : "+"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
