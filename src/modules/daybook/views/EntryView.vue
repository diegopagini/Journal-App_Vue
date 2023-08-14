<!-- @format -->

<template>
	<template v-if="entry">
		<div class="entry-title d-flex justify-content-between p-2">
			<div>
				<span class="text-succes fs-3 fw-bold">{{ day }}</span>
				<span class="mx-1 fs-3">{{ month }}</span>
				<span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
			</div>

			<input
				v-show="false"
				type="file"
				@change="onSelectedImage"
				ref="imageSelector"
				accept="image/png, image/jpeg"
			/>

			<div>
				<button
					v-if="entry.id && !localImage"
					@click="onDeleteEntry"
					class="btn btn-danger mx-2"
				>
					Borrar <i class="fa fa-trash-alt"></i>
				</button>

				<button
					@click="onSelectImage"
					class="btn btn-primary"
				>
					Subir foto <i class="fa fa-upload"></i>
				</button>
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
			v-if="entry.picture"
			:src="entry.picture"
			alt="entry-picture"
			class="img-thumbnail"
		/>

		<img
			v-if="localImage"
			:src="localImage"
			alt="entry-picture"
			class="img-thumbnail"
		/>
	</template>
</template>
<script>
	import { defineAsyncComponent } from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import getDayMonthYear from '../helpers/getDayMonthYear';
	import Swal from 'sweetalert2';
	import uploadImage from '../helpers/uploadImage';

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
				localImage: null,
				file: null,
			};
		},
		methods: {
			...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
			loadEntry() {
				this.localImage = null;
				this.file = null;

				let entry;
				if (this.id === 'new') {
					entry = {
						text: '',
						date: new Date().getTime(),
					};
				} else {
					entry = this.getEntryById(this.id);
					if (!entry) return this.$router.push({ name: 'no-entry' });
				}
				this.entry = entry;
			},
			async saveEntry() {
				new Swal({
					title: 'Espere por favor',
					allowOutsideClick: false,
				});
				Swal.showLoading();

				const picture = await uploadImage(this.file);
				this.entry.picture = picture;

				if (this.entry.id) {
					// Update
					await this.updateEntry(this.entry);
				} else {
					// Create
					const id = await this.createEntry(this.entry);
					this.$router.push({ name: 'entry', params: { id } });
				}

				this.file = null;
				this.localImage = null;
				Swal.fire('Guardado', 'Entrada registrada con éxito', 'success');
			},
			async onDeleteEntry() {
				const result = await Swal.fire({
					confirmButtonText: 'Si, estoy seguro',
					icon: 'question',
					showDenyButton: true,
					text: 'Una vez borrado, no se puede recuperar',
					title: '¿Está seguro?',
				});

				const { isConfirmed } = result;

				if (isConfirmed) {
					new Swal({
						title: 'Espere por favor',
						allowOutsideClick: false,
					});

					Swal.showLoading();

					await this.deleteEntry(this.entry.id);
					this.$router.push({ name: 'no-entry' });

					Swal.fire('Eliminado', '', 'success');
				}
			},
			onSelectedImage({ target }) {
				const file = target.files[0];
				if (!file) {
					this.localImage = null;
					this.file = null;
					return;
				}

				this.file = file;
				const fr = new FileReader();
				fr.onload = () => (this.localImage = fr.result);
				fr.readAsDataURL(file);
			},
			onSelectImage() {
				this.$refs.imageSelector.click();
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
