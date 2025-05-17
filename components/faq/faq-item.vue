<template>
  <div class="accordion-item">
    <div class="accordion-header" :id="'heading' + id">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        :data-bs-target="'#collapse' + id" :aria-expanded="false" :aria-controls="'collapse' + id">
        {{ title }}
      </button>
    </div>
    <div :id="'collapse' + id" class="accordion-collapse collapse" :aria-labelledby="'heading' + id"
      :data-bs-parent="'#' + parent">
      <div class="accordion-body">
        <p class="faq-answer">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: string;
  title: string;
  desc: string;
  isShow?: boolean;
  parent: string;
  cls?: string;
}>();
</script>

<style scoped>
.accordion-body {
  padding: 1rem;
  font-size: 16px;
}

.faq-answer {
  white-space: pre-line;
  word-break: break-word;
  line-height: 1.6;
  margin: 0;
}
</style>
