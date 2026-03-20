export default function StepLine({ label, formula, result, unit, highlight }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 2,
      padding: "8px 12px", borderRadius: 6, minWidth: 0,
      background: highlight ? "rgba(46,125,50,0.08)" : "rgba(0,0,0,0.02)",
      border: highlight ? "1px solid rgba(46,125,50,0.25)" : "1px solid transparent",
      overflow: "hidden",
    }}>
      {label && (
        <span style={{ fontSize: 11, color: "#666", fontWeight: 500 }}>{label}</span>
      )}
      {formula && (
        <span style={{
          fontSize: 12,
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          color: "#444",
          overflowWrap: "break-word",
          wordBreak: "break-all",
          minWidth: 0,
        }}>
          {formula}
        </span>
      )}
      {result !== undefined && (
        <span style={{
          fontSize: highlight ? 22 : 15,
          fontWeight: highlight ? 700 : 600,
          color: highlight ? "#2e7d32" : "#333",
          fontFamily: "'JetBrains Mono',monospace",
        }}>
          = {result}
          {unit && (
            <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 4, color: "#666" }}>
              {unit}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
