import React from "react";

export const PricingTiers: React.FC = () => {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", padding: "16px 0" }}>
      <div style={{ padding: "18px", borderRadius: "14px", background: "#1e293b", color: "#f8fafc" }}>
        <h4>Resilience Starter — Free (0 CHF)</h4>
        <ul>
          <li>Радар вакансій SECO / Jobup з оцінкою сумісності</li>
          <li>Калькулятор маршрутів SBB/CFF та Gain intermédiaire (ст. 24 LACI)</li>
          <li>3 AI-адаптовані мотиваційні листи на місяць</li>
          <li>Експорт таблиці Preuves de recherches d&apos;emploi (CSV/PDF)</li>
        </ul>
      </div>
      <div style={{ padding: "18px", borderRadius: "14px", background: "#0c4a6e", color: "#f8fafc", border: "1px solid #38bdf8" }}>
        <h4>ORP Co-Pilot Pro — Stripe / Telegram Stars / TWINT</h4>
        <ul>
          <li>Необмежена генерація персоналізованих пакетів CV + Lettre de motivation</li>
          <li>Персональний поштовий канал (Self-Service 1-Click Dispatch із власним Reply-To)</li>
          <li>Автоматичний тріаж відповідей роботодавців + двомовні шпаргалки (FR/DE + UA/EN)</li>
          <li>Нагадування дедлайнів звіту інспектору ORP (до 5-го числа кожного місяця)</li>
        </ul>
      </div>
    </section>
  );
};

export default PricingTiers;
