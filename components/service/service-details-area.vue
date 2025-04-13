<template>
  <div class="main-container">
    <div class="">
      <div class="details-meta ps-xxl-5 ps-xl-3">
        <div class="reminder-block" v-html="decode(reminder_data)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const reminder_data = ref('');

async function fetchReminderData() {
  const response = await $fetch('/api/user-reminder', {
    method: 'GET'
  });
  reminder_data.value = response.data.content;
  console.log(typeof reminder_data === 'string');
}
const decode = (str) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}
onMounted(async () => {
  await fetchReminderData();
});

</script>

<style scoped>
  .default-title {
    margin-bottom: 30px;
  }
  .reminder-intro {
    font-size: 23px;
    letter-spacing: 1.3px;
  }
  .reminder-list {
    font-size: 23px;
  }
  .reminder-list li {
    letter-spacing: 2px;
    line-height: 2;
  }
  @media (max-width: 991px) {
    .reminder-list li {
      line-height: 1.8;
      letter-spacing: 1.5px;
    }
    .default-title {
      font-size: 30px;
    }
    .reminder-intro {
      font-size: 20px;
    }
    .reminder-list {
      font-size: 20px;
    }
  }
</style>