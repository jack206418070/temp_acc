<template>
  <div>
  <nuxt-layout name="layout-one">
    <!-- breadcrumb area start -->
    <breadcrumb-two
      title="Our Membership & pricing"
      subtitle="Find out the pricing for different service and products"
      page="Pricing"
      col="col-lg-7"
    />
    <!-- breadcrumb area end -->

    <!-- pricing area start -->
    <div class="pricing-section light-bg border-top pt-120 lg-pt-80 pb-150 lg-pb-80">
      <div class="container">
          <div class="row align-items-center">
              <div class="col-lg-7 text-center text-lg-start">
                  <div class="title-one">
                      <h2>Solo, Agency or team?</h2>
                  </div>
                  <!-- /.title-one -->
                  <p class="text-lg pt-10 m0">Find out the which plan match with your needs</p>
              </div>
              <div class="col-lg-5">
                  <nav class="pricing-nav d-flex justify-content-center justify-content-lg-end md-mt-40">
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <button class="nav-link active" id="nav-month-tab" data-bs-toggle="tab" data-bs-target="#nav-month" type="button" role="tab" aria-controls="nav-month" aria-selected="true">Monthly</button>
                          <button class="nav-link" id="nav-year-tab" data-bs-toggle="tab" data-bs-target="#nav-year" type="button" role="tab" aria-controls="nav-year" aria-selected="false">Yearly</button>
                      </div>
                  </nav>
              </div>
          </div>
          <div class="tab-content mt-50 md-mt-30">
              <div v-for="item in pricing_data" :key="item.id" :class="`tab-pane ${item.active?'show active':''}`" :id="item.id" role="tabpanel" :aria-labelledby="`${item.id}-tab`" tabindex="0">
                  <div class="row gx-xl-5"> 
                      <div v-for="pricing in item.pricing_box" :key="pricing.id" class="col-md-6 mb-65 md-mb-30">
                          <div class="pricing-card-one d-flex flex-column w-100 h-100 text-center">
                              <h2 class="fw-bold">{{pricing.title}}</h2>
                              <div class="row">
                                  <div class="col-xxl-9 m-auto">
                                      <p>{{pricing.subtitle}} <span>{{pricing.time}} premium market access</span></p>
                                  </div>
                              </div>
                              <div class="price-banner text-lg-start d-lg-flex justify-content-center align-items-center">
                                  <div class="price"><sup>$</sup> {{pricing.price}}</div>
                                  <div class="ps-lg-4">
                                      <strong class="text-lg fw-500">
                                        {{pricing.membership}} membership
                                      </strong>
                                      <span>Starting at $53/mo</span>
                                  </div>
                              </div>
                              <!-- /.price-banner -->
                              <ul class="style-none mb-35">
                                  <li v-for="(l,i) in pricing.lists" :key="i">{{l}}</li>
                              </ul>
                              <div class="action-btn text-center">Try us without risk. <a href="#">Choose Plan <i class="bi bi-chevron-right"></i></a></div>
                          </div>
                          <!-- /.pricing-card-one -->
                      </div>
                  </div>
              </div>
          </div>
          <!-- /.tab-content -->
          <div class="contact-banner position-relative">
              <img src="/images/assets/ils_04.svg" alt="" class="lazy-img shapes screen_01">
              <div class="row align-items-center justify-content-end">
                  <div class="col-lg-6">
                      <h2>Want a <span>custom pricing</span> plan for your business?</h2>
                  </div>
                  <div class="col-lg-4 text-center text-lg-end">
                      <nuxt-link href="/contact" class="btn-four">Let’s Talk</nuxt-link>
                  </div>
              </div>
          </div>
          <!-- /.contact-banner -->
      </div>
    </div>
    <!-- pricing area end -->

    <!-- fancy banner area start -->
    <fancy-banner-three></fancy-banner-three>
    <!-- fancy banner area end -->
    
  </nuxt-layout>
 </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Pricing - Babun" });

const pricing_data = [
  {
    id:'nav-month',
    active:true,
    pricing_box:[
      {
        id:1,
        subtitle:'For individuals and teams. Get',
        title:'Business',
        time:'1 month',
        price:'09',
        membership:'Monthly',
        lists:[
          '100% Better results',
          'Suspe Ndisse Suscipit Sagittis',
          'Review Credit Reports'
        ]
      },
      {
        id:2,
        subtitle:'For big agency & team, Get',
        title:'Agency',
        time:'1 month',
        price:'12',
        membership:'Monthly',
        lists:[
          '100% Better results',
          'Suspe Ndisse Suscipit Sagittis',
          'Review Credit Reports'
        ]
      },
    ]
  },
  {
    id:'nav-year',
    active:false,
    pricing_box:[
      {
        id:1,
        subtitle:'For individuals and teams. Get',
        title:'Business',
        time:'1 year',
        price:'99',
        membership:'Yearly',
        lists:[
          '100% Better results',
          'Suspe Ndisse Suscipit Sagittis',
          'Review Credit Reports'
        ]
      },
      {
        id:2,
        subtitle:'For big agency & team, Get',
        title:'Agency',
        time:'1 year',
        price:'129',
        membership:'Yearly',
        lists:[
          '100% Better results',
          'Suspe Ndisse Suscipit Sagittis',
          'Review Credit Reports'
        ]
      },
    ]
  },
]
</script>
