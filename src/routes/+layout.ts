import { getSiteSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { LayoutServerData } from './$types';

export const load = (async () => {
	const siteSettings = await getSiteSettings();

	if (siteSettings) {
		return {
			siteSettings
		};
	}

	throw error(404, 'Not found');
}) satisfies LayoutServerData;
