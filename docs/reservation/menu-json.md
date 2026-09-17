# 予約メニューJSON仕様

## 目的

予約フォームで選択できる食事メニューを管理する。

店舗詳細ページでは、おすすめメニューとして同じJSONを表示する。

## 配置場所

```txt
/public/db/shops/reservations/{shopId}/menus.json
```

例：

```txt
/public/db/shops/reservations/029/menus.json
```

## JSON例

```json
{
  "shopId": "029",
  "allowSeatOnly": true,
  "updatedAt": "2026-09-04T14:30:00+09:00",
  "menus": [
    {
      "id": "menu-001",
      "name": "ロースカツ膳",
      "price": 2200,
      "taxIncluded": true,
      "image": "/db/images/shops/029/photo_149_20260221163405_f0bf6d6c.jpg",
      "description": "匠ナガイエの豚を使用したロースカツ膳",
      "enabled": true
    }
  ]
}
```

## 項目

### `shopId`

店舗ID。

### `allowSeatOnly`

席のみ予約を許可するか。

- `true`：席のみ予約を許可する
- `false`：メニュー選択が必要

最終的な必須判定は `basic.json` の `menuSelectionType` と合わせて判断する。

### `menus`

メニュー一覧。

- `id`：メニューID
- `name`：メニュー名
- `price`：価格
- `taxIncluded`：税込表示か
- `image`：画像パス
- `description`：説明文
- `enabled`：互換性維持用の表示可否フラグ。現在の生成仕様では常に `true`

`menus.json` には、管理画面側で表示・予約利用可能と判定されたメニューのみ出力する。

無効、削除済み、掲載期間外、予約利用条件を満たさないメニューは、`enabled: false` として含めず、配列自体に出力しない。

表側では、基本的に `menus` 配列に含まれるメニューを表示対象として扱う。互換性維持のため、`enabled === false` のメニューが存在した場合は表示しない。
