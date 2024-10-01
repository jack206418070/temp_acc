<template>
  <div
    class="inner-banner-one pt-225 lg-pt-200 md-pt-150 pb-100 md-pb-70 position-relative"
    :style="`background-image: url(${bg_img})`"
  >
    <div class="container position-relative">
      <div v-if="!style_2" class="row align-items-center">
        <div class="col-lg-7">
          <h1 class="hero-heading d-inline-block position-relative">
            {{ title }}
            <img :src="shape" alt="" />
          </h1>
        </div>
        <div class="col-xl-4 col-lg-5 ms-auto">
          <p class="text-white text-lg mb-70 lg-mb-40">
            {{ subtitle }}
          </p>
          <ul class="style-none d-inline-flex pager">
            <li><nuxt-link href="/">首頁</nuxt-link></li>
            <li>/</li>
            <li>{{page}}</li>
          </ul>
        </div>
      </div>
      <div v-if="style_2" class="row align-items-center">
        <div class="col-lg-6">
          <h1 :class="`hero-heading d-inline-block position-relative ${cls}`">
            {{title}} <img :src="shape" alt="" />
          </h1>
        </div>
        <div class="col-xl-4 col-lg-5 ms-auto">
          <p class="text-white text-lg mb-70 lg-mb-40">
            {{subtitle}}
          </p>
          <ul class="style-none d-inline-flex pager">
            <li>
              <nuxt-link href="/">首頁</nuxt-link>
            </li>
            <li>/</li>
            <li>{{page}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle: string;
    bg_img?: string;
    shape: string;
    page: string;
    cls?: string;
    style_2?: boolean;
  }>(),
  {
    title: "",
    subtitle: "",
    bg_img: "/images/media/img_26.jpg",
    shape: "/images/shape/shape_33.svg",
    page: "",
    cls: "",
    style_2: false,
  }
);
</script>
