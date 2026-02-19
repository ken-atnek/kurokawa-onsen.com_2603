/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ
 * URL: src/app/shops/[id]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-19
 * ======================================= */

import ShopDetailClient from '@/components/Shops/ShopDetailClient';
import fs from 'fs';
import path from 'path';

// 静的export用：id一覧をビルド時に生成
export function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/db/shops/shopsIndex.json');

  if (!fs.existsSync(filePath)) return [];

  const file = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(file);

  if (!Array.isArray(data)) return [];

  return data
    .map((item: { id?: unknown }) => item.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
    .map((id) => ({ id }));
}

// Next 16.x では params が Promise 扱いになるため await 必須
export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ShopDetailClient id={id} />;
}
