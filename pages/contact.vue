<template>
  <div>
    <!-- breadcrumb area start -->
    <breadcrumb-one
      title="聯絡我們"
      subtitle="Get our all info and also can message us directly from here"
      page="聯絡我們"
      shape="/images/shape/shape_33.svg"
    />
    <!-- breadcrumb area end -->

    <!-- contact area start -->
    <div class="contact-us-section pt-150 lg-pt-80">
      <div class="container">
        <div class="position-relative">
          <div class="row">
            <div class="col-12 m-auto">
              <div class="row">
                <div class="col-md-4">
                  <div class="address-block-one text-center mb-40 wow fadeInUp">
                    <div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <img src="/images/icon/icon_90.svg" alt="" class="lazy-img"/>
                    </div>
                    <h5 class="title">Our Address</h5>
                    <p>1012 Pebda Parkway, Mirpur 2 <br />Dhaka, Bangladesh</p>
                  </div>
                  <!-- /.address-block-one -->
                </div>
                <div class="col-md-4">
                  <div class="address-block-one text-center mb-40 wow fadeInUp">
                    <div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <img src="/images/icon/icon_91.svg" alt="" class="lazy-img"/>
                    </div>
                    <h5 class="title">Contact Info</h5>
                    <p> Open a chat or give us call at <br />
                    <a href="tel:310.841.5500" class="call text-lg fw-500">310.841.5500</a>
                    </p>
                  </div>
                  <!-- /.address-block-one -->
                </div>
                <div class="col-md-4">
                  <div class="address-block-one text-center mb-40 wow fadeInUp">
                    <div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <img src="/images/icon/icon_92.svg" alt="" class="lazy-img"/>
                    </div>
                    <h5 class="title">Live Support</h5>
                    <p> live chat service <br />
                    <a href="#" class="webaddress">www.babunlivechat.com</a>
                    </p>
                  </div>
                  <!-- /.address-block-one -->
                </div>
              </div>
            </div>
          </div>

          <div class="bg-wrapper light-bg mt-80 lg-mt-40">
            <div class="row">
              <div class="col-lg-5">
                <div class="d-flex flex-column flex-lg-column-reverse">
                  <div class="row">
                    <div class="col-md-8 col-6 me-auto ms-auto">
                      <img src="/images/assets/ils_07.svg" alt="" class="lazy-img me-auto ms-auto"/>
                    </div>
                  </div>
                  <div class="title-one text-center text-lg-start md-mt-20 mb-70 md-mb-30">
                    <h2>Have inquiries? Reach out via message</h2>
                  </div>
                  <!-- /.title-one -->
                </div>
              </div>
              <div class="col-lg-7">
                <div class="form-style-one ps-xl-5">
                  <form-contact></form-contact>
                </div>
                <!-- /.form-style-one -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map-banner mt-120 lg-mt-80">
        <div class="gmap_canvas h-100 w-100">
          <iframe
            class="gmap_iframe h-100 w-100"
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=dhaka collage&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
    <!-- contact area end -->

    <!-- news letter area start -->
    <newsletter-one />
    <!-- news letter area end -->
  </div>
  
</template>

<script setup lang="ts">
useSeoMeta({ title: "Contact - Babun" });
</script>
