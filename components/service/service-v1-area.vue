<template>
  <div>

    <!-- text area one start -->
    <div class="text-feature-one mt-150 lg-mt-80">
      <div class="container">
        <div class="row">
            <div class="col-lg-5 wow fadeInLeft">
                <div class="title-one">
                    <h2>15k+ clients base & growing.</h2>
                </div>
                <!-- /.title-one -->
                <p class="text-lg mt-45 lg-mt-30 mb-60 lg-mb-30">Your success is our mission. As business advisors, we offer expert guidance, unlocking your potential for growth and profitability</p>
                <nuxt-link href="/contact" class="btn-three icon-link mt-15 md-mb-60">
                    <span>Request a Callback</span>
                    <img src="/images/icon/icon_09.svg" alt="" class="lazy-img icon ms-1">
                </nuxt-link>
            </div>
            <div class="col-lg-6 ms-auto">
                <div class="row">
                 
                    <div v-for="(item,i) in feature_data" :key="item.id" class="col-sm-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
                        <div class="card-style-twelve mb-40 lg-mb-20">
                            <div class="icon tran3s d-flex align-items-center justify-content-center rounded-circle">
                              <img :src="item.icon" alt="" class="lazy-img">
                            </div>
                            <h4 class="fw-bold mt-20 mb-15">{{item.title}}</h4>
                            <p>{{item.subtitle}}</p>
                        </div>
                        <!-- /.card-style-twelve -->
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- text area one end -->


   <!-- block feature area start -->
   <div class="block-feature-one position-relative light-bg-deep mt-100 lg-mt-60 pt-120 lg-pt-60 pb-130 lg-pb-60">
			<div class="container">
				<div class="position-relative">
					<div class="title-one text-center mb-40 lg-mb-10">
              <h2>Our Services</h2>
              <p class="text-lg mt-20">Inciddnt ut labore et dolor magna aliu. ad mim venam, quis nostru </p>
          </div>
					<div class="row">
						
						<div v-for="(item,i) in service_data" :key="item.id" class="col-lg-4 col-md-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
							<div class="card-style-two vstack tran3s w-100 mt-30">
                <img :src="item.icon" alt="" class="lazy-img icon me-auto">
								<h4 class="fw-bold mt-30 mb-25">{{item.title}}</h4>
								<p class="mb-20">{{item.desc}}</p>
								<nuxt-link href="/service-details" class="arrow-btn tran3s mt-auto stretched-link">
                  <img src="/images/icon/icon_09.svg" alt="" class="lazy-img">
                </nuxt-link>
							</div>
							<!-- /.card-style-two -->
						</div>
						
					</div>
				</div>
			</div>
      <img src="/images/shape/shape_05.svg" alt="shape" class="lazy-img shapes shape_01">
      <img src="/images/shape/shape_05.svg" alt="shape" class="lazy-img shapes shape_02">
		</div>
   <!-- block feature area end -->
  </div>
</template>

<script setup lang="ts">

const feature_data = [
  {
    id:1,
    icon:'/images/icon/icon_55.svg',
    title:'Expert Advisor',
    subtitle:'Elit esse cillum dolore eu fugiat nulla pariatur'
  },
  {
    id:2,
    icon:'/images/icon/icon_56.svg',
    title:'Effective Support',
    subtitle:'quis nostrud exerct ullamo ea nisi ut aliqui com dolor'
  },
  {
    id:3,
    icon:'/images/icon/icon_57.svg',
    title:'Low Fees',
    subtitle:'cupidatat non proident, sunt in culpa qui officia deserunt'
  },
  {
    id:4,
    icon:'/images/icon/icon_58.svg',
    title:'Loan Facility',
    subtitle:'quis nostrud exerct ullamo ea nisi ut aliqui com dolor'
  }
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
  },
  {
    id: 4,
    icon: "/images/icon/icon_40.svg",
    title: "Global Payment",
    desc: "Maximize convenience by paying for ads, subscriptions, and inventory with Mastercard®.",
  },
  {
    id: 5,
    icon: "/images/icon/icon_41.svg",
    title: "Multiple Currency",
    desc: "Use receiving accounts in a growing number of currencies and get paid like a local.",
  },
  {
    id: 6,
    icon: "/images/icon/icon_42.svg",
    title: "Online Payment",
    desc: "Use receiving accounts in a growing number of currencies and get paid like a local.",
  },
];
</script>