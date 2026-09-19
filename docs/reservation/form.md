# 予約フォーム仕様

## URL

予約フォームは固定ルート + クエリ方式で表示する。

```txt
/shops/reserve?id=029&date=2026-09-04&guests=2
```

詳細ページ・TOPページの空席状況から予約フォームへ進む場合は、直接遷移せず、予約前の確認モーダルを表示する。

モーダル内の「内容を確認して予約に進む」を押した場合のみ、予約フォームURLへ遷移する。

## クエリ

- `id`：店舗ID
- `date`：予約日。`yyyy-mm-dd` 形式。
- `guests`：利用人数

いずれかが無い場合は、フォームを表示しない。

## 取得JSON

フォーム表示時に以下を取得する。

```txt
/db/shops/details/{shopId}.json
/db/shops/reservations/{shopId}/basic.json
/db/shops/reservations/{shopId}/menus.json
/db/shops/reservations/{shopId}/{yyyy-mm}.json
```

## 表示内容

フォームは同一ページ内で以下の3状態を切り替える。

- 入力画面
- 確認画面
- 送信完了画面

### 予約前確認モーダル

予約フォームへ遷移する前に表示する。

表示する内容：

- 席指定は希望に添えない場合がある
- 予約時間から15分過ぎて連絡が取れない場合はキャンセル扱いになる場合がある
- 5名様以上は直接店舗へ問い合わせる
- お子様向け料理は用意していない
- 電話番号
- 内容を確認して予約に進むボタン

このモーダルは、店舗詳細ページとTOPページの予約導線で共通利用する。

### ご予約内容

- 店舗画像
- 店舗名
- 予約日
- ご利用人数
- 予約内容を変更するリンク

### コース料理

`basic.json` の `menuSelectionType !== 0` かつ、表示可能な `menus.json` がある場合に表示する。

人数分のコース選択欄を表示する。

`menuSelectionType === 1` の場合は、各利用者ごとに「お席のみ」または表示可能なメニューを選択できる。

`menuSelectionType === 1` の場合のみ、「お席のみ予約する」を表示する。

「お席のみ予約する」をONにした場合は、全利用者の選択値を `null` にし、人数別コース選択欄を非表示にする。

OFFに戻した場合は、人数別コース選択欄を再表示する。各利用者は「お席のみ」またはメニューを個別に選択できる。

`menuSelectionType === 2` の場合は、全利用者のメニュー選択を必須にする。「お席のみ」は選択肢に出さず、「お席のみ予約する」も表示しない。

### お客様情報

- 氏名（姓名間に空白を入力）
- ふりがな（姓名間に空白を入力）
- 電話番号
- メールアドレス
- メールアドレス確認（フロント側確認用。APIへは送信しない）
- ご要望・アレルギー等
- プライバシーポリシー同意

### 確認画面

「入力内容を確認する」を押すと、確認画面に切り替える。

確認画面では以下を読み取り専用で表示する。

- ご予約内容
- お食事メニュー
- お客様情報

「修正する」を押すと入力画面に戻る。

「この情報で予約する」を押すと、予約送信PHPにPOSTする。

No.6 payload contractとNo.12 response contractの正本は、cms-panel側の確定仕様書12.1.1 / 12.1.2とする。本書の記載は画面実装用の同期要約であり、差分がある場合は確定仕様書を優先する。

現行frontendは、正式Web予約APIへ `POST` + `Content-Type: application/json` のUTF-8 JSON objectを送信する。

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

- `shop_id` は文字列で送信する。数値型では送信しない。
- `guests` はJSON numberの整数で送信する。文字列や小数では送信しない。
- `menu_selections` は必ず `guests` と同じ長さの配列で送信する。各要素は `menu-001` 形式または `null`。
- `name` / `kana`は必須。送信前validationはserver-side contractと同じ順序とし、不正UTF-8と制御文字を空白正規化より前にrejectする。その後、残る`\s` / `\p{Z}` / `U+FEFF`の連続を半角スペース1文字へ正規化し、前後空白を除去してから3文字以上101文字以下を判定する。姓名区切りを1つ以上必須とし、各要素は非空、3要素以上は許可する。最終判定はserver-sideの共通関数`normalizeReservationCustomerIdentityValue()`を正とする。
- `privacy_agreed` はbooleanの `true` のみ送信可。文字列や数値では送信しない。
- `shopName`、`reservationDate`、`selectedMenus`、`customerName`、`customerKana`、`request` は旧FormData fieldであり、正式API payloadでは使用しない。旧APIの`last_name` / `first_name` / `last_kana` / `first_kana`も送信しない。

現行frontendは正式response JSONをparseし、`success`を判別キーとして処理する。`success=true`では必須の`reservationId`（JSON number）を取得・保持して完了画面へ進み、`success=false`では必須の`errorCode` / `message`を取得してエラー処理を行う。完了画面への予約番号表示は任意とする。fetch失敗、壊れたresponse、HTTP statusと`success`の不整合、正式schema外のresponseはnetwork / unexpected server responseとして扱う。

### 送信完了画面

正式responseの`success=true`と有効な`reservationId`を確認した後に送信完了画面へ切り替える。`res.ok`のみでは成功判定しない。

- ご予約ありがとうございます
- `ご予約を受け付けました。ご入力いただいたメールアドレス宛に、予約内容の確認メールを送信します。`
- 必要に応じて店舗から連絡する旨
- TOPページへ戻る

## 予約可否

月別空席JSONから、クエリの `date` と `guests` に対応するステータスを確認する。

予約可能ステータス：

- `open`
- `limited`

それ以外の場合は、フォーム上に予約不可の注意を表示する。

## 現時点の範囲

現在は表側フォームの表示までを対象とする。

確認画面から正式JSON requestを送信し、No.12 responseを処理するfrontend対応は今後実装する。

backendの正式Web予約APIは、以下の既存PHPへStep2-C3-Bとして接続済みであり、氏名2項目化後の`name` / `kana` contractも実装済みとする。

```txt
/api/reservation/send.php
```

設置ファイル：

```txt
/public/api/reservation/send.php
```

Step2-C3-B実装前の暫定メール送信先（履歴）：

```txt
ken.atnek@gmail.com
```

現在の `send.php` は、DB登録・自動席割当・transaction orchestrationへ接続済み。正式request方式は `POST` + `Content-Type: application/json` のUTF-8 JSON object、氏名fieldは`name` / `kana`で確定しているが、コードは今後新contractへ変更する。

現行frontendは正式JSON payloadへ対応済み。本番反映時はfrontend / backendを同時に反映する。

availability JSON更新とjson regeneration queue、正式4宛先メールの同期送信は接続済み。rate limit、本番反映、実環境疎通確認はLATERとする。
