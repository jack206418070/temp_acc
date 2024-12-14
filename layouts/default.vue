<template>
   <div class="main-page-wrapper">
    <header-one></header-one>

    <main class="default-padding">
      <slot />
    </main>
    <footer-two></footer-two>
    <back-to-top></back-to-top>
  </div>
</template>

<script setup lang="ts"></script>

<style>
  .default-padding {
    padding-top: 129px;
  }
  @media (max-width: 991px) {
    .default-padding {
      padding-top: 113px;
    }
  }
</style>