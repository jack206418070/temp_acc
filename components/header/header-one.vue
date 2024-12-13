<template>
  <header
    class="theme-main-menu menu-style-two sticky-menu fixed"
  >
    <div class="main-container inner-content">
      <div class="top-header position-relative">
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <!-- Logo (電腦版第一，手機版第二) -->
          <div class="logo order-lg-0 order-2 w-25">
            <nuxt-link href="/" class="d-flex align-items-center">
              <img src="/images/logo/logo_2.png" alt="" />
            </nuxt-link>
          </div>

          <!-- Navigation (電腦版第二，手機版第一) -->
          <nav class="navbar navbar-expand-lg p0 order-lg-4 order-1 menu-block">
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
              <header-nav-menus />
            </div>
          </nav>
        
          <!-- 登入按鈕 (電腦版第三，手機版第三) -->
          <div class="d-flex align-items-center justify-content-between gap-mid order-lg-2 order-3">
            <div class="d-lg-flex align-items-center justify-content-end blog-sidebar d-none">
              <form action="#" class="d-flex sidebar-search">
                <span class="search-icon"><i class="bi bi-search"></i></span>
                <div class="close-block" v-if="search_text" @click="clearSearch">
                  <span class="close-btn">
                    <svg width="8" height="9" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.057 7.293.35 4 3.643.707.35 0 1.057 3.293 4.35 0 7.643l.707.707L4 5.057 7.293 8.35 8 7.643 4.707 4.35 8 1.057Z" fill="currentcolor"></path></svg>
                  </span>
                </div>
                <input v-model="search_text" type="text" placeholder="搜尋.." />
              </form>
            </div>
            <button class="login-btn d-flex align-items-center btn-one tran3s">
              <a class="" href="https://accompany-service-user.vercel.app/login" target="">登入/註冊</a>
            </button>
          </div>
          
          <!-- 搜尋欄 (電腦版與手機版響應處理，手機版獨佔100%寬度) -->
          <div class="d-lg-none align-items-center justify-content-end blog-sidebar d-flex order-4 w-100">
            <form action="#" class="d-flex sidebar-search">
              <span class="search-icon"><i class="bi bi-search"></i></span>
              <div class="close-block" v-if="search_text" @click="clearSearch">
                <span class="close-btn">
                  <svg width="8" height="9" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.057 7.293.35 4 3.643.707.35 0 1.057 3.293 4.35 0 7.643l.707.707L4 5.057 7.293 8.35 8 7.643 4.707 4.35 8 1.057Z" fill="currentcolor"></path></svg>
                </span>
              </div>
              <input v-model="search_text" type="text" placeholder="搜尋.." />
            </form>
          </div>
        </div>
        
      </div>
	  
      <!--/.top-header-->
    </div>
    <!-- /.inner-content -->
  </header>
  <!-- login modal -->
  <popup-login />
  <!-- login modal -->
</template>

<script setup lang="ts">
const { isSticky } = useSticky();
import { ref } from 'vue';

// 綁定 input 的值
const search_text = ref('');

// 清空搜索文字
const clearSearch = () => {
  search_text.value = '';
};
</script>

<style scoped>
.blog-sidebar .sidebar-search {
  height: 40px;
}
.menu-block {
  width: 100%;
}


@media (max-width: 991px) {
  .sidebar-search {
    margin-top: 10px;
    width: 100%; /* 手機版搜尋欄佔滿一排 */
  }
  .menu-block {
    width: auto;
  }
  .logo {
    width: 180px !important;
  }
}
</style>
