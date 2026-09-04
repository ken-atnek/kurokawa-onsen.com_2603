# 外部プレイブック参照ルール

React / Next.js と Sass / CSS の実装判断で迷う場合は、必要に応じて以下の共通プレイブックを参照する。
プロジェクト固有ルールと矛盾する場合は、このプロジェクトの `AGENTS.md` と `docs/rules/` を優先する。

---

## React / Next.js

参照先:

`/Users/ken/site_data/__react-nextjs-playbook/`

優先して確認するファイル:

1. `README.md`
2. `troubleshooting.md`
3. `patterns.md`
4. `articles/README.md`
5. `articles/`

主な確認観点:

- Suspense の分割単位
- 入力や絞り込みが重い場合の `useDeferredValue` / `useTransition`
- 楽観的更新の採用可否
- タブやステップUIの状態保持
- Next.js / React のバージョン差による採用可否

---

## Sass / CSS

参照先:

`/Users/ken/site_data/__sass-css-playbook/`

優先して確認するファイル:

1. `README.md`
2. `layout.md`
3. `responsive.md`
4. `troubleshooting.md`
5. `animation.md`
6. `articles/README.md`
7. `articles/`

主な確認観点:

- レイアウトの責務分離
- Flex / Grid の使い分け
- 固定幅より制約で管理する方針
- SPでの情報順序と密度
- 横スクロール、重なり、余白ズレの原因確認
- アニメーションの必要性と強さ

---

## 運用メモ

- 外部プレイブックは判断材料として使い、内容をそのまま機械的に反映しない
- 既存コードへ自然に組み込める最小修正を優先する
- 新しい抽象化や構造変更が必要そうな場合は、先に影響範囲を整理する
