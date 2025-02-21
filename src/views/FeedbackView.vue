<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchSingleFeedback } from '../api/feedbackService';
import { useRoute, useRouter } from 'vue-router';
import FeedbackDetail from '../components/FeedbackDetail.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const feedback = ref(null); // <-- Adicione esta linha

onMounted(async () => {
	try {
		feedback.value = await fetchSingleFeedback(Number(route.params.id));
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
});

const backToList = () => {
	router.push({ name: 'Dashboard' });
};
</script>

<template>
	<div class="min-h-screen bg-gray-100 p-8">
		<button
			class="mb-8 flex items-center gap-2 text-blue-600 hover:cursor-pointer hover:text-blue-800"
			@click="backToList"
		>
			<svg 
				class="h-5 w-5" 
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Voltar para lista
		</button>
		<FeedbackDetail 
			v-if="feedback"
			:feedback="feedback"
		/>
		<LoadingSpinner v-else />
	</div>
</template>


