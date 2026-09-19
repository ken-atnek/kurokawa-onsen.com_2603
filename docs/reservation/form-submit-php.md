# 予約PHP送信・登録仕様

## 目的

予約フォームから送信された内容をPHPで受け取り、正式Web予約APIとしてDB登録・自動席割当・transaction orchestrationを行う。

`send.php` のStep2-C3-BによるDB登録・自動席割当・transaction orchestration接続、2026-09-19改定の氏名2項目contract、正式4宛先メールまで実装済みとする。実環境疎通確認は未実施。

## 設置場所

```txt
/public/api/reservation/send.php
```

フォーム側の送信先：

```txt
/api/reservation/send.php
```

## Step2-C3-B実装前の暫定仕様（履歴）

Step2-C3-B実装前は、暫定FormData / `$_POST` 受付の最小構成として、開発者宛とお客様宛にメール送信していた。

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

## Step2-C3-B実装前の暫定受け取り項目（履歴）

以下はStep2-C3-B実装前のFormData / `$_POST`項目であり、正式Web予約APIのpayload contractでは使用しない。

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

## 正式Web予約API request contract

No.6 payload contractとNo.12 response contractの正本は、cms-panel側の確定仕様書12.1.1 / 12.1.2とする。本書の記載はfrontend連携用の同期要約であり、差分がある場合は確定仕様書を優先する。

No.6 Web予約API正式payload contractは2026-09-19に改定した。`POST` + `Content-Type: application/json` のUTF-8 JSON objectを使用する。

```json
{
  "shop_id": "029",
  "date": "2026-09-20",
  "guests": 4,
  "menu_selections": ["menu-001", null, "menu-003", null],
  "name": "黒川 太郎",
  "kana": "くろかわ たろう",
  "tel": "090-1234-5678",
  "email": "example@mail.com",
  "note": "アレルギーはありません",
  "privacy_agreed": true
}
```

- 許可キーは `shop_id` / `date` / `guests` / `menu_selections` / `name` / `kana` / `tel` / `email` / `note` / `privacy_agreed` のみ。旧氏名4fieldは受け付けない。
- 未知フィールドは400でrejectする。
- `reservation_id` / `reservation_route` / `status` / `cancelled_at` / `seat_id` / `assigned_seat_ids` / `relocations` / `shop_memo` / `accommodation_name` / `created_at` / `updated_at` はサーバー制御フィールドとして受け付けない。
- Web routeではサーバー側で `reservation_route=1`、`status=1`、`cancelled_at=NULL` を固定する。
- `shop_id` は文字列、`guests` はJSON numberの整数、`privacy_agreed` はboolean `true` のみ。
- `menu_selections` は `guests` と同じ長さの配列とし、要素は `menu-\d{3,}` 形式または `null`。
- `name` / `kana`は必須。cms-panel側DDL仕様書「氏名・ふりがなの保存仕様」を正とし、不正UTF-8と制御文字を空白正規化より前にrejectする。その後、残る`\s` / `\p{Z}` / `U+FEFF`の連続を半角スペース1文字へ正規化し、前後空白を除去してから3文字以上101文字以下を判定する。姓名区切りを1つ以上必須とし、各要素は非空、3要素以上は許可する。server-sideでは共通関数`normalizeReservationCustomerIdentityValue()`を使用する。
- `note` は任意・nullable。未送信、`null`、空文字、Unicode空白のみは `customer_note = null` として扱う。

## Step2-C3-B実装前の暫定必須項目（履歴）

以下はStep2-C3-B実装前のFormData / `$_POST` 処理の必須項目であり、正式No.6 payloadのrequired fieldsではない。

```txt
shopId
reservationDate
guests
customerName
customerKana
tel
email
```

## Step2-C3-B実装前の暫定response（履歴）

以下はStep2-C3-B実装前の暫定 `send.php` のresponseであり、現在の正式Web予約API response contractとは異なる。現在の `send.php` はNo.12でCLOSED / FROZENとなった正式schemaを返す。

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

## 正式Web予約API response contract（No.12 CLOSED / FROZEN）

正式responseはsuccess/error別shapeとし、field名はcamelCaseとする。

成功時（HTTP 200）：

```json
{
  "success": true,
  "reservationId": 123
}
```

- `reservationId` は `reservations.id` に対応するJSON numberで、成功時は必須。
- `errorCode` / `message` は返さない。
- frontendは`reservationId`を取得・保持する。完了画面への表示は任意。

失敗時：

```json
{
  "success": false,
  "errorCode": "FULL",
  "message": "この日時は満席になりました。別の日程をお選びください。"
}
```

- `errorCode` / `message` は必須、`reservationId` は返さない。
- 正式`errorCode`は `INVALID_REQUEST` / `VALIDATION_ERROR` / `RESERVATION_UNAVAILABLE` / `MENU_INVALID` / `FULL` / `METHOD_NOT_ALLOWED` / `UNSUPPORTED_MEDIA_TYPE` / `RATE_LIMITED` / `INTERNAL_ERROR` の9種類。
- HTTP mappingは、成功=`200`、構造・型不正=`400 INVALID_REQUEST`、値validation NG=`400 VALIDATION_ERROR`、予約受付不可=`400 RESERVATION_UNAVAILABLE`、menu業務validation NG=`400 MENU_INVALID`、POST以外=`405 METHOD_NOT_ALLOWED`、最終席判定の満席=`409 FULL`、JSON以外=`415 UNSUPPORTED_MEDIA_TYPE`、連続送信制御=`429 RATE_LIMITED`、内部異常=`500 INTERNAL_ERROR`。
- `errorCode`を機械判定の正とし、`message`は安全なユーザー表示用fallbackとする。message文字列自体は機械判定に使用しない。
- `2xx`では`success=true`、`4xx` / `5xx`では`success=false`とし、不整合なresponseはfrontendでunexpected responseとして扱う。
- DB COMMIT成功を予約成立の境界とする。COMMIT失敗は`500 INTERNAL_ERROR`。COMMIT後のavailability JSON更新、queue登録、メール送信、メールログ記録が失敗しても予約成立を覆さず、成功responseを維持する。
- SQL、例外詳細、internal reason、seat ID、file path、DB接続情報等はpublic responseへ出さない。

## 正式メール送信先（実装済み・実環境確認待ち）

- 予約者：予約者向けテンプレート
- 該当店舗：内部通知テンプレート。店舗メール未登録はスキップログ
- 黒川温泉観光協会：`$infoMaster`、内部通知テンプレート
- サーバー管理者：`$sendAddressList[0]`、予約者向けと同じ件名・本文

COMMIT後・成功response前に既存`sendMail_Common()`で最大4通を同期送信し、宛先ごとに`reservation_mail_logs`へ記録する。送信・ログ失敗は予約成功を覆さない。本文・件名・表示条件の正本はcms-panel側の確定仕様書12.3とする。

## Step2-C3-Bで実装済みの処理

Step2-C3-Bの正式Web予約APIでは、以下を実装済み。

```txt
1. 入力値バリデーション
2. BEGIN
3. shops mutex取得
4. lock後fresh Web eligibility・受付期間・予約人数確認
5. payloadをC3-A内部形式へ変換
6. executeReservationRegistration()
7. COMMIT / ROLLBACK
8. availability JSON更新（失敗時queue登録）
9. 正式4宛先メール同期送信・宛先別ログ記録
10. No.12 response返却
```

COMMIT後のavailability JSON更新とjson regeneration queue、氏名2項目化、正式メール、frontend JSON送信・response判定は接続済み。rate limit、本番反映、実環境疎通確認はLATERとする。

DB登録を先に行い、予約番号を発行してからメール本文へ含める。

メール送信結果は予約本体へ状態フィールドとして保持せず、`reservation_mail_logs` へ宛先ごとに記録する。メール失敗は予約成功を取り消さない。

## 注意

`public` 配下のPHPは配信対象になるため、DB接続情報や本番メール設定は直接書かない。

正式APIは、既存 `cms_config` のDB接続・DB helperを実リポジトリのinclude / require規約に従って共通利用する。
