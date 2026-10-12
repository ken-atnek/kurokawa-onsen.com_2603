/* =======================================
 * Kurokawa Onsen Tourism Association English About Section
 * URL: src/components/Top/ContainerTopAboutEn.tsx
 * Referenced in: src/app/(en)/en/page.tsx
 * Created: 2026-10-12
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/PageTop.module.scss';

export default function ContainerTopAboutEn() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const progress = -rect.top * 0.3;
      bg.style.transform = `translateY(${progress}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.containerTopAbout} ${styles['is-english']}`}
    >
      <div className={styles.bg}>
        <div ref={bgRef}></div>
      </div>
      <div className={styles.boxHead}>
        <div className={styles.itemLogo}>
          <svg role="img" aria-labelledby="aboutLogoTitleEn">
            <title id="aboutLogoTitleEn">
              Kurokawa Onsen Tourism Association
            </title>
            <use href="#svg_logo" />
          </svg>
        </div>
        <h2>About the Kurokawa Onsen Tourism Association</h2>
        <p>
          The Kurokawa Onsen Tourism Association works to preserve and nurture
          the region&apos;s natural environment, history and onsen culture,
          carrying their value into the future. While respecting tradition, we
          connect the local community with visitors and promote sustainable
          tourism.
        </p>
      </div>
      <article>
        <h3>What is Kurokawa Onsen?</h3>
        <div className={styles.boxContents}>
          <div className={styles.itemImage}>
            <picture>
              <source src="/images/about/hero.webp" />
              <img
                src="/images/about/hero.webp"
                alt="A walk through Kurokawa Onsen"
              />
            </picture>
          </div>
          <p>
            Nestled in the mountains of Aso, Kurokawa Onsen is a hot spring town
            known for its harmonious landscape and warm culture of hospitality.
          </p>
        </div>
      </article>
      <article>
        <h3>Seasonal Events</h3>
        <div className={styles.boxContents}>
          <div className={styles.itemImage}>
            <picture>
              <source src="/images/schedule/hero.webp" />
              <img
                src="/images/schedule/hero.webp"
                alt="A seasonal event in Kurokawa Onsen"
              />
            </picture>
          </div>
          <p>
            Alongside the beauty of each season, Kurokawa Onsen hosts a variety
            of events throughout the year.
          </p>
        </div>
      </article>
    </section>
  );
}
