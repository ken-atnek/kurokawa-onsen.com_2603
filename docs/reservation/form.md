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

- お名前
- ふりがな
- 国籍
- 電話番号
- メールアドレス
- メールアドレス確認（フロント側確認用。APIへは送信しない）
- ご要望・アレルギー等
- プライバシーポリシー同意

国籍は必須項目とし、初期値は日本にする。

選択値にはISO 3166-1 alpha-2の国コードを使用し、表示名は日本語・英語に対応する。

選択肢の実データは`src/data/nationalities.ts`を正とする。2026-10-07時点で249件・コード重複なし。ISO公式一覧は利用規約への同意が必要で直接取得できなかったため、ユーザー判断により国連公開一覧248件＋TWとの一致を根拠に採用した。ISO公式一覧と直接照合済みとは扱わず、将来差異が判明した場合も自動補正せず人間判断を行う。

選択肢は「主な国・地域」を上部に表示し、それ以外は表示言語に合わせて並べる。

- 日本語：あいうえお順
- 英語：アルファベット順

確認画面では、国コードではなく選択した言語の国・地域名を表示する。

### 確認画面

「入力内容を確認する」を押すと、確認画面に切り替える。

確認画面では以下を読み取り専用で表示する。

- ご予約内容
- お食事メニュー
- お客様情報

「修正する」を押すと入力画面に戻る。

「この情報で予約する」を押すと、予約送信PHPにPOSTする。

No.6 payload contractとNo.12 response contractの正本は、cms-panel側の確定仕様書12.1.1 / 12.1.2とする。本書の記載は画面実装用の同期要約であり、差分がある場合は確定仕様書を優先する。

正式実装では、Web予約APIへ `POST` + `Content-Type: application/json` のUTF-8 JSON objectを送信する。

```json
{
  "shop_id": "029",
  "date": "2026-09-20",
  "guests": 4,
  "menu_selections": ["menu-001", null, "menu-003", null],
  "name": "黒川太郎",
  "kana": "くろかわたろう",
  "nationality": "JP",
  "tel": "090-1234-5678",
  "email": "example@mail.com",
  "note": "アレルギーはありません",
  "privacy_agreed": true
}
```

- `shop_id` は文字列で送信する。数値型では送信しない。
- `guests` はJSON numberの整数で送信する。文字列や小数では送信しない。
- `menu_selections` は必ず `guests` と同じ長さの配列で送信する。各要素は `menu-001` 形式または `null`。
- `name` / `kana`は必須。送信前validationはserver-side contractと同じ順序とし、不正UTF-8と制御文字を空白正規化より前にrejectする。その後、残る`\s` / `\p{Z}` / `U+FEFF`の連続を半角スペース1文字へ正規化し、前後空白を除去してから1文字以上101文字以下を判定する。姓名間の空白は必須とせず、空白なし・複数要素を許可する。最終判定はserver-sideの共通関数`normalizeReservationCustomerIdentityValue()`を正とする。
- `nationality`は必須。選択中のISO 3166-1 alpha-2コードを英大文字2文字で送信する。国名文字列や旧`nationalityCode`は正式payloadへ送信しない。server-sideは形式に加えて国籍マスタ存在確認を行う。
- `privacy_agreed` はbooleanの `true` のみ送信可。文字列や数値では送信しない。
- `shopName`、`reservationDate`、`selectedMenus`、`customerName`、`customerKana`、`request` は旧FormData fieldであり、正式API payloadでは使用しない。旧APIの`last_name` / `first_name` / `last_kana` / `first_kana`も送信しない。

正式実装ではresponse JSONをparseし、`success`を判別キーとして処理する。`success=true`では必須の`reservationId`（JSON number）を取得・保持して完了画面へ進み、`success=false`では必須の`errorCode` / `message`を取得してエラー処理を行う。完了画面への予約番号表示は任意とする。fetch失敗、壊れたresponse、HTTP statusと`success`の不整合、正式schema外のresponseはnetwork / unexpected server responseとして扱う。

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

- 国籍select、初期値`JP`、日本語確認表示、249件の選択肢データはfrontend側に存在する。
- 2026-10-07に旧FormData送信を正式No.6 JSON payloadへ置換し、`nationality`必須送信と姓名間空白必須validationの撤去を実装した。
- backendの`/public/api/reservation/send.php`も正式No.6 / No.12 contractへ復旧し、共通予約登録処理へ接続した。国籍は`reservations.customer_nationality_code`へ保存する。
- `php -l`、TypeScript型チェック、差分確認は完了。本番環境でのWeb予約・DB保存・通知メール受信の疎通は未確認である。
- 本番反映・本番疎通は未実施。rate limit・冪等性はLATERとする。
