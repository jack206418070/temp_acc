<template>
  <!-- text feature area start -->
  <div class="join-block">
    <h2 class="default-title">如何成為試辦單位</h2>
    <div class="line-wrapper position-relative">
      <div class="row align-items-center">
        <div class="col-lg-12 wow fadeInLeft">
          <h3 class="join-title">申請資格</h3>
          
          <ol class="ch-main-list join-method-list">
            <li>依法設立或登記滿五年之財團法人或非營利社團法人。</li>
            <li>
              若規畫委任私立就業服務機構，辦理外籍陪伴照顧工作者之招募、聘僱管理等事宜者，受委任之私立就業服務機構必須符合下列資格：
            </li>
            <ol class="ch-sub-list">
              <li>
                於申請日前五年內，評鑑成績依規定均屬於A級及績優免評鑑者。
              </li>
              <li>
                於申請日前二年受雇主委任引進或聘僱之外國人，佔該機構當年總引進或聘僱外國人人數二分之一以上。
              </li>
              <li>
                於申請日前二年，無違反就業服務法相關法規看護工及家庭幫傭。
              </li>
            </ol>
          </ol>

          <p class="title-p">
            →如須瞭解符合以上資格之私立就業服務機構業者之資訊，可洽詢<a href="/contact">本計畫專案辦公室</a>。
          </p>

          <h3 class="join-title">評選流程</h3>
          <p class="title-p">
            有意願且符合資格的單位須在勞動部公告受理期間內自行提出申請表、申請計畫書及檢附相關文件，經勞動部召開評選會議評選合格，再由勞動部視政策需要進行核定後，始得成為本計畫之試辦單位。
          </p>

          <ul class="join-method-list">
            <li>組織公益性及績優事蹟（20分）</li>
            <li>服務內容及費用標準（15分）</li>
            <li>組織專業性（15分）</li>
            <li>服務品質確保機制（15分）</li>
            <li>外國籍陪伴照顧服務工作者聘僱管理及訓練、後援規畫（15分）</li>
            <li>創新作為（20分）</li>
          </ul>
          <div id="jelly-box" class="jelly-box">
            <h4 class="join-title" style="letter-spacing: 1.3px;">歡迎點閱，瞭解更多</h4>
            <ul class="join-method-list">
              <li><a href="/conduct-plan">多元陪伴照顧服務試辦計畫</a></li>
              <li>試辦單位評選程序</li>
            </ul>
          </div>
          <p class="title-p">
            →如須進一步瞭解如何成為試辦單位之資訊，可洽詢本計畫<a href="/contact">本計畫專案辦公室</a>。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  const jellyBox = document.getElementById("jelly-box");

  if (jellyBox) {
    // 定義動畫函數
    const jellyEffect = () => {
      gsap.fromTo(
        jellyBox,
        { scaleX: 1, scaleY: 1 },
        {
          scaleX: 1.10,
          scaleY: 0.9,
          duration: 0.3,
          ease: "back.out(1.7)",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(jellyBox, {
              scaleX: 1,
              scaleY: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          },
        }
      );
    };

    // 設定每隔 3 秒觸發一次動畫
    const interval = setInterval(jellyEffect, 3000);

    // 確保組件卸載時清除計時器
    onUnmounted(() => {
      clearInterval(interval);
    });
  }
});

const service_data = [
  {
    id: 1,
    icon: "/images/icon/icon_06.svg",
    title: "居家照顧服務",
    desc: "提供專業的居家照顧,包括生活照顧、健康促進等,讓長者在熟悉的環境中獲得妥善照顧。",
  },
  {
    id: 2,
    icon: "/images/icon/icon_07.svg",
    title: "日間照顧中心",
    desc: "提供日間照顧服務,包括生活照顧、健康促進、文康休閒活動等,減輕家庭照顧負擔。",
  },
  {
    id: 3,
    icon: "/images/icon/icon_08.svg",
    title: "喘息服務",
    desc: "提供短期照顧服務,讓家庭照顧者有休息的機會,維持身心健康和照顧品質。",
  },
];

const showModal = ref(false);
</script>

<style scoped>
.ch-main-list{
  list-style:cjk-ideographic;
}
.default-title {
  margin-top: 60px;
  font-size: 50px;
  margin-bottom: 0px;
}
.join-title {
  font-size: 27px;
  color: #000;
  font-weight: 400;
  padding: 40px 0 15px 0;
}
.join-method-list {
  font-size: 18px;
}
.join-method-list li {
  color: #000;
  margin-bottom: 8px;
  font-weight: 300;
}
.join-block .title-p{
  font-size: 18px;
  color: #000;
  font-weight: 300;
}
.join-block .title-p a {
  text-decoration: underline;
}
.bouce-block {
  margin-bottom: 40px;
}
.join-method-list a {
  text-decoration: underline;
  color: #000;
}
#jelly-box:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-out;
}
@media (max-width: 991px) {
  .join-method-list {
    font-size: 20px;
  }
  .join-block .title-p {
    font-size: 20px;
  }
  .default-title {
    font-size: 34px;
    margin-top: 40px;
  }
  .ch-main-list {
    padding-left: 40px;
    padding-right: 0;
  }
}

</style>
