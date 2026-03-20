import { useRef } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import PpmAlert from "../PpmAlert";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt, calcDilution } from "../../utils/calc";

export default function ModeDilution({ values, onChange, onClear }) {
  const pdfRef = useRef(null);
  const { np, dilution, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

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
          液肥のN濃度と希釈倍数から、灌水後のppmと必要な液肥量を算出します。
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
            <StepLine
              label="② 必要液肥量"
              formula={`${fmt(wv, 0)} L ÷ ${fmt(dv, 0)}倍`}
              result={fmt(result.fertLiters, 2)}
              unit="L"
            />
            <div style={{
              fontSize: 12, color: "#666", background: "#f5f5f0",
              padding: "8px 12px", borderRadius: 6, lineHeight: 1.6,
            }}>
              → N{fmt(npv)}% 液肥を <strong>{fmt(dv, 0)}倍</strong> 希釈
              → <strong>{fmt(result.ppm)} ppm</strong>
              ／液肥 <strong>{fmt(result.fertLiters, 2)} L</strong> + 水 {fmt(wv - result.fertLiters, 0)} L
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
