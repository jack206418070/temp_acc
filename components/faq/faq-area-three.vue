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
              desc="申請時需要準備：1. 身分證正反面影本 2. 最近三個月內戶籍謄本 3. 收入證明或財力證明 4. 申請表格（可在網站下載）。所有文件請以正本或加蓋與正本相符章的影本提供。"
              parent="accordionTwo"
            />

            <faq-item
              id="ten"
              title="申請流程需要多久時間？"
              desc="一般申請流程約需要 14 個工作天，包含文件審核（3-5天）、資格評估（5-7天）及最終審核（3-5天）。如果文件齊全且符合規定，處理時間可能會縮短。特殊情況可能需要更長的處理時間。"
              parent="accordionTwo"
            />

            <faq-item
              id="m3"
              title="可以線上申請嗎？"
              desc="是的，我們提供完整的線上申請系統。您可以在官網填寫申請表格，並上傳所需文件。系統會自動發送確認信，並提供申請進度查詢功能。如有需要協助，可以透過客服專線聯繫我們。"
              parent="accordionTwo"
            />

            <faq-item
              id="m4"
              title="申請被拒絕後，多久可以再次申請？"
              desc="申請被拒絕後需要等待 3 個月才能再次提出申請。建議在重新申請前，先了解被拒絕的原因，並確保已改善或補齊相關條件。您也可以聯繫我們的客服人員，了解如何提高申請通過的機會。"
              parent="accordionTwo"
            />

            <faq-item
              id="m5"
              title="申請通過後，何時可以開始使用服務？"
              desc="申請通過後，我們會在 2 個工作天內寄送服務啟用通知。收到通知後，您需要完成線上啟用程序，整個過程約需要 30 分鐘。完成啟用後即可立即使用所有服務功能。"
              parent="accordionTwo"
            />
            <faq-item
              id="seven"
              title="成為試辦單位需要具備哪些條件？"
              desc="試辦單位需要符合以下基本條件：1. 具備合法登記之機構或組織資格 2. 至少有3年以上相關服務經驗 3. 擁有專業的服務團隊（至少3名專職人員）4. 具備基本的硬體設施與空間 5. 願意配合計畫執行期程與成效評估。"
              parent="accordionThree"
            />
            <faq-item
              id="eight"
              title="試辦計畫的期程多長？"
              desc="一般試辦計畫為期一年，分為三個階段：前期準備期（2個月）、執行期（8個月）及評估期（2個月）。表現優良的單位可以申請延長試辦期或轉為正式合作夥伴。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot1"
              title="試辦期間會獲得哪些支援？"
              desc="我們會提供以下支援：1. 專業培訓課程 2. 技術指導與諮詢 3. 必要的軟硬體設備 4. 營運補助金 5. 行政支援系統。另外也會安排定期交流會議，協助解決執行過程中遇到的問題。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot2"
              title="如何申請成為試辦單位？"
              desc="申請流程包含：1. 線上填寫申請表 2. 提交試辦計畫書 3. 資格審查 4. 實地訪查 5. 面試答辯 6. 簽約。建議先參加我們的說明會，以更深入了解試辦計畫的細節。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot3"
              title="試辦單位的評核標準是什麼？"
              desc="評核標準主要包含：1. 服務質量與成效（40%）2. 經營管理能力（20%）3. 創新應用程度（15%）4. 使用者滿意度（15%）5. 文件資料完整性（10%）。每季都會進行評估，並提供改善建議。"
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
              desc="申請時需要準備：1. 身分證正反面影本 2. 最近三個月內戶籍謄本 3. 收入證明或財力證明 4. 申請表格（可在網站下載）。所有文件請以正本或加蓋與正本相符章的影本提供。"
              parent="accordionTwo"
            />

            <faq-item
              id="ten"
              title="申請流程需要多久時間？"
              desc="一般申請流程約需要 14 個工作天，包含文件審核（3-5天）、資格評估（5-7天）及最終審核（3-5天）。如果文件齊全且符合規定，處理時間可能會縮短。特殊情況可能需要更長的處理時間。"
              parent="accordionTwo"
            />

            <faq-item
              id="m3"
              title="可以線上申請嗎？"
              desc="是的，我們提供完整的線上申請系統。您可以在官網填寫申請表格，並上傳所需文件。系統會自動發送確認信，並提供申請進度查詢功能。如有需要協助，可以透過客服專線聯繫我們。"
              parent="accordionTwo"
            />

            <faq-item
              id="m4"
              title="申請被拒絕後，多久可以再次申請？"
              desc="申請被拒絕後需要等待 3 個月才能再次提出申請。建議在重新申請前，先了解被拒絕的原因，並確保已改善或補齊相關條件。您也可以聯繫我們的客服人員，了解如何提高申請通過的機會。"
              parent="accordionTwo"
            />

            <faq-item
              id="m5"
              title="申請通過後，何時可以開始使用服務？"
              desc="申請通過後，我們會在 2 個工作天內寄送服務啟用通知。收到通知後，您需要完成線上啟用程序，整個過程約需要 30 分鐘。完成啟用後即可立即使用所有服務功能。"
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
              desc="試辦單位需要符合以下基本條件：1. 具備合法登記之機構或組織資格 2. 至少有3年以上相關服務經驗 3. 擁有專業的服務團隊（至少3名專職人員）4. 具備基本的硬體設施與空間 5. 願意配合計畫執行期程與成效評估。"
              parent="accordionThree"
            />
            <faq-item
              id="eight"
              title="試辦計畫的期程多長？"
              desc="一般試辦計畫為期一年，分為三個階段：前期準備期（2個月）、執行期（8個月）及評估期（2個月）。表現優良的單位可以申請延長試辦期或轉為正式合作夥伴。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot1"
              title="試辦期間會獲得哪些支援？"
              desc="我們會提供以下支援：1. 專業培訓課程 2. 技術指導與諮詢 3. 必要的軟硬體設備 4. 營運補助金 5. 行政支援系統。另外也會安排定期交流會議，協助解決執行過程中遇到的問題。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot2"
              title="如何申請成為試辦單位？"
              desc="申請流程包含：1. 線上填寫申請表 2. 提交試辦計畫書 3. 資格審查 4. 實地訪查 5. 面試答辯 6. 簽約。建議先參加我們的說明會，以更深入了解試辦計畫的細節。"
              parent="accordionThree"
            />
            <faq-item
              id="pilot3"
              title="試辦單位的評核標準是什麼？"
              desc="評核標準主要包含：1. 服務質量與成效（40%）2. 經營管理能力（20%）3. 創新應用程度（15%）4. 使用者滿意度（15%）5. 文件資料完整性（10%）。每季都會進行評估，並提供改善建議。"
              parent="accordionThree"
            />
          </div>
        </div>

      </div>
      <div class="text-center mt-60 lg-mt-50">
        <h2 class="fs-1 mb-30">有得到解答嗎？</h2>
        <nuxt-link href="/contact" class="btn-four">聯絡我們</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>