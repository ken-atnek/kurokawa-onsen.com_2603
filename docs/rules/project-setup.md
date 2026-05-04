## プロジェクト概要

Next.js（App Router）+ TypeScript + SCSS による静的サイト運用プロジェクト。
基本方針は **静的HTML（Next export） + クライアントでJSON取得**。

## 目的

- 共有サーバー/FTP運用でも安定させる
- DB更新内容をビルドなしで即時反映する
- ビルド頻度を下げて運用負荷を抑える

## 必須設定（next.config.ts）

- `output: 'export'`
- `trailingSlash: true`
- `images: { unoptimized: true }`

## データ運用

- `public/db` は管理画面（DB）が生成・更新する前提
- 取得はクライアント `fetch('/db/...')` を使用
- 基本は `cache: 'no-store'`（必要なら `?t=timestamp` を追加）

## ルーティング運用

- ID増減がある詳細導線は固定ページ + クエリを優先
- 例: `/shops/detail?id=006`
- `/shops/[id]/` への過度な依存は避ける（export後のID追加で404化しやすいため）

## 実装時の基本姿勢

- 依頼範囲のみ最小変更で対応
- 既存構成・命名・責務分割を尊重
- 大きな構造変更や抽象化は明示依頼がある場合のみ
