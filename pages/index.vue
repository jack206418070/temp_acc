<template>
  <div>
    <hero-banner-empty-index />
    <div>
      <nuxt-link class="book-btn btn-one jelly-box" id="jelly-box" href="https://serve-mcs.wda.gov.tw">
        預約/申請
      </nuxt-link>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/OxRL7eKReVQ?si=hhulgueBNpIueGKd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="main-container home-content">
      <div class="home-top">
        <h2>最新消息</h2>
      </div>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
      </div>
      <div v-else class="home-new">
        <div v-for="announcement in announcements" :key="announcement.id" class="new-item">
          <div class="new-title">
            <div class="title-text">{{ announcement.category }}</div>
            <div class="title-date">{{ formatDate(announcement.publish_date) }}</div>
          </div>
          <div class="new-link">
            <template v-if="announcement.content.length > 10">
              <a :href="'/news/' + announcement.id">
                {{ announcement.title }}
              </a>
            </template>
            <template v-else>
              <a :href="announcement.link" target="_blank">
                {{ announcement.title }}
              </a>
            </template>
          </div>
          <div class="item-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from "gsap";

const announcements = ref([]);
const loading = ref(true);
const error = ref(null);

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

// 獲取公告列表
const fetchAnnouncements = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch('/api/announcements');
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || '獲取公告列表失敗');
    }

    // 只顯示最新的4筆公告
    announcements.value = result.data
  } catch (err) {
    console.error('獲取公告列表失敗:', err);
    error.value = err.message || '獲取公告列表失敗';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAnnouncements();

  const jellyBox = document.getElementById("jelly-box");

  if (jellyBox) {
    // 定義動畫函數
    const jellyEffect = () => {
      gsap.timeline()
        // 初始快速拉伸
        .fromTo(
          jellyBox,
          { scaleX: 1, scaleY: 1 },
          {
            scaleX: 1.3, // 左右拉長
            scaleY: 1.5, // 上下壓縮
            duration: 0.3, // 每次動作持續時間
            ease: "power2.inOut", // 緩動效果
            yoyo: true, // 啟用回彈
            repeat: 2, // 完成兩次（初始與回彈）
          }
        )
        // 中間的3次快速拉長壓縮
        // .to(jellyBox, {
        //   scaleX: 1.2, // 左右壓縮
        //   scaleY: 2.3, // 上下拉長
        //   duration: 0.1, // 每次動作持續時間
        //   ease: "power2.inOut",
        //   yoyo: true,
        //   repeat: 4, // 快速來回三次
        // })
        // 恢復原狀
        .to(jellyBox, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.1,
          ease: "power2.out",
        });
    };

    // 設定每隔 3 秒觸發一次動畫
    const interval = setInterval(jellyEffect, 3000);

    // 確保組件卸載時清除計時器
    onUnmounted(() => {
      clearInterval(interval);
    });
  }
});

useSeoMeta({ title: "首頁｜多元陪伴照顧服務" });
</script>

<style scoped>
  h2 {
    color: #41BBBE;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }
  .home-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  .home-content {
    margin-top: 30px;
    background-color: rgb(251,250,247);
    padding: 40px 20px;
    padding-bottom: 20px;
    margin-bottom: 40px;
  }
  .book-btn {
    align-self: flex-start;
    margin-top: 30px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    width: 300px;
    background-color: rgb(220,111,50);
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1.3px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: .5s;
  }
  .book-btn:hover {
    background-color: rgb(80, 89, 233);
  }
  .new-title {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 10px;
    color: #282626;
    margin-bottom: 40px;
  }
  .item-line {
    height: 10px;
    border-bottom: 1px dashed #282626;
    /* border-style: dotted; */
    /* background-color: #282626; */
    width: 40%;
    margin: 20px 0;
    margin-bottom: 60px;
  }
  .new-title .title-text {
    font-size: 18px;
    font-weight: 500;
    flex: 0 0 100px;
  }
  .new-title .title-date {
    font-size: 14px;
    font-weight: 300;
  }
  .new-link a {
    color: #282626;
    font-weight: 400;
    cursor: pointer;
    font-size: 22px;
    letter-spacing: normal;
  }
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #dee2e6;
  }

  h1 {
    text-align: left;
    color: #8fa69a;
    padding-left: 4rem;
  }

  table {
    width: 90%;
    margin: 20px auto;
    border-collapse: collapse;
    text-align: left;
  }

  th,
  td {
    border: 1px solid #e0e0e0;
    padding: 10px;
  }

  th {
    background-color: #8fa69a;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:nth-child(odd) {
    background-color: #b8d1c4;
  }

  tr:hover {
    background-color: #b8d1c4;
  }

  .title a {
    color: #121212;
    text-decoration: none;
  }

  .title a:hover {
    text-decoration: underline;
  }

  iframe {
    display: block;
    width: 80%;
    height: 450px;
    margin: 0 auto;
    margin-bottom: 50px;
    margin-top: 50px;
  }

  @media (max-width: 991px) {
    h2 {
      margin-top: 0px;
    }
    .item-line {
      background-color: transparent;
    }
    .new-item:last-child .item-line {
      width: 100%;
      background-color: #282626;
    }
    .new-title .title-text {
      flex: 0 0 100%;
    }
    iframe {
      width: 90%;
      height: 250px;
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
    border-top: 4px solid #41BBBE;
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
</style>