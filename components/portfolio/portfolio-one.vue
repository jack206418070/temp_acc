<template>
  <div class="portfolio-one border-100 position-relative pt-150 lg-pt-80 pb-100 lg-pb-60">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div class="col-lg-7">
            <div class="title-four mb-80 lg-mb-40">
              <h2>Our Recent Work & Portfolio.</h2>
            </div>
            <!-- /.title-four -->
          </div>
        </div>
        <div id="isotop-gallery-wrapper" class="column-two">
          <div class="grid-sizer"></div>

        <masonry-wall :items="portfolio_data" :gap="40" :max-columns="2">
          <template #default="{ item,index }">
            <portfolio-single :item="item" :index="index" @handleShowImage="handleShowImage"/>
          </template>
        </masonry-wall>

        </div>

        <div class="section-btn md-mt-10">
          <nuxt-link href="/project-v2" class="btn-nine rounded-circle d-inline-flex align-items-center justify-content-center tran3s"><i class="bi bi-arrow-up-right"></i></nuxt-link>
        </div>
      </div>
    </div>
  </div>

   <!-- image lightbox start -->
  <popup-image-lightbox :images="portfolio_data.map(p => p.img)" :indexVal="index" :visible="visible" @handleHide="handleHide"></popup-image-lightbox>
  <!-- image lightbox end -->
</template>

<script setup lang="ts">
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

const portfolio_data = [
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
    img:'/images/gallery/img_09.jpg',
    tags:['BANNER','WEB DESIGN'],
    title:'Online Banking',
  }
]
</script>
