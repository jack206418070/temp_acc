<template>
  <div class="blog-section-six position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
    <div class="container">
      <div class="row gx-xl-5">
        <div class="col-lg-8">
          <template v-for="blog in blog_items.slice(startIndex, endIndex)" :key="blog.id">
            <span class="badge bg-secondary m-2 fs-5">{{ blog.catalog }}</span>


          <article v-if="!blog.quote_blog" class="blog-meta-two style-two mb-50 lg-mb-40">
            <figure
              class="post-img position-relative d-flex align-items-end m0"
              :style="`background-image: url(${blog.img});`"
            >
              <nuxt-link :href="`/news/${blog.id}`" class="stretched-link date tran3s">
                {{blog.date.split[0]}} {{blog.date.split[1]}}
              </nuxt-link>
            </figure>
            <div class="post-data">
              <div class="post-info">{{blog.post_info}}</div>
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <nuxt-link :href="`/news/${blog.id}`" class="blog-title">
                  <h4>{{blog.title}}</h4>
                </nuxt-link>
                <nuxt-link :href="`/news/${blog.id}`" class="round-btn rounded-circle d-flex align-items-center justify-content-center tran3s">
                  <i class="bi bi-arrow-up-right"></i>
               </nuxt-link>
              </div>
            </div>
          </article>

           <article v-if="blog.quote_blog" class="blog-meta-four mb-50 lg-mb-40">
              <div class="post-data">
                  <div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                    <img src="/images/icon/icon_93.svg" alt="icon" class="lazy-img">
                  </div>
                  <nuxt-link :href="`/news/${blog.id}`" class="blog-title">
                    <h4>{{blog.title}}</h4>
                  </nuxt-link>
              </div>
              <h6 class="post-info">{{blog.author}}. <span>{{blog.designation}}</span></h6>
          </article>
          </template>

          <div class="pagination-one mt-80 lg-mt-50">
            <pagination
              :items-per-page="4"
              :data="blog_items"
              @handle-paginate="handlePagination"
            />
          </div>
          <!-- /.pagination-one -->
        </div>

        <div class="col-lg-4 col-md-8">
          <!-- blog-sidebar -->
          <blog-sidebar></blog-sidebar>
          <!-- /.blog-sidebar -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import newsData from "@/data/news-data";
import { type IBlog } from "@/types/blog-d-t";

// blog items
const blog_items = newsData.filter((b) => b.page === "news-list");
let filteredProductsItems = ref<IBlog[]>(blog_items);
let startIndex = ref<number>(0);
let endIndex = ref<number>(blog_items.length);

const handlePagination = (data: IBlog[], start: number, end: number) => {
  filteredProductsItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>
