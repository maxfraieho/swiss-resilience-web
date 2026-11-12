/**
 * Swiss Resilience Navigator & TMA Module:
 * 1) Live ORP 5-Day Embargo Radar (Obligation d'annonce)
 * 2) Interactive LACI Art. 24 Gain Intermédiaire Calculator (30%-100%)
 * 3) Permis S 2-Minute Employer Onboarding Badge (emploi.asile.spop@vd.ch)
 * 4) Monthly PRE Quota & IPA Reminder Banner (29.10-31.10.2026 & Nov 2026)
 */

import React, { useState } from "react";

export function calculateLaciArt24GainIntermediaire(
  workloadPct: number,
  hourlyWageChf: number = 22.5,
  referenceMonthlyChf: number = 3400,
  indemnityRate: number = 0.8
) {
  const monthlyHours = (workloadPct / 100) * 173.3;
  const grossJobIncome = Math.round(monthlyHours * hourlyWageChf * 100) / 100;
  const baseChomage = Math.round(referenceMonthlyChf * indemnityRate * 100) / 100;
  const lossOfGain = Math.max(0, referenceMonthlyChf - grossJobIncome);
  const compensatoryTopUp = Math.round(lossOfGain * indemnityRate * 100) / 100;
  const totalMonthlyIncome = Math.round((grossJobIncome + compensatoryTopUp) * 100) / 100;
  const netAdvantage = Math.round((totalMonthlyIncome - baseChomage) * 100) / 100;

  return {
    workloadPct,
    grossJobIncome,
    compensatoryTopUp,
    totalMonthlyIncome,
    baseChomage,
    netAdvantage,
  };
}

export const OrpResilienceTmaModule: React.FC = () => {
  const [workloadPct, setWorkloadPct] = useState<number>(30);
  const calc = calculateLaciArt24GainIntermediaire(workloadPct);

  return (
    <section data-testid="orp-resilience-tma-module">
      <h2>🇨🇭 Swiss ORP &amp; Permis S Career Co-Pilot (Canton de Vaud)</h2>
      <div data-testid="ipa-urgent-banner">
        ⚠️ Нагадування Caisse de chômage Vaud (22002): Заповніть форму IPA за 29.10–31.10.2026 у Job-Room.ch (Saisir les indications +).
      </div>
      <div data-testid="gain-intermediaire-calculator">
        <label>
          Ставка зайнятості (Gain intermédiaire, ст. 24 LACI): {workloadPct}%
          <input
            type="range"
            min={20}
            max={100}
            step={10}
            value={workloadPct}
            onChange={(e) => setWorkloadPct(Number(e.target.value))}
          />
        </label>
        <p>
          Зарплата: {calc.grossJobIncome} CHF + Доплата каси: {calc.compensatoryTopUp} CHF =
          <strong> {calc.totalMonthlyIncome} CHF/міс. </strong>
          (вигода +{calc.netAdvantage} CHF/міс. порівняно з базовою допомогою {calc.baseChomage} CHF)
        </p>
      </div>
      <footer data-testid="lse-legal-disclaimer">
        Outil logiciel indépendant d&apos;aide à la rédaction de dossiers et d&apos;organisation administrative (SaaS Self-Service Co-Pilot), sans affiliation avec job-room.ch, l&apos;ORP/RAV/URC ni le SECO (LSE RS 823.11).
      </footer>
    </section>
  );
};
