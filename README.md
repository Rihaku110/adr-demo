# ADR Demo

このリポジトリは、ADR（Architecture Decision Record）を**最小構成で強制する仕組み**のデモです。

---

## 構成

```
ADR-DEMO/
  adrs/
    adr-brief.md
    0001-...
    0002-...
    ...
  level-1-enforced/
    hook-adr-reminder.json
    gate-adr-check.sh
  react-app/
  README.md
```

---

## Level 0: ADRの導入

* `adrs/` ディレクトリを作成
* `adr-brief.md` テンプレートを配置
* ADRを手動で作成

👉 ルールはあるが、強制力はない

---

## Level 1: ADR強制レイヤー

Level 1では、ADR作成を忘れないようにするため、以下の2つを追加する。

```
level-1-enforced/
  hook-adr-reminder.json
  gate-adr-check.sh
```

### 役割

| ファイル                   | 役割                           |
| ---------------------- | ---------------------------- |
| hook-adr-reminder.json | タスク開始時に「ADRを作成せよ」と通知する       |
| gate-adr-check.sh      | タスク完了時にADRの存在を検証し、未作成なら失敗させる |

---

### ゲート確認方法

プロジェクトルートで実行：

```bash
bash level-1-enforced/gate-adr-check.sh dir adrs
```

---

### 判定結果

#### ADRがある場合

```
[ADRゲート] PASS — adrsにADR ○件が存在
```

#### ADRがない場合

```
[ADRゲート] FAIL — adrsにADRファイルがありません
タスク完了前にADRを作成してください。
```

---

### 判定ルール

* `adrs/` 配下の `.md` ファイルをカウント
* ただし以下は除外：

  * `adr-brief.md`
  * `adr-detailed.md`

👉 実ADRは以下のように作成する：

```
adrs/0008-fix-hero-wrap-and-status-value-clipping.md
```

---

## まとめ

* Level 0：ADRを書くルールがある
* Level 1：ADRがないとタスク完了できない

👉 Hookで促し、Gateで強制することで運用を成立させる
test
update
