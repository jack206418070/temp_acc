<template>
   <div class="team-section-one mt-150 lg-mt-80">
			<div class="container">
				<div class="position-relative">
					<div class="title-one mb-40 lg-mb-20 wow fadeInUp">
						<h2>Our Advisor.</h2>
					</div>
					<!-- /.title-one -->

					<div class="row">

						<div v-for="(item,i) in team_one_data" :key="i" class="col-lg-3 col-sm-6 wow fadeInUp" :data-wow-delay="`0.${i}s`">
							<team-single :item="item" />
						</div>

					</div>

					<div class="section-btn sm-mt-40">
						<nuxt-link href="/team-v1" class="btn-five icon-link">
							<span class="text">See all Experts</span>
							<div class="icon tran3s rounded-circle d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-right"></i></div>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
import team_data from '@/data/team-data';
const team_one_data = [...team_data].filter(t => t.page === 'home');
</script>
