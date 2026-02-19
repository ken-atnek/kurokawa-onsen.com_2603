/* =======================================
 * 黒川温泉観光協会 加盟店一覧ページ
 * URL: src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-19
 * ======================================= */

import PageTitle from '@/components/PageTitle';
import ShopsListClient from '@/components/Shops/ShopsList.client';

export default function ShopsPage() {
  return (
    <>
      <PageTitle titleEn="Member Shops" titleJp="加盟店一覧" bgKey="shops" />
      <ShopsListClient />
    </>
  );
}
