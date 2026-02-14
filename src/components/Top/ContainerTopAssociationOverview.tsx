/* =======================================
 * 黒川温泉観光協会 協会概要
 * URL:src/components/Top/ContainerTopAssociationOverview.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-09
 * ======================================= */

import ExternalLink from '@/components/common/ExternalLink';
import styles from '@/styles/PageTop.module.scss';

export default function ContainerTopAssociationOverview() {
  return (
    <section className={styles.containerTopAssociationOverview}>
      <article>
        <h2>協会の概要</h2>
        <dl>
          <div>
            <dt>名称</dt>
            <dd>黒川温泉観光協会</dd>
          </div>
          <div>
            <dt>住所</dt>
            <dd>
              <address>
                <i>〒869-2402</i>
                熊本県阿蘇郡南小国町満願寺黒川温泉6595-3べっちん館
              </address>
            </dd>
          </div>
          <div>
            <dt>役員</dt>
            <dd className={styles.itemMember}>
              <span>
                <i>会長</i>音成　貴道
              </span>
              <span>
                <i>副会長</i>北里　竜紀
              </span>
            </dd>
          </div>
          <div>
            <dt>電話番号</dt>
            <dd>
              <ExternalLink href="tel:0967488130">0967-48-8130</ExternalLink>
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
