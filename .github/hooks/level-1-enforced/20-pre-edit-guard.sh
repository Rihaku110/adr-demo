#!/usr/bin/env bash
set -euo pipefail

# ==========================================
# 目的:
# ファイル編集が開始されたことを記録する
# 将来的には「危険な変更の事前ブロック」に使う
# ==========================================

mkdir -p .tmp/adr-hook

date '+%Y-%m-%d %H:%M:%S' > .tmp/adr-hook/edit-started-at.txt

echo "[ADR Guard] 編集開始を検知しました。ADRチェック対象になります。"

exit 0