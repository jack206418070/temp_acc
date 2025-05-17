<template>
  <div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80">
    <div class="container">
      <div class="row gx-xl-5">
        <div class="col-lg-8">
          <article class="blog-meta-two style-two">
            <figure
              class="post-img position-relative d-flex align-items-end m0"
              style="background-image: url(/images/blog/blog_img_08.jpg)"
            >
              <div class="date">{{blog.date}}</div>
            </figure>
            <div class="post-data">
              <div class="post-info">{{blog.post_info}}</div>
              <div class="blog-title">
                <h4>{{blog.title}}</h4>
              </div>
              <div class="post-details-meta">
                <p>
                  Tomfoolery crikey bits and bobs brilliant bamboozled down the
                  pub amongst brolly hanky panky, cack bonnet arse over tit
                  burke bugger all mate bodge. cillum dolore fugiat pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui official deserunt mollit anim id est laborum.Suspendisse
                  interdum consectetur libero id faucib nisl. Lacus vel
                  facilisis volutpat est velit egestas.
                </p>
                <p>
                  Tempus imperdiet nulla malesuada pellentesque elit eget
                  gravida cum. Sit amet ris nullam eget felis. Enim praesent
                  elementum facilisis leo. Ultricies leo integer.
                </p>
                <div class="quote-wrapper">
                  <div class="wrapper">
                    <div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <img src="/images/icon/icon_93.svg" alt="" class="lazy-img"/>
                    </div>
                    <div class="row">
                      <div class="col-xxl-9 col-xl-11 m-auto">
                        <h3>
                          Grow wealth like a tree, roots in savings, branches
                          reaching toward diverse investments.
                        </h3>
                      </div>
                    </div>
                    <h6>James Bond. <span>Founder Agro</span></h6>
                  </div>
                </div>
                <div class="row img-gallery">
                  <div class="col-sm-8">
                    <img src="/images/blog/blog_img_16.jpg" alt="" class="lazy-img w-100"/>
                  </div>
                  <div class="col-sm-4">
                    <img src="/images/blog/blog_img_17.jpg" alt="" class="lazy-img w-100"/>
                  </div>
                </div>
                <h3>Work Harder & Gain Success</h3>
                <p>
                  One touch of a red-hot stove is usually all we need to avoid
                  that kind of discomfort in quis elit future. The same Duis
                  aute irure dolor in reprehenderit.
                </p>
                <ul class="style-none list-item">
                  <li>Find the problem first</li>
                  <li>Make research and find out the solution</li>
                  <li>Finalize the solution & apply.</li>
                </ul>
                <p>
                  One touch of a red-hot stove is usually all we need to avoid
                  that kind of discomfort in quis elit future. The same Duis
                  aute irure dolor in reprehenderit. sunt in culpa qui official
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <!-- /.post-details-meta -->
              <div class="bottom-widget d-sm-flex align-items-center justify-content-between">
                <ul class="d-flex align-items-center tags style-none pt-20">
                  <li>Tag:</li>
                  <li><a href="#">Finance</a></li>
                  <li><a href="#">Loan</a></li>
                  <li><a href="#">Banking</a></li>
                </ul>
                <ul class="d-flex share-icon align-items-center style-none pt-20">
                  <li>Share:</li>
                  <li>
                    <a href="#"><i class="bi bi-facebook"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="bi bi-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="bi bi-instagram"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /.post-data -->
          </article>
          <!-- /.blog-meta-two -->
          <div class="blog-comment-area grey-bg">
            <h3 class="blog-inner-title pb-15">Comments</h3>
            <div class="comment d-flex">
              <img src="/images/blog/avatar_01.jpg" alt="" class="lazy-img user-avatar rounded-circle"/>
              <div class="comment-text">
                <div class="d-md-flex align-items-center justify-content-between">
                  <div class="name fw-500">Kudilum Ahus</div>
                  <div class="date">13 June, 23, 7:30pm</div>
                </div>
                <p>
                  Sunt in culpa qui official deserunt mollit anim id est
                  laborum.Suspendisse interdum consectetur libero id faucib
                  nisl. Lacus vel facilisis volutpat est velit egestas.
                </p>
                <a href="#" class="reply-btn fw-500 tran3s">Reply</a>
                <div class="comment reply-comment d-flex">
                  <img src="/images/blog/avatar_01.jpg" alt="" class="lazy-img user-avatar rounded-circle"
                  />
                  <div class="comment-text">
                    <div class="d-md-flex align-items-center justify-content-between">
                      <div class="name fw-500">Rashed Kabir</div>
                      <div class="date">13 June, 23, 7:30pm</div>
                    </div>
                    <p>
                      The same Duis aute irure dolor in reprehenderit. sunt in
                      culpa qui official deserunt mollit anim id est laborum.
                    </p>
                    <a href="#" class="reply-btn fw-500 tran3s">Reply</a>
                  </div>
                  <!-- /.comment-text -->
                </div>
                <!-- /.comment -->
              </div>
              <!-- /.comment-text -->
            </div>
            <!-- /.comment -->
            <div class="comment d-flex">
              <img src="/images/blog/avatar_02.jpg" alt="" class="lazy-img user-avatar rounded-circle"/>
              <div class="comment-text">
                <div class="d-md-flex align-items-center justify-content-between">
                  <div class="name fw-500">Jubayer Al Hasan</div>
                  <div class="date">13 June, 23, 7:30pm</div>
                </div>
                <p>
                  Tempus imperdiet nulla malesuada pellentesque elit eget
                  gravida cum. Sit amet ris nullam eget felis.
                </p>
                <a href="#" class="reply-btn fw-500 tran3s">Reply</a>
              </div>
              <!-- /.comment-text -->
            </div>
            <!-- /.comment -->
          </div>
          <!-- /.blog-comment-area -->
          <div class="blog-comment-form grey-bg">
            <h3 class="blog-inner-title">Add Your Comments</h3>
            <p>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                class="text-decoration-underline fw-500">
                 Sign in
              </a>
              to post your comment or signup if you don't have any account.
            </p>
            <form-blog-comment></form-blog-comment>
          </div>
          <!-- /.blog-comment-form -->
        </div>

        <div class="col-lg-4 col-md-8">
          <!-- blog-sidebar -->
          <blog-sidebar></blog-sidebar>
          <!-- /.blog-sidebar -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IBlog } from "@/types/blog-d-t";

defineProps<{blog:IBlog}>();
</script>
