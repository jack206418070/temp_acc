<template>
  <div>

  <!-- block feature one start -->
  <div class="block-feature-ten position-relative mt-150 lg-mt-80 pb-100 lg-pb-60">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8 wow fadeInUp">
          <div class="title-one mb-50 lg-mb-20">
            <h2>Complete Banking solution with great Facility.</h2>
          </div>
          <!-- /.title-one -->
        </div>
      </div>
      <div class="line-wrapper position-relative">
          <div class="row gx-lg-5">
              
              <div v-for="(item,i) in feature_data" :key="item.id" class="col-xl-4 col-md-6 wow fadeInUp" :data-wow-delay="`0.${i}s`">
                  <div class="card-style-sixteen d-flex mt-60 lg-mt-40 mb-60 lg-mb-10">
                      <div class="icon tran3s rounded-circle d-flex align-items-center justify-content-center">
                        <img :src="item.icon" alt="icon" class="lazy-img">
                        </div>
                      <div class="text">
                          <h4 class="fw-bold mb-20 sm-mb-10">{{item.title}}</h4>
                          <p class="m0">{{item.text}}</p>
                      </div>
                  </div>
                  <!-- /.card-style-sixteen -->
              </div>
              
          </div>
      </div>
    </div>
    <img src="/images/shape/shape_05.svg" alt="" class="lazy-img shapes shape_01">
  </div>
   <!-- block feature one end -->

   <!-- block feature two start -->
   <div class="block-feature-six bg-two position-relative pt-150 lg-pt-60 pb-120 lg-pb-40">
			<div class="container">
				<div class="row gx-lg-5">
					<div class="col-lg-4 wow fadeInLeft">
						<div class="title-one">
							<h2>Our Featured products.</h2>
						</div>
						<!-- /.title-one -->
              <p class="text-lg text-dark mt-40 md-mt-20 mb-35 md-mb-30">Inciddnt ut labore et dolor magna aliu. ad mim venam, quis nostru </p>
              <nuxt-link href="/contact" class="btn-eleven d-inline-flex align-items-center md-mb-60">
							<span class="text">Contact Us</span>
							<div class="icon tran3s rounded-circle d-flex align-items-center">
                <img src="/images/icon/icon_27.svg" alt="" class="lazy-img">
              </div>
              </nuxt-link>
					</div>
          <div class="col-lg-8">
              <div class="row">
                  
                  <div v-for="(item,i) in service_data" :key="item.id" class="col-md-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
                      <div class="card-style-eight rounded-5 vstack tran3s w-100 mb-30 active">
                          <div class="icon d-flex align-items-center">
                            <img :src="item.icon" alt="" class="lazy-img">
                          </div>
                          <h4 class="fw-bold mt-30 mb-20">{{item.title}}</h4>
                          <p>{{item.desc}}</p>
                          <nuxt-link href="/service-details" class="stretched-link"></nuxt-link>
                      </div>
                      <!-- /.card-style-eight -->
                  </div>
                  
              </div>
          </div>
				</div>

			</div>
			<img src="/images/shape/shape_11.svg" alt="shape" class="lazy-img shapes shape_01">
			<img src="/images/shape/shape_12.svg" alt="shape" class="lazy-img shapes shape_02">
		</div>
   <!-- block feature two end -->

  </div>
</template>

<script setup lang="ts">

const feature_data = [
  {
    id:1,
    icon:'/images/icon/icon_62.svg',
    title:'Multiple Account',
    text:'Effortless payments and transfers with our streamlined banking process.'
  },
  {
    id:2,
    icon:'/images/icon/icon_63.svg',
    title:'Loan Facility',
    text:'Earning potential grows with dedication, innovation, & with our instruction from expert.'
  },
  {
    id:3,
    icon:'/images/icon/icon_64.svg',
    title:'Expense Track',
    text:'Strengthen budgeting through precise and instinctive monitoring of your expenses.'
  },
  {
    id:4,
    icon:'/images/icon/icon_65.svg',
    title:'DPS & FDR',
    text:'Achieve lasting dreams through disciplined savings & a thoughtful investment approach.'
  },
  {
    id:5,
    icon:'/images/icon/icon_66.svg',
    title:'International Account',
    text:'Achieve lasting dreams through disciplined savings and a thoughtful investment approach.'
  },
  {
    id:6,
    icon:'/images/icon/icon_67.svg',
    title:'Credit Card ',
    text:'Strengthen budgeting through precise and instinctive monitoring of your expenses.'
  }
];

const service_data = [
{
    id:1,
    icon:'/images/icon/icon_32.svg',
    title:'Agent Banking',
    desc:'Stay updated, check your bank account to manage funds and track transactions securely.',
  },
  {
    id:2,
    icon:'/images/icon/icon_33.svg',
    title:'Savings Account',
    desc:'Securely save money, earn interest with a dedicated savings account.',
  },
  {
    id:3,
    icon:'/images/icon/icon_34.svg',
    title:'Low Interest',
    desc:'Bank yields meager interest, limiting earnings on deposited funds and investments.',
  },
  {
    id:11,
    icon:'/images/icon/icon_35.svg',
    title:'Multiple Cards.',
    desc:'Bank cards offer easy payments and cash withdrawals, enhancing financial accessibility.',
  }
]
</script>