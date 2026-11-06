import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    short_name: "دار الخير",
    description:
      "دار الخير هايبر ماركت في مدينة بدر — تسوق أسهل لكل احتياجات بيتك، عروض يومية وتوصيل سريع 24 ساعة عبر واتساب 01270158888",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#027443",
    dir: "rtl",
    lang: "ar",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
