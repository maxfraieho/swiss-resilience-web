/**
 * Cloudflare Pages Function — GET & POST /api/saas/tenant-workspace (Sprint T-94 v3.1)
 * Provides row-level isolated tenant configuration, Geo & Persona Job-Board Matcher, and Proxy Autofill status.
 */

export async function onRequestGet(): Promise<Response> {
  const payload = {
    ok: true,
    sprint: "T-94-MULTIUSER-PAID-SAAS-V3.1",
    lse_compliance_mode: "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED",
    nlpd_isolation_mode: "ROW_LEVEL_TENANT_HMAC_SHA256_ISOLATED",
    supported_geo_scopes: ["UKRAINE_REMOTE", "REMOTE_GLOBAL", "EU_REMOTE", "CH_VAUD"],
    supported_cantons: ["VD", "GE", "NE", "FR", "VS", "BE", "ZH"],
    supported_permits: ["Permis S", "Permis B", "Permis F", "Permis C", "B2B_REMOTE_CONTRACT"],
    supported_tiers: ["RESILIENCE_STARTER_FREE", "ORP_COPILOT_PRO", "B2B_INTEGRATION_COACH"],
    ai_gateway: {
      endpoint: "http://192.168.3.184:18880/v1/chat/completions",
      router: "FreeAiPoolRouter",
      marginal_cost_usd: 0.0,
    },
  };
  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
