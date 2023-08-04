<!-- @format -->

import { defineAsyncComponent } from 'vue';
<!-- @format -->

<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input
				class="form-control"
				placeholder="Buscar entrada"
				type="text"
			/>
		</div>

		<div class="entry-scrollarea">
			<h2
				v-for="item in 100"
				:key="item"
			>
				<Entry />
			</h2>
		</div>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue';

	export default {
		components: {
			Entry: defineAsyncComponent(() => import('./entry-item.vue')),
		},
	};
</script>

<style scoped>
	.entry-list-container {
		border-right: 1px solid #2c3e50;
		height: calc(100vh - 56px);
	}

	.entry-scrollarea {
		height: calc(100vh - 110px);
		overflow-y: auto;
	}
</style>
