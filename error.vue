<template>
  <div class="main-page-wrapper">
    <header-one></header-one>

    <main>
      <div class="error-page text-center d-flex align-items-center justify-content-center flex-column light-bg position-relative">
        <h1 class="font-magnita">{{ error.statusCode }}</h1>
        <h2 class="fw-bold">{{ error.message }}</h2>
        <p class="text-lg mb-45">Publishing industries for previewing layouts & visual mockups used.</p>
        <div><nuxt-link href="/" class="btn-four">Go Back</nuxt-link></div>
        <img src="/images/assets/ils_05.svg" alt="" class="lazy-img shapes shape_01">
        <img src="/images/assets/ils_06.svg" alt="" class="lazy-img shapes shape_02">
    </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Error - Babun" });
defineProps(["error"]);
</script>