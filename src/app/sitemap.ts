import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

export const dynamic = 'force-static';

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE || 'https://kurokawa-onsen.com/'
);

const routes = [
  '/',
  '/en/',
  '/en/shops/',
  '/about/',
  '/shops/',
  '/shops/products/',
  '/schedule/',
  '/access/',
  '/terms/',
  '/privacy/',
  '/law/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isRealProduction) {
    return [];
  }

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/en/' ? 'weekly' : 'monthly',
    priority: route === '/' || route === '/en/' ? 1 : 0.7,
    ...((route === '/' || route === '/en/') && {
      alternates: {
        languages: {
          ja: new URL('/', siteUrl).toString(),
          en: new URL('/en/', siteUrl).toString(),
        },
      },
    }),
    ...((route === '/shops/' || route === '/en/shops/') && {
      alternates: {
        languages: {
          ja: new URL('/shops/', siteUrl).toString(),
          en: new URL('/en/shops/', siteUrl).toString(),
        },
      },
    }),
  }));
}
