---
name: adr-writer
description: React変更時にADRを作成する
metadata:
  author: you
  version: "1.0"
---

# ADR Writer

Reactアプリのコード変更時に、必ずADRを作成する。

## ルール
- コードを変更したら `adrs/` にADRを追加する
- ファイル名は `NNNN-title.md`
- 4桁連番にする

## 必須項目
- 決定
- 根拠
- 代替案

## 指示
コードを変更する際は、以下を実施せよ。

1. UI文言が曖昧でないか確認
2. 必要なら文言を修正
3. `adrs/` にADRを追加
4. 最小差分で変更する