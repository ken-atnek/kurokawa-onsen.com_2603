# 共通SelectBox仕様メモ

## 対象ファイル

```txt
src/components/common/SelectBox.tsx
src/components/common/SelectBox.module.scss
```

## 目的

CMS側で使用している `data-selectbox` 形式のセレクトUIに近い見た目・DOM構造を、Next.js側でも使い回せるようにする。

標準の `<select>` ではなく、`button`、`hidden input`、`radio`、`label` を組み合わせたカスタムセレクトとして扱う。

## 基本の使い方

```tsx
<SelectBox
  name="reservationGuests"
  value={selectedGuests}
  options={[
    { value: '1', label: '1名' },
    { value: '2', label: '2名' },
    { value: '3', label: '3名' },
    { value: '4', label: '4名' },
  ]}
  onChange={setSelectedGuests}
  position="left"
/>
```

## props

| prop | 必須 | 内容 |
| ---- | ---- | ---- |
| `name` | 必須 | hidden inputの `name` に使用する |
| `value` | 必須 | 現在選択中の値 |
| `options` | 必須 | 選択肢の配列 |
| `onChange` | 必須 | 選択変更時に呼ばれる関数 |
| `position` | 必須 | テキスト位置。`left` / `center` / `right` |
| `className` | 任意 | 呼び出し側で追加するclass |
| `height` | 任意 | セレクト本体の高さ |
| `listHeight` | 任意 | 選択肢1行の高さ |
| `valueFontSize` | 任意 | 選択中テキストのフォントサイズ |
| `labelFontSize` | 任意 | 選択肢テキストのフォントサイズ |

## サイズ調整

旧CMS側のmixinに近い感覚で、呼び出し側から指定する。

```tsx
<SelectBox
  name="reservationGuests"
  value={selectedGuests}
  options={guestOptions}
  onChange={setSelectedGuests}
  position="center"
  height="4rem"
  listHeight="3.4rem"
  valueFontSize="1.6rem"
  labelFontSize="1.4rem"
/>
```

対応関係：

```txt
旧CMS: $height      → SelectBox: height
旧CMS: $list-height → SelectBox: listHeight
旧CMS: $position    → SelectBox: position
```

## position

`position` は呼び出し側で必ず指定する。

```tsx
position="left"
position="center"
position="right"
```

`SelectBox` 本体側では固定しない。  
使用場所ごとに見せ方が変わるため、呼び出し側で明示する。

## DOM構造

CMS側の既存UIに寄せるため、以下のclass / data属性を維持する。

```txt
data-selectbox
selectbox__head
data-selectbox-hidden
selectbox__value
data-selectbox-value
list-wrapper
selectbox__panel
```

## 注意

- `value` と `options[].value` は文字列で扱う。
- 数値として使いたい場合は、呼び出し側で変換する。
- 同じページ内に複数配置する場合、`name` は重複しないようにする。
- フォーム送信用の値は hidden input に入る。
- radio input はカスタムUI内の選択肢制御用として扱う。
