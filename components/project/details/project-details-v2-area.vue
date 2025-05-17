<template>
   <div class="project-details-two light-bg border-top pt-150 lg-pt-80 pb-95 lg-pb-60">
      <div class="container">
          <div class="bg-wrapper">
              <div class="row">
                  <div class="col-lg-7">
                      <div class="slider-wrapper">
                          <div id="imageCarousel" class="carousel slide h-100">
                              <div class="carousel-inner h-100">
                                  <div class="carousel-item h-100 active" style="background-image: url(/images/media/img_37.jpg);">
                                  </div>
                                  <div class="carousel-item h-100" style="background-image: url(/images/media/img_01.jpg);"></div>
                                  <div class="carousel-item h-100" style="background-image: url(/images/media/img_02.jpg);"></div>
                              </div>
                              <button class="carousel-control-prev" type="button"
                                  data-bs-target="#imageCarousel" data-bs-slide="prev">
                                  <i class="bi bi-chevron-left"></i>
                                  <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button"
                                  data-bs-target="#imageCarousel" data-bs-slide="next">
                                  <i class="bi bi-chevron-right"></i>
                                  <span class="visually-hidden">Next</span>
                              </button>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-5">
                      <div class="info-wrapper">
                          <h3 class="fw-bold">Details</h3>
                          <p class="pt-10 pb-5">The Internet advertising famous today behaved lately.</p>
                          <ul class="style-none list-meta">
                              <li class="d-flex align-items-center">
                                  <div class="icon">
                                    <img src="/images/icon/icon_85.svg" alt="" class="lazy-img">
                                  </div>
                                  <div class="ps-4">
                                      <div class="text1">Date</div>
                                      <span>23 July, 2022</span>
                                  </div>
                              </li>
                              <li class="d-flex align-items-center">
                                  <div class="icon">
                                    <img src="/images/icon/icon_88.svg" alt="" class="lazy-img">
                                  </div>
                                  <div class="ps-4">
                                      <div class="text1">Client Name</div>
                                      <span>Mariona Adisson, USA</span>
                                  </div>
                              </li>
                              <li class="d-flex align-items-center">
                                  <div class="icon">
                                    <img src="/images/icon/icon_89.svg" alt="" class="lazy-img">
                                  </div>
                                  <div class="ps-4">
                                      <div class="text1">Project Type</div>
                                      <span>Business Consulting</span>
                                  </div>
                              </li>
                          </ul>
                          <div class="social-share mt-40 d-flex">
                              <ul class="style-none d-flex align-items-center">
                                  <li>Share: </li>
                                  <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                                  <li><a href="#"><i class="bi bi-twitter"></i></a></li>
                                  <li><a href="#"><i class="bi bi-dribbble"></i></a></li>
                                  <li><a href="#"><i class="bi bi-instagram"></i></a></li>
                              </ul>
                          </div>
                      </div>
                      <!-- /.info-wrapper -->
                  </div>
              </div>
          </div>
        <div class="pagination-two border-0 mt-20">
        <ul class="style-none d-flex justify-content-between">
          <li>
            <a href="#">
              <span class="d-flex align-items-center align-items-md-end">
                <i class="bi bi-arrow-left"></i>
                <span class="ms-3 ms-md-4">
                  <span class="pr-dir text-uppercase d-block">Previous</span>
                  <span class="pr-name d-none d-md-block tran3s fw-500">Market Analysis.</span>
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="d-flex align-items-center text-end align-items-md-end">
                <span class="me-3 me-md-4">
                  <span class="pr-dir text-uppercase d-block">Next</span>
                  <span class="pr-name d-none d-md-block tran3s fw-500">Online Banking</span>
                </span>
                <i class="bi bi-arrow-right"></i>
              </span>
            </a>
          </li>
         </ul>
        </div>
        <!-- /.pagination-two -->
    </div>
  </div>
</template>

<script setup lang="ts">

</script>