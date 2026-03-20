import { useState } from "react";
import Header from "./components/Header";
import PageTabs from "./components/PageTabs";
import CalculatorPage from "./components/calculator/CalculatorPage";
import CropReferencePage from "./components/crops/CropReferencePage";
import GuidePage from "./components/guide/GuidePage";

const DEFAULT_WATER = "";

export default function App() {
  const [page, setPage] = useState("calculator");
  const [sharedWater, setSharedWater] = useState(DEFAULT_WATER);

  return (
    <div style={{
      minHeight: "100svh",
      background: "linear-gradient(165deg, #f8f9f4 0%, #eef1e8 40%, #e8ede0 100%)",
      fontFamily: "'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif",
      padding: "20px 16px 40px",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <Header />
        <PageTabs active={page} onChange={setPage} />

        <div style={{ display: page === "calculator" ? "block" : "none" }}>
          <CalculatorPage sharedWater={sharedWater} setSharedWater={setSharedWater} />
        </div>

        <div style={{ display: page === "crops" ? "block" : "none" }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
          }}>
            <CropReferencePage />
          </div>
        </div>

        <div style={{ display: page === "guide" ? "block" : "none" }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
          }}>
            <GuidePage />
          </div>
        </div>
      </div>
    </div>
  );
}
