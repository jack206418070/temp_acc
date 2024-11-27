<template>
  <div>
    <!-- text feature area start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="line-wrapper position-relative">
          <div class="row align-items-center">
            <div class="col-lg-12 wow fadeInLeft">
              <div class="title-one">
                <h2>計畫內容簡介</h2>
              </div>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                為回應民眾「臨短急」照顧需求，包括長輩「臨」時有狀況卻找不到照顧人力、外籍家庭看護空窗期的「短」期需要照顧人力、家人手術或病後需要「急」性後期照顧等，勞動部推動「多元陪伴照顧服務試辦計畫」，由具備照顧服務經驗並依法設立滿五年之財團法人或非營利社團法人，並通過公益性、專業度與合理收費等評選標準後成為試辦單位，聘僱及培訓本國籍及外國籍之多元陪伴照顧服務工作者至申請服務家庭，提供基本日常生活照顧、陪同外出、陪同就醫、安全陪伴等多元陪伴照顧服務 。
              </p>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                「陪伴照顧服務工作者」之給薪與休息時間，依勞動基準法規定辦理。
              </p>
              <p class="text-lg mt-45 lg-mt-30 mb-35 lg-mb-30">
                本項服務由民眾全額自費，各試辦單位得提供單次至少四小時以上或全日等彈性服務，並依勞動部核定之服務價格收費。 申請本項服務之民眾必須具備能提出以下任一文件之資格，包括：身心障礙證明、重大傷病證明、醫師診斷證明書、符合聘僱外國人之招募許可或聘僱許可、長期照顧需求評估通知書或使用收據等文件。
              </p>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- text feature area end -->

    <!-- block feature area start -->
    <div
      class="block-feature-one position-relative light-bg-deep mt-50 lg-mt-80 pt-120 lg-pt-60 pb-130 lg-pb-60"
    >
      <div class="container">
        <div class="position-relative">
          <div class="row">
            <div class="col-md-6">
              <div class="title-one text-center text-md-start mb-30 sm-mb-10">
                <h2>了解更多</h2>
              </div>
              <!-- /.title-one -->
            </div>
          </div>
          <div class="row justify-content-center">
            <div
              v-for="(item, i) in service_data"
              :key="item.id"
              class="col-lg-4 col-md-6 d-flex wow fadeInUp"
              :data-wow-delay="`0.${i}s`"
            >
              <div class="card-style-two vstack tran3s w-100 mt-30">
                <img :src="item.icon" alt="" class="lazy-img icon me-auto" />
                <h4 class="fw-bold mt-30 mb-25">{{ item.title }}</h4>
                <p class="mb-20">{{ item.desc }}</p>
                <nuxt-link
                href="#"
                class="btn-three icon-link mt-15 mb-15 md-mb-40"
                @click.prevent="showModal = true"
              >
                <span cl>閱讀更多</span>
                <img
                  src="/images/icon/icon_09.svg"
                  alt=""
                  class="lazy-img icon ms-1"
                />
              </nuxt-link>
              </div>
            </div>
          </div>

        
          <!-- /.section-subheading -->
        </div>
      </div>
    </div>
    <!-- block feature area end -->
    <!-- 新增 Modal 組件 -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <h3>計畫內容簡介詳細說明</h3>
        <div class="modal-body">
          <p>就業服務法 -> 下載連結</p>
          <p>藍領審查標準 -> 下載連結</p>
          <p>多元陪伴照顧服務試 -> 下載連結</p>
          <p>外國人轉換準則 -> 下載連結</p>
        </div>
        <button class="btn btn-one " @click="showModal = false">關閉</button>
      </div>
    </div>
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
    title:'宣傳品',
    desc:'',
  },
  ]
</script>

<style scoped>
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


</style>
