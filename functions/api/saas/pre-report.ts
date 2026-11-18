/**
 * Cloudflare Pages Function — GET /api/saas/pre-report (Sprint T-94 v3.1)
 */

export async function onRequestGet(): Promise<Response> {
  const csvHeader =
    "Date de postulation;Entreprise / Employeur;Poste postule;Localite / Canton;Taux d'occupation;Canal de postulation;Statut / Resultat PRE;Reference de preuve";
  const payload = {
    ok: true,
    sprint: "T-94-MULTIUSER-PAID-SAAS-V3.1",
    schema_version: "ORP-VD-PRE-2026.11",
    csv_header_semicolon_fr: csvHeader,
    lse_compliance_mode: "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED",
  };
  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
