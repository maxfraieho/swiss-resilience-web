/**
 * Cloudflare Pages Function — POST /api/saas/generate-4pdf (Sprint T-94 v3.1)
 */

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  let body: Record<string, unknown> = {};
  try {
    body = (await context.request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }
  const tenantId = String(body.tenant_id || "TENANT-DEMO-VAUD");
  const slug = String(body.tenant_slug || "Candidat_Romandie").replace(/[^A-Za-z0-9_]/g, "_");
  const permitType = String(body.permit_type || "Permis S");

  const payload = {
    ok: true,
    sprint: "T-94-MULTIUSER-PAID-SAAS-V3.1",
    tenant_id: tenantId,
    permit_type: permitType,
    spop_easygov_clause_included: permitType === "Permis S",
    documents: [
      `CV_${slug}_FR.pdf`,
      `Lettre_de_motivation_${slug}.pdf`,
      `Certificats_et_References_${slug}.pdf`,
      `Permis_et_Attestation_ORP_${slug}.pdf`,
    ],
    lse_compliance_mode: "SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED",
  };
  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
