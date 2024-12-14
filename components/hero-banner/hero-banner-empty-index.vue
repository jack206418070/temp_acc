<template>
  <div class="home-banner">
    <div class="main-container home-bg"></div>
  </div>
	
</template>

<script setup lang="ts">

</script>
<style scoped>
.home-banner {
  background-color: rgb(120, 138, 116);
}
.home-bg {
  background-image: url(/images/assets/banner.avif);
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