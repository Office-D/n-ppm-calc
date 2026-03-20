import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function PdfButton({ targetRef, title }) {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    const el = targetRef.current;
    if (!el) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgW = canvas.width;
      const imgH = canvas.height;

      const pdfW = 210;
      const margin = 14;
      const contentW = pdfW - margin * 2;
      const contentH = (imgH / imgW) * contentW;

      const pdfH = Math.max(contentH + 60, 100);
      const pdf = new jsPDF({ unit: "mm", format: [pdfW, pdfH] });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(46, 125, 50);
      pdf.text(title, margin, 16);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(150);
      const now = new Date();
      const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      pdf.text(dateStr, pdfW - margin, 16, { align: "right" });

      pdf.setDrawColor(200);
      pdf.line(margin, 20, pdfW - margin, 20);

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, 24, contentW, contentH);

      pdf.setFontSize(7);
      pdf.setTextColor(180);
      pdf.text("N ppm calc", pdfW - margin, pdfH - 6, { align: "right" });

      const safeTitle = title.replace(/[\\/:*?"<>|]/g, "_");
      const fileDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      pdf.save(`ppm計算_${safeTitle}_${fileDate}.pdf`);
    } catch {
      alert("PDF出力に失敗しました");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={busy}
      style={{
        padding: "10px 14px", border: "1px solid rgba(46,125,50,0.3)", borderRadius: 8,
        background: busy ? "#e0e0e0" : "#f1f8e9", color: busy ? "#999" : "#2e7d32",
        fontSize: 13, fontWeight: 600, cursor: busy ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        minHeight: 44, transition: "all 0.2s", width: "100%",
      }}
    >
      {busy ? "PDF作成中…" : "PDF保存"}
    </button>
  );
}
