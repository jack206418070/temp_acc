<template>
  <div>
    <div class="service-banner">
      <div class="main-container">
        <h2 class="default-title">
          試辦單位簡介
        </h2>
        <p>經勞動部評選核定為多元陪伴照顧服務試辦計畫之試辦單位，聘僱本國籍及外國籍之多元陪伴照顧服務工作者，指派至多元陪伴照顧服務契約履行地，從事陪伴服務等相關事務之體力工作。<br>
          點選以下各區的試辦單位簡介，有服務項目、服務時數、收費等相關說明介紹。</p>
        <h2 class="default-title flex">
          現有試辦單位簡介
          <a class="service-login-btn-temp" href="https://unit-mcs.wda.gov.tw">申請派案系統登入</a>
          <a class="service-login-btn-temp" style="top: 80px" href="https://care-mcs.wda.gov.tw/login">個案服務系統暨外部督導系統登入</a>
        </h2>
        <a class="service-login-btn-temp mobile" href="https://unit-mcs.wda.gov.tw">申請派案系統登入</a>
        <a class="service-login-btn-temp mobile" href="https://care-mcs.wda.gov.tw/login">個案服務系統暨外部督導系統登入</a>
        <p>以下各區的試辦單位簡介，有服務項目、服務時數、收費等相關說明介紹。</p>
        <!-- <Nuxt-link href="https://accompany-service-user.vercel.app/login" id="jelly-box" class="jelly-box">
          <span>​前往申請及派案平台</span>
          <span>
            <svg data-bbox="12.816 12.816 174.368 174.368" xmlns="http://www.w3.org/2000/svg" width="200" height="200"
              viewBox="0 0 200 200" data-type="shape">
              <g>
                <path
                  d="M100 12.816c-48.073 0-87.184 39.111-87.184 87.184s39.11 87.184 87.184 87.184 87.184-39.111 87.184-87.184S148.073 12.816 100 12.816zm0 168.651c-44.921 0-81.467-36.546-81.467-81.467S55.079 18.533 100 18.533 181.467 55.079 181.467 100 144.921 181.467 100 181.467z">
                </path>
                <path
                  d="M91.832 79.142L89.3 77.815l-2.653 5.065 2.532 1.326 25.196 13.199H72.403l.17 5.714h41.973l-24.364 14.679-2.449 1.475 2.951 4.897 2.448-1.475 33.711-20.31 4.352-2.622-4.501-2.358-34.862-18.263z">
                </path>
              </g>
            </svg>
          </span>
        </Nuxt-link> -->
      </div>
    </div>
    <div class="main-container">
      <service-unit-list-area />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { gsap } from "gsap";
  import { onMounted, onUnmounted } from 'vue';

  onMounted(() => {
    // const jellyBox = document.getElementById("jelly-box");

    // if (jellyBox) {
    //   // 定義動畫函數
    //   const jellyEffect = () => {
    //     gsap.timeline()
    //       // 初始快速拉伸
    //       .fromTo(
    //         jellyBox,
    //         { scaleX: 1, scaleY: 1 },
    //         {
    //           scaleX: 1.2, // 左右拉長
    //           scaleY: 0.9, // 上下壓縮
    //           duration: 0.3, // 每次動作持續時間
    //           ease: "power2.inOut", // 緩動效果
    //           yoyo: true, // 啟用回彈
    //           repeat: 0, // 完成兩次（初始與回彈）
    //         }
    //       )
    //       // 中間的3次快速拉長壓縮
    //       .to(jellyBox, {
    //         scaleX: 0.9, // 左右壓縮
    //         scaleY: 1.2, // 上下拉長
    //         duration: 0.1, // 每次動作持續時間
    //         ease: "power2.inOut",
    //         yoyo: true,
    //         repeat: 2, // 快速來回三次
    //       })
    //       // 恢復原狀
    //       .to(jellyBox, {
    //         scaleX: 1,
    //         scaleY: 1,
    //         duration: 0.1,
    //         ease: "power2.out",
    //       });
    //   };

    //   // 設定每隔 3 秒觸發一次動畫
    //   const interval = setInterval(jellyEffect, 3000);

    //   // 確保組件卸載時清除計時器
    //   onUnmounted(() => {
    //     clearInterval(interval);
    //   });
    // }
  });


  useSeoMeta({ title: "現有試辦單位簡介 - 多元陪伴照顧服務計畫" });
</script>

<style scoped>
  .service-banner {
    padding: 30px 0 60px 0;
    /* background-color: rgb(209, 231, 221); */
  }

  .default-title {
    text-align: center;
    font-size: 52px;
    position: relative;
  }
  

  .service-banner p {
    text-align: center;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    line-height: 2;
    margin-bottom: 40px;
  }

  .service-banner a {
    background-color: #EC6717;
    color: #FBFBF3;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    width: 300px;
    margin: 0 auto;
    padding: 15px 10px;
    border-radius: 10px;
    transition: .3s;
  }

  .service-banner a span {
    letter-spacing: 2px;
  }

  .service-banner a span svg {
    width: 37px;
    height: 37px;
    fill: #FBFBF3;
  }
  .service-login-btn-temp {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px !important;
    padding: 10px 15px !important;
    background-color: #3D768A !important;
    color: #fff;
    font-size: 18px !important;
    border-radius: 10px;
    transition: .3s;
    text-align: left;
    line-height: 1.5;
  }
  .service-login-btn-temp:hover {
    background-color: #41BBBE !important;
  }
  .service-login-btn-temp.mobile {
    display: none;
    position: static;
    text-align: center;
    margin-bottom: 20px;
  }
  @media (max-width: 991px) {
    .default-title {
      font-size: 36px;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .service-banner {
      padding-bottom: 10px !important;
    }
    .service-banner p {
      width: 90%;
      margin-bottom: 0;
    }
    .service-login-btn-temp {
      display: none !important;
    }
    .service-login-btn-temp.mobile {
      display: block !important;
      font-size: 20px !important;
    }
  }
</style>