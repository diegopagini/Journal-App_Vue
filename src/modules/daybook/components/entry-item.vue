<!-- @format -->

<template>
	<div class="entry-container mb-3 pointer p-2">
		<div class="entry-title d-flex">
			<span class="text-success fs-5 fw-bold">15</span>
			<span class="mx-1 fs-5">Julio</span>
			<span class="mx-2 fw-light">2021, Jueves</span>
		</div>

		<div class="entry-description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente repudiandae corrupti
			voluptas quo neque voluptatem maxime consequuntur quod tenetur incidunt repellendus fuga
			provident, aliquid sunt qui adipisci? At, sequi!
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.entry-container {
		border-bottom: 1px solid #2c3e50;
		transition: 250ms all ease-in;

		&:hover {
			background-color: lighten($color: gray, $amount: 45);
			transition: 250ms all ease-in;
		}

		.entry-description {
			font-size: 14px;
		}
	}
</style>
