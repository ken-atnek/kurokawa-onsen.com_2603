# プロジェクト方針（共通テンプレ）

このプロジェクトは **静的HTML（Next export） + クライアントでJSON取得** を基本方針とする。  
目的は **「共有サーバー/FTP運用でも安定」「DB更新を即反映」「ビルド頻度を下げる」** こと。

詳細ルールは `docs/rules/` を参照すること（本ファイルは全体方針の要約）。

---

# 技術スタック

- Next.js（App Router）
- TypeScript
- SCSS（Sass）
- `next.config.ts` 運用

---

# 開発セットアップ

## 初期セットアップ

```bash
npx create-next-app@latest . --typescript
# App Router: Yes
```

## 開発依存（devDependencies）

```bash
npm install -D prettier sass stylelint stylelint-config-standard-scss stylelint-scss rimraf cross-env
```

---

# next.config.ts（基本）

静的運用の前提：

- `output: 'export'`
- `trailingSlash: true`（`/xxx/` + `index.html` 形式）
- `images: { unoptimized: true }`

例：

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

---

# コーディング規約

## 命名

- SCSS：ケバブケース（クラス / 変数 / ミックスイン）
- TS / TSX：キャメルケース / パスカルケース

## 基本ルール

- 余計なリファクタをしない
- 仕様変更は最小単位で行う
- 変更は「意図」と「影響範囲」が分かる形で行う
- 依頼された範囲だけを修正する
- 依頼範囲外の改善案は、実装せず提案に留める

---

# 返答ルール

- 修正コードは **コピペしやすい完成形** で提示すること
- **diff形式（`+` / `-`）は使わないこと**
- 必要な箇所だけを出すこと
- 依頼がない限り、複数ファイルをまとめて大きく変更しないこと
- まず「どこを直すか」「何を直すか」が分かる説明を添えること
- 命名変更・責務分割・構造変更などを伴う場合は、勝手に実装せず先に提案すること

---

# 既存構成の尊重

- 既存のディレクトリ構成・命名・責務分割を基本的に尊重すること
- 新しい抽象化、共通化、hooks化、utils化は、明示依頼がある場合のみ行うこと
- 保守性向上を目的とした提案はしてよいが、勝手に実装しないこと
- 現在の運用との整合性を優先すること

---

# 運用設計（重要）

## 1) 静的exportの意味

`output: 'export'` は **サーバーで動くアプリではなく、静的ファイル配信** を意味する。  
そのため、URLとして存在するページは **ビルド時に生成されたHTMLのみ** である。

- ✅ 静的ページ：`out/.../index.html`
- ❌ ビルド後に増えたIDの新規ページは勝手に生えない（404になる）

---

# public/db 方針（重要）

## データはDB（管理画面）が生成する前提

- `public/db` は管理画面（DB）で生成・更新される
- JSONの内容更新は **ビルド不要で即反映** したい
- そのため、**データ取得はクライアント fetch を基本** とする

## 取得ルール

- `fetch('/db/...')` を使用する
- 基本は `cache: 'no-store'`
- 必要なら `?t=timestamp` を付けてキャッシュ回避する

例：

```ts
fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' });
```

---

# ルーティング設計（超重要）

## 目的：ID増減に強い設計

管理画面でIDが増減する運用では、次のどちらかに寄せる。

## 推奨A：詳細は「固定ページ + クエリ（または固定ルート）」

例：

- `/shops/detail?id=006`

メリット：

- 詳細ページHTMLは **1枚だけ**
- ID増減でも 404 が起きにくい
- export運用と相性が良い

## 非推奨：`/shops/[id]/` を ID増減の入口にする

- `/shops/[id]/` は exportだと **ビルド時点のidしか生成できない**
- ビルド後に増えたidはページファイルが無いので404になる

※ 既存資産として残すのはOKだが、**増減前提の正規導線にはしないこと**

---

# Next 16.x params の扱い（注意）

Next.js 16 では `params` が Promise 扱いになり、同期アクセスでエラーになる場合がある。

エラー例：

- `params` is a Promise and must be unwrapped with `await` or `React.use()`

対応方針：

- 必要な箇所のみ `await params` を使う
- 不要に複雑化させない

例：

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>{id}</div>;
}
```

---

# generateMetadata / generateStaticParams

## 原則

- `generateMetadata` / `generateStaticParams` は不要に複雑化させないこと
- export運用では、ビルド時依存の実装を増やしすぎないこと
- ID増減に強い運用を優先し、`generateStaticParams` への過度な依存を避けること

---

# クライアント描画の基本

- 詳細ページは Client Component で JSON を fetch して描画する
- 表示コンポーネント（Header / Info / Products など）はできるだけ使い回す
- 表示条件は **DBの値** を基準にする
- クエリ `id` が無い場合は描画しない（`null`返却など）で安全に処理する

例：

- `onlineProductsCount === 0` の時はオンライン商品セクションを表示しない

## fetchエラー時の扱い（ec-spice準拠の最小運用）

- 管理画面連動のコンテンツJSONは `fetch(..., { cache: 'no-store' })` を使う
- 失敗時は握りつぶさず、`isError` 等で画面にエラー表示できる状態を持つ
- 必要なら `?t=timestamp` を付けてキャッシュ影響を避ける

---

# サーバー側（.htaccessなど）注意

- 内部Rewriteで配下ディレクトリに寄せる場合、URL末尾 `/` の挙動が揺れることがある
- export + trailingSlash 運用では **`/xxx/` を正規URL** に寄せるのが基本

---

# 禁止事項（このプロジェクトの地雷）

- Server Component で `fs` を使ってデータを直接読み込まないこと  
  理由：ビルド時に内容が焼き込まれ、DB更新が即時反映されなくなるため

- IDの増減を前提としない固定的な `/shops/[id]/` 依存の導線を勝手に追加しないこと  
  理由：運用変更やデータ追加時に破綻しやすいため

- 命名変更、責務分割、構造変更などの大きなリファクタを勝手に行わないこと  
  理由：現在は保守性よりも既存運用との整合性を優先しているため

- 変更は依頼された範囲のみに限定すること  
  依頼範囲外の改善提案は、実装せず提案止まりにすること

---

# Git運用ルール

- 新しいブランチを勝手に作成しないこと
- `git checkout` `git switch` `git branch` `git worktree` を勝手に実行しないこと
- commit / push は明示依頼があるときだけ行うこと
- Git操作を伴う提案をする場合は、先に内容を説明すること

---

# 詳細ルール参照

- チェック項目: `docs/rules/checklist.md`
- コーディング規約: `docs/rules/coding-style.md`
- データ取得: `docs/rules/fetch-pattern.md`
- export運用: `docs/rules/nextjs-export.md`
- プロジェクト前提: `docs/rules/project-setup.md`
- UI実装: `docs/rules/ui-interactions.md`
