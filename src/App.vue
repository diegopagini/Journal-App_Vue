<!-- @format -->

<template>
	<h1 v-if="authState === 'authenticating'">{{ authState }}...</h1>
	<router-view v-else />
</template>

<script>
	import useAuth from '@/modules/auth/composables/useAuth';
	export default {
		setup() {
			const { authState, checkAuthStatus } = useAuth();

			checkAuthStatus();

			return { authState };
		},
	};
</script>

<style scoped>
	h1 {
		text-align: center;
	}
</style>
