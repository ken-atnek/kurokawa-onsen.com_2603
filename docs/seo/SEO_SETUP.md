# SEO初期設定メモ

このファイルは、黒川温泉観光協会サイトのSEO設計メモ。
静的書き出しと `public/db` 更新運用を前提に、SEO確認項目を管理する。

---

## サイト基本情報

- サイト名: 黒川温泉観光協会
- ドメイン: `kurokawa-onsen.com`
- 本番URL: `https://kurokawa-onsen.com/`
- デモURL: `https://demo-kurokawa-onsen.tuna-pic.co.jp/`
- 公開ステータス: `NEXT_PUBLIC_IS_REAL_PROD` で切り替え
- 案件種別: 静的サイト運用

---

## 現在のSEO実装メモ

- `src/lib/env.ts` に `isRealProduction` がある
- `src/app/layout.tsx` で本番時のみ `metadataBase` / OGP / robots を切り替えている
- 各ページの `description` は本番時のみ出力する方針
- `robots.ts` / `sitemap.ts` は未実装の場合、必要になった段階で追加を検討する

---

## ページ別メタ情報

### トップページ `/`

- title: 黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報
- description: 熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### 加盟店一覧 `/shops/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### 加盟店詳細 `/shops/detail?id=<id>`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:
- メモ: クエリ運用のため canonical 方針を個別に確認する

### 黒川温泉について `/about/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### アクセス `/access/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

---

## 初期実装で確認するSEO項目

- `metadata`
- canonical設計
- OGP画像の管理方針
- `robots.ts`
- `sitemap.ts`
- クエリパラメータ詳細ページのindex方針
- デモ公開時の `noindex` 制御

---

## デモ公開 / 本番公開の切り替え方針

- デモ公開時と本番公開時で、SEO系の出力を切り替える
- 判定は `NEXT_PUBLIC_IS_REAL_PROD` を使う
- `true` の時だけ本番SEOを有効にする
- `false` の時はデモ公開扱いにして `noindex` 系にする

---

## 注意点

- 本番URL確定前に canonical を仮置きしすぎない
- URLは `https` 前提で扱う
- Mixed Content（http）を避ける
- 重要情報がクライアント描画後にしか出ない場合は、SEO影響を確認する
