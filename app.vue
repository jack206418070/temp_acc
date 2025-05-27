<template>
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LRLKWQD"
              height="0" width="0" style="display:none;visibility:hidden">
      </iframe>
    </noscript>
   <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'

let wowInstance: any = null

onMounted(() => {
  if (process.client) {
    import('wow.js').then((wow) => {
      wowInstance = new wow.default()
      wowInstance.init()
    }).catch(error => {
      console.error('Failed to load wow.js:', error)
    })
  }
})

onBeforeUnmount(() => {
  if (wowInstance) {
    // 清理 wow.js 實例（如果有清理方法的話）
    wowInstance = null
  }
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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>