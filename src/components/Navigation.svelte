<script lang="ts">
	import { page } from '$app/stores';
	export let menuItems: string[];

	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/" on:click={drawerClose}>Anasayfa</a>
		</li>
		{#each menuItems as menuItem}
			{#if menuItem._type == 'category'}
				<li class="">
					<a href="/kategori/{menuItem.slug}" on:click={drawerClose}>{menuItem.title}</a>
				</li>
			{:else}
				<li class="">
					<a href="/{menuItem.slug}" on:click={drawerClose}>{menuItem.title}</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
