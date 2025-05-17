<template>
  <div
    class="team-section-four light-bg border-top pt-150 lg-pt-80 pb-100 lg-pb-40"
  >
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div
            v-for="(item, i) in teams"
            :key="item.id"
            class="col-lg-3 col-sm-6 wow fadeInUp"
            :data-wow-delay="`0.${i}s`"
          >
            <team-single-two :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import team_data from "@/data/team-data";

const teams = team_data.filter(
  (t) => t.page === "team-three" || t.page === "team"
);
</script>
