/* =======================================
 * 黒川温泉観光協会 プライバシーポリシー
 * URL:src/app/privacy/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

import PageTitle from '@/components/PageTitle';
import ContainerPrivacy from '@/components/Privacy/ContainerPrivacy';

export const generateMetadata = (): Metadata => {
  return {
    title:
      'プライバシーポリシー｜黒川温泉観光協会｜熊本・阿蘇の温泉街 旅館・日帰り温泉情報',
    description: isRealProduction
      ? '熊本県阿蘇の黒川温泉観光協会公式情報。旅館一覧、日帰り温泉、入湯手形、観光・アクセス情報など、黒川温泉の魅力をわかりやすくご紹介します。'
      : undefined,
  };
};
export default function PageLaw() {
  return (
    <>
      <PageTitle
        titleEn="privacy policy"
        titleJp="プライバシーポリシー"
        bgKey="privacy"
      />
      <ContainerPrivacy />
    </>
  );
}
