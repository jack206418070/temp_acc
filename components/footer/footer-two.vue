<template>
 <div class="footer-one">
    <div class="container">
      <div class="inner-wrapper">
        <div class="row justify-content-between">
          <div class="col-xl-4 col-md-3 footer-intro mb-30">
            <div class="logo mb-15">
              <nuxt-link href="/" class="d-inline-block d-lg-none">
                <img src="/images/logo/logo_01.svg" alt="">
              </nuxt-link>
            </div> 
            <!-- logo -->
            <p class="text-white lh-sm mb-35">Top-rated <span class="opacity-50">business <br> consultancy for your success</span></p>
            <ul class="style-none d-flex align-items-center social-icon">
              <li><a href="#"><i class="bi bi-facebook"></i></a></li>
              <li><a href="#"><i class="bi bi-dribbble"></i></a></li>
              <li><a href="#"><i class="bi bi-instagram"></i></a></li>
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title">Links</h5>
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/">Home</nuxt-link></li>
              <li><nuxt-link href="/pricing">Pricing Plan</nuxt-link></li>
              <li><nuxt-link href="/about-us">About us</nuxt-link></li>
              <li><nuxt-link href="/service-v1">Our services</nuxt-link></li>
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title">Company</h5>
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/about-us">About us</nuxt-link></li>
              <li><nuxt-link href="/blog">Blogs</nuxt-link></li>
              <li><nuxt-link href="/faq">FAQ’s</nuxt-link></li>
              <li><nuxt-link href="/contact">Contact</nuxt-link></li>
            </ul>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-4 mb-20">
            <h5 class="footer-title">Support</h5>
            <ul class="footer-nav-link style-none">
              <li><nuxt-link href="/contact">Terms of use</nuxt-link></li>
              <li><nuxt-link href="/contact">Terms & conditions</nuxt-link></li>
              <li><nuxt-link href="/contact">Privacy</nuxt-link></li>
              <li><nuxt-link href="/contact">Cookie policy</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div> <!-- /.inner-wrapper -->
    </div>
    <div class="container">
      <div class="bottom-footer">
        <div class="row align-items-center">
          <div class="col-lg-5 order-lg-last mb-15">
            <div class="footer-newsletter float-xl-end">
              <h5 class="footer-title">Subscribe Newsletter</h5>
              <form action="#">
                <input type="email" placeholder="Enter your email address">
                <button><i class="bi bi-arrow-right"></i></button>
              </form>
            </div>
          </div>
          <div class="col-lg-7 order-lg-first mb-15">
            <nuxt-link href="/" class="d-none d-lg-inline-block mb-25">
              <img src="/images/logo/logo_01.svg" alt="">
            </nuxt-link>
            <div class="d-xl-flex align-items-center">
              <ul class="style-none bottom-nav d-flex flex-wrap justify-content-center justify-content-lg-start order-lg-last">
                <li><a href="">Privacy & Terms</a></li>
                <li><a href="">Cookies</a></li>
                <li><a href="">Contact Us</a></li>
              </ul>
              <div class="copyright me-xl-4 lg-mt-10 order-lg-first">Copyright @{{new Date().getFullYear()}} babun inc.</div>
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
