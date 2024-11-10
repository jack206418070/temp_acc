<template>
   <div class="blog-sidebar md-mt-60 ps-xxl-4">
   
      <!-- /.blog-category -->
      <div class="blog-recent-news lg-mt-40">
          <h3 class="sidebar-title">過去消息</h3>
          <article v-for="(b) in recent_blogs" :key="b.id" class="recent-news">
              <figure class="post-img" :style="`background-image: url(${b.img});`">
              </figure>
              <div class="post-data">
                  <div class="date">{{b.date}}</div>
                  <nuxt-link :href="`/blog-details/${b.id}`" class="blog-title">
                    <h3>{{b.title}}</h3>
                 </nuxt-link>
              </div>
          </article>
      </div>
      <!-- /.blog-recent-news -->

      <div class="contact-banner text-center mt-50 lg-mt-30">
        <h3 class="mb-20">有任何問題嗎？ <br>和我們聯絡</h3>
        <nuxt-link href="/contact" class="tran3s fw-500">和我們聯絡</nuxt-link>
      </div>
			<!-- /.contact-banner -->
    </div>
</template>

<script setup lang="ts">
import news_data from "@/data/news-data";

const recent_blogs = news_data.filter((b) => b.page === "news-list").slice(-2);
</script>