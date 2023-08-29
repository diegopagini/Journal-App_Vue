/** @format */
import authRouter from '@/modules/auth/router';
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard';
import daybookRouter from '@/modules/daybook/router';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		redirect: '/auth',
	},
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	// },
	{
		path: '/daybook',
		beforeEnter: [isAuthenticatedGuard],
		...daybookRouter,
	},
	{
		path: '/auth',
		...authRouter,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
