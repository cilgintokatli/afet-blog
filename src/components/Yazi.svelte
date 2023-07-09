<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import { PortableText } from '@portabletext/svelte';
	import {
		Email,
		HackerNews,
		Reddit,
		LinkedIn,
		Pinterest,
		Telegram,
		Tumblr,
		Vk,
		WhatsApp,
		Xing,
		Facebook,
		Twitter,
		Line,
		Viber
	} from 'svelte-share-buttons-component/src/index';

	import type { Post } from '$lib/utils/sanity';
	import { onMount } from 'svelte';

	export let data: Post;

	const url = $page.url.href;
	const title = data.title;

	let largePicture: HTMLDivElement;
	let smallPicture: HTMLImageElement;

	// if (browser) {
	// 	if (document.readyState == 'complete') {
	// 		// still loading, wait for the event
	// 		const placeholder = document.querySelector('.placebox') as HTMLDivElement;
	// 		console.log(placeholder);
	// 		placeholder.classList.add('mystyle');
	// 		placeholder.style.display = 'none';
	// 	}
	// }

	onMount(() => {
		// if (document.readyState == 'complete') {
		// 	// still loading, wait for the event
		// 	const placeholder = document.querySelector('.placebox') as HTMLDivElement;
		// 	console.log(placeholder);
		// 	placeholder.classList.add('mystyle');
		// 	placeholder.style.display = 'none';
		// }
		// smallPicture.addEventListener('load', (event) => {
		// 	console.log('page is fully loaded');
		// });
		// smallPicture.onload = function () {
		// 	console.log('smallpic loaded');
		// 	placebox.remove();
		// };
		// largePicture.onload = function () {
		// 	console.log('large pic loaded');
		// };
		var imgLarge = new Image();
		imgLarge.src = largePicture.dataset.large as HTMLImageElement['src'];
		imgLarge.onload = function () {
			imgLarge.classList.add('loaded');
		};
		imgLarge.classList.add('picture');
		largePicture.appendChild(imgLarge);
	});
</script>

<section class="post max-w-6xl m-auto mt-4">
	{#if data.mainImage}
		<!-- <img
			class="post__cover w-full max-h-[450px] object-cover"
			src={urlFor(data.mainImage).url()}
			alt="Cover image for {data.title}"
		/> -->

		<div
			bind:this={largePicture}
			class="image-container w-full max-h-[450px] object-cover"
			data-large={urlFor(data.mainImage).url()}
		>
			<img
				bind:this={smallPicture}
				class="placehold img-small"
				src={urlFor(data.mainImage).width(50).blur(20).url()}
				alt={data.title}
			/>
		</div>
		<!-- {:else}
		<div class="post__cover--none" /> -->
	{/if}

	<!-- <div bind:this={placebox} class="placebox w-full h-[450px] bg-primary-200" /> -->
	<div class="post__container">
		<h1 class="post__title text-6xl font-bold leading-relaxed">{data.title}</h1>
		<!-- {#if data.author}
			<p>{data.author.name}</p>
		{/if} -->

		<div class="flex flex-row items-center justify-between">
			<div class="flex flex-row items-center text-base">
				<p class="post__date font-semibold">
					{formatDate(data._createdAt)}
				</p>
				{#if data.categories}
					{#each data.categories as category}
						<a href="/kategori/{category.slug}" class="ml-4 underline">{category.title}</a>
					{/each}
				{/if}
			</div>

			<div>
				<Twitter class="share-button" text={title} {url} />
				<Facebook class="share-button" quote={title} {url} />
				<WhatsApp class="share-button" text="{title} {url}" />
				<Email class="" subject={title} body={url} />
			</div>
		</div>
		<div class="post__content text-lg">
			<PortableText value={data.body} />
		</div>

		<div class="flex items-center mt-6 not-italic">
			{#if data?.author?.image}
				<div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
					<img
						src={urlFor(data.author.image).url()}
						class="mr-4 w-16 h-16 rounded-full"
						alt={data.author.name}
					/>
				</div>
			{/if}
			<div>
				{#if data?.author?.name}
					<p class="text-xl font-bold text-gray-900 dark:text-white">{data.author.name}</p>
				{/if}
				{#if data?.author?.bio}
					<PortableText value={data.author.bio} />
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* Global */
	:root {
		--space-0: 0;
		--space-1: 4px;
		--space-2: 8px;
		--space-3: 12px;
		--space-4: 20px;
		--space-5: 32px;
		--space-6: 52px;
		--space-7: 84px;
		--space-8: 136px;
		--space-9: 220px;

		--font-family-sans: Inter;
		--font-family-serif: PT Serif;
		--font-family-mono: IMB Plex Mono;

		--font-size-0: 12px;
		--font-size-1: 14px;
		--font-size-2: 16px;
		--font-size-3: 18px;
		--font-size-4: 20px;
		--font-size-5: 24px;
		--font-size-6: 30px;
		--font-size-7: 36px;
		--font-size-8: 48px;
		--font-size-9: 60px;
		--font-size-10: 72px;

		--line-height-0: 16px;
		--line-height-1: 20px;
		--line-height-2: 24px;
		--line-height-3: 28px;
		--line-height-4: 28px;
		--line-height-5: 32px;
		--line-height-6: 36px;
		--line-height-7: 40px;
		--line-height-8: 48px;
		--line-height-9: 60px;
		--line-height-10: 72px;
		--line-height-11: 96px;
		--line-height-12: 128px;

		--white: #fff;
		--black: #101112;
		--gray-200: #ced2d9;
		--gray-600: #6e7683;
		--blue-600: #1e61cd;
		--magenta-100: #f9d7eb;

		--max-width-0: 320px;
		--max-width-1: 768px;
	}

	:global(.post .post__content blockquote) {
		border-left: 5px solid black;
		padding-left: var(--space-3);
		margin-left: var(--space-4);
		@apply my-2;
	}

	:global(.post .post__content a) {
		@apply text-primary-600 font-bold;
	}
	:global(.post .post__content h1) {
		@apply text-7xl px-1;
	}
	:global(.post .post__content h2) {
		@apply text-6xl px-1;
	}
	:global(.post .post__content h3) {
		@apply text-5xl py-2;
	}
	:global(.post .post__content h4) {
		@apply text-4xl py-2;
	}
	:global(.post .post__content h5) {
		@apply text-3xl px-2;
	}
	:global(.post .post__content h6) {
		@apply text-xl py-2;
	}
	:global(.post .post__content ul) {
		@apply list-disc list-inside py-2;
	}

	:global(.post .post__excerpt) {
		font-family: var(--font-family-serif);
		font-size: var(--font-size-5);
		line-height: var(--line-height-4);
		margin-top: 0;
		font-weight: 400;
	}

	@media (min-width: 800px) {
		.post .post__content {
			margin-top: var(--space-4);
		}
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
