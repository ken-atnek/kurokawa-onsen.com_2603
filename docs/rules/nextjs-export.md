## Next.js export 運用ルール（2603）

このプロジェクトは `output: 'export'` 前提。
ランタイムのサーバー処理に依存しない実装を維持する。

### 必須設定

- `next.config.ts` に `output: 'export'`
- `next.config.ts` に `trailingSlash: true`
- `next.config.ts` に `images: { unoptimized: true }`

### 禁止事項

- `force-dynamic` を使わない
- Server Component で `fs` を使って `public/db` を直接読まない
- ID増減前提の導線を `/shops/[id]/` に依存させない

### ルーティング方針

- ID増減がある詳細ページは「固定ページ + クエリ」を使う
- 例: `/shops/detail?id=006`
- ビルド後に増えるIDでも404になりにくい構成を優先する

### Next.js 16.x `params` の扱い

- `params` が Promise 扱いの箇所は、必要な場所だけ `await params` を使う
- 不要に全体を非同期化しない

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

### `generateMetadata` / `generateStaticParams`

- export運用では、これらへの過度な依存を避ける
- ID増減に強い導線（固定ページ + クエリ）を優先する
- 必要時のみ、最小実装で使う
