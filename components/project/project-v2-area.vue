<template>
  <div class="portfolio-two position-relative mt-150 lg-mt-80 mb-150 lg-mb-60">
    <div class="container">
      <div class="position-relative">
        <div id="isotop-gallery-wrapper" class="column-two">
          <div class="grid-sizer"></div>
          <div class="row">
            <div v-for="(item,index) in portfolio_data.slice(startIndex, endIndex)" :key="item.id" class="col-md-6">
              <portfolio-single :item="item" :index="index" @handleShowImage="handleShowImage"/>
            </div>
          </div>

        </div>

        <div class="pagination-one border-top border-bottom pt-15 pb-15 mt-40 lg-mt-10">
          <pagination
            :items-per-page="4"
            :data="portfolio_data"
            @handle-paginate="handlePagination"
          />
        </div>
        <!-- /.pagination-one -->
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
    img:'/images/gallery/img_11.jpg',
    tags:['PRINT','DESIGN'],
    sub_title:'User Interface',
    title:'Tax Preparation.',
  },
  {
    id:2,
    img:'/images/gallery/img_12.jpg',
    tags:['Mobile','UI/UX'],
    sub_title:'User Interface',
    title:'Investment Planning',
  },
  {
    id:3,
    img:'/images/gallery/img_13.jpg',
    tags:['Branding','UI/UX'],
    sub_title:'User Interface',
    title:'Case Studies & Branding',
  },
  {
    id:4,
    img:'/images/gallery/img_14.jpg',
    tags:['BANNER','WEB DESIGN'],
    sub_title:'User Interface',
    title:'Online Banking',
  },
  {
    id:5,
    img:'/images/gallery/img_15.jpg',
    tags:['Mobile','UI/UX'],
    sub_title:'User Interface',
    title:'Market Analysis',
  },
  {
    id:6,
    img:'/images/gallery/img_16.jpg',
    tags:['PRINT','DESIGN'],
    sub_title:'User Interface',
    title:'Business Consulting',
  },
];

let filteredPortfolioItems = ref<IPortfolioDT[]>(portfolio_data);
let startIndex = ref<number>(0);
let endIndex = ref<number>(portfolio_data.length);

const handlePagination = (data: IPortfolioDT[], start: number, end: number) => {
  filteredPortfolioItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>