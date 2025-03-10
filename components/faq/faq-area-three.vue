<template>
  <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
    <div class="main-container">
      <div class="search-container" @click="openSearchInput('block')">
        <div class="search-btn" v-if="!is_search">
          <svg @click="openSearchInput" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            class="prefix__search-image prefix__search-svg-icon" role="none">
            <path
              d="M10.961 5c3.292 0 5.961 2.669 5.961 5.961 0 1.37-.462 2.631-1.238 3.638l3.264 3.266c.063.062.075.156.038.23l-.038.052-.8.801c-.063.063-.157.075-.232.038l-.051-.038-3.266-3.264c-1.007.776-2.268 1.238-3.638 1.238C7.67 16.922 5 14.253 5 10.962 5 7.668 7.669 5 10.961 5zm-.005 1.079c-2.694 0-4.877 2.183-4.877 4.877s2.183 4.877 4.877 4.877 4.877-2.183 4.877-4.877-2.183-4.877-4.877-4.877z"
              transform="translate(-1109 -144) translate(1109 144)"></path>
          </svg>
        </div>
        <span style="position: absolute; top: 2px; left: 5px; height: 24px; width: 24px; z-index: 101;">
          <svg v-if="is_search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            class="prefix__search-image prefix__search-svg-icon" role="none">
            <path
              d="M10.961 5c3.292 0 5.961 2.669 5.961 5.961 0 1.37-.462 2.631-1.238 3.638l3.264 3.266c.063.062.075.156.038.23l-.038.052-.8.801c-.063.063-.157.075-.232.038l-.051-.038-3.266-3.264c-1.007.776-2.268 1.238-3.638 1.238C7.67 16.922 5 14.253 5 10.962 5 7.668 7.669 5 10.961 5zm-.005 1.079c-2.694 0-4.877 2.183-4.877 4.877s2.183 4.877 4.877 4.877 4.877-2.183 4.877-4.877-2.183-4.877-4.877-4.877z"
              transform="translate(-1109 -144) translate(1109 144)"></path>
          </svg>
        </span>
        <span @click="searchQuery = '', is_search = false" v-if="is_search"
          style="position: absolute; top: 10px; right: 8px; height: 18px; width: 18px; z-index: 101; font-size: 16px; cursor: pointer;">
          X
        </span>
        <input :class="{
            show: is_search,
            'border-only': is_search && !is_focus,
          }" v-model="searchQuery" @input="searchFaqs" @blur="handleBlur" @focus="is_focus = true" type="text"
          placeholder="正在尋找某樣東西?" class="search-input" />
      </div>
      <p class="search-result-tag" v-if="searchQuery != ''">
        <span v-if="filteredFaqs.length > 0"
          style="font-size: 14px; font-weight: 300; letter-spacing: 2px; line-height: 1; margin-bottom: 0px; padding: 0px; padding-left: 20px">Showing
          results for: <strong>{{ searchQuery }}</strong></span>
      <p v-else
        style="font-size: 14px; font-weight: 300; letter-spacing: 2px; line-height: 1.5; margin-bottom: 0px; padding-top: 10px; padding-left: 20px">
        Sorry, we could not find any results to match your search criteria.<br> Please try again with some different
        keywords.
      </p>
      </p>
      <div class="mobile-select d-lg-none" v-if="searchQuery == ''">
        <p>Choose a category</p>
        <div class="select">
          <select v-model="activeTab" @change="handleTabChange">
            <!-- <option value="nav-all">全部</option> -->
            <option value="nav-services">想申請服務</option>
            <option value="nav-unit">想成為試辦單位</option>
            <option value="nav-worker">我是多元陪伴照顧服務工作者</option>
            <option value="nav-service-unit">我是私立就業服務機構</option>
          </select>
        </div>
      </div>

      <!-- 電腦版 tabs -->
      <nav class="d-none d-lg-block" v-if="searchQuery == ''">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <!-- <button class="nav-link" :class="{ active: activeTab === 'nav-all' }" @click="setActiveTab('nav-all')"
            type="button">
            全部
          </button> -->
          <button class="nav-link" :class="{ active: activeTab === 'nav-services' }"
            @click="setActiveTab('nav-services')" type="button">
            想申請服務
          </button>
          <button class="nav-link" :class="{ active: activeTab === 'nav-unit' }" @click="setActiveTab('nav-unit')"
            type="button">
            想成為試辦單位
          </button>
          <button class="nav-link" :class="{ active: activeTab === 'nav-worker' }" @click="setActiveTab('nav-worker')"
            type="button">
            我是多元陪伴照顧服務工作者
          </button>
          <button class="nav-link" :class="{ active: activeTab === 'nav-service-unit' }"
            @click="setActiveTab('nav-service-unit')" type="button">
            我是私立就業服務機構
          </button>
        </div>
      </nav>

      <div class="tab-content" v-if="searchQuery == ''">
        <div class="tab-pane fade" id="nav-services" role="tabpanel" tabindex="0"
          :class="{ 'show active': activeTab === 'nav-services' }">
          <div class="accordion accordion-style-one" id="accordionTwo">
            <faq-item id="m3" title="什麼是多元陪伴照顧服務？"
              desc="為回應民眾「臨短急」照顧需求，包括長輩「臨」時有狀況卻找不到照顧 人力、外籍家庭看護空窗期的「短」期需要照顧人力、家人手術或病後需 要「急」性後期照顧等，勞動部推動「多元陪伴照顧服務試辦計畫」，由 依法設立滿五年之財團法人或非營利社團法人申請，並通過公益性、專業 度與合理收費等評選標準後成為試辦服務單位，聘僱及培訓本國籍及外國 籍多元陪伴照顧服務工作者到申請服務家庭，提供短期、臨時或持續一定 時間之基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等全額自費之 多元陪伴照顧服務，以減輕家庭照顧負擔。"
              parent="accordionTwo" />

            <faq-item id="m4" title="多元陪伴照顧服務和聘僱家庭看護工有何不同?"
              desc="多元陪伴照顧服務強調臨、短、急之需求服務，並由依法設立的法人組織 聘僱陪伴照顧服務工作者至家戶提供服務，採一對多家庭服務，跳脫家庭 看護工由民眾個人長期聘僱、一對一照顧之形式。"
              parent="accordionTwo" />

            <faq-item id="m5" title="申請多元陪伴照顧服務要具備什麼資格?" desc="要申請使用多元陪伴照顧服務的民眾，需具有陪伴照顧需求且符合下列資 格之一者：<br>

              (1)具有效期間內身心障礙證明。<br>
             
              (2)具有效期間內全民健康保險重大傷病資格。<br>
             
              (3)具三個月內就醫或手術紀錄。 <br>
             
             (4)符合聘僱外國人從事家庭看護工作或中階技術家庭看護工作之被看護者資 格。<br>
             
              (5)經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用本 計畫服務之需求。" parent="accordionTwo" />
            <faq-item id="l4" title="本計畫所提供的服務內容包含哪些項目？"
              desc="多元陪伴照顧服務計畫的服務項目為指派陪伴照顧服務工作者至服務契約履 行地，提供服務對象基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等 服務。" parent="accordionTwo" />
            <faq-item id="l5" title="民眾有身心障礙證明，是否可以申請？申請時需要提供那些文件?"
              desc="民眾若持有身心障礙證明，可以申請多元陪伴照顧服務，申請所需文件為 有效期間內之身心障礙證明。" parent="accordionTwo" />
            <faq-item id="l6" title="民眾有重大傷病資格，是否可以申請？申請時需要提供那些文件?"
              desc="可以。申請所需文件為：具有效期間之重大傷病卡，或全民健保行動快易通 /健康存摺 APP 之重大傷病證明查詢結果，及一年內開具之診斷證明書且載 明宜休養。"
              parent="accordionTwo" />
            <faq-item id="l7" title="民眾有就醫或手術紀錄，是否可以申請?申請時需要提供那些文件?"
              desc="民眾若於申請日前三個月內有就醫或手術紀錄，可以申請多元陪伴照顧服 務，申請時需提供醫師開具之診斷證明，且載明宜休養。" parent="accordionTwo" />
            <faq-item id="l8" title="民眾聘有外籍家庭看護工（或中階家庭看護工）是否可以申請服務? 申請時需要提供那些文件？"
              desc="聘有外籍家庭看護工（或中階家庭看護工）之民眾可申請多元陪伴照顧服 務，申請時需提供符合聘僱外國人資格之有效證明文件、有效期間內之招 募許可或聘僱許可。"
              parent="accordionTwo" />
            <faq-item id="l9" title="民眾有資格申請外籍家庭看護工(或中階家庭看護工)，也已到指定醫院進 行失能診斷評估，但還沒開始聘僱移工，是否可以申請服務? 要提供那些 文件？"
              desc="可以。申請時需提供符合聘僱外國人資格之有效證明文件如：病症暨失能 診斷證明、有效期間內之招募許可。" parent="accordionTwo" />
            <faq-item id="l10" title="民眾已聘僱外籍家庭看護工(或中階家庭看護工)，是否可以申請服務?要提 供那些文件？"
              desc="可以。已聘僱家庭看護工家庭，如果有移工因故（如:返鄉休假、轉換期間、 失聯期間）可以申請服務，檢具初次招募或聘僱許可函，如果試辦單位可 由系統介接到聘僱資料，也可免附文件。"
              parent="accordionTwo" />
            <faq-item id="l11" title="民眾經長期照顧管理中心評估屬長期照顧等級第二級至第八級或有使用長照服務，是否可以申請本計畫？申請時需要提供那些文件?"
              desc="對於照顧需求較高之民眾，可自費使用本計畫之服務，以減輕其家庭照顧 負擔。申請時需提供長期照顧需求評估結果通知書或長照特約單位開立載 有照顧組合名稱之收據。"
              parent="accordionTwo" />
            <faq-item id="l12" title="民眾如符合服務對象所列資格，是否只能申請一個陪伴照顧工作者呢? 還是能申請 2 個或以上陪伴照顧工作者?"
              desc="民眾申請多元陪伴照顧服務後，會由符合資格之試辦服務單位進行陪伴照 顧需求評估(原則申請一位)，試辦單位會依據需求評估(原則申請一位)及 該單位的服務人力狀況，和申請者討論訂定服務提供的人力如何派用及收 費。"
              parent="accordionTwo" />
            <faq-item id="l13" title="本計畫的服務時間為何？可以彈性調整服務時間嗎?"
              desc="本計畫提供的服務時數單次至少 4 小時以上，試辦單位可依據民眾需求彈 性提供服務時段，如為 24 小時者須包括 10 小時休息時數，並應依勞動基 準法之規定，按服務對象需求調整服務時數。"
              parent="accordionTwo" />
            <faq-item id="l14" title="多元陪伴服務的收費標準是按不同試辦單位的定價嗎?"
              desc="多元陪伴照顧服務費用為民眾全額自費服務，各試辦單位依據其承辦經營 之成本提出服務收費標準及說明，並經勞動部核定後公告收費標準，公告 於多元陪伴照顧服務官網。 "
              parent="accordionTwo" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-unit" role="tabpanel" tabindex="0"
          :class="{ 'show active': activeTab === 'nav-unit' }">
          <div class="accordion accordion-style-one" id="accordionThree">
            <faq-item id="seven" title="本計畫之目的為何？"
              desc="勞動部推動「多元陪伴照顧服務試辦計畫」之目的在於回應民眾「臨短 急」照顧需求，包括長輩「臨」時有狀況卻找不到照顧人力、外籍家庭看 護空窗期的「短」期需要照顧人力、家人手術或病後需要「急」性後期照 顧等情況，由依法設立滿五年之財團法人或非營利社團法人申請，並通過 公益性、專業度與合理收費等評選標準後成為試辦服務單位，聘僱及培訓 本國籍及外國籍多元陪伴照顧服務工作者到申請服務家庭，提供短期、臨 時或持續一定時間之基本日常生活照顧、陪同外出、陪同就醫、安全陪伴 等全額自費之多元陪伴照顧服務，以減輕家庭照顧負擔。"
              parent="accordionThree" />
            <faq-item id="eight" title="本計畫服務的對象及需檢附之文件為何？" desc="本計畫之服務對象，為有陪伴照顧需求且符合下列資格之一者，並其需檢 附之文件為：<br>

              (1)具有效期間內身心障礙證明。 檢附文件：有效期間內之身心障礙證明。<br>
             
              (2)具有效期間內全民健康保險重大傷病資格。 檢附文件：有效期間內之重大傷病卡，或全民健保行動快易通 健康存 摺 APP 之重大傷病證明查詢結果，及一年內開具之診斷證明書且載明 宜休養。<br>
             
              (3)具三個月內就醫或手術紀錄。 檢附文件：申請日前三個月內開具之診斷證明書且載明宜休養。<br>
             
              (4)符合聘僱外國人從事家庭看護工作或中階技術家庭看護工作之被看護者 資格。 檢附文件：符合申請聘僱外國人資格之有效證明文件、有效期間內之招 募許可或聘僱許可。<br>
             
              (5)經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用 本計畫服務之需求。 檢附文件：長期照顧需求評估結果通知書或長照特約單位開立載有照顧 組合名稱之收據。"
              parent="accordionThree" />
            <faq-item id="pilot1" title="本計畫的服務內容及服務時間為何？"
              desc="本計畫服務項目為指派陪伴照顧服務工作者至服務契約履行地，提供服務 對象基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等服務。前述提 供服務之時數單次至少 4 小時以上，如為 24 小時者須包括 10 小時休息時數， 並應依勞動基準法之規定，按服務對象需求調整服務時數。"
              parent="accordionThree" />

            <faq-item id="pilot2" title="本計畫之收費標準為何？"
              desc="本計畫之多元陪伴照顧服務費用為民眾全額自費，試辦單位應依本部核定 之多元陪伴照顧服務試辦計畫書所核定內容公告收費標準及收費。如須調 整收費標準，應重新報請勞動部核定。"
              parent="accordionThree" />
            <faq-item id="pilot3" title="申請成為試辦單位的資格條件為何？" desc="依法設立或登記滿五年之財團法人或非營利社團法人" parent="accordionThree" />
            <faq-item id="pilot4" title="申請試辦單位如需委任仲介，仲介應具備資格為何?" desc="試辦單位所委任從事跨國人力仲介業務之私立就業服務機構應符合下列資 格 <br>

              (1)於申請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br> (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。 <br>
              
              (3)於申請日前二年，無違反就業服務法相關法規。" parent="accordionThree" />
            <faq-item id="pilot5" title="申請成為試辦單位應備文件有哪些？" desc="欲申請成為試辦單位應備以下文件資料： <br>

              (1)申請表 <br>
              
              (2)多元陪伴照顧服務試辦計畫書 <br>
              
              (3)法人或團體組織章程、依法設立或登記之證書或許可影本或目的事業主 管機關立案證明文件，且與服務對象相關之內容及具服務實績之證文件。<br>
              
               (4)規劃擬委任私立就業服務機構者，須檢附擬委認知私立就業服務機構之 下列文件： <br>
              
               (A)許可影本  (B)申請日前五年內，評鑑成績依規定均屬於 A 及及績優免評鑑證明  (C)申請日前二年引進外國人人數及類別比率證明文件 <br>
              
              (5)專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻 譯與住宿管理、財務、經營管理、資訊能力等專業之學、經歷證明文件。" parent="accordionThree" />
            <faq-item id="pilot6" title="試辦單位欲委任仲介辦理移工聘僱管理，仲介應具何資格?"
              desc="委任從事跨國人力仲介業務之私立就業服務機構辦理外國籍陪伴照顧服務工 作者之招募、引進、聘僱管理、生活照顧服務、住宿安排及管理等就業服務 事宜。受委任之私立就業服務機構應符合下列資格： (1)請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br>

              (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。<br>
              
               (3)於申請日前二年，無違反就業服務法相關法規。 若試辦單位與私立就業服務機構終止或解除委任關係，得另委任符合前述 規定資格之私立就業服務機構，辦理就業服務等業務，並於另行委任後之 一個月內向本部申請核定變更 " parent="accordionThree" />
            <faq-item id="pilot7" title="本計畫之評選流程為何？" desc="本計畫試辦單位評選流程如下：<br>

              (1)評選前作業（申請單位資格審查）<br>
             
              (2)本計畫專業團隊進行初審  <br>
             
             (3)申請單位進行簡報及詢答  <br>
             
             (4)評選會議進行評選  <br>
             
             (5)評選結果簽報勞動部核定並通知合格試辦單位開辦。" parent="accordionThree" />
            <faq-item id="pilot8" title="評選小組的成員組成為何？" desc="評選小組，置委員七人至九人，由下列成員組成：<br>

              (1)政府相關部會代表 <br>
              
              (2)勞工及雇主團體代表<br>
              
              (3)社會福利或衛生相關領域之專家學者或團體代表<br>
              
              (4)私立就業服務機構相關公會或協會代表" parent="accordionThree" />
            <faq-item id="pilot9" title="評選時之綜合評估項目有哪些？" desc="評選小組就申請單位提報之書面資料，依下列項目綜合評選： <br>

              (1)組織公益性及績優事蹟。 <br>
              
              (2)服務內容及費用標準。  <br>
              
              (3)組織專業性。  <br>
              
              (4)服務品質確保機制。 <br>
              
              (5)外國籍陪伴照顧服務工作者聘僱管理、訓練及後援規劃。  <br>
              
              (6)創新作為。" parent="accordionThree" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-worker" role="tabpanel" tabindex="0"
          :class="{ 'show active': activeTab === 'nav-worker' }">
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine" title="如要應聘為陪伴照顧服務工作者，需具備何種資格?(管 2 科)"
              desc="依審查標準第 8 條規定略以，外國人受聘僱從事多元陪伴照顧服務工作， 其年齡須 20 歲以上，且入國工作前，應經衛生福利部認可之外國健康檢查 醫院或其本國勞工部門指定之訓練單位訓練合格，或在我國境內從事相同 工作滿 6 個月以上者。又所謂相同工作，係指從事家庭幫傭、家庭看護或 機構看護之工作。 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine2" title="陪伴照顧服務工作者能否由不同業別轉換?(管 4 科)"
              desc="(1)移工如欲從事陪伴照顧服務工作，需具備經移工母國中央衛生主管機關認 可之外國人健康檢查醫院，或其本國勞工部門指定之訓練單位訓練合格證 明文件正本及該證明文件雙語認證之證明文件正本。<br>


            (2)移工如有不可歸責事由經本部核准，始得轉換雇主或工作。移工經核准轉 換雇主或工作，於轉換期間連續 14 日內未有同一工作類別之雇主登記承接， 方得跨業轉換雇主或工作。另移工如受聘僱即將期滿，期滿前 2 個月至 4 個月內，經與雇主協議，期滿轉換者，其轉換雇主或工作可由同一工作類 別或不同工作類別新雇主承接 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine3" title="陪伴照顧服務工作者能否轉任中階技術移工?" desc="陪伴照顧服務工作者尚未納入中階技術工作，目前僅能以藍領移工申請。 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine4" title="陪伴照顧服務工作者工作內容及工作項目有哪些呢?"
              desc="目前本計畫提供之服務項目包含基本日常生活照顧、陪同外出、陪同就醫 及安全陪伴等，陪伴照顧工作服務工作者之工作內容係依其雇主(試辦單 位) 與服務申請者所簽訂之服務契約，提供相應之服務。 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine5" title="如擔任陪伴照顧服務工作者，服務前是否需經過訓練?"
              desc="在提供服務前需接受二十小時職前訓練，另到職後至少每三個月接受在職 訓練一次，每年須完成包括工作溝通及陪伴照顧技巧之在職訓練共二十小 時。" parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine6" title="雇主聘僱陪伴照顧服務工作者，雇主應負擔之就業服務法責任期間為何?是 否需負責陪伴照顧服務工作者生活照顧？"
              desc="雇主應自引進陪伴照顧服務工作者入國日或聘僱許可生效日起，至陪伴照顧 服務工作者聘僱關係終止出國或由新雇主接續聘僱日期間，依外國人生活 照顧服務計畫書裁量基準規定負雇主責任。 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine7" title="雇主對於陪伴照顧服務工作者之照顧責任範圍？"
              desc="雇主應自引進陪伴照顧服務工作者入國日或期滿續聘之日起，依就業服務法 之規定負雇主責任。另雇主聘僱外國人許可及管理辦法第 33 條第 1 項規定， 雇主申請聘僱陪伴照顧服務工作者，應依外國人生活照顧服務計畫書確實 執行。 "
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine8" title="雇主聘僱陪伴照顧服務工作者適用哪一種外國人生活照顧服務計畫書？"
              desc="陪伴照顧服務工作者與現行製造業、營造業及及養護機構看護工作等同樣 適用外國人生活照顧服務計畫書裁量基準之附表一(如附件)。 " parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine9" title="雇主聘僱聘僱陪伴照顧服務工作者是否需設置生活照顧服務人員？"
              desc="雇主聘僱外國人從事就業服務法第 46 條第 1 項第 9 款至第 10 款所定工作達 10 人以上者，應依規定設置生活照顧服務人員。" parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine10" title="雇主提供套房給陪伴照顧服務工作者居住，其住宿面積如何計算？"
              desc="雇主自引進陪伴照顧服務工作者入國或聘僱陪伴照顧服務工作者之日起，應 為其安排住宿地點，並依外國人生活照顧服務計畫書執行。倘雇主安排之 陪伴照顧服務工作者宿舍係套房類型，則套房內之浴室及廁所（皆個人使 用）均得計入居住面積，並應提供 3.6 平方公尺以上之住宿面積。"
              parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine11" title=".陪伴照顧服務工作者在臺住宿地點若變更，雇主是否須辦理住宿地點變更 辦理通報？"
              desc="雇主於陪伴照顧服務工作者之住宿地點有變更時，應於變更後 7 日內，以書 面通知外國人工作所在地及住宿地點之當地主管機關。" parent="accordionFour" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine12" title="陪伴照顧服務工作者能否自行在外居住？"
              desc="依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工 作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其 意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴 照顧服務工作者之真意。 "
              parent="accordionFour" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-service-unit" role="tabpanel" tabindex="0"
          :class="{ 'show active': activeTab === 'nav-service-unit' }">
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten" title="多元陪伴服務照顧計畫受任私立就業服務資格為何?更換仲介需再重新核定嗎?" desc="試辦單位經本部評選核定後，得委任從事跨國人力仲介業務之私立就業服 務機構辦理外國籍陪伴照顧服務工作者之招募、引進、聘僱管理、生活照 顧服務、住宿安排及管理等就業服務事宜。 受委任之私立就業服務機構應符合下列資格： <br><br>


            (1)請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br>
            
            (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。 <br>
            
            (3)申請日前二年，無違反就業服務法相關法規。 <br><br>
            
            
            若試辦單位與私立就業服務機構終止或解除委任關係，得另委任符合前述規 定資格之私立就業服務機構，辦理就業服務等業務，並於另行委任後之一個 月內向本部申請核定變更。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten1" title="仲介公司提供哪些服務項目?" desc="(1)接受雇主(以下稱試辦單位)委任辦理聘僱外國人之招募、引進、接續聘僱 及申請求才證明、招募許可、聘僱許可、展延聘僱許可、遞補、轉換雇主、 轉換工作、變更聘僱許可事項、通知外國人連續曠職三日失去聯繫之核備。 <br>

            (2)接受試辦單位或外國人委任辦理在中華民國境內工作外國人之生活照顧服 務、安排入出國、安排接受健康檢查、健康檢查結果函報衛生主管機關、 諮詢、輔導及翻譯。<br>
            
            (3)接受從事本法第 46 條第 1 項第 8 款至第 11 款規定工作之外國人委任，代其 辦理居留業務。" parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten2" title="陪伴照顧服務工作者能否自行在外居住？"
              desc="依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工 作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其 意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴 照顧服務工作者之真意。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten3" title="仲介公司收取費用？"
              desc="(1)試辦單位：雇主如委任仲介公司辦理就業服務業務，且有服務事實，得於 規定數額內收取登記費及介紹費(合計不得超過外國人第 1 個月薪資)與服 務費(每一員工每年不得超過新臺幣 2,000 元)。 <br>

            (2)移工：如移工因其需求而委任仲介辦理就業服務業務，仲介得依其在臺年 資，收取規定金額內之服務費(第 1 年每月新臺幣(以下同)1,800 元、第 2 年每月 1,700 元、第 3 年起每月 1,500 元)，並不得預先收取。 " parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten4" title="如果仲介公司超收費用有何罰則？" desc="如違反收費規定，將處超收費用之仲介公司 10 倍至 20 倍罰鍰，並處以 1 年 以下停業處分。"
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten5" title="仲介公司是否可向有照顧需求家庭收費？"
              desc="不行。本計畫中，雇主為試辦單位，仲介僅得向試辦單位收取雇主應付之 費用，不得向有照顧需求之家庭收取費用，如有違反，將依超收費用處罰" parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten6" title="陪伴照顧服務工作者能否自行在外居住？"
              desc="依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工 作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其 意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴 照顧服務工作者之真意。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten7" title="如仲介有違法情事，應如何申訴？"
              desc="如仲介有違法情事，雇主或移工可向本部 1955 申訴專線，進行申訴，該專 線於接獲移工申訴案件後，將立即以電子派案方式派至各地方政府處理， 並追蹤案件處理情形"
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten8" title="申請聘僱從事多元陪伴照顧服務工作外國人的雇主應具備什麼條件？"
              desc="申請聘僱從事多元陪伴照顧服務工作外國人的雇主應為依法設立或登記滿 5 年之財團法人或非營利社團法人，並應先提報多元陪伴照顧服務計畫及相 關文件向本部申請參與試辦，經審查取得多元陪伴照顧服務計畫核定函者， 應於核定辦理期間內，向本部申請初次招募許可。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten9" title="有關試辦單位可聘僱移工名額數量？"
              desc="依法設立或登記滿五年之財團法人或非營利社團法人應於申請成為試辦單 位時，應於多元陪伴照顧服務計畫書第五項外國籍陪伴照顧服務工作者聘 僱管理、訓練及後援規劃內說明預定聘僱本、外國籍陪伴照顧服務工作者 人數及方式，經本部組成之評選小組依其規劃之服務區域與目標總服務時 數、人數與人次，核定試辦單位可聘僱之移工人數。試辦單位需增加外國 人從事陪伴照顧服務工作核定人數，應就需增加之人數重新報請本部核定。"
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten10" title="陪伴照顧服務工作者能否自行在外居住？"
              desc="依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工 作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其 意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴 照顧服務工作者之真意。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten11" title="是否有聘僱本國籍與外國籍人力比率限制？"
              desc="本計畫未設有聘僱本國籍與外國籍人力比率之限制，惟試辦單位經本部評 選核定後，依就業服務法及雇主聘僱外國人許可及管理辦法，須先以合理 勞動條件辦理國內招募本國勞工，經招募無法滿足其需要後，就該招募人 數不足部分，始得向本部申請辦理招募、聘僱外國籍陪伴照顧服務工作者 相關事項。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten12" title="雇主申請多元陪伴照顧服務工作初次招募許可需檢附文件為何？"
              desc="雇主申請初次招募許可，應檢附申請書、統一編號編配通知書、機構登記 證及負責人身分證影本、團體立案證書影本（人民團體須檢附）、法人登 記證書影本(法人須檢附)、經中央主管機關核定同意辦理多元陪伴照顧服 務計畫之證明文件影本、求才證明書、雇聘辦法證明書、審查費收據向本 部提出申請。"
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten13" title="取得多元陪伴照顧服務工作初次招募許可函後如何申請引進外國人許可？"
              desc="雇主取得聘僱從事多元陪伴照顧服務工作外國人之初次招募許可函後，應 於初次招募許可函發文日起 6 個月內依用人需求向本部申請外國人之聘僱 許可，又因初次招募許可函具入國引進效力，期限屆滿翌日起自動延長 3 個月；逾期未引進者，該初次招募許可函失其效力。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten14" title="多元陪伴照顧服務工作雇主如何申請外國人聘僱許可？"
              desc="多元陪伴照顧服務工作雇主所招募之外國人入國日起 3 工作日內，應安排 其至指定醫院接受健康檢查，及於入國日起 3 日內通知當地主管機關依外 國人生活照顧服務計畫書實施檢查，並於該外國人入國日起 15 日內，檢具 規定之文件向本部申請聘僱許可。 "
              parent="accordionFive" />
          </div>
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten15" title="從事多元陪伴照顧服務工作之外國人如聘僱許可期限即將屆滿，仍有聘僱需求，應如何辦理？"
              desc="從事多元陪伴照顧服務工作外國人聘僱許可期限屆滿前 4 個月內，雇主如 有繼續聘僱外國人之需要，得檢附規定文件向本部申請重新招募許可，本 部將就雇主得聘僱外國人人數 1 次核發重新招募許可，未於聘僱許可期限 屆滿前提出申請者，將予以扣除該部分之外國人人數。雇主可於原外國人 出國 6 個月內，或於外國人聘僱許可有效期間屆滿前 4 個月內，或於外國 人出國前 4 個月內切結遵期出國方式，向本部申請引進新聘僱外國人之入 國引進許可，原聘僱外國人出國前，不得引進新聘僱外國人。 "
              parent="accordionFive" />
          </div>
        </div>
      </div>
      <div class="tab-content" v-if="searchQuery != ''">
        <div class="tab-pane fade show active">
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item v-for="faq in filteredFaqs" :key="faq.id" :id="faq.id" :title="faq.title" :desc="faq.desc"
              parent="accordionSic" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  // 所有 FAQ 資料
  const allFaqs = ref([
    {
      "id": "m3",
      "title": "什麼是多元陪伴照顧服務？",
      "desc": "為回應民眾「臨短急」照顧需求，包括長輩「臨」時有狀況卻找不到照顧 人力、外籍家庭看護空窗期的「短」期需要照顧人力、家人手術或病後需 要「急」性後期照顧等，勞動部推動「多元陪伴照顧服務試辦計畫」，由 依法設立滿五年之財團法人或非營利社團法人申請，並通過公益性、專業 度與合理收費等評選標準後成為試辦服務單位，聘僱及培訓本國籍及外國 籍多元陪伴照顧服務工作者到申請服務家庭，提供短期、臨時或持續一定 時間之基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等全額自費之 多元陪伴照顧服務，以減輕家庭照顧負擔。"
    },
    {
      "id": "m4",
      "title": "多元陪伴照顧服務和聘僱家庭看護工有何不同?",
      "desc": "多元陪伴照顧服務強調臨、短、急之需求服務，並由依法設立的法人組織 聘僱陪伴照顧服務工作者至家戶提供服務，採一對多家庭服務，跳脫家庭 看護工由民眾個人長期聘僱、一對一照顧之形式。"
    },
    {
      "id": "m5",
      "title": "申請多元陪伴照顧服務要具備什麼資格?",
      "desc": "要申請使用多元陪伴照顧服務的民眾，需具有陪伴照顧需求且符合下列資 格之一者：<br> (1)具有效期間內身心障礙證明。<br> (2)具有效期間內全民健康保險重大傷病資格。<br> (3)具三個月內就醫或手術紀錄。<br> (4)符合聘僱外國人從事家庭看護工作或中階技術家庭看護工作之被看護者資 格。<br> (5)經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用本 計畫服務之需求。"
    },
    {
      "id": "l4",
      "title": "本計畫所提供的服務內容包含哪些項目？",
      "desc": "多元陪伴照顧服務計畫的服務項目為指派陪伴照顧服務工作者至服務契約履行地，提供服務對象基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等服務。"
    },
    {
      "id": "l5",
      "title": "民眾有身心障礙證明，是否可以申請？申請時需要提供那些文件?",
      "desc": "民眾若持有身心障礙證明，可以申請多元陪伴照顧服務，申請所需文件為 有效期間內之身心障礙證明。"
    },
    {
      "id": "l6",
      "title": "民眾有重大傷病資格，是否可以申請？申請時需要提供那些文件?",
      "desc": "可以。申請所需文件為：具有效期間之重大傷病卡，或全民健保行動快易通 /健康存摺 APP 之重大傷病證明查詢結果，及一年內開具之診斷證明書且載 明宜休養。"
    },
    {
      "id": "l7",
      "title": "民眾有就醫或手術紀錄，是否可以申請?申請時需要提供那些文件?",
      "desc": "民眾若於申請日前三個月內有就醫或手術紀錄，可以申請多元陪伴照顧服 務，申請時需提供醫師開具之診斷證明，且載明宜休養。"
    },
    {
      "id": "l8",
      "title": "民眾聘有外籍家庭看護工（或中階家庭看護工）是否可以申請服務? 申請時需要提供那些文件？",
      "desc": "聘有外籍家庭看護工（或中階家庭看護工）之民眾可申請多元陪伴照顧服 務，申請時需提供符合聘僱外國人資格之有效證明文件、有效期間內之招 募許可或聘僱許可。"
    },
    {
      "id": "l9",
      "title": "民眾有資格申請外籍家庭看護工(或中階家庭看護工)，也已到指定醫院進 行失能診斷評估，但還沒開始聘僱移工，是否可以申請服務? 要提供那些 文件？",
      "desc": "可以。申請時需提供符合聘僱外國人資格之有效證明文件如：病症暨失能 診斷證明、有效期間內之招募許可。"
    },
    {
      "id": "l10",
      "title": "民眾已聘僱外籍家庭看護工(或中階家庭看護工)，是否可以申請服務?要提 供那些文件？",
      "desc": "可以。已聘僱家庭看護工家庭，如果有移工因故（如:返鄉休假、轉換期間、 失聯期間）可以申請服務，檢具初次招募或聘僱許可函，如果試辦單位可 由系統介接到聘僱資料，也可免附文件。"
    },
    {
      "id": "l11",
      "title": "民眾經長期照顧管理中心評估屬長期照顧等級第二級至第八級或有使用長照服務，是否可以申請本計畫？申請時需要提供那些文件?",
      "desc": "對於照顧需求較高之民眾，可自費使用本計畫之服務，以減輕其家庭照顧 負擔。申請時需提供長期照顧需求評估結果通知書或長照特約單位開立載 有照顧組合名稱之收據。"
    },
    {
      "id": "l12",
      "title": "民眾如符合服務對象所列資格，是否只能申請一個陪伴照顧工作者呢? 還是能申請 2 個或以上陪伴照顧工作者?",
      "desc": "民眾申請多元陪伴照顧服務後，會由符合資格之試辦服務單位進行陪伴照 顧需求評估(原則申請一位)，試辦單位會依據需求評估(原則申請一位)及 該單位的服務人力狀況，和申請者討論訂定服務提供的人力如何派用及收 費。"
    },
    {
      "id": "l13",
      "title": "本計畫的服務時間為何？可以彈性調整服務時間嗎?",
      "desc": "本計畫提供的服務時數單次至少 4 小時以上，試辦單位可依據民眾需求彈 性提供服務時段，如為 24 小時者須包括 10 小時休息時數，並應依勞動基 準法之規定，按服務對象需求調整服務時數。"
    },
    {
      "id": "l14",
      "title": "多元陪伴服務的收費標準是按不同試辦單位的定價嗎?",
      "desc": "多元陪伴照顧服務費用為民眾全額自費服務，各試辦單位依據其承辦經營 之成本提出服務收費標準及說明，並經勞動部核定後公告收費標準，公告 於多元陪伴照顧服務官網。"
    },
    {
      "id": "seven",
      "title": "本計畫之目的為何？",
      "desc": "勞動部推動「多元陪伴照顧服務試辦計畫」之目的在於回應民眾「臨短 急」照顧需求，包括長輩「臨」時有狀況卻找不到照顧人力、外籍家庭看 護空窗期的「短」期需要照顧人力、家人手術或病後需要「急」性後期照 顧等情況，由依法設立滿五年之財團法人或非營利社團法人申請，並通過 公益性、專業度與合理收費等評選標準後成為試辦服務單位，聘僱及培訓 本國籍及外國籍多元陪伴照顧服務工作者到申請服務家庭，提供短期、臨 時或持續一定時間之基本日常生活照顧、陪同外出、陪同就醫、安全陪伴 等全額自費之多元陪伴照顧服務，以減輕家庭照顧負擔。"
    }, {
      "id": "eight",
      "title": "本計畫服務的對象及需檢附之文件為何？",
      "desc": "本計畫之服務對象，為有陪伴照顧需求且符合下列資格之一者，並其需檢 附之文件為：<br> (1)具有效期間內身心障礙證明。 檢附文件：有效期間內之身心障礙證明。<br> (2)具有效期間內全民健康保險重大傷病資格。 檢附文件：有效期間內之重大傷病卡，或全民健保行動快易通 健康存 摺 APP 之重大傷病證明查詢結果，及一年內開具之診斷證明書且載明 宜休養。<br> (3)具三個月內就醫或手術紀錄。 檢附文件：申請日前三個月內開具之診斷證明書且載明宜休養。<br> (4)符合聘僱外國人從事家庭看護工作或中階技術家庭看護工作之被看護者 資格。 檢附文件：符合申請聘僱外國人資格之有效證明文件、有效期間內之招 募許可或聘僱許可。<br> (5)經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用 本計畫服務之需求。 檢附文件：長期照顧需求評估結果通知書或長照特約單位開立載有照顧 組合名稱之收據。"
    },
    {
      "id": "pilot1",
      "title": "本計畫的服務內容及服務時間為何？",
      "desc": "本計畫服務項目為指派陪伴照顧服務工作者至服務契約履行地，提供服務 對象基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等服務。前述提 供服務之時數單次至少 4 小時以上，如為 24 小時者須包括 10 小時休息時數， 並應依勞動基準法之規定，按服務對象需求調整服務時數。"
    },
    {
      "id": "pilot2",
      "title": "本計畫之收費標準為何？",
      "desc": "本計畫之多元陪伴照顧服務費用為民眾全額自費，試辦單位應依本部核定 之多元陪伴照顧服務試辦計畫書所核定內容公告收費標準及收費。如須調 整收費標準，應重新報請勞動部核定。"
    },
    {
      "id": "pilot3",
      "title": "申請成為試辦單位的資格條件為何？",
      "desc": "依法設立或登記滿五年之財團法人或非營利社團法人"
    },
    {
      "id": "pilot4",
      "title": "申請試辦單位如需委任仲介，仲介應具備資格為何?",
      "desc": "試辦單位所委任從事跨國人力仲介業務之私立就業服務機構應符合下列資 格 <br> (1)於申請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br> (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。<br> (3)於申請日前二年，無違反就業服務法相關法規。"
    },
    {
      "id": "pilot5",
      "title": "申請成為試辦單位應備文件有哪些？",
      "desc": "欲申請成為試辦單位應備以下文件資料： <br> (1)申請表 <br> (2)多元陪伴照顧服務試辦計畫書 <br> (3)法人或團體組織章程、依法設立或登記之證書或許可影本或目的事業主 管機關立案證明文件，且與服務對象相關之內容及具服務實績之證文件。<br> (4)規劃擬委任私立就業服務機構者，須檢附擬委認知私立就業服務機構之 下列文件：<br> (A)許可影本 (B)申請日前五年內，評鑑成績依規定均屬於 A 級及績優免評鑑證明 (C)申請日前二年引進外國人人數及類別比率證明文件<br> (5)專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻 譯與住宿管理、財務、經營管理、資訊能力等專業之學、經歷證明文件。"
    },
    {
      "id": "pilot6",
      "title": "試辦單位欲委任仲介辦理移工聘僱管理，仲介應具何資格?",
      "desc": "委任從事跨國人力仲介業務之私立就業服務機構辦理外國籍陪伴照顧服務工 作者之招募、引進、聘僱管理、生活照顧服務、住宿安排及管理等就業服務 事宜。受委任之私立就業服務機構應符合下列資格： (1)請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br> (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。<br> (3)於申請日前二年，無違反就業服務法相關法規。 若試辦單位與私立就業服務機構終止或解除委任關係，得另委任符合前述 規定資格之私立就業服務機構，辦理就業服務等業務，並於另行委任後之 一個月內向本部申請核定變更。"
    },
    {
      "id": "pilot7",
      "title": "本計畫之評選流程為何？",
      "desc": "本計畫試辦單位評選流程如下：<br> (1)評選前作業（申請單位資格審查）<br> (2)本計畫專業團隊進行初審<br> (3)申請單位進行簡報及詢答<br> (4)評選會議進行評選<br> (5)評選結果簽報勞動部核定並通知合格試辦單位開辦。"
    },
    {
      "id": "pilot8",
      "title": "評選小組的成員組成為何？",
      "desc": "評選小組，置委員七人至九人，由下列成員組成：<br> (1)政府相關部會代表<br> (2)勞工及雇主團體代表<br> (3)社會福利或衛生相關領域之專家學者或團體代表<br> (4)私立就業服務機構相關公會或協會代表"
    },
    {
      "id": "pilot9",
      "title": "評選時之綜合評估項目有哪些？",
      "desc": "評選小組就申請單位提報之書面資料，依下列項目綜合評選：<br> (1)組織公益性及績優事蹟。<br> (2)服務內容及費用標準。<br> (3)組織專業性。<br> (4)服務品質確保機制。<br> (5)外國籍陪伴照顧服務工作者聘僱管理、訓練及後援規劃。<br> (6)創新作為。"
    },
    {
      "id": "nine",
      "title": "如要應聘為陪伴照顧服務工作者，需具備何種資格?(管 2 科)",
      "desc": "依審查標準第 8 條規定略以，外國人受聘僱從事多元陪伴照顧服務工作， 其年齡須 20 歲以上，且入國工作前，應經衛生福利部認可之外國健康檢查 醫院或其本國勞工部門指定之訓練單位訓練合格，或在我國境內從事相同 工作滿 6 個月以上者。又所謂相同工作，係指從事家庭幫傭、家庭看護或 機構看護之工作。"
    },
    {
      "id": "nine2",
      "title": "陪伴照顧服務工作者能否由不同業別轉換?(管 4 科)",
      "desc": "(1)移工如欲從事陪伴照顧服務工作，需具備經移工母國中央衛生主管機關認 可之外國人健康檢查醫院，或其本國勞工部門指定之訓練單位訓練合格證 明文件正本及該證明文件雙語認證之證明文件正本。<br> (2)移工如有不可歸責事由經本部核准，始得轉換雇主或工作。移工經核准轉 換雇主或工作，於轉換期間連續 14 日內未有同一工作類別之雇主登記承接， 方得跨業轉換雇主或工作。另移工如受聘僱即將期滿，期滿前 2 個月至 4 個月內，經與雇主協議，期滿轉換者，其轉換雇主或工作可由同一工作類 別或不同工作類別新雇主承接。"
    },
    {
      "id": "nine3",
      "title": "陪伴照顧服務工作者能否轉任中階技術移工?",
      "desc": "陪伴照顧服務工作者尚未納入中階技術工作，目前僅能以藍領移工申請。"
    },
    {
      "id": "nine4",
      "title": "陪伴照顧服務工作者工作內容及工作項目有哪些呢?",
      "desc": "目前本計畫提供之服務項目包含基本日常生活照顧、陪同外出、陪同就醫 及安全陪伴等，陪伴照顧工作服務工作者之工作內容係依其雇主(試辦單 位) 與服務申請者所簽訂之服務契約，提供相應之服務。"
    },
    {
      "id": "nine5",
      "title": "如擔任陪伴照顧服務工作者，服務前是否需經過訓練?",
      "desc": "在提供服務前需接受二十小時職前訓練，另到職後至少每三個月接受在職 訓練一次，每年須完成包括工作溝通及陪伴照顧技巧之在職訓練共二十小 時。"
    },
    {
      "id": "nine6",
      "title": "雇主聘僱陪伴照顧服務工作者，雇主應負擔之就業服務法責任期間為何?是否需負責陪伴照顧服務工作者生活照顧？",
      "desc": "雇主應自引進陪伴照顧服務工作者入國日或聘僱許可生效日起，至陪伴照顧服務工作者聘僱關係終止出國或由新雇主接續聘僱日期間，依外國人生活照顧服務計畫書裁量基準規定負雇主責任。"
    },
    {
      "id": "nine7",
      "title": "雇主對於陪伴照顧服務工作者之照顧責任範圍？",
      "desc": "雇主應自引進陪伴照顧服務工作者入國日或期滿續聘之日起，依就業服務法之規定負雇主責任。另雇主聘僱外國人許可及管理辦法第 33 條第 1 項規定，雇主申請聘僱陪伴照顧服務工作者，應依外國人生活照顧服務計畫書確實執行。"
    },
    {
      "id": "nine8",
      "title": "雇主聘僱陪伴照顧服務工作者適用哪一種外國人生活照顧服務計畫書？",
      "desc": "陪伴照顧服務工作者與現行製造業、營造業及養護機構看護工作等同樣適用外國人生活照顧服務計畫書裁量基準之附表一(如附件)。"
    },
    {
      "id": "nine9",
      "title": "雇主聘僱聘僱陪伴照顧服務工作者是否需設置生活照顧服務人員？",
      "desc": "雇主聘僱外國人從事就業服務法第 46 條第 1 項第 9 款至第 10 款所定工作達 10 人以上者，應依規定設置生活照顧服務人員。"
    },
    {
      "id": "nine10",
      "title": "雇主提供套房給陪伴照顧服務工作者居住，其住宿面積如何計算？",
      "desc": "雇主自引進陪伴照顧服務工作者入國或聘僱陪伴照顧服務工作者之日起，應為其安排住宿地點，並依外國人生活照顧服務計畫書執行。倘雇主安排之陪伴照顧服務工作者宿舍係套房類型，則套房內之浴室及廁所（皆個人使用）均得計入居住面積，並應提供 3.6 平方公尺以上之住宿面積。"
    },
    {
      "id": "nine11",
      "title": "陪伴照顧服務工作者在臺住宿地點若變更，雇主是否須辦理住宿地點變更辦理通報？",
      "desc": "雇主於陪伴照顧服務工作者之住宿地點有變更時，應於變更後 7 日內，以書面通知外國人工作所在地及住宿地點之當地主管機關。"
    },
    {
      "id": "nine12",
      "title": "陪伴照顧服務工作者能否自行在外居住？",
      "desc": "依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴照顧服務工作者之真意。"
    },
    {
      "id": "ten",
      "title": "多元陪伴服務照顧計畫受任私立就業服務資格為何?更換仲介需再重新核定嗎?",
      "desc": "試辦單位經本部評選核定後，得委任從事跨國人力仲介業務之私立就業服務機構辦理外國籍陪伴照顧服務工作者之招募、引進、聘僱管理、生活照顧服務、住宿安排及管理等就業服務事宜。<br><br> (1)請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑者。<br> (2)於申請日前二年受雇主委任引進或聘僱之看護工及家庭幫傭外國人，佔 該機構當年總引進或聘僱外國人人數二分之一以上。<br> (3)申請日前二年，無違反就業服務法相關法規。<br><br> 若試辦單位與私立就業服務機構終止或解除委任關係，得另委任符合前述規定資格之私立就業服務機構，辦理就業服務等業務，並於另行委任後之一個月內向本部申請核定變更。"
    },
    {
      "id": "ten1",
      "title": "仲介公司提供哪些服務項目?",
      "desc": "(1)接受雇主(以下稱試辦單位)委任辦理聘僱外國人之招募、引進、接續聘僱 及申請求才證明、招募許可、聘僱許可、展延聘僱許可、遞補、轉換雇主、 轉換工作、變更聘僱許可事項、通知外國人連續曠職三日失去聯繫之核備。<br> (2)接受試辦單位或外國人委任辦理在中華民國境內工作外國人之生活照顧服務、安排入出國、安排接受健康檢查、健康檢查結果函報衛生主管機關、諮詢、輔導及翻譯。<br> (3)接受從事本法第 46 條第 1 項第 8 款至第 11 款規定工作之外國人委任，代其辦理居留業務。"
    },
    {
      "id": "ten2",
      "title": "陪伴照顧服務工作者能否自行在外居住？",
      "desc": "依雇主聘僱外國人許可及管理辦法第 34 條第 5 項規定，倘陪伴照顧服務工作者不願居住於雇主安排之住宿地點，而欲自行在外居住，雇主應尊重其意願，並通報當地主管機關。當地主管機關接獲通報後，將實施探求陪伴照顧服務工作者之真意。"
    },
    {
      "id": "ten3",
      "title": "仲介公司收取費用？",
      "desc": "(1)試辦單位：雇主如委任仲介公司辦理就業服務業務，且有服務事實，得於 規定數額內收取登記費及介紹費(合計不得超過外國人第 1 個月薪資)與服 務費(每一員工每年不得超過新臺幣 2,000 元)。<br> (2)移工：如移工因其需求而委任仲介辦理就業服務業務，仲介得依其在臺年 資，收取規定金額內之服務費(第 1 年每月新臺幣(以下同)1,800 元、第 2 年每月 1,700 元、第 3 年起每月 1,500 元)，並不得預先收取。"
    },
    {
      "id": "ten4",
      "title": "如果仲介公司超收費用有何罰則？",
      "desc": "如違反收費規定，將處超收費用之仲介公司 10 倍至 20 倍罰鍰，並處以 1 年 以下停業處分。"
    },
    {
      "id": "ten5",
      "title": "仲介公司是否可向有照顧需求家庭收費？",
      "desc": "不行。本計畫中，雇主為試辦單位，仲介僅得向試辦單位收取雇主應付之 費用，不得向有照顧需求之家庭收取費用，如有違反，將依超收費用處罰。"
    },
    {
      "id": "ten7",
      "title": "如仲介有違法情事，應如何申訴？",
      "desc": "如仲介有違法情事，雇主或移工可向本部 1955 申訴專線，進行申訴，該專 線於接獲移工申訴案件後，將立即以電子派案方式派至各地方政府處理， 並追蹤案件處理情形。"
    },
    {
      "id": "ten8",
      "title": "申請聘僱從事多元陪伴照顧服務工作外國人的雇主應具備什麼條件？",
      "desc": "申請聘僱從事多元陪伴照顧服務工作外國人的雇主應為依法設立或登記滿 5 年之財團法人或非營利社團法人，並應先提報多元陪伴照顧服務計畫及相 關文件向本部申請參與試辦，經審查取得多元陪伴照顧服務計畫核定函者， 應於核定辦理期間內，向本部申請初次招募許可。"
    },
    {
      "id": "ten9",
      "title": "有關試辦單位可聘僱移工名額數量？",
      "desc": "依法設立或登記滿五年之財團法人或非營利社團法人應於申請成為試辦單 位時，應於多元陪伴照顧服務計畫書第五項外國籍陪伴照顧服務工作者聘 僱管理、訓練及後援規劃內說明預定聘僱本、外國籍陪伴照顧服務工作者 人數及方式，經本部組成之評選小組依其規劃之服務區域與目標總服務時 數、人數與人次，核定試辦單位可聘僱之移工人數。試辦單位需增加外國 人從事陪伴照顧服務工作核定人數，應就需增加之人數重新報請本部核定。"
    },
    {
      "id": "ten11",
      "title": "是否有聘僱本國籍與外國籍人力比率限制？",
      "desc": "本計畫未設有聘僱本國籍與外國籍人力比率之限制，惟試辦單位經本部評 選核定後，依就業服務法及雇主聘僱外國人許可及管理辦法，須先以合理 勞動條件辦理國內招募本國勞工，經招募無法滿足其需要後，就該招募人 數不足部分，始得向本部申請辦理招募、聘僱外國籍陪伴照顧服務工作者 相關事項。"
    },
    {
      "id": "ten12",
      "title": "雇主申請多元陪伴照顧服務工作初次招募許可需檢附文件為何？",
      "desc": "雇主申請初次招募許可，應檢附申請書、統一編號編配通知書、機構登記 證及負責人身分證影本、團體立案證書影本（人民團體須檢附）、法人登 記證書影本(法人須檢附)、經中央主管機關核定同意辦理多元陪伴照顧服 務計畫之證明文件影本、求才證明書、雇聘辦法證明書、審查費收據向本 部提出申請。"
    },
    {
      "id": "ten13",
      "title": "取得多元陪伴照顧服務工作初次招募許可函後如何申請引進外國人許可？",
      "desc": "雇主取得聘僱從事多元陪伴照顧服務工作外國人之初次招募許可函後，應 於初次招募許可函發文日起 6 個月內依用人需求向本部申請外國人之聘僱 許可，又因初次招募許可函具入國引進效力，期限屆滿翌日起自動延長 3 個月；逾期未引進者，該初次招募許可函失其效力。"
    },
    {
      "id": "ten14",
      "title": "多元陪伴照顧服務工作雇主如何申請外國人聘僱許可？",
      "desc": "多元陪伴照顧服務工作雇主所招募之外國人入國日起 3 工作日內，應安排 其至指定醫院接受健康檢查，及於入國日起 3 日內通知當地主管機關依外 國人生活照顧服務計畫書實施檢查，並於該外國人入國日起 15 日內，檢具 規定之文件向本部申請聘僱許可。"
    },
    {
      "id": "ten15",
      "title": "從事多元陪伴照顧服務工作之外國人如聘僱許可期限即將屆滿，仍有聘僱需求，應如何辦理？",
      "desc": "從事多元陪伴照顧服務工作外國人聘僱許可期限屆滿前 4 個月內，雇主如 有繼續聘僱外國人之需要，得檢附規定文件向本部申請重新招募許可，本 部將就雇主得聘僱外國人人數 1 次核發重新招募許可，未於聘僱許可期限 屆滿前提出申請者，將予以扣除該部分之外國人人數。雇主可於原外國人 出國 6 個月內，或於外國人聘僱許可有效期間屆滿前 4 個月內，或於外國 人出國前 4 個月內切結遵期出國方式，向本部申請引進新聘僱外國人之入 國引進許可，原聘僱外國人出國前，不得引進新聘僱外國人。"
    }
  ]);

  // 搜尋輸入內容
  const searchQuery = ref("");
  const is_search = ref(false);
  const is_focus = ref(false);
  const filteredFaqs = computed(() => {
    if (!searchQuery.value) {
      return allFaqs.value; // 如果搜尋欄為空，顯示所有 FAQ
    }
    // 根據搜尋字串篩選 FAQ
    return allFaqs.value.filter(
      (faq) =>
        faq.title.includes(searchQuery.value) ||
        faq.desc.includes(searchQuery.value)
    );
  });

  const openSearchInput = (type = 'input') => {
    if (type == 'block') {
      if (window.innerWidth > 991) {
        return; // 如果裝置寬度大於 991，直接退出函數
      }
    }
    is_search.value = true;
    nextTick(() => {
      const input = document.querySelector(".search-input");
      input?.focus();
      is_focus.value = true;
    });
  }

  const searchFaqs = () => {
    if (searchQuery.value == '') {

    }
    console.log("搜尋字串:", searchQuery.value);
  };

  // 追蹤目前的 active tab
  const activeTab = ref("nav-services");

  const setActiveTab = (tab: string) => {
    activeTab.value = tab;
  };

  const handleBlur = () => {
    if (searchQuery.value === "") {
      // 若無內容，收起 input
      is_search.value = false;
    }
    is_focus.value = false;
  };

  // 當 select 改變時處理切換
  const handleTabChange = (event: Event) => {
    activeTab.value = (event.target as HTMLSelectElement).value;
  };
</script>

<style scoped>
  input,
  select {
    -webkit-appearance: none;
    /* 移除 Safari 的內建樣式 */
    -moz-appearance: none;
    /* 移除 Firefox 的內建樣式 */
    appearance: none;
    /* 現代瀏覽器移除內建樣式 */
    background: none;
    /* 清除背景 */
    border: none;
    /* 清除邊框 */
    outline: none;
    /* 清除聚焦邊框 */
    padding: 0;
    /* 清除內邊距 */
    margin: 0;
    /* 清除外邊距 */
    font-size: inherit;
    /* 繼承字體大小 */
    font-family: inherit;
    /* 繼承字體樣式 */
    color: inherit;
    /* 繼承文字顏色 */
  }

  /* Reset select dropdown arrow */
  select {
    background: none;
    border: 1px solid #333;
    position: relative;
    /* 移除背景（包括箭頭） */
  }

  /* Optional: 自定義 select 的箭頭圖標 */
  .select::after {
    content: '';
    /* 空内容，用来绘制箭头 */
    position: absolute;
    /* 绝对定位 */
    right: 10px;
    /* 距右侧的距离 */
    top: 50%;
    /* 垂直居中 */
    transform: translateY(-50%);
    /* 调整垂直居中 */
    border-left: 5px solid transparent;
    /* 左侧透明 */
    border-right: 5px solid transparent;
    /* 右侧透明 */
    border-top: 5px solid #333;
    /* 顶部的三角形箭头 */
    pointer-events: none;
    /* 防止箭头影响交互 */
  }

  .select {
    position: relative;
    /* 确保伪元素基于 select 定位 */
  }

  .faq-section-three {
    padding-top: 60px;
    /* 原本的 120px 改小一點 */
    padding-bottom: 60px;
    /* 原本的 150px 改小一點 */
  }

  .nav-tabs {
    margin-top: 20px;
    /* 減少上方間距 */
  }

  .faq-section-three .nav-tabs .nav-link {
    color: rgb(43, 39, 22) !important;
  }

  .nav-tabs .nav-link {
    padding: 10px 15px;
    /* 如果需要，可以進一步減小按鈕的內部填充 */
  }

  .faq-section-three .nav-tabs .nav-link.active {
    background-color: transparent;
    color: #41BBBE !important;
    font-weight: bold;
    border-color: transparent !important;
  }

  .container {
    max-width: 1200px;
    /* 如果需要進一步縮小整體寬度，這裡可以調整 */
  }

  /* 手機版選單樣式 */
  .mobile-select {
    margin-bottom: 20px;
  }

  .search-container {
    margin-left: 15px;
    padding-left: 20px;
    display: flex;
    justify-content: flex-end;
    min-height: 40px;
    position: relative;
  }

  .search-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .search-btn svg {
    cursor: pointer;
  }

  .search-container input {
    position: absolute;
    right: 0;
    height: 40px;
    max-width: 0;
    padding: 0 10px;
    padding-left: 28px;
    transition: max-width 0.2s ease-in;
    overflow: hidden;
    white-space: nowrap;
    z-index: -10;
    opacity: 0;
    font-size: 16px;
  }

  .search-container input.show {
    max-width: 100%;
    width: 100%;
    z-index: 100;
    opacity: 1;
  }

  .search-container input:focus {
    border: 3px solid rgba(82, 146, 230, 0.8);
  }

  .search-container input::placeholder {
    font-size: 16px;
  }

  .search-container input.border-only {
    height: 40px;
    border: 1px solid black;
    /* 保留黑色邊框 */
    border-width: 0 0 2px;
    /* 僅顯示底部邊框 */
  }

  @media (min-width: 992px) {
    .mobile-select {
      display: none;
    }
  }

  @media (max-width: 991px) {
    .nav-tabs {
      display: none;
    }

    .faq-section-three {
      padding-top: 40px !important;
    }

    .faq-section-three .tab-content {
      padding: 0 !important;
    }

    .search-container {
      margin-left: 0;
      padding-left: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #000;
    }

    .search-result-tag {
      margin-bottom: 0 !important;
    }

    .search-result-tag p {
      padding-left: 0 !important;
      padding-top: 0 !important;
    }

    .search-result-tag span {
      padding-left: 0 !important;
      padding-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .mobile-select select {
      width: 100%;
      padding: 5px;
      color: rgb(143, 166, 154);
      outline: none;
    }

    .mobile-select p {
      margin-bottom: 0;
      color: #333;
      font-weight: 300;
      font-size: 16px;
    }
  }
</style>