<template>
  <div class="main-container company-statute">
    <h2 class="default-title company-title">多元陪伴照顧服務法規</h2>
    <div class="comapny-statute-list">
      <div class="comapny-statute-list-item">
        <div class="item-number">01</div>
        <div class="item-desc"><Nuxt-link href="/conduct-plan">多元陪伴照顧服務試辦計畫</Nuxt-link></div>
      </div>
      <div class="comapny-statute-list-item">
        <div class="item-number">02</div>
        <div class="item-desc"><Nuxt-link href="/employment-services">就業服務法</Nuxt-link></div>
      </div>
      <div class="comapny-statute-list-item">
        <div class="item-number">03</div>
        <div class="item-desc"><Nuxt-link href="/censor-standard">外國人從事就業服務法第四十六條第一項第八款至第十一款工作資格及審查標準(藍領審查標準)</Nuxt-link></div>
      </div>
      <div class="comapny-statute-list-item">
        <div class="item-number">04</div>
        <div class="item-desc"><Nuxt-link href="/convert-principle">外國人受聘僱從事就業服務法第四十六條第一項第八款至第十一款規定工作之轉換雇主或工作程序準則(外國人轉換準則)</Nuxt-link></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "多元陪伴法規｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
  .company-title {
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .comapny-statute-list {
    padding-left: 40px;
    margin-bottom: 100px;
  }
  .comapny-statute-list-item {
    display: flex;
    align-items: center;
    gap: 50px;
    margin-bottom: 30px;
  }
  .comapny-statute-list-item .item-number {
    font-size: 67px;
    font-weight: bold;
    color: #EC6717;
    flex: 0 0 80px;
  }
  .comapny-statute-list-item .item-desc {
    cursor: pointer;
    color: #41BBBE;
    letter-spacing: 1.3px;
    font-size: 22px;
  }
  @media (max-width: 991px) {
    .comapny-statute-list-item .item-number {
      font-size: 48px;
      flex: 0 0 60px;
      align-self: flex-start;
    }
    .company-title {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
    }
    .comapny-statute-list-item .item-desc {
      font-size: 20px;
    }
    .comapny-statute-list-item .item-desc {
      align-self: flex-start;
      padding-top: 12px;
    }
  }

</style>
