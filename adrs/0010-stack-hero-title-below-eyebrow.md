# 0010. ヒーロータイトルを eyebrow の下に縦積みする

- ステータス: 採用
- 日付: 2026-05-04

## 決定

`App.css` の `.hero-title` を `display: inline-block` から `display: block` に変更し、`.eyebrow`（"DATA VISUALIZATION DEMO"）の下に `Insight Charts` が縦積みで表示されるようにする。

## 根拠

- `.eyebrow` も `.hero-title` もどちらもインライン要素として配置されていたため、ヒーローの幅に余裕がある画面では横一列に並んでしまっていた（スクリーンショットの状態）。
- `.hero-title` をブロック要素に戻すことで、eyebrow → title → description の縦構造が固定され、ビューポート幅に依らず意図したヒーローレイアウトを保てる。
- ADR 0007 で `display: inline-block` にしていた理由は「グラデーション文字（`background-clip: text`）の上下見切れ対策」だったが、上下見切れは `line-height: 1.2` と `padding: 0.15em 0.05em` で既に解決済みのため、`inline-block` は不要となっている。

## 代替案

1. **`.eyebrow` の後ろに `<br>` を入れる**: 表示は崩れなくなるが、構造ではなく改行で見た目を整える形になり脆い。CSS で解決すべき。
2. **`.hero` を `display: flex; flex-direction: column;` にする**: 同様の効果は得られるが、現在の `text-align: center` ベースのレイアウトでは過剰な変更。最小差分で目的が達成できる `display: block` を選択。
