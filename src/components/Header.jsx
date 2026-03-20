export default function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#2e7d32", color: "#fff",
        padding: "5px 14px", borderRadius: 20,
        fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
        marginBottom: 6,
      }}>
        <span style={{ fontSize: 13 }}>N</span> Nitrogen ppm Calculator
      </div>
      <h1 style={{
        fontSize: 20, fontWeight: 800, color: "#1a1a1a",
        margin: "6px 0 2px", letterSpacing: -0.5,
      }}>
        窒素濃度 ppm 計算
      </h1>
      <p style={{ fontSize: 11, color: "#999", margin: 0 }}>
        10aあたり ・ 養液灌水の窒素管理ツール
      </p>
    </div>
  );
}
