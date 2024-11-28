<template>
  <div
    class="faq-section-three light-bg border-top pt-120 lg-pt-80 pb-150 lg-pb-80"
  >
    <div class="container">
      <nav>
        <div
          class="nav nav-tabs justify-content-center"
          id="nav-tab"
          role="tablist"
        >
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#nav-all"
            type="button"
            role="tab"
          >
            全部
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#nav-services"
            type="button"
            role="tab"
          >
            想申請服務
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#nav-unit"
            type="button"
            role="tab"
          >
            想成為試辦單位
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#nav-service-unit"
            type="button"
            role="tab"
          >
            我是私立就業服務機構
          </button>
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#nav-worker"
            type="button"
            role="tab"
          >
            我是多元陪伴照顧服務工作者
          </button>
        </div>
      </nav>
      <div class="tab-content mt-60 lg-mt-40">
        <div
          class="tab-pane fade show active"
          id="nav-all"
          role="tabpanel"
          tabindex="0"
        >
          <div class="accordion accordion-style-one" id="accordionOne">
            <faq-item
              id="nine"
              title="申請服務需要準備哪些文件？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="ten"
              title="申請流程需要多久時間？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m3"
              title="可以線上申請嗎？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m4"
              title="申請被拒絕後，多久可以再次申請？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m5"
              title="申請通過後，何時可以開始使用服務？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />
            <faq-item
              id="seven"
              title="成為試辦單位需要具備哪些條件？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="eight"
              title="試辦計畫的期程多長？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot1"
              title="試辦期間會獲得哪些支援？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot2"
              title="如何申請成為試辦單位？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot3"
              title="試辦單位的評核標準是什麼？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="nav-services"
          role="tabpanel"
          tabindex="0"
        >
          <div class="accordion accordion-style-one" id="accordionTwo">
            <faq-item
              id="nine"
              title="申請服務需要準備哪些文件？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="ten"
              title="申請流程需要多久時間？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m3"
              title="可以線上申請嗎？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m4"
              title="申請被拒絕後，多久可以再次申請？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />

            <faq-item
              id="m5"
              title="申請通過後，何時可以開始使用服務？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionTwo"
            />
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="nav-unit"
          role="tabpanel"
          tabindex="0"
        >
          <div class="accordion accordion-style-one" id="accordionThree">
            <faq-item
              id="seven"
              title="成為試辦單位需要具備哪些條件？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="eight"
              title="試辦計畫的期程多長？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot1"
              title="試辦期間會獲得哪些支援？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot2"
              title="如何申請成為試辦單位？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
            <faq-item
              id="pilot3"
              title="試辦單位的評核標準是什麼？"
              desc="此為示意文字,實際文字內容待更新"
              parent="accordionThree"
            />
          </div>
        </div>

      </div>
      <div class="text-center mt-60 lg-mt-50">
        <h2 class="fs-1 mb-30">找不到資訊嗎？</h2>
        <nuxt-link href="/contact" class="btn-four">聯絡我們</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.faq-section-three {
  padding-top: 60px; /* 原本的 120px 改小一點 */
  padding-bottom: 60px; /* 原本的 150px 改小一點 */
}

.nav-tabs {
  margin-top: 20px; /* 減少上方間距 */
}

.nav-tabs .nav-link {
  padding: 10px 15px; /* 如果需要，可以進一步減小按鈕的內部填充 */
}

.faq-section-three .nav-tabs .nav-link.active {
  background-color: #626161 !important; /* 使用 !important 确保覆盖默认样式 */
  color: #fff !important;
  border-color: #626161 !important;
}

.container {
  max-width: 1200px; /* 如果需要進一步縮小整體寬度，這裡可以調整 */
}

</style>