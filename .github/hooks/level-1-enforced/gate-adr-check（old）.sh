#!/bin/bash
set -euo pipefail

# gate-adr-check.sh — ADR存在有無の検証（最小ゲート）
#
# 3つのモードをサポートする。プロジェクトの状況に合わせて選択。
#
# 使い方:
#   Mode 1（ディレクトリ検査）: bash gate-adr-check.sh dir <adrs-dir>
#   Mode 2（直近コミット検査）: bash gate-adr-check.sh commit <adrs-dir> [n-commits]
#   Mode 3（ブランチ比較）:     bash gate-adr-check.sh branch <base> <head> <adrs-dir>
#
# Mode 1: ADRディレクトリに.mdファイルが1つ以上あるか確認（git不要）
# Mode 2: 直近N件のコミットにADRファイルが含まれているか確認
# Mode 3: 2つのブランチ間のdiffでADRパスがあるか確認（元システム互換）

MODE="${1:?使い方: gate-adr-check.sh <dir|commit|branch> ...}"

case "$MODE" in
  dir)
    # ─── Mode 1: ディレクトリにADRファイルがあるか確認（git不要） ───
    ADR_DIR="${2:?使い方: gate-adr-check.sh dir <adrs-dir>}"

    # テンプレートファイルは除外し、実際のADRのみカウント
    ADR_COUNT=$(find "$ADR_DIR" -name '*.md' \
      -not -name 'adr-brief.md' -not -name 'adr-detailed.md' \
      2>/dev/null | wc -l | tr -d ' ')

    if [ "$ADR_COUNT" -gt 0 ]; then
      echo "[ADRゲート] PASS — ${ADR_DIR}にADR ${ADR_COUNT}件が存在"
      exit 0
    else
      echo "[ADRゲート] FAIL — ${ADR_DIR}にADRファイルがありません"
      echo "  タスク完了前にADRを作成してください。"
      exit 1
    fi
    ;;

  commit)
    # ─── Mode 2: 直近N件のコミットにADRが含まれているか確認 ───
    ADR_DIR="${2:?使い方: gate-adr-check.sh commit <adrs-dir> [n-commits]}"
    N="${3:-1}"

    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
      echo "[ADRゲート] gitリポジトリではありません。スキップします。"
      exit 0
    fi

    CHANGED=$(git diff --name-only "HEAD~${N}" HEAD 2>/dev/null || echo "")

    if echo "$CHANGED" | grep -q "$ADR_DIR"; then
      ADR_COUNT=$(echo "$CHANGED" | grep -c "$ADR_DIR" || true)
      echo "[ADRゲート] PASS — 直近${N}件のコミットにADR ${ADR_COUNT}件を含む"
      exit 0
    else
      echo "[ADRゲート] FAIL — 直近${N}件のコミットにADRがありません"
      echo "  タスク完了前にADRを作成してコミットしてください。"
      exit 1
    fi
    ;;

  branch)
    # ─── Mode 3: ブランチ比較（元システム互換） ───
    BASE="${2:?使い方: gate-adr-check.sh branch <base> <head> <adrs-dir>}"
    HEAD_BRANCH="${3:?使い方: gate-adr-check.sh branch <base> <head> <adrs-dir>}"
    ADR_DIR="${4:?使い方: gate-adr-check.sh branch <base> <head> <adrs-dir>}"

    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
      echo "[ADRゲート] gitリポジトリではありません。スキップします。"
      exit 0
    fi

    CHANGED=$(git diff --name-only "${BASE}...${HEAD_BRANCH}" 2>/dev/null || echo "")

    if echo "$CHANGED" | grep -q "$ADR_DIR"; then
      ADR_COUNT=$(echo "$CHANGED" | grep -c "$ADR_DIR" || true)
      echo "[ADRゲート] PASS — ADR ${ADR_COUNT}件を発見"
      exit 0
    else
      echo "[ADRゲート] FAIL — ADRファイルがありません"
      echo "  タスク完了前にADRを作成してください。"
      exit 1
    fi
    ;;

  *)
    echo "不明なモード: $MODE"
    echo "使い方: gate-adr-check.sh <dir|commit|branch> ..."
    exit 1
    ;;
esac