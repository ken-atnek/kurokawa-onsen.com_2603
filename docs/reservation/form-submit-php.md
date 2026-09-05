# 予約PHP送信・登録仕様

## 目的

予約フォームから送信された内容をPHPで受け取り、メール送信する。

将来的には、メール送信に加えてDB登録も行う。

## 設置場所

```txt
/public/api/reservation/send.php
```

フォーム側の送信先：

```txt
/api/reservation/send.php
```

## 現時点の仕様

現時点では最小構成として、開発者宛とお客様宛にメール送信する。

```txt
ken.atnek@gmail.com
```

処理内容：

- POSTのみ許可
- 必須項目チェック
- メールアドレス形式チェック
- 開発者宛メール送信
- お客様控えメール送信
- JSONで結果を返す

## 受け取り項目

```txt
shopId
shopName
reservationDate
guests
selectedMenus
customerName
customerKana
tel
email
request
```

## 必須項目

```txt
shopId
reservationDate
guests
customerName
customerKana
tel
email
```

## レスポンス

成功時：

```json
{
  "success": true,
  "message": "Mail sent."
}
```

失敗時：

```json
{
  "success": false,
  "message": "Required fields are missing."
}
```

## 将来的な送信先

最終的には、以下へメール送信する。

- 管理者
- 該当店舗
- 開発者
- お客様控え（現時点で実装済み）

開発者宛は、ひとまず以下を使用する。

```txt
ken.atnek@gmail.com
```

## 将来的な処理順

本実装では、以下の順番を基本とする。

```txt
1. 入力値バリデーション
2. 予約枠の再確認
3. DB登録
4. 管理者へメール
5. 該当店舗へメール
6. 開発者へメール
7. お客様へ自動返信
```

DB登録を先に行い、予約番号を発行してからメール本文へ含める。

メール送信に失敗した場合も予約内容を追跡できるよう、将来的にはDB側にメール送信状態を持たせる。

例：

```txt
reservation_status: confirmed
mail_status: sent / failed
```

## 注意

`public` 配下のPHPは配信対象になるため、DB接続情報や本番メール設定は直接書かない。

本番時は、外部から参照できない設定ファイルを `require` する。
