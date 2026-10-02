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
| 2 | Shops | 営業中の加盟店からランダムで3件をピックアップ |
| 3 | Food Reservation Availability | 飲食店予約の空席状況 |
| 4 | About | 黒川温泉紹介 |
| 5 | News | お知らせ導線 |
| 6 | Banner | 補助導線 |
| 7 | Association Overview | 協会概要 |

---

## 加盟店ページ

### `/shops/`

- 目的: 加盟店一覧から詳細へ誘導する
- データ: `public/db/shops/shopsIndex.json`、`public/db/shops/details/<id>.json`
- 詳細導線: `/shops/detail?id=<id>`
- 一覧カードには、詳細JSONの営業時間・店休日・平均予算を表示する
- 飲食店は、モーニング・ランチ・ディナーの該当ラベルを表示する
- 時間帯の複数選択はAND条件とし、選択したすべての時間帯に対応する店舗を表示する
- 時間帯が未選択の場合は、`mealPeriods`未設定の飲食店を含めて全店舗を表示する

### `/shops/detail?id=<id>`

- 目的: 加盟店の詳細情報を表示する
- データ: `public/db/shops/details/<id>.json`
- 商品データ: `public/db/shops/products/<id>/index.json`
- 飲食店かつ`mealPeriods`が設定されている場合は、ヘッダーに該当ラベルを表示する
- `id` が無い場合は描画しない

### 飲食店の提供時間帯

飲食店の詳細JSONに、該当する時間帯だけを配列で設定する。
飲食店以外には`mealPeriods`を設定しない。

```json
"mealPeriods": ["morning", "lunch", "dinner"]
```

| 値 | 表示名 |
|---|---|
| `morning` | モーニング |
| `lunch` | ランチ |
| `dinner` | ディナー |

- 未設定または空配列の場合は、時間帯ラベルを表示しない
- 表示順は、モーニング → ランチ → ディナーで固定する
- 一覧・詳細・TOPの加盟店カードで同じラベル表示を使用する
- TOPの加盟店は、対象店舗の詳細を取得して営業状態を計算し、営業中だけに絞ってからランダムで3件表示する

### 加盟店カードの営業情報

一覧・TOPの加盟店カードには、詳細JSONの `info.hours` から次の項目を表示する。

1. 営業時間
2. 店休日
3. 平均予算

```json
{
  "hours": [
    {
      "label": "店休日",
      "value": "不定休\n店休日　2026年3月：3/3・4・5"
    },
    {
      "label": "平均予算",
      "value": "昼 3,000円～4,000円\n夜 8,000円～10,000円"
    }
  ]
}
```

- 店休日・平均予算は `label` と `value` の組み合わせで設定する
- 同じ項目内で複数行を表示する場合、配列には分けず `value` 内を `\n` で区切る
- 既存データとの互換性のため `\r\n` も表示可能だが、新規データは `\n` に統一する
- 未設定または空文字の項目は表示しない
- 平均予算を `info.hours` に設定した場合は店舗詳細ページにも表示する

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
