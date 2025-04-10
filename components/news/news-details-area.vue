<template>
  <div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
    <div class="container">
      <div class="row gx-xl-5">
        <div class="col-lg-12">
          <article class="blog-meta-two style-two">
            <div class="post-data">
              <div class="post-head" v-if="blog.id == 1">活動快報</div>
              <div class="post-head" v-if="blog.id == 2">新聞快報</div>
              <div class="post-startDate">起始活動日：{{ blog.date }}</div>
              <div>
                <div class="post-startDate">發佈日期：{{ blog.date }}</div>
                <div class="post-category">類別：{{ blog.category }}</div>
              </div>
              <div class="post-info" v-if="blog.post_info">活動訊息：{{blog.post_info}}</div>
              <!-- <div class="blog-title">
                <h4>{{blog.title}}</h4>
              </div> -->
              <div class="post-details-meta">
                內容：<br>
                <div class="post-content" v-html="blog.content"></div>
              </div>
              <div class="post-links" v-if="blog.links">
                連結：<br>
                <div class="post-link-item">
                  <a :href="item.url" v-for="item in blog.links" target="_blank">{{ item.name }}</a>
                </div>
              </div>
              <div class="post-images" v-if="blog.images">
                圖片：<br>
                <div class="post-images-item">
                  <template  v-for="(item, index) in blog.images">
                    <div class="tab-data-item" @click="openPopup(index)">
                      <img :src="item.url" alt="">
                      <p>{{ item.name }}</p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!-- /.post-data -->
          </article>
        </div>

      </div>
    </div>
  </div>
  <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="arrow left" v-if="currentIndex > 0" @click="prevImage">‹</button>
      <img :src="blog.images[currentIndex].url" alt="Popup Image" />
      <button class="arrow right" v-if="currentIndex < blog.images.length - 1" @click="nextImage">›</button>
      <button class="close-btn" @click="closePopup">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IBlog } from "@/types/blog-d-t";
import { ref, onMounted } from "vue";
const props = defineProps<{blog:IBlog}>();

const showPopup = ref(false);
const currentIndex = ref(0);

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = '';
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
const openPopup = (index: number) => {
  currentIndex.value = index;
  showPopup.value = true;
  document.body.style.overflow = 'hidden';
};

const nextImage = () => {
  if (currentIndex.value < props.blog.images.length - 1) {
    currentIndex.value++;
  }
};
</script>

<style lang="scss" scoped>
.post-head {
  color: #cb4e00;
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 20px;
  /* margin-bottom: 20px; */
  border-bottom: 1px dashed #BEBEBE;
}
.post-images-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}
.post-startDate, .post-category {
  padding: 10px 0;
  font-size: 20px;
  border-bottom: 1px dashed #BEBEBE;
}
.post-images-item .tab-data-item {
  flex: 0 0 25%;
}

.post-images-item .tab-data-item img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.blog-meta-two.style-two .post-data .post-info {
  margin: 0px;
  padding: 5px 0;
  font-size: 20px !important;
  color: #885849;
}
.blog-details .post-details-meta {
  margin-top: 0px;
}
.post-content {
  margin-top: 10px;
  padding-left: 15px;
}

  .tab-data-item {
  border-radius: 30px;
  margin-bottom: 30px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
}
.tab-data-item::after {
  content: ""; /* 確保非 hover 狀態下也存在 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(41, 15%, 50%, 0); /* 初始為透明 */
  z-index: 100;
  transition: all .5s;
}
.post-links {
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px dashed #BEBEBE;
}
.post-links .post-link-item {
  padding-left: 15px;
  color: rgb(75, 127, 186);
}
.tab-data-item-block2 {
  flex: 0 0 50%;
  border-radius: 30px;
  margin-bottom: 30px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
}
.tab-data-item:hover::after{
  background-color: hsla(41, 15%, 50%, 0.5);
}
.tab-data-item img {
  object-fit: contain;
  display: block;
}
.tab-list {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}
.tab-list .tab-item {
  padding: 5px 40px;
  color: #0C4426;
  border: 3px solid #EC6717;
  transition: all .5s;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
}
.tab-data-item p {
  font-size: 18px;
  margin-top: 10px;
  color: rgb(75, 127, 186);
  position: absolute;
  bottom: -60px;
}
.tab-list .tab-item.activated, .tab-list .tab-item:hover {
  color: #fff;
  border: 3px solid #EC6717;
  background-color: #41BBBE;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(245, 222, 179, 0.9); /* 米色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  z-index: 1001;
}

.arrow.left {
  left: -50px;
  font-size: 3rem;
}

.arrow.right {
  right: -50px;
  font-size: 3rem;
}

.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991px) {
  .post-images-item .tab-data-item {
    flex: 0 0 100%;
  }
  .post-images-item {
    flex-wrap: wrap;
  }
  .tab-data-list {
    gap: 0;
    justify-content: center;
  }
  .popup-content img {
    max-width: 80%;
  }
  .tab-data-item {
    flex: 0 0 90%;
    margin-bottom: 20px;
  }
  .default-title {
    margin-bottom: 25px;
  }
  .tab-list {
    justify-content: center;
  }
  .popup-content {
    max-width: 90%;
    max-height: 70%;
  }

  .arrow.left {
    left: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .arrow.right {
    right: 10px;
    font-size: 3rem;
    z-index: 1000;
  }

  .close-btn {
    top: -10px;
    right: 30px;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
  }
}
</style>
