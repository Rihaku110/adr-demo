---
name: code-change
description: 変更分類に応じて適切なSkillを選び、安全に実装する
---

# Code Change

## 🧭 目的

ユーザー依頼を変更種別ごとに整理し、適切なSkillを選択して安全に実装する。

---

## 🧩 このSkillの役割（重要）

このSkillは「親Skill」として動作し、  
変更内容に応じて以下の子Skillを選択・実行する。

---

## 📂 子Skill一覧（変更分類）

### UI変更

使用Skill:

- `.github/skills/ui-change/SKILL.md`

対象例:

- 画面表示の変更
- 色・レイアウト・スタイル変更
- コンポーネント変更

---

### API変更

使用Skill:

- `.github/skills/api-change/SKILL.md`

対象例:

- APIエンドポイント追加/変更
- request / response変更
- 認証・認可変更

---

### 設定 / CI / Workflow変更

使用Skill:

- `.github/skills/config-change/SKILL.md`

対象例:

- `.github/workflows/` の変更
- build / deploy 設定変更
- lint / formatter / 環境設定変更

---

### 依存関係変更

使用Skill:

- `.github/skills/dependency-change/SKILL.md`

対象例:

- package.json変更
- ライブラリ追加/削除/更新

---

### データ / スキーマ変更

使用Skill:

- `.github/skills/data-schema-change/SKILL.md`

対象例:

- DB schema変更
- migration追加
- 型定義変更

---

### 挙動変更

使用Skill:

- `.github/skills/behavior-change/SKILL.md`

対象例:

- ロジック変更
- バリデーション変更
- エラー処理変更

---

### テスト変更

使用Skill:

- `.github/skills/test-change/SKILL.md`

対象例:

- テスト追加/修正

---

### ドキュメント変更

使用Skill:

- `.github/skills/docs-change/SKILL.md`

対象例:

- README変更
- docs更新

---

## 📌 実行手順

### 1. 変更内容を整理する

- 何を変更するか
- なぜ変更するか
- 影響範囲

---

### 2. 変更分類を決定する

`classify-request` の結果を確認し、  
該当する子Skillを1つ選択する。

---

### 3. 子Skillを実行する

対応するSkillに従って作業を行う。

---

### 4. ADR要否を判断する

以下のSkillを使用：

- `.github/skills/adr-decision/SKILL.md`

---

### 5. 実装する

- 必要最小限の変更を行う
- 不要な差分を含めない

---

### 6. ADRを書く（必要な場合）

以下のSkillを使用：

- `.github/skills/adr-writer/SKILL.md`

---

### 7. 最終確認

- 変更内容とADRが一致しているか
- ADRが必要な変更に対して記録があるか
- ADR Gateを通過できるか

---

## ⚠️ 注意事項

- 子Skillを使わずに直接実装しない
- ADRが必要な変更は記録なしで行わない
- 作業完了前に必ずADR Gateを通す

---

## ✅ 完了条件

- 適切な子Skillが使用されている
- 変更が安全に実装されている
- ADRが必要な場合、作成されている