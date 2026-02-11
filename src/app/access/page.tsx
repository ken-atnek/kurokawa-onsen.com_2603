/* =======================================
 * 黒川温泉観光協会 交通アクセス
 * URL:src/app/about/page.tsx
 * Created: 2026-02-11
 * Last updated: 2026-02-11
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerAccess from '@/components/Access/ContainerAccess';

export const generateMetadata = (): Metadata => {
  return {
    title:
      '交通アクセス｜黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageAccess() {
  return (
    <>
      <PageTitle titleEn="ACCESS" titleJp="交通アクセス" bgKey="access" />
      <ContainerAccess />
    </>
  );
}
