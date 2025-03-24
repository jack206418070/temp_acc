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
      <div class="tab-content mt-60 lg-mt-40">
        <!-- 廠商卡片列表 -->
        <div id="location-block" class="vendor-grid">
          <div v-for="vendor in filteredVendors" :key="vendor.id" class="vendor-card">
            <img :src="vendor.image" :alt="vendor.name" class="vendor-image" />
            <div class="vendor-info">
              <p v-html="vendor.name" style="text-align: left; padding: 15px 0; font-size: 20px;"></p>
              <p class="vendor-category">
                <span class="vendor-category-tag" v-for="item in vendor.service_area.split(',')">{{ item }}</span>
              </p>
              <a href="#" class="vendor-contact">{{ vendor.phone }}</a>
              <a href="#" class="vendor-email">{{ vendor.email }}</a>
              <div class="vender-deatil-info">
                <a :href="vendor.price" class="vender-detail-price">服務價格</a>
                <a :href="vendor.web" target="_blank" class="vender-detail-web">單位網站</a>
              </div>
              <a class="book-btn" href="https://serve-mcs.wda.gov.tw">我要預約</a>
            </div>
          </div>
        </div>
      </div>
      <p class="service-note">*離島地區於未來計畫擴充時建置 <br> <a class="template-btn" href="https://drive.google.com/drive/folders/1XQkk8vrucc-l2xYapD9JMFFjG3p6hpQ-?usp=sharing">合約範本</a></p>
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
      name: "紅心字會秉持「愛心無限，服務社會」，加入多元服務，紓解照顧人力短缺，提供臨、短、急之專業溫暖服務。",
      image: "/images/assets/brand-1.avif",
      category: "心理諮商",
      area: "north",
      service_area: "臺北市,新北市",
      address: "台北市中正區重慶南路1段43號5樓之2",
      phone: "（02) 2370-9191",
      email: "redheart1266@gmail.com",
      description:
        "專業的照護團隊，提供全方位的長照服務，讓長者享受溫馨舒適的照顧。",
      rating: 4,
      web: "https://www.redheart.org.tw/",
      price: "/service-price?id=1"
    },
    {
      id: 2,
      name: "秉持服務「永續」的精神，讓受照顧者能夠享受「幸福」生活，達到你好、我好、大家好的目標。",
      image: "/images/assets/brand-2.avif",
      category: "心理諮商",
      area: "central",
      service_area: "臺中市",
      address: "台中市大甲區成功路319號",
      phone: "(04) 2676-0180",
      email: "u90220@yungshingroup.com",
      description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
      rating: 3,
      web: "https://www.ysswf.com/",
      price: "/service-price?id=2"
    },
    {
      id: 3,
      name: "童庭基金會致力於了解您的需求，提供您專業且有溫度的臨、短、急多元陪伴照顧服務。",
      image: "/images/assets/brand-4.avif",
      category: "心理諮商",
      area: "central",
      service_area: "臺中市",
      address: "台中市大甲區成功路319號",
      phone: "(04) 23360996",
      email: "ttcharity@gmail.com",
      description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
      rating: 3,
      web: "https://www.ttcharity.org.tw/",
      price: "/service-price?id=3"
    },
    {
      id: 6,
      name: "協會長期提供照護、職訓、心理與法律扶助，厚植地方資源創新服務，營造共融共好社會。",
      image: "/images/assets/brand-3.avif",
      category: "心理諮商",
      area: "central",
      service_area: "臺中市,南投縣,彰化縣",
      address: "台中市大甲區成功路319號",
      phone: "(04) 9224-5265",
      email: "ntnrca1mcs@gmail.com",
      description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
      rating: 3,
      web: "https://www.facebook.com/profile.php?id=100064631114886&mibextid=wwXIfr&rdid=A86u7EN6cA82uuvt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14yDS9r63R%2F%3Fmibextid%3DwwXIfr#",
      price: "/service-price?id=4"
    },
    {
      id: 4,
      name: "萬人協會服務南部地區民眾，致力於支持弱勢族群與其照顧者，透過專業團隊，減輕家庭臨、短、急照顧需求，協助更多需要關懷的家庭。",
      image: "/images/assets/brand-5.avif",
      category: "心理諮商",
      area: "south",
      service_area: "臺南市,高雄市,屏東縣",
      address: "高雄市三民區明誠一路20號",
      phone: "(06) 2570119",
      email: "info@stipendiary.com.tw",
      description: "豐富多元的樂齡活動，讓長者享受充實快樂的退休生活。",
      rating: 5,
      web: "http://www.tpsw.org.tw/ap/index.aspx",
      price: "/service-price?id=5"
    },
    {
      id: 5,
      name: "花蓮家協為宜花東有「臨、短、急」照顧需求的家庭，提供多元專業優質的家庭照顧服務。",
      image: "/images/assets/brand-6.avif",
      category: "心理諮商",
      area: "east",
      service_area: "宜蘭縣,花蓮縣,臺東縣",
      address: "花蓮市美倫路87號",
      phone: "(03) 8223685",
      email: "u90220@yungshingroup.com",
      description: "專為銀髮族設計的課程，持續學習、豐富人生。",
      rating: 4,
      web: "https://www.facebook.com/HFCCA/?locale=zh_TW",
      price: "/service-price?id=6"
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
    font-size: 14px;
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
    flex: 0 0 30%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
    margin-bottom: 15px;
  }
  .vendor-category-tag {
    background-color: #41BBBE;
    color: #fff;
    padding: 0px 12px;
    font-size: 18px;
    border-radius: 15px;
    cursor: pointer;
    transition: .3s;
    align-self: stretch;
    cursor: default;
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
    font-size: 18px;
    text-align: right;
  }

  .vendor-rating {
    margin: 0.5rem 0;
  }

  .star {
    color: #ddd;
    margin-right: 2px;
  }
  .vendor-contact, .vendor-email {
    text-align: center;
    font-size: 1.5rem;
    display: block;
    margin-bottom: 10px;
  }
  .star .filled {
    color: #ffd700;
  }
  .vender-deatil-info {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .vender-deatil-info a {
    transition: .3s;
    cursor: pointer;
  }
  .vender-deatil-info a:hover {
    color: #0c4426;
    font-weight: 500;
  }
  .book-btn {
    text-align: center;
    display: block;
    width: 50%;
    margin: 0 auto;
    background-color: #ec6717;
    color: #fff;
    border-radius: 20px;
    padding: 3px 10px;
  }
  .vender-detail-price {
    padding: 3px 10px;
    border: 2px solid #0c4426;
    border-radius: 20px;
    transition: .3s;
  }
  .vender-detail-price:hover {
    background-color: #0c4426;
    color: #fff !important;
  }
  .vender-detail-web {
    padding: 3px 8px;
    border: 2px solid #0c4426;
    border-radius: 20px;
    transition: .3s;
  }
  .vender-detail-web:hover {
    background-color: #0c4426;
    color: #fff !important;
  }
  .template-btn {
    color: #fff;
    font-size: 18px;
    background-color: #41BBBE;
    padding: 3px 10px;
    transition: .3s;
  }
  .template-btn:hover {
    background-color:#0c4426;
  }
  @media (max-width: 991px) {
    .service-unit-container {
      margin-bottom: 50px;
    }
    .vendor-card {
      flex: 0 0 100% !important;
    }
    .vendor-category-tag {
      font-size: 16px;
      padding: 0px 10px;
    }
  }
</style>