/* =======================================
 * 黒川温泉観光協会 プライバシーポリシー
 * URL:src/components/Privacy/ContainerPrivacy.tsx
 * Referenced in: src/app/privacy/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */
import styles from '@/styles/PageTerms.module.scss';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';

export default function ContainerPrivacy() {
  return (
    <section className={styles.containerPrivacy}>
      <article className={styles.blockPrivacy}>
        <p className={styles.headTitle}>プライバシーポリシー</p>

        <dl>
          <dt>基本方針</dt>
          <dd>
            黒川温泉観光協会（以下「当協会」）は、個人情報の重要性を認識し、個人情報保護に関する法令等を遵守するとともに、
            本ポリシーに基づき適切な取り扱いと保護に努めます。
          </dd>

          <dt>取得する情報</dt>
          <dd>
            当協会は、お問い合わせ等の際に、氏名、連絡先（メールアドレス・電話番号等）、内容など、必要な範囲で個人情報を取得する場合があります。
          </dd>

          <dt>利用目的</dt>
          <dd>
            取得した個人情報は、以下の目的の範囲で利用します。
            <ul>
              <li>お問い合わせへの対応、連絡</li>
              <li>資料送付など、依頼いただいた対応の実施</li>
              <li>本サイトの改善やサービス向上のための参考</li>
            </ul>
          </dd>

          <dt>第三者提供</dt>
          <dd>
            当協会は、法令に基づく場合等を除き、本人の同意なく個人情報を第三者に提供しません。
          </dd>

          <dt>安全管理</dt>
          <dd>
            当協会は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
          </dd>

          <dt>Cookie等の利用について</dt>
          <dd>
            本サイトでは、利便性向上やアクセス解析のためにCookie等を利用する場合があります。
            Cookieによって個人を特定する情報を取得するものではありません。
            <br />
            Cookieの受け入れ可否はブラウザ設定で変更できます。
          </dd>

          <dt>外部サービスの利用</dt>
          <dd>
            本サイトでは、アクセス解析等の目的で外部サービスを利用する場合があります。
            外部サービスにおける情報の取り扱いについては、各事業者のポリシーをご確認ください。
          </dd>

          <dt>開示・訂正・削除等</dt>
          <dd>
            本人から、個人情報の開示・訂正・削除等を求められた場合は、本人確認のうえ、法令に従い適切に対応します。
          </dd>

          <dt>お問い合わせ窓口</dt>
          <dd>
            本ポリシーに関するお問い合わせは、以下までご連絡ください。
            <br />
            <ExternalLink
              href="mailto:info@kurokawa-onsen.com"
              aria-label="黒川温泉観光協会へメール"
            >
              info@kurokawa-onsen.com
            </ExternalLink>
            <br />
            もしくは
            <Link href="/law">特定商取引法に基づく表記</Link>
            の連絡先をご参照ください。
          </dd>

          <dt>改定</dt>
          <dd>
            当協会は、必要に応じて本ポリシーを改定することがあります。改定後の内容は、本サイトに掲載した時点から効力を生じます。
          </dd>
        </dl>
      </article>
    </section>
  );
}
