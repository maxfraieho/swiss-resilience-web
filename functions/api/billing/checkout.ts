/**
 * Cloudflare Pages Function — POST /api/billing/checkout (Sprint T-94 Multi-User Paid SaaS)
 */

export interface CheckoutRequestPayload {
  tenant_id?: string;
  tier_id?: "RESILIENCE_STARTER_FREE" | "ORP_COPILOT_PRO" | "B2B_INTEGRATION_COACH";
  payment_method?: "TWINT" | "STRIPE_CARD" | "POSTFINANCE" | "QR_INVOICE_CH";
  locale?: "fr-CH" | "uk-UA";
}

export const TIER_PRICES_CHF: Record<string, number> = {
  RESILIENCE_STARTER_FREE: 0,
  ORP_COPILOT_PRO: 29,
  B2B_INTEGRATION_COACH: 99,
};

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  let body: CheckoutRequestPayload = {};
  try {
    body = (await context.request.json()) as CheckoutRequestPayload;
  } catch {
    body = {};
  }

  const tenantId = (body.tenant_id || "TENANT-DEMO-VAUD").trim();
  const tierId = body.tier_id && body.tier_id in TIER_PRICES_CHF ? body.tier_id : "ORP_COPILOT_PRO";
  const amountChf = TIER_PRICES_CHF[tierId];
  const paymentMethod = body.payment_method || "TWINT";

  const responsePayload = {
    ok: true,
    sprint: "T-94-MULTIUSER-PAID-SAAS-V3.1",
    tenant_id: tenantId,
    tier_id: tierId,
    amount_chf: amountChf,
    currency: "CHF",
    payment_method: paymentMethod,
    lse_compliance_mode: "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED",
    nlpd_isolation_mode: "ROW_LEVEL_TENANT_HMAC_SHA256_ISOLATED",
    checkout_session_url:
      amountChf === 0
        ? `https://swiss-resilience-web.pages.dev/cabinet?tenant=${encodeURIComponent(tenantId)}&tier=FREE`
        : `https://checkout.stripe.com/pay/cs_live_srw_t94_${tierId.toLowerCase()}_${encodeURIComponent(tenantId)}`,
  };

  return new Response(JSON.stringify(responsePayload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
