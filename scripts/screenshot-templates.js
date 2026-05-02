#!/usr/bin/env node
/**
 * Generate WebP thumbnail screenshots for all visible templates.
 *
 * Usage:
 *   1. npm install puppeteer --save-dev
 *   2. Start the dev server: npm run dev  (or set BASE_URL to production URL)
 *   3. node scripts/screenshot-templates.js
 *
 * Outputs: public/thumbnails/[id].webp  (1280×800, WebP quality 85)
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "..", "public", "thumbnails");
const CONCURRENCY = 4; // parallel tabs
const VIEWPORT = { width: 1280, height: 800 };
const QUALITY = 85;
const TIMEOUT = 20_000;

// ── All visible templates (site builder + quality impact) ─────────────────────
const SITE_BUILDER = [
  "landing", "saas", "agency", "vitrine", "consultant", "portfolio",
  "ecommerce", "restaurant", "hotel", "healthcare", "realestate",
  "fitness", "event", "nonprofit", "startup",
  "luxury", "brutalist", "magazine", "aurora", "3d-tech", "minimal-pro",
  "marketplace", "livestream",
];

// Impact templates currently visible (550+ lines original + full 157-176 batch)
const IMPACT_VISIBLE = [
  "impact-01", "impact-03",
  "impact-60", "impact-61", "impact-64", "impact-65", "impact-66",
  "impact-68", "impact-69", "impact-80", "impact-81", "impact-82",
  "impact-83", "impact-85", "impact-116", "impact-134",
  // Recently elevated (agents + Antigravity)
  "impact-02", "impact-94", "impact-132",
  // Recent rewrite batch
  "impact-157", "impact-158", "impact-159", "impact-160", "impact-161",
  "impact-162", "impact-163", "impact-164", "impact-165", "impact-166",
  "impact-167", "impact-168", "impact-169", "impact-170", "impact-171",
  "impact-172", "impact-173", "impact-174", "impact-175", "impact-176",
];

const ALL_TEMPLATES = [
  ...SITE_BUILDER.map((id) => ({ id, href: `/themes/${id}` })),
  ...IMPACT_VISIBLE.map((id) => ({ id, href: `/templates/${id}` })),
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function screenshotTemplate(browser, template) {
  const outPath = path.join(OUT_DIR, `${template.id}.webp`);

  // Skip if already exists (re-run is additive; use --force to regenerate all)
  if (!process.argv.includes("--force") && fs.existsSync(outPath)) {
    console.log(`  skip  ${template.id} (exists)`);
    return;
  }

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  try {
    await page.goto(`${BASE_URL}${template.href}`, {
      waitUntil: "domcontentloaded",
      timeout: TIMEOUT,
    });

    // Wait for images + animations to settle
    await sleep(1800);

    // Hide scrollbar + fixed elements that bleed (chat widgets etc.)
    await page.evaluate(() => {
      document.documentElement.style.overflow = "hidden";
      document.querySelectorAll("[data-radix-portal], [data-floating-ui-portal]")
        .forEach((el) => el.remove());
    });

    await page.screenshot({
      path: outPath,
      type: "webp",
      quality: QUALITY,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });

    console.log(`  ✅  ${template.id}`);
  } catch (err) {
    console.error(`  ❌  ${template.id}: ${err.message}`);
  } finally {
    await page.close();
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`\n🚀 Screenshotting ${ALL_TEMPLATES.length} templates → ${OUT_DIR}\n`);
  console.log(`   Base URL : ${BASE_URL}`);
  console.log(`   Concurrency : ${CONCURRENCY}`);
  console.log(`   Use --force to regenerate existing thumbnails\n`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  // Process in parallel batches
  for (let i = 0; i < ALL_TEMPLATES.length; i += CONCURRENCY) {
    const batch = ALL_TEMPLATES.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((t) => screenshotTemplate(browser, t)));
    process.stdout.write(`  [${Math.min(i + CONCURRENCY, ALL_TEMPLATES.length)}/${ALL_TEMPLATES.length}]\n`);
  }

  await browser.close();
  console.log("\n✅ Done! Thumbnails saved to public/thumbnails/");
  console.log("   Next: git add public/thumbnails && git commit -m 'feat: add template thumbnails'\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
