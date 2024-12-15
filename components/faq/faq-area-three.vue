<template>
  <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
    <div class="main-container">
      <div class="search-container" @click="openSearchInput('block')">
        <div class="search-btn" v-if="!is_search">
          <svg @click="openSearchInput" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="prefix__search-image prefix__search-svg-icon" role="none"><path d="M10.961 5c3.292 0 5.961 2.669 5.961 5.961 0 1.37-.462 2.631-1.238 3.638l3.264 3.266c.063.062.075.156.038.23l-.038.052-.8.801c-.063.063-.157.075-.232.038l-.051-.038-3.266-3.264c-1.007.776-2.268 1.238-3.638 1.238C7.67 16.922 5 14.253 5 10.962 5 7.668 7.669 5 10.961 5zm-.005 1.079c-2.694 0-4.877 2.183-4.877 4.877s2.183 4.877 4.877 4.877 4.877-2.183 4.877-4.877-2.183-4.877-4.877-4.877z" transform="translate(-1109 -144) translate(1109 144)"></path></svg>
        </div>
        <span style="position: absolute; top: 2px; left: 5px; height: 24px; width: 24px; z-index: 101;">
          <svg v-if="is_search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="prefix__search-image prefix__search-svg-icon" role="none"><path d="M10.961 5c3.292 0 5.961 2.669 5.961 5.961 0 1.37-.462 2.631-1.238 3.638l3.264 3.266c.063.062.075.156.038.23l-.038.052-.8.801c-.063.063-.157.075-.232.038l-.051-.038-3.266-3.264c-1.007.776-2.268 1.238-3.638 1.238C7.67 16.922 5 14.253 5 10.962 5 7.668 7.669 5 10.961 5zm-.005 1.079c-2.694 0-4.877 2.183-4.877 4.877s2.183 4.877 4.877 4.877 4.877-2.183 4.877-4.877-2.183-4.877-4.877-4.877z" transform="translate(-1109 -144) translate(1109 144)"></path></svg>
        </span>
        <span @click="searchQuery = '', is_search = false" v-if="is_search" style="position: absolute; top: 10px; right: 8px; height: 18px; width: 18px; z-index: 101; font-size: 14px; cursor: pointer;">
          X
        </span>
        <input
          :class="{
            show: is_search,
            'border-only': is_search && !is_focus,
          }"
          v-model="searchQuery"
          @input="searchFaqs"
          @blur="handleBlur"
          @focus="is_focus = true"
          type="text"
          placeholder="正在尋找某樣東西?"
          class="search-input"
        />
      </div>
      <p class="search-result-tag" v-if="searchQuery != ''">
        <span v-if="filteredFaqs.length > 0" style="font-size: 12px; font-weight: 300; letter-spacing: 2px; line-height: 1; margin-bottom: 0px; padding: 0px; padding-left: 20px">Showing results for: <strong>{{ searchQuery }}</strong></span>
        <p v-else style="font-size: 12px; font-weight: 300; letter-spacing: 2px; line-height: 1.5; margin-bottom: 0px; padding-top: 10px; padding-left: 20px">Sorry, we could not find any results to match your search criteria.<br> Please try again with some different keywords.
        </p>
      </p>
      <div class="mobile-select d-lg-none" v-if="searchQuery == ''">
        <p>Choose a category</p>
        <select v-model="activeTab" @change="handleTabChange">
          <option value="nav-all">全部</option>
          <option value="nav-services">想申請服務</option>
          <option value="nav-unit">想成為試辦單位</option>
          <option value="nav-worker">我是多元陪伴照顧服務工作者</option>
          <option value="nav-service-unit">我是私立就業服務機構</option>
        </select>
      </div>

      <!-- 電腦版 tabs -->
      <nav class="d-none d-lg-block"  v-if="searchQuery == ''">
        <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'nav-all' }"
            @click="setActiveTab('nav-all')"
            type="button"
          >
            全部
          </button>
          <button
            class="nav-link"
            :class="{ active: activeTab === 'nav-services' }"
            @click="setActiveTab('nav-services')"
            type="button"
          >
            想申請服務
          </button>
          <button
            class="nav-link"
            :class="{ active: activeTab === 'nav-unit' }"
            @click="setActiveTab('nav-unit')"
            type="button"
          >
            想成為試辦單位
          </button>
          <button
            class="nav-link"
            :class="{ active: activeTab === 'nav-worker' }"
            @click="setActiveTab('nav-worker')"
            type="button"
          >
            我是多元陪伴照顧服務工作者
          </button>
          <button
            class="nav-link"
            :class="{ active: activeTab === 'nav-service-unit' }"
            @click="setActiveTab('nav-service-unit')"
            type="button"
          >
            我是私立就業服務機構
          </button>
        </div>
      </nav>

      <div class="tab-content" v-if="searchQuery == ''">
        <div class="tab-pane fade" id="nav-all" role="tabpanel" tabindex="0" :class="{ 'show active': activeTab === 'nav-all' }">
          <div class="accordion accordion-style-one" id="accordionOne">
            <faq-item id="m3" title="多元陪伴照顧服務計畫提供那些服務?"
              desc="多元陪伴照顧服務計畫(下稱多元陪伴照顧服務)內容為指派多元陪伴照顧服務 工作者至服務契約履行地提供服務對象基本日常生活照顧、陪同外出、陪同就 醫、安全陪伴等服務。"
              parent="accordionTwo" />

            <faq-item id="m4" title="多元陪伴照顧服務之服務時間?"
              desc="服務時數單次至少4小時以上，如為24小時者須內含10小時休息時數。服務時 間需依勞動基準法規範，按服務對象需求調整服務時數。" parent="accordionTwo" />

            <faq-item id="seven" title="多元陪伴照顧服務試辦單位的資格為何?試辦單位如何核定? "
              desc="試辦單位需為依法設立或登記滿5年的財團法人或非營利社團法人，申請時需檢 附多元陪伴照顧服務計畫書，敘明組織公益性及績優事蹟、服務內容及費用標 準、組織專業性、服務品質確保機制、外國籍陪伴照顧服務工作者聘僱管理、 教育訓練、後援規劃及創新作為，並依此綜合評選，總分達70分者為合格，試 辦單位經核定後，開始提供服務，預計在首年於北中南各1家開辦。"
              parent="accordionThree" />

            <faq-item id="ten" title="多元陪伴照顧服務計畫服務對象與資格?"
              desc="服務對象包含：具身障證明、重大傷病有照顧需求者、術後有照顧需求者、  有聘僱家庭看護（或中階看護）資格者、有長照但仍需多元陪伴照顧服務需求者。於申請服務時，應備文件如下：<img src='https://static.wixstatic.com/media/73d1df_f53406d99d004b2c9dd4a06b5613dfcd~mv2.jpg/v1/fill/w_910,h_917,al_c,q_85,enc_auto/73d1df_f53406d99d004b2c9dd4a06b5613dfcd~mv2.jpg'>"
              parent="accordionTwo" />

            <faq-item id="m5" title="多元陪伴照顧服務是否自費? 是否按不同試辦單位定價?"
              desc="一、 多元陪伴照顧服務使用為全額自費。  
              <br>
              二、 服務收費依試辦單位定價收費，是因試辦單位服務不同區域或服務人力， 而有不同辦理成本及有不同收費。試辦單位需於申請試辦時，提出收費標 準及計算基準經本部核定，試辦單位需依本部核定標準進行收費標準公告及收費，調整收費標準，也需要重新報請本部核定，不得任意變動。"
              parent="accordionTwo" />

            <faq-item id="eight"
              title="多元陪伴照顧服務試辦計畫第9點，申請單位應於檢附「專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件」，但財團法人或非營利社團法人大多無配置上述全部的專業團隊，該如何參與本計畫? "
              desc="財團法人或非營利社團法人為申請單位得統籌各方資源或相關領域人員，得以 委任、承攬、僱用等或其他方式結合專業人力，組成專業管理團隊，亦可結合 私立就業服務機構，上述均需於申請時檢附佐證文件及資格證明文件。"
              parent="accordionThree" />

            <faq-item id="pilot1" title="申請成為試辦服務單位應檢附何項文件及份數?"
              desc="申請單位應於本部公告受理期間內檢附下列文件，向本部申請成為試辦單位， 由本部組成評選小組，就申請單位提報之書面資料，進行綜合評選。  <br>

              (一) 申請表。 <br>
              
              (二) 多元陪伴照顧服務計畫書。 <br>
              
              (三) 法人或團體組織章程、依法設立或登記之證書或許可影本或目的事業主管機關立案證明文件，並檢具相關服務經驗或實績之證明文件。 <br> 
              
              (四) 規劃擬委任私立就業服務機構者，須檢附擬委任之私立就業服務機構之下 列文件：  1.許可證影本。  2.申請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑證明。  3.申請日前二年引進外國人人數及類別比率證明文件。  <br>
              
              (五) 專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯 與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件。  以上文件請依序排列，一式12份，郵寄至本部指定受理地點，另以光碟交付或 電子郵件傳送等方式提交電子檔。" parent="accordionThree" />
          </div>
        </div>
        <div class="tab-pane fade" id="nav-services" role="tabpanel" tabindex="0" :class="{ 'show active': activeTab === 'nav-services' }">
          <div class="accordion accordion-style-one" id="accordionTwo">
            <faq-item id="m3" title="多元陪伴照顧服務計畫提供那些服務?"
              desc="多元陪伴照顧服務計畫(下稱多元陪伴照顧服務)內容為指派多元陪伴照顧服務 工作者至服務契約履行地提供服務對象基本日常生活照顧、陪同外出、陪同就 醫、安全陪伴等服務。"
              parent="accordionTwo" />

            <faq-item id="m4" title="多元陪伴照顧服務之服務時間?"
              desc="服務時數單次至少4小時以上，如為24小時者須內含10小時休息時數。服務時 間需依勞動基準法規範，按服務對象需求調整服務時數。" parent="accordionTwo" />

            <faq-item id="m5" title="多元陪伴照顧服務是否自費? 是否按不同試辦單位定價?"
              desc="一、 多元陪伴照顧服務使用為全額自費。  
            <br>
            二、 服務收費依試辦單位定價收費，是因試辦單位服務不同區域或服務人力， 而有不同辦理成本及有不同收費。試辦單位需於申請試辦時，提出收費標 準及計算基準經本部核定，試辦單位需依本部核定標準進行收費標準公告及收費，調整收費標準，也需要重新報請本部核定，不得任意變動。"
              parent="accordionTwo" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-unit" role="tabpanel" tabindex="0" :class="{ 'show active': activeTab === 'nav-unit' }">
          <div class="accordion accordion-style-one" id="accordionThree">
            <faq-item id="seven" title="多元陪伴照顧服務試辦單位的資格為何?試辦單位如何核定? "
              desc="試辦單位需為依法設立或登記滿5年的財團法人或非營利社團法人，申請時需檢 附多元陪伴照顧服務計畫書，敘明組織公益性及績優事蹟、服務內容及費用標 準、組織專業性、服務品質確保機制、外國籍陪伴照顧服務工作者聘僱管理、 教育訓練、後援規劃及創新作為，並依此綜合評選，總分達70分者為合格，試 辦單位經核定後，開始提供服務，預計在首年於北中南各1家開辦。"
              parent="accordionThree" />
            <faq-item id="eight"
              title="多元陪伴照顧服務試辦計畫第9點，申請單位應於檢附「專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件」，但財團法人或非營利社團法人大多無配置上述全部的專業團隊，該如何參與本計畫? "
              desc="財團法人或非營利社團法人為申請單位得統籌各方資源或相關領域人員，得以 委任、承攬、僱用等或其他方式結合專業人力，組成專業管理團隊，亦可結合 私立就業服務機構，上述均需於申請時檢附佐證文件及資格證明文件。"
              parent="accordionThree" />
            <faq-item id="pilot1" title="申請成為試辦服務單位應檢附何項文件及份數?"
              desc="申請單位應於本部公告受理期間內檢附下列文件，向本部申請成為試辦單位， 由本部組成評選小組，就申請單位提報之書面資料，進行綜合評選。  <br>

          (一) 申請表。 <br>
          
          (二) 多元陪伴照顧服務計畫書。 <br>
          
          (三) 法人或團體組織章程、依法設立或登記之證書或許可影本或目的事業主管機關立案證明文件，並檢具相關服務經驗或實績之證明文件。 <br> 
          
          (四) 規劃擬委任私立就業服務機構者，須檢附擬委任之私立就業服務機構之下 列文件：  1.許可證影本。  2.申請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑證明。  3.申請日前二年引進外國人人數及類別比率證明文件。  <br>
          
          (五) 專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯 與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件。  以上文件請依序排列，一式12份，郵寄至本部指定受理地點，另以光碟交付或 電子郵件傳送等方式提交電子檔。" parent="accordionThree" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-worker" role="tabpanel" tabindex="0" :class="{ 'show active': activeTab === 'nav-worker' }">
          <div class="accordion accordion-style-one" id="accordionFour">
            <faq-item id="nine" title="待勞發署提供QA內容" desc="待勞發署提供QA內容" parent="accordionFour" />
          </div>
        </div>

        <div class="tab-pane fade" id="nav-service-unit" role="tabpanel" tabindex="0" :class="{ 'show active': activeTab === 'nav-service-unit' }">
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item id="ten" title="待勞發署提供QA內容" desc="待勞發署提供QA內容" parent="accordionFive" />
          </div>
        </div>
      </div>
      <div class="tab-content" v-if="searchQuery != ''">
        <div class="tab-pane fade show active">
          <div class="accordion accordion-style-one" id="accordionFive">
            <faq-item v-for="faq in filteredFaqs" :key="faq.id" :id="faq.id" :title="faq.title" :desc="faq.desc" parent="accordionSic" />
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
    id: "m3",
    title: "多元陪伴照顧服務計畫提供那些服務?",
    desc: "多元陪伴照顧服務計畫(下稱多元陪伴照顧服務)內容為指派多元陪伴照顧服務 工作者至服務契約履行地提供服務對象基本日常生活照顧、陪同外出、陪同就 醫、安全陪伴等服務。",
  },
  {
    id: "m4",
    title: "多元陪伴照顧服務之服務時間?",
    desc: "服務時數單次至少4小時以上，如為24小時者須內含10小時休息時數。服務時 間需依勞動基準法規範，按服務對象需求調整服務時數。",
  },
  {
    id: "m5",
    title: "多元陪伴照顧服務是否自費? 是否按不同試辦單位定價?",
    desc: "一、 多元陪伴照顧服務使用為全額自費。  <br> 二、 服務收費依試辦單位定價收費，是因試辦單位服務不同區域或服務人力， 而有不同辦理成本及有不同收費。試辦單位需於申請試辦時，提出收費標 準及計算基準經本部核定，試辦單位需依本部核定標準進行收費標準公告及收費，調整收費標準，也需要重新報請本部核定，不得任意變動。",
  },
  {
    id: "seven",
    title: "多元陪伴照顧服務試辦單位的資格為何?試辦單位如何核定?",
    desc: "試辦單位需為依法設立或登記滿5年的財團法人或非營利社團法人，申請時需檢 附多元陪伴照顧服務計畫書，敘明組織公益性及績優事蹟、服務內容及費用標 準、組織專業性、服務品質確保機制、外國籍陪伴照顧服務工作者聘僱管理、 教育訓練、後援規劃及創新作為，並依此綜合評選，總分達70分者為合格，試 辦單位經核定後，開始提供服務，預計在首年於北中南各1家開辦。",
  },
  {
    id: "ten",
    title: "多元陪伴照顧服務計畫服務對象與資格?",
    desc: "服務對象包含：具身障證明、重大傷病有照顧需求者、術後有照顧需求者、  有聘僱家庭看護（或中階看護）資格者、有長照但仍需多元陪伴照顧服務需求者。於申請服務時，應備文件如下：<img src='https://static.wixstatic.com/media/73d1df_f53406d99d004b2c9dd4a06b5613dfcd~mv2.jpg/v1/fill/w_910,h_917,al_c,q_85,enc_auto/73d1df_f53406d99d004b2c9dd4a06b5613dfcd~mv2.jpg'>",
  },
  {
    id: "eight",
    title: "多元陪伴照顧服務試辦計畫第9點，申請單位應於檢附「專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件」，但財團法人或非營利社團法人大多無配置上述全部的專業團隊，該如何參與本計畫?",
    desc: "財團法人或非營利社團法人為申請單位得統籌各方資源或相關領域人員，得以 委任、承攬、僱用等或其他方式結合專業人力，組成專業管理團隊，亦可結合 私立就業服務機構，上述均需於申請時檢附佐證文件及資格證明文件。",
  },
  {
    id: "pilot1",
    title: "申請成為試辦服務單位應檢附何項文件及份數?",
    desc: "申請單位應於本部公告受理期間內檢附下列文件，向本部申請成為試辦單位， 由本部組成評選小組，就申請單位提報之書面資料，進行綜合評選。  <br> (一) 申請表。 <br> (二) 多元陪伴照顧服務計畫書。 <br> (三) 法人或團體組織章程、依法設立或登記之證書或許可影本或目的事業主管機關立案證明文件，並檢具相關服務經驗或實績之證明文件。 <br>  (四) 規劃擬委任私立就業服務機構者，須檢附擬委任之私立就業服務機構之下 列文件：  1.許可證影本。  2.申請日前五年內，評鑑成績依規定均屬於 A 級或績優免評鑑證明。  3.申請日前二年引進外國人人數及類別比率證明文件。  <br> (五) 專業服務管理團隊成員所具備之醫護、照顧服務員管理、外國人雙語翻譯 與住宿管理、財務、經營管理及資訊能力等專業之學、經歷證明文件。  以上文件請依序排列，一式12份，郵寄至本部指定受理地點，另以光碟交付或 電子郵件傳送等方式提交電子檔。",
  },
  {
    id: "nine",
    title: "待勞發署提供QA內容",
    desc: "待勞發署提供QA內容",
  },
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

const openSearchInput = (type='input') => {
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
  if(searchQuery.value == '') {

  }
  console.log("搜尋字串:", searchQuery.value);
};

// 追蹤目前的 active tab
const activeTab = ref("nav-all");

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
    color: rgb(143, 166, 154) !important;
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
  font-size: 14px;
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
  font-size: 14px;
}

.search-container input.border-only {
  height: 40px;
  border: 1px solid black; /* 保留黑色邊框 */
  border-width: 0 0 2px; /* 僅顯示底部邊框 */
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
  .search-result-tag p{
    padding-left: 0 !important;
    padding-top: 0 !important;
  }
  .search-result-tag span{
    padding-left: 0 !important;
    padding-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .mobile-select select{
    width: 100%;
    padding: 5px;
    color:rgb(143, 166, 154);
    outline: none;
  }
  .mobile-select p {
    margin-bottom: 0;
    color: #333;
    font-weight: 300;
    font-size: 14px;
  }
}
</style>