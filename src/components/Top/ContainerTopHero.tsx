/* =======================================
 * 黒川温泉観光協会 HERO
 * URL:src/components/Top/ContainerTopHero.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-09
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';

export default function ContainerTopHero() {
  return (
    <section className={styles.containerTopHero}>
      <div className={styles.boxImage}>
        <picture>
          <source src="/images/top/hero01.webp" />
          <img src="/images/top/hero01.webp" alt="黒川温泉の湯あかり画像" />
        </picture>
      </div>
      <div className={styles.itemLogo}>
        <svg role="img" aria-labelledby="heroLogoTitle">
          <title id="heroLogoTitle">黒川温泉観光協会</title>
          <use href="#svg_logo" />
        </svg>
      </div>
      <div className={styles.boxWeather}>
        <p>今日の黒川</p>
        <span>2.3</span>
      </div>
    </section>
  );
}
