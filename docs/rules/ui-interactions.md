## UIインタラクション実装ルール（共通）

このプロジェクト以降の実装では、以下の構成を標準とする。

### ハンバーガーメニュー基本構成

- `button` は1つだけ配置する
- `button` は `position: fixed` で常時表示する
- メニュー本体は `overlay` + `panel` 構成にする
- 開閉状態は `isOpen` で管理する

### クラス制御

- `button` に `is-open` クラスを付与して見た目を切り替える
- `overlay` に `is-open` クラスを付与して表示状態を切り替える
- SCSS 側で `.xxx.is-open` を使って制御する
- `className` の条件分岐は `clsx` を使用する（文字列連結は避ける）

```tsx
className={clsx(styles.overlay, isOpen && styles['is-open'])}
```

### 表示アニメーション

- メニュー本体の出し入れは `transform` で制御する
- `opacity` / `pointer-events` を併用して操作可能状態を管理する

### 操作仕様

- `aria-expanded` を付与する
- `aria-label` を付与する
- 外側クリックで閉じる処理を入れる

### 補足

- JSX分岐でDOMを増減させるより、クラス付与で状態を切り替える
- 見た目調整は原則SCSS側で行う
- 既存SCSSのネスト構造・責務を崩さず最小差分で追記する
