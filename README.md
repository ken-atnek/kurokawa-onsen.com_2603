This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Architecture (黒川温泉観光協会 仕様メモ)

### Static Export 運用

- `next.config.ts` で `output: 'export'` を使用
- `trailingSlash: true`
- 画像は `images: { unoptimized: true }`
- サーバーは `/2603/` 配下へ内部Rewrite

### public/db 運用方針

- `public/db` は管理画面（DB）によって生成・更新される
- JSON の追加・更新は **ビルド不要で即反映**
- データはクライアント側 `fetch('/db/...')` で取得

### 店舗詳細ページ設計

- 動的ルート `/shops/[id]/` は静的export制約あり
- 店舗IDが増減するため、詳細は **クライアントfetch方式**で描画
- `/db/shops/details/{id}.json` を `no-store` で取得

### 注意点

- `generateStaticParams()` は export時に実行される
- ビルド後に増えたIDは静的HTMLとしては存在しない
- URLを増減させたい場合は設計変更が必要

---

※ このプロジェクトは「静的HTML + クライアントデータ取得」構成で運用する。
