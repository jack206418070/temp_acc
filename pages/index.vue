<template>
  <div>
    <hero-banner-empty-index />

    <div
      class="container bg-white position-relative "
    >
      <div class="d-flex justify-content-center" >
        <h2>最新消息</h2>

        <div class="section-btn sm-mt-40">
          <nuxt-link href="/news" class="btn-five icon-link">
            <span class="text">閱讀更多</span>
            <div
              class="icon tran3s rounded-circle d-flex align-items-center justify-content-center"
            >
              <i class="bi bi-arrow-up-right"></i>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div>
  <table>
    <thead>
      <tr>
        <th>發布日期</th>
        <th>類別</th>
        <th>標題</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2024/11/15</td>
        <td><a href="/announcement">新聞報導 </a></td>
        <td class="title"><a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb">勞動部今辦「多元陪伴照顧服務試辦計畫」試辦單位說明會 社福團體反應熱烈！</a></td>
      </tr>
    </tbody>
  </table>
  </div>
    </div>

    <!-- 文字特徵區域開始 -->
    <!-- <text-feature-index /> -->
    <!-- 文字特徵區域結束 -->

    <!-- 常見問題區域開始 -->
    <!-- <faq-area-index /> -->
    <!-- 常見問題區域結束 -->
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "多元陪伴照顧服務" });
</script>

<style scoped>
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

    th, td {
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
</style>

