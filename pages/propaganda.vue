<template>
  <div class="main-container">
    <div class="tab-list">
      <div class="tab-item" :class="{activated: tab_type === '1'}" @click="changeTab('1')">懶人包</div>
      <div class="tab-item" :class="{activated: tab_type === '2'}" @click="changeTab('2')">宣導資料</div>
    </div>
    <h2 class="default-title">
      {{ tab_data[tab_type].type }}
    </h2>
    <div class="tab-data-list" :class="{'block2': tab_type != '1'}">
      <template v-if="tab_type == '1'">
        <div class="tab-data-item" v-for="(data, index) in tab_data[tab_type].data" @click="openPopup(index)">
          <img :src="data.image" alt="">
        </div>
      </template>
      <template v-else>
        <div class="tab-data-item-block2" v-for="(data, index) in tab_data[tab_type].data" @click="openPopup(index)">
          <img :src="data.image" alt="">
        </div>
      </template>
    </div>
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button class="arrow left" v-if="currentIndex > 0" @click="prevImage">‹</button>
        <img :src="tab_data[tab_type].data[currentIndex].image" alt="Popup Image" />
        <button class="arrow right" v-if="currentIndex < tab_data[tab_type].data.length - 1" @click="nextImage">›</button>
        <button class="close-btn" @click="closePopup">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const tab_data = ref({
  '1': {
    type: '懶人包',
    data: [
      {
        image: '/images/assets/temp-1.jpg'
      },
      {
        image: '/images/assets/temp-2.jpg'
      },
      {
        image: '/images/assets/lazybag03.webp'
      },
      {
        image: '/images/assets/temp_12.avif'
      },
      {
        image: '/images/assets/temp_13.avif'
      },
      {
        image: '/images/assets/temp_14.avif'
      },
      {
        image: '/images/assets/temp_4.avif'
      },
      {
        image: '/images/assets/temp_5.avif'
      },
      {
        image: '/images/assets/temp_6.avif'
      },
      {
        image: '/images/assets/temp_7.avif'
      },
      {
        image: '/images/assets/temp_8.avif'
      },
      {
        image: '/images/assets/temp_9.avif'
      },
      {
        image: '/images/assets/temp_10.avif'
      },
      {
        image: '/images/assets/temp-14.jpg'
      }
    ]
  },
  '2': {
    type: '宣導資料',
    data: [
      {
        image: '/images/assets/temp_15.avif'
      }
    ]
  }
});
const tab_type = ref('1');
const showPopup = ref(false);
const currentIndex = ref(0);

const changeTab = (type: string) => {
  tab_type.value = type;
};

// onMounted(() => {
//   tab_data.value['1'].data = ['懶人包內容1', '懶人包內容2'];
//   tab_data.value['2'].data = ['宣導品內容1', '宣導品內容2'];
// });
const openPopup = (index: number) => {
  currentIndex.value = index;
  showPopup.value = true;
  document.body.style.overflow = 'hidden';
};

const closePopup = () => {
  showPopup.value = false;
  document.body.style.overflow = '';
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextImage = () => {
  if (currentIndex.value < tab_data.value[tab_type.value].data.length - 1) {
    currentIndex.value++;
  }
};
useSeoMeta({ title: "懶人包/宣導資料｜ 多元陪伴照顧服務計畫" });
</script>

<style scoped>
h1, h2 {
  text-align: center;
}
.tab-data-list {
  display: flex;
  gap: 2%;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 100px;
}
.tab-data-list.block2 {
  justify-content: center;
}
.tab-data-item {
  flex: 0 0 32%;
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
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
.tab-data-item-block2 {
  flex: 0 0 50%;
  border-radius: 30px;
  margin-bottom: 30px;
  overflow: hidden;
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