<!-- @format -->

<template>
	<Navbar />
	<div class="d-flex">
		<div class="col-4">
			<EntryList />
		</div>
		<div class="col">
			<router-view />
		</div>
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	import { mapActions } from 'vuex';

	export default {
		components: {
			Navbar: defineAsyncComponent(() => import('../components/nav-bar.vue')),
			EntryList: defineAsyncComponent(() => import('../components/entry-list.vue')),
		},
		methods: {
			...mapActions('journal', ['loadEntries']),
		},
		created() {
			this.loadEntries();
		},
	};
</script>
