<template>
  <ul class="navbar-nav align-items-lg-center ">
    <li class="d-block d-lg-none">
      <div class="logo">
        <nuxt-link href="/" class="d-block">
          <img :src="logo" alt="logo"/>
        </nuxt-link>
      </div>
    </li>
    <li
      v-for="menu in menu_data"
      :key="menu.id"
      :class="`nav-item ${menu.dropdown ? 'dropdown' :''} ${menu.mega_menu ? 'dropdown mega-dropdown-sm' : ''}`"
    >
      <template v-if="menu.dropdown">
        <a
          class="nav-link dropdown-toggle "
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {{ menu.title }}
        </a>
        <ul class="dropdown-menu">
          <li v-for="(dm, i) in menu.dropdown_menus" :key="i">
            <nuxt-link
              :href="dm.link"
              class="dropdown-item "
              :class="{ active: route.path === dm.link }"
            >
              <span>{{ dm.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </template>
      <template v-else-if="menu.mega_menu">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {{ menu.title }}
        </a>
        <ul class="dropdown-menu">
          <li class="row gx-1">
            <div v-for="mm in menu.mega_menus" :key="mm.id" class="col-lg-4">
              <div class="menu-column">
                <ul class="style-none mega-dropdown-list">
                  <li v-for="(sm, i) in mm.menus" :key="i">
                    <nuxt-link
                      :href="sm.link"
                      class="dropdown-item"
                      :class="{ active: route.path === sm.link }"
                    >
                      <span>{{ sm.title }}</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <nuxt-link class="nav-link mx-2 " :href="menu.link" role="button">
          {{ menu.title }}
        </nuxt-link>
      </template>
    </li>
    <li class="d-md-none ps-2 pe-2">
      <a
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
        class="signup-btn-one icon-link w-100 mt-20"
      >
        <span class="flex-fill text-center">Signup</span>
        <div
          class="icon rounded-circle d-flex align-items-center justify-content-center"
        >
          <i class="bi bi-arrow-right"></i>
        </div>
      </a>
      <ul class="style-none contact-info m0 pt-30">
        <li class="d-flex align-items-center p0 mt-15">
          <img src="/images/icon/icon_14.svg" alt="" class="lazy-img icon me-2"/>
          <a href="mailto:babuninc@company.com" class="fw-500">
            babuninc@company.com
          </a>
        </li>
        <li class="d-flex align-items-center p0 mt-15">
          <img src="/images/icon/icon_15.svg" alt="" class="lazy-img icon me-2"/>
          <a href="tel:+757 699-4478" class="fw-500">+757 699-4478</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import menu_data from "@/data/menu-data";
const route = useRoute();
withDefaults(defineProps<{logo?:string}>(),{
  logo: '/images/logo/logo_02.png'
})
</script>

<style  scoped>
.nav-link{
  font: 1rem;
}

@media screen(max-width: 1280px;) {
  .nav-link{
    font: 0.75rem;
  }
}
</style>