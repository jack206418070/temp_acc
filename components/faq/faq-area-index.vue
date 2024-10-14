<template>
   <div :class="`faq-section-one ${spacing?spacing:'mt-150 lg-mt-120 md-mt-80'}`">
			<div class="container">
				<div class="row">
					<div class="col-lg-5 wow fadeInLeft">
						<div class="title-one mb-40 lg-mb-20">
							<h2>常見問題</h2>
						</div>
						<!-- /.title-one -->
						<p class="text-lg mb-40 lg-mb-20">常見問題查找</p>
						<nuxt-link href="/contact" class="btn-four">聯絡我們</nuxt-link>
					</div>

					<div class="col-lg-7">
						<div class="accordion accordion-style-one mt-15 md-mt-50" id="accordionOne">
              <faq-item v-for="item in faq_data" :key="item.id" :id="item.id" :title="item.title" :desc="item.desc" :isShow="item.isShow" parent="accordionOne" />
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
defineProps<{spacing?:string}>();

const faq_data = [
  {
    id: "One",
    title: "什麼是互助喘息?",
    desc: "互助喘息是1名照顧服務員+1位照顧者志工共同照顧4~6位長輩照顧者只要每排1次班，我們就幫您照顧長輩2次(一日8小時)",
    isShow: true,
  },
  {
    id: "Two",
    title: "互助喘息如何收費?",
    desc: "基於使用者付費原則，本計畫依政府長照2.0「巷弄長照站臨托服務」自負額計價，每天次收費依形式-半日型為82元/次、全日型為218元/次，包含：臨托費、餐食費、活動材料費，請於使用喘息服務當日繳交。全日型若取消訂餐，恕不退費。",
  },
  {
    id: "Three",
    title: "互助喘息安全嗎?",
    desc: "我們對於緊急事件的預防和處理有一套完整處理流程同時，每個據點的場地都有投保公共意外責任險我們希望每位參與的照顧者都能夠安心、放心地去喘息。",
  },
  {
    id: "Four",
    title: "來排班要做什麼?",
    desc: "照顧者來到現場只需要協助安全看視、陪伴長輩其餘如：身體照顧、活動帶領等工作都會由現場照顧服務員進行，即使沒有照顧的經驗也完全沒問題!",
  },
  {
    id: "Five",
    title: "如何預約喘息?",
    desc: "請參照服務流程，註冊帳號預約喘息或換工服務，若有任何問題，歡迎洽詢0800-50-7272電話詢問，謝謝。",
  },
]

</script>
