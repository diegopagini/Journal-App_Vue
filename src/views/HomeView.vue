<!-- @format -->

<template>
	<div class="home">
		<h1>Hola Mundo</h1>
		<button
			@click="goToDayBook"
			class="btn btn-primary"
		>
			Primary
		</button>
	</div>
</template>

<script>
	export default {
		methods: {
			goToDayBook() {
				this.$router.push({ name: 'daybook' });
			},
		},
	};
</script>
