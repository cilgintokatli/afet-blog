// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

import { getPosts, getSlider } from '$lib/utils/sanity';
import { error, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
// import { superValidate } from 'sveltekit-superforms/server';

import type { PageLoad } from './$types';
export const prerender = false;

const schema = z.object({
	name: z.string().min(2, 'en az 2 karakter olmalı'),
	email: z.string().email(),
	firstName: z
		.string()
		.min(2, 'Must be at least 2 characters')
		.max(50, 'Must be less than 50 characters'),
	lastName: z
		.string()
		.min(2, 'Must be at least 2 characters')
		.max(50, 'Must be less than 50 characters')
});

export const load = (async () => {
	const posts = await getPosts();
	const sliders = await getSlider();
	// const form = await superValidate(schema);

	return {
		posts,
		sliders
		// form
	};

	throw error(404, 'Not found');
}) satisfies PageLoad;
