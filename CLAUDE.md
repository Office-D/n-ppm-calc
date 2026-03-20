# 窒素濃度 ppm 計算アプリ

## プロジェクト概要
養液栽培における窒素(N)濃度のppm計算Webアプリ。
農業現場での灌水施肥設計の補助ツール。

## 技術スタック
- Vite + React
- Vitest + @testing-library/react
- GitHub Pages デプロイ

## 開発コマンド
- `npm run dev` — 開発サーバー起動
- `npm test` — テストウォッチモード
- `npm run test:run` — テスト単発実行
- `npm run build` — プロダクションビルド
- `npm run deploy` — GitHub Pages デプロイ

## コーディング規約
- UIテキストは全て日本語
- 数値表示には utils/calc.js の fmt() を使用
- CSSはインラインスタイル（CSS-in-JS）
- localStorage は使用禁止
- カラーは #2e7d32（メイン緑）を基調
- 数値フォントは JetBrains Mono

## テスト方針
- 計算ロジック: utils/calc.js を純粋関数として単体テスト必須
- コンポーネント: タブ切替・入力→結果表示の結合テスト
- テストケースは仕様書 Section 11, 14 を参照

## ファイル構成の原則
- 計算ロジック（utils/calc.js）とUIは分離
- 作物データ（data/cropData.js）は独立ファイル
- 各計算モードは個別コンポーネント
