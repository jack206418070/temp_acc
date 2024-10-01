<template>
   <div class="block-feature-one position-relative pt-75">
			<div class="upper-wrapper mb-110 lg-mb-80">
				<div class="container">
					<div class="row">
					
						<div v-for="(item,i) in upper_data" :key="i" class="col-lg-4 wow fadeInUp" :data-wow-delay="`0.${i}s`">
							<div class="card-style-one d-flex w-100 mb-35">
								<div class="icon tran3s rounded-circle d-flex align-items-center justify-content-center">
                  <img :src="item.icon" alt="icon" class="lazy-img">
                </div>
								<div class="text ps-4">
									<h4 class="fw-bold">{{item.title}}</h4>
									<p class="pe-xl-4">{{item.desc}}</p>
								</div>
							</div>
							<!-- /.card-style-one -->
						</div>
						
					</div>
				</div>
			</div>
			<!-- /.upper-wrapper -->

			<div class="container">
				<div class="position-relative">
					<div class="row">
						<div class="col-md-6">
							<div class="title-one text-center text-md-start mb-30 sm-mb-10">
								<h2>Provide quality Services.</h2>
							</div>
							<!-- /.title-one -->
						</div>
					</div>
					<div class="row justify-content-center">
						<div v-for="item in service_data" :key="item.id" class="col-lg-4 col-md-6 d-flex wow fadeInUp" :data-wow-delay="`0.${item.id}s`">
							<div class="card-style-two vstack tran3s w-100 mt-30">
								<img :src="item.icon" alt="icon" class="lazy-img icon me-auto">
								<h4 class="fw-bold mt-30 mb-25">{{item.title}}</h4>
								<p class="mb-20">{{item.desc}}</p>
								<nuxt-link href="/service-details" class="arrow-btn tran3s mt-auto stretched-link">
                  <img src="/images/icon/icon_09.svg" alt="icon" class="lazy-img">
                </nuxt-link>
							</div>
						</div>
					</div>

					<div class="section-subheading sm-mt-40">
						<p class="text-lg">
              Inciddnt ut labore et dolor magna aliu. enim ad mim venam, quis nostru 
            </p>
						<nuxt-link href="/service-v1" class="btn-three icon-link">
							<span>See All Services</span>
							<img src="/images/icon/icon_09.svg" alt="" class="lazy-img icon ms-1">
						</nuxt-link>
					</div>
					<!-- /.section-subheading -->
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">

const upper_data = [
  {icon:'/images/icon/icon_03.svg',title:'Low Fees',desc:'cupidatat non proident, sunt in culpa qui officia deserunt'},
  {icon:'/images/icon/icon_04.svg',title:'Expert Advisor',desc:'Elit esse cillum dolore eu fugiat nulla pariatur'},
  {icon:'/images/icon/icon_05.svg',title:'Effective Support',desc:'quis nostrud exerct ullamo ea nisi ut aliqui com dolor'},
];


const service_data = [
  {
    id:1,
    icon:'/images/icon/icon_06.svg',
    title:'Expense Report',
    desc:'Maximize convenience by paying for ads, subscriptions, and inventory with Mastercard®.',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'Book keeping',
    desc:'Use receiving accounts in a growing number of currencies and get paid like a local.',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'Tax Preparation',
    desc:'Use receiving accounts in a growing number of currencies and get paid like a local.',
  }
];


</script>
