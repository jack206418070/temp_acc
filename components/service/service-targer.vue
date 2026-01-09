<template>

    <div class="plan-service">
      <div class="position-relative">
        <h2>服務對象</h2>
        <!-- 流程示意圖區塊 -->
        <div class="row m-auto">
        
          <div class="col-md wow fadeInUp" v-for="(item, index) in serviceSteps" :key="index" :data-wow-delay="`${index * 0.2}s`">
            <!-- 上方步驟區塊 -->
            <div class="step-item text-center mb-lg-4 mb-2">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-title">{{ item.title }}</div>
            </div>
            
            <!-- 中間說明區塊 -->
            <div class="description-box p-20 mb-4">
              <p>{{ item.description }}</p>
            </div>

            <!-- 下方備註區塊 -->
            <div class="notes-box">
              <p style="white-space: pre-line;" >{{ item.note }}</p>
              <p v-if="item?.extra_note" style="white-space: pre-line;" >{{ item.extra_note }}</p>
            </div>
          </div>
        </div>  
      </div>
  </div>  
</template>

<script setup lang="ts">
interface ServiceStep {
  title: string;
  description: string;
  note: string;
}

const serviceSteps: ServiceStep[] = [
  {
    title: '',
    description: '具有效期間內身心障礙證明。',
    note: '有效期間內之身心障礙證明。'
  },
  {
    title: '',
    description: '具有效期間內全民健康保險重大傷病資格。',
    note: '有效期間內的重大傷病卡，或全民健保行動快易通/健康存摺APP之重大傷病證明查詢結果，及一年內開具之診斷證明書且載明宜休養'
  },
  {
    title: '',
    description: '具三個月內就醫或手術紀錄。',
    note: '申請日前三個月內開具之診斷證明書，且載明宜休養。'
  },
  {
    title: '',
    description: '符合聘僱外國人從事家庭看護工作或中階家庭看護工作之被看護者資格。',
    note: '符合申請聘僱外國人資格之有效證明文件、有效期間內之招募許可或聘僱許可。 可用系統勾稽。'
  },
  {
    title: '',
    description: '經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用本計畫服務之需求。',
    note: '長期照顧需求評估結果通知書或長照特約單位開立載有照顧組合名稱之收據。',
    extra_note: '備註: 長期照顧需求評估結果通知書可由醫院出備小組開立'
  },
  
];
</script>

<style scoped>
h2 {
  color: #41BBBE;
  font-size: 42px;
  font-weight: 400;
  margin-top: 30px;
  margin-bottom: 60px;
}
.process-diagram {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  width: 90%;

}
.plan-service {
  margin-bottom: 40px;
}

.step-item {
  position: relative;
}

.notes-box p {
  font-size: 18px;
}

.step-number {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #41BBBE;
  color: #FFFFFE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: 500;
}

.step-title {
  margin-top: 10px;
  font-size: 16px;
}

.description-box {
  background: rgb(243, 243, 243);
  border-radius: 8px;
  min-height: 150px;
  padding: 8px;
}
.description-box p {
  font-size: 18px;
}

.notes-box {
  border-radius: 8px;
}

/* 修改連接線效果 */
.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -25%;
  width: 50%;
  height: 1px;
  background: #586d5b;
  display: none; /* 先隱藏所有連接線 */
}

/* 只顯示非最後一個元素的連接線 */
.col-md:not(:last-child) .step-item::after {
  display: block;
}

.notes-box p {
  white-space: pre-line;
}

.wow {
  visibility: hidden; /* 確保元素在動畫開始前不可見 */
}


@media (max-width: 996px) {
  h2 {
    font-size: 34px;
  }
  .description-box {
    height: auto;
    min-height: 0px;
    padding: 10px 8px;
    margin-bottom: 10px !important;
  }
  .description-box p {
    margin-bottom: 0;
  }
  .notes-box p {
    padding: 0 8px;
  }
  .step-number {
    margin: 0;
  }
  .step-item:not(:last-child)::after {
    right: -15%;
    width: 100%;
    background: #000;
  }
  .step-item::after {
    display: block!important;
  }
  .notes-box {
    margin-left: 45px;
  }
  .description-box {
    margin-left: 45px;
  }
}
</style>
