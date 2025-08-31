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

              <!-- 連結 -->
              <div class="post-links" v-if="blog.link">
                連結：<br>
                <div class="post-link-item">
                  <a :href="blog.link" target="_blank">{{ blog.linkTitle || blog.link }}</a>
                </div>
              </div>
              
              <div class="post-files" v-if="pdfList.length > 0">
                檔案：<br />
                <div class="post-files-list">
                  <div class="post-file-item" v-for="(file, idx) in pdfList" :key="file.id ?? idx">
                    <div class="file-left">
                      <span class="file-name">{{ file.original_filename || `PDF 檔案 ${idx + 1}` }}</span>
                    </div>
                    <div class="file-actions">
                      <a class="btn btn-ghost" :href="getFileUrl(file)" target="_blank" rel="noopener">開啟</a>
                      <button class="btn btn-primary" @click="downloadFile(file)">下載</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 圖片 -->
              <div class="post-images" v-if="imageList.length > 0">
                圖片：<br>
                <div class="post-images-item">
                  <template v-for="(image, index) in imageList" :key="image.id ?? index">
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

  <!-- 圖片預覽 Popup（只針對 imageList） -->
  <div v-if="showPopup && imageList.length" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="arrow left" v-if="currentIndex > 0" @click="prevImage">‹</button>
      <img :src="getImageUrl(imageList[currentIndex])" alt="Popup Image" />
      <button class="arrow right" v-if="currentIndex < imageList.length - 1" @click="nextImage">›</button>
      <button class="close-btn" @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

type BinLike = { data?: ArrayLike<number> } | ArrayLike<number> | number[] | Uint8Array;
type MediaItem = {
  id?: string | number;
  file_type?: string;           // 'image' | 'pdf' | 其他
  mime_type?: string;           // 可選，若有就用
  original_filename?: string;   // 下載檔名
  image_content?: { data: ArrayLike<number> } | ArrayLike<number>;
};

const route = useRoute();
const blog = ref<any>({});
const loading = ref(true);
const error = ref<string | null>(null);
const showPopup = ref(false);
const currentIndex = ref(0);

// 快取已建立的 Blob URL，便於清理
const urlCache = new Map<string, string>();

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

// 判斷、提取二進位內容
const extractBinary = (item: MediaItem): Uint8Array | null => {
  const raw: BinLike | undefined =
    (item as any).image_content?.data ??
    (item as any).image_content ??
    (item as any).file_content?.data ??
    (item as any).file_content;

  if (!raw) return null;
  try {
    if (raw instanceof Uint8Array) return raw;
    if (Array.isArray(raw)) return new Uint8Array(raw as number[]);
    if (typeof (raw as any).length === 'number') return new Uint8Array(raw as ArrayLike<number>);
    return null;
  } catch {
    return null;
  }
};

const getMimeType = (item: MediaItem): string => {
  if (item?.mime_type) return item.mime_type;
  if (item?.file_type?.toLowerCase() === 'pdf') return 'application/pdf';
  // 預設當作 jpeg；若你端回來可能是 png/webp，可再延伸判斷
  return 'image/jpeg';
};

// 建立或取用快取的 Blob URL
const getBlobUrl = (item: MediaItem): string => {
  const key = `${item.id ?? Math.random()}|${item.file_type ?? 'unknown'}`;
  if (urlCache.has(key)) return urlCache.get(key)!;

  const bin = extractBinary(item);
  if (!bin) return '';
  const blob = new Blob([bin], { type: getMimeType(item) });
  const url = URL.createObjectURL(blob);
  urlCache.set(key, url);
  return url;
};

// 供 <img> 使用
const getImageUrl = (image: MediaItem): string => {
  if (!image) return '';
  return getBlobUrl(image);
};

// 供 PDF「開啟/下載」使用
const getFileUrl = (file: MediaItem): string => {
  if (!file) return '';
  return getBlobUrl(file);
};

// 依 file_type 分流
const imageList = computed<MediaItem[]>(() =>
  Array.isArray(blog.value?.images)
    ? blog.value.images.filter((x: MediaItem) => (x?.file_type ?? '').toLowerCase() === 'image')
    : []
);

const pdfList = computed<MediaItem[]>(() =>
  Array.isArray(blog.value?.images)
    ? blog.value.images.filter((x: MediaItem) => (x?.file_type ?? '').toLowerCase() === 'pdf')
    : []
);

// 下載
const downloadFile = (file: MediaItem) => {
  const url = getFileUrl(file);
  if (!url) return;

  const a = document.createElement('a');
  a.href = url;
  a.download = file.original_filename || 'download';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// 讀取公告
const fetchAnnouncementDetails = async () => {
  try {
    loading.value = true;
    error.value = null;

    const id = route.params.id;
    if (!id) throw new Error('找不到公告ID');

    const response = await fetch(`/api/announcements/${id}`);
    const result = await response.json();

    if (!result?.success) {
      throw new Error(result?.message || '獲取公告資訊失敗');
    }

    blog.value = result.data || {};
  } catch (err: any) {
    console.error('獲取公告詳細資訊失敗:', err);
    error.value = err?.message || '獲取公告資訊失敗';
  } finally {
    loading.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = '';
};

const prevImage = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const openPopup = (index: number) => {
  currentIndex.value = index;
  showPopup.value = true;
  document.body.style.overflow = 'hidden';
};

const nextImage = () => {
  if (currentIndex.value < imageList.value.length - 1) currentIndex.value++;
};

const decode = (str?: string) => {
  if (!str) return '';
  if (typeof window !== 'undefined') {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }
  return str;
};

// 清理所有快取 URL
const cleanup = () => {
  urlCache.forEach((url) => URL.revokeObjectURL(url));
  urlCache.clear();
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
  cursor: pointer;
  position: relative;
}
.tab-data-item::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: hsla(41, 15%, 50%, 0);
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

/* PDF 區塊樣式 */
.post-files {
  padding: 15px 0;
  border-top: 1px dashed #BEBEBE;
  border-bottom: 1px dashed #BEBEBE;
  margin: 20px 0;
}
.post-files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 15px;
}
.post-file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.post-file-item .file-name {
  font-size: 16px;
}
.post-file-item .file-actions a {
  margin-right: 10px;
  color: #4b7fba;
}
.download-btn {
  padding: 4px 10px;
  border: 1px solid #4b7fba;
  background: #fff;
  color: #4b7fba;
  border-radius: 6px;
  cursor: pointer;
}
.download-btn:hover {
  background: #4b7fba;
  color: #fff;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 222, 179, 0.9);
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
  width: 50% !important;
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
.arrow.left { left: -50px; font-size: 3rem; }
.arrow.right { right: -50px; font-size: 3rem; }
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
  display: flex; justify-content: center; align-items: center;
}

@media (max-width: 991px) {
  .post-images-item .tab-data-item { flex: 0 0 100%; }
  .post-images-item { flex-wrap: wrap; }
  .tab-data-list { gap: 0; justify-content: center; }
  .popup-content img { max-width: 80%; width: 50% !important; }
  .tab-data-item { flex: 0 0 90%; margin-bottom: 20px; }
  .default-title { margin-bottom: 25px; }
  .tab-list { justify-content: center; }
  .popup-content { max-width: 90%; max-height: 70%; }
  .arrow.left { left: 10px; font-size: 3rem; z-index: 1000; }
  .arrow.right { right: 10px; font-size: 3rem; z-index: 1000; }
  .close-btn { top: -10px; right: 30px; font-size: 1.2rem; width: 30px; height: 30px; }
}

.loading-container {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 0;
}
.loading-spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3; border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
.error-container { text-align: center; padding: 40px 0; color: #dc3545; }
@keyframes spin { 0%{ transform: rotate(0deg); } 100%{ transform: rotate(360deg); } }
.loading-spinner.small {
  width: 20px; height: 20px;
  border: 2px solid #f3f3f3; border-top: 2px solid #3498db;
}

.post-files {
  padding: 15px 0;
  border-top: 1px dashed #BEBEBE;
  border-bottom: 1px dashed #BEBEBE;
  margin: 20px 0;
}

.post-files-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 15px;
}

/* 單一列：左邊檔名、右邊按鈕群 */
.post-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右兩側 */
  gap: 12px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
}

.file-left {
  min-width: 0; /* 讓檔名可省略號 */
}
.file-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: inline-block;
  max-width: 60ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 按鈕群：橫向並排 */
.file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0; /* 避免被擠壓 */
}

/* 統一按鈕風格 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  text-decoration: none; /* 讓 <a> 看起來像按鈕 */
  transition: transform .02s ease, background-color .2s ease, color .2s ease, border-color .2s ease;
}
.btn:active { transform: translateY(1px); }

.btn-primary {
  background: #4b7fba;
  border-color: #4b7fba;
  color: #fff;
}
.btn-primary:hover { filter: brightness(1.05); }

.btn-ghost {
  background: #fff;
  border-color: #4b7fba;
  color: #4b7fba;
}
.btn-ghost:hover {
  background: #4b7fba;
  color: #fff;
}

/* RWD：手機時按鈕自動換行置中 */
@media (max-width: 600px) {
  .post-file-item {
    flex-wrap: wrap;
    gap: 8px 10px;
  }
  .file-left, .file-actions {
    width: 100%;
  }
  .file-actions {
    justify-content: flex-start; /* 你想置中可改成 center */
  }
}
</style>