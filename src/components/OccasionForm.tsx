"use client";

import { useState } from "react";
import type { Branch } from "@/lib/types";
import { occasionTypes } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, WhatsAppIcon } from "./icons";

export default function OccasionForm({ branches }: { branches: Branch[] }) {
  const { branch } = useStore();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [wa, setWa] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setState("loading");
    const res = await fetch("/api/occasions", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setState("idle");
      return;
    }
    setWa(data.whatsappUrl);
    setState("done");
  };

  if (state === "done")
    return (
      <div className="rounded-[28px] bg-white border-2 border-[#027443]/30 p-6 text-center lg:sticky lg:top-24 shadow-lg">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#027443] text-white grid place-items-center">
          <CheckIcon className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-[#027443] mt-3">
          تم تسجيل طلبك في دار الخير هايبر ماركت
        </h2>
        <p className="text-[#111613]/70 mt-1 text-sm font-semibold">
          سنتواصل معك فورًا لتأكيد الأصناف والكميات المطلوبة. ولتسريع التنفيذ، أرسل التفاصيل مباشرة عبر واتساب خدمة العملاء:
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp w-full mt-4"
        >
          <WhatsAppIcon /> إرسال التفاصيل عبر واتساب
        </a>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-white border border-[#027443]/25 p-6 space-y-4 lg:sticky lg:top-24 shadow-[0_16px_38px_-16px_rgba(2,116,67,0.16)]"
    >
      <div>
        <span className="sticker-badge mb-2">WHOLESALE &amp; CHARITY BOXES</span>
        <h2 className="text-xl font-black text-[#111613]">
          اطلب كرتونة الخير أو خزين الشهر أو طلبات الجملة
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="o-name">
            الاسم *
          </label>
          <input id="o-name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="o-phone">
            الموبايل *
          </label>
          <input
            id="o-phone"
            name="phone"
            required
            dir="ltr"
            inputMode="tel"
            className="input text-right"
            placeholder="01xxxxxxxxx"
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="o-type">
          نوع الطلب *
        </label>
        <select id="o-type" name="type" className="input" required>
          {occasionTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="o-q">
            العدد التقريبي للكراتين أو قيمة الفاتورة
          </label>
          <input
            id="o-q"
            name="quantity"
            className="input"
            placeholder="مثال: 10 كراتين خير / فاتورة خزين 1500 ج"
          />
        </div>
        <div>
          <label className="label" htmlFor="o-d">
            التاريخ المطلوب للتوريد *
          </label>
          <input id="o-d" name="date" type="date" required className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="o-b">
          الفرع
        </label>
        <select id="o-b" name="branchId" className="input" defaultValue={branch?.id}>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} — {b.city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="o-det">
          تفاصيل الأصناف المطلوبة أو العنوان
        </label>
        <textarea
          id="o-det"
          name="details"
          rows={3}
          className="input"
          placeholder="اكتب مكونات الكرتونة المطلوبة (زيت، أرز، سكر، مكرونة، سمن، جبن) أو عنوان التوصيل بمدينة بدر…"
        />
      </div>
      {error && (
        <p className="text-sm font-bold text-berry bg-berry/10 rounded-xl p-3">
          {error}
        </p>
      )}
      <button
        disabled={state === "loading"}
        className="btn btn-primary w-full cursor-pointer"
      >
        {state === "loading" ? "جاري الإرسال…" : "إرسال الطلب وتأكيده عبر واتساب"}
      </button>
    </form>
  );
}
