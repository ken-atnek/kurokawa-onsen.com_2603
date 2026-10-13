# 英語項目のフロント向けJSON契約

更新日: 2026-10-13  
状態: 従来の `hours_en`・`recommendedProducts_en`・`menus_en` と追加の `address_en`・`mapUrl_en`・`reservationEnabled_en` はバックエンドの生成コードを実装済み。`reservationEnabled_en` は店舗29のローカル保存・生成JSONを確認済み。管理画面・DB・予約履歴の確定仕様は、隣接プロジェクトの [英語項目仕様](../../cms-panel_2602/docs/backend/english-fields/README.md) を参照する。本書はフロントが読むJSONの形と既存フォールバックを整理する。

## 店舗詳細 `details/{id}.json`

英語入りの初期参照サンプルは `public/db/shops/details/029_en.json`。現在のローカル `029.json` にも英語キーがあるが、一部は手動更新値であり、今回の住所・地図URLの生成コード検証結果ではない。`info.hours` と `info.hours_en` は同じ行構造を使い、行の `key` は `businessHours`、`closedDays`、`averageBudget`。英語ラベルは順に `Opening Hours`、`Days Closed`、`Average Budget` とする。英語の店休日・平均予算は英語登録値がある場合のみ出す。

- ランチ・ディナーのOPEN/CLOSEは日英共通とし、既存の日本語時刻カラムを両方のJSONで使用する。備考のみ日英別の登録値を使用し、日本語の備考を `hours_en` へ転用しない。英語専用時刻カラムは使用しない。
- 共通時刻があれば英語備考・店休日・平均予算がなくても、その時刻を `hours_en` に出す。共通時刻と英語表示文がすべて空なら `hours_en: []`。この場合の現行フロントのフォールバックは維持する。
- ランチ・ディナー各枠で共通OPEN/CLOSEが両方空欄なのに英語備考だけが入力された場合は、管理画面で「英語の営業時間が未入力です。」と警告し、保存・JSON更新を止める。営業時間は予約受付判定に使わない。
- 日本語 `hours` も、サンプルに合わせて上記 `key` を出す。従来の英語備考・店休日と合わせ、バックエンド生成コードでのローカル再生成確認済み。今回の新規住所・地図URLは別工程で確認する。

`recommendedProducts_en` は既存 `recommendedProducts` と並ぶ配列。英語タイトルと英語説明が揃った商品だけを入れ、該当なしは `[]`。要素の `id`、`name`、`price`、`image`、`description` はすべてstringで日本語側と同型。画像・IDは共通、英語価格は独立したJPY額。`price` はバックエンドで日本語 `"1,500円"`、英語 `"¥1,500"`、未入力 `""` に整形する。日本語値を英語欄へ代替しない。従来分のローカル再生成・画面確認は実施済み。

### 住所・地図URL（生成コード・ローカル確認済み）

- `info.address_en` は `info.address` と同じ `{ "postalCode": string, "full": string }`。郵便番号は共通。英語住所3欄の非空値を入力順に結合し、末尾に `Kumamoto, Japan` がなければJSON生成時だけ不足分を補う。既に入力された `Kumamoto` / `Japan` は重複させない。英語住所本体が空の既存行は `full: ""` とし、地域名だけは出さない。
- 日本語 `info.address.full` も、住所3欄を結合した結果が「熊本県」で始まらなければ、JSON生成時だけ先頭に補う。DB値を変更しない。
- `info.mapUrl_en` は英語の埋め込み地図URLのstring。`info.mapUrl` は日本語用、`info.mapLinkUrl` は日英共通で維持する。日本語URLを英語URLへ代替しない。
- 店舗29で管理画面から保存・再表示し、`info.address_en`・`info.mapUrl_en` をバックエンドで再生成できることをローカル確認済み。

## 予約メニュー `reservations/{id}/menus.json`

既存の `menus` と並列に `menus_en` を出す。要素キーは `id`、`name`、`price`、`taxIncluded`、`image`、`description`、`enabled` で、各型・共通画像・税込フラグは日本語側と同じ。英語名称・英語料金が揃い、現在の掲載・有効・利用可能条件を満たすものだけを `menus_en` に含める。英語説明文は空でもよい。対象がなければ `menus_en: []`、日本語への代替はしない。

`menus.price` と `menus_en.price` は**どちらも数値**。おすすめ商品と異なり、JSONへ `円` / `¥` や桁区切りを付けない。英語サイトの予約金額には英語料金を使用する。従来分のローカル再生成・画面確認は実施済み。英語Web予約時の言語別料金保存はコード実装済みだが、Web実予約でのDB照合は未実施。

## 予約基本設定 `reservations/{id}/basic.json`（生成コード実装済み）

既存のboolean `reservationEnabled` は日本語サイト用とし、同じ階層にboolean `reservationEnabled_en` を追加する。日英で予約受付の設定を独立させ、店舗・席などの共通条件と、メニュー必須時の各言語のusableメニュー件数をそれぞれ評価した**実効値**を出す。英語側の管理画面設定がONでも、必須の英語メニューが0件なら `reservationEnabled_en: false`。日本語OFF・英語ONなら日本語サイトは表示せず、英語サイトだけ英語側の実効値に従って表示する。月別の席・空席JSONは日英共用で、言語別の席在庫は作らない。フロントの英語表示は `reservationEnabled_en` を参照する。店舗29で日本語ON・英語OFFと日本語OFF・英語ONをローカル生成JSONで確認した。日英各2件の有効メニューがある「メニュー必須」時は両実効値が `true` となった。設定は元の日英両方ON・メニュー選択「任意」へ戻した。メニュー必須時の片言語0件は未実測。

## 予約言語と表示

英語Web予約は `reservation_site_language = en` として登録し、英語名・英語料金を予約時スナップショットに保存する。管理画面詳細では保存済みの英語名・料金を初期表示する。販売終了した元メニューは初期表示から消さず、**新しい変更候補からのみ除く**。未変更の枠は過去の価格を維持し、変更・追加した枠だけ現在の有効な英語メニュー価格を使う。予約サイト識別は公開JSONではなく予約DB・管理画面詳細の責務。

## 動作確認前の注意

- この文書は目標契約であり、現行JSONや英語ページがすべて対応済みという意味ではない。
- `basic.json` に今回追加するのは受付可否の `reservationEnabled_en` のみ。英語平均予算・英語メニュー本文は追加しない。月別availability JSONに言語別の在庫は追加しない。
- フロントの既存 `hours_en: []` フォールバックを無効化する変更はしない。
