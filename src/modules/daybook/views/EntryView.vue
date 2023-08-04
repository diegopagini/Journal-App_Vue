<!-- @format -->

import { defineAsyncComponent } from 'vue';
<!-- @format -->

<template>
	<div class="entry-title d-flex justify-content-between p-2">
		<div>
			<span class="text-succes fs-3 fw-bold">18</span>
			<span class="mx-1 fs-3">Julio</span>
			<span class="mx-2 fs-4 fw-light">2021, Domingo</span>
		</div>

		<div>
			<button class="btn btn-danger mx-2">Borrar <i class="fa fa-trash-alt"></i></button>
			<button class="btn btn-primary">Subir foto <i class="fa fa-upload"></i></button>
		</div>
	</div>

	<hr />
	<div class="d-flex flex-column px-2 h-75">
		<textarea placeholder="¿Qué sucedió hoy?"></textarea>
	</div>

	<Fab icon="fa-save" />

	<img
		src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1287145.jpg&fm=jpg"
		alt="entry-picture"
		class="img-thumbnail"
	/>
</template>

<script>
	import { defineAsyncComponent } from 'vue';

	export default {
		components: {
			Fab: defineAsyncComponent(() => import('../components/fab-entry.vue')),
		},
	};
</script>

<style lang="scss" scoped>
	textarea {
		border: none;
		font-size: 20px;
		height: 100%;

		&:focus {
			outline: none;
		}
	}

	img {
		bottom: 150px;
		box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
		position: fixed;
		right: 20px;
		width: 200px;
	}
</style>
