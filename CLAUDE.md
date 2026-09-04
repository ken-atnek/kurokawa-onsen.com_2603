# Claude Instructions

作業開始時は必ず以下の順で **全ファイルを読んでから** 作業を開始すること。  
（※ ファイルが存在しない場合はスキップし、存在するファイルを優先して読む）

1. `AGENTS.md`
2. `docs/PAGE_STRUCTURE.md`
3. `docs/rules/tsx-comment-rules.md`（`tsx` 編集時）
4. `docs/rules/scss-comment-rules.md`（`scss` 編集時）
5. `docs/rules/project-setup.md`
6. `docs/rules/coding-style.md`
7. `docs/rules/nextjs-export.md`
8. `docs/rules/fetch-pattern.md`
9. `docs/rules/ui-interactions.md`
10. `docs/rules/component-request-patterns.md`
11. `docs/rules/external-playbooks.md`（React / Next.js、Sass / CSS の判断が必要な時）
12. `docs/rules/checklist.md`
13. `docs/seo/SEO_SETUP.md`
14. `docs/seo/SEO_AUDIT_REQUEST_TEMPLATE.md`
15. `docs/seo/SEO_FIX_TRACKER_TEMPLATE.md`
16. `docs/rules/lessons.md`
17. `docs/review/CLAUDE_REVIEW_REQUEST.md`（外部レビュー依頼時）
18. `docs/review/REVIEW_FIX_TRACKER.md`（外部レビュー反映時）
19. `docs/workflows/claude-review-flow.md`（外部レビュー依頼時）
20. `docs/workflows/claude-to-codex-review-fix-flow.md`（外部レビュー反映時）

## 必須ルール（最優先）

- `next.config.ts` の `output: 'export'` を維持する
- Tailwind CSS は使用しない（SCSSで実装）
- 仕様と異なる実装はしない（仮実装時は明示）
- 既存コードに自然に組み込める最小修正を優先する
