import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = "E:/Projects/Chameleon-DarElKhair";
const publicDir = path.join(rootDir, "public");
const productsDir = path.join(publicDir, "images/products");
const deptsDir = path.join(publicDir, "images/departments");
const magDir = path.join(publicDir, "images/magazine");
const extractedDir = "C:/Users/antigravityadmin/.gemini/antigravity/brain/8113b8bf-8717-48d0-9976-25fa84bc0940/scratch/pdf_extracted";
const scratchDir = "C:/Users/antigravityadmin/.gemini/antigravity/brain/8113b8bf-8717-48d0-9976-25fa84bc0940/scratch";
const uploadedDir = "C:/Users/antigravityadmin/.gemini/antigravity/brain/8113b8bf-8717-48d0-9976-25fa84bc0940/.user_uploaded";

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(deptsDir, { recursive: true });
fs.mkdirSync(magDir, { recursive: true });

// 1. Copy Magazine PDF and 9 pages
fs.copyFileSync(path.join(scratchDir, "darelkhair-magazine.pdf"), path.join(magDir, "darelkhair-magazine.pdf"));
for (let i = 1; i <= 9; i++) {
  await sharp(path.join(scratchDir, `page-${i}.jpg`))
    .webp({ quality: 90 })
    .toFile(path.join(magDir, `page-${i}.webp`));
}
console.log("Copied magazine PDF and 9 pages.");

// 2. Process Logos (Cream on Transparent + High-Contrast Green on Transparent)
async function createGreenCalligraphyLogo(inputPath, outPng, outWebp) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i], g = out[i + 1], b = out[i + 2], a = out[i + 3];
    if (a < 25) continue;
    // Detect warm cream calligraphy pixels (high R, high G, high B > 175)
    // Preserve golden amber (b < 110) and green leaves (r < 170, g > 140, b < 100)
    if (r > 185 && g > 180 && b > 145) {
      // Map cleanly to Dar El Khair Forest Emerald (#027443 -> R:2, G:116, B:67)
      out[i] = 2;
      out[i + 1] = 116;
      out[i + 2] = 67;
    } else if (r > 150 && g > 145 && b > 120 && Math.abs(r - g) < 25 && b > 130) {
      // Anti-aliased grey/tan outline around the cream text -> also map to #027443
      out[i] = 2;
      out[i + 1] = 116;
      out[i + 2] = 67;
    }
  }
  const trimmed = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim();
  await trimmed.clone().png().toFile(outPng);
  await trimmed.clone().webp({ quality: 95 }).toFile(outWebp);
}

async function createCreamCalligraphyLogo(inputPath, outPng, outWebp) {
  const trimmed = sharp(inputPath).ensureAlpha().trim();
  await trimmed.clone().png().toFile(outPng);
  await trimmed.clone().webp({ quality: 95 }).toFile(outWebp);
}

const uploadedEmblemTrans = path.join(uploadedDir, "media_1793973068650_f0e6f2e7.png");
const uploadedHorizTrans = path.join(uploadedDir, "media_1793973069431_29c04944.png");
const uploadedSquareGreen = path.join(uploadedDir, "media_1793973068929_e3e8a91b.jpg");
const uploadedBannerGreen = path.join(uploadedDir, "media_1793973068739_be4f7e35.jpg");

await createCreamCalligraphyLogo(
  uploadedEmblemTrans,
  path.join(publicDir, "logo-emblem-cream.png"),
  path.join(publicDir, "logo-emblem-cream.webp")
);
await createCreamCalligraphyLogo(
  uploadedHorizTrans,
  path.join(publicDir, "logo-horizontal-cream.png"),
  path.join(publicDir, "logo-horizontal-cream.webp")
);
await createGreenCalligraphyLogo(
  uploadedEmblemTrans,
  path.join(publicDir, "logo-emblem.png"),
  path.join(publicDir, "logo-emblem.webp")
);
await createGreenCalligraphyLogo(
  uploadedHorizTrans,
  path.join(publicDir, "logo-horizontal.png"),
  path.join(publicDir, "logo-horizontal.webp")
);

// Official green square logo & cover banner
await sharp(uploadedSquareGreen).resize(512, 512).png().toFile(path.join(publicDir, "logo.png"));
await sharp(uploadedBannerGreen).webp({ quality: 92 }).toFile(path.join(publicDir, "images/official-banner.webp"));

// App icons & favicons (Circular & Rounded Square from Official Square Green Emblem)
await sharp(uploadedSquareGreen).resize(512, 512).png().toFile(path.join(publicDir, "icon-512.png"));
await sharp(uploadedSquareGreen).resize(192, 192).png().toFile(path.join(publicDir, "icon-192.png"));
await sharp(uploadedSquareGreen).resize(180, 180).png().toFile(path.join(rootDir, "src/app/apple-icon.png"));
await sharp(uploadedSquareGreen).resize(192, 192).png().toFile(path.join(rootDir, "src/app/icon.png"));
console.log("Generated all logos and favicons.");

// 3. Helper to standardize transparent product images onto a clean 600x600 canvas
async function saveProductImage(srcFile, destName, canvasSize = 600, pad = 44) {
  const srcPath = path.join(extractedDir, srcFile);
  const trimmedBuf = await sharp(srcPath).trim().toBuffer();
  await sharp(trimmedBuf)
    .resize(canvasSize - pad * 2, canvasSize - pad * 2, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 94 })
    .toFile(path.join(productsDir, destName));
}

const productMappings = [
  // Dairy
  ["img_006_250x250.webp", "bekheiro-milk-1l.webp"],
  ["img_010_242x242.webp", "juhayna-milk-1l.webp"],
  ["img_004_72x242.webp", "lamar-milk-1l.webp"],
  ["img_008_219x219.webp", "bekheiro-milk-500ml.webp"],
  // Jams & Spreads & Halawa
  ["img_033_197x197.webp", "bawadi-jam-strawberry-365g.webp"],
  ["img_031_190x189.webp", "bawadi-jam-fig-365g.webp"],
  ["img_035_203x203.webp", "bawadi-jam-apricot-365g.webp"],
  ["img_039_216x216.webp", "bawadi-jam-strawberry-680g.webp"],
  ["img_037_206x206.webp", "bawadi-jam-fig-680g.webp"],
  ["img_041_231x231.webp", "bawadi-jam-apricot-680g.webp"],
  ["img_025_196x196.webp", "vitrac-jam-strawberry-230g.webp"],
  ["img_043_103x190.webp", "vitrac-jam-fig-230g.webp"],
  ["img_027_225x218.webp", "maxtella-spread-1kg.webp"],
  ["img_023_151x151.webp", "bawadi-halawa-spread-plain-160g.webp"],
  ["img_029_151x157.webp", "bawadi-halawa-spread-choco-160g.webp"],
  ["img_021_204x204.webp", "bawadi-halawa-spread-plain-300g.webp"],
  ["img_059_225x225.webp", "bawadi-halawa-1.5kg.webp"],
  ["img_059_225x225.webp", "bawadi-halawa-1kg.webp"],
  ["img_057_252x252.webp", "bawadi-halawa-500g.webp"],
  // Cooking Oils
  ["img_055_235x235.webp", "momtaz-oil-2.5l.webp"],
  ["img_053_261x261.webp", "sunny-oil-1.75l.webp"],
  ["img_049_109x215.webp", "qalya-oil-2.1l.webp"],
  ["img_051_127x219.webp", "qalya-oil-4.5l.webp"],
  // Pasta
  ["img_078_299x679.webp", "cairo-pasta-300g.webp"],
  ["img_076_440x322.webp", "basata-pasta-350g.webp"],
  ["img_074_239x179.webp", "matbakh-pasta-400g.webp"],
  ["img_072_334x291.webp", "lametna-pasta-400g.webp"],
  // Tea & Sugar
  ["img_084_232x231.webp", "arosa-tea-100g.webp"],
  ["img_082_205x205.webp", "arosa-tea-250g.webp"],
  ["img_080_367x235.webp", "white-sugar-1kg.webp"],
  // Rice & Flour
  ["img_102_204x272.webp", "haboba-flour-1kg.webp"],
  ["img_104_225x225.webp", "alsaa-rice-1kg.webp"],
  ["img_106_254x269.webp", "haboba-rice-1kg.webp"],
  // Canned Goods
  ["img_092_182x375.webp", "searemo-mushroom-800g.webp"],
  ["img_090_165x375.webp", "searemo-mushroom-400g.webp"],
  ["img_096_168x168.webp", "americana-tuna-140g.webp"],
  // Tomato Sauce
  ["img_120_161x161.webp", "alain-tomato-190g.webp"],
  ["img_122_197x182.webp", "alain-tomato-280g.webp"],
  ["img_124_222x189.webp", "alain-tomato-360g.webp"],
  ["img_114_141x171.webp", "harvest-tomato-320g.webp"],
  ["img_116_172x207.webp", "harvest-tomato-800g.webp"],
  ["img_118_209x209.webp", "harvest-tomato-3kg.webp"],
  ["img_112_161x161.webp", "finefoods-tomato-360g.webp"],
  // Promos
  ["img_015_469x469.webp", "promo-microwave.webp"],
];

for (const [src, dest] of productMappings) {
  await saveProductImage(src, dest);
}
console.log("Processed", productMappings.length, "product images.");

// 4. Department Illustrations & Hero Visuals
const deptMappings = [
  ["img_012_575x324.webp", "dept-dairy.webp"],
  ["img_161_546x308.webp", "dept-jams.webp"],
  ["img_175_565x318.webp", "dept-oils.webp"],
  ["img_176_575x324.webp", "dept-pasta.webp"],
  ["img_080_367x235.webp", "dept-tea-sugar.webp"],
  ["img_098_503x283.webp", "dept-rice-flour.webp"],
  ["img_100_461x260.webp", "dept-canned.webp"],
  ["img_126_506x285.webp", "dept-tomato.webp"],
];

for (const [src, dest] of deptMappings) {
  const trimmedBuf = await sharp(path.join(extractedDir, src)).trim().toBuffer();
  await sharp(trimmedBuf)
    .resize(720, 440, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 94 })
    .toFile(path.join(deptsDir, dest));
}

// Hero Cart (from img_215_1055x1491.webp - trim transparent top space so cart is centered and sharp)
const heroCartTrimmed = await sharp(path.join(extractedDir, "img_215_1055x1491.webp")).trim().toBuffer();
await sharp(heroCartTrimmed)
  .webp({ quality: 95 })
  .toFile(path.join(publicDir, "images/hero-cart.webp"));

// Cheese & Fino Bakery Visual (from img_131_1055x1491.webp - crop the middle photo stage y=280..910)
await sharp(path.join(extractedDir, "img_131_1055x1491.webp"))
  .extract({ left: 0, top: 280, width: 1055, height: 635 })
  .webp({ quality: 92 })
  .toFile(path.join(publicDir, "images/cheese-fino-stage.webp"));

// Hypermarket aisle backdrop
await sharp(path.join(extractedDir, "img_195_853x1844.webp"))
  .webp({ quality: 90 })
  .toFile(path.join(publicDir, "images/hypermarket-backdrop.webp"));

console.log("Saved Hero Cart, Cheese/Fino Stage, and Department Illustrations.");

// 5. Generate 7 Custom 1200x630 OpenGraph Social Preview Cards
const logoCreamBuf = await sharp(path.join(publicDir, "logo-horizontal-cream.png"))
  .resize(340, 130, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

const ogConfigs = [
  {
    file: "og-image.jpg",
    tag: "DAR EL KHAIR HYPER MARKET • BADR CITY",
    titleAr: "دار الخير هايبر ماركت",
    subAr: "تسوق أسهل لكل احتياجات بيتك في مدينة بدر • توصيل 24 ساعة",
    visual: path.join(publicDir, "images/hero-cart.webp"),
  },
  {
    file: "og-menu.jpg",
    tag: "FULL HYPERMARKET CATALOG • 8 DEPARTMENTS",
    titleAr: "كتالوج ومنتجات دار الخير",
    subAr: "ألبان • زيوت • مكرونة • أرز ودقيق • مربى وحلاوة • معلبات وصلصة",
    visual: path.join(deptsDir, "dept-dairy.webp"),
  },
  {
    file: "og-offers.jpg",
    tag: "SUPER MAGAZINE DEALS • DIRECT DISCOUNTS",
    titleAr: "مجلة العروض والتخفيضات",
    subAr: "أقوى عروض التوفير اليومية وعرض الجبنة جابت الفينو معاها",
    visual: path.join(deptsDir, "dept-oils.webp"),
  },
  {
    file: "og-occasions.jpg",
    tag: "FAMILY BUNDLES • MONTHLY PANTRY BOXES",
    titleAr: "كرتونة الخير وبوكسات التوفير",
    subAr: "بوكسات خزين الشهر الموفرة وعروض السحب على الميكروويف",
    visual: path.join(productsDir, "promo-microwave.webp"),
  },
  {
    file: "og-branches.jpg",
    tag: "BADR CITY DELIVERY COVERAGE • 24/7",
    titleAr: "خدمة التوصيل في مدينة بدر",
    subAr: "توصيل سريع لجميع الأحياء والمجاورات • 01270158888 / 01210004039",
    visual: path.join(deptsDir, "dept-rice-flour.webp"),
  },
  {
    file: "og-about.jpg",
    tag: "ABOUT DAR EL KHAIR • FAMILY HYPERMARKET",
    titleAr: "عن دار الخير هايبر ماركت",
    subAr: "وجهتك العائلية الأولى في مدينة بدر للجودة والتوفير على مدار الساعة",
    visual: path.join(deptsDir, "dept-jams.webp"),
  },
  {
    file: "og-contact.jpg",
    tag: "WHATSAPP CONCIERGE • DIRECT ORDERING",
    titleAr: "تواصل واطلب الآن عبر واتساب",
    subAr: "خدمة عملاء جاهزة 24 ساعة: 01270158888 • 01210004039",
    visual: path.join(deptsDir, "dept-tea-sugar.webp"),
  },
];

for (const cfg of ogConfigs) {
  const visualBuf = await sharp(cfg.visual)
    .resize(420, 440, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#027443"/>
          <stop offset="55%" stop-color="#015C35"/>
          <stop offset="100%" stop-color="#111613"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <!-- Architectural ONDERA Frame -->
      <rect x="28" y="28" width="1144" height="574" rx="32" fill="none" stroke="#FCFAEB" stroke-opacity="0.18" stroke-width="2"/>
      <!-- Left Soft Stage for Visual -->
      <rect x="56" y="64" width="440" height="502" rx="28" fill="#FCFAEB" fill-opacity="0.08" stroke="#FCFAEB" stroke-opacity="0.15"/>
      <!-- Giant Subtle ONDERA Wordmark at Bottom -->
      <text x="1140" y="580" fill="#FCFAEB" fill-opacity="0.05" font-family="sans-serif" font-size="110" font-weight="900" text-anchor="end">DAR EL KHAIR</text>
      <!-- Top Tag Pill -->
      <rect x="540" y="215" width="590" height="38" rx="19" fill="#FAA006"/>
      <text x="835" y="240" fill="#111613" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="1.5">${cfg.tag}</text>
      <!-- Main Title -->
      <text x="1130" y="335" fill="#FCFAEB" font-family="Cairo, Arial, sans-serif" font-size="56" font-weight="900" text-anchor="end">${cfg.titleAr}</text>
      <!-- Subtitle -->
      <text x="1130" y="395" fill="#FCEDC4" fill-opacity="0.9" font-family="Cairo, Arial, sans-serif" font-size="25" font-weight="700" text-anchor="end">${cfg.subAr}</text>
      <!-- Phone & Domain Footer Pill -->
      <rect x="590" y="455" width="540" height="54" rx="27" fill="#111613" stroke="#FAA006" stroke-width="2"/>
      <text x="860" y="489" fill="#FAA006" font-family="sans-serif" font-size="19" font-weight="900" text-anchor="middle" letter-spacing="0.5">01270158888 • darelkhair.chameleon.vision</text>
    </svg>
  `);

  await sharp(svgOverlay)
    .composite([
      { input: logoCreamBuf, left: 785, top: 64 },
      { input: visualBuf, left: 66, top: 95 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(publicDir, cfg.file));
}
console.log("Generated all 7 custom 1200x630 OpenGraph images.");
