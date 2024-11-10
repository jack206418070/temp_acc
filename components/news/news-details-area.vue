<template>
  <div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
    <div class="container">
      <div class="row gx-xl-5">
        <div class="col-lg-12">
          <article class="blog-meta-two style-two">
            <figure
              class="post-img position-relative d-flex align-items-end m0"
              style="background-image: url(/images/blog/blog_img_08.jpg)"
            >
              <div class="date">{{blog.date}}</div>
            </figure>
            <div class="post-data">
              <div class="post-info">{{blog.post_info}}</div>
              <div class="blog-title">
                <h4>{{blog.title}}</h4>
              </div>
              <div class="post-details-meta">
                <p>
                  {{ blog.content }}
                </p>
               
                
              </div>
              
            </div>
            <!-- /.post-data -->
          </article>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IBlog } from "@/types/blog-d-t";

defineProps<{blog:IBlog}>();
</script>
