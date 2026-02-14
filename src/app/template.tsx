'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // ブラウザのスクロール復元も止める（戻る時の挙動が変わる点だけ注意）
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // まず即時
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // その後、描画タイミングでズレるのを潰す（これが効くことが多い）
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [pathname]);

  return <>{children}</>;
}
