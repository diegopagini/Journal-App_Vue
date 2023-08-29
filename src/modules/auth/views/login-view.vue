<!-- @format -->

<template>
	<span class="login100-form-title p-b-41"> Ingresar </span>
	<form
		@submit.prevent="onSubmit"
		class="login100-form validate-form p-b-33 p-t-5"
	>
		<div
			class="wrap-input100 validate-input"
			data-validate="Enter username"
		>
			<input
				class="input100"
				type="text"
				placeholder="Correo"
				required
				v-model="loginForm.email"
			/>
			<span
				class="focus-input100"
				data-placeholder="&#xe82a;"
			></span>
		</div>

		<div
			class="wrap-input100 validate-input"
			data-validate="Enter password"
		>
			<input
				class="input100"
				type="password"
				placeholder="Contraseña"
				required
				v-model="loginForm.password"
			/>
			<span
				class="focus-input100"
				data-placeholder="&#xe80f;"
			></span>
		</div>

		<div class="container-login100-form-btn m-t-32">
			<button
				type="submit"
				class="login100-form-btn"
			>
				Login
			</button>
		</div>

		<div class="container-login100-form-btn m-t-32">
			<router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
		</div>
	</form>
</template>

<script>
	import useAuth from '@/modules/auth/composables/useAuth';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import Swal from 'sweetalert2';

	export default {
		setup() {
			const loginForm = ref({
				email: '',
				password: '',
			});

			const router = useRouter();
			const { loginUser } = useAuth();

			return {
				loginForm,
				onSubmit: async () => {
					const { ok, message } = await loginUser(loginForm.value);

					if (!ok) return Swal.fire('Error', message, 'error');

					router.push({ name: 'no-entry' });
				},
			};
		},
	};
</script>

<style scoped></style>
