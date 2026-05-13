#!/usr/bin/env bash
set -euo pipefail

# ==========================================
# 目的:
# 実際に変更されたファイルを記録する
# → ADR要否判定のコアデータ
# ==========================================

mkdir -p .tmp/adr-hook

# 作業ツリー差分
git diff --name-only > .tmp/adr-hook/changed-files.txt

# ステージ差分
git diff --cached --name-only >> .tmp/adr-hook/changed-files.txt

# 重複削除
sort -u .tmp/adr-hook/changed-files.txt -o .tmp/adr-hook/changed-files.txt

echo "[ADR Tracker] 変更ファイル:"
cat .tmp/adr-hook/changed-files.txt || true

exit 0