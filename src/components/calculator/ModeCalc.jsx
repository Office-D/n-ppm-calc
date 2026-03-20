import InputField from "../InputField";
import StepLine from "../StepLine";
import PpmAlert from "../PpmAlert";
import ClearButton from "../ClearButton";
import { fmt } from "../../utils/calc";

export default function ModeCalc({ values, onChange, onClear }) {
  const { n, w } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const nv = parseFloat(n);
  const wv = parseFloat(w);
  const valid = nv > 0 && wv > 0;
  const ppm = valid ? (nv / wv) * 1000 : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="窒素量" value={n} onChange={v => set("n", v)} unit="g / 10a" placeholder="233.5" />
        <InputField label="水量" value={w} onChange={v => set("w", v)} unit="L / 10a" placeholder="4000" />
      </div>
      {valid && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
            計算過程
          </div>
          <StepLine label="基本式" formula="窒素量(g) ÷ 水量(L) × 1,000 = ppm" />
          <StepLine label="数値代入" formula={`${fmt(nv)} ÷ ${fmt(wv, 0)} × 1,000`} />
          <StepLine
            label="結果"
            formula={`= ${fmt(nv / wv, 4)} × 1,000`}
            result={fmt(ppm)}
            unit="ppm"
            highlight
          />
          <div style={{
            fontSize: 12, color: "#666", background: "#f5f5f0",
            padding: "8px 12px", borderRadius: 6, lineHeight: 1.6,
          }}>
            → 水1Lあたり約 <strong>{fmt(ppm)}</strong> mg の窒素が溶けている状態
          </div>
          <PpmAlert ppm={ppm} />
        </div>
      )}
      <ClearButton onClear={onClear} />
    </div>
  );
}
