import { useState, useRef } from "react";
import { CROP_DATA } from "../../data/cropData";
import PdfButton from "../PdfButton";

function parseRangeMid(range) {
  const nums = range.replace(/[〜~]/g, "-").split("-").map(Number);
  if (nums.length === 2 && nums.every(n => !isNaN(n))) return Math.round((nums[0] + nums[1]) / 2);
  return nums[0] || null;
}

export default function CropReferencePage({ onCalcWithPpm }) {
  const pdfRef = useRef(null);
  const [sel, setSel] = useState(null);
  const crop = CROP_DATA.find(c => c.id === sel);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.5 }}>
        養液栽培における窒素(N)濃度の一般的な目安です。品種・栽培方式・時期により適正値は異なります。
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {CROP_DATA.map(c => (
          <button
            key={c.id}
            onClick={() => setSel(sel === c.id ? null : c.id)}
            style={{
              padding: "12px 4px 10px", border: "none", borderRadius: 10, cursor: "pointer",
              minHeight: 44,
              background: sel === c.id ? "#2e7d32" : "#fff",
              color: sel === c.id ? "#fff" : "#555",
              boxShadow: sel === c.id
                ? "0 2px 8px rgba(46,125,50,0.3)"
                : "0 1px 3px rgba(0,0,0,0.08)",
              transition: "all 0.2s",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            }}
          >
            <span style={{ fontSize: 20 }}>{c.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 700 }}>{c.name}</span>
          </button>
        ))}
      </div>

      {crop && (
        <>
          <div ref={pdfRef} style={{
            background: "#fff", borderRadius: 12, padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(46,125,50,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{crop.emoji}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>{crop.name}</div>
                <div style={{ fontSize: 11, color: "#666" }}>
                  標準N範囲：{crop.typical} ppm ｜ EC：{crop.ec} mS/cm
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
                {crop.ranges.map((_, i) => {
                  const colors = ["#a5d6a7", "#66bb6a", "#ff9800"];
                  return <div key={i} style={{ flex: 1, background: colors[i] }} />;
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#666" }}>
                <span>低濃度</span><span>高濃度</span>
              </div>
            </div>

            {crop.ranges.map((r, i) => {
              const bg = ["rgba(165,214,167,0.15)", "rgba(102,187,106,0.12)", "rgba(255,152,0,0.1)"];
              const bd = ["#a5d6a7", "#66bb6a", "#ff9800"];
              return (
                <div key={i} style={{
                  padding: "10px 12px", borderRadius: 8, marginBottom: 6,
                  background: bg[i], borderLeft: `3px solid ${bd[i]}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: 15, fontWeight: 700,
                      fontFamily: "'JetBrains Mono',monospace", color: "#333",
                    }}>
                      {r.range} ppm
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: "#666",
                      background: "rgba(255,255,255,0.7)", padding: "2px 8px", borderRadius: 10,
                    }}>
                      {r.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#666" }}>{r.desc}</span>
                    {onCalcWithPpm && (
                      <button
                        onClick={() => onCalcWithPpm(parseRangeMid(r.range))}
                        style={{
                          padding: "4px 10px", border: "1px solid #2e7d32", borderRadius: 6,
                          background: "#fff", color: "#2e7d32", fontSize: 11, fontWeight: 700,
                          cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                          minHeight: 28,
                        }}
                      >
                        逆算
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{
              marginTop: 10, padding: "10px 12px", background: "#f9f9f5",
              borderRadius: 8, fontSize: 12, color: "#555", lineHeight: 1.7,
            }}>
              <div style={{
                fontWeight: 700, color: "#666", fontSize: 10,
                marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                補足
              </div>
              {crop.notes}
            </div>

            <div style={{
              marginTop: 10, padding: "10px 12px", background: "#f5f5f0", borderRadius: 8,
            }}>
              <div style={{
                fontWeight: 700, color: "#666", fontSize: 10,
                marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                出典・参考
              </div>
              {crop.sources.map((s, i) => (
                <div key={i} style={{
                  fontSize: 11, color: "#777", lineHeight: 1.5,
                  marginBottom: 2, paddingLeft: 12, textIndent: -12,
                }}>
                  [{i + 1}] {s}
                </div>
              ))}
            </div>
          </div>
          <PdfButton targetRef={pdfRef} title={`作物目安_${crop.name}`} />
        </>
      )}

      {!crop && (
        <div style={{ textAlign: "center", padding: 24, color: "#bbb", fontSize: 13 }}>
          ↑ 作物を選択すると窒素濃度の目安が表示されます
        </div>
      )}
    </div>
  );
}
