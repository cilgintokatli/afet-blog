<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/themes/splide-default.min.css';
	import type { PageData } from './$types';
	import Card from '../components/Card.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let largePicture: HTMLDivElement;
	let phdiv: HTMLDivElement;

	let sliderElement: HTMLDivElement;
	let blogArticles: HTMLDivElement;
	let articleplaceholder: HTMLDivElement;

	onMount(() => {
		var imgLarge = new Image();
		imgLarge.src = largePicture.dataset.large as HTMLImageElement['src'];
		imgLarge.onload = function () {
			phdiv.remove();
			articleplaceholder.remove();
			sliderElement.classList.remove('w-0', 'h-0', 'hidden');

			sliderElement.classList.add('block');
			setTimeout(function () {
				sliderElement.classList.add('opacity-100'); //this is window as setTimeout is a window function...
			}, 0);
			imgLarge.classList.add('loaded');
			blogArticles.classList.remove('w-0', 'h-0');
			blogArticles.classList.add('opacity-100');
		};
		imgLarge.classList.add('picture');
		largePicture.appendChild(imgLarge);
	});
</script>

<svelte:head>
	<title>{data.siteSettings.title}</title>
	<meta name="description" content="Afet Ağı" />
</svelte:head>

<section class="bg-primary-600 opacity-100">
	<div class="grid md:grid-cols-2 gap-3 max-w-full md:max-w-6xl mb-4 md:mb-28 md:p-0 p-8">
		<div
			bind:this={phdiv}
			class="phdiv h-[350px] w-full min-w-[326px] md:w-[570px] bg-primary-200 block rounded-lg"
		/>
		<div
			bind:this={sliderElement}
			class="hidden w-0 h-0 opacity-0 transition-opacity duration-[1000ms]"
		>
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
					<!-- <img
						src="https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
						alt="one 1"
						class="rounded-lg w-full object-cover block h-[350px]"
						loading="eager"
					/> -->
					<div
						bind:this={largePicture}
						class="image-container rounded-lg w-full object-cover block h-[350px]"
						data-large="https://cdn.pixabay.com/photo/2023/05/19/18/07/bee-8005091_1280.jpg"
					>
						<img
							class="placehold img-small"
							src="https://cdn.sanity.io/images/38kp4sug/production/26c521541ef76a7027998b1f7f4668a0f5bd98eb-1125x750.webp?w=50&blur=20"
							alt="ilk manşet resmi"
						/>
					</div>
				</SplideSlide>
				<SplideSlide>
					<img
						src="https://cdn.pixabay.com/photo/2023/05/14/10/53/beetle-7992520_1280.jpg"
						alt="two 2"
						class="rounded-lg w-full object-cover block h-[350px]"
						loading="eager"
					/>
				</SplideSlide>
				<SplideSlide>
					<img
						src="https://cdn.pixabay.com/photo/2023/05/30/06/16/vegetable-pan-8027678_1280.jpg"
						alt="three 3"
						class="rounded-lg w-full object-cover block h-[350px]"
						loading="eager"
					/>
				</SplideSlide>
			</Splide>
		</div>

		<div>form</div>
	</div>
</section>
<section class="articles md:-mt-20 mt-4">
	{#if data.posts.length}
		<div
			bind:this={blogArticles}
			class="blog-articles opacity-0 w-0 h-0 md:max-w-6xl w-full transition-opacity duration-[1000ms]"
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
				<div class="splide__arrows mt-14">
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
	<div
		bind:this={articleplaceholder}
		class="articleplaceholder grid grid-cols-1 gap-3 md:grid-cols-3"
	>
		<div class="p-48 rounded-xl shadow-lg bg-white w-1/3 h-64 block" />
		<div class="p-48 rounded-xl shadow-lg bg-white w-1/3 h-64 hidden md:block" />
		<div class="p-48 rounded-xl shadow-lg bg-white w-1/3 h-64 hidden md:block" />
	</div>
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

	.image-container {
		position: relative;
		overflow: hidden;
	}

	.placehold {
		position: relative;
		width: 100%;
		/* filter: blur(10px); */
		transform: scale(1);
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
