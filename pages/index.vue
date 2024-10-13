<template>
 <div>
  <nuxt-layout name="default">
    

    <hero-banner-index />

    <div class="fancy-banner-one position-relative pt-30 md-pt-20 pb-40 md-pb-20 bg-white">
			<div class="row align-items-center">
				<div class="col-md-6 text-center text-md-end">
					<h2 class="pe-xl-5 pe-md-4 sm-pb-50">讓我們<span>協助您</span></h2>
				</div>
				<div class="col-md-6">
					<div class="ps-xl-5 ps-md-4 pe-xxl-5 d-flex align-items-center justify-content-between">
						<div>
							<h3 class="fw-bold">1000+</h3>
							<p class="text-md m0">戶家庭</p>
						</div>
						<img src="/images/assets/screen_01.png" alt="screen" class="lazy-img screen me-xxl-5">
					</div>
				</div>
			</div>
		</div>

    <block-feature-index />
    <!-- 區塊特徵區域結束 -->

    
    <!-- 部落格區域開始 -->
    <blog-area-index />
    <!-- 部落格區域結束 -->

    <!-- 文字特徵區域開始 -->
    <text-feature-index />
    <!-- 文字特徵區域結束 -->

    <!-- 常見問題區域開始 -->
    <faq-area-index />
    <!-- 常見問題區域結束 -->


    <!-- 特色橫幅區域開始 -->
    <div class="fancy-banner-two mt-150 lg-mt-80 mb-150 lg-mb-60">
			<div class="container">
				<div class="text-center wow fadeInUp">
					<div class="row">
						<div class="col-lg-8 m-auto">
							<div class="title-one">
								<h2>想聊聊嗎？歡迎聯繫我們的團隊。</h2>
							</div>
							<!-- /.title-one -->
							<p class="text-lg mt-40 lg-mt-30 mb-30">聯繫我們友善的團隊，獲得快速和有幫助的答覆。</p>
							<div class="d-inline-flex flex-wrap justify-content-center">
								<nuxt-link href="/contact" class="btn-four mt-10 me-2">獲取報價</nuxt-link>
								<nuxt-link href="/contact" class="btn-six mt-10 ms-2">聯繫我們</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!-- 特色橫幅區域結束 -->

  </nuxt-layout>
 </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "多元陪伴照顧服務" });
</script>
