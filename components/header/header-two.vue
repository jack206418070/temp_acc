<template>
  <header :class="`theme-main-menu menu-overlay menu-style-one white-vr sticky-menu ${isSticky?'fixed':''}`">
    <div class="inner-content position-relative">
      <div class="top-header">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logo order-lg-0">
            <nuxt-link to="/" class="d-flex align-items-center">
              <img src="/images/logo/logo_01.svg" alt="" />
            </nuxt-link>
          </div>

          <!-- logo -->
          <div class="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
            
          </div>
          <!--/.right-widget-->
          <nav class="navbar navbar-expand-lg p0 order-lg-2">
            <button
              class="navbar-toggler d-block d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <header-nav-menus logo="/images/logo/logo_01.svg" />
            </div>
          </nav>
        </div>
      </div>
      <!--/.top-header-->
    </div>
  
  </header>
  
  <!-- login modal -->
	<popup-login/>
	<!-- login modal -->

</template>

<script setup lang="ts">
const { isSticky } = useSticky();
</script>
