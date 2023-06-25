<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import { urlFor } from '$lib/utils/image';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.title} - {data.siteSettings.title}</title>
	<meta name="description" content={data?.excerpt} />
	<meta name="author" content={data?.author} />
</svelte:head>

<div class="md:max-w-6xl max-w-full p-2 md:p-0 m-auto">
	{#if data.image}
		<img src={urlFor(data.image).url()} alt="" />
	{/if}
	<h1 class="my-4 text-4xl font-bold">{data.title}</h1>
	<div class="sayfa">
		<PortableText value={data.body} />
	</div>
</div>

<style>
	:global(.sayfa blockquote) {
		border-left: 5px solid black;
		padding-left: 12px;
		margin-left: 20px;
	}
	:global(.sayfa a) {
		text-decoration: none;
		color: #1e61cd;
	}
</style>
