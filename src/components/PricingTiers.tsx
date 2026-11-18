import React from "react";

export interface SaasPricingTierSpec {
  tierId: "RESILIENCE_STARTER_FREE" | "ORP_COPILOT_PRO" | "B2B_INTEGRATION_COACH";
  titleFr: string;
  titleUa: string;
  priceChfMonthly: number;
  badge: string;
  paymentMethods: string[];
  quotas: {
    maxPreEntriesPerMonth: number;
    max4PdfDossiersPerMonth: number;
    maxManagedCandidates: number;
  };
  highlightsUa: string[];
}

export const T94_COMMERCIAL_PRICING_TIERS: SaasPricingTierSpec[] = [
  {
    tierId: "RESILIENCE_STARTER_FREE",
    titleFr: "Resilience Starter (Gratuit)",
    titleUa: "Старт Стійкості (Безкоштовно)",
    priceChfMonthly: 0,
    badge: "0 CHF / назавжди",
    paymentMethods: ["FREE_INSTANT"],
    quotas: {
      maxPreEntriesPerMonth: 5,
      max4PdfDossiersPerMonth: 1,
      maxManagedCandidates: 1,
    },
    highlightsUa: [
      "Калькулятор LACI Art. 24 (Gain intermédiaire) та базовий Geo/Persona підбір площадок",
      "До 5 записів у таблицю ORP PRE на місяць",
      "1 базове досьє (4 PDF) та огляд 14 порталів кантону Во",
    ],
  },
  {
    tierId: "ORP_COPILOT_PRO",
    titleFr: "ORP & Kontur Co-Pilot Pro",
    titleUa: "ORP та Kontur Ко-Пілот Про",
    priceChfMonthly: 29,
    badge: "Хіт для Remote AI / B-SDD та кандидатів ORP",
    paymentMethods: ["TWINT", "STRIPE_CARD", "POSTFINANCE"],
    quotas: {
      maxPreEntriesPerMonth: 500,
      max4PdfDossiersPerMonth: 100,
      maxManagedCandidates: 1,
    },
    highlightsUa: [
      "Повний автоматичний підбір площадок за географією, віком (50+ anti-ageism) та навичками (AI, B-SDD, Автоматизація)",
      "Кнопка прямого автозаповнення знайдених вакансій через безкоштовний ШІ-проксі .184:18880",
      "Безлімітний генератор 4 офіційних PDF та щомісячний експорт ORP PRE у CSV/JSON",
      "Синхронізація з Aidrakon Kontur Survey Co-Pilot (0.00 USD через .184:18880 FreeAiPoolRouter)",
    ],
  },
  {
    tierId: "B2B_INTEGRATION_COACH",
    titleFr: "B2B Integration Coach & Commune Fleet",
    titleUa: "B2B Інтеграційний Коуч та Муніципальний Флот",
    priceChfMonthly: 99,
    badge: "До 30 кандидатів (B2B / Комуни / Агенції)",
    paymentMethods: ["TWINT", "STRIPE_CARD", "QR_INVOICE_CH"],
    quotas: {
      maxPreEntriesPerMonth: 5000,
      max4PdfDossiersPerMonth: 1000,
      maxManagedCandidates: 30,
    },
    highlightsUa: [
      "До 30 ізольованих кабінетів кандидатів для job-коучів, рекрутерів та асоціацій",
      "Масовий підбір площадок, генерація 4-PDF досьє та аудит виконання щомісячної квоти PRE",
      "Повна відповідність LSE (RS 823.11) та nLPD (RS 235.1) із криптографічною ізоляцією тенантів",
    ],
  },
];

export const PricingTiers: React.FC = () => {
  return (
    <section id="srw-t94-pricing-tiers" className="py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {T94_COMMERCIAL_PRICING_TIERS.map((tier) => (
          <article
            key={tier.tierId}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-lg"
          >
            <div>
              <span className="inline-block rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-300">
                {tier.badge}
              </span>
              <h3 className="mt-3 text-lg font-bold text-white">{tier.titleFr}</h3>
              <p className="text-xs text-slate-400">{tier.titleUa}</p>
              <div className="mt-4 text-3xl font-extrabold text-emerald-400">
                {tier.priceChfMonthly} CHF <span className="text-sm font-normal text-slate-400">/ mois</span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {tier.highlightsUa.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Paiement: {tier.paymentMethods.join(" · ")}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PricingTiers;
