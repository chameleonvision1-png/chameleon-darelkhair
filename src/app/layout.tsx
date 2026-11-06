import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cairo, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = "https://darelkhair.chameleon.vision";
const siteTitle = "دار الخير هايبر ماركت | Dar El Khair Hyper Market — مدينة بدر";
const siteDescription =
  "دار الخير هايبر ماركت في مدينة بدر — تسوق أسهل لكل احتياجات بيتك من الألبان والجبن والزيوت والأرز والمكرونة والمربى والمعلبات بأقوى عروض التوفير وتوصيل منزلي 24 ساعة عبر واتساب 01270158888.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "دار الخير هايبر ماركت",
  title: {
    default: siteTitle,
    template: "%s | دار الخير هايبر ماركت",
  },
  description: siteDescription,
  keywords: [
    "دار الخير هايبر ماركت",
    "Dar El Khair Hyper Market",
    "هايبر ماركت مدينة بدر",
    "سوبر ماركت مدينة بدر",
    "عروض دار الخير مدينة بدر",
    "توصيل طلبات مدينة بدر",
    "مجلة عروض دار الخير",
    "خزين البيت مدينة بدر",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icon-192.png?v=2"],
    apple: [{ url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "دار الخير هايبر ماركت | Dar El Khair Hyper Market",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "دار الخير هايبر ماركت — مدينة بدر",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg?v=2"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "دار الخير",
  },
};

export const viewport: Viewport = {
  themeColor: "#027443",
};

const pwaInitScript = `
(function() {
  if (typeof window === "undefined") return;
  window.addEventListener("error", function(e) {
    if (e && e.filename && e.filename.indexOf("chrome-extension://") === 0) {
      e.stopImmediatePropagation();
    }
  }, true);
  window.addEventListener("unhandledrejection", function(e) {
    var stack = e && e.reason && e.reason.stack ? String(e.reason.stack) : "";
    if (stack.indexOf("chrome-extension://") !== -1) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event("pwa-install-available"));
  });
  window.addEventListener("appinstalled", function() {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event("pwa-app-installed"));
  });
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "Dar El Khair Hyper Market",
  alternateName: "دار الخير هايبر ماركت",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  priceRange: "$$",
  telephone: "+201270158888",
  openingHours: "Mo-Su 00:00-23:59",
  address: {
    "@type": "PostalAddress",
    addressLocality: "مدينة بدر",
    addressRegion: "القاهرة",
    addressCountry: "EG",
  },
  sameAs: [
    "https://www.facebook.com/DarElkhairHyperMarket",
    "https://www.instagram.com/darelkhairhypermarket",
    "https://www.tiktok.com/@darelkhairhypermarket",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${cairo.variable} ${anton.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh flex flex-col w-full max-w-full overflow-x-clip">
        <Script
          id="pwa-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: pwaInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
