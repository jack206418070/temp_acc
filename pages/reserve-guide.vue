<template>
  <div class="customer-container">
    <h2 class="default-title">
      預約指引
    </h2>
    <div class="book-step">
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>1</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>2</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>3</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>4</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>5</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>6</span>
          <p>完整內容建置中</p>
        </div></div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>7</span>
          <p>完整內容建置中</p>
        </div>
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>8</span>
          <p>完整內容建置中</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "預約指引｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
h1, h2 {
  text-align: center;
}
.customer-container {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 15px;
}
.book-step {
  display: flex;
  align-items: center;
  gap: 1%;
  flex-wrap: wrap;
  margin-bottom: 100px;
}
.book-step .step-item {
  flex: 0 0 24%;
  margin-bottom: 20px;
}
.step-item {
  border-radius: 20px;
  border: 1px solid rgb(9, 55, 31);
  padding: 20px 15px;
  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.6);
}
.step-item h3 {
  font-weight: 400;
  color: rgb(9, 55, 31);
  font-size: 35px;
}
.step-item div {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  justify-content: space-between;
}
.step-item div span {
  font-size: 60px;
  font-weight: bold;
}
.step-item div p {
  font-size: 20px;
  color: rgb(9, 55, 31);
}
@media (max-width: 991px) {
  .book-step .step-item {
    flex: 0 0 90%;
    margin-bottom: 20px;
  }
  .book-step {
    justify-content: center;
  }
  .step-item h3 {
    text-align: center;
  }
  .step-item div span {
    flex: 0 0 100%;
    text-align: center;
  }
  .step-item div p {
    flex: 0 0 100%;
    text-align: center;
  }
}
</style>
