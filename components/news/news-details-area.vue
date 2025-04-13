<template>
  <div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
    <div class="container">
      <div class="row gx-xl-5">
        <div class="col-lg-12">
          <article class="blog-meta-two style-two">
            <div v-if="loading" class="loading-container">
              <div class="loading-spinner"></div>
              <p>載入中...</p>
            </div>
            <div v-else-if="error" class="error-container">
              <p>{{ error }}</p>
            </div>
            <div v-else class="post-data">
              <div class="post-head">{{ blog.category }}</div>
              <div>
                <div class="post-startDate">發佈日期：{{ formatDate(blog.publish_date) }}</div>
                <div v-if="blog.activity_start_date" class="post-startDate">活動開始日期：{{ formatDate(blog.activity_start_date) }}</div>
                <div class="post-category">類別：{{ blog.category }}</div>
              </div>
              <div class="post-details-meta">
                內容：<br>
                <div class="post-content" v-html="decode(blog.content)"></div>
              </div>
              <div class="post-links" v-if="blog.link">
                連結：<br>
                <div class="post-link-item">
                  <a :href="blog.link" target="_blank">{{ blog.linkTitle || blog.link }}</a>
                </div>
              </div>
              <div class="post-images" v-if="blog.images && blog.images.length > 0">
                圖片：<br>
                <div class="post-images-item">
                  <template v-for="(image, index) in blog.images" :key="image.id">
                    <div class="tab-data-item" @click="openPopup(index)">
                      <img :src="getImageUrl(image)" alt="">
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showPopup && blog.images" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="arrow left" v-if="currentIndex > 0" @click="prevImage">‹</button>
      <img :src="getImageUrl(blog.images[currentIndex])" alt="Popup Image" />
      <button class="arrow right" v-if="currentIndex < blog.images.length - 1" @click="nextImage">›</button>
      <button class="close-btn" @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const blog = ref({});
const loading = ref(true);
const error = ref(null);
const showPopup = ref(false);
const currentIndex = ref(0);

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

// 將二進制數據轉換為 Blob URL
const getImageUrl = (image) => {
  if (!image || !image.image_content || !image.image_content.data) return '';
  
  const uint8Array = new Uint8Array(image.image_content.data);
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  return URL.createObjectURL(blob);
};

// 獲取公告詳細資訊
const fetchAnnouncementDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const id = route.params.id;
    if (!id) {
      throw new Error('找不到公告ID');
    }

    const response = await fetch(`/api/announcements/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || '獲取公告資訊失敗');
    }

    blog.value = result.data;
  } catch (err) {
    console.error('獲取公告詳細資訊失敗:', err);
    error.value = err.message || '獲取公告資訊失敗';
  } finally {
    loading.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = '';
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const openPopup = (index) => {
  currentIndex.value = index;
  showPopup.value = true;
  document.body.style.overflow = 'hidden';
};

const nextImage = () => {
  if (blog.value.images && currentIndex.value < blog.value.images.length - 1) {
    currentIndex.value++;
  }
};

const decode = (str) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

// 清理資源
const cleanup = () => {
  if (blog.value.images) {
    blog.value.images.forEach(image => {
      const url = getImageUrl(image);
      if (url) URL.revokeObjectURL(url);
    });
  }
};

onMounted(() => {
  fetchAnnouncementDetails();
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<style lang="scss" scoped>
.post-head {
  color: #cb4e00;
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 20px;
  /* margin-bottom: 20px; */
  border-bottom: 1px dashed #BEBEBE;
}
.post-images-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}
.post-startDate, .post-category {
  padding: 10px 0;
  font-size: 20px;
  border-bottom: 1px dashed #BEBEBE;
}
.post-images-item .tab-data-item {
  flex: 0 0 25%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-images-item .tab-data-item img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.blog-meta-two.style-two .post-data .post-info {
  margin: 0px;
  padding: 5px 0;
  font-size: 20px !important;
  color: #885849;
}
.blog-details .post-details-meta {
  margin-top: 0px;
}
.post-content {
  margin-top: 10px;
  padding-left: 15px;
}

.tab-data-item {
  border-radius: 30px;
  margin-bottom: 30px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
}
.tab-data-item::after {
  content: ""; /* 確保非 hover 狀態下也存在 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(41, 15%, 50%, 0); /* 初始為透明 */
  z-index: 100;
  transition: all .5s;
}
.post-links {
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px dashed #BEBEBE;
}
.post-links .post-link-item {
  padding-left: 15px;
  color: rgb(75, 127, 186);
}
.tab-data-item-block2 {
  flex: 0 0 50%;
  border-radius: 30px;
  margin-bottom: 30px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
}
.tab-data-item:hover::after{
  background-color: hsla(41, 15%, 50%, 0.5);
}
.tab-data-item img {
  object-fit: contain;
  display: block;
}
.tab-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}
.tab-list .tab-item {
  padding: 5px 40px;
  color: #0C4426;
  border: 3px solid #EC6717;
  transition: all .5s;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
}
.tab-data-item p {
  font-size: 18px;
  margin-top: 10px;
  color: rgb(75, 127, 186);
  position: absolute;
  bottom: -60px;
}
.tab-list .tab-item.activated, .tab-list .tab-item:hover {
  color: #fff;
  border: 3px solid #EC6717;
  background-color: #41BBBE;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 222, 179, 0.9); /* 米色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  z-index: 1001;
}

.arrow.left {
  left: -50px;
  font-size: 3rem;
}

.arrow.right {
  right: -50px;
  font-size: 3rem;
}

.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991px) {
  .post-images-item .tab-data-item {
    flex: 0 0 100%;
  }
  .post-images-item {
    flex-wrap: wrap;
  }
  .tab-data-list {
    gap: 0;
    justify-content: center;
  }
  .popup-content img {
    max-width: 80%;
  }
  .tab-data-item {
    flex: 0 0 90%;
    margin-bottom: 20px;
  }
  .default-title {
    margin-bottom: 25px;
  }
  .tab-list {
    justify-content: center;
  }
  .popup-content {
    max-width: 90%;
    max-height: 70%;
  }

  .arrow.left {
    left: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .arrow.right {
    right: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .close-btn {
    top: -10px;
    right: 30px;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.error-container {
  text-align: center;
  padding: 40px 0;
  color: #dc3545;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
}
</style>
