<template>
 <div>
  <nuxt-layout name="default">
    
    <!-- hero banner area start -->
    <hero-banner-one />
    <!-- hero banner area end -->

    <!-- fancy banner area start -->
    <div class="fancy-banner-one position-relative pt-30 md-pt-20 pb-40 md-pb-20 bg-white">
			<div class="row align-items-center">
				<div class="col-md-6 text-center text-md-end">
					<h2 class="pe-xl-5 pe-md-4 sm-pb-50">Let’s <span>Discuss & Start</span></h2>
				</div>
				<div class="col-md-6">
					<div class="ps-xl-5 ps-md-4 pe-xxl-5 d-flex align-items-center justify-content-between">
						<div>
							<h3 class="fw-bold">1.75 million+</h3>
							<p class="text-md m0">Worldwide clients</p>
						</div>
						<img src="/images/assets/screen_01.png" alt="screen" class="lazy-img screen me-xxl-5">
					</div>
				</div>
			</div>
		</div>
    <!-- fancy banner area end -->

    <!-- block feature area start -->
    <block-feature-one />
    <!-- block feature area end -->

    <!-- text feature area start -->
    <text-feature-one />
    <!-- text feature area end -->

    <!-- block feature area start -->
    <block-feature-two />
    <!-- block feature area end -->

    <!-- block feature area start -->
    <block-feature-three />
    <!-- block feature area end -->

    <!-- feedback area start -->
    <feedback-two />
    <!-- feedback area end -->

    <!-- team area start -->
    <team-one-area />
    <!-- team area end -->

    <!-- faq area start -->
    <faq-area-one />
    <!-- faq area end -->

    <!-- blog area start -->
    <blog-area-two />
    <!-- blog area end -->

    <!-- fancy banner area start -->
    <div class="fancy-banner-two mt-150 lg-mt-80 mb-150 lg-mb-60">
			<div class="container">
				<div class="text-center wow fadeInUp">
					<div class="row">
						<div class="col-lg-8 m-auto">
							<div class="title-one">
								<h2>Want to chat? Feel free to contact our team.</h2>
							</div>
							<!-- /.title-one -->
							<p class="text-lg mt-40 lg-mt-30 mb-30">Contact our friendly team for quick and helpful answers.</p>
							<div class="d-inline-flex flex-wrap justify-content-center">
								<nuxt-link href="/contact" class="btn-four mt-10 me-2">Get a Quote</nuxt-link>
								<nuxt-link href="/contact" class="btn-six mt-10 ms-2">Contact</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!-- fancy banner area end -->

  </nuxt-layout>
 </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Home Two - Babun" });
</script>
