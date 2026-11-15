/**
 * Cloudflare Pages Function: /api/billing/checkout
 * Handles Freemium -> Pro Co-Pilot upgrades (Stripe / Telegram Stars / TWINT).
 */
export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const body = (await context.request.json().catch(() => ({}))) as {
    plan?: string;
    provider?: string;
    tenant_id?: string;
  };
  const plan = body.plan === "pro" ? "ORP_COPILOT_PRO" : "RESILIENCE_STARTER_FREE";
  const provider = ["stripe", "telegram_stars", "twint"].includes(String(body.provider || ""))
    ? String(body.provider)
    : "stripe";

  return new Response(
    JSON.stringify({
      ok: true,
      plan,
      provider,
      lse_compliance_mode: "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED",
      features:
        plan === "ORP_COPILOT_PRO"
          ? [
              "unlimited_seco_cv_and_lettre_generation",
              "self_service_1click_dispatch_custom_reply_to",
              "bilingual_interview_prep_and_email_triage",
              "orp_inspector_deadline_reminders_5th_of_month",
            ]
          : [
              "seco_jobup_vacancy_radar",
              "sbb_cff_route_calculator",
              "3_ai_cover_letters_per_month",
              "pre_csv_pdf_export",
            ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
