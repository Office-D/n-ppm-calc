import { useRef } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt } from "../../utils/calc";

export default function ModeReverse({ values, onChange, onClear }) {
  const pdfRef = useRef(null);
  const { ppm, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const pv = parseFloat(ppm);
  const wv = parseFloat(w);
  const valid = pv > 0 && wv > 0;
  const nNeeded = valid ? (pv * wv) / 1000 : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div ref={pdfRef}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="目標ppm" value={ppm} onChange={v => set("ppm", v)} unit="ppm" placeholder="100" />
          <InputField label="水量" value={w} onChange={v => set("w", v)} unit="L / 10a" placeholder="4000" />
        </div>
        {valid && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
              計算過程
            </div>
            <StepLine label="逆算式" formula="目標ppm × 水量(L) ÷ 1,000 = 必要窒素量(g)" />
            <StepLine label="数値代入" formula={`${fmt(pv)} × ${fmt(wv, 0)} ÷ 1,000`} />
            <StepLine
              label="結果"
              formula={`= ${fmt(pv * wv, 0)} ÷ 1,000`}
              result={fmt(nNeeded)}
              unit="g / 10a"
              highlight
            />
          </div>
        )}
      </div>
      {valid && <PdfButton targetRef={pdfRef} title="逆算" />}
      <ClearButton onClear={onClear} />
    </div>
  );
}
