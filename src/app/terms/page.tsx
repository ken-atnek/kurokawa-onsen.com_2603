/* =======================================
 * 黒川温泉観光協会 ご利用規約
 * URL:src/app/terms/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerTerms from '@/components/Terms/ContainerTerms';

export const generateMetadata = (): Metadata => {
  return {
    title:
      'ご利用規約｜黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageTerms() {
  return (
    <>
      <PageTitle titleEn="Terms" titleJp="ご利用規約" bgKey="terms" />
      <ContainerTerms />
    </>
  );
}
