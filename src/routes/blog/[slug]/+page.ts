import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPost } from '$lib/utils/sanity';

export const load = (async ({ params }) => {
	const post = await getPost(params.slug);
	if (post) return post;

	throw error(404, 'Yazı bulunamadı');
}) satisfies PageLoad;
