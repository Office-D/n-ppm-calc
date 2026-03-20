import { useRef } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import PpmAlert from "../PpmAlert";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt } from "../../utils/calc";

export default function ModeFertilizer({ values, onChange, onClear, onNavigateCrops }) {
  const pdfRef = useRef(null);
  const { fw, np, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const fv = parseFloat(fw);
  const npv = parseFloat(np);
  const wv = parseFloat(w);
  const valid = fv > 0 && npv > 0 && npv <= 100 && wv > 0;

  const nAmt = valid ? fv * (npv / 100) * 1000 : null;
  const ppm = valid ? (nAmt / wv) * 1000 : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div ref={pdfRef}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="肥料投入量" value={fw} onChange={v => set("fw", v)} unit="kg / 10a" placeholder="20" />
          <InputField label="窒素成分" value={np} onChange={v => set("np", v)} unit="%" placeholder="14" />
        </div>
        <div style={{ marginTop: 12 }}>
          <InputField label="水量" value={w} onChange={v => set("w", v)} unit="L / 10a" placeholder="4000" />
        </div>
        {valid && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
              計算過程
            </div>
            <StepLine label="① 窒素量" formula={`${fmt(fv)} kg × ${fmt(npv)}% × 1,000`} result={fmt(nAmt)} unit="g / 10a" />
            <StepLine label="② ppm換算" formula={`${fmt(nAmt)} ÷ ${fmt(wv, 0)} × 1,000`} />
            <StepLine
              label="結果"
              formula={`= ${fmt(nAmt / wv, 4)} × 1,000`}
              result={fmt(ppm)}
              unit="ppm"
              highlight
            />
            <div style={{
              fontSize: 12, color: "#666", background: "#f5f5f0",
              padding: "8px 12px", borderRadius: 6, lineHeight: 1.6,
            }}>
              → 肥料 {fmt(fv)} kg（N {fmt(npv)}%）= 窒素 {fmt(nAmt)} g → 約 <strong>{fmt(ppm)} ppm</strong>
            </div>
            <PpmAlert ppm={ppm} />
          </div>
        )}
      </div>
      {valid && (
        <>
          {onNavigateCrops && (
            <button
              onClick={onNavigateCrops}
              style={{
                padding: "10px 14px", border: "1px solid rgba(46,125,50,0.3)", borderRadius: 8,
                background: "#f1f8e9", color: "#2e7d32", fontSize: 13, fontWeight: 600,
                cursor: "pointer", textAlign: "left", lineHeight: 1.5,
              }}
            >
              🌱 「作物目安」タブで適正範囲を確認 →
            </button>
          )}
          <PdfButton targetRef={pdfRef} title="肥料換算" />
        </>
      )}
      <ClearButton onClear={onClear} />
    </div>
  );
}
