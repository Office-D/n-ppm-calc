import { useState, useEffect } from "react";
import ModeCalc from "./ModeCalc";
import ModeReverse from "./ModeReverse";
import ModeGap from "./ModeGap";
import ModeFertilizer from "./ModeFertilizer";
import ModeWater from "./ModeWater";
import ModeDilution from "./ModeDilution";

const DEFAULT_WATER = "";

const CALC_MODES = [
  { id: "calc", label: "ppm算出", icon: "⟶" },
  { id: "reverse", label: "逆算", icon: "⟵" },
  { id: "gap", label: "不足分", icon: "△" },
  { id: "fertilizer", label: "肥料換算", icon: "⚗" },
  { id: "dilution", label: "希釈倍数", icon: "÷" },
  { id: "water", label: "灌水量", icon: "💧" },
];

export default function CalculatorPage({ sharedWater, setSharedWater, reverseTarget, onNavigateCrops }) {
  const [calcMode, setCalcMode] = useState("calc");

  // 各モードの入力state（CalculatorPageで保持するので切替時に消えない）
  const [calcState, setCalcState] = useState({ n: "", w: DEFAULT_WATER });
  const [reverseState, setReverseState] = useState({ ppm: "", w: DEFAULT_WATER });

  useEffect(() => {
    if (reverseTarget) {
      setCalcMode("reverse");
      setReverseState(s => ({ ...s, ppm: String(reverseTarget.ppm) }));
    }
  }, [reverseTarget]);
  const [gapState, setGapState] = useState({ currentN: "", targetPpm: "", w: DEFAULT_WATER });
  const [fertState, setFertState] = useState({ fw: "", np: "", w: DEFAULT_WATER });
  const [dilutionState, setDilutionState] = useState({ np: "", dilution: "", w: DEFAULT_WATER });
  const [waterState, setWaterState] = useState({
    tubeType: "drip",
    drip: { emitterFlow: "", emitterPitch: "20", rowLength: "", linesPerRow: "1", rowCount: "", duration: "" },
    sprinkler: { flowPerM: "", rowLength: "", linesPerRow: "1", rowCount: "", duration: "" },
  });

  const handleApplyWater = (totalWater) => {
    const rounded = Math.round(totalWater).toString();
    setSharedWater(rounded);
    setCalcState(s => ({ ...s, w: rounded }));
    setReverseState(s => ({ ...s, w: rounded }));
    setGapState(s => ({ ...s, w: rounded }));
    setFertState(s => ({ ...s, w: rounded }));
    setDilutionState(s => ({ ...s, w: rounded }));
  };

  return (
    <>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 14,
      }}>
        {CALC_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setCalcMode(m.id)}
            style={{
              padding: "8px 4px", border: "none", borderRadius: 8, cursor: "pointer",
              background: calcMode === m.id ? "#2e7d32" : "#fff",
              color: calcMode === m.id ? "#fff" : "#555",
              boxShadow: calcMode === m.id
                ? "0 2px 6px rgba(46,125,50,0.3)"
                : "0 1px 3px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              minHeight: 44, fontSize: 12, fontWeight: 700,
            }}
          >
            <span style={{ fontSize: 15 }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
      }}>
        <div style={{
          fontSize: 11, color: "#999", background: "#f5f5f0",
          padding: "5px 10px", borderRadius: 6, marginBottom: 14,
          textAlign: "center", fontWeight: 600,
        }}>
          すべての値は <strong style={{ color: "#666" }}>10aあたり</strong> で計算しています
        </div>
        {calcMode === "calc" && (
          <ModeCalc
            values={calcState}
            onChange={setCalcState}
            onClear={() => setCalcState({ n: "", w: DEFAULT_WATER })}
            onNavigateCrops={onNavigateCrops}
          />
        )}
        {calcMode === "reverse" && (
          <ModeReverse
            values={reverseState}
            onChange={setReverseState}
            onClear={() => setReverseState({ ppm: "", w: DEFAULT_WATER })}
          />
        )}
        {calcMode === "gap" && (
          <ModeGap
            values={gapState}
            onChange={setGapState}
            onClear={() => setGapState({ currentN: "", targetPpm: "", w: DEFAULT_WATER })}
          />
        )}
        {calcMode === "fertilizer" && (
          <ModeFertilizer
            values={fertState}
            onChange={setFertState}
            onClear={() => setFertState({ fw: "", np: "", w: DEFAULT_WATER })}
            onNavigateCrops={onNavigateCrops}
          />
        )}
        {calcMode === "dilution" && (
          <ModeDilution
            values={dilutionState}
            onChange={setDilutionState}
            onClear={() => setDilutionState({ np: "", dilution: "", w: DEFAULT_WATER })}
          />
        )}
        {calcMode === "water" && (
          <ModeWater
            values={waterState}
            onChange={setWaterState}
            onClear={() => setWaterState({
              tubeType: waterState.tubeType,
              drip: { emitterFlow: "", emitterPitch: "20", rowLength: "", linesPerRow: "1", rowCount: "", duration: "" },
              sprinkler: { flowPerM: "", rowLength: "", linesPerRow: "1", rowCount: "", duration: "" },
            })}
            onApplyWater={handleApplyWater}
          />
        )}
      </div>
      <div style={{
        marginTop: 14, padding: "10px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#bbb", marginBottom: 6, letterSpacing: 0.5 }}>
          公式
        </div>
        <div style={{
          display: "flex", flexDirection: "column", gap: 3,
          fontSize: 11, color: "#888", fontFamily: "'JetBrains Mono',monospace",
        }}>
          <span>ppm = N(g) ÷ 水(L) × 1,000</span>
          <span>N(g) = ppm × 水(L) ÷ 1,000</span>
          <span>N(g) = 肥料(kg) × N% ÷ 100 × 1,000</span>
        </div>
      </div>
    </>
  );
}
