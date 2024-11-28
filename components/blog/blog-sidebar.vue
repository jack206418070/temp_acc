<template>
   <div class="blog-sidebar md-mt-60 ps-xxl-4">
   
    <div class="blog-category mt-60 lg-mt-40 pb-40">
          <h3 class="sidebar-title">分類</h3>
          <ul class="style-none">
              <li><a href="#"> <span>公告(1)</span></a></li>
              <li><a href="#">新聞稿 <span>(1)</span></a></li>
              <li><a href="#">新聞報導 <span>(1)</span></a></li>
              <li><a href="#">使用心得分享 <span>(1)</span></a></li>
            
          </ul>
      </div>
      <!-- /.blog-category -->
      <div class="blog-recent-news lg-mt-40">
          <h3 class="sidebar-title">過去消息</h3>
          <article v-for="(b) in recent_blogs" :key="b.id" class="recent-news">
              
              <div class="post-data">
                  <div class="date">{{b.date}}</div>
                  <nuxt-link :href="`/blog-details/${b.id}`" class="blog-title">
                    <h3>{{b.title}}</h3>
                 </nuxt-link>
              </div>
          </article>
      </div>
      <!-- /.blog-recent-news -->

    </div>
</template>

<script setup lang="ts">
import news_data from "@/data/news-data";

const recent_blogs = news_data.filter((b) => b.page === "news-list").slice(-2);
</script>