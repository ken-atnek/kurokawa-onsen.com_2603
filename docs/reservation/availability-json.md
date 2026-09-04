# 予約空席状況JSON仕様

## 目的

店舗ごとの月別空席状況を管理する。

店舗詳細ページの予約カレンダー、TOPページの空席状況一覧で利用する。

## 配置場所

```txt
/public/db/shops/reservations/{shopId}/{yyyy-mm}.json
```

例：

```txt
/public/db/shops/reservations/029/2026-09.json
```

## JSON例

```json
{
  "shopId": "029",
  "year": 2026,
  "month": 9,
  "updatedAt": "2026-09-04T14:30:00+09:00",
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
      "date": "2026-09-22",
      "guests": {
        "1": "holiday",
        "2": "holiday",
        "3": "holiday",
        "4": "holiday"
      },
      "reason": "臨時休業"
    }
  ]
}
```

## ステータス

- `open`：予約可
- `limited`：一部満席
- `full`：満席
- `holiday`：休業日・定休日

月別JSONには `closed` は保存しない。

閲覧日より過去の日付、または `basic.json` の受付期間外の日付は、フロント側で表示用ステータスとして `closed` に変換する。

## 表示記号

- `open`：○
- `limited`：△
- `full`：満
- `holiday`：休
- `closed`：満

## 人数別ステータス

`guests` は人数ごとにステータスを持つ。

同じ日でも、席割り当ての都合で「1名は予約可、4名は満席」のように可否が変わるため、日単位だけでは判定しない。

```json
"guests": {
  "1": "open",
  "2": "open",
  "3": "limited",
  "4": "full"
}
```

休業日の場合は、該当日の全人数を `holiday` にする。

```json
"guests": {
  "1": "holiday",
  "2": "holiday",
  "3": "holiday",
  "4": "holiday"
}
```

## 月またぎ表示

TOPページは検索日を起点に14日分を表示する。

月末付近では月をまたぐため、必要な月別JSONを複数取得して結合する。

```txt
/db/shops/reservations/{shopId}/2026-09.json
/db/shops/reservations/{shopId}/2026-10.json
```

店舗詳細ページの月送りは、移動先の月JSONが存在する場合のみ有効にする。
