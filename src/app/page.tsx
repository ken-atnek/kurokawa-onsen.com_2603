/* =======================================
 * 黒川温泉観光協会 TOPページ
 * URL: /src/app/page.tsx
 * Referenced in: /
 * Created: 2026-02-09
 * Last updated: 2026-09-05
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerTopAssociationOverview from '@/components/Top/ContainerTopAssociationOverview';
import ContainerTopHero from '@/components/Top/ContainerTopHero';
import ContainerTopNews from '@/components/Top/ContainerTopNews';
import ContainerTopAbout from '@/components/Top/ContainerTopAbout';
import ContainerTopBan from '@/components/Top/ContainerTopBan';
import ContainerTopShopListServer from '@/components/Top/ContainerTopShopList.server';
import ContainerTopReservationAvailability from '@/components/Top/ContainerTopReservationAvailability';

export const generateMetadata = (): Metadata => {
  return {
    title: '黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function Home() {
  return (
    <>
      <ContainerTopHero />
      <ContainerTopShopListServer />
      <ContainerTopReservationAvailability />
      <ContainerTopAbout />
      <ContainerTopNews />
      <ContainerTopBan />
      <ContainerTopAssociationOverview />
    </>
  );
}
