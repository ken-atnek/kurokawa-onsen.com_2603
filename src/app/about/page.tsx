/* =======================================
 * 黒川温泉観光協会 黒川温泉とは
 * URL:src/app/about/page.tsx
 * Created: 2026-02-11
 * Last updated: 2026-02-11
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerAbout from '@/components/About/ContainerAbout';

export const generateMetadata = (): Metadata => {
  return {
    title:
      '黒川温泉とは｜黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageAbout() {
  return (
    <>
      <PageTitle titleEn="ABOUT" titleJp="黒川温泉とは" bgKey="about" />
      <ContainerAbout />
    </>
  );
}
