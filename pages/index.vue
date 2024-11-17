<template>
 <div>
    

    <hero-banner-empty-index />

    <div class="position-relative pt-30 md-pt-20 pb-40 md-pb-20 bg-white ">
			<div class="row align-items-center">
				<div class="col-md-6 text-center text-md-end m-auto">
					<img src="/images/logo/logo_02.png" alt="">
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

 </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: "多元陪伴照顧服務" });
</script>
