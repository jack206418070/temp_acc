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
