<template>
  <div class="main-container">
    <h2 class="default-title">
      公告/新聞稿
    </h2>
    <div class="announcement-list">
      <div class="announcement-list-item first-list">
        <div class="item-date">發佈日期</div>
        <div class="item-category">類別</div>
        <div class="item-title">標題</div>
      </div>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>
      <template v-else>
        <div v-for="announcement in announcements" :key="announcement.id" class="announcement-list-item">
          <div class="item-date">{{ formatDate(announcement.publish_date) }}</div>
          <div class="item-category">{{ announcement.category }}</div>
          <div class="item-title">
            <a v-if="announcement.link" :href="'/news/' + announcement.id" target="_blank">
              {{ announcement.title }}
            </a>
            <NuxtLink v-else :to="'/news/' + announcement.id">
              {{ announcement.title }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "新聞報導 ｜ 多元陪伴照顧服務計畫" });

const loading = ref(true);
const announcements = ref([]);

// 格式化日期函數
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

// 獲取公告列表
const fetchAnnouncements = async () => {
  try {
    loading.value = true;
    const { data } = await useFetch('/api/announcements');
    if (data.value?.success) {
      announcements.value = data.value.data;
    }
  } catch (error) {
    console.error('獲取公告列表失敗:', error);
  } finally {
    loading.value = false;
  }
};

// 在組件掛載時獲取數據
onMounted(async () => {
  await fetchAnnouncements();
});
</script>

<style scoped>
h1, h2 {
  text-align: center;
}
.announcement-list {
  margin-bottom: 80px;
  min-height: 200px;
}
.announcement-list-item {
  display: flex;
  align-items: start;
  padding: 20px 0;
  font-size: 20px;
  color: rgb(9, 55, 31);
  border-bottom: 1px solid #333;
  flex-wrap: wrap;
}
.announcement-list-item .item-date {
  flex: 0 0 20%;
  text-align: center;
}
.announcement-list-item .item-category {
  flex: 0 0 40%;
  text-align: center;
}
.announcement-list-item .item-title {
  flex: 0 0 40%;
}
.announcement-list-item .item-title a {
  color: rgb(9, 55, 31);
  text-decoration: none;
  transition: color 0.3s ease;
}
.announcement-list-item .item-title a:hover {
  color: #2c5282;
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
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media (max-width: 991px) {
  .default-title {
    margin-bottom: 40px;
  }
  .first-list {
    display: none;
  }
  .announcement-list-item {
    font-size: 22px;
    border-top: 1px solid #333;
  }
  .announcement-list-item .item-date {
    flex: 0 0 100%;
    margin-bottom: 10px;
    text-align: left;
  }
  .announcement-list-item .item-category {
    flex: 0 0 100%;
    margin-bottom: 10px;
    text-align: left;
  }
  .announcement-list-item .item-title {
    flex: 0 0 100%;
  }
}
</style>
