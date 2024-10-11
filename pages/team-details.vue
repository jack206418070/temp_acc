<template>
 <div>
  <nuxt-layout name="layout-one">
    <!-- breadcrumb area start -->
    <breadcrumb-two
      title="Our Talented Experts"
      subtitle="Meet our experts, guiding through financial intricacies with precision"
      page="Team"
      col="col-xxl-7 col-xl-6"
    />
    <!-- breadcrumb area end -->

    <!-- team details area start -->
    <div class="team-details light-bg border-top pt-120 lg-pt-80 pb-150 lg-pb-80">
      <div class="container">
        <div class="bg-wrapper">
          <div class="row">
            <div class="col-lg-4">
              <div class="member-img" style="background-image: url(/images/media/img_46.jpg)">
            </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="pt-45 pb-45 ps-xl-4 ps-lg-0 ps-3 pe-xl-4 pe-lg-3 pe-3 border-right h-100">
                <h2 class="name fw-bold">Mathews Firlo.</h2>
                <div class="post">Founder & CEO</div>
                <h6 class="fw-bold">About Firlo.</h6>
                <p>
                  Before establishing Beratung in 2001, Mathew founded two
                  Silicon Valley internet companies and later held management
                  roles at Salomon in New York.
                </p>
                <div class="social-share pt-35">
                  <ul class="style-none d-flex align-items-center">
                    <li>
                      <a href="#"><i class="bi bi-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bi bi-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bi bi-dribbble"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="bi bi-instagram"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="pt-45 pb-45 ps-xl-4 ps-lg-0 ps-3 pe-xl-4 pe-lg-0 pe-3">
                <h3>Details</h3>
                <table class="w-100 mt-25 lg-mt-20">
                  <tr>
                    <td>Location:</td>
                    <td>Spain, Barcelona</td>
                  </tr>
                  <tr>
                    <td>Position:</td>
                    <td>Founder & CEO</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>mathfir@support.com</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>28</td>
                  </tr>
                  <tr>
                    <td>Qualification:</td>
                    <td>Master Degree</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>Male</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- team details area end -->

    <!-- fancy banner area start -->
    <fancy-banner-three></fancy-banner-three>
    <!-- fancy banner area end -->
  </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
useSeoMeta({ title: "Team Details - Babun" });
</script>
