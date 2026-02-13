/* =======================================
 * 黒川温泉観光協会 加盟店一覧ページ
 * URL: src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */

import fs from 'fs';
import path from 'path';
import PageTitle from '@/components/PageTitle';
import { getShopStatusView } from '@/lib/status';
import type {
  ShopIndexItem,
  ShopDetail,
  ShopTimeRange,
  ShopWithStatus,
} from '@/types/shop';
import ShopsList from '@/components/Shops/ShopsList';
import type { ShopStatusView } from '@/lib/status';

/* =======================================
 * Page
 * ======================================= */
export default function ShopsPage() {
  const indexPath = path.join(process.cwd(), 'public/db/shops/shopsIndex.json');

  const file = fs.readFileSync(indexPath, 'utf-8');
  const shops: ShopIndexItem[] = JSON.parse(file);

  const shopsWithStatus = shops.map((shop) => {
    const detailPath = path.join(
      process.cwd(),
      `public/db/shops/details/${shop.id}.json`
    );

    let status: ShopStatusView = {
      key: 'other',
      label: '確認中',
      variant: 'other',
    };

    if (fs.existsSync(detailPath)) {
      const detailFile = fs.readFileSync(detailPath, 'utf-8');
      const detail: ShopDetail = JSON.parse(detailFile);

      const hoursRow = detail.info.hours.find(
        (row): row is { label: string; timeRanges: ShopTimeRange[] } =>
          row.label === '営業時間' && 'timeRanges' in row
      );

      const timeRanges = hoursRow?.timeRanges ?? [];

      status = getShopStatusView({
        fallbackKey: detail.statusFallbackKey,
        closedWeekdays: detail.info.closedWeekdays,
        timeRanges,
      });
    }

    return {
      ...shop,
      status,
    };
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
