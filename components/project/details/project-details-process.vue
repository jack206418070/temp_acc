<template>
  <div class="row">
    <div
      v-for="(item, i) in process_data"
      :key="item.id"
      class="col-lg-4 wow fadeInUp"
      :data-wow-delay="`0.${i}s`"
    >
      <div :class="`card-style-sixteen text-center ${item.cls}`">
        <div class="icon m-auto tran3s rounded-circle d-flex align-items-center justify-content-center">
          <img :src="item.icon" alt="icon" class="lazy-img" />
        </div>
        <h4 class="fw-bold mt-35 md-mt-30 mb-15">{{ item.title }}</h4>
        <p class="m0 fs-5 lh-base pe-xl-5 ps-xl-5">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const process_data = [
  {
    id: 1,
    cls: "mt-40 md-mt-20",
    icon: "/images/icon/icon_81.svg",
    title: "Collect Info",
    description: "We collect require documents & send for check",
  },
  {
    id: 2,
    cls: "arrow position-relative mt-40",
    icon: "/images/icon/icon_82.svg",
    title: "Research & Solution",
    description: "We check the documents & send for final approval",
  },
  {
    id: 3,
    cls: "mt-40",
    icon: "/images/icon/icon_83.svg",
    title: "Finalize Result",
    description: "After approve you ready to use your accounts",
  },
];
</script>
