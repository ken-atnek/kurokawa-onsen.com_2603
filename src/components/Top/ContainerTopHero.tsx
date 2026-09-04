/* =======================================
 * 黒川温泉観光協会 HERO
 * URL:src/components/Top/ContainerTopHero.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-09
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/PageTop.module.scss';

type WeatherResponse = {
  current?: {
    temperature_2m?: number;
  };
};

const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/jma?latitude=33.0778&longitude=131.1438&current=temperature_2m&timezone=Asia%2FTokyo';

export default function ContainerTopHero() {
  const [temperature, setTemperature] = useState<string>('--');

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(WEATHER_API_URL, { cache: 'no-store' });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as WeatherResponse;
        const currentTemperature = data.current?.temperature_2m;

        if (typeof currentTemperature === 'number') {
          setTemperature(currentTemperature.toFixed(1));
        }
      } catch {
        // 気温取得に失敗した場合は初期表示のままにする
      }
    };

    void fetchTemperature();
  }, []);

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
        <span>{temperature}</span>
      </div>
    </section>
  );
}
