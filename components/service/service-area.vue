<template>
  <div>

    <!-- 特色區塊開始 -->
   <div class="block-feature-one position-relative light-bg-deep  lg-mt-60 pt-120 lg-pt-60 pb-130 lg-pb-60">
			<div class="container">
				<div class="position-relative">
					<div class="title-one text-center mb-40 lg-mb-10">
              <h2>服務內容</h2>
              
          </div>
					<div class="row">
						
						<div v-for="(item,i) in service_data" :key="item.id" class="col-lg-4 col-md-6 d-flex wow fadeInUp" :data-wow-delay="`0.${i}s`">
							<div class="card-style-two vstack tran3s w-100 mt-30">
               
								<h4 class="fw-bold mt-30 mb-25">{{item.title}}</h4>
								<p class="mb-20">{{item.desc}}</p>
								
							</div>
							<!-- /.card-style-two -->
						</div>
						
					</div>
				</div>
			</div>
      <img src="/images/shape/shape_05.svg" alt="shape" class="lazy-img shapes shape_01">
      <img src="/images/shape/shape_05.svg" alt="shape" class="lazy-img shapes shape_02">
		</div>
   <!-- 特色區塊結束 -->

   

   


   
  </div>
  
</template>

<script setup lang="ts">

const service_data = [
  {
    id:1,
    icon:'/images/icon/icon_06.svg',
    title:'彈性服務時間',
    desc:'單次服務時數至少4小時以上',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'基本日常生活照顧',
    desc:'提供日常生活協助，保障被服務民眾健康與生活品質。',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'陪同外出',
    desc:'提供專業人員陪同外出，安心又便利。',
  },
  {
    id:4,
    icon:'/images/icon/icon_08.svg',
    title:'陪同就醫',
    desc:'貼心陪同就醫，安心守護健康、安心看診。',
  },
  {
    id:5,
    icon:'/images/icon/icon_08.svg',
    title:'安全陪伴',
    desc:'安全陪伴服務，保障健康、專業支援，守護家人安心。',
  },
  {
    id:6,
    icon:'/images/icon/icon_08.svg',
    title:'定期督導',
    desc:'此為示意文字,實際文字內容待更新。',
  },
  
];
</script>
