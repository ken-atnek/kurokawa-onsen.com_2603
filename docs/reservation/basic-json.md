# 予約基本設定JSON仕様

## 目的

飲食店ごとの予約受付ルールを管理する。

月別の空席状況JSONとは分け、予約受付の有効/無効、メニュー選択、受付期間、予約人数、定休日を保持する。

## 配置場所

```txt
/public/db/shops/reservations/{shopId}/basic.json
```

例：

```txt
/public/db/shops/reservations/029/basic.json
```

## JSON例

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
    "max": 4
  },
  "regularHolidays": [3],
  "updatedAt": "2026-09-04T20:42:00+09:00"
}
```

## 項目

### `shopId`

店舗ID。

店舗詳細JSONや月別予約JSONと紐づけるために使用する。

### `reservationEnabled`

予約受付を使用するか。

- `true`：予約受付を使用する
- `false`：予約受付を使用しない

`false` の場合、表側では予約カレンダーや予約導線を表示しない。

### `menuSelection`

予約フォームで食事メニュー選択を使用するか。

```json
"menuSelection": {
  "enabled": true,
  "required": false
}
```

- `enabled`：メニュー選択欄を表示するか
- `required`：メニュー選択を必須にするか

メニュー情報は別ファイルの `menus.json` で管理する。

### `acceptancePeriod`

予約受付期間。

```json
"acceptancePeriod": {
  "startDaysBefore": null,
  "endDaysBefore": 0
}
```

- `startDaysBefore`：何日前から受付するか
- `endDaysBefore`：何日前まで受付するか

値の意味：

- `startDaysBefore: null`：無期限
- `startDaysBefore: 30`：30日前から受付
- `startDaysBefore: 60`：60日前から受付
- `endDaysBefore: 0`：当日まで受付
- `endDaysBefore: 1`：1日前まで受付
- `endDaysBefore: 3`：3日前まで受付
- `endDaysBefore: 7`：1週間前まで受付

例：

```json
"acceptancePeriod": {
  "startDaysBefore": 30,
  "endDaysBefore": 1
}
```

30日前から受付し、1日前まで受付する。

表側では、この受付期間外の日付は表示用ステータス `closed` として扱う。

受付期間の判定は、閲覧日を基準に行う。

例：閲覧日が `2026-09-04` の場合

```json
"acceptancePeriod": {
  "startDaysBefore": 30,
  "endDaysBefore": 1
}
```

この場合の受付可能期間：

```txt
2026-09-05 〜 2026-10-04
```

以下の日付は、月別JSON上で `open` や `limited` でも、表側では表示用ステータス `closed` にする。

- `2026-09-04` 以前
- `2026-10-05` 以降

表示用ステータス `closed` は月別JSONには保存しない。

`closed` の日は予約フォームへのリンクを出さず、カレンダー上は `満` として表示する。

### `guestRange`

予約可能人数の範囲。

```json
"guestRange": {
  "min": 1,
  "max": 4
}
```

表側の人数選択に使用する。

月別予約JSONの `guests` も、この範囲に合わせる。

### `regularHolidays`

定休日の曜日。

JavaScriptの曜日番号に合わせる。

```txt
0: 日
1: 月
2: 火
3: 水
4: 木
5: 金
6: 土
```

例：

```json
"regularHolidays": [3]
```

水曜日が定休日。

複数ある場合：

```json
"regularHolidays": [2, 3]
```

火曜・水曜が定休日。

### `updatedAt`

JSONの最終更新日時。

ISO 8601形式で保持する。

## 関連JSON

```txt
/public/db/shops/reservations/{shopId}/menus.json
/public/db/shops/reservations/{shopId}/{yyyy-mm}.json
```

`basic.json` は予約ルール、`menus.json` は食事メニュー、月別JSONは空席状況を管理する。
