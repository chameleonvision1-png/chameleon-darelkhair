"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store";
import { formatPrice, paymentMethods } from "@/lib/format";
import { CheckIcon, MinusIcon, PhoneIcon, PinIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "./icons";

const RAFFLE_THRESHOLD = 1000;

export default function CartClient() {
  const { cart, updateQty, removeLine, subtotal, branch, openPicker, clearCart, hydrated } = useStore();
  const router = useRouter();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: paymentMethods[0], notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!hydrated) return <div className="py-32 text-center text-[#111613]/50 font-bold">جاري تحميل سلة المشتريات…</div>;

  if (cart.length === 0)
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-[28px] bg-[#FCFAEB] p-3 border border-[#027443]/20 mx-auto grid place-items-center shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-emblem.webp" alt="دار الخير هايبر ماركت" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#111613] mt-5">
          سلة التسوق فارغة حاليًا
        </h2>
        <p className="text-[#111613]/68 mt-1.5 font-semibold leading-relaxed">
          تصفح مجلة العروض وأقسام دار الخير هايبر ماركت (الألبان، الجبن والفينو، الزيوت، السمن، الأرز والمكرونة) واطلب كل احتياجات بيتك في مدينة بدر.
        </p>
        <Link href="/menu" className="btn btn-primary mt-6">
          تصفح الأقسام والعروض الآن
        </Link>
      </div>
    );

  const total = subtotal;
  const remainingForRaffle = Math.max(0, RAFFLE_THRESHOLD - total);
  const raffleProgress = Math.min(100, Math.round((total / RAFFLE_THRESHOLD) * 100));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const activeBranch = branch;
    if (!activeBranch) {
      openPicker();
      setError("يرجى تأكيد فرع مدينة بدر أولاً");
      return;
    }
    setLoading(true);
    const win = window.open("", "_blank");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: activeBranch.id,
          customerName: form.name,
          customerPhone: form.phone,
          orderType,
          address: form.address,
          paymentMethod: form.payment,
          notes: form.notes,
          items: cart.map((l) => ({
            productId: l.productId,
            sizeLabel: l.sizeLabel,
            addons: l.addons.map((a) => a.label),
            note: l.note,
            qty: l.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ أثناء تسجيل الطلب، حاول مرة أخرى");
      if (win) win.location.href = data.whatsappUrl;
      sessionStorage.setItem(`wa_${data.order.id}`, data.whatsappUrl);
      clearCart();
      router.push(`/order/${data.order.id}`);
    } catch (err) {
      win?.close();
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[1fr_430px] gap-6 items-start">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="sticker-badge mb-1.5">SHOPPING CART • DAR EL KHAIR</span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111613]">
              سلة مشتريات دار الخير
            </h1>
          </div>
          <Link href="/menu" className="text-sm font-black text-[#027443] hover:underline">
            + أضف منتجات أخرى
          </Link>
        </div>

        {/* 1000 EGP Microwave Raffle Progress Bar */}
        <div
          className={`rounded-[26px] p-4 sm:p-5 border transition-colors ${
            remainingForRaffle === 0
              ? "bg-[#027443] text-white border-[#027443]"
              : "bg-[#FCFAEB] text-[#111613] border-[#027443]/25"
          }`}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-8 h-8 rounded-full grid place-items-center text-xs font-black shrink-0 ${
                  remainingForRaffle === 0
                    ? "bg-[#FAA006] text-[#111613]"
                    : "bg-[#027443] text-white"
                }`}
              >
                {remainingForRaffle === 0 ? <CheckIcon className="w-4 h-4" /> : "%"}
              </span>
              <div>
                <div className="font-black text-sm sm:text-base">
                  {remainingForRaffle === 0
                    ? "مبروك! فاتورتك مؤهلة لدخول السحب على الميكروويف الهدية"
                    : `عدّي الألف واستنى السحب — باقي ${formatPrice(remainingForRaffle)} لدخول سحب الميكروويف`}
                </div>
                <div
                  className={`text-xs font-semibold mt-0.5 ${
                    remainingForRaffle === 0 ? "text-white/85" : "text-[#111613]/65"
                  }`}
                >
                  كل فاتورة تتخطى 1000 ج.م تدخل السحب الرسمي في دار الخير هايبر ماركت
                </div>
              </div>
            </div>
            <span
              dir="ltr"
              className={`font-en text-xs px-3 py-1 rounded-full ${
                remainingForRaffle === 0
                  ? "bg-white/15 text-[#FAA006]"
                  : "bg-[#027443]/10 text-[#027443]"
              }`}
            >
              {raffleProgress}% / 1000 EGP
            </span>
          </div>

          <div
            className={`mt-3 h-2.5 w-full rounded-full overflow-hidden ${
              remainingForRaffle === 0 ? "bg-white/20" : "bg-[#027443]/12"
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                remainingForRaffle === 0 ? "bg-[#FAA006]" : "bg-[#027443]"
              }`}
              style={{ width: `${raffleProgress}%` }}
            />
          </div>
        </div>

        {cart.map((l) => (
          <div
            key={l.key}
            className="rounded-[24px] bg-white border border-[#027443]/18 p-3.5 sm:p-4 flex gap-3.5 shadow-xs"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#FCFAEB] border border-[#027443]/12 p-1.5 shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={l.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <h3 className="font-black text-[#111613] text-right">{l.name}</h3>
                <button
                  onClick={() => removeLine(l.key)}
                  className="text-[#111613]/40 hover:text-berry cursor-pointer"
                  aria-label="حذف"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-[#111613]/65 mt-0.5 font-semibold text-right">
                {l.sizeLabel && <span>{l.sizeLabel}</span>}
                {l.addons.length > 0 && (
                  <span> • إضافات: {l.addons.map((a) => a.label).join("، ")}</span>
                )}
                {l.note && <div className="text-[#027443] mt-0.5">ملاحظة: {l.note}</div>}
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <div className="flex items-center gap-1 bg-[#FCFAEB] border border-[#027443]/15 rounded-full p-0.5">
                  <button
                    onClick={() => updateQty(l.key, l.qty - 1)}
                    className="w-7 h-7 rounded-full bg-white grid place-items-center cursor-pointer"
                    aria-label="تقليل"
                  >
                    <MinusIcon className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-black text-sm tabular-nums">{l.qty}</span>
                  <button
                    onClick={() => updateQty(l.key, l.qty + 1)}
                    className="w-7 h-7 rounded-full bg-white grid place-items-center cursor-pointer"
                    aria-label="زيادة"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-black text-[#027443] tabular-nums">
                  {formatPrice(l.unitPrice * l.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Department Upsells */}
        <div className="rounded-[24px] p-4 sm:p-5 bg-[#FCFAEB] border border-[#027443]/20">
          <p className="font-black text-sm text-[#027443]">
            نسيت حاجة من أساسيات البيت أو عرض الجبنة والفينو؟
          </p>
          <div className="flex gap-2 mt-2.5 flex-wrap">
            <Link
              href="/menu?cat=cheese_bakery"
              className="text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 px-3.5 py-1.5 rounded-full transition"
            >
              عرض الجبنة والفينو الهدية
            </Link>
            <Link
              href="/menu?cat=dairy"
              className="text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 px-3.5 py-1.5 rounded-full transition"
            >
              الألبان والجبن
            </Link>
            <Link
              href="/menu?cat=oils"
              className="text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 px-3.5 py-1.5 rounded-full transition"
            >
              الزيوت والسمن والزبدة
            </Link>
            <Link
              href="/menu?cat=rice_flour"
              className="text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 px-3.5 py-1.5 rounded-full transition"
            >
              الأرز والدقيق والسكر
            </Link>
          </div>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="rounded-[28px] bg-white border border-[#027443]/22 p-5 sm:p-6 space-y-4 lg:sticky lg:top-24 shadow-[0_16px_38px_-16px_rgba(2,116,67,0.16)]"
      >
        <div>
          <div className="label">فرع التوصيل والاستلام</div>
          <button
            type="button"
            onClick={openPicker}
            className="w-full flex items-center justify-between rounded-2xl border border-[#027443]/30 bg-[#FCFAEB] px-4 py-3 font-extrabold text-[#027443] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <PinIcon className="w-4 h-4" />
              {branch ? `${branch.name} — ${branch.city}` : "دار الخير هايبر ماركت — مدينة بدر"}
            </span>
            <span className="text-xs underline">تفاصيل الفرع</span>
          </button>
          {branch && (
            <div className="mt-2 flex items-center justify-between text-xs text-[#111613]/70 px-1">
              <span>أرقام خدمة العملاء السريعة:</span>
              <div className="flex items-center gap-1.5" dir="ltr">
                <a
                  href={`tel:${branch.phone}`}
                  className="inline-flex items-center gap-1 font-black text-[#027443] hover:underline"
                >
                  <PhoneIcon className="w-3 h-3" />
                  <span>{branch.phone}</span>
                </a>
                {branch.phone2 && (
                  <a
                    href={`tel:${branch.phone2}`}
                    className="inline-flex items-center gap-1 font-black text-[#027443] hover:underline"
                  >
                    <span>• {branch.phone2}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 bg-[#FCFAEB] p-1 rounded-full border border-[#027443]/15">
          {(["delivery", "pickup"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setOrderType(t)}
              className={`py-2 rounded-full font-extrabold text-sm transition cursor-pointer ${
                orderType === t ? "bg-[#027443] text-white shadow-xs" : "text-[#111613]/75"
              }`}
            >
              {t === "delivery" ? "توصيل لباب البيت" : "استلام من الهايبر"}
            </button>
          ))}
        </div>

        <div>
          <label className="label" htmlFor="name">
            الاسم الكامل
          </label>
          <input
            id="name"
            required
            className="input"
            placeholder="اكتب اسمك الثلاثي أو الثنائي"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            رقم الموبايل
          </label>
          <input
            id="phone"
            required
            dir="ltr"
            inputMode="tel"
            placeholder="01xxxxxxxxx"
            className="input text-right"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        {orderType === "delivery" && (
          <div>
            <label className="label" htmlFor="address">
              العنوان داخل مدينة بدر بالتفصيل
            </label>
            <textarea
              id="address"
              required
              rows={2}
              className="input"
              placeholder="الحي / المجاورة / كمبوند دار مصر أو سكن مصر، رقم العمارة، الدور، الشقة"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        )}
        <div>
          <label className="label" htmlFor="pay">
            طريقة الدفع
          </label>
          <select
            id="pay"
            className="input"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
          >
            {paymentMethods.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="notes">
            ملاحظات إضافية على الطلب (اختياري)
          </label>
          <input
            id="notes"
            className="input"
            placeholder="مثال: تقطيع الجبنة شرائح رفيعة، الاتصال قبل الوصول…"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="border-t border-dashed border-[#027443]/20 pt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-lg font-black text-[#027443] pt-1">
            <span>إجمالي المنتجات</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>

        {error && (
          <p className="text-sm font-bold text-berry bg-berry/10 rounded-xl p-3">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="btn btn-whatsapp w-full text-base sm:text-lg disabled:opacity-50 cursor-pointer"
        >
          <WhatsAppIcon /> {loading ? "جاري تجهيز الطلب…" : "تأكيد وإرسال الطلب عبر واتساب"}
        </button>
        <p className="text-xs text-[#111613]/60 text-center font-semibold">
          سيتم فتح واتساب خدمة عملاء دار الخير (`01270158888`) برسالة طلبك كاملة بالأصناف والأسعار للتأكيد الفوري.
        </p>
      </form>
    </div>
  );
}
