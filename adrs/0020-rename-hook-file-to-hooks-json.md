# 0020 フック設定ファイルを hooks.json にリネーム

## 決定 (Decision)
`.github/hooks/hook-adr-reminder.json` を `.github/hooks/hooks.json` にリネームする。あわせて README に同フックの利用方法・想定挙動についての説明を追記する。フック定義 (`userPromptSubmitted` の ADR リマインダおよび `postToolUse` の ADR ゲートチェック) の内容自体は変更しない。

## 根拠 (Rationale)
- VS Code / Copilot 側のフック検出規約では、リポジトリ配下の `.github/hooks/hooks.json` が標準のファイル名として扱われる。`hook-adr-reminder.json` という独自名のままだとフックが認識されず、ADR リマインダ・ADR ゲートが発火しない。
- 既存のフック内容（`userPromptSubmitted` でリマインダを出し、`postToolUse` で `gate-adr-check.sh` を起動）はそのまま維持したいので、リネームのみで挙動を保てる本対応が最小コストで望ましい。
- README に説明を追加することで、後続の開発者が「なぜ `hooks.json` という固定ファイル名が必要か」「フックが何をするか」を理解しやすくなり、誤って再リネームされる事故を防げる。

## 代替案 (Alternatives)
- **元のファイル名 `hook-adr-reminder.json` を維持する**: 規約と一致せずフックが起動しないため、ADR ゲートが運用上機能しなくなる。目的（ADR 強制）の達成に失敗するため不採用。
- **`hook-adr-reminder.json` と `hooks.json` の両方を残す**: 二重管理になり、内容が乖離した際にどちらが正かわからなくなる。保守性が下がるため不採用。
- **フック方式をやめて CI (GitHub Actions の adr-gate) のみで強制する**: 既に CI 側の `adr-gate.yml` は併用しているが、ローカル/エディタ操作中の早期フィードバック（リマインダ・即時チェック）が失われ、開発体験が悪化するため不採用。
