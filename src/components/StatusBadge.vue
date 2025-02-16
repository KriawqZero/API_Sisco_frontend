<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  status: { type: String, default: 'pendente' }
});

const statusLabel = computed<string>(() => {
  const labels: { [key: string]: string } = {
    'pendente': 'Pendente',
    'em progresso': 'Em Progresso',
    'corrigido': 'Corrigido'
  };
  return labels[props.status] || props.status;
});

const statusClasses: { [key: string]: string } = {
  'pendente': 'bg-gray-100 text-gray-800',
  'em progresso': 'bg-blue-100 text-blue-800',
  'corrigido': 'bg-green-100 text-green-800'
};
</script>

<template>
  <span 
    class="rounded-full px-3 py-1 text-sm font-medium"
    :class="statusClasses[props.status]"
  >
    {{ statusLabel }}
  </span>
</template>
