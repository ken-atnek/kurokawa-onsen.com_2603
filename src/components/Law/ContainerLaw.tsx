/* =======================================
 * 黒川温泉観光協会 特定商取引法に基づく表記
 * URL:src/components/Law/ContainerLaw.tsx
 * Referenced in: src/app/law/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */
import styles from '@/styles/PageTerms.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

export default function ContainerLaw() {
  return (
    <section className={styles.containerLaw}>
      <article className={styles.blockLaw}>
        <p className={styles.headTitle}>特定商取引法に基づく表記</p>

        <dl>
          <dt>販売業者名</dt>
          <dd>黒川温泉観光協会</dd>

          <dt>販売責任者</dt>
          <dd>音成　貴道</dd>

          <dt>郵便番号</dt>
          <dd>869-2402</dd>

          <dt>住所</dt>
          <dd>熊本県阿蘇郡南小国町満願寺黒川温泉6595-3べっちん館</dd>

          <dt>販売価格</dt>
          <dd>各商品ページをご参照ください</dd>
          <dt>販売数量</dt>
          <dd>各商品ページをご参照ください</dd>
          <dt>商品以外の必要料金</dt>
          <dd>ご購入の際の送料</dd>
          <dt>お支払い方法</dt>
          <dd>クレジットカード</dd>
          <dt>商品引渡し時期</dt>
          <dd>
            ご注文から60日以内に発送いたします。
            <br />
            年末年始、その他連休はこの限りではありません。
          </dd>

          <dt>返品（キャンセル）期限</dt>
          <dd>
            ・お客様のご都合によるご返品にはご対応できかねますので予めご了承ください。
            <br />
            ・不良品があった場合は商品到着後2日以内にE-mailまたはTELにてご連絡ください。
            <br />
            ・一度開封された商品（開封後不良品とわかった場合を除く）、お客様の責任でキズや汚れが生じた商品の返品はお受けできません。
            <br />
            <br />
            ※商品到着後、中身のご確認をお願い致します。
            <br />
            ※いずれの場合も商品到着後3日以上経過した商品についての返品はお受けできません。
            <br />
            ※不良品の際は返送料をこちらが負担いたします。
          </dd>

          <dt>返品送料</dt>
          <dd>
            お客様都合による返品につきましてはお客様のご負担とさせていただきます。不良品に該当する場合は当方で負担いたします。
          </dd>

          <dt>資格・免許</dt>
          <dd>必要なし</dd>

          <dt>屋号またはサービス名</dt>
          <dd>黒川温泉観光協会</dd>

          <dt>電話番号</dt>
          <dd>0967-48-8130</dd>

          <dt>メールアドレス</dt>
          <dd>
            <ExternalLink
              href="mailto:info@kurokawa-onsen.com"
              aria-label="黒川温泉観光協会へメール"
            >
              info@kurokawa-onsen.com
            </ExternalLink>
          </dd>

          <dt>ホームページアドレス</dt>
          <dd>
            <ExternalLink
              href="https://kurokawa-onsen.com/"
              aria-label="黒川温泉観光協会公式サイト"
            >
              https://kurokawa-onsen.com/
            </ExternalLink>
          </dd>
        </dl>
      </article>
    </section>
  );
}
