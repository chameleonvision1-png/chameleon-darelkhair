import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const rootDir = "E:/Projects/Chameleon-DarElKhair";
const pubDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "src/app");

function toDataURI(filePath, mime) {
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// ============================================================================
// 1. GENERATE CIRCULAR EMBLEM BADGE FAVICONS & APP ICONS
//    (Matching alban3sal & BurgerStorm circular emblem badge standard)
// ============================================================================
console.log("1. Generating Circular Emblem Badge Favicons & App Icons...");

const emblemCreamPath = path.join(pubDir, "logo-emblem-cream.png");

// Create 800x800 circular emblem badge with transparent outer corners
const badgeSize = 800;
const emblemResized = await sharp(emblemCreamPath)
  .resize(535, 535, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const badgeSvg = Buffer.from(`
<svg width="${badgeSize}" height="${badgeSize}" viewBox="0 0 ${badgeSize} ${badgeSize}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="emeraldGrad" cx="46%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#059B5B"/>
      <stop offset="52%" stop-color="#027443"/>
      <stop offset="100%" stop-color="#014D2C"/>
    </radialGradient>
    <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="50%" stop-color="#FAA006"/>
      <stop offset="100%" stop-color="#D98200"/>
    </linearGradient>
  </defs>
  <!-- Outer White/Cream Halo Ring -->
  <circle cx="400" cy="400" r="392" fill="#FCFAEB"/>
  <!-- Golden Ring -->
  <circle cx="400" cy="400" r="380" fill="url(#goldRing)"/>
  <!-- Deep Emerald Inner Circle -->
  <circle cx="400" cy="400" r="356" fill="url(#emeraldGrad)"/>
  <!-- Subtle Inner Gold Pinstripe -->
  <circle cx="400" cy="400" r="340" fill="none" stroke="#FAA006" stroke-opacity="0.38" stroke-width="3"/>
</svg>
`);

const circularLogoBuf = await sharp(badgeSvg)
  .composite([
    {
      input: emblemResized,
      left: Math.round((badgeSize - 535) / 2),
      top: Math.round((badgeSize - 535) / 2) - 6,
    },
  ])
  .png()
  .toBuffer();

await sharp(circularLogoBuf).toFile(path.join(pubDir, "logo.png"));
await sharp(circularLogoBuf).resize(512, 512).png().toFile(path.join(pubDir, "icon-512.png"));
await sharp(circularLogoBuf).resize(192, 192).png().toFile(path.join(pubDir, "icon-192.png"));
await sharp(circularLogoBuf).resize(512, 512).png().toFile(path.join(appDir, "icon.png"));
await sharp(circularLogoBuf).resize(64, 64).png().toFile(path.join(pubDir, "favicon.ico"));

// Apple Touch Icon (180x180 full-bleed emerald with centered emblem for iOS rounded corners)
const appleBgSvg = Buffer.from(`
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="appleGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#049456"/>
      <stop offset="60%" stop-color="#027443"/>
      <stop offset="100%" stop-color="#014D2C"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#appleGrad)"/>
  <rect x="22" y="22" width="468" height="468" rx="96" fill="none" stroke="#FAA006" stroke-opacity="0.55" stroke-width="6"/>
</svg>
`);
const appleEmblem = await sharp(emblemCreamPath)
  .resize(370, 370, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const maskable512Buf = await sharp(appleBgSvg)
  .composite([{ input: appleEmblem, left: 71, top: 66 }])
  .png()
  .toBuffer();

await sharp(maskable512Buf).toFile(path.join(pubDir, "icon-maskable-512.png"));
await sharp(maskable512Buf).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));

const staleAppFavicon = path.join(appDir, "favicon.ico");
if (fs.existsSync(staleAppFavicon)) fs.unlinkSync(staleAppFavicon);

console.log("   ✓ Generated circular favicons: logo.png, icon-192.png, icon-512.png, icon-maskable-512.png, src/app/icon.png, src/app/apple-icon.png");

// ============================================================================
// 2. GENERATE STUDIO-GRADE 1200x630 OPENGRAPH LINK PREVIEW IMAGES
//    (Matching alban3sal/web/scripts/generate-menu-og.mjs via Headless Browser)
// ============================================================================
console.log("2. Generating 1200x630 OpenGraph Preview Images via Headless Browser...");

const roundLogoUri = toDataURI(path.join(pubDir, "logo.png"), "image/png");
const backdropUri = toDataURI(path.join(pubDir, "images/hypermarket-backdrop.webp"), "image/webp");
const heroCartUri = toDataURI(path.join(pubDir, "images/hero-cart.webp"), "image/webp");
const magCoverUri = toDataURI(path.join(pubDir, "images/magazine/page-1.webp"), "image/webp");
const magPage2Uri = toDataURI(path.join(pubDir, "images/magazine/page-2.webp"), "image/webp");
const magPage8Uri = toDataURI(path.join(pubDir, "images/magazine/page-8.webp"), "image/webp");
const cheeseFinoUri = toDataURI(path.join(pubDir, "images/cheese-fino-stage.webp"), "image/webp");
const cheeseFino200Uri = toDataURI(path.join(pubDir, "images/cheese-fino-200.webp"), "image/webp");
const microwaveUri = toDataURI(path.join(pubDir, "images/microwave-stage.webp"), "image/webp");
const deptDairyUri = toDataURI(path.join(pubDir, "images/departments/dept-dairy.webp"), "image/webp");
const deptOilsUri = toDataURI(path.join(pubDir, "images/departments/dept-oils.webp"), "image/webp");
const deptJamsUri = toDataURI(path.join(pubDir, "images/departments/dept-jams.webp"), "image/webp");
const deptPastaUri = toDataURI(path.join(pubDir, "images/departments/dept-pasta.webp"), "image/webp");
const deptRiceUri = toDataURI(path.join(pubDir, "images/departments/dept-rice-flour.webp"), "image/webp");
const deptTeaUri = toDataURI(path.join(pubDir, "images/departments/dept-tea-sugar.webp"), "image/webp");
const maxtellaUri = toDataURI(path.join(pubDir, "images/products/maxtella-spread-1kg.webp"), "image/webp");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = fs.existsSync(chromePath) ? chromePath : edgePath;

function buildOgHtml({
  kicker,
  brandSub,
  titlePrefix,
  titleGold,
  desc,
  features,
  ctaText,
  urlText,
  cards,
  bannerTitle,
  bannerPills,
  bannerThumb,
  theme = "emerald",
}) {
  const bgGradient =
    theme === "dark"
      ? "linear-gradient(135deg, #0D1410 0%, #025E36 52%, #027443 100%)"
      : "linear-gradient(135deg, #013D23 0%, #027443 50%, #048C51 100%)";

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Cairo', sans-serif;
      background: #013D23;
      color: #ffffff;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      background: ${bgGradient};
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      padding: 38px 46px;
      overflow: hidden;
    }
    .bg-photo {
      position: absolute;
      inset: 0;
      background-image: url('${backdropUri}');
      background-size: cover;
      background-position: center;
      opacity: 0.13;
      mix-blend-mode: luminosity;
    }
    .glow-1 {
      position: absolute;
      width: 540px;
      height: 540px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(250,160,6,0.30) 0%, transparent 70%);
      top: -180px;
      left: -110px;
    }
    .glow-2 {
      position: absolute;
      width: 580px;
      height: 580px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(127,187,19,0.22) 0%, transparent 70%);
      bottom: -230px;
      right: 250px;
    }

    /* Right Column: Text & Explanation */
    .content-col {
      position: relative;
      z-index: 2;
      width: 650px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .top-brand {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .brand-logo {
      width: 92px;
      height: 92px;
      border-radius: 50%;
      background: transparent;
      box-shadow: 0 12px 28px rgba(0, 20, 10, 0.5);
      object-fit: contain;
      flex-shrink: 0;
    }
    .badge-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(250, 160, 6, 0.20);
      border: 1.5px solid rgba(250, 160, 6, 0.78);
      color: #FAA006;
      font-size: 15.5px;
      font-weight: 800;
      padding: 4px 16px;
      border-radius: 999px;
      width: fit-content;
    }
    .brand-sub {
      font-size: 17.5px;
      font-weight: 700;
      color: rgba(252, 250, 235, 0.92);
    }

    .headline-block {
      margin-top: 6px;
    }
    .main-title {
      font-size: 43px;
      font-weight: 900;
      line-height: 1.18;
      color: #ffffff;
      text-shadow: 0 6px 22px rgba(0, 20, 10, 0.45);
      white-space: nowrap;
    }
    .main-title span {
      color: #FAA006;
    }
    .desc {
      margin-top: 8px;
      font-size: 19px;
      font-weight: 700;
      line-height: 1.48;
      color: rgba(252, 250, 235, 0.94);
    }

    /* Feature Grid explaining the page */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 12px;
    }
    .feat-card {
      background: rgba(17, 22, 19, 0.34);
      border: 1px solid rgba(252, 250, 235, 0.24);
      border-radius: 18px;
      padding: 11px 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      backdrop-filter: blur(8px);
    }
    .feat-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #FAA006;
      color: #111613;
      font-size: 16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .feat-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .feat-title {
      font-size: 16px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.25;
      white-space: nowrap;
    }
    .feat-sub {
      font-size: 12px;
      font-weight: 700;
      color: rgba(252, 250, 235, 0.82);
      line-height: 1.3;
      white-space: nowrap;
    }

    .bottom-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      background: rgba(17, 22, 19, 0.72);
      border: 1.5px solid rgba(250, 160, 6, 0.45);
      border-radius: 999px;
      padding: 8px 20px 8px 10px;
    }
    .url-text {
      direction: ltr;
      font-size: 17px;
      font-weight: 800;
      color: #FAA006;
      letter-spacing: 0.4px;
    }
    .cta-btn {
      background: #FAA006;
      color: #111613;
      font-size: 16px;
      font-weight: 900;
      padding: 7px 22px;
      border-radius: 999px;
    }

    /* Left Column: Visual Showcase */
    .visual-col {
      position: relative;
      z-index: 2;
      width: 430px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
    }
    .showcase-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .prod-card {
      position: relative;
      height: 168px;
      border-radius: 24px;
      overflow: hidden;
      border: 2.5px solid rgba(252, 250, 235, 0.92);
      box-shadow: 0 14px 30px rgba(0, 20, 10, 0.42);
      background: #FCFAEB;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 10px 38px 10px;
    }
    .prod-card.cover-mode {
      padding: 0;
    }
    .prod-card img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .prod-card.cover-mode img {
      object-fit: cover;
    }
    .prod-label {
      position: absolute;
      bottom: 7px;
      right: 7px;
      left: 7px;
      background: rgba(17, 22, 19, 0.93);
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 800;
      padding: 5px 8px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      gap: 6px;
      overflow: hidden;
    }
    .prod-label span.lbl {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .prod-label span.tag {
      background: #FAA006;
      color: #111613;
      font-size: 10px;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 99px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .cats-banner {
      background: #FCFAEB;
      color: #111613;
      border-radius: 22px;
      padding: 12px 16px;
      box-shadow: 0 14px 30px rgba(0, 20, 10, 0.42);
      border: 2px solid #FAA006;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .cats-banner-right {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cats-banner-title {
      font-size: 14.5px;
      font-weight: 900;
      color: #027443;
      white-space: nowrap;
    }
    .cats-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .cat-pill {
      background: #E6F4EC;
      color: #027443;
      border: 1px solid rgba(2, 116, 67, 0.2);
      font-size: 11.5px;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 99px;
    }
    .sheet-thumb {
      width: 66px;
      height: 84px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #027443;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="bg-photo"></div>
    <div class="glow-1"></div>
    <div class="glow-2"></div>

    <div class="content-col">
      <div class="top-brand">
        <img src="${roundLogoUri}" class="brand-logo" alt="دار الخير" />
        <div class="badge-wrap">
          <div class="kicker-pill">${kicker}</div>
          <div class="brand-sub">${brandSub}</div>
        </div>
      </div>

      <div class="headline-block">
        <h1 class="main-title">
          ${titlePrefix} <span>${titleGold}</span>
        </h1>
        <p class="desc">${desc}</p>
      </div>

      <div class="features-grid">
        ${features
          .map(
            (f) => `
        <div class="feat-card">
          <div class="feat-icon">${f.icon}</div>
          <div class="feat-text">
            <span class="feat-title">${f.title}</span>
            <span class="feat-sub">${f.sub}</span>
          </div>
        </div>`
          )
          .join("")}
      </div>

      <div class="bottom-cta">
        <span class="cta-btn">${ctaText}</span>
        <span class="url-text">${urlText}</span>
      </div>
    </div>

    <div class="visual-col">
      <div class="showcase-grid">
        ${cards
          .map(
            (c) => `
        <div class="prod-card ${c.cover ? "cover-mode" : ""}">
          <img src="${c.img}" alt="${c.label}" />
          <div class="prod-label">
            <span class="lbl">${c.label}</span>
            <span class="tag">${c.tag}</span>
          </div>
        </div>`
          )
          .join("")}
      </div>

      <div class="cats-banner">
        <div class="cats-banner-right">
          <div class="cats-banner-title">${bannerTitle}</div>
          <div class="cats-pills">
            ${bannerPills.map((p) => `<span class="cat-pill">${p}</span>`).join("")}
          </div>
        </div>
        <img src="${bannerThumb}" class="sheet-thumb" alt="مجلة العروض" />
      </div>
    </div>
  </div>
</body>
</html>`;
}

const ogPages = [
  // 1. Main Site Link Preview (og-image.jpg)
  {
    file: "og-image.jpg",
    theme: "emerald",
    kicker: "هايبر ماركت وسوبر ماركت متكامل • مدينة بدر",
    brandSub: "دار الخير هايبر ماركت — مفتوح دائمًا ٢٤ ساعة • توصيل لباب البيت",
    titlePrefix: "دار الخير",
    titleGold: "هايبر ماركت بمدينة بدر",
    desc: "تسوق أسهل لكل احتياجات بيتك — أقوى عروض المجلة، الألبان، ثلاجة الجبن، الزيوت، وخزين الشهر بأسرع دليفري!",
    features: [
      { icon: "٩", title: "٩ أقسام سوبر ماركت", sub: "ألبان • جبن • زيوت • مكرونة • أرز • معلبات" },
      { icon: "هدية", title: "الجبنة جابت الفينو معاها", sub: "فاتورة ١٠٠ أو ٢٠٠ ج معاها عيش فينو هدية" },
      { icon: "سحب", title: "سحب الميكروويف للألف جنيه", sub: "عدّي الألف في فاتورتك وادخل السحب فوراً" },
      { icon: "٢٤/٧", title: "توصيل ٢٤ ساعة بمدينة بدر", sub: "طلب مباشر أو واتساب: 01270158888" },
    ],
    ctaText: "تسوق العروض والمنيو الآن ←",
    urlText: "darelkhair.chameleon.vision",
    cards: [
      { img: heroCartUri, label: "خزين البيت اليومي", tag: "توفير", cover: false },
      { img: cheeseFino200Uri, label: "عرض الجبنة والفينو", tag: "هدية", cover: true },
      { img: microwaveUri, label: "سحب الميكروويف", tag: "١٠٠٠ ج", cover: true },
      { img: deptOilsUri, label: "الزيوت والسمن", tag: "خصومات", cover: false },
    ],
    bannerTitle: "تسوق أونلاين أو عبر واتساب ٢٤ ساعة في مدينة بدر:",
    bannerPills: ["الألبان والجبن", "الزيوت والسمن", "المكرونة والأرز", "كرتونة الخير", "01270158888"],
    bannerThumb: magCoverUri,
  },

  // 2. Menu Link Preview (og-menu.jpg) — Exact sibling standard!
  {
    file: "og-menu.jpg",
    theme: "dark",
    kicker: "المنيو الإلكتروني التفاعلي + مجلة العروض الورقية",
    brandSub: "دار الخير هايبر ماركت — مدينة بدر • طازة كل يوم وتوفير حقيقي",
    titlePrefix: "منيو دار الخير",
    titleGold: "الرسمي بالأسعار",
    desc: "تصفح كل الأصناف بالأسعار والأوزان، استعرض الـ ٩ صفحات الأصلية لمجلة العروض، واطلب مباشرة ليصلك لباب البيت!",
    features: [
      { icon: "٩", title: "٩ أقسام متكاملة بالأسعار", sub: "ألبان • أجبان • زيوت • مكرونة • خزين" },
      { icon: "PDF", title: "مجلة العروض الورقية (٩ صفحات)", sub: "تصفح ورق المجلة الأصلي أو المنيو التفاعلي" },
      { icon: "⚡", title: "بحث وفلترة فورية بالأسعار", sub: "اختار الوزن أو العبوة وأضف للسلة بضغطة" },
      { icon: "📍", title: "توصيل سريع لكل مدينة بدر", sub: "خدمة ٢٤ ساعة • 01270158888" },
    ],
    ctaText: "افتح المنيو واطلب الآن ←",
    urlText: "darelkhair.chameleon.vision/menu",
    cards: [
      { img: deptDairyUri, label: "الألبان وثلاجة الجبن", tag: "طازج", cover: false },
      { img: deptOilsUri, label: "الزيوت والسمن والأرز", tag: "خصم", cover: false },
      { img: deptJamsUri, label: "المربى والحلاوة", tag: "الأكثر طلباً", cover: false },
      { img: deptPastaUri, label: "المكرونة والخزين", tag: "توفير", cover: false },
    ],
    bannerTitle: "يشمل ٩ صفحات مجلة رسمية + منيو تفاعلي بالأسعار:",
    bannerPills: ["الألبان والزبادي", "ثلاجة الجبن والفينو", "الزيوت والسمن", "المكرونة والأرز", "المربى والحلاوة"],
    bannerThumb: magCoverUri,
  },

  // 3. Offers Link Preview (og-offers.jpg)
  {
    file: "og-offers.jpg",
    theme: "emerald",
    kicker: "مجلة عروض سوبر سبتمبر • خصومات فورية",
    brandSub: "دار الخير هايبر ماركت — مدينة بدر • أقوى عروض التوفير",
    titlePrefix: "مجلة العروض",
    titleGold: "والتخفيضات الرسمية",
    desc: "تصفح الـ ٩ صفحات الرسمية لمجلة عروض دار الخير، عرض الجبنة والفينو الهدية، وسحب الميكروويف للألف جنيه!",
    features: [
      { icon: "🥖", title: "الجبنة جابت الفينو معاها", sub: "١٠٠ ج = كيس فينو • ٢٠٠ ج = كيسين فينو" },
      { icon: "🎁", title: "سحب الميكروويف الكبير", sub: "لكل فاتورة تتخطى ١٠٠٠ جنيه" },
      { icon: "٪", title: "خصومات الزيوت والألبان", sub: "الممتاز • صني • قلية • بخيره • جهينة" },
      { icon: "PDF", title: "٩ صفحات مجلة العروض", sub: "تصفح أونلاين أو حمّل نسخة PDF" },
    ],
    ctaText: "تصفح مجلة العروض الآن ←",
    urlText: "darelkhair.chameleon.vision/offers",
    cards: [
      { img: magCoverUri, label: "غلاف مجلة العروض", tag: "٩ صفحات", cover: true },
      { img: microwaveUri, label: "سحب الميكروويف", tag: "١٠٠٠ ج", cover: true },
      { img: cheeseFinoUri, label: "عرض الجبنة والفينو", tag: "هدية", cover: true },
      { img: maxtellaUri, label: "ماكس تيلا ١ كجم", tag: "١٣٥ ج.م", cover: false },
    ],
    bannerTitle: "عروض حقيقية على كل أساسيات البيت في مدينة بدر:",
    bannerPills: ["عرض الفينو الهدية", "سحب الميكروويف", "خصومات الزيوت", "عروض المربى والحلاوة"],
    bannerThumb: magPage8Uri,
  },

  // 4. Occasions / Boxes Link Preview (og-occasions.jpg)
  {
    file: "og-occasions.jpg",
    theme: "dark",
    kicker: "بوكسات خزين الشهر • كرتونة الخير • طلبات الجملة",
    brandSub: "دار الخير هايبر ماركت — مدينة بدر • تجهيز وتوصيل ٢٤ ساعة",
    titlePrefix: "كرتونة الخير",
    titleGold: "وبوكسات التوفير الشهرية",
    desc: "اطلب بوكس خزين الشهر المتكامل (واحجز فرصتك في سحب الميكروويف)، كراتين الخير والصدقات، وتوريدات الجملة!",
    features: [
      { icon: "٠١", title: "بوكس خزين البيت الشهري", sub: "شامل الأرز والزيت والسكر والمكرونة والألبان" },
      { icon: "٠٢", title: "كرتونة الخير والإطعام", sub: "تجهيز كراتين وشنط الخير بأسعار الجملة" },
      { icon: "٠٣", title: "باكدج الجبن العائلي + فينو", sub: "تشكيلة جبن طازجة + ٢ كيس فينو هدية" },
      { icon: "٠٤", title: "توريدات المطاعم والشركات", sub: "توريد دوري بمدينة بدر وتوصيل ٢٤ ساعة" },
    ],
    ctaText: "اطلب البوكسات وكرتونة الخير ←",
    urlText: "darelkhair.chameleon.vision/occasions",
    cards: [
      { img: heroCartUri, label: "بوكس خزين الشهر", tag: "ميكروويف", cover: false },
      { img: deptRiceUri, label: "كرتونة الخير", tag: "جملة", cover: false },
      { img: cheeseFino200Uri, label: "باكدج الجبن والفينو", tag: "٢٠٠ ج.م", cover: true },
      { img: deptOilsUri, label: "توريدات الجملة", tag: "٢٤ ساعة", cover: false },
    ],
    bannerTitle: "بوكسات توفير جاهزة أو تفصيل حسب طلبك:",
    bannerPills: ["خزين الشهر", "كرتونة الخير", "باكدج المدارس", "توريدات الجملة"],
    bannerThumb: magPage2Uri,
  },

  // 5. Branches / Delivery Link Preview (og-branches.jpg)
  {
    file: "og-branches.jpg",
    theme: "emerald",
    kicker: "مفتوح ٢٤ ساعة • توصيل سريع لجميع أحياء مدينة بدر",
    brandSub: "دار الخير هايبر ماركت — مدينة بدر • 01270158888 / 01210004039",
    titlePrefix: "التوصيل بمدينة بدر",
    titleGold: "على مدار ٢٤ ساعة",
    desc: "نصلك أينما كنت داخل جميع أحياء ومجاورات مدينة بدر ودار مصر وسكن مصر والحي المتميز بأسرع خدمة دليفري!",
    features: [
      { icon: "٢٤", title: "مفتوح دائمًا ٢٤ ساعة", sub: "خدمة متواصلة طوال أيام الأسبوع" },
      { icon: "🛵", title: "تغطية شاملة لمدينة بدر", sub: "الأحياء ١ إلى ٧ • دار مصر • سكن مصر" },
      { icon: "❄️", title: "حفظ مثالي للألبان والجبن", sub: "توصيل مبرد وسريع لباب شقتك" },
      { icon: "📞", title: "خطوط طلبات مباشرة", sub: "01270158888 • 01210004039" },
    ],
    ctaText: "تعرف على نطاق التوصيل وأرقامنا ←",
    urlText: "darelkhair.chameleon.vision/branches",
    cards: [
      { img: heroCartUri, label: "توصيل لباب البيت", tag: "٢٤ ساعة", cover: false },
      { img: deptDairyUri, label: "الألبان والمبردات", tag: "طازج", cover: false },
      { img: deptRiceUri, label: "طلبات خزين البيت", tag: "لباب الشقة", cover: false },
      { img: deptTeaUri, label: "طلبات واتساب", tag: "سريع", cover: false },
    ],
    bannerTitle: "تغطية فورية لكل أحياء ومجاورات مدينة بدر:",
    bannerPills: ["الحي الأول للخامس", "الحي المتميز", "دار مصر وسكن مصر", "زهرة العاصمة"],
    bannerThumb: magCoverUri,
  },

  // 6. About Link Preview (og-about.jpg)
  {
    file: "og-about.jpg",
    theme: "dark",
    kicker: "عن دار الخير هايبر ماركت • مدينة بدر",
    brandSub: "وجهتك العائلية الأولى للجودة والتوفير الحقيقي على مدار الساعة",
    titlePrefix: "عن دار الخير",
    titleGold: "هايبر ماركت بمدينة بدر",
    desc: "جمعنالك كل احتياجات بيتك تحت سقف واحد من أشهر الماركات الموثوقة بأسعار المجلة المخفضة وتوصيل ٢٤ ساعة!",
    features: [
      { icon: "🏠", title: "هايبر ماركت عائلي متكامل", sub: "كل احتياجات البيت اليومية والشهرية" },
      { icon: "⭐", title: "+١١ ألف متابع بمدينة بدر", sub: "ثقة أهالي مدينة بدر في الجودة والسعر" },
      { icon: "🎁", title: "عروض وهدايا مستمرة", sub: "فينو هدية على الجبن وسحب ميكروويف" },
      { icon: "🕒", title: "خدمة لا تتوقف ٢٤ ساعة", sub: "في الفرع وعبر التوصيل المنزلي" },
    ],
    ctaText: "تعرف على دار الخير هايبر ماركت ←",
    urlText: "darelkhair.chameleon.vision/about",
    cards: [
      { img: heroCartUri, label: "تشكيلة كاملة", tag: "٩ أقسام", cover: false },
      { img: cheeseFinoUri, label: "عروض الجبن والفينو", tag: "هدية", cover: true },
      { img: deptJamsUri, label: "أشهر الماركات", tag: "جودة", cover: false },
      { img: microwaveUri, label: "سحوبات المجلة", tag: "ميكروويف", cover: true },
    ],
    bannerTitle: "دار الخير — تسوق أسهل لكل احتياجات بيتك:",
    bannerPills: ["ثقة وجودة", "أسعار توفير", "خدمة ٢٤ ساعة", "مدينة بدر"],
    bannerThumb: magCoverUri,
  },

  // 7. Contact Link Preview (og-contact.jpg)
  {
    file: "og-contact.jpg",
    theme: "emerald",
    kicker: "خدمة العملاء والطلبات • واتساب وتليفون ٢٤ ساعة",
    brandSub: "دار الخير هايبر ماركت — مدينة بدر • 01270158888 / 01210004039",
    titlePrefix: "تواصل واطلب الآن",
    titleGold: "من دار الخير بمدينة بدر",
    desc: "فريق خدمة العملاء جاهز لتلقي طلباتك على مدار ٢٤ ساعة عبر الهاتف أو الواتساب المباشر وتوصيلها لباب البيت!",
    features: [
      { icon: "💬", title: "واتساب الطلبات السريع", sub: "wa.me/201270158888 — رد فوري ٢٤ ساعة" },
      { icon: "📞", title: "أرقام التوصيل المباشر", sub: "01270158888 • 01210004039" },
      { icon: "📱", title: "صفحاتنا الرسمية", sub: "فيسبوك (+١١ ألف متابع) • إنستجرام • تيك توك" },
      { icon: "🛒", title: "طلب مباشر من الموقع", sub: "اختر منتجاتك وأرسل الطلب بضغطة واحدة" },
    ],
    ctaText: "تواصل معنا أو اطلب أونلاين ←",
    urlText: "darelkhair.chameleon.vision/contact",
    cards: [
      { img: heroCartUri, label: "طلب أونلاين", tag: "سلة ذكية", cover: false },
      { img: deptDairyUri, label: "توصيل ٢٤ ساعة", tag: "مدينة بدر", cover: false },
      { img: cheeseFino200Uri, label: "عروض المجلة", tag: "وفر أكثر", cover: true },
      { img: deptTeaUri, label: "خدمة العملاء", tag: "٢٤ ساعة", cover: false },
    ],
    bannerTitle: "قنوات التواصل والطلب الرسمية لدار الخير:",
    bannerPills: ["01270158888", "01210004039", "WhatsApp", "Facebook", "Instagram"],
    bannerThumb: magCoverUri,
  },
];

for (const page of ogPages) {
  const html = buildOgHtml(page);
  const tmpHtml = path.join(rootDir, `scripts/.tmp-${page.file}.html`);
  const tmpPng = path.join(rootDir, `scripts/.tmp-${page.file}.png`);
  const outJpg = path.join(pubDir, page.file);

  fs.writeFileSync(tmpHtml, html, "utf8");
  const fileUrl = "file:///" + tmpHtml.replace(/\\/g, "/");

  execFileSync(browser, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1200,630",
    `--screenshot=${tmpPng}`,
    fileUrl,
  ]);

  await sharp(tmpPng)
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outJpg);

  fs.unlinkSync(tmpHtml);
  fs.unlinkSync(tmpPng);

  const stat = fs.statSync(outJpg);
  console.log(`   ✓ Generated ${page.file} (${Math.round(stat.size / 1024)} KB)`);
}

console.log("All icons and OpenGraph preview images generated successfully!");
