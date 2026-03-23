function Section({ title, children }) {
  return (
    <div>
      <h3 style={{
        fontSize: 14, fontWeight: 700, color: "#2e7d32",
        margin: "0 0 8px", borderLeft: "3px solid #2e7d32", paddingLeft: 8,
      }}>
        {title}
      </h3>
      <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function ModeDescription({ icon, t, d }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
      <span style={{ fontSize: 16, width: 24, textAlign: "center", flexShrink: 0 }}>{icon}</span>
      <div><strong>{t}</strong>：{d}</div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Section title="ppmとは？">
        <p>ppm（parts per million）は「100万分の1」の濃度単位です。養液栽培では、水1Lあたり何mgの養分が溶けているかを示します。</p>
        <p><strong>1 ppm = 1 mg/L = 水1,000Lあたり1g</strong></p>
      </Section>

      <Section title="基本の計算式">
        <div style={{
          background: "#f5f5f0", padding: 12, borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
          overflowWrap: "break-word", wordBreak: "break-all", minWidth: 0,
        }}>
          <div>ppm = 窒素量(g) ÷ 水量(L) × 1,000</div>
          <div style={{ marginTop: 6 }}>窒素量(g) = ppm × 水量(L) ÷ 1,000</div>
        </div>
        <p style={{ marginTop: 8 }}>g とLで計算するため、mg/Lに合わせるために×1,000をかけます。</p>
      </Section>

      <Section title="使用例">
        <div style={{
          background: "#e8f5e9", padding: 12, borderRadius: 8,
          fontSize: 13, lineHeight: 1.8,
        }}>
          <strong>例：</strong>窒素量 233.5g / 10a、水量 4,000L / 10a<br/>
          233.5 ÷ 4,000 × 1,000 = <strong>約58 ppm</strong><br/>
          → 水1Lあたり約58mgの窒素
        </div>
        <div style={{
          background: "#fff3e0", padding: 12, borderRadius: 8,
          fontSize: 13, lineHeight: 1.8, marginTop: 8,
        }}>
          <strong>逆算：</strong>100ppmにしたい場合<br/>
          100 × 4,000 ÷ 1,000 = 400g 必要<br/>
          現在 233.5g → 不足分 ≒ 167g
        </div>
      </Section>

      <Section title="5つの計算モード">
        <ModeDescription icon="⟶" t="ppm算出" d="窒素量(g)と水量(L)→ppmを算出" />
        <ModeDescription icon="⟵" t="逆算" d="目標ppmと水量→必要窒素量(g)" />
        <ModeDescription icon="△" t="不足分" d="現在N量から目標ppmへの差分" />
        <ModeDescription icon="⚗" t="肥料換算" d="肥料kg・N%→窒素量→ppm" />
        <ModeDescription icon="💧" t="灌水量" d="点滴チューブ・灌水チューブの仕様から1回の灌水量(L)を算出。結果を他モードの水量に反映可能" />
      </Section>

      <Section title="灌水量モードの使い方">
        <p>灌水チューブの仕様と圃場情報から、1回あたりの灌水量(L)を計算します。</p>
        <div style={{
          background: "#e3f2fd", padding: 12, borderRadius: 8,
          fontSize: 13, lineHeight: 1.8, marginTop: 8,
        }}>
          <strong>点滴チューブの場合：</strong><br/>
          カタログに記載の「吐出量(L/h)」と「エミッター間隔(cm)」を入力。畝の長さ・畝数・チューブ本数（1畝に何本チューブを敷設しているか）・灌水時間を指定すると総灌水量を算出します。
        </div>
        <div style={{
          background: "#e3f2fd", padding: 12, borderRadius: 8,
          fontSize: 13, lineHeight: 1.8, marginTop: 8,
        }}>
          <strong>灌水チューブの場合：</strong><br/>
          まず単位を選択してください。散水型（スミサンスイ等）は「L/分/m」、点滴型や設計値は「L/時/m」が一般的です。カタログの表記どおりに散水量を入力すると、自動で換算されます。同様に畝情報と灌水時間を指定します。
        </div>
        <p style={{ marginTop: 8 }}>算出した灌水量は「各モードの水量に反映」ボタンで、他の計算モードの水量欄に自動入力できます。</p>
      </Section>

      <Section title="注意事項">
        <p>・本アプリは<strong>10aあたり</strong>基準です。</p>
        <p>・ppmは培養液中の窒素「濃度」であり、実際の施肥設計ではEC管理・pH管理と合わせて判断してください。</p>
        <p>・作物別目安はあくまで参考値です。品種・栽培方式・時期・原水水質により適正値は異なります。</p>
      </Section>
    </div>
  );
}
