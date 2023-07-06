<script lang="ts">
	import { page } from '$app/stores';
	import 'iconify-icon';

	import { drawerStore } from '@skeletonlabs/skeleton';
	export let menuItems: Array<string>;
	export let siteTitle: string | undefined;

	export let sosyalMedya: Object;

	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<div class="sosyal bg-primary-600">
	<div class="md:max-w-6xl w-full m-auto pt-5">
		<ul class="flex flex-row gap-5 !justify-end">
			<li>
				<a href={sosyalMedya?.twitter}>
					<iconify-icon icon="mdi:twitter" style="color: white;" width="28" height="28" />
				</a>
			</li>
			<li>
				<a href={sosyalMedya?.instagram}>
					<iconify-icon icon="ri:instagram-fill" style="color: white;" width="28" height="28" />
				</a>
			</li>
			<li>
				<a href={sosyalMedya?.facebook}>
					<iconify-icon icon="ic:baseline-facebook" style="color: white;" width="28" height="28" />
				</a>
			</li>
		</ul>
	</div>
</div>
<header class="sticky top-0 z-10 bg-primary-600 py-10 md:px-0 px-3">
	<div class="flex flex-row items-center justify-between w-full md:max-w-6xl m-auto">
		<div><a class=" text-6xl font-bold" href="/">{siteTitle ?? 'Afet Ağı'}</a></div>
		<nav class="hidden md:block">
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Anasayfa</a>
				</li>
				{#each menuItems as menuItem}
					{#if menuItem._type == 'category'}
						<li class="pl-3">
							<a href="/kategori/{menuItem.slug}">{menuItem.title}</a>
						</li>
					{:else}
						<li class="pl-3">
							<a href="/{menuItem.slug}">{menuItem.title}</a>
						</li>
					{/if}
				{/each}
			</ul>
		</nav>

		<button class="block md:hidden btn" on:click={drawerOpen}>
			<svg
				height="32px"
				id="Layer_1"
				style="enable-background:new 0 0 32 32;"
				version="1.1"
				viewBox="0 0 32 32"
				width="32px"
				xml:space="preserve"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				><path
					d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"
				/></svg
			>
		</button>
	</div>
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: all 0.2s linear;
	}

	nav li a:hover {
		background-color: white;
		opacity: 0.7;
	}
</style>
