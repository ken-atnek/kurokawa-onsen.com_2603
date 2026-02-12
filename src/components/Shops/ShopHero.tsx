/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(HERO)
 * URL: src/components/Shops/ShopHero.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/PageShopDetails.module.scss';

type Props = {
  src: string;
  alt: string;
};

export default function ShopHero({ src, alt }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);

      rafId = window.requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        // 画面内にいるときだけ動かす（軽量）
        if (rect.bottom <= 0 || rect.top >= vh) return;

        // rect.top が 0→vh の範囲で 0→1 になる感じ
        const progress = Math.min(
          Math.max((vh - rect.top) / (vh + rect.height), 0),
          1
        );

        // 動かす量(px)（強すぎると酔うので控えめ）
        const MAX = 120;
        setOffsetY(-1 * (progress - 0.5) * MAX);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={ref} className={styles.containerHero}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className={styles.heroImage}
        style={{ transform: `translateY(${offsetY}px) scale(1.12)` }}
      />
    </section>
  );
}
