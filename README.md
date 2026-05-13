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

## 🧭 Level 0: ADRの導入

adrs/ ディレクトリを作成し、ADRを手動で作成する段階です。

- ADRを書くルールはある
- ただし強制力はない

---

## 🤖 Level 1: ローカルでの促し（Hook + AI）

開発者やAIに対して、ADR作成を促す段階です。

### 🔧 Hook

- タスク開始時にADR作成を通知
- ADRの存在チェックを実行

👉 開発者に「ADRを書く必要がある」ことを気づかせる

---

### 🧠 Copilot Instructions

.github/copilot-instructions.md によりAIにルールを伝えます。

- コード変更時はADRを作成するよう指示
- 同一PR内でADRを含めるよう指示
- 必須セクション（Decision / Rationale / Alternatives）を定義

👉 AIが自然に「コード変更 + ADR作成」を行うよう誘導

---

### 🧩 Skills（adr-writer）

- コード変更時にADR作成を補助
- ADRファイル生成を支援

👉 AIの自動生成を強化

---

## 🚧 Level 1.5: CI + Branch Protectionによる強制

GitHub Actions と Branch Protection を組み合わせて  
**コード変更とADRを同一PRで提出することを強制**します。

---

### ⚙️ CI（GitHub Actions）

対象ファイル：

.github/workflows/adr-gate.yml

PR作成時に自動でチェックが実行されます。

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
- 今回の変更に含まれている必要がある
- 必ず同じPull Requestに含める

---

### 🔒 Branch Protection

master ブランチに対して以下を必須化：

- Pull Request 必須
- adr-gate 成功必須
- レビュー承認必須

👉 条件を満たさない限りマージ不可

---

## 📊 まとめ

| レベル | 内容 |
|--------|------|
| Level 0 | ADRルールを導入 |
| Level 1 | Hook + AIでADR作成を促す |
| Level 1.5 | CI + Branch ProtectionでADRを同一PRで強制 |

---

## 🏗️ 全体設計の考え方

この仕組みは以下の3層で構成されています。

AI（Copilot Instructions / Skills）
↓
開発者（Hook）
↓
システム（CI + Branch Protection）

- AI：ADR作成を自然に誘導
- 開発者：作業中に気づく
- システム：ルール違反を確実に防ぐ

👉 「促して、最終的に強制する」設計

---

## ✅ このデモで確認できること

- コード変更のみのPRはCIで失敗する
- ADRを同一PRに含めるとCIが成功する
- adr-gate が必須チェックとして機能する
- レビュー承認がないとマージできない
- AIがADR作成を補助する
- ADRとコード変更を一体化した開発フローを構築できる