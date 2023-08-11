<!-- @format -->

<template>
	<template v-if="entry">
		<div class="entry-title d-flex justify-content-between p-2">
			<div>
				<span class="text-succes fs-3 fw-bold">{{ day }}</span>
				<span class="mx-1 fs-3">{{ month }}</span>
				<span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
			</div>

			<div>
				<button class="btn btn-danger mx-2">Borrar <i class="fa fa-trash-alt"></i></button>
				<button class="btn btn-primary">Subir foto <i class="fa fa-upload"></i></button>
			</div>
		</div>

		<hr />

		<div class="d-flex flex-column px-2 h-75">
			<textarea
				placeholder="¿Qué sucedió hoy?"
				v-model="entry.text"
			></textarea>
		</div>

		<Fab
			icon="fa-save"
			@on:click="saveEntry"
		/>

		<img
			src="https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1287145.jpg&fm=jpg"
			alt="entry-picture"
			class="img-thumbnail"
		/>
	</template>
</template>
<script>
	import { defineAsyncComponent } from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import getDayMonthYear from '../helpers/getDayMonthYear';

	export default {
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		components: {
			Fab: defineAsyncComponent(() => import('../components/fab-entry.vue')),
		},
		data() {
			return {
				entry: null,
			};
		},
		methods: {
			...mapActions('journal', ['updateEntry']),
			loadEntry() {
				const entry = this.getEntryById(this.id);
				if (!entry) return this.$router.push({ name: 'no-entry' });

				this.entry = entry;
			},
			async saveEntry() {
				this.updateEntry(this.entry);
			},
		},
		computed: {
			...mapGetters('journal', ['getEntryById']),
			day() {
				const { day } = getDayMonthYear(this.entry.date);
				return day;
			},
			month() {
				const { month } = getDayMonthYear(this.entry.date);
				return month;
			},
			yearDay() {
				const { yearDay } = getDayMonthYear(this.entry.date);
				return yearDay;
			},
		},
		created() {
			this.loadEntry();
		},
		watch: {
			id(value, oldValue) {
				if (value !== oldValue) this.loadEntry();
			},
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
