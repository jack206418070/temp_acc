<template>
  <div class="service-unit-container">
    <div class="container">
      <nav>
        <div
          class="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-link"
            :class="['tab-btn', { active: currentTab === tab.id }]"
            @click="currentTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </nav>
      <div class="tab-content mt-60 lg-mt-40  w-75 mx-auto">
        <!-- 廠商卡片列表 -->
        <div id="location-block" class="vendor-grid">
          <div
            v-for="vendor in filteredVendors"
            :key="vendor.id"
            class="vendor-card"
          >
            <img :src="vendor.image" :alt="vendor.name" class="vendor-image" />
            <div class="vendor-info">
              <h3>{{ vendor.name }}</h3>
              <p class="vendor-category">{{ vendor.category }}</p>
              <p class="vendor-address">{{ vendor.address }}</p>
              <p class="vendor-contact">📞 {{ vendor.phone }}</p>
              <p class="vendor-email">📧 {{ vendor.email }}</p>
              <div class="vendor-rating">
                <span v-for="i in vendor.rating" :key="i" class="star">
                  <Icon name="noto:star" style="color: black" />
                </span>
              </div>
              <p class="vendor-description">{{ vendor.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { id: "north", name: "北區" },
  { id: "central", name: "中區" },
  { id: "south", name: "南區" },
  { id: "east", name: "東區" },
];

const currentTab = ref("north");

const vendorData = [
  {
    id: 1,
    name: "樂齡照護中心",
    image: "/images/2021-12-23.jpg",
    category: "長照服務",
    area: "north",
    address: "台北市中山區健康路123號",
    phone: "02-1234-5678",
    email: "carecenter@example.com",
    description:
      "專業的照護團隊，提供全方位的長照服務，讓長者享受溫馨舒適的照顧。",
    rating: 4,
  },
  {
    id: 2,
    name: "心靈陽光診所",
    image: "/images/2021-12-23.jpg",
    category: "心理諮商",
    area: "central",
    address: "台中市西區和平路456號",
    phone: "04-9876-5432",
    email: "mindclinic@example.com",
    description: "提供專業心理諮商服務，協助您找回內心的平靜與快樂。",
    rating: 3,
  },
  {
    id: 3,
    name: "銀髮樂活中心",
    image: "/images/2021-12-23.jpg",
    category: "樂齡活動",
    area: "south",
    address: "高雄市前金區幸福路789號",
    phone: "07-1234-5678",
    email: "eldercenter@example.com",
    description: "豐富多元的樂齡活動，讓長者享受充實快樂的退休生活。",
    rating: 5,
  },
  {
    id: 4,
    name: "健康守護站",
    image: "/images/2021-12-23.jpg",
    category: "健康管理",
    area: "north",
    address: "新北市板橋區康樂路234號",
    phone: "02-8765-4321",
    email: "healthguard@example.com",
    description: "提供完整的健康檢查與管理服務，守護您的健康。",
    rating: 2,
  },
  {
    id: 5,
    name: "樂齡學習中心",
    image: "/images/2021-12-23.jpg",
    category: "教育學習",
    area: "central",
    address: "台中市北區學習路567號",
    phone: "04-5678-9876",
    email: "elderlearning@example.com",
    description: "專為銀髮族設計的課程，持續學習、豐富人生。",
    rating: 3,
  },
  {
    id: 6,
    name: "大山樂活中心",
    image: "/images/2021-12-23.jpg",
    category: "教育學習",
    area: "east",
    address: "花蓮市美倫路87號",
    phone: "03-7654-3210",
    email: "mountaincenter@example.com",
    description: "專為銀髮族設計的課程，持續學習、豐富人生。",
    rating: 4,
  },
];

const filteredVendors = computed(() => {
  return vendorData.filter((vendor) => vendor.area === currentTab.value);
});
</script>

<style scoped>
.service-unit-container {
  padding: 2rem;
}

.area-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.vendor-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.vendor-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.vendor-info {
  padding: 1rem;
}

.vendor-category {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.vendor-area {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.vendor-address {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.vendor-description {
  font-size: 0.9rem;
  line-height: 1.5;
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
</style>