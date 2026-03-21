import { useRef, useState } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import PpmAlert from "../PpmAlert";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt, calcDilution } from "../../utils/calc";

const FERT_UNITS = [
  { key: "L",  label: "L",  factor: 1 },
  { key: "ml", label: "ml", factor: 1000 },
  { key: "kg", label: "kg", factor: 1 },
  { key: "g",  label: "g",  factor: 1000 },
];

export default function ModeDilution({ values, onChange, onClear }) {
  const pdfRef = useRef(null);
  const [fertUnit, setFertUnit] = useState("L");
  const { np, dilution, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });
  const unit = FERT_UNITS.find(u => u.key === fertUnit);
  const convertFert = (liters) => liters * unit.factor;

  const npv = parseFloat(np);
  const dv = parseFloat(dilution);
  const wv = parseFloat(w);
  const valid = npv > 0 && npv <= 100 && dv > 0 && wv > 0;
  const result = valid ? calcDilution(npv, dv, wv) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div ref={pdfRef}>
        <div style={{
          fontSize: 12, color: "#888", background: "#f5f5f0",
          padding: "10px 12px", borderRadius: 6, lineHeight: 1.6,
        }}>
          肥料のN濃度と希釈倍数から、灌水後のppmと必要な肥料量を算出します。
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <InputField label="液肥N濃度" value={np} onChange={v => set("np", v)} unit="%" placeholder="10" />
          <InputField label="希釈倍数" value={dilution} onChange={v => set("dilution", v)} unit="倍" placeholder="1000" />
        </div>
        <div style={{ marginTop: 12 }}>
          <InputField label="水量" value={w} onChange={v => set("w", v)} unit="L / 10a" placeholder="4000" />
        </div>
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
              計算過程
            </div>
            <StepLine
              label="① ppm"
              formula={`N${fmt(npv)}% × 10,000 ÷ ${fmt(dv, 0)}倍`}
              result={fmt(result.ppm)}
              unit="ppm"
              highlight
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1 }}>
                <StepLine
                  label="② 必要肥料量"
                  formula={`${fmt(wv, 0)} L ÷ ${fmt(dv, 0)}倍`}
                  result={fmt(convertFert(result.fertLiters), 2)}
                  unit={fertUnit}
                />
              </div>
              <select
                value={fertUnit}
                onChange={e => setFertUnit(e.target.value)}
                style={{
                  fontSize: 13, padding: "4px 6px", borderRadius: 4,
                  border: "1px solid #ccc", background: "#fff", color: "#333",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                {FERT_UNITS.map(u => (
                  <option key={u.key} value={u.key}>{u.label}</option>
                ))}
              </select>
            </div>
            <div style={{
              fontSize: 12, color: "#666", background: "#f5f5f0",
              padding: "8px 12px", borderRadius: 6, lineHeight: 1.6,
            }}>
              → N{fmt(npv)}% 肥料を <strong>{fmt(dv, 0)}倍</strong> 希釈
              → <strong>{fmt(result.ppm)} ppm</strong>
              ／肥料 <strong>{fmt(convertFert(result.fertLiters), 2)} {fertUnit}</strong> + 水 {fmt(wv - result.fertLiters, 0)} L
            </div>
            <PpmAlert ppm={result.ppm} />
          </div>
        )}
      </div>
      {valid && <PdfButton targetRef={pdfRef} title="希釈倍数" />}
      <ClearButton onClear={onClear} />
    </div>
  );
}
