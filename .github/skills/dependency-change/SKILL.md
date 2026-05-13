---
name: dependency-change
description: 依存関係変更を安全に実施する
---

# Dependency Change

## 親Skill

このSkillは以下の親Skillから呼び出される。

- `.github/skills/code-change/SKILL.md`

## 目的

ライブラリ追加・削除・更新時に、影響範囲・安全性・代替案・ADR要否を確認しながら実装する。

## 使用タイミング

- `package.json` を変更する
- lockfileを変更する
- ライブラリを追加する
- ライブラリを削除する
- ライブラリを更新する
- 既存ライブラリを別のものに置き換える

## 変更前に確認すること

- なぜ依存関係を変更するのか
- 既存機能で代替できないか
- 追加するライブラリの用途は明確か
- メンテナンス状況に問題ないか
- セキュリティリスクはないか
- ライセンス上の問題はないか
- bundle sizeや性能に影響するか

## 実装手順

1. 変更理由を整理する
2. 代替案を確認する
3. dependency / devDependency のどちらか判断する
4. 依存関係を追加・更新・削除する
5. lockfileを更新する
6. 既存コードへの影響を確認する
7. build / test を実行する
8. ADR要否を判断する

## ADRが必要なケース

- 新しい主要ライブラリを導入する
- 既存ライブラリを置き換える
- アプリ全体に影響する依存関係を変更する
- build / runtimeに影響する依存関係を変更する
- 複数候補から1つのライブラリを選定した
- セキュリティや保守性に関わる判断がある

## ADR不要なケース

- patch version の軽微な更新
- devDependency の小さな更新
- 未使用ライブラリの削除
- lockfileの整合性修正のみ

## テスト観点

- installが成功する
- buildが通る
- testが通る
- import / require が正しく動作する
- bundle sizeが極端に悪化していない
- 既存機能が壊れていない

## 完了条件

- 依存関係変更の理由が明確
- lockfileが整合している
- build / test が通る
- ADRが必要な場合は作成済み
- ADR Gateを通過できる