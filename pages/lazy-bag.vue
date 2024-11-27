<template>
 <!-- 空出的小區段 -->
    <div class="spacer-section">
      <!-- 可插入內容，或保持空白 -->
      <p>          </p>
    </div>
  <div>
 <div>
  <h1>懶人包</h1>
    <div class="grid-container">
        <div class="grid-item">內容待提供</div>
        <div class="grid-item">內容待提供</div>
        <div class="grid-item">內容待提供</div>
        <div class="grid-item">內容待提供</div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "懶人包｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
h1, h2 {
  text-align: center;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.grid-item {
    background-color: #ffffff;
    border: 1px solid #E0E0E0;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    font-size: 50px;
    line-height: 1.5;
    color: #333333;
    min-height: 150px;
}

</style>
