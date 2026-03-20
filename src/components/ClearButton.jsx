import { useState } from "react";

export default function ClearButton({ onClear }) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (confirming) {
      onClear();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "6px 14px", border: "1px solid #ddd", borderRadius: 6,
        background: confirming ? "#fff3e0" : "#fafafa",
        color: confirming ? "#e65100" : "#999",
        fontSize: 12, fontWeight: 600,
        cursor: "pointer", transition: "all 0.15s", alignSelf: "flex-end",
      }}
    >
      {confirming ? "タップでクリア" : "クリア"}
    </button>
  );
}
