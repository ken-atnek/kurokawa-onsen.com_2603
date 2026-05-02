## プロジェクト方針（共通テンプレ）

このプロジェクトは **静的HTML（Next export） + クライアントでJSON取得** を基本方針とする。  
目的は「共有サーバー/FTP運用でも安定」「DB更新を即反映」「ビルド頻度を下げる」。

---

## 技術スタック

- Next.js（App Router）
- TypeScript
- SCSS（Sass）
- `next.config.ts` 運用

---

## 開発セットアップ

### 初期セットアップ

```bash
npx create-next-app@latest . --typescript
# App Router: Yes
```

### 開発依存（devDependencies）

```bash
npm install -D prettier sass stylelint stylelint-config-standard-scss stylelint-scss rimraf cross-env
```

---

## next.config.ts（基本）

静的運用の前提：

- `output: 'export'`
- `trailingSlash: true`（`/xxx/` + `index.html` 形式）

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

## コーディング規約

### 命名

- SCSS：ケバブケース（クラス/変数/ミックスイン）
- TSX：キャメルケース / パスカルケース

### ルール

- 余計なリファクタをしない（仕様変更は最小単位で）
- 変更は “意図” と “影響範囲” が分かる形で行う

---

## 運用設計（重要）

### 1) 静的exportの意味

`output: 'export'` は **サーバーで動くアプリではなく、静的ファイル配信**。  
そのため「URLとして存在するページ」は **ビルド時に生成されたHTMLのみ**。

- ✅ 静的ページ：`out/.../index.html`
- ❌ ビルド後に増えたIDの新規ページは勝手に生えない（404になる）

---

## public/db 方針（重要）

### データはDB（管理画面）が生成する前提

- `public/db` は管理画面（DB）で生成・更新される
- JSONの内容更新は **ビルド不要で即反映**したい
- そのため、**データ取得はクライアント fetch を基本**にする

### 取得ルール

- `fetch('/db/...')` を使用
- 基本は `cache: 'no-store'`
- 必要なら `?t=timestamp` でキャッシュ回避

例：

```ts
fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' });
```

---

## ルーティング設計（超重要）

### 目的：ID増減に強い設計

管理画面でIDが増減する運用では、次のどちらかに寄せる。

### 推奨A：詳細は「固定ページ + クエリ（または固定ルート）」

例：

- `/shops/detail?id=006`

メリット：

- 詳細ページHTMLは **1枚だけ**
- ID増減でも 404 が起きにくい
- export運用と相性が良い

---

### 非推奨：`/shops/[id]/` を ID増減の入口にする

- `/shops/[id]/` は exportだと **ビルド時点のidしか生成できない**
- ビルド後に増えたidはページファイルが無いので404になる

※ 既存資産として残すのはOKだが、**増減前提の正規導線にはしない**。

---

## Next 16.x params の扱い（注意）

Next.js 16 では `params` が Promise 扱いになり、同期アクセスでエラーになる場合がある。

エラー例：

- `params` is a Promise and must be unwrapped with `await` or `React.use()`

対応方針：

- page 側で `await params` を許可する（必要な箇所のみ）

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

## generateMetadata / generateStaticParams

### 原則

- `generateMetadata` は同期
- `generateStaticParams` は同期
- export運用で async を増やさない

※ ただし「ID増減に強い運用」を採用する場合、`generateStaticParams` への依存自体を減らす。

---

## クライアント描画の基本

- 詳細ページは Client Component で JSON を fetch して描画
- 表示コンポーネント（Header / Info / Products など）はできるだけ使い回す
- 表示条件は「DBの値」を基準にする（例：onlineProductsCount）

例：

- `onlineProductsCount === 0` の時はオンライン商品セクションを表示しない

---

## サーバー側（.htaccessなど）注意

- 内部Rewriteで配下ディレクトリに寄せる場合、URL末尾 `/` の挙動が揺れることがある
- export + trailingSlash 運用では **`/xxx/` を正規URL**に寄せるのが基本

---

## 禁止事項（このプロジェクトの地雷）

- Server Component で `fs` 読み込みして “ビルド焼き込み前提” に戻すこと（DB即反映が崩れる）
- ID増減前提なのに `/shops/[id]/` に依存する導線を作ること
- 余計なリファクタ（命名/構造の大改造）を勝手に入れること

---

## チェックリスト

- [ ] output: 'export'
- [ ] trailingSlash: true
- [ ] データは public/db をクライアント fetch
- [ ] ID増減は固定ページ方式で吸収
- [ ] オプション値（countなど）は undefined 安全に扱う（`?? 0`）
- [ ] Mixed Content（http→https）対策を入れる（URLは https 前提）
