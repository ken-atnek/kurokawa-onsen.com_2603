/* =======================================
 * Kurokawa Onsen Tourism Association English Shops Page
 * URL: src/app/(en)/en/shops/page.tsx
 * Referenced in: /en/shops/
 * Created: 2026-10-12
 * ======================================= */

import type { Metadata } from 'next';
import PageTitle from '@/components/PageTitle';
import ShopsListClient from '@/components/Shops/ShopsList.client';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Shops & Restaurants | Kurokawa Onsen',
    description: isRealProduction
      ? 'Browse restaurants, cafés, souvenir shops and services in Kurokawa Onsen.'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/en/shops/',
        languages: {
          ja: '/shops/',
          en: '/en/shops/',
        },
      },
    }),
  };
};

export default function EnglishShopsPage() {
  return (
    <>
      <PageTitle
        titleEn="Member Shops"
        titleJp="Shops & Restaurants"
        bgKey="shops"
      />
      <ShopsListClient locale="en" />
    </>
  );
}
