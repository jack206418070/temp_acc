<template>
  <div>

    
    <!-- 文本區域一開始 -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="row">
            <div class="col-lg-5 wow fadeInLeft">
                <div class="title-one">
                    <h2>試辦單位</h2>
                </div>
                <!-- /.title-one -->
                <p class="text-lg mt-45 lg-mt-30 mb-60 lg-mb-30">您的成長是我們的使命。作為多元陪伴服務提供者，我們提供專業指導，釋放您的潛力，促進個人發展。</p>
                <nuxt-link href="/contact" class="btn-three icon-link mt-15 md-mb-60">
                    <span>預約諮詢</span>
                    <img src="/images/icon/icon_09.svg" alt="" class="lazy-img icon ms-1">
                </nuxt-link>
            </div>
            <div class="col-lg-6 ms-auto">
                <div class="row">
                 
                    <div v-for="(item,i) in feature_data" :key="item.id" class="col-sm-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
                        <div class="card-style-twelve mb-40 lg-mb-20">
                            <div class="icon tran3s d-flex align-items-center justify-content-center rounded-circle">
                              <img :src="item.icon" alt="" class="lazy-img">
                            </div>
                            <h4 class="fw-bold mt-20 mb-15">{{item.title}}</h4>
                            <p>{{item.subtitle}}</p>
                        </div>
                        <!-- /.card-style-twelve -->
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 文本區域一結束 -->


   
  </div>
  
</template>

<script setup lang="ts">

const feature_data = [
  {
    id:1,
    icon:'/images/icon/icon_55.svg',
    title:'專業顧問',
    subtitle:'我們的顧問團隊經驗豐富，為您提供個性化的陪伴服務'
  },
  {
    id:2,
    icon:'/images/icon/icon_56.svg',
    title:'全面支援',
    subtitle:'無論您遇到什麼困難，我們都會提供及時有效的支援'
  },
  {
    id:3,
    icon:'/images/icon/icon_57.svg',
    title:'合理收費',
    subtitle:'我們提供透明、合理的收費標準，讓優質服務觸手可及'
  },
  {
    id:4,
    icon:'/images/icon/icon_58.svg',
    title:'靈活安排',
    subtitle:'根據您的需求和時間，我們提供靈活的服務安排'
  }
];

const service_data = [
  {
    id:1,
    icon:'/images/icon/icon_06.svg',
    title:'心理諮詢',
    desc:'專業心理諮詢師為您提供一對一的心理支援，幫助您應對生活中的各種挑戰。',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'生活陪伴',
    desc:'我們的陪伴員可以陪您聊天、散步、看電影，讓您的生活更加豐富多彩。',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'學習輔導',
    desc:'針對不同年齡段的學習需求，我們提供個性化的學習輔導和技能培訓。',
  },
  {
    id: 4,
    icon: "/images/icon/icon_40.svg",
    title: "健康管理",
    desc: "我們的健康顧問將幫助您制定個性化的健康計劃，並提供長期跟蹤服務。",
  },
  {
    id: 5,
    icon: "/images/icon/icon_41.svg",
    title: "興趣培養",
    desc: "發掘並培養您的興趣愛好，讓生活更加精彩。我們提供各種興趣課程和活動。",
  },
  {
    id: 6,
    icon: "/images/icon/icon_42.svg",
    title: "社交支援",
    desc: "幫助您拓展社交圈，組織各種社交活動，增強您的人際交往能力。",
  },
];
</script>