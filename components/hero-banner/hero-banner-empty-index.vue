<template>
  <div class="home-banner">
    <div class="main-container home-bg"></div>
  </div>
	
</template>

<script setup lang="ts">

</script>
<style scoped>
.home-banner {
  background-color: #41BBBE;
}
.home-bg {
  background-image: url(/images/assets/banner0109.avif);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 302px;
}
@media (max-width: 991px) {
  .home-banner {
    padding: 0 15px;
  }
  .home-bg {
    height: 202px;
  }
}
</style>