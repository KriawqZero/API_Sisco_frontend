import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		name: 'Dashboard',
		path: '/',
		component: () => import('@/views/DashboardView.vue'),
		meta: { requiresAuth: true }
	},
	{
		name: 'Feedback',
		path: '/feedback/:id',
		component: () => import('@/views/FeedbackView.vue'),
		meta: { requiresAuth: true }
	},
	{ 
		name: 'Login',
		path: '/login',
		component: () => import('@/views/AuthView.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
