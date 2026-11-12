/**
 * Cloudflare Pages Function: /api/orp-digest
 * Receives LSE-compliant, nLPD-sanitized Swiss ORP vacancy digests and
 * serves them to the Swiss Resilience Navigator & Telegram Mini App (TMA).
 */

export interface OrpVacancyDigestItem {
  job_id: string;
  title: string;
  company: string;
  location: string;
  workload_label: string;
  obligation_annonce_5day_advantage: boolean;
  permis_s_simple_annonce_ready: boolean;
  gain_intermediaire_preview: {
    workload_pct: number;
    estimated_gross_wage_chf: number;
    caisse_compensatory_topup_chf: number;
    total_monthly_income_chf: number;
    baseline_chomage_only_chf: number;
    monthly_financial_advantage_chf: number;
    explanation_ua: string;
  };
}

export interface OrpPublicDigestPayload {
  target_portal: string;
  surface: string;
  canton: string;
  lse_compliance_mode: string;
  legal_disclaimer_fr: string;
  nlpd_pii_sanitized: boolean;
  vacancies_count: number;
  vacancies: OrpVacancyDigestItem[];
}

const FORBIDDEN_PII_PATTERNS = [
  /756\.\d{4}\.\d{4}\.\d{2}/,
  /23682816/,
  /0502802547/,
  /arsen\.sfw@gmail\.com/i,
  /Leroy\s+Philippe/i,
];

export function validateNlpdAndLseGuardrails(payload: OrpPublicDigestPayload): {
  ok: boolean;
  reason: string;
} {
  const raw = JSON.stringify(payload);
  for (const rx of FORBIDDEN_PII_PATTERNS) {
    if (rx.test(raw)) {
      return { ok: false, reason: `BLOCKED_NLPD_PII_PATTERN: ${rx.source}` };
    }
  }
  if (
    payload.lse_compliance_mode !==
    "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED"
  ) {
    return { ok: false, reason: "MISSING_LSE_SAAS_SELF_SERVICE_MODE" };
  }
  if (!payload.legal_disclaimer_fr || !payload.legal_disclaimer_fr.includes("LSE")) {
    return { ok: false, reason: "MISSING_LSE_LEGAL_DISCLAIMER_FR" };
  }
  return { ok: true, reason: "PASS_NLPD_AND_LSE_GUARDS" };
}
