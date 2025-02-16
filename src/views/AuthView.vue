<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

onMounted(() => {
	if (authStore.isAuthenticated) {
		router.replace('/')
	}
})

const handleLogin = async () => {
	error.value = ''
	loading.value = true

	try {
		const success = authStore.login(username.value, password.value)
		if (success) {
			router.push('/')
		} else {
			error.value = 'Credenciais inválidas'
		}
	} catch {
		error.value = 'Erro ao tentar login'
	} finally {
		loading.value = false
	}
}

</script>

<template>
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="bg-white p-8 rounded-2xl shadow-xl w-96">
			<h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Acesso Administrativo</h2>

			<form @submit="handleLogin">
				<div class="space-y-6">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
						<input v-model="username" type="text" placeholder="admin" :disabled="loading" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 disabled:bg-gray-200 disabled:cursor-not-allowed
							focus:ring-blue-500 focus:border-transparent disabled:opacity-50" />
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-2">Senha</label>
						<input v-model="password" type="password" placeholder="••••••••" :disabled="loading" class="w-full px-4 py-3 rounded-lg border border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed
							focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50" />
					</div>

					<div v-if="error" class="text-red-600 text-sm text-center">{{ error }}</div>

					<button type="submit" :disabled="loading"
						class="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
						<svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
							viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
							</path>
						</svg>
						<span>{{ loading ? 'Autenticando...' : 'Entrar' }}</span>
					</button>
				</div>
			</form>
			
		</div>
	</div>
</template>