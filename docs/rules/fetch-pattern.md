## データ取得パターン（2603）

`output: 'export'` 運用のため、データ取得はクライアント `fetch('/db/...')` を基本とする。
管理画面が `public/db` を更新する前提なので、**コンテンツJSONは `cache: 'no-store'` を基本**にする。

### `force-dynamic` は使わない

`output: 'export'` と競合するため、`force-dynamic` は使用しない。

---

## 取得パターンは2種類

### 1) エラー表示が不要なデータ（フォールバック継続）

- 取得失敗時は `null` / `[]` などにフォールバックして描画継続
- 一覧の一部や補助データなど、致命的でない箇所に使う

```ts
fetch(`/db/shops/products/${id}/index.json`, { cache: 'no-store' })
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data)) {
      setOnlineItems(data);
    } else {
      setOnlineItems([]);
    }
  })
  .catch(() => setOnlineItems([]));
```

### 2) エラー表示が必要なデータ（失敗をUIで扱う）

- `res.ok` を確認し、失敗時は `isError` などの状態を立てる
- 画面側で「読み込み失敗」などの表示制御を行う

```ts
const [isError, setIsError] = useState(false);

fetch(`/db/xxx.json`, { cache: 'no-store' })
  .then((res) => {
    if (!res.ok) throw new Error('fetch failed');
    return res.json();
  })
  .then((json) => {
    setData(json);
    setIsError(false);
  })
  .catch(() => {
    setIsError(true);
  });
```

---

## 追加ルール

- 必要に応じて `?t=${Date.now()}` を付けてキャッシュ影響をさらに回避してよい
- `count` などオプション値は `?? 0` で安全に扱う
- クエリ `id` 前提ページでは、`id` 不在時は描画しない（`null`返却）
