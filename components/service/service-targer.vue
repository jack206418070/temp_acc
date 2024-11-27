<template>

    <div class="pt-100 my-20 mb-60">
      <div class="position-relative">
        <div class="title-one text-center mb-40 lg-mb-10">
            <h2>服務對象</h2>
        </div>
        <!-- 流程示意圖區塊 -->
        <div class="row process-diagram m-auto">
        
          <div class="col-md" v-for="(item, index) in serviceSteps" :key="index">
            <!-- 上方步驟區塊 -->
            <div class="step-item text-center mb-4">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-title">{{ item.title }}</div>
            </div>
            
            <!-- 中間說明區塊 -->
            <div class="description-box p-20 mb-4">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>

            <!-- 下方備註區塊 -->
            <div class="notes-box fs-6 p-20 ">
              <p style="white-space: pre-line; font-style: italic;" >{{ item.note }}</p>
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
    note: '符合申請聘僱外國人資格之有效證明文件、有效期間內之招募許可或聘僱許可。\n可用系統勾稽。'
  },
  {
    title: '',
    description: '經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用本計畫服務之需求。',
    note: '長期照顧需求評估結果通知書或長照特約單位開立載有照顧組合名稱之收據。'
  },
  
];
</script>

<style scoped>
h2 {
  text-align: left;
  margin-left: 5rem;
}

.process-diagram {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  width: 90%;

}

.step-item {
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #586d5b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
}

.step-title {
  margin-top: 10px;
  font-size: 14px;
}

.description-box {
  background: #f8f9fa;
  border-radius: 8px;
  min-height: 150px;
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
  height: 2px;
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
</style>