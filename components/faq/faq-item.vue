<template>
  <div class="accordion-item">
    <div class="accordion-header" :id="`heading-${id}`">
      <button
        :class="`accordion-button ${cls?cls:''} ${isShow?'':'collapsed'}`"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse-${id}`"
        :aria-expanded="isShow ? 'true' : 'false'"
        :aria-controls="`collapse-${id}`"
      >
        {{ title }}
      </button>
    </div>
    <div
      :id="`collapse-${id}`"
      :class="`accordion-collapse collapse ${isShow ? 'show' : ''}`"
      :aria-labelledby="`heading-${id}`"
      :data-bs-parent="`#${parent}`"
    >
      <div class="accordion-body">
        <p>{{ desc }}</p>
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
