# ADR Demo

このリポジトリは、ADR（Architecture Decision Record）を段階的に強制する仕組みのデモです。

---

## 構成

```text
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
```

---

## Level 0: ADRの導入

`adrs/` ディレクトリを作成し、ADRを手動で作成する段階です。

この時点では「ADRを書く」というルールはありますが、強制力はありません。

---

## Level 1: ローカルでの促し（Hook + AI）

開発者やAIに対して、ADR作成を促す段階です。

### Hook

Hookやスクリプトを使って、ローカルでADR作成を促します。

- タスク開始時にADR作成を通知
- ADRが存在するかをローカルで確認

👉 開発者に「ADRを書く必要がある」ことを気づかせる

---

### Copilot Instructions

`.github/copilot-instructions.md` により、AIにルールを教えます。

- すべての設計・実装タスクでADRを作成するよう指示
- 必須セクション（Decision / Rationale / Alternatives）を定義

👉 AIの思考レベルでルールを共有する

---

### Skills（adr-writer）

`.github/skills/adr-writer/` により、AIの行動を補助します。

- コード変更時にADR作成を促す
- ADRファイル生成を支援

👉 AIが自動でADRを作成する動きを補助

---

## Level 1.5: CI + Branch Protectionによる強制

GitHub Actions と Branch Protection を組み合わせて、ADR作成をマージ条件として強制します。

---

### CI（GitHub Actions）

対象ファイル:

```text
.github/workflows/adr-gate.yml
```

PR作成時に自動でチェックを実行します。

コード変更がある場合の判定:

```text
新しいADRがない → ❌ 失敗
新しいADRがある → ✅ 成功
```

👉 ルール違反を確実に検知

---

### Branch Protection

`master` ブランチに対して以下を必須化します。

- Pull Request 必須
- `adr-gate` の成功必須
- レビュー承認必須

👉 条件を満たさない限りマージ不可

---

## 動作イメージ

### ADRがない場合

```text
コード変更
↓
新規ADRなし
↓
CI失敗
↓
🚫 マージ不可
```

### ADRがある場合

```text
コード変更
↓
新規ADR追加
↓
CI成功
↓
レビュー承認
↓
✅ マージ可能
```

---

## まとめ

| レベル | 内容 |
|------|------|
| Level 0 | ADRルールを導入する |
| Level 1 | Hook + AIでADR作成を促す |
| Level 1.5 | CI + Branch ProtectionでADR作成を強制する |

---

## 全体設計の考え方

この仕組みは以下の3層で構成されています。

```text
AI（Copilot Instructions / Skills）
↓
開発者（Hook）
↓
システム（CI + Branch Protection）
```

- AI：ADR作成を自然に誘導
- 開発者：作業中に気づく
- システム：違反を防ぐ

👉 「促して、最終的に強制する」設計

---

## このデモで確認できること

- コード変更だけのPRはCIで失敗する
- 新規ADRを追加するとCIが成功する
- `adr-gate` が必須チェックとして機能する
- レビュー承認がないとマージできない
- AIがADR作成を補助する
- ADR作成とレビューを組み合わせた開発フローを構築できる