import { useState, useRef } from "react";
import InputField from "../InputField";
import StepLine from "../StepLine";
import ClearButton from "../ClearButton";
import PdfButton from "../PdfButton";
import { fmt, calcDripWater, calcSprinklerWater } from "../../utils/calc";

const TUBE_TYPES = [
  { id: "drip", label: "点滴チューブ", icon: "💧" },
  { id: "sprinkler", label: "灌水チューブ", icon: "🚿" },
];

function ApplyWaterButton({ totalWater, onApplyWater }) {
  const [applied, setApplied] = useState(false);

  const handleClick = () => {
    onApplyWater(totalWater);
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <button
        onClick={handleClick}
        style={{
          padding: "12px 16px", border: "none", borderRadius: 8,
          background: "#2e7d32", color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: "pointer", transition: "all 0.2s",
          boxShadow: "0 2px 6px rgba(46,125,50,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          minHeight: 48,
        }}
      >
        → {fmt(totalWater, 0)} L を各モードの水量に反映
      </button>
      {applied && (
        <div style={{
          fontSize: 12, fontWeight: 600, color: "#2e7d32",
          background: "#e8f5e9", padding: "8px 12px", borderRadius: 6,
          textAlign: "center", transition: "opacity 0.3s",
        }}>
          各モードの水量に {fmt(totalWater, 0)} L を反映しました
        </div>
      )}
    </div>
  );
}

function DripInputs({ values, onChange, onApplyWater }) {
  const { emitterFlow, emitterPitch, rowLength, linesPerRow, rowCount, duration } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const ef = parseFloat(emitterFlow);
  const ep = parseFloat(emitterPitch);
  const rl = parseFloat(rowLength);
  const lr = parseFloat(linesPerRow);
  const rc = parseFloat(rowCount);
  const du = parseFloat(duration);
  const valid = ef > 0 && ep > 0 && rl > 0 && lr > 0 && rc > 0 && du > 0;
  const result = valid ? calcDripWater(ef, ep, rl, lr, rc, du) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{
        fontSize: 12, color: "#888", background: "#f5f5f0",
        padding: "10px 12px", borderRadius: 6, lineHeight: 1.6,
      }}>
        点滴チューブ：一定間隔のエミッターから水を滴下。カタログ記載の吐出量(L/h)とピッチ(cm)を入力。「1畝あたり本数」は畝の片側1本なら1、両側なら2。
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.5 }}>チューブ仕様</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="吐出量" value={emitterFlow} onChange={v => set("emitterFlow", v)} unit="L/h" placeholder="1.6" />
        <InputField label="エミッター間隔" value={emitterPitch} onChange={v => set("emitterPitch", v)} unit="cm" placeholder="20" />
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.5, marginTop: 4 }}>畝情報</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="畝の長さ" value={rowLength} onChange={v => set("rowLength", v)} unit="m" placeholder="50" />
        <InputField label="畝数" value={rowCount} onChange={v => set("rowCount", v)} unit="畝" placeholder="20" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="1畝あたり本数" value={linesPerRow} onChange={v => set("linesPerRow", v)} unit="本" placeholder="1" />
        <InputField label="灌水時間" value={duration} onChange={v => set("duration", v)} unit="分" placeholder="30" />
      </div>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
            計算過程
          </div>
          <StepLine
            label="チューブ総延長"
            formula={`${fmt(rl)} m × ${fmt(lr, 0)} 本 × ${fmt(rc, 0)} 畝`}
            result={fmt(result.totalLength, 0)}
            unit="m"
          />
          <StepLine
            label="エミッター総数"
            formula={`(${fmt(rl)}m×100÷${fmt(ep, 0)}cm)×${fmt(lr, 0)}×${fmt(rc, 0)}`}
            result={fmt(result.emitterCount, 0)}
            unit="個"
          />
          <StepLine
            label="時間あたり流量"
            formula={`${fmt(result.emitterCount, 0)} 個 × ${fmt(ef)} L/h`}
            result={fmt(result.flowPerHour, 0)}
            unit="L/h"
          />
          <StepLine
            label="総灌水量"
            formula={`${fmt(result.flowPerHour, 0)} L/h × ${fmt(du)} 分 ÷ 60`}
            result={fmt(result.totalWater, 0)}
            unit="L"
            highlight
          />
          <div style={{
            fontSize: 13, color: "#666", background: "#f5f5f0",
            padding: "10px 12px", borderRadius: 6, lineHeight: 1.6,
          }}>
            → 1回の灌水で約 <strong>{fmt(result.totalWater, 0)} L</strong>
          </div>
          <ApplyWaterButton totalWater={result.totalWater} onApplyWater={onApplyWater} />
        </div>
      )}
    </div>
  );
}

const FLOW_UNITS = [
  { id: "min", label: "L/分/m", desc: "散水型（スミサンスイ等）" },
  { id: "hour", label: "L/時/m", desc: "点滴型・設計値" },
];

function SprinklerInputs({ values, onChange, onApplyWater }) {
  const { flowPerM, flowUnit = "min", rowLength, linesPerRow, rowCount, duration } = values;
  const set = (key, val) => onChange({ ...values, [key]: val });

  const fm = parseFloat(flowPerM);
  const rl = parseFloat(rowLength);
  const lr = parseFloat(linesPerRow);
  const rc = parseFloat(rowCount);
  const du = parseFloat(duration);

  // 内部は L/h/m に正規化
  const fmPerHour = fm > 0 ? (flowUnit === "min" ? fm * 60 : fm) : NaN;
  const valid = fmPerHour > 0 && rl > 0 && lr > 0 && rc > 0 && du > 0;
  const result = valid ? calcSprinklerWater(fmPerHour, rl, lr, rc, du) : null;

  // 換算表示用
  const converted = fm > 0
    ? (flowUnit === "min" ? `${fmt(fm * 60)} L/時/m` : `${fmt(fm / 60, 3)} L/分/m`)
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{
        fontSize: 12, color: "#888", background: "#f5f5f0",
        padding: "10px 12px", borderRadius: 6, lineHeight: 1.6,
      }}>
        灌水チューブ：チューブ全体から霧状に散水。カタログの表記どおりに散水量を入力してください。「1畝あたり本数」は畝の片側1本なら1、両側なら2。
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.5 }}>チューブ仕様</div>

      <div style={{ display: "flex", gap: 4 }}>
        {FLOW_UNITS.map(u => (
          <button
            key={u.id}
            onClick={() => set("flowUnit", u.id)}
            style={{
              flex: 1, padding: "7px 4px", border: "none", borderRadius: 6, cursor: "pointer",
              background: flowUnit === u.id ? "#e3f2fd" : "#f5f5f5",
              color: flowUnit === u.id ? "#1565c0" : "#888",
              fontWeight: flowUnit === u.id ? 700 : 400,
              fontSize: 12, transition: "all 0.15s",
              outline: flowUnit === u.id ? "2px solid #1565c0" : "1px solid #e0e0e0",
            }}
          >
            <div>{u.label}</div>
            <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2 }}>{u.desc}</div>
          </button>
        ))}
      </div>

      <div>
        <InputField
          label="散水量"
          value={flowPerM}
          onChange={v => set("flowPerM", v)}
          unit={flowUnit === "min" ? "L/分/m" : "L/時/m"}
          placeholder={flowUnit === "min" ? "0.8" : "4.0"}
        />
        {converted && (
          <div style={{ fontSize: 11, color: "#1565c0", marginTop: 4, paddingLeft: 4 }}>
            = {converted}
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.5, marginTop: 4 }}>畝情報</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="畝の長さ" value={rowLength} onChange={v => set("rowLength", v)} unit="m" placeholder="50" />
        <InputField label="畝数" value={rowCount} onChange={v => set("rowCount", v)} unit="畝" placeholder="20" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InputField label="1畝あたり本数" value={linesPerRow} onChange={v => set("linesPerRow", v)} unit="本" placeholder="1" />
        <InputField label="灌水時間" value={duration} onChange={v => set("duration", v)} unit="分" placeholder="30" />
      </div>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
            計算過程
          </div>
          <StepLine
            label="チューブ総延長"
            formula={`${fmt(rl)} m × ${fmt(lr, 0)} 本 × ${fmt(rc, 0)} 畝`}
            result={fmt(result.totalLength, 0)}
            unit="m"
          />
          <StepLine
            label="時間あたり流量"
            formula={flowUnit === "min"
              ? `${fmt(result.totalLength, 0)} m × ${fmt(fm)} L/分/m × 60`
              : `${fmt(result.totalLength, 0)} m × ${fmt(fm)} L/時/m`}
            result={fmt(result.flowPerHour, 0)}
            unit="L/h"
          />
          <StepLine
            label="総灌水量"
            formula={`${fmt(result.flowPerHour, 0)} L/h × ${fmt(du)} 分 ÷ 60`}
            result={fmt(result.totalWater, 0)}
            unit="L"
            highlight
          />
          <div style={{
            fontSize: 13, color: "#666", background: "#f5f5f0",
            padding: "10px 12px", borderRadius: 6, lineHeight: 1.6,
          }}>
            → 1回の灌水で約 <strong>{fmt(result.totalWater, 0)} L</strong>
          </div>
          <ApplyWaterButton totalWater={result.totalWater} onApplyWater={onApplyWater} />
        </div>
      )}
    </div>
  );
}

export default function ModeWater({ values, onChange, onClear, onApplyWater }) {
  const pdfRef = useRef(null);
  const { tubeType, drip, sprinkler } = values;

  const setTubeType = (t) => onChange({ ...values, tubeType: t });
  const setDrip = (d) => onChange({ ...values, drip: d });
  const setSprinkler = (s) => onChange({ ...values, sprinkler: s });

  const hasDripResult = tubeType === "drip" && (() => {
    const d = drip;
    return parseFloat(d.emitterFlow) > 0 && parseFloat(d.emitterPitch) > 0 && parseFloat(d.rowLength) > 0 && parseFloat(d.linesPerRow) > 0 && parseFloat(d.rowCount) > 0 && parseFloat(d.duration) > 0;
  })();
  const hasSprinklerResult = tubeType === "sprinkler" && (() => {
    const s = sprinkler;
    return parseFloat(s.flowPerM) > 0 && parseFloat(s.rowLength) > 0 && parseFloat(s.linesPerRow) > 0 && parseFloat(s.rowCount) > 0 && parseFloat(s.duration) > 0;
  })();
  const hasResult = hasDripResult || hasSprinklerResult;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div ref={pdfRef}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {TUBE_TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => setTubeType(t.id)}
              style={{
                padding: "10px 6px", border: "none", borderRadius: 8, cursor: "pointer",
                background: tubeType === t.id ? "#1565c0" : "#f0f0f0",
                color: tubeType === t.id ? "#fff" : "#666",
                boxShadow: tubeType === t.id ? "0 2px 6px rgba(21,101,192,0.3)" : "none",
                fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                minHeight: 44,
              }}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          {tubeType === "drip"
            ? <DripInputs values={drip} onChange={setDrip} onApplyWater={onApplyWater} />
            : <SprinklerInputs values={sprinkler} onChange={setSprinkler} onApplyWater={onApplyWater} />
          }
        </div>
      </div>
      {hasResult && <PdfButton targetRef={pdfRef} title="灌水量" />}
      <ClearButton onClear={onClear} />
    </div>
  );
}
