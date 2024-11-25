<template>
 <div class="footer-one">
    <div class="container">
      <div class="inner-wrapper">
        <div class="row justify-content-between">
          <div class="col-xl-4 col-md-3 footer-intro mb-30">
            <div class="logo mb-15">
              <nuxt-link href="/" class="d-inline-block d-lg-none">
                <img src="/images/logo/logo_01.png" alt="">
              </nuxt-link>
            </div> 
            <!-- logo -->
            <p class="text-white lh-sm mb-35">勞動部勞動力發展署<br> 24219 新北市新莊區中平路439號南棟4樓 <br> (02)8995-6000 <br>服務時間：週一至週五 08:30~12:30，13:30~17:30 </p>
            <p class="text-white lh-sm mb-35">多元陪伴照顧服務專案辦公室 <br>臺北市內湖區內湖路一段427號2樓 <br> (02)77562580 <br>週一至週五08:30~17:30</p>
            <ul class="style-none d-flex align-items-center social-icon">
              <li><a href="#"><i class="bi bi-facebook"></i></a></li>
              <li><a href="#"><i class="bi bi-dribbble"></i></a></li>
              <li><a href="#"><i class="bi bi-instagram"></i></a></li>
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/">首頁</nuxt-link></li>
              <li><nuxt-link href="/about-us">計畫介紹</nuxt-link></li>
              <li><nuxt-link href="/news">最新消息</nuxt-link></li>
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/services">我想預約服務</nuxt-link></li>
              <li><nuxt-link href="/join-us-unit">我想成為試辦單位</nuxt-link></li>
             
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/faq">常見問題</nuxt-link></li>
              <li><nuxt-link href="/contact">聯絡我們</nuxt-link></li>
              <li><nuxt-link href="/link">相關連結</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div> <!-- /.inner-wrapper -->
    </div>
    <div class="container">
      <div class="bottom-footer">
        <div class="row align-items-center">
          <div class="col-lg-5 order-lg-last mb-15">
            
          </div>
          <div class="col-lg-7 order-lg-first mb-15">
            
              <div class="copyright me-xl-4 lg-mt-10 order-lg-first">Copyright @{{new Date().getFullYear()}} 勞動力發展署版權所有，保留所有權利。</div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.bottom-footer -->
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
