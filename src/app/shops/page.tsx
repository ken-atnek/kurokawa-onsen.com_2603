/* =======================================
 * 黒川温泉観光協会 加盟店一覧ページ
 * URL: src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-14
 * ======================================= */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import PageTitle from '@/components/PageTitle';
import ShopsList from '@/components/Shops/ShopsList';

import { getShopStatusView } from '@/lib/status';
import type { ShopStatusView } from '@/lib/status';
import { buildShopsWithStatus } from '@/lib/shops/buildShopsWithStatus';
import { getHoursRow } from '@/lib/shops/getHoursRow';

import type {
  ShopIndexItem,
  ShopDetail,
  ShopWithStatus,
} from '@/types/shop';

/* =======================================
 * Page
 * ======================================= */
export default async function ShopsPage() {
  const indexPath = path.join(process.cwd(), 'public/db/shops/shopsIndex.json');

  const file = await readFile(indexPath, 'utf8');
  const shops: ShopIndexItem[] = JSON.parse(file);

  // details がある店舗だけ status を生成（共通関数）
  const shopsWithStatusFromDetails = await buildShopsWithStatus<ShopDetail>({
    indexJsonPath: indexPath,
    createStatus: (detail) => {
      const hoursRow = getHoursRow(detail.info.hours);
      const timeRanges = hoursRow?.timeRanges ?? [];

      return getShopStatusView({
        fallbackKey: detail.statusFallbackKey,
        closedWeekdays: detail.info.closedWeekdays,
        timeRanges,
      });
    },
  });

  // details が無い店舗も一覧から落とさない（従来の挙動を維持）
  const byId = new Map<string, ShopWithStatus>(
    shopsWithStatusFromDetails.map((s) => [s.id, s])
  );

  const defaultStatus: ShopStatusView = {
    key: 'other',
    label: '確認中',
    variant: 'other',
  };

  const shopsWithStatus: ShopWithStatus[] = shops.map((shop) => {
    const found = byId.get(shop.id);
    if (found) return found;

    return {
      ...shop,
      status: defaultStatus,
    } as ShopWithStatus;
  });

  const grouped = shopsWithStatus.reduce<Record<string, ShopWithStatus[]>>(
    (acc, shop) => {
      const key = shop.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(shop);
      return acc;
    },
    {}
  );

  return (
    <>
      <PageTitle titleEn="Member Shops" titleJp="加盟店一覧" bgKey="shops" />
      <ShopsList grouped={grouped} />
    </>
  );
}
