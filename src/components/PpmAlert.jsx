import { fmt } from "../utils/calc";

export default function PpmAlert({ ppm }) {
  if (ppm === null || ppm === undefined || isNaN(ppm)) return null;

  if (ppm > 1000) {
    return (
      <div style={{
        padding: "10px 14px", borderRadius: 8, marginTop: 8,
        background: "#ffebee", border: "1px solid #ef9a9a",
        color: "#c62828", fontSize: 13, lineHeight: 1.6,
      }}>
        <span style={{ fontWeight: 700 }}>⚠ 警告：</span>
        {fmt(ppm)} ppm は非常に高濃度です。入力値に誤りがないか確認してください。
      </div>
    );
  }

  if (ppm > 300) {
    return (
      <div style={{
        padding: "10px 14px", borderRadius: 8, marginTop: 8,
        background: "#fff8e1", border: "1px solid #ffe082",
        color: "#e65100", fontSize: 13, lineHeight: 1.6,
      }}>
        <span style={{ fontWeight: 700 }}>注意：</span>
        {fmt(ppm)} ppm は灌水施肥では高濃度域です。作物目安タブで適正範囲を確認してください。
      </div>
    );
  }

  return null;
}
