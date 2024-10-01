<template>
 <div class="inner-banner-two light-bg text-center pt-200 md-pt-150 pb-85 lg-pb-50 position-relative">
      <div class="container position-relative">
          <div class="row">
              <div :class="`${col} m-auto`">
                  <ul class="style-none d-inline-flex justify-content-center pager">
                      <li><nuxt-link href="/">Home</nuxt-link></li>
                      <li>/</li>
                      <li v-if="!style_2"><a href="#">Pages</a></li>
                      <li v-if="!style_2">/</li>
                      <li>{{page}}</li>
                  </ul>
                  <h1 class="hero-heading">{{title}}</h1>
                  <p class="text-lg">{{subtitle}}</p>
              </div>
          </div>
      </div>
      <img src="/images/assets/ils_01.svg" alt="" class="lazy-img shapes shape_01">
      <img src="/images/assets/ils_02.svg" alt="" class="lazy-img shapes shape_02">
      <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_03">
      <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_04">
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{page:string;title:string;subtitle:string;col?:string;style_2?:boolean}>(),{
    col:"col-xl-6",
    style_2:false
})
</script>