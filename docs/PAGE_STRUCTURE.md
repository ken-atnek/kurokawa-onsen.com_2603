# ページ構成メモ

このプロジェクトは、黒川温泉観光協会サイトの静的運用プロジェクト。
Next export と `public/db` のクライアント取得を前提に、ページ構成と導線を管理する。

---

## 現在の主要ページ

| ページ | パス | メモ |
|---|---|---|
| トップページ | `/` | 主要導線と加盟店ピックアップ |
| 黒川温泉について | `/about/` | 温泉地・協会の紹介 |
| 加盟店一覧 | `/shops/` | DB連動の一覧導線 |
| 加盟店詳細 | `/shops/detail?id=<id>` | ID増減に強い正規導線 |
| 飲食店予約フォーム | `/shops/reserve?id=<id>&date=<date>&guests=<guests>` | 飲食店予約の固定ページ + クエリ導線 |
| 既存詳細ルート | `/shops/[id]/` | 既存資産として扱い、ID増減前提の入口にはしない |
| 商品一覧 | `/shops/products/` | 加盟店商品の一覧導線 |
| 商品詳細 | `/shops/product-detail/` | 商品詳細の固定ページ + クエリ導線 |
| 年間行事 | `/schedule/` | 行事・イベント情報 |
| アクセス | `/access/` | 交通案内 |
| 利用規約 | `/terms/` | 運用ページ |
| プライバシーポリシー | `/privacy/` | 運用ページ |
| 特定商取引法 | `/law/` | 運用ページ |

---

## ルーティング方針

- IDが増減する詳細ページは、固定ページ + クエリ方式を優先する
- 例: `/shops/detail?id=006`
- `/shops/[id]/` はビルド時点のIDに依存するため、正規導線として新規追加しない
- export後に `public/db` が更新されても、詳細HTML自体を増やさず表示できる構成を維持する

---

## トップページ `/`

| # | セクション | 内容 |
|---|---|---|
| 1 | Hero | メインビジュアル |
| 2 | Shops | 加盟店ピックアップ |
| 3 | Food Reservation Availability | 飲食店予約の空席状況 |
| 4 | About | 黒川温泉紹介 |
| 5 | News | お知らせ導線 |
| 6 | Banner | 補助導線 |
| 7 | Association Overview | 協会概要 |

---

## 加盟店ページ

### `/shops/`

- 目的: 加盟店一覧から詳細へ誘導する
- データ: `public/db/shops/shopsIndex.json`
- 詳細導線: `/shops/detail?id=<id>`

### `/shops/detail?id=<id>`

- 目的: 加盟店の詳細情報を表示する
- データ: `public/db/shops/details/<id>.json`
- 商品データ: `public/db/shops/products/<id>/index.json`
- `id` が無い場合は描画しない

### `/shops/reserve?id=<id>&date=<date>&guests=<guests>`

- 目的: 飲食店予約フォームを表示する
- データ: `public/db/shops/details/<id>.json`、`public/db/shops/reservations/<id>/basic.json`、`menus.json`、月別空席JSON
- 詳細ページ・TOPページの空席状況から、予約前確認モーダルを経由して遷移する
- `id` / `date` / `guests` が無い場合は描画しない

### `/shops/product-detail/`

- 目的: 加盟店オンライン商品の詳細を表示する
- データ: `public/db/shops/details/<id>.json` と `public/db/shops/products/<id>/<productId>.json`

---

## 更新メモ

- ページ追加時はこのファイルにパスと役割を追記する
- SEO確認対象にするページは `docs/seo/SEO_SETUP.md` も合わせて更新する
- ID増減に関わる導線変更は `docs/rules/nextjs-export.md` と矛盾しないか確認する
