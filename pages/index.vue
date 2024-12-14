<template>
  <div>
    <hero-banner-empty-index />
    <div class="main-container home-content">
      <div class="home-top">
        <h2>最新消息</h2>
        <nuxt-link class="book-btn btn-one" href="/services">
          預約/申請
        </nuxt-link>
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

<script setup lang="ts">
  useSeoMeta({ title: "首頁｜多元陪伴照顧服務" });
</script>

<style scoped>
  h2 {
    color: #788A74;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }
  .home-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .home-content {
    margin-top: 30px;
  }
  .book-btn {
    align-self: flex-start;
  }
  .new-title {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 10px;
    color: #282626;
    margin-bottom: 12px;
  }
  .item-line {
    height: 1px;
    background-color: #282626;
    width: 40%;
    margin: 20px 0;
  }
  .new-title .title-text {
    font-size: 15px;
    font-weight: 500;
    flex: 0 0 100px;
  }
  .new-title .title-date {
    font-size: 13px;
    font-weight: 300;
  }
  .new-link a {
    color: #282626;
    font-weight: 400;
    cursor: pointer;
    font-size: 20px;
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