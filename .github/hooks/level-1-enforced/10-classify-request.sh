#!/usr/bin/env bash
set -euo pipefail

# ==========================================
# 目的:
# ユーザー依頼を変更種別ごとに分類し、
# 使用すべきSkillをAgentに案内する
#
# 注意:
# このHookでは実装を止めない。
# あくまで分類とSkill誘導のみを行う。
# ==========================================

STATE_DIR=".tmp/adr-hook"
mkdir -p "$STATE_DIR"

cat > "$STATE_DIR/classification-guide.txt" <<'EOF'
変更分類と使用Skill:

UI_CHANGE
- 画面、色、レイアウト、コンポーネント変更
- Use: .github/skills/ui-change/SKILL.md

API_CHANGE
- endpoint、request、response、認証、認可変更
- Use: .github/skills/api-change/SKILL.md

CONFIG_CHANGE
- CI/CD、workflow、build、deploy、環境設定変更
- Use: .github/skills/config-change/SKILL.md

DEPENDENCY_CHANGE
- package.json、lockfile、ライブラリ追加/削除/更新
- Use: .github/skills/dependency-change/SKILL.md

DATA_SCHEMA_CHANGE
- DB、schema、migration、型、保存データ構造変更
- Use: .github/skills/data-schema-change/SKILL.md

BEHAVIOR_CHANGE
- 仕様、条件分岐、バリデーション、エラー処理、挙動変更
- Use: .github/skills/behavior-change/SKILL.md

TEST_CHANGE
- テスト追加、修正、mock、fixture、snapshot変更
- Use: .github/skills/test-change/SKILL.md

DOCS_CHANGE
- README、docs、コメント、手順書変更
- Use: .github/skills/docs-change/SKILL.md

共通:
- すべてのコード変更はまず .github/skills/code-change/SKILL.md を使用する
- ADR要否判断は .github/skills/adr-decision/SKILL.md を使用する
- ADR作成が必要な場合は .github/skills/adr-writer/SKILL.md を使用する
EOF

echo ""
echo "[Classifier] 変更分類を行ってください。"
echo ""
echo "まず使用:"
echo "  .github/skills/code-change/SKILL.md"
echo ""
echo "分類ごとの子Skill:"
echo "  UI_CHANGE          -> .github/skills/ui-change/SKILL.md"
echo "  API_CHANGE         -> .github/skills/api-change/SKILL.md"
echo "  CONFIG_CHANGE      -> .github/skills/config-change/SKILL.md"
echo "  DEPENDENCY_CHANGE  -> .github/skills/dependency-change/SKILL.md"
echo "  DATA_SCHEMA_CHANGE -> .github/skills/data-schema-change/SKILL.md"
echo "  BEHAVIOR_CHANGE    -> .github/skills/behavior-change/SKILL.md"
echo "  TEST_CHANGE        -> .github/skills/test-change/SKILL.md"
echo "  DOCS_CHANGE        -> .github/skills/docs-change/SKILL.md"
echo ""
echo "ADR判断:"
echo "  .github/skills/adr-decision/SKILL.md"
echo ""
echo "ADR作成:"
echo "  .github/skills/adr-writer/SKILL.md"
echo ""

exit 0