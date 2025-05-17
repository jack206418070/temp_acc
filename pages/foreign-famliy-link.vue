<template>
  <div class="main-container foreign-famliy-link-block">
    <div class="link-item" v-for="(link, index) in links" :key="index">
      <p>{{ index + 1 }}.{{ link.name }}</p>
      <a :href="link.link">{{ link.link }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
const links = ref([
  {
    "name": "外國人從事家庭看護工作補充訓練課程專區",
    "link": "https://fw.wda.gov.tw/wda-employer/home/e-training/newPreLogin"
  },
  {
    "name": "【移學園】移工學習的學園Migrant Learning Garden 免費華語學習社團",
    "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38fb67f75018fb7f1fdb602cb"
  },
  {
    "name": "臺北移工學校 Sekolah Pekerja Migran Taipei",
    "link": "https://www.youtube.com/@taipeimigrantworkerschool5411"
  },
  {
    "name": "(越南/泰國/菲律賓)中文學習影片宣傳",
    "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38c40b9a4018c4331d91f04b2"
  },
  {
    "name": "(印尼)中文學習影片宣傳",
    "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb389604c4601896315e6990804"
  },
  {
    "name": "臺灣華語教育資源中心-華語101",
    "link": "https://lmit.edu.tw/zh"
  },
  {
    "name": "外籍看護工中文基礎訓練課程教材(中越文版)",
    "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4f1a66f0022"
  },
  {
    "name": "外籍看護工中文基礎訓練課程教材(中英文版)",
    "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48730fd0023"
  },
  {
    "name": "外籍看護工中文基礎訓練課程教材(中印文版)",
    "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48cb6490047"
  },
  {
    "name": "外籍看護工中文基礎訓練課程教材(中泰文版)",
    "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4fe0fde0046"
  }
]);
useSeoMeta({ title: "外籍家庭看護工學習資源｜多元陪伴照顧服務計畫" });
</script>

<style scoped>
  .foreign-famliy-link-block {
    padding: 60px 30px;
  }
  .link-item {
    margin-bottom: 20px;
  }
  p, a {
    margin-bottom: 0;
    letter-spacing: 1.3px;
    font-size: 18px;
    white-space: wrap;
  }
  @media (max-width: 991px) {
    .foreign-famliy-link-block {
      padding: 30px 15px;
    }
    p, a {
      font-size: 14px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      display: block;
    }
  }
</style>