"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api, type AdminData } from "./ui";
import OrdersTab from "./OrdersTab";
import ProductsTab from "./ProductsTab";
import OffersTab from "./OffersTab";
import BranchesTab from "./BranchesTab";
import OccasionsTab from "./OccasionsTab";
import CategoriesTab from "./CategoriesTab";
import SettingsTab from "./SettingsTab";
import Overview from "./Overview";

const tabs = [
  { id: "overview", label: "نظرة عامة", icon: "/01" },
  { id: "orders", label: "الطلبات", icon: "/02" },
  { id: "products", label: "المنتجات", icon: "/03" },
  { id: "categories", label: "الأقسام", icon: "/04" },
  { id: "offers", label: "العروض", icon: "/05" },
  { id: "branches", label: "الفروع", icon: "/06" },
  { id: "occasions", label: "طلبات الجملة والخير", icon: "/07" },
  { id: "settings", label: "الإعدادات", icon: "/08" },
] as const;
type Tab = (typeof tabs)[number]["id"];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<AdminData | null>(null);
  const [toast, setToast] = useState("");
  const lastCount = useRef<number | null>(null);
  const router = useRouter();

  const reload = useCallback(async () => {
    try {
      const d = await api<AdminData>("/api/admin/data", "GET");
      if (lastCount.current !== null && d.orders.length > lastCount.current) {
        setToast(`وصل ${d.orders.length - lastCount.current} طلب جديد`);
        try {
          const ctx = new AudioContext();
          const o = ctx.createOscillator();
          o.frequency.value = 880;
          o.connect(ctx.destination);
          o.start();
          o.stop(ctx.currentTime + 0.25);
        } catch {}
      }
      lastCount.current = d.orders.length;
      setData(d);
    } catch {
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    reload();
    const t = setInterval(reload, 20000);
    return () => clearInterval(t);
  }, [reload]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = (m: string) => setToast(m);
  const logout = async () => {
    await api("/api/admin/login", "DELETE");
    router.refresh();
  };

  const newOrders = data?.orders.filter((o) => o.status === "new").length ?? 0;
  const newOcc = data?.occasions.filter((o) => o.status === "new").length ?? 0;

  return (
    <div className="min-h-screen bg-[#FCFAEB] lg:flex">
      <aside className="lg:w-64 lg:min-h-screen bg-[#027443] text-white lg:sticky lg:top-0 lg:h-screen flex lg:flex-col">
        <div className="hidden lg:flex items-center gap-3 p-5 border-b border-white/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-emblem-cream.png"
            alt="دار الخير هايبر ماركت"
            className="w-12 h-12 rounded-xl bg-[#015933] p-1 border border-[#FAA006]"
          />
          <div>
            <div className="font-black">دار الخير هايبر ماركت</div>
            <div className="text-xs text-white/70">لوحة التحكم</div>
          </div>
        </div>
        <nav className="flex lg:flex-col overflow-x-auto no-scrollbar lg:p-3 gap-1 flex-1">
          {tabs.map((t) => {
            const badge = t.id === "orders" ? newOrders : t.id === "occasions" ? newOcc : 0;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-3 lg:rounded-xl font-bold text-sm transition ${
                  tab === t.id ? "bg-white text-[#027443]" : "hover:bg-white/10"
                }`}
              >
                <span dir="ltr" className="font-en text-xs opacity-70">
                  {t.icon}
                </span>
                {t.label}
                {badge > 0 && (
                  <span className="ms-auto bg-[#FAA006] text-[#111613] text-xs rounded-full px-2">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="hidden lg:block p-3 border-t border-white/15 space-y-1">
          <a
            href="/"
            target="_blank"
            className="block px-4 py-2 text-sm text-white/80 hover:text-white"
          >
            ↗ فتح الموقع
          </a>
          <button
            onClick={logout}
            className="block w-full text-start px-4 py-2 text-sm text-white/80 hover:text-white"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-8 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-[#027443]">
            {tabs.find((t) => t.id === tab)?.label}
          </h1>
          <div className="flex gap-2">
            <button onClick={reload} className="btn btn-outline text-sm py-2">
              تحديث
            </button>
            <button onClick={logout} className="lg:hidden btn bg-white text-sm py-2">
              خروج
            </button>
          </div>
        </div>
        {!data ? (
          <div className="py-20 text-center text-[#111613]/50">جاري التحميل…</div>
        ) : (
          <>
            {tab === "overview" && <Overview data={data} goto={(t) => setTab(t as Tab)} />}
            {tab === "orders" && <OrdersTab data={data} reload={reload} notify={notify} />}
            {tab === "products" && <ProductsTab data={data} reload={reload} notify={notify} />}
            {tab === "categories" && <CategoriesTab data={data} reload={reload} notify={notify} />}
            {tab === "offers" && <OffersTab data={data} reload={reload} notify={notify} />}
            {tab === "branches" && <BranchesTab data={data} reload={reload} notify={notify} />}
            {tab === "occasions" && <OccasionsTab data={data} reload={reload} notify={notify} />}
            {tab === "settings" && <SettingsTab data={data} reload={reload} notify={notify} />}
          </>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-5 inset-x-0 mx-auto w-fit z-[70] bg-[#111613] text-white px-5 py-3 rounded-full font-bold shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

export interface TabProps {
  data: AdminData;
  reload: () => Promise<void>;
  notify: (m: string) => void;
}
