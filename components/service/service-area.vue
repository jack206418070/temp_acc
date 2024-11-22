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
    title:'多元陪伴',
    desc:'單次服務時數至少4小時以上',
  },
  {
    id:2,
    icon:'/images/icon/icon_07.svg',
    title:'多元支援',
    desc:'如為24小時者須內含10小時休息時數',
  },
  {
    id:3,
    icon:'/images/icon/icon_08.svg',
    title:'彈性時數',
    desc:'應依勞動基準法規範按服務對象需求調整服務時數。',
  },
  {
    id:4,
    icon:'/images/icon/icon_08.svg',
    title:'客製要求',
    desc:'民眾可依個別化需求,彈性選擇所需服務方式與時間。',
  },
  {
    id:5,
    icon:'/images/icon/icon_08.svg',
    title:'快速回應',
    desc:'線上系統快速回覆申請結果,系統服務全年無休。',
  },
  {
    id:6,
    icon:'/images/icon/icon_08.svg',
    title:'定期督導',
    desc:'試辦單位督導員定期家訪,協助解決問題,維護勞雇權益。',
  },
  
];
</script>