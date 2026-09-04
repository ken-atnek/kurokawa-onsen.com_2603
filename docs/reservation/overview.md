# 飲食店予約 表側仕様

## 対象

- 飲食店予約は `category: "food"` の店舗のみ対象。
- さらに予約基本JSONの `reservationEnabled === true` の店舗だけ、予約カレンダーや予約フォームへの導線を表示する。
- 物販・その他カテゴリには予約導線を出さない。

## 表示方針

- TOP：`お食事処予約` ブロックを表示し、検索条件に合う空席状況を一覧表示する。
- 店舗詳細：飲食店かつ予約有効店舗のみ、営業時間・MAPの横に予約カレンダーを表示する。
- 予約フォーム：固定ルート `/shops/reserve/` を使う。

## 予約フォームURL

```txt
/shops/reserve?id=029&date=2026-09-04&guests=2
```

`output: 'export'` 運用に合わせ、予約フォームはID別動的ルートではなく固定ページ + クエリ方式にする。

## JSON構成

予約関連JSONは、店舗ごとに以下へ配置する。

```txt
/public/db/shops/reservations/{shopId}/
```

現在の構成：

```txt
/public/db/shops/reservations/{shopId}/basic.json
/public/db/shops/reservations/{shopId}/menus.json
/public/db/shops/reservations/{shopId}/{yyyy-mm}.json
```

詳細仕様：

- `basic.json`：[basic-json.md](./basic-json.md)
- `menus.json`：[menu-json.md](./menu-json.md)
- 月別空席JSON：[availability-json.md](./availability-json.md)

## 基本フロー

店舗詳細ページでは、店舗詳細JSONを取得したあと、飲食店の場合だけ `basic.json` を取得する。

`reservationEnabled === true` の場合だけ予約カレンダーを表示する。

実装側では、`useShopDetailData` で `basic.json` を取得し、`ShopDetailClient` 側で `reservationEnabled` から `hasReservation` を作る。

```txt
hasReservation = reservationBasic?.reservationEnabled === true
```

`ShopInfo` には `hasReservation` を渡し、予約カレンダーの表示とレイアウトclassの切り替えに使う。

```txt
hasReservation: true  → isReservationShop
hasReservation: false → isDefaultShop
```

`category: "food"` だけでは判定しない。飲食店でも `reservationEnabled: false` の場合は通常レイアウトにする。

カレンダー表示時は、表示月に対応する月別空席JSONを取得する。

```txt
/db/shops/reservations/{shopId}/{yyyy-mm}.json
```

閲覧日より過去の日付、または `basic.json` の受付期間外の日付は、表示用ステータス `closed` として扱う。

予約可能な日付をクリックすると、店舗ID・予約日・人数をクエリで予約フォームへ渡す。

## TOPページの月またぎ表示

TOPページの空席状況は、検索した予約日を起点に14日分を表示する。

検索日が月末付近の場合は月をまたぐため、表示期間に含まれる月別空席JSONを複数取得して結合する。

例：

```txt
/db/shops/reservations/{shopId}/2026-09.json
/db/shops/reservations/{shopId}/2026-10.json
```

## 関連UI仕様

人数選択などで使う共通セレクトUIは、予約専用ではないためコンポーネント仕様に分ける。

- [../components/selectbox.md](../components/selectbox.md)

## 注意

- 実予約登録・自動席割り当て・確認メール送信は、このフロント側JSON仕様の範囲外。
- 静的export運用のため、ID増減に強い固定ページ + クエリ方式を優先する。
