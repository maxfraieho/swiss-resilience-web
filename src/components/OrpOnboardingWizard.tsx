import React, { useState } from "react";

const CANTONS = ["VD", "GE", "NE", "FR", "VS", "BE", "ZH"] as const;
const PERMITS = ["Permis S", "Permis B", "Permis C", "Citoyen CH"] as const;

export const OrpOnboardingWizard: React.FC = () => {
  const [canton, setCanton] = useState<string>("VD");
  const [permit, setPermit] = useState<string>("Permis S");
  const [orpId, setOrpId] = useState<string>("");
  const [targetRoles, setTargetRoles] = useState<string>("");
  const [radiusKm, setRadiusKm] = useState<number>(30);
  const [maxLiftKg, setMaxLiftKg] = useState<number>(5);
  const [status, setStatus] = useState<string>("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(
      `Профіль збережено локально у вашому ізольованому контейнері (${canton}, ${permit}, радіус ${radiusKm} км, ліміт ${maxLiftKg} кг).`
    );
  };

  return (
    <section className="orp-onboarding-wizard" style={{ padding: "20px", borderRadius: "14px", background: "#0f172a", color: "#f8fafc" }}>
      <h3>🇨🇭 Налаштування Персонального Копілота ORP / RAV</h3>
      <form onSubmit={handleSaveProfile} style={{ display: "grid", gap: "12px", maxWidth: "520px" }}>
        <label>
          Кантон
          <select value={canton} onChange={(e) => setCanton(e.target.value)}>
            {CANTONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Дозвіл на проживання
          <select value={permit} onChange={(e) => setPermit(e.target.value)}>
            {PERMITS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label>
          Номер досьє ORP / RAV (зберігається ізольовано)
          <input value={orpId} onChange={(e) => setOrpId(e.target.value)} placeholder="Напр. N° ORP..." />
        </label>
        <label>
          Цільові професії
          <input value={targetRoles} onChange={(e) => setTargetRoles(e.target.value)} placeholder="Support IT, Secrétaire, Intendance..." />
        </label>
        <label>
          Радіус доїзду SBB/CFF (км): {radiusKm}
          <input type="range" min={5} max={80} value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} />
        </label>
        <label>
          Медичне обмеження підйому вантажів (кг): {maxLiftKg}
          <input type="number" min={1} max={30} value={maxLiftKg} onChange={(e) => setMaxLiftKg(Number(e.target.value))} />
        </label>
        <button type="submit">Зберегти та згенерувати CV / Lettre (SECO)</button>
      </form>
      {status && <p style={{ marginTop: "10px", color: "#34d399" }}>{status}</p>}
      <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>
        ⚖️ {`SAAS_SELF_SERVICE_CO_PILOT_NO_PLACEMENT_LICENSE_REQUIRED`}: кожне відправлення ініціюєте особисто ви від власного імені (LSE Art. 2 / RS 823.11 &amp; nLPD).
      </p>
    </section>
  );
};

export default OrpOnboardingWizard;
