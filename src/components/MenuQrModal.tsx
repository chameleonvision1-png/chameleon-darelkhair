"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { generateQrMatrix } from "@/lib/qrcode";
import {
  CheckIcon,
  CopyIcon,
  DownloadAppIcon,
  FacebookIcon,
  PrintIcon,
  QrCodeIcon,
  ShareNodesIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "./icons";

const MENU_URL = "https://darelkhair.chameleon.vision/menu";
const SHARE_TITLE = "مجلة عروض وأقسام دار الخير هايبر ماركت — مدينة بدر | Dar El Khair Hyper Market";
const SHARE_TEXT =
  "تصفح مجلة العروض الرسمية واطلب احتياجات بيتك أونلاين من دار الخير هايبر ماركت — مدينة بدر (توصيل 24 ساعة - 01270158888):";

export default function MenuQrModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const matrix = useMemo(() => generateQrMatrix(MENU_URL, "Q"), []);
  const size = matrix.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isCenterLogoZone = useCallback(
    (r: number, c: number) => {
      const center = (size - 1) / 2;
      const radius = 3.6;
      return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
    },
    [size],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MENU_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement("input");
      input.value = MENU_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: MENU_URL,
        });
        return;
      } catch {
        // user cancelled
      }
    }
    handleCopy();
  };

  const handleDownloadQrImage = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      const W = 1080;
      const H = 1380;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Forest Green background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#015933");
      bgGrad.addColorStop(0.5, "#027443");
      bgGrad.addColorStop(1, "#111613");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Decorative Golden Wheat glow
      const radGrad = ctx.createRadialGradient(W * 0.8, H * 0.12, 10, W * 0.8, H * 0.12, 360);
      radGrad.addColorStop(0, "rgba(250, 160, 6, 0.28)");
      radGrad.addColorStop(1, "rgba(250, 160, 6, 0)");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, W, H);

      // Warm Cream inner card
      const cardX = 80;
      const cardY = 80;
      const cardW = W - 160;
      const cardH = H - 160;
      ctx.fillStyle = "#FCFAEB";
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 48);
      ctx.fill();

      const loadImg = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      try {
        const emblemLogo = await loadImg("/logo-emblem.png");
        const lw = 140;
        ctx.drawImage(emblemLogo, (W - lw) / 2, cardY + 34, lw, lw);
      } catch {
        // ignore
      }

      // Title
      ctx.fillStyle = "#027443";
      ctx.font = "900 42px Cairo, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("دار الخير هايبر ماركت — مدينة بدر", W / 2, cardY + 225);

      ctx.fillStyle = "#111613";
      ctx.font = "700 25px Cairo, sans-serif";
      ctx.fillText("امسح رمز الـ QR بالكاميرا لتصفح مجلة العروض والطلب مباشرة", W / 2, cardY + 272);

      // QR Frame
      const qrBoxSize = 610;
      const qrBoxX = (W - qrBoxSize) / 2;
      const qrBoxY = cardY + 310;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#027443";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 36);
      ctx.fill();
      ctx.stroke();

      const quietZone = 44;
      const cell = (qrBoxSize - quietZone * 2) / size;

      ctx.fillStyle = "#027443";
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!matrix[r][c] || isCenterLogoZone(r, c)) continue;
          const x = qrBoxX + quietZone + c * cell;
          const y = qrBoxY + quietZone + r * cell;
          ctx.beginPath();
          ctx.roundRect(x + 0.4, y + 0.4, cell - 0.8, cell - 0.8, cell * 0.25);
          ctx.fill();
        }
      }

      // Center logo inside QR
      try {
        const roundLogo = await loadImg("/logo-emblem-cream.png");
        const badgeSize = 122;
        const bx = W / 2 - badgeSize / 2;
        const by = qrBoxY + qrBoxSize / 2 - badgeSize / 2;
        ctx.fillStyle = "#027443";
        ctx.beginPath();
        ctx.roundRect(bx - 8, by - 8, badgeSize + 16, badgeSize + 16, 28);
        ctx.fill();
        ctx.strokeStyle = "#FAA006";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.drawImage(roundLogo, bx, by, badgeSize, badgeSize);
      } catch {
        // ignore
      }

      // Categories summary strip
      ctx.fillStyle = "#111613";
      ctx.font = "800 24px Cairo, sans-serif";
      ctx.fillText(
        "ألبان وجبن • زيوت وسمن • أرز ومكرونة • مربى وعسل • توصيل 24 ساعة",
        W / 2,
        qrBoxY + qrBoxSize + 65,
      );

      // URL pill at bottom
      const pillW = 640;
      const pillH = 66;
      const pillX = (W - pillW) / 2;
      const pillY = qrBoxY + qrBoxSize + 100;
      ctx.fillStyle = "#027443";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 999);
      ctx.fill();

      ctx.fillStyle = "#FAA006";
      ctx.font = "800 26px Cairo, sans-serif";
      ctx.fillText("darelkhair.chameleon.vision/menu", W / 2, pillY + 42);

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "dar-el-khair-catalog-qr.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    const svgEl = document.getElementById("darelkhair-menu-qr-svg");
    const svgMarkup = svgEl ? svgEl.outerHTML : "";

    const printHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>طباعة باركود كتالوج دار الخير هايبر ماركت</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Cairo', system-ui, sans-serif;
      background: #FCFAEB;
      color: #111613;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .sheet {
      width: 100%;
      max-width: 180mm;
      border: 4px solid #027443;
      border-radius: 32px;
      padding: 28px 32px;
      text-align: center;
      background: #FCFAEB;
    }
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #EBE6CE;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand img {
      width: 58px;
      height: 58px;
      border-radius: 16px;
      background: #ffffff;
      padding: 4px;
      border: 1px solid #027443;
    }
    .brand-title {
      font-family: 'Anton', sans-serif;
      font-size: 26px;
      color: #027443;
      letter-spacing: 1px;
    }
    .badge {
      background: #FAA006;
      color: #111613;
      font-weight: 900;
      font-size: 13px;
      padding: 6px 18px;
      border-radius: 999px;
    }
    h1 {
      font-size: 30px;
      font-weight: 900;
      color: #027443;
      margin-bottom: 6px;
    }
    .sub {
      font-size: 16px;
      font-weight: 700;
      color: #111613;
      margin-bottom: 22px;
    }
    .qr-wrap {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 0 auto 22px auto;
      padding: 18px;
      background: #ffffff;
      border: 3px solid #027443;
      border-radius: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-wrap svg {
      width: 100%;
      height: 100%;
    }
    .qr-center-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 62px;
      height: 62px;
      background: #027443;
      border: 2.5px solid #FAA006;
      border-radius: 16px;
      padding: 4px;
      object-fit: contain;
    }
    .cats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .cat {
      background: #ffffff;
      border: 1.5px solid #027443;
      color: #027443;
      font-size: 13px;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 999px;
    }
    .url-box {
      display: inline-block;
      background: #027443;
      color: #FAA006;
      font-size: 18px;
      font-weight: 900;
      padding: 10px 28px;
      border-radius: 999px;
      direction: ltr;
      letter-spacing: 0.5px;
    }
    .footer-note {
      margin-top: 14px;
      font-size: 13px;
      font-weight: 800;
      color: #111613;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header-bar">
      <div class="brand">
        <img src="${window.location.origin}/logo-emblem.png" alt="دار الخير" />
        <span class="brand-title">DAR EL KHAIR HYPER MARKET</span>
      </div>
      <span class="badge">SCAN FOR CATALOG & OFFERS</span>
    </div>
    <h1>مجلة عروض وأقسام دار الخير هايبر ماركت</h1>
    <p class="sub">وجّه كاميرا الموبايل نحو رمز الـ QR لتصفح الأقسام والطلب مباشرة في مدينة بدر</p>
    <div class="qr-wrap">
      ${svgMarkup}
      <img src="${window.location.origin}/logo-emblem-cream.png" class="qr-center-logo" alt="دار الخير" />
    </div>
    <div class="cats">
      <span class="cat">الألبان والجبن والفينو</span>
      <span class="cat">الزيوت والسمن والزبدة</span>
      <span class="cat">الأرز والمكرونة والدقيق</span>
      <span class="cat">المربى والحلاوة والعسل</span>
      <span class="cat">الشاي والسكر والمعلبات</span>
      <span class="cat">سحب الميكروويف</span>
    </div>
    <div class="url-box">darelkhair.chameleon.vision/menu</div>
    <div class="footer-note">دار الخير هايبر ماركت — مدينة بدر (مفتوح 24 ساعة) • 01270158888 • 01210004039</div>
  </div>
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;

    const printWin = window.open("", "_blank", "width=840,height=960");
    if (printWin) {
      printWin.document.open();
      printWin.document.write(printHtml);
      printWin.document.close();
    } else {
      window.print();
    }
  };

  if (!open || typeof document === "undefined") return null;

  const encodedUrl = encodeURIComponent(MENU_URL);
  const encodedWhatsapp = encodeURIComponent(`${SHARE_TEXT}\n${MENU_URL}`);
  const encodedText = encodeURIComponent(SHARE_TEXT);

  const socialPlatforms = [
    {
      id: "whatsapp",
      label: "واتساب",
      href: `https://wa.me/?text=${encodedWhatsapp}`,
      icon: <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />,
    },
    {
      id: "facebook",
      label: "فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="w-4 h-4 text-[#1877F2] shrink-0" />,
    },
    {
      id: "telegram",
      label: "تيليجرام",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: <TelegramIcon className="w-4 h-4 text-[#0088cc] shrink-0" />,
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center sm:p-4 animate-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-qr-modal-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#111613]/65 backdrop-blur-sm" />

      <div
        className="relative w-full sm:max-w-md bg-[#FCFAEB] rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 border-[#027443]/25 overflow-hidden flex flex-col max-h-[90vh] animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 bg-[#027443] text-white px-5 pt-4 sm:pt-5 pb-4">
          <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto mb-3 sm:hidden" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FAA006] text-[#111613] grid place-items-center shrink-0">
                <QrCodeIcon className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="menu-qr-modal-title"
                  className="text-lg sm:text-xl font-black text-white leading-tight"
                >
                  باركود ومشاركة كتالوج دار الخير
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                  امسح الكود بالكاميرا لفتح الأقسام ومجلة العروض أو شارك الرابط
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="w-9 h-9 rounded-full bg-white text-[#027443] grid place-items-center transition shrink-0 cursor-pointer"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Centered QR Code + Copy Link Box */}
          <div className="rounded-2xl bg-white border border-[#027443]/25 p-4 flex flex-col items-center gap-3.5">
            <div className="relative w-44 h-44 rounded-2xl bg-white p-3 border border-[#027443]/15 shadow-xs grid place-items-center">
              <svg
                id="darelkhair-menu-qr-svg"
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full"
                shapeRendering="geometricPrecision"
                role="img"
                aria-label="QR Code كتالوج دار الخير"
              >
                {matrix.map((row, r) =>
                  row.map((dark, c) => {
                    if (!dark || isCenterLogoZone(r, c)) return null;
                    return (
                      <rect
                        key={`${r}-${c}`}
                        x={c + 0.06}
                        y={r + 0.06}
                        width={0.88}
                        height={0.88}
                        rx={0.22}
                        fill="#027443"
                      />
                    );
                  }),
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-[#027443] p-1 border-2 border-[#FAA006] shadow-xs grid place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-emblem-cream.png"
                    alt="دار الخير"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copy Link Row */}
            <div className="w-full flex items-center justify-between gap-2 rounded-xl bg-[#FCFAEB] border border-[#027443]/15 p-1.5 ps-3">
              <span
                dir="ltr"
                className="truncate text-xs font-extrabold text-[#111613]/85 select-all"
              >
                darelkhair.chameleon.vision/menu
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-extrabold transition active:scale-95 cursor-pointer ${
                  copied
                    ? "bg-[#7FBB13] text-white"
                    : "bg-[#027443] text-white hover:bg-[#015933]"
                }`}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Row */}
          <div className="grid grid-cols-4 gap-2">
            {socialPlatforms.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 active:scale-95 transition"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-extrabold bg-white hover:bg-[#027443] text-[#111613] hover:text-white border border-[#027443]/20 active:scale-95 transition cursor-pointer"
            >
              <ShareNodesIcon className="w-4 h-4 text-[#027443] shrink-0" />
              <span>مشاركة</span>
            </button>
          </div>

          {/* Print & Download QR Code Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs sm:text-sm font-extrabold bg-[#027443] hover:bg-[#015933] text-white shadow-xs active:scale-[0.98] transition cursor-pointer"
            >
              <PrintIcon className="w-4 h-4 shrink-0" />
              <span>طباعة الباركود</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQrImage}
              disabled={downloading}
              className="flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs sm:text-sm font-extrabold bg-[#FAA006] hover:brightness-105 text-[#111613] active:scale-[0.98] transition disabled:opacity-60 cursor-pointer"
            >
              <DownloadAppIcon className="w-4 h-4 shrink-0" />
              <span>{downloading ? "جاري التحميل..." : "تحميل صورة QR"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
