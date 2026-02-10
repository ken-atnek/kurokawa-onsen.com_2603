/* =======================================
 * 黒川温泉観光協会 観光協会について
 * URL:src/components/Top/ContainerTopAbout.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-10
 * Last updated: 2026-02-10
 * ======================================= */
'use client';
import styles from '@/styles/PageTop.module.scss';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function ContainerTopAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 画面内にある間だけ動かす
      if (rect.bottom < 0 || rect.top > windowH) return;

      const progress = -rect.top * 0.3; // ← 効き具合（0.15〜0.3で調整）
      bg.style.transform = `translateY(${progress}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.containerTopAbout}>
      <div className={styles.bg}>
        <div ref={bgRef}></div>
      </div>
      <div className={styles.boxHead}>
        <div className={styles.itemLogo}>
          <svg role="img" aria-labelledby="logoTitle">
            <title id="logoTitle">黒川温泉観光協会</title>
            <use href="#svg_logo" />
          </svg>
        </div>
        <h2>黒川温泉観光協会について</h2>
        <p>
          黒川温泉観光協会は、地域の自然・歴史・温泉文化を守り育て、その価値を未来へと伝える団体です。
          <br />
          伝統を尊重しながら、地域と来訪者を結ぶ架け橋となり、
          <br />
          持続可能な観光の実現に取り組んでいます。
        </p>
      </div>
      <article>
        <h3>黒川温泉とは</h3>
        <div className={styles.boxContents}>
          <div className={styles.itemImage}>
            <picture>
              <source src="/images/about/hero.webp" />
              <img src="/images/about/hero.webp" alt="黒川温泉を散策する画像" />
            </picture>
          </div>
          <p>
            阿蘇の山あいに佇む黒川温泉は、
            <br />
            統一された景観とおもてなし文化が息づく温泉街です。
          </p>
          <Link href="#"></Link>
        </div>
      </article>
      <article>
        <h3>年間スケジュール</h3>
        <div className={styles.boxContents}>
          <div className={styles.itemImage}>
            <picture>
              <source src="/images/schedule/hero.webp" />
              <img
                src="/images/schedule/hero.webp"
                alt="黒川温泉を散策する画像"
              />
            </picture>
          </div>
          <p>
            四季折々の自然とともに、
            <br />
            黒川温泉では年間を通して多彩な催しを開催しています。
          </p>
          <Link href="/schedule/"></Link>
        </div>
      </article>
    </section>
  );
}
