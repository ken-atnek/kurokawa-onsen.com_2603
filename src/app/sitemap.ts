import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

export const dynamic = 'force-static';

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE || 'https://kurokawa-onsen.com/'
);

const routes = [
  '/',
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
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
