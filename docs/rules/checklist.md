## チェックリスト

作業開始前に確認:

- [ ] `next.config.ts` に `output: 'export'` がある
- [ ] `next.config.ts` に `trailingSlash: true` がある
- [ ] `next.config.ts` に `images: { unoptimized: true }` がある
- [ ] `force-dynamic` を使っていない
- [ ] データ取得は `public/db` をクライアント `fetch('/db/...')` で行っている
- [ ] コンテンツJSON取得は `cache: 'no-store'`（必要なら `?t=timestamp` 付与）
- [ ] コンテンツJSON取得失敗時に `isError` などで表示制御できる
- [ ] ID増減前提の導線は固定ページ + クエリ方式（例: `/shops/detail?id=006`）
- [ ] `count` などのオプション値は `?? 0` で安全に扱っている
- [ ] URLは `https` 前提で扱い、Mixed Content（http）を避ける

Next.js 16.x 補足:

- [ ] `params` は必要な箇所のみ `await params` で扱う（不要な複雑化をしない）
