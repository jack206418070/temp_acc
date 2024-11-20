<template>
  <div class="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
			<div class="container">
				<div class="row">
            <div class="">
						<div class="details-meta ps-xxl-5 ps-xl-3">
						
							<h3>多元陪伴照護服務</h3>
							<p>多元陪伴照護不僅能提升生活品質,還能創造溫馨的照護環境。通過專業且富有同理心的陪伴,我們致力於為每位服務對象帶來身心靈的全面關懷。</p>
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
							
							<h2>申請服務流程</h2>
							<h3>申請服務流程</h3>
							<p>多元陪伴照護指南 - 我們相信,優質的陪伴照護不僅能提升生活品質,還能為服務對象帶來情感支援和心靈慰藉。通過細心觀察、耐心傾聽和真誠互動,我們致力於為每位服務對象打造溫馨舒適的生活環境。</p>
							<ul class="style-none list-item pb-20">
								<li>建立信任關係</li>
								<li>提供情感支援</li>
								<li>協助日常生活</li>
								<li>促進社交互動</li>
								<li>鼓勵健康生活方式</li>
							</ul>
							<p>我們的專業陪伴照護團隊致力於提供個性化的服務,讓每位服務對象都能感受到被尊重、被理解和被關愛,共同創造美好的生活體驗。</p>
						</div>
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
    title:'個性化評估',
    subtitle:'我們深入了解每位服務對象的需求,制定專屬陪伴計劃'
  },
  {
    id:2,
    icon:"/images/icon/icon_82.svg",
    title:'貼心陪伴',
    subtitle:'提供專業且富有同理心的陪伴服務,創造溫馨氛圍'
  },
  {
    id:3,
    icon:"/images/icon/icon_83.svg",
    title:'持續關懷',
    subtitle:'定期評估並調整服務內容,確保最佳陪伴效果'
  }
];

</script>