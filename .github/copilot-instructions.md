---
applyTo: "**"
---

## ADRルール

アプリケーションコードを変更する場合は、必ず同じ変更内でADRを作成してください。  
When making changes to application code, you must include an ADR in the same change.

---

### ■ ADRが必要な変更 / When ADR is required

以下の変更にはADRが必要です。  
ADR is required for changes to:

- react-app/src/**
- src/**
- package.json
- package-lock.json
- vite.config.js
- eslint.config.js

---

### ■ 必須ルール / Requirements

コード変更を行う場合は、同じPull Request内にADRを含めてください。  
Include the ADR in the same pull request as the code change.