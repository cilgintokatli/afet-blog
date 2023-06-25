<script lang="ts">
	import { urlFor } from '$lib/utils/image';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Card from '../../../components/Card.svelte';

	export let data: PageData;

	console.log('kategori test', data.data);
</script>

<div class="grid md:grid-cols-3 max-w-full md:max-w-6xl mt-4 m-auto">
	{#each data.data as post}
		<!-- <pre>{JSON.stringify(post, null, 2)}   {JSON.stringify($page, null, 2)}
      </pre> -->
		<Card {post} />
	{/each}
</div>
