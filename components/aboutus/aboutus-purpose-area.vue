<template>
  <div class="plan-about">
    <h2>計畫內容簡介</h2>
    <p>為回應民眾「臨短急」服務需求，包括長輩「臨」時有狀況卻找不到服務人力、外籍家庭看護空窗期的「短」期需要服務人力、家人手術或病後需要「急」性後期服務等，勞動部推動「多元陪伴照顧服務試辦計畫」，由依法設立滿五年之財團法人或非營利社團法人，並通過公益性、專業度與合理收費等評選標準後成為試辦單位，聘僱及培訓本國籍及外國籍多元陪伴照顧服務工作者到申請服務家庭，提供基本日常生活服務、陪同外出、陪同就醫、安全陪伴等多元陪伴照顧服務 。「陪伴照顧服務工作者」之給薪與休息時間，依勞動基準法規定辦理。</p>
    <p>本項服務由民眾全額自費，各試辦單位得提供單次至少四小時以上或全日等彈性服務，並依勞動部核定之服務價格收費。</p>
    <p>申請本項服務之民眾必須具備能提出以下任一文件之資格，包括：身心障礙證明、重大傷病證明、醫師診斷證明書、符合聘僱外國人之招募許可或聘僱許可、長期照顧需求評估通知書或使用收據等文件。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)

const service_data = [
  {
    id:1,
    icon:'/images/icon/icon_06.svg',
    title:'多元陪伴法規',
    desc:'',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'懶人包',
    desc:'',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'宣導品',
    desc:'',
  },
  ]
</script>

<style scoped>
h2 {
  color: #41BBBE;
  font-size: 42px;
  font-weight: 400;
  margin-top: 30px;
  margin-bottom: 30px;
}
.plan-about {
  margin-bottom: 60px;
}
.plan-about p {
  text-align: justify; /* 設置文字兩端對齊 */
  font-size: 20px;
  letter-spacing: normal;
  margin-bottom: 40px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 60%;
  max-height: 80vh;
  overflow-y: auto;
}
@media (max-width: 996px) {
  h2 {
    font-size: 34px;
  }
}


</style>
