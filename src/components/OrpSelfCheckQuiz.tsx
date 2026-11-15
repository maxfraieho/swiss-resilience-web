import React, { useState } from "react";

export const OrpSelfCheckQuiz: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const options = [
    "З 15-го числа кожного місяця",
    "З 26-го числа місяця (до 5-го числа наступного)",
    "Тільки паперовим листом без job-room.ch",
  ];
  return (
    <section style={{ padding: "18px", borderRadius: "14px", background: "#111827", color: "#f9fafb" }}>
      <h4>🇨🇭 Швидка самоперевірка ORP / LACI (Art. 26 OACI)</h4>
      <p>З якого числа відкривається ручна передача звіту PRE на job-room.ch?</p>
      {options.map((opt, idx) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelected(idx)}
          style={{ display: "block", margin: "6px 0", padding: "8px 12px" }}
        >
          {opt}
        </button>
      ))}
      {selected !== null && (
        <p style={{ color: selected === 1 ? "#34d399" : "#fbbf24" }}>
          {selected === 1
            ? "✅ Вірно! Передавайте 8–10 заявок з 26-го числа до 5-го наступного місяця."
            : "ℹ️ Підказка: вікно ручної передачі відкривається з 26-го числа до 5-го числа наступного місяця (при інтерфейсі FR)."}
        </p>
      )}
    </section>
  );
};

export default OrpSelfCheckQuiz;
