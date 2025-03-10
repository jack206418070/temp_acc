<template>
  <div class="main-container">
    <h2 class="default-title">
      新聞報導
    </h2>
    <div class="announcement-list">
      <div class="announcement-list-item first-list">
        <div class="item-date">發佈日期</div>
        <div class="item-category">類別</div>
        <div class="item-title">標題</div>
      </div>
      <div class="announcement-list-item">
        <div class="item-date">2024/11/15</div>
        <div class="item-category">新聞報導</div>
        <div class="item-title">
          <a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank">勞動部今辦「多元陪伴照顧服務試辦計畫」試辦單位說明會 社福團體反應熱烈！</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({ title: "新聞報導 ｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
h1, h2 {
  text-align: center;
}
.announcement-list {
  margin-bottom: 80px;
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
@media (max-width: 991px) {
  .default-title {
    margin-bottom: 40px;
  }
  .first-list {
    display: none;
  }
  .announcement-list-item {
    font-size: 20px;
    border-top: 1px solid #333;
  }
  .announcement-list-item .item-date {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
  .announcement-list-item .item-category {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
  .announcement-list-item .item-title {
    flex: 0 0 100%;
  }
}

</style>