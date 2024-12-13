<template>
  <ul class="navbar-nav align-items-lg-center  justify-content-between w-100">
    <template  
      v-for="menu in menu_data"
      :key="menu.id">
      <li
        v-if="menu.title != '首頁'"
        :class="`nav-item ${menu.dropdown ? 'dropdown' :''} ${menu.mega_menu ? 'dropdown mega-dropdown-sm' : ''}`"
      >
        <template v-if="menu.dropdown">
          <a
            class="nav-link dropdown-toggle "
            :href="menu.link ? menu.link : '#'"
            role="button"
            
          >
            {{ menu.title }}
          </a>
          <ul class="dropdown-menu">
            <li class="dropdown" v-for="(dm, i) in menu.dropdown_menus" :key="i">
              <nuxt-link
                :href="dm.link"
                class="dropdown-item"
                :class="{ active: route.path === dm.link }"
              >
                <span>{{ dm.title }}</span>
              </nuxt-link>
              <ul class="dropdown-menu" v-if="dm.sub_menus && dm.sub_menus.length">
                <li v-for="(sub, j) in dm.sub_menus" :key="j">
                  <nuxt-link :href="sub.link" class="dropdown-item">
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
          <nuxt-link class="nav-link mx-2 " :href="menu.link ? menu.link : '#'" role="button">
            {{ menu.title }}
          </nuxt-link>
        </template>
      </li>
      </template>
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

@media screen and (max-width: 1280px) {
  .nav-link {
    font-size: 0.75rem;
  }
}

</style>