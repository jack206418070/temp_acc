<template>
  <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
    <div class="main-container">
      <!-- Loading 畫面 -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>

      <!-- 主要內容 -->
      <div v-else>
        <!-- 搜尋區塊 -->
        <div class="search-container" @click="openSearchInput('block')">
          <!-- 原有的搜尋相關 HTML 保持不變 -->
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
          <!-- ... 其他搜尋相關元素保持不變 ... -->
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
        <!-- 手機版選單 -->
        <div class="mobile-select d-lg-none" v-if="searchQuery == ''">
          <p>Choose a category</p>
          <div class="select">
            <select v-model="activeTab" @change="handleTabChange">
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

        <!-- Tab 內容區 -->
        <div class="tab-content" v-if="searchQuery == ''">
          <!-- 想申請服務 -->
          <div class="tab-pane fade" id="nav-services" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-services' }">
            <div class="accordion accordion-style-one" id="accordionTwo">
              <faq-item v-for="qa in categoryData.services" :key="qa.id" :id="qa.id" :title="qa.question"
                :desc="qa.answer" parent="accordionTwo" />
            </div>
          </div>

          <!-- 想成為試辦單位 -->
          <div class="tab-pane fade" id="nav-unit" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-unit' }">
            <div class="accordion accordion-style-one" id="accordionThree">
              <faq-item v-for="qa in categoryData.unit" :key="qa.id" :id="qa.id" :title="qa.question" :desc="qa.answer"
                parent="accordionThree" />
            </div>
          </div>

          <!-- 我是多元陪伴照顧服務工作者 -->
          <div class="tab-pane fade" id="nav-worker" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-worker' }">
            <div class="accordion accordion-style-one" id="accordionFour">
              <faq-item v-for="qa in categoryData.worker" :key="qa.id" :id="qa.id" :title="qa.question" :desc="qa.answer"
                parent="accordionFour" />
            </div>
          </div>

          <!-- 我是私立就業服務機構 -->
          <div class="tab-pane fade" id="nav-service-unit" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-service-unit' }">
            <div class="accordion accordion-style-one" id="accordionFive">
              <faq-item v-for="qa in categoryData.serviceUnit" :key="qa.id" :id="qa.id" :title="qa.question"
                :desc="qa.answer" parent="accordionFive" />
            </div>
          </div>
        </div>

        <!-- 搜尋結果 -->
        <div class="tab-content" v-if="searchQuery != ''">
          <div class="tab-pane fade show active">
            <div class="accordion accordion-style-one" id="accordionFive">
              <faq-item v-for="faq in filteredFaqs" :key="faq.id" :id="faq.id" :title="faq.question" :desc="faq.answer"
                parent="accordionSic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, nextTick } from "vue";

  // 搜尋相關狀態
  const searchQuery = ref("");
  const is_search = ref(false);
  const is_focus = ref(false);

  // API 資料
  const qaData = ref([]);

  // 添加載入狀態
  const isLoading = ref(true);

  // 從 API 獲取資料
  const fetchQAData = async () => {
    try {
      isLoading.value = true;
      const response = await fetch('/api/qa');
      const data = await response.json();
      console.log(data);
      qaData.value = data.data;
    } catch (error) {
      console.error('Error fetching QA data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // 初始化時獲取資料
  fetchQAData();

  // 依分類過濾資料
  const categoryData = computed(() => {
    return {
      services: qaData.value.filter(qa => qa.category === '1'),
      unit: qaData.value.filter(qa => qa.category === '2'),
      worker: qaData.value.filter(qa => qa.category === '3'),
      serviceUnit: qaData.value.filter(qa => qa.category === '4')
    };
  });

  // 搜尋功能
  const filteredFaqs = computed(() => {
    if (!searchQuery.value) {
      return qaData.value;
    }
    return qaData.value.filter(
      (faq) =>
        faq.question.includes(searchQuery.value) ||
        faq.answer.includes(searchQuery.value)
    );
  });

  // 搜尋相關函數
  const openSearchInput = (type = 'input') => {
    if (type == 'block') {
      if (window.innerWidth > 991) {
        return;
      }
    }
    is_search.value = true;
    nextTick(() => {
      const input = document.querySelector(".search-input");
      input?.focus();
      is_focus.value = true;
    });
  };

  const searchFaqs = () => {
    if (searchQuery.value == '') {
      // 空搜尋處理
    }
  };

  const handleBlur = () => {
    if (searchQuery.value === "") {
      is_search.value = false;
    }
    is_focus.value = false;
  };

  // Tab 相關
  const activeTab = ref("nav-services");

  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };

  const handleTabChange = (event) => {
    activeTab.value = event.target.value;
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

  /* Loading 樣式 */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #41BBBE;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-container p {
    margin-top: 1rem;
    color: #41BBBE;
    font-size: 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* 添加 p 標籤的換行處理 */
  p {
    white-space: pre-line;  /* 處理 \n 換行 */
    word-break: break-word; /* 確保長文字會自動換行 */
  }

  /* 如果需要特定的 p 標籤才有這個效果，可以加上特定的 class */
  .faq-content p {
    white-space: pre-line;
    word-break: break-word;
  }
</style>