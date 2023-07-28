<script lang="ts">
	import '../app.postcss';
	import '../theme.postcss';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navigation from '../components/Navigation.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { webVitals } from '$lib/utils/vitals';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	// import './styles.css';
	export let data: LayoutData;

	const currentYear = new Date().getFullYear();

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<Drawer>
	<Navigation menuItems={data.siteSettings.menuItems} />
</Drawer>

<div class="app">
	<AppShell slotSidebarLeft="w-0 bg-surface-500/10">
		<svelte:fragment slot="header"
			><Header
				siteTitle={data.siteSettings.title}
				menuItems={data.siteSettings.menuItems}
				sosyalMedya={data.siteSettings.sosyalmedya}
			/></svelte:fragment
		>
		<svelte:fragment slot="sidebarLeft">
			<Navigation menuItems={data.siteSettings.menuItems} />
		</svelte:fragment>
		<!-- (sidebarRight) -->
		<!-- (pageHeader) -->
		<!-- Router Slot -->
		<main>
			<slot />
		</main>
		<!-- ---- / ---- -->
		<svelte:fragment slot="pageFooter">
			<footer class="mt-20">
				<p>
					&#xa9; {currentYear}
					<strong>{data.siteSettings.title}</strong> - Her Hakkı Saklıdır
				</p>
			</footer>
		</svelte:fragment>
		<!-- (footer) -->
	</AppShell>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
