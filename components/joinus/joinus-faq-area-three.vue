<template>
  <div class="faq-section-three light-bg border-top pt-120 lg-pt-80 pb-150 lg-pb-80">
      <div class="container">
          <nav>
              <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab">All</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-marketing" type="button" role="tab" >Marketing</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-banking" type="button" role="tab" >Banking</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-finance" type="button" role="tab" >Finance</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-payment" type="button" role="tab" >Payments</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-terms" type="button" role="tab" >Terms & Conditions</button>
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-account" type="button" role="tab" >Account</button>
              </div>
          </nav>
          <div class="tab-content mt-60 lg-mt-40">
              <div class="tab-pane fade show active" id="nav-all" role="tabpanel" tabindex="0">
                  <div class="accordion accordion-style-one" id="accordionOne">
                  <faq-item id='one' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                  <faq-item :isShow="true" id='two' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                  <faq-item id='three' title='What do you look for in a founding team?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                  <faq-item id='four' title='Do you recommend Pay as you go or Pre pay?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                  <faq-item id='five' title='What do I get for $0 with my plan?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                  <faq-item id='six' title='What do you look for in a founding team?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionOne' />
                </div>
              </div>


                <div class="tab-pane fade" id="nav-marketing" role="tabpanel" tabindex="0">
                  <div class="accordion accordion-style-one" id="accordionTwo">
                  <faq-item id='nine' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                  <faq-item id='ten' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                </div>
              </div>

              <div class="tab-pane fade" id="nav-banking" role="tabpanel" tabindex="0">
                  <div class="accordion accordion-style-one" id="accordionThree">
                    <faq-item id='seven' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionThree' />
                    <faq-item id='eight' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionThree' />
                  </div>
              </div>

              <div class="tab-pane fade" id="nav-finance" role="tabpanel" tabindex="0">
                <div class="accordion accordion-style-one" id="accordionFour">
                <faq-item id='eleven' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFour' />
                <faq-item id='twelve' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFour' />
              </div>
            </div>

            <div class="tab-pane fade" id="nav-payment" role="tabpanel" tabindex="0">
              <div class="accordion accordion-style-one" id="accordionFive">
                <faq-item id='thirteen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFive' />
                <faq-item id='fourteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFive' />
              </div>
            </div>

              <div class="tab-pane fade" id="nav-terms" role="tabpanel" tabindex="0">
                  <div class="accordion accordion-style-one" id="accordionSix">
                  <faq-item id='fifteen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
                  <faq-item id='sixteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
                </div>
            </div>

            <div class="tab-pane fade" id="nav-account" role="tabpanel" tabindex="0">
              <div class="accordion accordion-style-one" id="accordionSeven">
                <faq-item id='seventeen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSeven' />
                <faq-item id='eighteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSeven' />
              </div>
            </div>
          </div>
          <!-- /.tab-content -->

          <div class="text-center mt-60 lg-mt-50">
              <h2 class="fs-1 mb-30">Don’t get your answer?</h2>
              <nuxt-link href="/contact" class="btn-four">Contact Us</nuxt-link>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">

</script>