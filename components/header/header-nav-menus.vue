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
            class="nav-link"
            style="display: flex; gap: 20px"
            :class="{'arrow-left': isTouchDevice, 'rotated': isActive(menu)}"
            :href="menu.link ? menu.link : '#'"
            role="button"
            @click.prevent="handleClick(menu)"
          >
            <span v-if="isTouchDevice" :class="{'rotated': isActive(menu)}"
            ><i class="bi bi-chevron-down"></i></span>
            {{ menu.title }}
          </a>
          <ul class="dropdown-menu" :class="{show: isActive(menu)}">
            <li class="dropdown" v-for="(dm, i) in menu.dropdown_menus" :key="i">
              <template v-if="dm.sub_dropdown">
                <div v-if="!isTouchDevice">
                  <nuxt-link
                    :href="dm.link"
                    class="dropdown-item"
                    :class="{ active: route.path === dm.link, hightlight: dm.is_highlight }"
                    @click="closeMenu"
                  >
                    <span>{{ dm.title }}</span>
                  </nuxt-link>
                </div>
                <div v-else>
                  <p class="d-none">in</p>
                  <a
                    class="nav-link"
                    style="display: flex; gap: 30px"
                    href="javascript:;"
                    role="button"
                    @click.prevent="closeMenu('subMenu', dm.link)"
                  >
                  <span v-if="isTouchDevice" :class="{'rotated': isSubActive(dm)}"
                    @click.stop="handleClick(dm)"
                  ><i class="bi bi-chevron-down"></i></span>
                    {{ dm.title }}
                  </a>
                </div>
                <ul style="padding-left: 20px;" class="dropdown-menu" :class="{show: isSubActive(dm) || !isTouchDevice}">
                  <li v-for="(sub, j) in dm.sub_menus" :key="j">
                    <template v-if="sub.title != '就業服務法' && sub.title != '藍領審查標準' && sub.title != '外國人轉換原則'">
                      <nuxt-link :href="sub.link" class="dropdown-item" :class="{ active: route.path === sub.link }" @click="closeMenu">
                        <span>{{ sub.title }}</span>
                      </nuxt-link>
                    </template>
                    <template v-else>
                      <a :href="sub.link" class="dropdown-item" :class="{ active: route.path === sub.link }" @click="closeMenu" target="_blank">
                        <span>{{ sub.title }}</span>
                      </a>
                    </template>
                  </li>
                </ul>
              </template>
              <template v-else>
                <!-- <p>out</p> -->
                <nuxt-link
                  :href="dm.link"
                  class="dropdown-item"
                  :class="{ active: route.path === dm.link,  highlight: dm.is_highlight }"
                  @click="closeMenu"
                >
                  <span>{{ dm.title }}</span>
                </nuxt-link>
              </template>
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
                        @click="closeMenu"
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
          <template v-if="menu.title == '首頁'">
            <nuxt-link class="nav-link moblie-no-dropdown" :href="menu.link ? menu.link : '#'" role="button" @click="closeMenu" v-if="!isTouchDevice">
              {{ menu.title }}
            </nuxt-link>
          </template>
          <template v-else>
            <nuxt-link class="nav-link moblie-no-dropdown" :href="menu.link ? menu.link : '#'" role="button" @click="closeMenu">
              {{ menu.title }}
            </nuxt-link>
          </template>
        </template>
      </li>
      </template>
  </ul>
</template>

<script setup lang="ts">
import menu_data from "@/data/menu-data";
import { ref, onMounted, defineEmits } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter(); // 獲取路由對象
const isTouchDevice = ref(false);
const activeMenu = ref<number | null>(null);
const activeSubMenu = ref<number | null>(null);
const emit = defineEmits(['update-overflow']);
const updateIsTouchDevice = () => {
  isTouchDevice.value = window.matchMedia("(max-width: 991px)").matches;
};

onMounted(() => {
  // 初次檢測
  updateIsTouchDevice();

  // 監聽視窗大小變化
  window.addEventListener("resize", updateIsTouchDevice);
});

onUnmounted(() => {
  // 移除監聽器
  window.removeEventListener("resize", updateIsTouchDevice);
});

// 處理點擊事件（適用於手機版）
const handleClick = (menu: any) => {
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

const closeMenu = (type = '', link=null) => {
  emit('update-overflow', false);
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navbarCollapse.classList.remove('show'); // 移除 Bootstrap 的 .show 類別
  }
  if (type == 'subMenu' && link) {
    router.push(link);
  }
};
</script>

<style  scoped>
.nav-link{
  font: 1rem;
}
.active {
  padding-left: 23px;
}

/* .highlight {
  background-color: rgb(120, 138, 116) !important;
  color: #fff !important;
  border-radius: 30px;
  text-align: center;
} */
.theme-main-menu .nav-item .nav-link{
  color: #fff !important;
}
.navbar .dropdown-menu {
  background-color: rgb(251, 250, 247);
}
@media screen and (max-width: 1280px) {
  .nav-link {
    font-size: calc(0.75rem + 2px);
  }
}
@media screen and (max-width: 991px) {
  .dropdown-menu {
    display: none;
  }
  .navbar .dropdown-menu {
    background-color: #EDF1EE;
  }
  .theme-main-menu .nav-item .nav-link {
    color: rgb(43,39,22) !important;
  }
  .navbar .navbar-nav .nav-link {
    /* padding-left: 40px; */
    padding-left: 0;
  }
  span {
    transition: transform 0.3s ease;
    transform-origin: center;
    display: inline-block;
  }
  span.rotated {
    transform: rotate(-180deg);
  }
  .navbar-nav {
    padding-left: 50px;
  }
  .navbar .dropdown-menu .dropdown-item span:before {
    width: 0;
  }
  .moblie-no-dropdown {
    padding-left: 0 !important;
  }
  .dropdown-item {
    padding-left: 0 !important;
  }
}

</style>