<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchFeedbacks, fetchSingleFeedback, getFileUrl } from '../api/feedbackService';
  import { formatDate } from '../utils/dateFormatter';
  import type { Feedback } from '../types/feedback';
  import PaginationControls from '@/components/PaginationControls.vue';
  import PriorityBadge from '@/components/PriorityBadge.vue';
  import StatusBadge from '@/components/StatusBadge.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';
  import FeedbackDetail from '@/components/FeedbackDetail.vue';

  const router = useRouter();

  // Estado
  const feedbacks = ref<Feedback[]>([]);
  const selectedFeedback = ref<Feedback | null>(null);
  const loading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const orderBy = ref('desc');
  const limit = ref(3);

  // Buscar feedbacks
  const loadFeedbacks = async () => {
    try {
      loading.value = true;
      const { data, pagination } = await fetchFeedbacks(currentPage.value, limit.value, orderBy.value);
      feedbacks.value = data;
      totalPages.value = pagination.totalPages;
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
    } finally {
      loading.value = false;
    }
  };

  // Navegação
  const selectFeedback = (id: number) => {
    router.push({ name: 'Feedback', params: { id: id.toString() } });
  };

  // Paginação
  const nextPage = () => {
    currentPage.value++;
    loadFeedbacks();
  };

  const prevPage = () => {
    currentPage.value--;
    loadFeedbacks();
  };

  // Ciclo de vida
  onMounted(loadFeedbacks);
</script>

<template>
  <!-- Listagem de Feedbacks -->
  <div class="min-h-screen bg-gray-100 p-8" v-if="!selectedFeedback">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Feedbacks</h1>
      <PaginationControls 
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev="prevPage"
        @next="nextPage"
      />

      <div class="flex items-center gap-4 mb-4">
        <span class="text-gray-500">Ordenar por:</span>
        <select v-model="orderBy" @change="loadFeedbacks">
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <span class="text-gray-500">Mostrar:</span>
        <select v-model="limit" @change="loadFeedbacks">
          <option value="3">3 por página</option>
          <option value="6">6 por página</option>
          <option value="9">9 por página</option>
        </select>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="text-gray-500">Página:</span>
        <select v-model="currentPage" @change="loadFeedbacks" class="mb-8">
          <option v-for="page in totalPages" :key="page" :value="page">
            Página {{ page }}
          </option>
        </select>
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="feedback in feedbacks" 
        :key="feedback.id"
        @click="selectFeedback(feedback.id)"
        class="cursor-pointer rounded-lg bg-gray-50 p-6 shadow-md transition-all transform hover:bg-white hover:shadow-lg hover:scale-105"
      >
        <div class="mb-4 flex items-start justify-between">
          <div>
            <PriorityBadge :priority="feedback.prioridade || 'baixa'" />
            <StatusBadge :status="feedback.status || 'pendente'" class="ml-2" />
          </div>
          <span class="text-sm text-gray-500">{{ formatDate(feedback.dataCriacao) }}</span>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ feedback.tipo }}</h3>
            <p class="text-sm text-gray-600">{{ feedback.emailUsuario }}</p>
          </div>

          <p class="text-gray-700">{{ feedback.descricao }}</p>

          <div v-if="feedback.passosReproducao" class="bg-gray-50 p-4 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-600 mb-2">Passos para reprodução:</h4>
            <p class="text-sm text-gray-600 whitespace-pre-line">{{ feedback.passosReproducao }}</p>
          </div>

          <!-- System Info -->
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="text-gray-500">
              <span class="block">Navegador:</span>
              <span class="text-gray-700">{{ feedback.navegador || 'Não informado' }}</span>
            </div>
            <div class="text-gray-500">
              <span class="block">Sistema:</span>
              <span class="text-gray-700">{{ feedback.sistemaOperacional || 'Não informado' }}</span>
            </div>
          </div>

          <!-- Anexos -->
          <div v-if="feedback.anexos?.length" class="border-t pt-4">
            <h4 class="text-sm font-semibold text-gray-600 mb-2">Anexos:</h4>
            <div class="flex flex-wrap gap-2">
              <a 
                @click.stop
                v-for="anexo in feedback.anexos" 
                :key="anexo.id"
                :href="getFileUrl(anexo.id)" 
                target="_blank"
                class="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
              >
                Anexo {{ anexo.id }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detalhes do Feedback -->
  <FeedbackDetail 
    v-else 
    :feedback="selectedFeedback"
    @back="selectedFeedback = null"
  />
</template>
