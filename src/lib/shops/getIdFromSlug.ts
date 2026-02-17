/* =======================================
 * slug → id変換ユーティリティ
 * URL: src/lib/shops/getIdFromSlug.ts
 * Created: 2026-02-16
 * ======================================= */

import fs from 'fs';
import path from 'path';

/**
 * 店舗のslugからidを取得する
 * shopsIndex.jsonから該当する店舗を検索し、idを返す
 * 見つからない場合や読み込みエラーの場合はslugをそのまま返す
 */
export function getIdFromSlug(slug: string): string {
  const indexPath = path.join(
    process.cwd(),
    'public/db/shops/shopsIndex.json'
  );

  try {
    const file = fs.readFileSync(indexPath, 'utf-8');
    const shops = JSON.parse(file) as Array<{ id: string; slug: string }>;
    const shop = shops.find((s) => s.slug === slug);
    return shop?.id ?? slug;
  } catch {
    return slug;
  }
}
