#!/usr/bin/env tsx
/**
 * Product Catalog Validation Script
 *
 * Checks every product in the database for data consistency issues:
 *   • Image count (warns if <4, error if 0)
 *   • Duplicate images within the same product
 *   • Cross-product primary image conflicts within the same category
 *   • imageUrl must equal images[0]
 *   • Description mentions the product name keywords and brand
 *   • Description contains a KEY FEATURES or specifications section
 *   • Price is positive and within expected range per category
 *   • Stock is non-negative
 *
 * Run with: pnpm --filter @workspace/db run validate
 */
import { db, productsTable } from "./index.js";

// ── ANSI colour helpers ────────────────────────────────────────────────────────
const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  red:    "\x1b[31m",
  yellow: "\x1b[33m",
  green:  "\x1b[32m",
  cyan:   "\x1b[36m",
  dim:    "\x1b[2m",
};
const red    = (s: string) => `${c.red}${c.bold}${s}${c.reset}`;
const yellow = (s: string) => `${c.yellow}${s}${c.reset}`;
const green  = (s: string) => `${c.green}${s}${c.reset}`;
const cyan   = (s: string) => `${c.cyan}${s}${c.reset}`;
const dim    = (s: string) => `${c.dim}${s}${c.reset}`;
const bold   = (s: string) => `${c.bold}${s}${c.reset}`;

// ── Brand extraction ───────────────────────────────────────────────────────────
const KNOWN_BRANDS = [
  "LG", "Samsung", "Hisense", "Haier", "Thermocool", "Firman", "Sumec", "Scanfrost",
  "HP", "Lenovo", "Logitech", "Apple", "Tecno", "Infinix", "Anker", "Soundcore",
  "Nike", "Polo Ralph Lauren", "Ralph Lauren",
  "Dangote", "Milo", "Nestlé", "Nestle", "Indomie", "Dufil",
  "Binatone", "Fisher-Price", "Pampers", "Philips", "Neutrogena",
  "ORS", "Decathlon", "Domyos", "Baby Trend", "Morning Glory",
];

function extractBrand(name: string): string {
  const lower = name.toLowerCase();
  // Longest match wins (avoids "Ralph" matching before "Polo Ralph Lauren")
  const sorted = [...KNOWN_BRANDS].sort((a, b) => b.length - a.length);
  for (const brand of sorted) {
    if (lower.includes(brand.toLowerCase())) return brand;
  }
  return "";
}

// ── Category price ranges (in kobo) ───────────────────────────────────────────
const PRICE_RANGES: Record<string, [number, number]> = {
  "Home & Office":    [500_000,     100_000_000],
  "Electronics":      [500_000,     200_000_000],
  "Phones & Tablets": [500_000,     300_000_000],
  "Computing":        [1_000_000,   300_000_000],
  "Fashion":          [50_000,      30_000_000],
  "Supermarket":      [50_000,      5_000_000],
  "Kitchen & Dining": [100_000,     50_000_000],
  "Health & Beauty":  [50_000,      10_000_000],
  "Sporting Goods":   [200_000,     50_000_000],
  "Baby Products":    [100_000,     50_000_000],
};

// ── Issue type ─────────────────────────────────────────────────────────────────
interface Issue {
  level: "error" | "warn" | "info";
  message: string;
}

function issueSymbol(level: Issue["level"]) {
  if (level === "error") return red("✖ ERROR");
  if (level === "warn")  return yellow("⚠ WARN");
  return cyan("ℹ INFO");
}

// ── Main validation ────────────────────────────────────────────────────────────
async function validateCatalog() {
  console.log(`\n${bold("══════════════════════════════════════════════════════")}`);
  console.log(`${bold("  BigDeals Nigeria — Product Catalog Validation")}`);
  console.log(`${bold("══════════════════════════════════════════════════════")}\n`);

  const products = await db.select().from(productsTable).orderBy(productsTable.id);
  console.log(dim(`Loaded ${products.length} products from database.\n`));

  // Cross-product state
  const primaryImagesByCategory = new Map<string, Map<string, string>>(); // category → url → productName

  let totalErrors = 0;
  let totalWarns  = 0;
  let totalPasses = 0;

  for (const product of products) {
    const issues: Issue[] = [];
    const brand = extractBrand(product.name);

    // ── 1. Images ────────────────────────────────────────────────────────────
    const images = product.images ?? [];

    if (images.length === 0) {
      issues.push({ level: "error", message: "Product has NO images." });
    } else if (images.length < 4) {
      issues.push({
        level: "warn",
        message: `Only ${images.length} image(s) — target is 4–6 genuine product images from different angles.`,
      });
    }

    // imageUrl must equal images[0]
    if (images.length > 0 && product.imageUrl !== images[0]) {
      issues.push({
        level: "error",
        message: `imageUrl does not match images[0].\n    imageUrl:  ${product.imageUrl}\n    images[0]: ${images[0]}`,
      });
    }

    // No duplicate images within the same product
    const seenUrls = new Set<string>();
    const dupes: string[] = [];
    for (const url of images) {
      if (seenUrls.has(url)) dupes.push(url);
      seenUrls.add(url);
    }
    if (dupes.length > 0) {
      issues.push({
        level: "error",
        message: `Duplicate image URLs within this product:\n    ${dupes.join("\n    ")}`,
      });
    }

    // Primary image cross-contamination within category
    if (images.length > 0) {
      const primaryUrl = images[0];
      if (!primaryImagesByCategory.has(product.category)) {
        primaryImagesByCategory.set(product.category, new Map());
      }
      const catMap = primaryImagesByCategory.get(product.category)!;
      if (catMap.has(primaryUrl)) {
        issues.push({
          level: "error",
          message: `Primary image is shared with "${catMap.get(primaryUrl)}" in the same category "${product.category}". Each product must have a unique primary image.`,
        });
      } else {
        catMap.set(primaryUrl, product.name);
      }
    }

    // ── 2. Brand consistency ─────────────────────────────────────────────────
    if (!brand) {
      issues.push({ level: "warn", message: "Could not extract a known brand from product name." });
    } else {
      const descLower = product.description.toLowerCase();
      if (!descLower.includes(brand.toLowerCase())) {
        issues.push({
          level: "warn",
          message: `Brand "${brand}" from the name does not appear in the description.`,
        });
      }
    }

    // ── 3. Description quality ───────────────────────────────────────────────
    if (!product.description || product.description.trim().length < 50) {
      issues.push({ level: "error", message: "Description is empty or too short (<50 chars)." });
    }

    const hasFeatures = /key features|specifications|spec:/i.test(product.description);
    if (!hasFeatures) {
      issues.push({
        level: "warn",
        message: `Description is missing a KEY FEATURES or SPECIFICATIONS section.`,
      });
    }

    // Name keywords appear in description
    const nameWords = product.name
      .split(/[\s—\-"']+/)
      .filter(w => w.length > 3 && !/^\d/.test(w)) // skip numbers/short words
      .slice(0, 3);
    const missingKeywords = nameWords.filter(w => !product.description.toLowerCase().includes(w.toLowerCase()));
    if (missingKeywords.length > 1) {
      issues.push({
        level: "warn",
        message: `Description may not match product name — missing keywords: ${missingKeywords.join(", ")}`,
      });
    }

    // ── 4. Pricing ───────────────────────────────────────────────────────────
    if (product.priceKobo <= 0) {
      issues.push({ level: "error", message: "Price is zero or negative." });
    }

    const range = PRICE_RANGES[product.category];
    if (range) {
      const [min, max] = range;
      if (product.priceKobo < min) {
        issues.push({
          level: "warn",
          message: `Price ₦${(product.priceKobo / 100).toLocaleString()} is below the expected minimum for "${product.category}" (₦${(min / 100).toLocaleString()}).`,
        });
      }
      if (product.priceKobo > max) {
        issues.push({
          level: "warn",
          message: `Price ₦${(product.priceKobo / 100).toLocaleString()} exceeds the expected maximum for "${product.category}" (₦${(max / 100).toLocaleString()}).`,
        });
      }
    }

    // ── 5. Stock ─────────────────────────────────────────────────────────────
    if (product.stock < 0) {
      issues.push({ level: "error", message: "Stock is negative." });
    }
    if (product.stock === 0) {
      issues.push({ level: "warn", message: "Stock is 0 — product will be out-of-stock for buyers." });
    }

    // ── 6. Category ──────────────────────────────────────────────────────────
    const knownCategories = Object.keys(PRICE_RANGES);
    if (!knownCategories.includes(product.category)) {
      issues.push({
        level: "warn",
        message: `Unknown category "${product.category}" — valid categories: ${knownCategories.join(", ")}`,
      });
    }

    // ── Output per product ───────────────────────────────────────────────────
    const errors = issues.filter(i => i.level === "error").length;
    const warns  = issues.filter(i => i.level === "warn").length;
    totalErrors += errors;
    totalWarns  += warns;
    if (issues.length === 0) totalPasses++;

    const statusIcon = errors > 0 ? red("✖") : warns > 0 ? yellow("⚠") : green("✔");
    const priceStr = `₦${(product.priceKobo / 100).toLocaleString()}`;
    console.log(`${statusIcon} ${bold(`[${product.id}]`)} ${product.name}`);
    console.log(dim(`     Category: ${product.category} | Price: ${priceStr} | Images: ${images.length} | Stock: ${product.stock} | Brand: ${brand || "unknown"}`));

    for (const issue of issues) {
      const lines = issue.message.split("\n");
      console.log(`     ${issueSymbol(issue.level)} ${lines[0]}`);
      for (const line of lines.slice(1)) {
        console.log(`              ${dim(line)}`);
      }
    }
    if (issues.length === 0) {
      console.log(green("     All checks passed."));
    }
    console.log();
  }

  // ── Cross-product supplemental image sharing ─────────────────────────────
  console.log(`${bold("── Cross-product image overlap (supplemental) ────────")}\n`);
  const allUrlToProducts = new Map<string, string[]>();
  for (const product of products) {
    for (const url of product.images ?? []) {
      if (!allUrlToProducts.has(url)) allUrlToProducts.set(url, []);
      allUrlToProducts.get(url)!.push(product.name);
    }
  }
  let overlapFound = false;
  for (const [url, productNames] of allUrlToProducts) {
    if (productNames.length > 1) {
      overlapFound = true;
      const shortUrl = url.length > 80 ? url.slice(0, 77) + "…" : url;
      console.log(yellow(`⚠ Shared image across ${productNames.length} products:`));
      console.log(dim(`  ${shortUrl}`));
      for (const n of productNames) console.log(`  • ${n}`);
      console.log();
      totalWarns++;
    }
  }
  if (!overlapFound) {
    console.log(green("✔ No supplemental image overlap found across products.\n"));
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log(`${bold("══════════════════════════════════════════════════════")}`);
  console.log(`${bold("  Summary")}`);
  console.log(`${bold("══════════════════════════════════════════════════════")}`);
  console.log(`  Products scanned : ${products.length}`);
  console.log(`  ${green("Fully passing")}    : ${totalPasses}`);
  console.log(`  ${yellow("Warnings")}         : ${totalWarns}`);
  console.log(`  ${red("Errors")}           : ${totalErrors}`);
  console.log();

  if (totalErrors > 0) {
    console.log(red(`  ✖ ${totalErrors} error(s) must be fixed before deploying.`));
  } else if (totalWarns > 0) {
    console.log(yellow(`  ⚠ ${totalWarns} warning(s) — review and address where possible.`));
  } else {
    console.log(green("  ✔ All products passed validation!"));
  }
  console.log();

  return { errors: totalErrors, warns: totalWarns, passes: totalPasses };
}

// Run directly when invoked as a script
if (process.argv[1]?.endsWith("validate-catalog.ts") || process.argv[1]?.endsWith("validate-catalog.js")) {
  validateCatalog()
    .then(({ errors }) => process.exit(errors > 0 ? 1 : 0))
    .catch(err => {
      console.error("Validation failed:", err);
      process.exit(2);
    });
}

export { validateCatalog };
