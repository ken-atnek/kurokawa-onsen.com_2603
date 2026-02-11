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
      {titleEn && <div className={styles.sidebarH2}>{titleEn}</div>}
      {titleJp && <h2>{titleJp}</h2>}
    </section>
  );
}
