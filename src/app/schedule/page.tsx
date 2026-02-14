/* =======================================
 * 黒川温泉観光協会 年間スケジュール
 * URL:src/app/schedule/page.tsx
 * Created: 2026-02-10
 * Last updated: 2026-02-10
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerSchedule from '@/components/Schedule/ContainerSchedule';

export const generateMetadata = (): Metadata => {
  return {
    title:
      '年間スケジュール｜黒川温泉観光協会｜｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageSchedule() {
  return (
    <>
      <PageTitle
        titleEn="SCHEDULE"
        titleJp="年間スケジュール"
        bgKey="schedule"
      />
      <ContainerSchedule />
    </>
  );
}
