<!-- @format -->

<template>
	<span class="login100-form-title p-b-41"> Registro </span>
	<form
		@submit.prevent="onSubmit"
		class="login100-form validate-form p-b-33 p-t-5"
	>
		<div
			class="wrap-input100 validate-input"
			data-validate="En"
		>
			<input
				class="input100"
				type="text"
				placeholder="Nombre"
				required
				v-model="userForm.name"
			/>
			<span
				class="focus-input100"
				data-placeholder="&#xe82a;"
			></span>
		</div>

		<div
			class="wrap-input100 validate-input"
			data-validate="Ingrese correo"
		>
			<input
				class="input100"
				type="email"
				placeholder="Correo"
				required
				v-model="userForm.email"
			/>
			<span
				class="focus-input100"
				data-placeholder="&#xe818;"
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
				v-model="userForm.password"
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
				Crear cuenta
			</button>
		</div>

		<div class="container-login100-form-btn m-t-32">
			<router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
		</div>
	</form>
</template>

<script>
	import { ref } from 'vue';
	import useAuth from '@/modules/auth/composables/useAuth';

	export default {
		setup() {
			const { createUser } = useAuth();

			const userForm = ref({
				email: '',
				name: '',
				password: '',
			});

			return {
				userForm,
				onSubmit: async () => {
					const { ok, message } = await createUser(userForm.value);
					console.log(ok, message);
				},
			};
		},
	};
</script>

<style scoped></style>
