<template>
  <div class="portfolio-block-one mb-60 lg-mb-40">
    <div class="img-holder round-border">
      <img :src="item.img" alt="" class="img-meta w-100 tran5s" />
      <a
        @click.prevent="handleShowImage(index)"
        class="fancybox expend d-flex align-items-center justify-content-center tran3s"
        title="Click for large view"
        href="#"
        tabindex="0"
        ><i class="bi bi-plus"></i
      ></a>
    </div>
    <div class="caption">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <ul class="style-none d-flex tag">
            <li v-for="(tag, i) in item.tags" :key="i">{{ tag }}</li>
          </ul>
          <h6>
            <nuxt-link href="/project-details-v1" class="pj-title">
              {{ item.title }}
            </nuxt-link>
          </h6>
        </div>
        <div>
          <nuxt-link href="/project-details-v1" class="arrow tran3s">
            <i class="bi bi-arrow-up-right"></i>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- /.caption -->
  </div>
</template>

<script setup lang="ts">
import {type IPortfolioDT} from '@/types/portfolio-d-t';
defineProps<{ item: IPortfolioDT; index: number }>();
const emit = defineEmits(["handleShowImage"]);
function handleShowImage(indexNum: number) {
  emit("handleShowImage", indexNum);
}
</script>
