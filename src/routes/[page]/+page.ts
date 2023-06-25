import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPage } from '$lib/utils/sanity';

export const ssr = false;

export const load = (async ({ params }) => {
	const sayfa = await getPage(params.page);

	if (sayfa) return sayfa;

	throw error(404, 'Not found');
}) satisfies PageLoad;
