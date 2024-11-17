<template>
 <header :class="`theme-main-menu menu-overlay menu-style-two sticky-menu ${isSticky?'fixed':''}`">
	
			<div class="inner-content gap-fix">
				<div class="top-header position-relative">
					<div class="d-flex align-items-center">
						<div class="logo order-lg-0 w-25">
							<nuxt-link href="/" class="d-flex align-items-center">
								<img src="/images/logo/logo_02.png" alt="">
							</nuxt-link>
						</div>
						<!-- logo -->
						<!-- <div class="right-widget order-lg-3 ms-auto">
							<ul class="d-flex align-items-center style-none">
								<li class="d-flex align-items-center login-btn-one me-3 me-md-0">
											<img src="/images/icon/icon_16.svg" alt="" class="lazy-img icon me-2"> 
											<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" class="fw-500">Login</a>
									</li>
								<li class="d-none d-md-inline-block ms-3 ms-lg-5 me-3 me-lg-0">
									<a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" class="signup-btn-one icon-link">
											<span>Signup</span>
											<div class="icon rounded-circle d-flex align-items-center justify-content-center"><i class="bi bi-arrow-right"></i></div>
									</a>
							</li>
							</ul>
						</div> /.right-widget -->
						<nav class="navbar navbar-expand-lg p0 ms-lg-5 order-lg-2">
							<button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
								data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
								aria-label="Toggle navigation">
								<span></span>
							</button>
							<div class="collapse navbar-collapse" id="navbarNav">
								<header-nav-menus/>
							</div>
						</nav>
					</div>
				</div> <!--/.top-header-->
			</div> <!-- /.inner-content -->

		</header>
			<!-- login modal -->
			<popup-login/>
			<!-- login modal -->

</template>

<script setup lang="ts">
const { isSticky } = useSticky();
</script>
