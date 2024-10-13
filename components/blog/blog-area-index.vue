<template>
  <div class="blog-section-one position-relative mt-150 lg-mt-80 pt-120 lg-pt-80">
    <div class="container">
      <div class="position-relative">
        <div class="title-one mb-20 lg-mb-10">
          <h2>最新消息</h2>
        </div>
        <!-- /.title-one -->
        <p class="text-lg mb-40 lg-mb-10">來看看最新消息</p>

        <div class="row gx-xxl-5">
          <div v-for="(item) in blog_items" :key="item.id" class="col-md-6">
            <article class="blog-meta-one mt-35 sm-mt-30 wow fadeInUp" :data-wow-delay="`0.${item.id}s`">
              <div class="post-data">
                <div class="post-info">
                  <span class="fw-500 text-dark">{{item.author}} -</span> {{item.date}}
                </div>
                <nuxt-link :href="`/blog-details/${item.id}`" class="mt-15">
                  <h4 class="tran3s blog-title">{{item.title}}</h4>
                </nuxt-link>
              </div>
              <figure class="post-img position-relative d-flex justify-content-end align-items-end m0" :style="`background-image: url(${item.img});`">
                <nuxt-link :href="`/blog-details/${item.id}`" class="round-btn stretched-link rounded-circle d-flex align-items-center justify-content-center tran3s">
                  <i class="bi bi-arrow-up-right"></i>
                </nuxt-link>
              </figure>
            </article>
            <!-- /.blog-meta-one -->
          </div>
        </div>

        <div class="section-btn sm-mt-40">
          <nuxt-link href="/blog" class="btn-five icon-link">
            <span class="text">閱讀更多</span>
            <div class="icon tran3s rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-arrow-up-right"></i>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import blog_data from '@/data/blog-data';

const blog_items = [...blog_data].filter(b => b.page === 'home');
</script>
