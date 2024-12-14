<template>
   <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>


<script lang="ts" setup>
onMounted(async () => {
	const wow = await import('wow.js')
	new wow.default().init()
})
</script>

<style>
/* 對淡入（enter）和淡出（leave）分別設置動畫時間 */
.page-enter-active {
  transition: opacity 1.5s ease-in; /* 淡入效果較慢 */
}
.page-leave-active {
  transition: opacity 0.2s ease-out; /* 淡出效果較快 */
}
.page-enter {
  opacity: 0; /* 起始狀態為透明 */
}
.page-leave-to {
  opacity: 0; /* 結束狀態為透明 */
}
</style>