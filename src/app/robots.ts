import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

export const dynamic = 'force-static';

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE || 'https://kurokawa-onsen.com/'
);

export default function robots(): MetadataRoute.Robots {
  if (!isRealProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
