// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

import { getPosts, getSlider } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const prerender = false;

export const load = (async () => {
	const posts = await getPosts();
	const sliders = await getSlider();

	return {
		posts,
		sliders
	};

	throw error(404, 'Not found');
}) satisfies PageLoad;
