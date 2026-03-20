export default function ClearButton({ onClear }) {
  return (
    <button
      onClick={onClear}
      style={{
        padding: "10px 18px", border: "1px solid #ddd", borderRadius: 6,
        background: "#fafafa", color: "#666", fontSize: 13, fontWeight: 600,
        cursor: "pointer", transition: "all 0.15s", alignSelf: "flex-end",
        minHeight: 44,
      }}
    >
      クリア
    </button>
  );
}
