export const CROP_DATA = [
  {
    id: "eggplant", name: "ナス", emoji: "🍆", ec: "1.5〜2.5",
    ranges: [
      { range: "50〜80", label: "薄めこまめ型", desc: "根への負担が少なく、連続灌水向き" },
      { range: "100〜150", label: "標準管理", desc: "収量ピークで持ち出しが多い時期に" },
      { range: "150〜200", label: "高濃度域", desc: "短期スポット施用。常用は根傷みリスク" },
    ],
    typical: "50〜150",
    notes: "ナスは吸肥力が強く、N過多では過繁茂→病害虫増加。薄めこまめが基本。山崎処方ではN=16 me/L（≒224 ppm N）が標準だが、実際の灌水濃度はEC管理で0.5〜1倍に調整される。",
    sources: [
      "農林水産省 神奈川県施肥基準「養液栽培の培養液管理」",
      "OATアグリオ OATハウス肥料シリーズ処方表",
      "鐘山グリーンテック「養液栽培の計算方法」（園試処方・山崎処方）",
    ],
  },
  {
    id: "tomato", name: "トマト", emoji: "🍅", ec: "2.0〜3.5",
    ranges: [
      { range: "60〜70", label: "生育初期", desc: "つる惚け（bullish）防止のため低N管理" },
      { range: "100〜150", label: "開花肥大期", desc: "着果・肥大を支える標準域" },
      { range: "150〜200", label: "収穫最盛期", desc: "果実負担を支えるピーク管理" },
    ],
    typical: "60〜200",
    notes: "トマトは生育ステージによるN濃度変動が大きい。フロリダ大学の処方では初期60-70 ppmから収穫期200 ppmまで段階的に増加。高K時のCa拮抗（尻腐れ）に注意。",
    sources: [
      "Univ. of Florida IFAS Extension HS796/CV216 (Hochmuth & Hochmuth)",
      "Ohio State Univ. HYG-1437 Hydroponic Tomato Nutrient Solution",
      "Univ. of Arizona CEAC Tomato Recipe（初期80→6W 145→12W 190 ppm N）",
      "農林水産省 神奈川県施肥基準（EC 0.8〜2.2 mS/cm）",
    ],
  },
  {
    id: "minitomato", name: "ミニトマト", emoji: "🍒", ec: "2.0〜4.0",
    ranges: [
      { range: "60〜80", label: "生育初期", desc: "トマト同様、初期は低Nで管理" },
      { range: "100〜150", label: "着果期", desc: "果房負担が大きいため安定供給" },
      { range: "150〜200", label: "収穫盛期", desc: "段数が増えるほどN需要増大" },
    ],
    typical: "60〜200",
    notes: "基本はトマトと同処方。果実数が多いためK需要がやや高く、着色・糖度向上にはEC高め管理が有効。高糖度栽培では意図的にEC 4〜6と管理する場合も。",
    sources: [
      "Univ. of Florida IFAS Extension HS796/CV216",
      "Science in Hydroponics「Comparing Nutrient Solutions for Hydroponic Tomatoes」(2025)",
      "OATアグリオ 培養液処方 A処方・C処方",
    ],
  },
  {
    id: "cucumber", name: "キュウリ", emoji: "🥒", ec: "1.5〜2.5",
    ranges: [
      { range: "80〜120", label: "生育初期", desc: "トマトより初期N需要が高い（生育速度が速い）" },
      { range: "120〜180", label: "収穫期", desc: "連続収穫に対応する安定供給域" },
      { range: "180〜220", label: "高負荷期", desc: "多収期・高温期の短期対応" },
    ],
    typical: "80〜180",
    notes: "キュウリは生育が速く、トマトより初期からN需要が高い。フロリダ大学はトマト処方をベースに初期Nを増やす推奨。山崎処方ではK:Ca比がトマトと異なりKやや多め。",
    sources: [
      "Univ. of Florida IFAS Extension HS796/CV216（キュウリはトマトベースで初期N増）",
      "鐘山グリーンテック 山崎処方（キュウリ用K:Ca比調整）",
      "養液栽培研究会 連載「培養液について」",
    ],
  },
  {
    id: "strawberry", name: "イチゴ", emoji: "🍓", ec: "0.8〜1.5",
    ranges: [
      { range: "40〜80", label: "定植〜活着期", desc: "低N・低ECで根張り優先" },
      { range: "80〜120", label: "花芽分化〜開花", desc: "適度なNで花質確保" },
      { range: "120〜170", label: "収穫期", desc: "果実品質向上にはN:Kバランスが重要" },
    ],
    typical: "40〜170",
    notes: "イチゴはN過多に敏感でチップバーン（Ca欠乏）を誘発。山崎イチゴ処方はEC≒1.0と低濃度。研究ではN=156-172 ppm+K=484-543 ppmが最適との報告あり。パーライト栽培ではN=80 ppmの処方例も。",
    sources: [
      "Univ. of Arizona Hydroponic Strawberry（山崎イチゴ処方 EC≒1.0）",
      "Science in Hydroponics「Comparing Nutrient Solutions for Hydroponic Strawberry」(2025)",
      "Perlite Institute: Hydroponic Culture of Strawberries in Perlite（N=80 ppm）",
      "農林水産省 神奈川県施肥基準 表13-6（イチゴ処方例）",
    ],
  },
  {
    id: "melon", name: "メロン", emoji: "🍈", ec: "2.0〜3.5",
    ranges: [
      { range: "80〜120", label: "つる伸長期", desc: "つる惚け防止のため抑制気味" },
      { range: "120〜180", label: "着果〜肥大期", desc: "果実肥大を支える主力域" },
      { range: "60〜100", label: "ネット形成〜収穫", desc: "糖度向上のためN控えめ・K増" },
    ],
    typical: "60〜180",
    notes: "メロンは時期による切り替えが重要。肥大期にN需要ピーク、ネット形成期以降はN減・K増で糖度向上。山崎処方ではK:Ca比がキュウリと類似。",
    sources: [
      "鐘山グリーンテック 山崎処方（メロン用処方例）",
      "養液栽培研究会 連載「培養液について」",
      "OATアグリオ OATハウス肥料シリーズ処方表",
    ],
  },
  {
    id: "pepper", name: "ピーマン", emoji: "🫑", ec: "1.5〜2.5",
    ranges: [
      { range: "70〜100", label: "定植〜初期", desc: "根張り確保のため控えめ管理" },
      { range: "120〜160", label: "収穫期", desc: "連続着果を支える標準域" },
      { range: "160〜200", label: "盛期", desc: "多収時の高N管理（短期）" },
    ],
    typical: "70〜200",
    notes: "ナス科だが初期Ca需要が特に高い（尻腐れ対策）。Hort Americasの処方ではN=120-190 ppm（NH4は10 ppm以下）、K=200-300 ppmを推奨。",
    sources: [
      "Hort Americas「Nutrient Recipe for Hydroponic Greenhouse Bell Peppers」(2023)",
      "Houzz Forum: Bell Pepper Fertigation Formula（N=70初期→160収穫期）",
      "OATアグリオ OATハウス肥料 A処方（果菜類汎用）",
    ],
  },
];
