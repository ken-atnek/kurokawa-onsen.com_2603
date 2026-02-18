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
          <dt>販売業者</dt>
          <dd>黒川温泉観光協会</dd>

          <dt>運営統括責任者名</dt>
          <dd>音成　貴道</dd>

          <dt>郵便番号</dt>
          <dd>869-2402</dd>

          <dt>住所</dt>
          <dd>熊本県阿蘇郡南小国町満願寺黒川温泉6595-3べっちん館</dd>

          <dt>商品代金以外の料金の説明</dt>
          <dd>
            送料・代金引換手数料をご負担いただきます。
            <br />
            ■代金引換手数料■ 一律324円
            <br />
            ※お支払い金額が300,000円（税込）を越える場合はご利用できません。
            <br />
            申し訳ございませんが、他の決済方法をご利用ください。
          </dd>

          <dt>申込有効期限</dt>
          <dd>
            【代金引換・クレジットカード決済のお客様】
            <br />
            配送時に商品をお受け取り下さい。
            <br />
            尚、商品お引渡しの際ご不在だった場合は配送業者の不在伝票の日数内に必ず商品をお受け取り下さい。
          </dd>

          <dt>不良品</dt>
          <dd>
            万一発送中の破損、不良品、あるいはご注文と違う商品が届いた場合のみ返品をお受けいたします。
            <br />
            当店の在庫状況を確認のうえ、新品、または同等品と交換させていただきます。
          </dd>

          <dt>販売数量</dt>
          <dd>
            商品は在庫限りとさせていただきます。ご注文いただきました商品が在庫切れの場合は、TEL、またはメールでご連絡差し上げます。
          </dd>

          <dt>引渡し時期</dt>
          <dd>
            【代金引換・クレジットカード決済のお客様】
            <br />
            ご注文を受けてから7日以内に発送いたします。
          </dd>

          <dt>お支払い方法</dt>
          <dd>
            代金引換、クレジット決済をご用意しております。ご希望に合わせて、各種ご利用下さい。
          </dd>

          <dt>お支払い期限</dt>
          <dd>
            代金引換：商品引渡時に配達ドライバーに直接お支払い下さい。
            <br />
            クレジットカード決済：各クレジットカード会社に準じます。
          </dd>

          <dt>返品期限</dt>
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

          <dt>公開メールアドレス</dt>
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
