const PAGES = [
  { id: "calculator", label: "計算", icon: "⊕" },
  { id: "crops", label: "作物目安", icon: "🌱" },
  { id: "guide", label: "使い方", icon: "?" },
];

export default function PageTabs({ active, onChange }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4,
      marginBottom: 16, background: "#e8e8e0", borderRadius: 10, padding: 3,
    }}>
      {PAGES.map(p => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          style={{
            padding: "10px 4px", border: "none", borderRadius: 8, cursor: "pointer",
            background: active === p.id ? "#fff" : "transparent",
            color: active === p.id ? "#2e7d32" : "#888",
            boxShadow: active === p.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            fontWeight: 700, fontSize: 13, transition: "all 0.15s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            minHeight: 44,
          }}
        >
          <span style={{ fontSize: 14 }}>{p.icon}</span>{p.label}
        </button>
      ))}
    </div>
  );
}
