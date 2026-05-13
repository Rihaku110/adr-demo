---
name: config-change
description: 設定、CI/CD、workflow変更を安全に実施する
---

# Config Change

## 親Skill

このSkillは以下の親Skillから呼び出される。

- `.github/skills/code-change/SKILL.md`

## 目的

設定、CI/CD、workflow、build、deployに関わる変更を安全に実施する。

## 使用タイミング

- `.github/workflows/` を変更する
- build設定を変更する
- deploy設定を変更する
- lint / formatter 設定を変更する
- 環境変数や設定ファイルを変更する
- 開発者全員に影響する設定を変更する

## 変更前に確認すること

- 対象設定ファイルは何か
- ローカル開発環境に影響するか
- CIに影響するか
- deployに影響するか
- secret / env の扱いに影響するか
- 失敗時に何が止まるか

## 実装手順

1. 対象設定ファイルを特定する
2. 現在の設定値と用途を確認する
3. 変更理由を整理する
4. 最小差分で設定を変更する
5. ローカルで確認できるものは確認する
6. CI / workflow の影響を確認する
7. ADR要否を判断する

## ADRが必要なケース

- CI/CDフローを変更する
- deploy方法を変更する
- 品質ゲートを追加・変更する
- 開発者全員に影響する設定を変更する
- secret / env の扱いを変更する
- workflowの責務や実行条件を変更する

## ADR不要なケース

- typo修正
- コメント修正
- 既存設定値の軽微な修正
- ドキュメント更新のみ
- 一時的な検証用変更

## テスト観点

- workflow構文が正しい
- buildが通る
- testが通る
- lintが通る
- deploy条件が意図通り
- 不要なsecret露出がない

## 完了条件

- 設定変更の目的が明確
- CI/CDへの影響が確認されている
- ADRが必要な場合は作成済み
- ADR Gateを通過できる