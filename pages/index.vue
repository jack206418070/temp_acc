<template>
  <div>
    <hero-banner-empty-index />
    <div>
      <nuxt-link class="book-btn btn-one jelly-box" id="jelly-box" href="https://serve-mcs.wda.gov.tw">
        預約/申請
      </nuxt-link>
    </div>
    <div class="main-container home-content">
      <div class="home-top">
        <h2>最新消息</h2>
      </div>
      <div class="home-new">
        <div class="new-item">
          <div class="new-title">
            <div class="title-text">公告/新聞稿</div>
            <div class="title-date">2024/11/15</div>
          </div>
          <div class="new-link">
            <a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank">勞動部今辦「多元陪伴照顧服務試辦計畫」試辦單位說明會 社福團體反應熱烈！</a>
          </div>
          <div class="item-line"></div>
        </div>
        <div class="new-item">
          <div class="new-title">
            <div class="title-text">新聞報導</div>
            <div class="title-date">2024/11/15</div>
          </div>
          <div class="new-link">
            <a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank">活動訊息：勞動部今辦「多元陪伴照顧服務試辦計畫」試辦單位說明會 社福團體反應熱烈！</a>
          </div>
          <div class="item-line"></div>
        </div>
      </div>
    </div>
  </div>
  
</template>

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
  }
</style>

<script setup lang="ts">
  import { gsap } from "gsap";
  import { onMounted, onUnmounted } from 'vue';

  onMounted(() => {
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