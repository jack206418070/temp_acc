<template>
  <div class="portfolio-two position-relative mt-150 lg-mt-80 mb-150 lg-mb-60">
    <div class="container">
      <div class="position-relative">
        <div id="isotop-gallery-wrapper" class="column-two">
          <div class="grid-sizer"></div>
          <masonry-wall :items="portfolio_data" :gap="40" :max-columns="2">
          <template #default="{ item,index }">
            <portfolio-single :item="item" :index="index" @handleShowImage="handleShowImage"/>
          </template>
        </masonry-wall>
        </div>
  
        <div class="section-btn text-center mt-30 lg-mt-10">
          <a href="#" class="btn-nine rounded-circle d-inline-flex align-items-center justify-content-center tran3s"><i class="bi bi-arrow-up-right"></i></a>
        </div>
      </div>
    </div>
  </div>

  <!-- image lightbox start -->
  <popup-image-lightbox :images="portfolio_data.map(p => p.img)" :indexVal="index" :visible="visible" @handleHide="handleHide"></popup-image-lightbox>
  <!-- image lightbox end -->
</template>

<script setup lang="ts">
import {type IPortfolioDT} from '@/types/portfolio-d-t';
// image popup
const visible = ref(false);
const index = ref(0);
function handleHide() {
  visible.value = false;
}
const handleShowImage = (indexNum: number) => {
  index.value = indexNum;
  visible.value = true;
};

const portfolio_data:IPortfolioDT[] = [
  {
    id:1,
    img:'/images/gallery/img_05.jpg',
    tags:['PRINT','DESIGN'],
    title:'Tax Preparation.',
  },
  {
    id:2,
    img:'/images/gallery/img_06.jpg',
    tags:['Mobile','UI/UX'],
    title:'Investment Planning',
  },
  {
    id:3,
    img:'/images/gallery/img_07.jpg',
    tags:['Branding','UI/UX'],
    title:'Case Studies & Branding',
  },
  {
    id:4,
    img:'/images/gallery/img_08.jpg',
    tags:['BANNER','WEB DESIGN'],
    title:'Online Banking',
  },
  {
    id:5,
    img:'/images/gallery/img_09.jpg',
    tags:['Banner','Web Design'],
    title:'Online Banking',
  },
  {
    id:6,
    img:'/images/gallery/img_10.jpg',
    tags:['Mobile','UI/UX'],
    title:'Market Analysis',
  }
]
</script>