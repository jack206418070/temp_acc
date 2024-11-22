<template>
  <div :class="`footer-two ${bg?'':'no-bg'}`">
    <div class="container">
      <div class="bg-wrapper position-relative">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-xl-3 col-lg-4 footer-intro mb-30">
              <div class="logo mb-35 md-mb-20">
                <nuxt-link href="/">
                  <img src="/images/logo/logo_2.png" alt="">
                </nuxt-link>
              </div> 
              <!-- logo -->
              <p class="lh-sm mb-40 md-mb-20">2190 Urban Terrace, Mirpur,  link Licensed in 50 states.</p>
              <ul class="style-none d-flex align-items-center social-icon">
                <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                <li><a href="#"><i class="bi bi-dribbble"></i></a></li>
                <li><a href="#"><i class="bi bi-instagram"></i></a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-sm-4 mb-20">
              <h5 class="footer-title">Links</h5>
              <ul class="footer-nav-link style-none">
                <li><nuxt-link href="/">首頁</nuxt-link></li>
                <li><nuxt-link href="/about-us">計畫介紹</nuxt-link></li>
                <li><nuxt-link href="/services">服務介紹</nuxt-link></li>
                <li><nuxt-link href="/project-v1">Portfolio</nuxt-link></li>
                <li><nuxt-link href="/blog">Careers</nuxt-link></li>
                <li><nuxt-link href="/service-v2">Features</nuxt-link></li>
              </ul>
            </div>
            <div class="col-lg-2 col-sm-4 mb-20">
              <h5 class="footer-title">Company</h5>
              <ul class="footer-nav-link style-none">
                <li><nuxt-link href="/about-us">About us</nuxt-link></li>
                <li><nuxt-link href="/blog">Blogs</nuxt-link></li>
                <li><nuxt-link href="/faq">FAQ’s</nuxt-link></li>
                <li><nuxt-link href="/contact">Contact</nuxt-link></li>
              </ul>
            </div>
            <div class="col-xxl-2 col-lg-3 col-sm-4 mb-20">
              <h5 class="footer-title">Support</h5>
              <ul class="footer-nav-link style-none">
                <li><nuxt-link href="/contact">Terms of use</nuxt-link></li>
                <li><nuxt-link href="/contact">Terms & conditions</nuxt-link></li>
                <li><nuxt-link href="/contact">Privacy</nuxt-link></li>
                <li><nuxt-link href="/contact">Cookie policy</nuxt-link></li>
                <li><nuxt-link href="/contact">Self-service</nuxt-link></li>
              </ul>
            </div>
          </div>
          <div class="copyright text-center">Copyright @2023 babun inc.</div>
        </div>
        <img src="/images/shape/shape_06.svg" alt="shape" class="lazy-img shapes shape_01">
        <img src="/images/shape/shape_06.svg" alt="shape" class="lazy-img shapes shape_02">
      </div>
      <!-- /.bg-wrapper -->
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{bg?:boolean}>(),{
  bg: true
})
</script>
