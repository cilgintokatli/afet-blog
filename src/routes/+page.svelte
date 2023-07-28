<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';

	import '@splidejs/svelte-splide/css/themes/splide-default.min.css';
	import type { ActionData, PageData } from './$types';
	import Card from '../components/Card.svelte';
	import { urlFor } from '$lib/utils/image';
	import MultiStepForm from '../components/MultiStepForm/MultiStepForm.svelte';

	export let data: PageData;

	export let form: ActionData;

	$: submissionStatus = form?.body?.message;

	const componentPromise = import(
		'@splidejs/svelte-splide/components/SplideSlide/SplideSlide.svelte'
	);
</script>

<svelte:head>
	<title>{data.siteSettings.title}</title>
	<meta name="description" content="Afet Ağı" />

	<link
		rel="preload"
		fetchpriority="high"
		as="image"
		href={urlFor(data.sliders[0].resim).width(500).height(400).fit('max').format('webp').url()}
		type="image/webp"
	/>
	<link
		rel="preload"
		fetchpriority="high"
		as="image"
		href={urlFor(data.posts[0].mainImage).width(500).height(300).fit('max').format('webp').url()}
		type="image/webp"
	/>
</svelte:head>

<section class="bg-primary-600 opacity-100">
	<div class="grid md:grid-cols-2 gap-3 max-w-full md:max-w-6xl mb-4 md:mb-28 md:p-0 p-8">
		{#await componentPromise}
			<div
				class="phdiv md:h-[400px] h-[400px] w-[300px] md:w-[560px] bg-primary-200 block rounded-lg animate-pulse"
			/>
		{:then { default: SSlide }}
			<Splide
				options={{
					type: 'fade',
					easing: 'ease',
					rewind: true,
					autoplay: false,
					arrows: false,
					paginationDirection: 'ttb',
					height: 400,
					breakpoints: {
						640: {
							height: 300
						}
					}
				}}
				aria-label="Afet Ağı Manşet"
				class="splide-crossfade"
			>
				{#each data.sliders as slement}
					<SplideSlide>
						<img
							class=" w-full block"
							src={urlFor(slement?.resim).width(500).height(400).fit('max').format('webp').url()}
							alt={slement.title}
							width="500"
							height="400"
						/>
					</SplideSlide>
				{/each}
			</Splide>
		{/await}

		<div>
			<MultiStepForm {form} {submissionStatus} />
			<!-- <Formtest /> -->
		</div>
	</div>
</section>
<section class="articles md:-mt-20 mt-4">
	{#await componentPromise}
		<div
			class="articleplaceholder w-full md:max-w-6xl grid grid-cols-1 gap-[20px] md:grid-cols-3 grid-flow-row-dense px-8 py-10 md:py-0 md:px-0"
		>
			<div class=" rounded-xl shadow-lg bg-primary-600 md:bg-white animate-pulse h-96 block" />
			<div class=" rounded-xl shadow-lg bg-white animate-pulse h-96 hidden md:block" />
			<div class=" rounded-xl shadow-lg bg-white animate-pulse h-96 hidden md:block" />
		</div>
	{:then SSlide}
		{#if data.posts.length}
			<div
				class="blog-articles cursor-grab md:max-w-6xl w-full transition-opacity duration-[1000ms]"
			>
				<Splide
					options={{
						gap: 20,
						perPage: 3,
						breakpoints: {
							640: {
								perPage: 1
							}
						},
						rewind: true
					}}
					hasTrack={false}
					aria-label="Blog yazıları"
				>
					<SplideTrack class=" mb-36 md:mb-16">
						{#each data.posts as post}
							<SplideSlide><Card {post} /></SplideSlide>
						{/each}
					</SplideTrack>

					<div class="splide__arrows mb-14 flex h-max">
						<button class="splide__arrow splide__arrow--prev md:!h-16 md:!w-16 !h-12 !w-12"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</button>
						<button class="splide__arrow splide__arrow--next md:!h-16 md:!w-16 !h-12 !w-12">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
								/>
							</svg>
						</button>
						<ul class="splide__pagination" />
					</div>
				</Splide>
			</div>
		{/if}
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	:global(.splide__track--fade > .splide__list > .splide__slide) {
		visibility: hidden;
		transition: opacity 400ms ease-in, visibility 0ms ease-in 400ms !important;
	}
	:global(.splide__track--fade > .splide__list > .splide__slide.is-active) {
		visibility: visible;
		opacity: 1;
		transition: opacity 400ms ease-in, visibility 0ms ease-in 0ms !important;
		transition-delay: 0ms;
	}

	/* :global(.splide-crossfade .splide__slide:first-of-type),
	:global(.splide-crossfade .is-prev) {
		opacity: 1 !important;
	} */

	@media screen and (max-width: 768px) {
		:global(.articles .splide__pagination__page) {
			height: 2em !important;
			width: 2em !important;
			opacity: 1 !important;
			margin: 15px !important;
		}
		:global(.splide__arrow) {
			margin-top: 3.5em;
			top: 0px;
		}
	}

	:global(.splide__arrow) {
		background: #1da1f2 !important;
		top: -26px;
	}

	:global(.splide__pagination__page) {
		background: white !important;
		height: 1.3em !important;
		width: 1.3em !important;
		opacity: 1 !important;
		margin: 15px !important;
	}

	:global(.splide__pagination__page.is-active) {
		background: #1da1f2 !important;
	}

	.articles .splide__arrows {
		position: relative;
	}

	.articles .splide__arrow {
		color: white;
	}

	.articles .splide__arrow--prev svg {
		transform: unset;
	}

	:global(.articles .splide__pagination) {
		bottom: 0 !important;
	}

	:global(.articles .splide__pagination__page) {
		background: white !important;
		border: 4px solid #1da1f2 !important;
	}
	:global(.articles .splide__pagination__page.is-active) {
		background: #1da1f2 !important;
	}

	:global(.picture) {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		transition: opacity 1s linear;
		object-fit: cover;
	}

	:global(.picture.loaded) {
		opacity: 1;
	}
</style>
