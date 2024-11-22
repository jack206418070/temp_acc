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
    title: "什麼是多元陪伴照顧服務?",
    desc: "此為示意文字,實際文字內容待更新",
    isShow: true,
  },
  {
    id: "Two",
    title: "如何收費?",
    desc: "此為示意文字,實際文字內容待更新",
  },
  {
    id: "Three",
    title: "服務安全嗎?",
    desc: "此為示意文字,實際文字內容待更新",
  },
  {
    id: "Four",
    title: "試辦單位做什麼?",
    desc: "此為示意文字,實際文字內容待更新",
  },
  {
    id: "Five",
    title: "如何預約喘息?",
    desc: "此為示意文字,實際文字內容待更新",
  },
]

</script>
