<script setup lang="ts">
import { formatDate } from '../utils/dateFormatter';
import { getFileUrl } from '../api/feedbackService';

const openFile = (id: string) => {
	window.open(getFileUrl(Number(id)), '_blank');
};

// Defina as props corretamente
const props = defineProps({
  feedback: {
    type: Object,
    required: true
  }
});
</script>

<template>
	<div class="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
		<!-- Header -->
		<div class="mb-6 border-b pb-4">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-bold text-gray-800">
					{{ props.feedback.tipo }}
				</h2>
				<span class="text-sm text-gray-500">
					{{ formatDate(props.feedback.dataCriacao) }}
				</span>
			</div>
			<p class="mt-2 text-gray-600">
				{{ props.feedback.emailUsuario }}
			</p>
		</div>

		<!-- Conteúdo Detalhado -->
		<div class="space-y-6">
			<div>
				<h3 class="text-sm font-semibold text-gray-600">
					Descrição:
				</h3>
				<p class="mt-2 text-gray-700">
					{{ props.feedback.descricao }}
				</p>
			</div>

			<div v-if="props.feedback.passosReproducao">
				<h3 class="text-sm font-semibold text-gray-600">
					Passos para reprodução:
				</h3>
				<pre class="mt-2 whitespace-pre-wrap rounded bg-gray-50 p-4 font-sans text-gray-700">
					{{ props.feedback.passosReproducao }}
				</pre>
			</div>

			<!-- Informações do Sistema -->
			<div class="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
				<div>
					<p class="text-sm text-gray-600">
						Navegador:
					</p>
					<p class="font-medium text-gray-700">
						{{ props.feedback.navegador || 'Não informado' }}
					</p>
				</div>
				<div>
					<p class="text-sm text-gray-600">
						Sistema Operacional:
					</p>
					<p class="font-medium text-gray-700">
						{{ props.feedback.sistemaOperacional || 'Não informado' }}
					</p>
				</div>
			</div>

			<!-- Anexos -->
			<div 
				v-if="props.feedback.anexos?.length" 
				class="mt-8"
			>
				<h3 class="mb-4 text-lg font-semibold text-gray-800">
					Anexos
				</h3>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div
						v-for="anexo in props.feedback.anexos"
						:key="anexo.id"
						class="overflow-hidden rounded-lg border border-gray-200 shadow-md cursor-pointer"
						@click="openFile(anexo.id)"
					>
						<img
							:src="getFileUrl(anexo.id)"
							class="h-48 w-full object-cover"
						>

						<!--<div -->
						<!--	v-else-->
						<!--	class="flex h-48 items-center justify-center bg-gray-100"-->
						<!--->
						<!--	<a-->
						<!--		:href="getFileUrl(anexo.id)"-->
						<!--		class="text-blue-600 hover:underline"-->
						<!--	>-->
						<!--		Ver Anexo-->
						<!--	</a>-->
						<!--</div>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
