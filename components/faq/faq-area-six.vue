<template>
  <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
    <div class="main-container">
      <div class="service-grid">
        <!-- 申請服務卡片 -->
        <div class="service-card" :class="{'mobile': index == 3}" v-for="(category, index) in parentCategories" :key="category.id">
          <h3 class="card-title">{{ category.name }}</h3>
          <a :href="`/qa_test2?id=${category.id}`" class="service-button">
            相關問題
            <span class="arrow">›</span>
          </a>
          <!-- 多語言選項 -->
          <div class="flag-container" v-if="hasMultiLanguageContent(category.id)">
            <a v-for="(lang, index) in availableLanguages(category.id)" 
               :key="lang.id" 
               :href="`/qa_test2?id=${category.id}&lang=${lang.code}`"
               :title="lang.name"
               class="flag-link">
              <img :src="`/images/assets/flag-${getFlagNumber(lang.code)}.avif`" :alt="lang.name" class="flag">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSeoMeta } from '#imports'

const { loading, error, fetchQACategories, fetchLanguages, fetchQAContents } = useQA()

const parentCategories = ref([])
const languages = ref([])
const qaContents = ref([])
const categories = ref([])

// 根據語言代碼獲取對應的國旗編號
function getFlagNumber(langCode) {
  console.log('當前語言代碼:', langCode)
  switch(langCode) {
    case 'en': return '1'  // 英文
    case 'vi': return '2'  // 越南文
    case 'id': return '3'  // 印尼文
    case 'th': return '4'  // 泰文
    default: return null   // 如果不是這些語言，返回 null
  }
}

// 檢查分類是否有多語言內容
function hasMultiLanguageContent(categoryId) {
  // 找出所有屬於這個父分類的子分類 ID
  const subCategoryIds = categories.value
    .filter(cat => cat.parent_id === categoryId)
    .map(cat => cat.id)
  
  // 找出這些子分類的所有內容，並排除中文內容
  const contents = qaContents.value
    .filter(content => 
      subCategoryIds.includes(content.category_id) && 
      content.language_code !== 'zh-tw' &&
      ['en', 'vi', 'id', 'th'].includes(content.language_code)
    )
  
  // 獲取不重複的語言
  const uniqueLanguages = [...new Set(contents.map(content => content.language_code))]
  console.log('分類ID:', categoryId, '可用語言:', uniqueLanguages)
  return uniqueLanguages.length > 0
}

// 獲取分類可用的語言
function availableLanguages(categoryId) {
  // 找出所有屬於這個父分類的子分類 ID
  const subCategoryIds = categories.value
    .filter(cat => cat.parent_id === categoryId)
    .map(cat => cat.id)
  
  // 找出這些子分類的所有內容，並排除中文內容
  const contents = qaContents.value
    .filter(content => 
      subCategoryIds.includes(content.category_id) && 
      content.language_code !== 'zh-tw' &&
      ['en', 'vi', 'id', 'th'].includes(content.language_code)
    )
  
  // 獲取不重複的語言代碼
  const uniqueLanguageCodes = [...new Set(contents.map(content => content.language_code))]
  
  // 返回對應的語言資訊
  const availableLangs = languages.value
    .filter(lang => uniqueLanguageCodes.includes(lang.code))
    .filter(lang => ['en', 'vi', 'id', 'th'].includes(lang.code))
  
  console.log('分類ID:', categoryId, '可用語言資訊:', availableLangs)
  return availableLangs
}

// 初始化
onMounted(async () => {
  try {
    // 獲取所有分類
    const allCategories = await fetchQACategories()
    // 儲存所有分類
    categories.value = allCategories
    // 過濾出父分類（parent_id 為 null 的分類）
    parentCategories.value = allCategories.filter(cat => cat.parent_id === null)
    console.log('所有分類:', categories.value)
    console.log('父分類:', parentCategories.value)
    
    // 獲取所有支援的語言
    const allLanguages = await fetchLanguages()
    languages.value = allLanguages
    
    // 獲取所有 QA 內容
    const allContents = await fetchQAContents()
    qaContents.value = allContents
    console.log('所有 QA 內容:', allContents)
  } catch (error) {
    console.error('初始化失敗:', error)
  }
})

// SEO 設置
useSeoMeta({ title: "常見問題｜多元陪伴照顧" })
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 100px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.service-card {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  position: relative;
  justify-content: center;
}

.card-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  line-height: 1.4;
  text-align: center;
}

.service-button {
  background-color: #f26e21;
  color: white;
  padding: 5px 40px;
  border-radius: 25px;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-top: auto;
  letter-spacing: 2px;
}

.arrow {
  margin-left: 8px;
  font-size: 20px;
}

.flag-container {
  position: absolute;
  bottom: -50px;
  left: 0px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.flag {
  width: 60px;
  height: 40px;
  object-fit: cover;
}
.flag-container a img {
  transition: .3s;
}

.flag-container a:hover img{
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .service-grid {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    min-height: 180px;
  }
  .service-card.mobile {
    margin-top: 60px;
  }

}
</style>