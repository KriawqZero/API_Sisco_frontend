<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  priority: { type: String, default: 'baixa' }
});

const priorityLabel = computed(() => {
  const labels: { [key: string]: string } = {
    'baixa': 'Baixa',
    'média': 'Média',
    'alta': 'Alta'
  };
  return labels[props.priority] || props.priority;
});

const priorityClasses: { [key: string]: string } = {
  'alta': 'bg-red-100 text-red-800',
  'média': 'bg-yellow-100 text-yellow-800',
  'baixa': 'bg-green-100 text-green-800'
};
</script>

<template>
  <span 
    class="rounded-full px-3 py-1 text-sm font-medium"
    :class="priorityClasses[props.priority]"
  >
    {{ priorityLabel }}
  </span>
</template>
