# ADR Demo

このリポジトリは、ADR（Architecture Decision Record）を段階的に導入し、  
最終的に **コード変更とADRを同一のPull Requestで強制する仕組み** のデモです。

---

## 📁 構成

.github/
  workflows/
    adr-gate.yml
  hooks/
  skills/
    adr-writer/
  copilot-instructions.md
adrs/
react-app/
README.md

---

## 🧭 レベル構成

この仕組みは以下の3段階で構成されています。

| レベル | 役割 | 内容 |
|--------|------|------|
| Level 0 | ルールを伝える | AIと開発者にADRルールを共有 |
| Level 1 | 気づかせる | 作業中にADRの必要性を通知 |
| Level 1.5 | 強制する | CIでルール違反をブロック |

---

## 🟢 Level 0: ルールの共有（AI / 人間）

### 対象

- `.github/copilot-instructions.md`
- `.github/skills/adr-writer/`

### 役割

- ADR作成ルールをAIに伝える
- コード変更時にADRを作るよう誘導する

### 特徴

- 強制力なし
- 守らなくても処理は進む
- AIの行動を自然に誘導する

👉 「こうするべき」を共有するレイヤー

---

## 🟡 Level 1: 作業中の気づき（Hook）

### 対象

- `.github/hooks/hooks.json`
- `.github/hooks/level-1-enforced/`

### 役割

- タスク実行中にADRの必要性を通知
- ADRの存在チェックを行う

### 特徴

- 開発中に気づきを与える
- 軽いガードレール
- 基本的にはブロックしない

👉 「今ADR必要では？」と気づかせるレイヤー

---

## 🔴 Level 1.5: CI + Branch Protectionによる強制

### 対象

- `.github/workflows/adr-gate.yml`
- Branch Protection

### 役割

- PR作成時に自動チェック
- ADRがない変更をブロック

---

### 📏 判定ルール

#### ❌ ADRがない場合

- コード変更
- 今回の差分にADRなし
- CI失敗
- マージ不可

---

#### ✅ ADRがある場合

- コード変更
- 同じPRでADR追加
- CI成功
- レビュー承認
- マージ可能

---

### ⚠️ 重要ポイント

- ADRは「存在しているだけ」では不十分
- **今回の変更に含まれている必要がある**
- 必ず同じPull Requestに含める

---

### 🔒 Branch Protection

master ブランチに対して以下を必須化：

- Pull Request 必須
- `adr-gate` 成功必須
- レビュー承認必須

👉 条件を満たさない限りマージ不可

---

## 🏗️ 全体設計の考え方

この仕組みは以下の3層で構成されています。

AI（Instructions / Skills）
↓
開発者（Hook）
↓
システム（CI / Branch Protection）

- AI：ADR作成を自然に誘導
- 開発者：作業中に気づく
- システム：ルール違反を確実に防ぐ

👉 「促して、最終的に強制する」設計

---

## 📊 まとめ

| レベル | 内容 |
|--------|------|
| Level 0 | ルールを共有する |
| Level 1 | ADR作成を促す |
| Level 1.5 | ADRを同一PRで強制する |

---

## ✅ このデモで確認できること

- コード変更のみのPRはCIで失敗する
- ADRを同一PRに含めるとCIが成功する
- `adr-gate` が必須チェックとして機能する
- レビュー承認がないとマージできない
- AIがADR作成を補助する
- ADRとコード変更を一体化した開発フローを構築できる