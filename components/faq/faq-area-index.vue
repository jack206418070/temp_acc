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
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    isShow: true,
  },
  {
    id: "Two",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "Three",
    title: "What do you look for in a founding team?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "Four",
    title: "Do you recommend Pay as you go or Pre pay?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "Five",
    title: "What do I get for $0 with my plan?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
]

</script>
