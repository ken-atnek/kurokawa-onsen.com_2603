/* =======================================
 * 黒川温泉観光協会 特定商法取引法に基づく表記
 * URL:src/app/law/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerLaw from '@/components/Law/ContainerLaw';

export const generateMetadata = (): Metadata => {
  return {
    title:
      '特定商法取引法に基づく表記｜黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageLaw() {
  return (
    <>
      <PageTitle
        titleEn="Law"
        titleJp="特定商法取引法に基づく表記"
        bgKey="law"
      />
      <ContainerLaw />
    </>
  );
}
