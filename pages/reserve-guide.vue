<template>
  <div class="customer-container">
    <h2 class="default-title">
      預約指引
    </h2>
    <a href="tel:0255995449" class="note-display">如有操作相關疑問需諮詢,煩請撥打  <span>02-55995449</span>  詢問，感謝您</a>
    <iframe width="100%" height="450" src="https://www.youtube.com/embed/MhJgMhQ2PVA?si=lcp1d9-v6UPD6N0x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="book-step">
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>1</span>
          <p>註冊/登入</p>
        </div>
        <img src="/images/assets/book-1.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>2</span>
          <p>填寫服務申請資料</p>
        </div>
        <img src="/images/assets/book-2.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>3</span>
          <p>選擇試辦單位</p>
        </div>
        <img src="/images/assets/book-3.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>4</span>
          <p>閱讀雙方<br>權利義務責任</p>
        </div>
        <img src="/images/assets/book-4.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>5</span>
          <p>確認被委託<br>試辦單位受理服務申請</p>
        </div>
        <img src="/images/assets/book-5.avif" alt="">
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>6</span>
          <p>試辦單位致電聯繫<br>說明並瞭解服務需求</p>
        </div>
        <img src="/images/assets/book-6.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>7</span>
          <p>上傳相關資格文件</p>
        </div>
        <img src="/images/assets/book-7.avif" alt="">
      </div>
      <div class="step-item">
        <h3>步驟</h3>
        <div>
          <span>8</span>
          <p>簽約</p>
        </div>
        <img src="/images/assets/book-8.avif" alt="">
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>9</span>
          <p>陪伴員到府服務<br>打卡確認開始服務</p>
        </div>
        <img src="/images/assets/book-9.avif" alt="">
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>10</span>
          <p>服務結束時<br>打卡確認</p>
        </div>
        <img src="/images/assets/book-10.avif" alt="">
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>11</span>
          <p>填寫服務使用<br>滿意度調查</p>
        </div>
        <img src="/images/assets/book-11.avif" alt="">
      </div>
      <div class="step-item"><h3>步驟</h3>
        <div>
          <span>12</span>
          <p>服務結束</p>
        </div>
        <img src="/images/assets/book-12.avif" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "預約指引｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
.note-display {
  font-size: 24px;
  color: rgb(43, 39, 22);
  text-align: center;
  display: block;
  margin-bottom: 30px;
}
.note-display span {
  text-decoration: underline;
}
.default-title {
  margin-bottom: 30px;
}
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
  align-items: stretch;
  gap: 1%;
  flex-wrap: wrap;
  margin-bottom: 100px;
  justify-content: space-between;
}
.book-step .step-item {
  flex: 0 0 31%;
  margin-bottom: 40px;
}
.step-item {
  border-radius: 20px;
  border: 1px solid rgb(9, 55, 31);
  padding: 20px 15px;
  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.6);
}
.step-item img{
  display: block;
  margin: 0 auto;
  overflow: contain;
  height: 300px;
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
  margin-bottom: 20px;
}
.step-item div span {
  font-size: 60px;
  font-weight: bold;
  flex: 0 0 60px;
}
.step-item div p {
  font-size: 20px;
  color: rgb(9, 55, 31);
  vertical-align: bottom;
  margin-bottom: 0;
  align-self: flex-end;
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
