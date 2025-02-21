<script setup>
  import { ref, computed, nextTick } from "vue";
  
  // 搜尋相關狀態
  const searchQuery = ref("");
  const is_search = ref(false);
  const is_focus = ref(false);
  
  // API 資料
  const qaData = ref([]);
  
  // 從 API 獲取資料
  const fetchQAData = async () => {
    try {
      const response = await fetch('/api/qa');
      const data = await response.json();
      console.log(data);
      qaData.value = data.data;
    } catch (error) {
      console.error('Error fetching QA data:', error);
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
        faq.title.includes(searchQuery.value) ||
        faq.content.includes(searchQuery.value)
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
  
  <template>
    <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
      <div class="main-container">
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
          <!-- ... 其他搜尋相關元素保持不變 ... -->
        </div>
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
            <button class="nav-link" :class="{ active: activeTab === 'nav-unit' }" 
              @click="setActiveTab('nav-unit')" type="button">
              想成為試辦單位
            </button>
            <button class="nav-link" :class="{ active: activeTab === 'nav-worker' }" 
              @click="setActiveTab('nav-worker')" type="button">
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
              <faq-item v-for="qa in categoryData.services" 
                :key="qa.id"
                :id="qa.id"
                :title="qa.question"
                :desc="qa.answer"
                parent="accordionTwo" />
            </div>
          </div>
  
          <!-- 想成為試辦單位 -->
          <div class="tab-pane fade" id="nav-unit" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-unit' }">
            <div class="accordion accordion-style-one" id="accordionThree">
              <faq-item v-for="qa in categoryData.unit"
                :key="qa.id" 
                :id="qa.id"
                :title="qa.title"
                :desc="qa.content"
                parent="accordionThree" />
            </div>
          </div>
  
          <!-- 我是多元陪伴照顧服務工作者 -->
          <div class="tab-pane fade" id="nav-worker" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-worker' }">
            <div class="accordion accordion-style-one" id="accordionFour">
              <faq-item v-for="qa in categoryData.worker"
                :key="qa.id"
                :id="qa.id" 
                :title="qa.title"
                :desc="qa.content"
                parent="accordionFour" />
            </div>
          </div>
  
          <!-- 我是私立就業服務機構 -->
          <div class="tab-pane fade" id="nav-service-unit" role="tabpanel" tabindex="0"
            :class="{ 'show active': activeTab === 'nav-service-unit' }">
            <div class="accordion accordion-style-one" id="accordionFive">
              <faq-item v-for="qa in categoryData.serviceUnit"
                :key="qa.id"
                :id="qa.id"
                :title="qa.title"
                :desc="qa.content"
                parent="accordionFive" />
            </div>
          </div>
        </div>
  
        <!-- 搜尋結果 -->
        <div class="tab-content" v-if="searchQuery != ''">
          <div class="tab-pane fade show active">
            <div class="accordion accordion-style-one" id="accordionFive">
              <faq-item v-for="faq in filteredFaqs" 
                :key="faq.id"
                :id="faq.id"
                :title="faq.title"
                :desc="faq.content"
                parent="accordionSic" />
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <style scoped>
  /* 保持原有的樣式不變 */
  </style>