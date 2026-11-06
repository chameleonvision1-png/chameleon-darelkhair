import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";

const menuTitle = "الأقسام ومجلة العروض بالأسعار | دار الخير هايبر ماركت — مدينة بدر";
const menuDescription =
  "تصفح أقسام ومجلة عروض دار الخير هايبر ماركت في مدينة بدر بالأسعار: الألبان والزبادي، ثلاجة الجبن وعرض الفينو الهدية، الزيوت والسمن والزبدة، الأرز والمكرونة والدقيق، المربى والحلاوة والعسل، الشاي والسكر، والمعلبات — توصيل منزلي سريع 24 ساعة (01270158888).";

export const metadata: Metadata = {
  title: "الأقسام ومجلة العروض بالأسعار",
  description: menuDescription,
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://darelkhair.chameleon.vision/menu",
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: menuTitle,
    description: menuDescription,
    images: [
      {
        url: "/og-menu.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "منيو وكتالوج دار الخير هايبر ماركت — Dar El Khair Menu",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: menuTitle,
    description: menuDescription,
    images: ["/og-menu.jpg?v=3"],
  },
};

export default async function MenuPage(props: PageProps<"/menu">) {
  const sp = await props.searchParams;
  const cat = typeof sp.cat === "string" ? sp.cat : undefined;
  const data = await publicDB();
  return (
    <MenuClient
      categories={data.categories}
      products={data.products}
      initialCat={cat}
    />
  );
}
