<template>
  <div class="main-container">
    <h2 class="default-title apply-title">申請表</h2>
    <div class="apply-block">
      <ul>
        <li><a href="https://www.accompanytest.com/_files/ugd/73d1df_4c0323ab00d94bcdadc7b22ee919d34e.docx?dn=%E5%A4%9A%E5%85%83%E9%99%AA%E4%BC%B4%E7%85%A7%E9%A1%A7%E6%9C%8D%E5%8B%99-%E8%A9%A6%E8%BE%A6%E5%96%AE%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%A1%A8.docx">多元陪伴照顧服務試辦單位申請表</a></li>
        <li><a href="https://docs.google.com/document/d/1LZ_Qa-ZjeIE-8fujDAes3KvzBGkKg5vB0qM1GdDLZG0/edit?usp=sharing">多元陪伴照顧服務試辦計畫書</a></li>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({ title: "多元陪伴照顧服務試辦單位申請表" });
</script>

<style scoped>
  .apply-title {
    text-align: center;
    margin-top: 60px;
    margin-bottom: 40px;
  }
  ul {
    width: 45%;
    margin: 0 auto;
  }
  li {
    color: #333;
    letter-spacing: normal;
    font-size: 26px;
    /* text-align: center; */
  }
  a {
    color: inherit;
    letter-spacing: normal;
    font-size: 26px;
  }
  .apply-block {
    margin-bottom: 60px;
  }
  @media(max-width: 991px) {
    .apply-block {
      margin-bottom: 40px;
    }
    ul {
      width: 100%;
      margin: 0 auto;
    }
    a {
      font-size: 24px;
    }
    li {
      font-size: 24px;
    }
  }
</style>