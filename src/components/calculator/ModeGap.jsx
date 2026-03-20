import { useRef } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import PpmAlert from "../PpmAlert";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt } from "../../utils/calc";

export default function ModeGap({ values, onChange, onClear }) {
  const pdfRef = useRef(null);
  const { currentN, targetPpm, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const cv = parseFloat(currentN);
  const tv = parseFloat(targetPpm);
  const wv = parseFloat(w);
  const valid = cv >= 0 && !isNaN(cv) && tv > 0 && wv > 0;

  const currentPpm = valid ? (cv / wv) * 1000 : null;
  const neededTotal = valid ? (tv * wv) / 1000 : null;
  const gap = valid ? neededTotal - cv : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div ref={pdfRef}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <InputField label="現在の窒素量" value={currentN} onChange={v => set("currentN", v)} unit="g / 10a" placeholder="233.5" />
          <InputField label="目標ppm" value={targetPpm} onChange={v => set("targetPpm", v)} unit="ppm" placeholder="100" />
        </div>
        <div style={{ marginTop: 12 }}>
          <InputField label="水量" value={w} onChange={v => set("w", v)} unit="L / 10a" placeholder="4000" />
        </div>
        {valid && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
              計算過程
            </div>
            <StepLine label="① 現在のppm" formula={`${fmt(cv)} ÷ ${fmt(wv, 0)} × 1,000`} result={fmt(currentPpm)} unit="ppm" />
            <StepLine label="② 必要な総窒素量" formula={`${fmt(tv)} × ${fmt(wv, 0)} ÷ 1,000`} result={fmt(neededTotal)} unit="g" />
            <StepLine
              label="③ 不足分"
              formula={`${fmt(neededTotal)} − ${fmt(cv)}`}
              result={`${gap >= 0 ? "+" : ""}${fmt(gap)}`}
              unit="g / 10a"
              highlight
            />
            <div style={{
              fontSize: 12, padding: "8px 12px", borderRadius: 6, lineHeight: 1.6,
              background: gap > 0 ? "#fff3e0" : gap < 0 ? "#e8f5e9" : "#f5f5f0",
              color: gap > 0 ? "#e65100" : gap < 0 ? "#2e7d32" : "#666",
            }}>
              {gap > 0
                ? `→ あと約 ${fmt(gap)} g の窒素上乗せが必要`
                : gap < 0
                  ? `→ 現在すでに目標を ${fmt(Math.abs(gap))} g 超過`
                  : "→ ちょうど目標値に到達"}
            </div>
            <PpmAlert ppm={tv} />
          </div>
        )}
      </div>
      {valid && <PdfButton targetRef={pdfRef} title="不足分" />}
      <ClearButton onClear={onClear} />
    </div>
  );
}
