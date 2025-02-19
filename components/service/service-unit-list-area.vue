<template>
  <div class="service-unit-container">
    <div class="main-container">
      <div class="service-tab">
        <button v-for="tab in tabs" :key="tab.id"
          :class="['service-tab-btn', { active: currentTab === tab.id }]" @click="currentTab = tab.id">
          {{ tab.name.split('-')[0] }}
          <span>{{ tab.name.split('-')[1] }}</span>
        </button>
      </div>
      <div class="tab-content mt-60 lg-mt-40  w-75 mx-auto">
        <!-- 廠商卡片列表 -->
        <div id="location-block" class="vendor-grid">
          <div v-for="vendor in filteredVendors" :key="vendor.id" class="vendor-card">
            <img :src="vendor.image" :alt="vendor.name" class="vendor-image" />
            <div class="vendor-info">
              <p>{{ vendor.name }}</p>
              <p class="vendor-category">服務區域：{{ vendor.service_area }}</p>
              <p class="vendor-contact">{{ vendor.phone }}</p>
              <p class="vendor-email">{{ vendor.email }}</p>
              <a :href="vendor.web">官網</a>
              <br>
              <a :href="vendor.price" class="vendor-email" target="_blank">服務價格</a>
            </div>
          </div>
        </div>
      </div>
      <p class="service-note">*離島地區於未來計畫擴充時建置</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const tabs = [
    { id: "north", name: "北區-北北基桃竹" },
    { id: "central", name: "中區-苗中彰投雲" },
    { id: "south", name: "南區-嘉南高屏" },
    { id: "east", name: "東區-宜花東" },
  ];

  const currentTab = ref("north");

  const vendorData = [
    {
      id: 1,
      name: "社團法人中華民國紅心字會",
      image: "https://static.wixstatic.com/media/73d1df_f3c663fb863a4842a3705174c9fcec4f~mv2.jpg/v1/fill/w_574,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/og-image.jpg",
      category: "心理諮商",
      area: "north",
      service_area: "台北市、新北市",
      address: "台北市中正區重慶南路1段43號5樓之2",
      phone: "（02）2370-9191",
      email: "redheart1266@gmail.com",
      description:
        "專業的照護團隊，提供全方位的長照服務，讓長者享受溫馨舒適的照顧。",
      rating: 4,
      web: "https://www.redheart.org.tw/",
      price: "https://www.redheart.org.tw/"
    },
    {
      id: 2,
      name: "財團法人台灣省私立永信社會福利基金會",
      image: "https://static.wixstatic.com/media/73d1df_46b332b8860a4dfcbaf380ec70ebd4e7~mv2.jpg/v1/fill/w_574,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/og-image%20(1).jpg",
      category: "心理諮商",
      area: "central",
      service_area: "台中市",
      address: "台中市大甲區成功路319號",
      phone: "(04)2676-0180",
      email: "u90220@yungshingroup.com",
      description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
      rating: 3,
      web: "https://www.ysswf.com/about.php",
      price: ""
    },
    {
      id: 3,
      name: "財團法人臺中市私立童庭社會福利慈善事業基金會",
      image: "https://static.wixstatic.com/media/73d1df_a92e62c7aaec445c99af1db66f0b79ce~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(9).png",
      category: "心理諮商",
      area: "central",
      service_area: "台中市",
      address: "台中市大甲區成功路319號",
      phone: "(04)23360996",
      email: "ttcharity@gmail.com",
      description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
      rating: 3,
      web: "https://www.ttcharity.org.tw/",
      price: ""
    },
    {
      id: 4,
      name: "社團法人台灣萬人社福協會",
      image: "https://static.wixstatic.com/media/73d1df_2bfb581f0e9c468bbd3c7084e8e598c7~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(10).png",
      category: "心理諮商",
      area: "south",
      service_area: "雲林縣、嘉義縣、嘉義市、台南市、高雄市、屏東市",
      address: "高雄市三民區明誠一路20號",
      phone: "(06)2570119",
      email: "info@stipendiary.com.tw",
      description: "豐富多元的樂齡活動，讓長者享受充實快樂的退休生活。",
      rating: 5,
      web: "http://www.tpsw.org.tw/ap/index.aspx",
      price: ""
    },
    {
      id: 5,
      name: "社團法人花蓮縣家庭照顧者關懷協會",
      image: "https://static.wixstatic.com/media/73d1df_f4f6286abc514cb9978b1bbefd87cd7c~mv2.png/v1/fill/w_574,h_314,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88%20(11).png",
      category: "心理諮商",
      area: "east",
      service_area: "宜蘭縣、花蓮縣、台東縣",
      address: "花蓮市美倫路87號",
      phone: "(03)8223685",
      email: "u90220@yungshingroup.com",
      description: "專為銀髮族設計的課程，持續學習、豐富人生。",
      rating: 4,
      web: "https://www.facebook.com/HFCCA/?locale=zh_TW",
      price: ""
    },
  ];

  const filteredVendors = computed(() => {
    return vendorData.filter((vendor) => vendor.area === currentTab.value);
  });
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .service-unit-container {
    padding: 0.5rem;
    margin-bottom: 100px;
  }

  .area-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .service-tab {
    display: flex;
  }
  .service-tab-btn {
    flex: 0 0 25%;
    cursor: pointer;
    padding: 20px 0;
    text-align: center;
    transition: all 0.3s;
  }
  .service-tab-btn:hover, .service-tab-btn.active {
    background-color: #41BBBE;
  }

  .service-tab-btn span {
    display: block;
    font-size: 12px;
    text-align: center;
  }
  .tab-btn {
    padding: 0.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
  }

  .vendor-grid {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .vendor-card {
    flex: 0 0 300px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.6);
    padding-bottom: 12px;
  }

  .vendor-image {
    width: 100%;
    object-fit: cover;
  }

  .vendor-info {
    padding: 0 25px;
  }
  .vendor-category {
    color: #000;
  }

  .vendor-area {
    color: #000;
    font-size: 1rem;
  }

  .vendor-address {
    color: #000;
    font-size: 1rem;
  }

  .vendor-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .service-note {
    margin-top: 20px;
    font-size: 16px;
    text-align: right;
  }

  .vendor-rating {
    margin: 0.5rem 0;
  }

  .star {
    color: #ddd;
    margin-right: 2px;
  }

  .star .filled {
    color: #ffd700;
  }
  @media (max-width: 991px) {
    .service-unit-container {
      margin-bottom: 50px;
    }
  }
</style>