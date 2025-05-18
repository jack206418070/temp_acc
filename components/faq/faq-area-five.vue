<template>
  <div class="faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80">
    <div class="main-container">
      <div class="service-grid">
        <!-- 申請服務卡片 -->
        <div class="service-card">
          <h3 class="card-title">民眾申請篇</h3>
          <a href="/qa?id=1" class="service-button">
            相關問題
            <span class="arrow">›</span>
          </a>
        </div>

        <!-- 試辦單位卡片 -->
        <div class="service-card">
          <h3 class="card-title">試辦單位篇</h3>
          <a href="/qa?id=2" class="service-button">
            相關問題
            <span class="arrow">›</span>
          </a>
        </div>

        <!-- 照顧服務工作者卡片 -->
        <div class="service-card">
          <h3 class="card-title">外國籍陪伴照顧服務工作者篇</h3>
          <a href="/qa?id=3" class="service-button">
            相關問題
            <span class="arrow">›</span>
          </a>
          <div class="flag-container">
            <a href="/qa?id=3&lang=en">
              <img src="/images/assets/flag-1.avif" alt="Philippines flag" class="flag">
            </a>
            <a href="/qa?id=3&lang=vi">
              <img src="/images/assets/flag-2.avif" alt="Vietnam flag" class="flag">
            </a>
            <a href="/qa?id=3&lang=id">
              <img src="/images/assets/flag-3.avif" alt="Indonesia flag" class="flag">
            </a>
            <a href="/qa?id=3&lang=th">
              <img src="/images/assets/flag-4.avif" alt="Thailand flag" class="flag">
            </a>
          </div>
        </div>

        <!-- 就業服務機構卡片 -->
        <div class="service-card mobile">
          <h3 class="card-title">私立就業服務機構(仲介)篇</h3>
          <a href="/qa?id=4" class="service-button">
            相關問題
            <span class="arrow">›</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({ title: "常見問題｜多元陪伴照顧" });
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 100px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.service-card {
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  position: relative;
  justify-content: center;
}

.card-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  line-height: 1.4;
  text-align: center;
}

.service-button {
  background-color: #f26e21;
  color: white;
  padding: 5px 40px;
  border-radius: 25px;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-top: auto;
  letter-spacing: 2px;
}

.arrow {
  margin-left: 8px;
  font-size: 20px;
}

.flag-container {
  position: absolute;
  bottom: -50px;
  left: 0px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.flag {
  width: 60px;
  height: 40px;
  object-fit: cover;
}
.flag-container a img {
  transition: .3s;
}

.flag-container a:hover img{
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .service-grid {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    min-height: 180px;
  }
  .service-card.mobile {
    margin-top: 60px;
  }

}

</style>