<template>
 <div class="footer-one">
    <div class="main-container">
      <div class="footer-content">
        <div class="footer-info">
          <p>勞動部勞動力發展署<br> 地址：24219新北市新莊區中平路439號南棟4樓 <br> 電話：1955 <br>服務時間：全年無休 </p>
          <div class="footer-line"></div>
          <p>多元陪伴照顧服務專案辦公室 <br>地址：114004臺北市內湖區內湖路一段427號2樓 <br> 電話：(02)7756-2580 <br>服務時間：週一至週五上午8時30分至12時30分，下午1時30分至5時30分</p>
        </div>
        <ul class="footer-link">
          <li><nuxt-link href="/">首頁</nuxt-link></li>
          <li><nuxt-link href="/about-us">計畫簡介</nuxt-link></li>
          <li><nuxt-link href="/news">最新消息</nuxt-link></li>
          <li><nuxt-link href="/services">預約服務</nuxt-link></li>
          <li><nuxt-link href="/join-us-unit">試辦單位</nuxt-link></li>
          <li><nuxt-link href="/faq">常見問題</nuxt-link></li>
          <li><nuxt-link href="/contact">聯絡我們</nuxt-link></li>
          <li><nuxt-link href="/links">相關網站連結</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="main-container">
      <div class="bottom-footer">
        <div class="copyright">Copyright @{{new Date().getFullYear()}} 勞動力發展署版權所有，保留所有權利。</div>
      </div>
      <!-- /.bottom-footer -->
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
