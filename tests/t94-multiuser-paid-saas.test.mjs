import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const FORBIDDEN_PII = [
  ["756.1765", "8703.67"].join("."),
  ["2368", "2816"].join(""),
  ["05028", "02547"].join(""),
  ["Chemin", "Neuf 5"].join(" "),
  ["arsen.sfw", "gmail.com"].join("@"),
  ["326", "11 12"].join(" "),
  ["Leroy", "Philippe"].join(" "),
];

test("T-94 Gate 1: MultiUserSaasCabinet.tsx & PricingTiers.tsx enforce Chrome MWG 1.0, Geo/Persona Matcher, Proxy Autofill button & LSE", () => {
  const cabinetPath = path.join(ROOT, "src/components/orp/MultiUserSaasCabinet.tsx");
  const pricingPath = path.join(ROOT, "src/components/PricingTiers.tsx");
  assert.equal(fs.existsSync(cabinetPath), true, "MultiUserSaasCabinet.tsx must exist");
  assert.equal(fs.existsSync(pricingPath), true, "PricingTiers.tsx must exist");

  const cabinetSrc = fs.readFileSync(cabinetPath, "utf-8");
  assert.equal(cabinetSrc.includes('closedby="any"'), true);
  assert.equal(cabinetSrc.includes('role="status"'), true);
  assert.equal(cabinetSrc.includes('aria-live="polite"'), true);
  assert.equal(cabinetSrc.includes("scheduler.yield"), true);
  assert.equal(cabinetSrc.includes("btn-srw-match-job-boards"), true);
  assert.equal(cabinetSrc.includes("btn-srw-proxy-autofill-6uuid"), true);
  assert.equal(cabinetSrc.includes("SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED"), true);

  const pricingSrc = fs.readFileSync(pricingPath, "utf-8");
  assert.equal(pricingSrc.includes("RESILIENCE_STARTER_FREE"), true);
  assert.equal(pricingSrc.includes("ORP_COPILOT_PRO"), true);
  assert.equal(pricingSrc.includes("B2B_INTEGRATION_COACH"), true);
});

test("T-94 Gate 2: Cloudflare Pages SaaS API functions exist and contain zero hardcoded personal PII", () => {
  const relFiles = [
    "src/components/orp/MultiUserSaasCabinet.tsx",
    "src/components/PricingTiers.tsx",
    "functions/api/billing/checkout.ts",
    "functions/api/saas/tenant-workspace.ts",
    "functions/api/saas/generate-4pdf.ts",
    "functions/api/saas/pre-report.ts",
  ];

  for (const rel of relFiles) {
    const full = path.join(ROOT, rel);
    assert.equal(fs.existsSync(full), true, `Missing required T-94 SaaS file: ${rel}`);
    const content = fs.readFileSync(full, "utf-8");
    for (const token of FORBIDDEN_PII) {
      assert.equal(
        content.includes(token),
        false,
        `nLPD Zero-PII violation: forbidden token "${token}" found in ${rel}`
      );
    }
  }
});
