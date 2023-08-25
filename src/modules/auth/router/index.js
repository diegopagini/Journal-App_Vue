/** @format */

export default {
	name: 'auth',
	component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
	children: [
		{
			path: '',
			name: 'login',
			component: () =>
				import(/* webpackChunkName: "login" */ '@/modules/auth/views/login-view.vue'),
		},
		{
			path: 'register',
			name: 'register',
			component: () =>
				import(/* webpackChunkName: "register" */ '@/modules/auth/views/register-view.vue'),
		},
	],
};
