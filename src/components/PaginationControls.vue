<script setup lang="ts">
defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

defineEmits(['prev', 'next']);
</script>

<template>
  <div class="flex items-center justify-between">
    <button 
      @click="$emit('prev')" 
      :disabled="currentPage === 1"
      class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
    >
      Anterior
    </button>
    <span class="px-4 py-2">Página {{ currentPage }} de {{ totalPages }}</span>
    <button 
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
    >
      Próxima
    </button>
  </div>
</template>
