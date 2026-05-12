# ADR Demo

このリポジトリは、ADR（Architecture Decision Record）を段階的に強制する仕組みのデモです。

---

## 構成

```text
.github/
  workflows/
    adr-gate.yml
  hooks/
adrs/
react-app/
README.md
```

---

## Level 0: ADRの導入

`adrs/` ディレクトリを作成し、ADRを手動で作成する段階です。

この時点では「ADRを書く」というルールはありますが、強制力はありません。

---

## Level 1: ローカルでの促し（Hook）

Hookやスクリプトを使って、開発者にADR作成を促す段階です。

主な役割は以下です。

* タスク開始時にADR作成を促す
* ADRが存在するかをローカルで確認する
* 開発者に「ADRを書く必要がある」ことを認識させる

---

## Level 1.5: CI + Branch Protectionによる強制

GitHub Actions と Branch Protection を組み合わせて、ADR作成をマージ条件として強制します。

### CI（GitHub Actions）

対象ファイル:

```text
.github/workflows/adr-gate.yml
```

PR作成時に自動でチェックを実行します。

コード変更がある場合の判定は以下です。

```text
新しいADRがない → 失敗
新しいADRがある → 成功
```

### Branch Protection

`master` ブランチに対して以下を必須化します。

* Pull Request 必須
* `adr-gate` の成功必須
* レビュー承認必須

これにより、CI結果とレビュー条件を満たさない限りマージできません。

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
マージ不可
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
マージ可能
```

---

## まとめ

| レベル       | 内容                                |
| --------- | --------------------------------- |
| Level 0   | ADRルールを導入する                       |
| Level 1   | HookでADR作成を促す                     |
| Level 1.5 | CI + Branch ProtectionでADR作成を強制する |

---

## このデモで確認できること

* コード変更だけのPRはCIで失敗する
* 新規ADRを追加するとCIが成功する
* `adr-gate` が必須チェックとして機能する
* レビュー承認がないとマージできない
* ADR作成とレビューを組み合わせた開発フローを構築できる
