<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/themes/splide-default.min.css';
	import type { PageData } from './$types';

	import { register } from 'swiper/element/bundle';
	import Card from '../components/Card.svelte';
	export let data: PageData;

	register();
</script>

<svelte:head>
	<title>{data.siteSettings.title}</title>
	<meta name="description" content="Afet Ağı" />
</svelte:head>

<section class="bg-primary-600">
	<div class="grid md:grid-cols-2 gap-3 max-w-full md:max-w-6xl mb-4 md:mb-28 md:p-0 p-8">
		<div style="">
			<Splide
				options={{
					type: 'fade',
					easing: 'ease',
					rewind: true,
					autoplay: false,
					arrows: false,
					paginationDirection: 'ttb',
					height: 350
				}}
				aria-label="Afet Ağı Manşet"
				class="splide-crossfade"
			>
				<SplideSlide>
					<img
						src="https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
						alt="one 1"
						style="width:100%; object-fit:cover; display: block;"
						class="rounded-lg"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						src="https://cdn.pixabay.com/photo/2023/05/14/10/53/beetle-7992520_1280.jpg"
						alt="two 2"
						style="width:100%; object-fit:cover; display: block;"
						class="rounded-lg"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						src="https://cdn.pixabay.com/photo/2023/05/30/06/16/vegetable-pan-8027678_1280.jpg"
						alt="three 3"
						style="width:100%; object-fit:cover; display: block;"
						class="rounded-lg"
					/>
				</SplideSlide>
			</Splide>
		</div>

		<div>form</div>
	</div>
</section>
<section class="articles md:-mt-20 mt-4">
	{#if data.posts.length}
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
			class="md:max-w-6xl w-full"
		>
			<SplideTrack>
				{#each data.posts as post}
					<SplideSlide><Card {post} /></SplideSlide>
				{/each}
			</SplideTrack>
			<!-- <div class="flex flex-row justify-between mt-10">
				<button
					class="flex w-16 h-16 bg-primary-600 text-white rounded-full items-center justify-center"
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
					</svg></button
				>
				<button
					class="flex w-16 h-16 bg-primary-600 text-white rounded-full items-center justify-center"
				>
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
			</div> -->
			<div class="splide__arrows mt-10">
				<button class="splide__arrow splide__arrow--prev bg-primary-400"
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
				<button class="splide__arrow splide__arrow--next">
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
			</div>
		</Splide>
	{/if}
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

	:global(.splide__arrow) {
		height: 4em !important;
		width: 4em !important;
		background: #1da1f2 !important;
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
		bottom: -2rem !important;
	}

	:global(.articles .splide__pagination__page) {
		background: white !important;
		border: 4px solid #1da1f2 !important;
	}
	:global(.articles .splide__pagination__page.is-active) {
		background: #1da1f2 !important;
	}
</style>
