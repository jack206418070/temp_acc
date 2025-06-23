<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="標題"
      subtitle="Meet our experts, guiding you through financial intricacies with precision"
      page="Blog"
      bg_img="/images/media/img_32.jpg"
      shape="/images/shape/shape_35.svg"
      
    />
    <!-- breadcrumb area end -->

    <!-- blog details area start -->
    <news-details-area v-if="blog" :blog="blog" />
    <!-- blog details area end -->

  </div>
</template>

<script setup lang="ts">
import blog_data from "@/data/news-data";

useSeoMeta({ title: "Blog Details - Babun" });
const route = useRoute();
const router = useRouter();
const blog = blog_data.find((b) => b.id === Number(route.params.id));
if (!blog) {
  await navigateTo("/notfound", { replace: true });
}
</script>
