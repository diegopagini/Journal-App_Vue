<!-- @format -->

<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input
				class="form-control"
				placeholder="Buscar entrada"
				type="text"
				v-model="term"
			/>
		</div>

		<div class="mt-2 d-flex flex-column">
			<button
				@click="$router.push({ name: 'entry', params: { id: 'new' } })"
				class="btn btn-primary mx-3"
			>
				<i class="fa fa-plus-circle"></i>
				Nueva Entrada
			</button>
		</div>

		<div class="entry-scrollarea">
			<Entry
				v-for="entry in entriesByTerm"
				:key="entry.id"
				:entry="entry"
			/>
		</div>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			Entry: defineAsyncComponent(() => import('./entry-item.vue')),
		},
		computed: {
			...mapGetters('journal', {
				entries: 'getEntriesByTerm',
			}),
			entriesByTerm() {
				return this.entries(this.term);
			},
		},
		data() {
			return {
				term: '',
			};
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
