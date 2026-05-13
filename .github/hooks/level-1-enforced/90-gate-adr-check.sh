#!/usr/bin/env bash
set -euo pipefail

# ==========================================
# 目的:
# 最終ゲートとしてADRの有無をチェックする
# - 変更内容からADRが必要か判定
# - 必要なのに無ければ停止する
# ==========================================

MODE="${1:-auto}"

case "$MODE" in
  auto)
    ADR_DIR="${2:-adrs}"

    # gitチェック
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
      echo "[ADR Gate] gitリポジトリではありません。スキップ"
      exit 0
    fi

    # 変更ファイル取得
    CHANGED=$(git diff --name-only)
    STAGED=$(git diff --cached --name-only)
    ALL_CHANGED=$(printf "%s\n%s\n" "$CHANGED" "$STAGED" | sort -u)

    if [ -z "$ALL_CHANGED" ]; then
      echo "[ADR Gate] 変更なし → PASS"
      exit 0
    fi

    # ==========================================
    # ADRが必要な変更パターン
    # ==========================================
    ADR_REQUIRED=$(echo "$ALL_CHANGED" | grep -E '^(src/|react-app/src/|app/|lib/|server/|api/|routes/|db/|schema/|infra/|config/|\.github/workflows/|package\.json|package-lock\.json|vite\.config\.js|eslint\.config\.js)' || true)

    # ADR不要パターン
    ADR_EXEMPT=$(echo "$ALL_CHANGED" | grep -E '^(adrs/|README\.md|docs/)|(\.md$)|(\.png$)|(\.jpg$)|(\.svg$)' || true)

    if [ -z "$ADR_REQUIRED" ]; then
      echo "[ADR Gate] ADR不要な変更のみ → PASS"
      exit 0
    fi

    # 今回の変更にADRが含まれるか
    ADR_CHANGED=$(echo "$ALL_CHANGED" | grep -E "^${ADR_DIR}/.*\.md$" || true)

    if [ -n "$ADR_CHANGED" ]; then
      echo "[ADR Gate] ADRを含む変更 → PASS"
      exit 0
    fi

    # 既存ADR確認
    ADR_COUNT=$(find "$ADR_DIR" -name '*.md' \
      -not -name 'adr-brief.md' -not -name 'adr-detailed.md' \
      2>/dev/null | wc -l | tr -d ' ')

    if [ "$ADR_COUNT" -gt 0 ]; then
      echo "[ADR Gate] WARN: ADR必要な変更だが新規ADRなし"
      echo "[ADR Gate] 既存ADR: ${ADR_COUNT}件"
      echo "[ADR Gate] 必要に応じて更新または新規作成を確認"
      exit 0
    fi

    echo ""
    echo "[ADR Gate] ❌ FAIL"
    echo "ADRが必要な変更がありますが、ADRが作成されていません"
    echo ""
    echo "対象ファイル:"
    echo "$ADR_REQUIRED"
    echo ""
    echo "作成例:"
    echo "  ${ADR_DIR}/0001-decision-title.md"
    echo ""

    exit 1
    ;;

  *)
    echo "不明なモード: $MODE"
    exit 1
    ;;
esac