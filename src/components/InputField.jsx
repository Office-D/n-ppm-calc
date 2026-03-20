export default function InputField({ label, value, onChange, unit, placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#444", letterSpacing: 0.3 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={0}
          step="any"
          style={{
            flex: 1, minWidth: 0, padding: "10px 10px", fontSize: 16, fontWeight: 600,
            border: "1.5px solid #ccc", borderRadius: 8, outline: "none",
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            background: "#fff", transition: "border-color 0.2s",
            minHeight: 44,
          }}
          onFocus={e => e.target.style.borderColor = "#2e7d32"}
          onBlur={e => e.target.style.borderColor = "#ccc"}
        />
        <span style={{
          fontSize: 11, color: "#666", fontWeight: 500,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {unit}
        </span>
      </div>
    </div>
  );
}
