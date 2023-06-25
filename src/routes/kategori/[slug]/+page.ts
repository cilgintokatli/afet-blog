import type { PageLoad } from './$types';
import { getPostsbyCategory } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const data = await getPostsbyCategory(params.slug);
	if (data) return { data };

	throw error(404, 'Not found');
}) satisfies PageLoad;
