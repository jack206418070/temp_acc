
<template>
  <div class="main-container">
    <div class="conduct-top">
      <div class="conduct-block">
        <Nuxt-link class="pre-link" href="/company-statute">
          <svg preserveAspectRatio="none" data-bbox="20 50.001 159.999 99.999" viewBox="20 50.001 159.999 99.999" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true" aria-label="">
            <g>
                <path d="M26.097 143.956c8.129 8.058 21.432 8.058 29.561 0L100 100l44.342 43.957c8.129 8.058 21.432 8.058 29.561 0 8.129-8.058 8.129-21.246 0-29.304l-59.122-58.608c-8.129-8.058-21.432-8.058-29.561 0l-59.122 58.608c-8.13 8.058-8.13 21.244-.001 29.303z"></path>
            </g>
          </svg>
        </Nuxt-link>
        <h2 class="default-title">外國人轉換準則</h2>
      </div>
    </div>
    <div class="conduct-content">
      <ul>
        <li>
          <a href="https://www.accompanytest.com/_files/ugd/73d1df_259a4f8ec0924d838b82366c36177726.pdf" target="_blank">外國人轉換準則檔案連結</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "外國人轉換原則｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
.conduct-top {
  margin-top: 40px;
  margin-bottom: 60px;
}
.conduct-content {
  padding-left: 60px;
  color: #41BBBE;
  font-size: 24px;
  margin-bottom: 100px;
}
.conduct-content a {
  color: #41BBBE;
}
.default-title {
  margin: 0;
  margin-top: 30px;
  margin-bottom: 30px;
}
.conduct-block {
  display: flex;
  align-items: center;
  gap: 20px;
}
.pre-link {
  font-weight: 900;
  transform: rotate(-90deg);
}
.pre-link svg {
  width: 31px;
  height: 19px;
  fill: #41BBBE;
}
@media (max-width: 991px) {
  .pre-link {
    align-self: flex-start;
    padding-top: 15px;
  }
  .default-title {
    margin: 0;
    font-size: 30px;
  }
  .conduct-content {
    padding-left: 12px;
    color: #788A74;
    font-size: 18px;
    margin-bottom: 100px;
  }
}
</style>
