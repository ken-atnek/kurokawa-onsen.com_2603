/* =======================================
 * Kurokawa Onsen Tourism Association English Top Page
 * URL: src/app/(en)/en/page.tsx
 * Referenced in: /en/
 * Created: 2026-10-12
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerTopHero from '@/components/Top/ContainerTopHero';
import ContainerTopAboutEn from '@/components/Top/ContainerTopAboutEn';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Kurokawa Onsen Tourism Association | Kumamoto, Aso',
    description: isRealProduction
      ? 'Official visitor information for Kurokawa Onsen in Kumamoto, Japan, including accommodation, dining, shopping, seasonal events and access.'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/en/',
        languages: {
          ja: '/',
          en: '/en/',
        },
      },
    }),
  };
};

export default function EnglishHome() {
  return (
    <>
      <ContainerTopHero locale="en" />
      <ContainerTopAboutEn />
    </>
  );
}
