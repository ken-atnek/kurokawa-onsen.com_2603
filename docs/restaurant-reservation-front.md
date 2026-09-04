# 飲食店予約 表側仕様メモ

## 対象

- 飲食店予約は `category: "food"` の店舗のみ対象。
- さらに詳細JSONの `reservation.enabled === true` の店舗だけ、TOP・店舗詳細・予約フォームへの導線を表示する。
- 物販・その他カテゴリには予約導線を出さない。

## 表示方針

- TOP：`お食事処予約` ブロックを `加盟店` ブロックの下に表示する。
- 店舗詳細：飲食店かつ予約有効店舗のみ、営業時間・MAPの下に予約カレンダーを表示する。
- 予約フォーム：固定ルート `/shops/reserve/` を使う。

## URL

```txt
/shops/reserve?id=030&date=2026-09-04&guests=2
```

`output: 'export'` 運用に合わせ、予約フォームはID別動的ルートではなく固定ページ + クエリ方式にしている。

## CMS側仕様からの前提

- ディナー1枠限定。
- お客様は日付・人数・お客様情報のみを指定する。
- お客様は席種・席番号を指定しない。
- 表側には席の詳細ではなく、予約可否のみを表示する。
- 予約は表側から送信された時点で自動確定する。
- 席の割り当てはシステム側で自動処理する。

## JSON構成

空席状況は、店舗ごとに月別JSONで管理する。

```txt
/public/db/reservations/availability/{shopId}/{yyyy-mm}.json
```

例：

```txt
/public/db/reservations/availability/030/2026-09.json
```

店舗詳細ページ・TOPページともに、同じ月別JSONを利用する。

## 予約基本JSON

予約の基本設定は、店舗ごとに `basic.json` で管理する。

詳細仕様は `docs/restaurant-reservation-basic-json.md` を参照する。

```txt
/public/db/shops/reservations/{shopId}/basic.json
```

例：

```json
{
  "shopId": "029",
  "reservationEnabled": true,
  "menuSelection": {
    "enabled": true,
    "required": false
  },
  "acceptancePeriod": {
    "startDaysBefore": null,
    "endDaysBefore": 0
  },
  "guestRange": {
    "min": 1,
    "max": 6
  },
  "regularHolidays": [3],
  "updatedAt": "2026-09-04T20:42:00+09:00"
}
```

- `reservationEnabled`：予約受付を使用するか
- `menuSelection.enabled`：食事メニュー選択を使用するか
- `menuSelection.required`：食事メニュー選択を必須にするか
- `acceptancePeriod.startDaysBefore`：何日前から受付するか。`null` は無期限。
- `acceptancePeriod.endDaysBefore`：何日前まで受付するか。`0` は当日。
- `guestRange.min`：最小予約人数
- `guestRange.max`：最大予約人数
- `regularHolidays`：定休日の曜日。`0` が日曜、`6` が土曜。

## 月別JSONの形式

```json
{
  "shopId": "030",
  "year": 2026,
  "month": 9,
  "updatedAt": "2026-09-04T10:00:00+09:00",
  "days": [
    {
      "date": "2026-09-04",
      "guests": {
        "1": "open",
        "2": "open",
        "3": "limited",
        "4": "full"
      }
    },
    {
      "date": "2026-09-05",
      "guests": {
        "1": "open",
        "2": "limited",
        "3": "full",
        "4": "full"
      }
    },
    {
      "date": "2026-09-06",
      "guests": {
        "1": "closed",
        "2": "closed",
        "3": "closed",
        "4": "closed"
      },
      "reason": "定休日"
    }
  ]
}
```

## 人数別ステータス

1名・2名・3名・4名ごとにステータスを持たせる。

同じ日でも、席割り当てロジックによって「1名は予約可、4名は満席」のように可否が変わるため、日単位のステータスだけでは判定しない。

```json
{
  "date": "2026-09-04",
  "guests": {
    "1": "open",
    "2": "open",
    "3": "limited",
    "4": "full"
  }
}
```

表側では、選択中の人数に対応する値を参照する。

```txt
day.guests[String(selectedGuests)]
```

## ステータス

- `open`：予約可
- `limited`：一部満席
- `full`：満席
- `closed`：受付停止
- `holiday`：休業日・定休日

表示記号は以下を基本とする。

- `open`：○
- `limited`：△
- `full`：満
- `closed`：満
- `holiday`：休

## TOPページの検索結果表示

TOPページの空席状況は、検索した予約日を起点に2週間分を表示する。

例：予約日が `2025-08-20` の場合

- 表示開始日：`2025-08-20`
- 表示終了日：`2025-09-02`
- 表示日数：14日

検索日が月末付近の場合は月をまたぐため、表示期間に含まれる月別JSONを取得して結合する。

例：

```txt
/db/reservations/availability/{shopId}/2025-08.json
/db/reservations/availability/{shopId}/2025-09.json
```

表側では、結合した日別データから検索日以降の14日分だけを表示する。

「前の2週間」「次の2週間」は、現在の表示開始日を基準に14日ずつ移動する。

```txt
前の2週間：表示開始日 - 14日
次の2週間：表示開始日 + 14日
```

## 店舗詳細ページの表示

店舗詳細ページでは、表示月に必要な月別JSONを取得してカレンダーを表示する。

月送りを行う場合は、移動先の年月に対応するJSONを取得する。

```txt
/db/reservations/availability/{shopId}/{yyyy-mm}.json
```

選択中の人数に対応する `guests` のステータスを、カレンダーの日付セルに表示する。

## 予約フォームへの引き継ぎ

予約フォームへは、店舗ID・予約日・人数をクエリで渡す。

```txt
/shops/reserve?id=030&date=2026-09-04&guests=2
```

予約フォーム側では、クエリの値をもとに予約内容を表示する。

## 注意

- 実予約登録・自動席割り当て・確認メール送信はCMS側/API側の実装が必要。
- 静的export運用のため、ID増減に強い固定ページ + クエリ方式を優先する。
