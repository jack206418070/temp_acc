<template>
  <div class="team-section-one mt-150 lg-mt-80 mb-100 lg-mb-40">
    <div class="container">
      <div class="position-relative">
        <div class="row">
          <div
            v-for="(item, i) in teams"
            :key="i"
            class="col-lg-3 col-sm-6 wow fadeInUp"
            :data-wow-delay="`0.${i}s`"
          >
            <team-single :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import team_data from "@/data/team-data";
console.log(team_data);
const teams = team_data.filter((t) => t.page === "home" || t.page === "team");
</script>
