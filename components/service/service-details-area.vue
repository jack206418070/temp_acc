<template>
  <div class="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
			<div class="container">
				<div class="row">
            <div class="col-xxl-9 col-lg-8 order-lg-last">
						<div class="details-meta ps-xxl-5 ps-xl-3">
							<h2>Multiple Accounts for flexible banking.</h2>
							<p>Risk management and compliance, when approached strategically, have the potential to go beyond mitigating threats and protecting a company’s operations and reputation.They can actually generate value and create opportunities. </p>
							<p>Our dedicated risk and compliance consulting team assists clients in transforming uncertainty into advantageous prospects. We work collaboratively with organizations to identify and leverage the potential within their risk and compliance functions, enabling them to thrive in an ever-changing business landscape.</p>
							<div class="img-meta mb-60 lg-mb-40">
                <img src="/images/media/img_35.jpg" alt="" class="lazy-img w-100 rounded-4">
              </div>
							<h3>Our Processing.</h3>
							<p>Risk management and compliance, when approached strategically, have the potential to go beyond mitigating threats and protecting a company’s operations and reputation.</p>
							<div class="line-wrapper pb-30 mt-60 lg-mt-40 mb-70 lg-mb-40">
								<div class="row">
									
									<div v-for="(item,i) in process_data" :key="item.id" class="col-md-4 wow fadeInUp" :data-wow-delay="`0.${i}s`">
										<div class="card-style-sixteen text-center mt-40">
											<div class="icon m-auto tran3s rounded-circle d-flex align-items-center justify-content-center">
                        <img :src="item.icon" alt="" class="lazy-img">
                      </div>
											<h4 class="fw-bold mt-35 lg-mt-30 mb-15">{{item.title}}</h4>
											<p class="m0">{{item.subtitle}}</p>
										</div>
										<!-- /.card-style-sixteen -->
									</div>

								</div>
							</div>
							<div class="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
								<div class="d-xl-flex align-items-start">
									<img src="/images/icon/icon_84.svg" alt="" class="lazy-img icon">
									<div class="ps-xl-5">
										<blockquote>Quick solutions coupled with extraordinary performance— a recommendation that's great though.</blockquote>
										<div><span class="fw-bold">James Bond.</span> USA</div>
									</div>
								</div>
								<img src="/images/assets/ils_03.svg" alt="" class="lazy-img shapes shape_01">
							</div>
							<h3>Qualifications & Requirements</h3>
							<p>Risk management and compliance, when approached strategically, have the potential to go beyond mitigating threats and protecting a company’s operations and reputation. They can actually generate value and create opportunities. </p>
							<ul class="style-none list-item pb-20">
								<li>Need to be 18+</li>
								<li>Require valid passport, driving license or national ID.</li>
								<li>Need to be a job holder</li>
								<li>Must be citizen of republic of United States</li>
								<li>2 copy passport size photo.</li>
							</ul>
							<p>Our dedicated risk and compliance consulting team assists clients in transforming uncertainty into advantageous prospects.</p>
						</div>
            </div>
              <div class="col-xxl-3 col-lg-4 order-lg-first">
                  <aside class="md-mt-40">
                      <div class="service-nav-item">
                          <ul class="style-none">
                              <li v-for="(item) in nav_data" :key="item.id">
                                <a href="" :class="`d-flex align-items-center w-100 ${item.id === 1 ? 'active' : ''}`">
                                  <img :src="item.icon" alt="icon" class="lazy-img">
                                  <span>{{item.title}}</span>
                                </a>
                              </li>
                          </ul>
                      </div>
                     <div class="contact-banner text-center mt-40 lg-mt-20">
                      <h3 class="mb-20">Any Questions? Let’s talk</h3>
                      <nuxt-link href="/contact" class="tran3s fw-500">Let’s Talk</nuxt-link>
                    </div>
                    <!-- /.contact-banner -->
                  </aside>
              </div>
          </div>
			</div>
		</div>
</template>

<script setup lang="ts">

const process_data = [
  {
    id:1,
    icon:"/images/icon/icon_81.svg",
    title:'Collect Doc',
    subtitle:'We collect require documents & send for check'
  },
  {
    id:2,
    icon:"/images/icon/icon_82.svg",
    title:'Check & Finalize',
    subtitle:'We check the documents & send for final approval'
  },
  {
    id:3,
    icon:"/images/icon/icon_83.svg",
    title:'Approved',
    subtitle:'After approve you ready to use your accounts'
  }
];

const nav_data = [
  {
    id:1,
    icon:'/images/icon/icon_72.svg',
    title:'Multiple Accounts'
  },
  {
    id:2,
    icon:'/images/icon/icon_73.svg',
    title:'Loan Facility'
  },
  {
    id:3,
    icon:'/images/icon/icon_74.svg',
    title:'Expense Track'
  },
  {
    id:4,
    icon:'/images/icon/icon_75.svg',
    title:'DPS & FDR'
  },
  {
    id:5,
    icon:'/images/icon/icon_76.svg',
    title:'International Account'
  },
  {
    id:6,
    icon:'/images/icon/icon_77.svg',
    title:'Saving Account'
  },
  {
    id:7,
    icon:'/images/icon/icon_78.svg',
    title:'Agent Banking'
  },
  {
    id:8,
    icon:'/images/icon/icon_79.svg',
    title:'Credit & Debit Cards'
  },
  {
    id:9,
    icon:'/images/icon/icon_80.svg',
    title:'Consultation'
  }
]
</script>