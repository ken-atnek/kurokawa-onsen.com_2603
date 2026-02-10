/* =======================================
 * ページタイトル
 * URL: src/components/PageTitle.tsx
 * Created: 2026-02-10
 * Last updated: 2026-02-10
 * ======================================= */

import styles from './PageTitle.module.scss';
import clsx from 'clsx';

type Props = {
  titleJp?: string;
  titleEn?: string;
  bgKey?: string;
};

export default function PageTitle({ titleJp, titleEn, bgKey }: Props) {
  return (
    <section
      className={clsx(styles.containerPageTop, bgKey && styles[`bg-${bgKey}`])}
    >
      <h1>
        <svg role="img" aria-labelledby="heroLogoTitle">
          <title id="heroLogoTitle">黒川温泉観光協会</title>
          <use href="#svg_logo" />
        </svg>
      </h1>
      {titleEn && <div className={styles.sidebarH2}>{titleEn}</div>}
      {titleJp && <h2>{titleJp}</h2>}
    </section>
  );
}
