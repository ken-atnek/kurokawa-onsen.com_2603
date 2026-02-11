/* =======================================
 * 黒川温泉観光協会 黒川温泉について
 * URL:src/components/Schedule/ContainerSchedule.tsx
 * Referenced in: : :src/app/about/page.tsx
 * Created: 2026-02-11
 * Last updated: 2026-02-11
 * ======================================= */
import ExternalLink from '@/components/common/ExternalLink';
import clsx from 'clsx';
import styles from '@/styles/PageAccess.module.scss';

export default function ContainerAccess() {
  return (
    <>
      <section className={styles.containerMap}>
        <article>
          <div className={styles.boxImage}>
            <picture>
              <source src="/images/access/access_map.webp" />
              <img
                src="/images/access/access_map.webp"
                alt="黒川温泉アクセスマップ"
              />
            </picture>
            <ExternalLink href="https://maps.app.goo.gl/ijZV94NwB38uJb4b7">
              Google mapで見る
            </ExternalLink>
          </div>
          <div className={styles.boxDlPdf}>
            <p>
              印刷用の地図データをPDFファイルでご用意しております。以下よりダウンロードしてご利用ください。
            </p>
            <ExternalLink href="/public/pdf/kurokawa_wide-map.pdf">
              黒川温泉への道（広域図）
            </ExternalLink>
            <ExternalLink href="/public/pdf/kuronear_local-map.pdf">
              黒川温泉各旅館連絡先・周辺地図
            </ExternalLink>
          </div>
        </article>
      </section>
      <section className={styles.containerAccessDetails}>
        <article>
          <h3>車でお越しの方</h3>
          <p className={styles.sidebarH3}>
            お車でお越しの場合は、国道212号線（日田-阿蘇間）ルート、国道57号線（熊本-阿蘇間）ルート、やまなみハイウェイ（湯布院-阿蘇間）ルートをまず目標にお進みください。57号線、212号線は南小国、または小国まで、やまなみハイウェイは瀬の本までお越しいただきます。
          </p>
          <div className={styles.boxRoute01}>
            <h4>
              熊本駅・熊本空港からお越しの方<button></button>
            </h4>
            <div className={styles.wrapLink}>
              <ExternalLink href="https://maps.app.goo.gl/fRnMaroPVrAimK3y6">
                熊本駅ルート
              </ExternalLink>
              <ExternalLink href="https://maps.app.goo.gl/MwMadzAN86xGjbXG8">
                熊本空港ルート
              </ExternalLink>
            </div>
            <div className={styles.wrapRoute}>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>熊本駅</span>
                <span>熊本空港</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                <span>
                  ミルクロード <i>(県道339号線)</i>
                </span>
              </div>
              <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                黒川温泉
              </div>
            </div>
          </div>
          <div className={styles.boxRoute02}>
            <h4>博多駅・福岡空港からお越しの方</h4>
            <div className={styles.wrapLink}>
              <ExternalLink href="https://maps.app.goo.gl/BaoBRvm4a4JGza8B9">
                博多駅ルート
              </ExternalLink>
              <ExternalLink href="https://maps.app.goo.gl/bREswj9dNqZoUDHF9">
                福岡空港ルート
              </ExternalLink>
            </div>
            <div className={styles.wrapRoute}>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>博多駅</span>
                <span>福岡空港</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                太宰府IC
              </div>
              <div className={styles.itemPoint}>鳥栖JCT</div>
              <div className={styles.itemPoint}>日田IC</div>
              <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                黒川温泉
              </div>
            </div>
          </div>
          <div className={styles.boxRoute03}>
            <h4>
              別府市・北九州市からお越しの方<button></button>
            </h4>
            <div className={styles.wrapLink}>
              <ExternalLink href="https://maps.app.goo.gl/H2WN9z4yu8VuTsDo7">
                別府市ルート
              </ExternalLink>
              <ExternalLink href="https://maps.app.goo.gl/FEy9NSBqezL3eszB7">
                北九州市ルート
              </ExternalLink>
            </div>
            <div className={styles.wrapRoute}>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>別府市</span>
                <span>北九州市</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>別府IC</span>
                <span>大手町IC</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                日出JCT
              </div>
              <div className={styles.itemPoint}>九重IC</div>
              <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                黒川温泉
              </div>
            </div>
          </div>
          <div className={styles.boxRoute04}>
            <h4>
              鹿児島市・宮崎市からお越しの方<button></button>
            </h4>
            <div className={styles.wrapLink}>
              <ExternalLink href="https://maps.app.goo.gl/BNgc6fidZZVpt3X46">
                鹿児島市ルート
              </ExternalLink>
              <ExternalLink href="https://maps.app.goo.gl/yUED5doL8qDH1baT8">
                宮崎市ルート
              </ExternalLink>
            </div>
            <div className={styles.wrapRoute}>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>鹿児島市</span>
                <span>宮崎市</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>鹿児島北IC</span>
                <span>宮崎西IC</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>益城熊本空港IC</span>
                <span>延岡道路</span>
              </div>
              <div className={clsx(styles.itemPoint, styles.item02)}>
                <span>
                  ミルクロード
                  <br />
                  (県道339号線)
                </span>
                <span>北方延岡道路</span>
              </div>
              <div
                className={clsx(
                  styles.itemPoint,
                  styles.checkPoint,
                  styles.kurokawa
                )}
              >
                黒川温泉
              </div>
            </div>
          </div>
        </article>
        <article>
          <h3>公共交通機関でお越しの方</h3>
          <p className={styles.sidebarH3}>
            公共交通機関をご利用の際は、乗り継ぎが発生する場合がございます。
            <br />
            各交通機関の時刻表をご確認いただき、お越しくださいませ。
          </p>
          <div className={styles.boxPublicTransport01}>
            <h4>
              熊本駅・熊本空港からお越しの方<button></button>
            </h4>
            <div className={styles.boxInner}>
              <div className={styles.wrapContents}>
                <div className={clsx(styles.itemPoint, styles.point01)}>
                  <div className={styles.place}>熊本駅</div>
                  <div
                    className={clsx(
                      styles.arrow,
                      styles.point01_01,
                      styles.iconInactive
                    )}
                  >
                    <span>1時間</span>
                  </div>
                  <div className={clsx(styles.arrow, styles.point01_02)}>
                    <span data-number="2">
                      JR豊肥本線 <i>(40分)</i>
                    </span>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerTop)}
                  >
                    <div className={styles.place}>熊本空港</div>
                    <div className={styles.arrow}>
                      <span data-number="1">
                        九州横断バス(3時間)<i>熊本駅から直行</i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerBottom)}
                  >
                    <div className={styles.place}>肥後大津駅</div>
                    <div className={styles.arrow}>
                      <span data-number="3">
                        やまびこ号 <i>(53分)</i>
                      </span>
                    </div>
                    <div className={styles.place}>阿蘇駅</div>
                    <div className={styles.arrow}>
                      <span data-number="4">
                        路線バス<small>産交バス杖立線</small>
                        <i>(53分)</i>
                      </span>
                    </div>
                    <div className={styles.place}>南小国町役場前</div>
                    <div className={clsx(styles.arrow, styles.iconInactive)}>
                      <span data-notice="1">車で10分</span>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                  黒川温泉
                </div>
              </div>
              <div className={styles.wrapNotice}>
                <p className={styles.head}>
                  各交通手段の時刻表や料金等、詳細は下記該当番号のリンクより検索・ご確認いただけます。
                </p>
                <nav>
                  <ExternalLink href="https://www.sankobus.jp/bus/oudan/">
                    <i>1</i>九州横断バス
                  </ExternalLink>
                  <ExternalLink href="https://www.jrkyushu-timetable.jp/cgi-bin/sp/sp-tt_dep.cgi/2862604/">
                    <i>2</i>JR九州豊肥本線 熊本駅→肥後大津方面時刻表
                  </ExternalLink>
                  <ExternalLink href="https://www.sankobus.jp/bus/yamabiko/">
                    <i>3</i>熊本 ー 大分 特急やまびこ号
                  </ExternalLink>
                  <ExternalLink href="https://transfer.navitime.biz/sankobus/pc/map/Top">
                    <i>4</i>産交バス 経路・時刻表検索
                  </ExternalLink>
                </nav>
                <p className={styles.notice}>
                  <i>※1</i>
                  タクシーまたは旅館の送迎車をご利用ください。送迎車に関しては、ご宿泊の旅館にご確認ください。
                </p>
              </div>
            </div>
          </div>
          <div className={styles.boxPublicTransport02}>
            <h4>
              福岡・北九州方面からお越しの方<button></button>
            </h4>
            <div className={styles.boxInner}>
              <div className={styles.wrapContents}>
                <div className={clsx(styles.itemPoint, styles.point01)}>
                  <div className={styles.place}>小倉駅</div>
                  <div className={styles.arrow}>
                    <span data-number="1">
                      JR東海道・山陽新幹線<i>(15分)</i>
                    </span>
                  </div>
                </div>
                <div className={styles.itemPoint}>
                  <div className={styles.place}>博多駅</div>
                </div>
                <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerTop)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="2">
                        高速バス(2時間45分)<i>博多駅から直行</i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerBottom)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="3">
                        JR九州新幹線 <i>(40分)</i>
                      </span>
                    </div>
                    <div className={styles.place}>熊本駅</div>
                    <div className={clsx(styles.arrow, styles.iconInactive)}>
                      <span data-notice="1"></span>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                  黒川温泉
                </div>
              </div>
              <div className={styles.wrapNotice}>
                <p className={styles.head}>
                  各交通手段の時刻表や料金等、詳細は下記該当番号のリンクより検索・ご確認いただけます。
                </p>
                <nav>
                  <ExternalLink href="https://www.jr-odekake.net/eki/top?id=0910106">
                    <i>1</i>小倉駅 駅情報
                  </ExternalLink>
                  <ExternalLink href="https://www.sankobus.jp/bus/kurokawa/">
                    <i>2</i>福岡 ー 黒川温泉バス時刻・運賃
                  </ExternalLink>
                  <ExternalLink href="https://www.jr-odekake.net/eki/top?id=0910127">
                    <i>3</i>博多駅 駅情報
                  </ExternalLink>
                </nav>
                <p className={styles.notice}>
                  <i>※1</i>
                  熊本駅から先のルートは「熊本駅からお越しの方」をご確認ください。
                </p>
              </div>
            </div>
          </div>
          <div className={styles.boxPublicTransport03}>
            <h4>
              大分方面からお越しの方<button></button>
            </h4>
            <div className={styles.boxInner}>
              <div className={styles.wrapContents}>
                <div className={clsx(styles.itemPoint, styles.point01)}>
                  <div className={styles.place}>大分空港</div>
                </div>
                <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerTop)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="1">
                        エアライナー<i>(1時間5分)</i>
                      </span>
                    </div>
                    <div className={styles.place}>大分駅</div>
                    <div className={styles.arrow}>
                      <span data-number="3">
                        JR日豊本線<i>(13分)</i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerBottom)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="2">九州急行バス(2時間10分)</span>
                    </div>
                  </div>
                </div>
                <div className={styles.itemPoint}>
                  <div className={styles.place}>別府駅</div>
                  <div className={styles.arrow}>
                    <span data-number="4">
                      亀の井バス <i>(1時間8分)</i>
                    </span>
                  </div>
                </div>
                <div className={styles.itemPoint}>
                  <div className={styles.place}>湯布院駅</div>
                  <div className={styles.arrow}>
                    <span data-number="5">
                      九州横断バス <i>(1時間37分)</i>
                    </span>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                  黒川温泉
                </div>
              </div>
              <div className={styles.wrapNotice}>
                <p className={styles.head}>
                  各交通手段の時刻表や料金等、詳細は下記該当番号のリンクより検索・ご確認いただけます。
                </p>
                <nav>
                  <ExternalLink href="https://www.oitakotsu.co.jp/">
                    <i>1</i>
                    <i>2</i>大分交通
                  </ExternalLink>
                  <ExternalLink href="https://ekitan.com/transit/fare/sf-7427/st-8062?rp=0">
                    <i>3</i>大分→別府 列車時刻・運賃
                  </ExternalLink>
                  <ExternalLink href="#">
                    <i>4</i>城島・湯布院方面 バス時刻表・運賃
                  </ExternalLink>
                  <ExternalLink href="https://www.sankobus.jp/bus/oudan/">
                    <i>5</i>九州横断バス
                  </ExternalLink>
                </nav>
              </div>
            </div>
          </div>
          <div className={styles.boxPublicTransport04}>
            <h4>
              長崎・佐賀方面からお越しの方<button></button>
            </h4>
            <div className={styles.boxInner}>
              <div className={styles.wrapContents}>
                <div className={clsx(styles.itemPoint, styles.point01)}>
                  <div className={styles.place}>長崎駅</div>
                </div>
                <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerTop)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="1">
                        JRかもめ<i>(1時間20分)</i>
                      </span>
                    </div>
                    <div className={styles.place}>佐賀駅</div>
                    <div className={styles.arrow}>
                      <span data-number="3">
                        リムジン福岡空港線<i>(50分)</i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerBottom)}
                  >
                    <div className={styles.arrow}>
                      <span data-number="2">
                        九州急行バス<i>(2時間10分)</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.itemPoint}>
                  <div className={styles.place}>高速基山</div>
                  <div className={styles.arrow}>
                    <span data-number="3">高速バス(2時間)</span>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                  黒川温泉
                </div>
              </div>
              <div className={styles.wrapNotice}>
                <p className={styles.head}>
                  各交通手段の時刻表や料金等、詳細は下記該当番号のリンクより検索・ご確認いただけます。
                </p>
                <nav>
                  <ExternalLink href="https://www.jrkyushu.co.jp/railway/">
                    <i>1</i>JR九州 駅・きっぷ・列車予約
                  </ExternalLink>
                  <ExternalLink href="https://jik.nishitetsu.jp/busroute?f=busroute&f_list=0000%2CD11057&t_list=0003%2C331490">
                    <i>2</i>佐賀駅バスセンター → 高速基山 バス時刻表
                  </ExternalLink>
                  <ExternalLink href="https://www.sankobus.jp/bus/kurokawa/">
                    <i>3</i>福岡 ー 黒川温泉バス時刻・運賃
                  </ExternalLink>
                </nav>
              </div>
            </div>
          </div>
          <div className={styles.boxPublicTransport05}>
            <h4>
              鹿児島・宮﨑方面からお越しの方<button></button>
            </h4>
            <div className={styles.boxInner}>
              <div className={styles.wrapContents}>
                <div className={clsx(styles.itemPoint, styles.checkPoint)}>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerTop)}
                  >
                    <div className={styles.place}>鹿児島中央駅</div>
                    <div className={styles.arrow}>
                      <span data-number="1">
                        九州新幹線<i>(50分)</i>
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(styles.checkPointInner, styles.innerBottom)}
                  >
                    <div className={styles.place}>宮崎駅</div>
                    <div className={styles.arrow}>
                      <span data-number="2">
                        高速バス<i>(3時間50分)</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.point01)}>
                  <div className={styles.place}>熊本駅</div>
                  <div className={clsx(styles.arrow, styles.iconInactive)}>
                    <span data-notice="1"></span>
                  </div>
                </div>
                <div className={clsx(styles.itemPoint, styles.kurokawa)}>
                  黒川温泉
                </div>
              </div>
              <div className={styles.wrapNotice}>
                <p className={styles.head}>
                  各交通手段の時刻表や料金等、詳細は下記該当番号のリンクより検索・ご確認いただけます。
                </p>
                <nav>
                  <ExternalLink href="#">
                    <i>1</i>鹿児島中央駅 駅情報
                  </ExternalLink>
                  <ExternalLink href="https://www.sankobus.jp/bus/nanpu/">
                    <i>2</i>宮崎 ー 熊本 バス時刻・運賃
                  </ExternalLink>
                </nav>
                <p className={styles.notice}>
                  <i>※1</i>
                  熊本駅から先のルートは「熊本駅からお越しの方」をご確認ください。
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
