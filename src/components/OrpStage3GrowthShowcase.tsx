import React from "react";

/**
 * OrpStage3GrowthShowcase.tsx — Sprint ORP-08 React & Telegram Mini App Showcase
 * Displays the AI-Ready SEO/GEO resources (`llms.txt`, `CC BY-SA 4.0` Open Course)
 * and the 10/10 La Côte / Vaud anonymized vacancy radar under strict LSE (RS 823.11) & nLPD compliance.
 */
export const OrpStage3GrowthShowcase: React.FC = () => {
  return (
    <section
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#0f172a",
        color: "#f8fafc",
        padding: "18px",
        borderRadius: "16px",
        maxWidth: "560px",
        margin: "16px auto",
        border: "1px solid #1e293b",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "17px", color: "#38bdf8" }}>
          🚀 Swiss Resilience AI-Ready Hub (Stage 3)
        </h3>
        <span style={{ background: "#064e3b", color: "#6ee7b7", padding: "4px 10px", borderRadius: "999px", fontSize: "12px" }}>
          Квота PRE: 10 / 10 (100%)
        </span>
      </div>
      <p style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "8px" }}>
        Відкриті AI-Ready матеріали (<code>CC BY-SA 4.0</code>) для пошуку роботи в кантоні Во (<code>Permis S</code>, <code>Gain intermédiaire ст. 24 LACI</code>, <code>PRE / IPA</code>):
      </p>
      <ul style={{ fontSize: "13px", color: "#93c5fd", paddingLeft: "18px", lineHeight: 1.6 }}>
        <li><a href="/llms.txt" style={{ color: "#38bdf8" }}>/llms.txt</a> та <a href="/llms-full.txt" style={{ color: "#38bdf8" }}>/llms-full.txt</a> (індекс для ChatGPT, Perplexity, Gemini)</li>
        <li><a href="/courses/MODULE_01_SWISS_ORP_LACI_RESILIENCE_COURSE.md" style={{ color: "#38bdf8" }}>Відкритий Міні-Курс ORP Vaud &amp; LACI (CC BY-SA 4.0)</a></li>
        <li><a href="/courses/LEAD_MAGNET_VAUD_ORP_GUIDE.md" style={{ color: "#38bdf8" }}>Пам&apos;ятка: Мовний замок FR та вікно передачі PRE з 26-го числа</a></li>
      </ul>
      <footer style={{ fontSize: "11px", color: "#64748b", borderTop: "1px solid #1e293b", paddingTop: "8px", marginTop: "10px" }}>
        ⚖️ Юридичний статус (LSE RS 823.11 &amp; nLPD): Програмний інструмент самостійної підготовки кандидата (SaaS Self-Service Co-Pilot). Не є приватним кадровим агентством. 0 персональних даних.
      </footer>
    </section>
  );
};

export default OrpStage3GrowthShowcase;
