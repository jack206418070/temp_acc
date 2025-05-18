<template>
  <div class="card-style-fifteen mt-35">
    <div class="media d-flex align-items-center justify-content-center position-relative overflow-hidden">
      <img :src="item.img" alt="" class="lazy-img w-100">
      <nuxt-link href="/team-details" class="round-btn rounded-circle d-flex align-items-center justify-content-center tran3s"><i class="bi bi-arrow-up-right"></i></nuxt-link>
    </div>
    <h4 class="fw-500 pt-20 m0">{{item.name}}</h4>
    <div class="fs-6">{{item.designation}}</div>
  </div>
</template>

<script setup lang="ts">
import { type ITeam } from "@/types/team-d-t";

defineProps<{ item: ITeam }>();
</script>