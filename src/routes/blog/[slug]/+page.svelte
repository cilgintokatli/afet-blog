<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Yazi from '../../../components/Yazi.svelte';
</script>

<svelte:head>
	<title>{data.title} - {data.siteSettings.title}</title>
	<meta name="description" content={data?.excerpt} />
	<meta name="author" content={data?.author} />
</svelte:head>

<Yazi {data} />
