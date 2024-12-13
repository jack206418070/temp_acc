<template>
  <ul class="navbar-nav align-items-lg-center  justify-content-between w-100">
    <template  
      v-for="menu in menu_data"
      :key="menu.id">
      <li
        :class="`nav-item ${menu.dropdown ? 'dropdown' :''} ${menu.mega_menu ? 'dropdown mega-dropdown-sm' : ''}`"
      >
        <template v-if="menu.dropdown">
          <a
            class="nav-link arrow-left"
            :href="menu.link ? menu.link : '#'"
            role="button"
            @click.prevent="handleClick(menu)"
          >
            {{ menu.title }}
          </a>
          <ul class="dropdown-menu" :class="{show: isActive(menu)}">
            <li class="dropdown" v-for="(dm, i) in menu.dropdown_menus" :key="i">
              <template v-if="dm.sub_dropdown && isTouchDevice">
                <a
                  class="nav-link arrow-left"
                  :href="dm.link ? dm.link : '#'"
                  role="button"
                  @click.prevent="handleClick(dm)"
                >
                  {{ dm.title }}
                </a>
              </template>
              <template v-else>
                <!-- <p>out</p> -->
                <nuxt-link
                  :href="dm.link"
                  class="dropdown-item"
                  :class="{ active: route.path === dm.link}"
                >
                  <span>{{ dm.title }}</span>
                </nuxt-link>
              </template>
              <ul class="dropdown-menu" :class="{show: isSubActive(dm)}">
                <li v-for="(sub, j) in dm.sub_menus" :key="j">
                  <nuxt-link :href="sub.link" class="dropdown-item" :class="{ active: route.path === sub.link }">
                    <span>{{ sub.title }}</span>
                  </nuxt-link>
                </li>
              </ul>
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
          <nuxt-link class="nav-link moblie-no-dropdown" :href="menu.link ? menu.link : '#'" role="button">
            {{ menu.title }}
          </nuxt-link>
        </template>
      </li>
      </template>
  </ul>
</template>

<script setup lang="ts">
import menu_data from "@/data/menu-data";
import { ref } from "vue";

const isTouchDevice = ref(false);
const activeMenu = ref<number | null>(null);
const activeSubMenu = ref<number | null>(null);

// 檢測是否為觸控設備
if (typeof window !== "undefined") {
  isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// 處理點擊事件（適用於手機版）
const handleClick = (menu: any) => {
  console.log(menu, isTouchDevice.value)
  if (isTouchDevice.value && menu.dropdown) {
    activeMenu.value = activeMenu.value === menu.id ? null : menu.id;
    return;
  }
  if (isTouchDevice.value && menu.sub_dropdown) {
    activeSubMenu.value = activeSubMenu.value === menu.sub_id ? null : menu.sub_id;
    return;
  }
};

// 檢查是否顯示 dropdown
const isActive = (menu: any) => activeMenu.value === menu.id;
const isSubActive = (menu: any) => activeSubMenu.value === menu.sub_id;


const route = useRoute();
withDefaults(defineProps<{logo?:string}>(),{
  logo: '/images/logo/logo_02.png'
})
</script>

<style  scoped>
.nav-link{
  font: 1rem;
}
.active {
  padding-left: 23px;
}

@media screen and (max-width: 1280px) {
  .nav-link {
    font-size: 0.75rem;
  }
}
@media screen and (max-width: 991px) {
  .navbar .navbar-nav .nav-link {
    padding-left: 40px;
  }
  .navbar-nav {
    padding-left: 50px;
  }
  .arrow-left::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border: solid #333;
    border-width: 0 0 2px 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
    left: 2%;
    top: 45%;
  }
  .moblie-no-dropdown {
    padding-left: 0 !important;
  }
  .dropdown-item {
    padding-left: 0 !important;
  }
  /* ul.dropdown-menu {
    padding-left: 10px;
  } */
}

</style>