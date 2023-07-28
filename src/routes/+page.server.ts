import type { Actions, RequestEvent } from '@sveltejs/kit';

import { z } from 'zod';

const schema = z.object({
	name: z.string().default('deneme'),
	email: z.string().email()
});

export const actions: Actions = {
	multistep: async ({ request, fetch }: RequestEvent) => {
		const data = Object.fromEntries(await request.formData());

		const res = await fetch('/submit-multistep', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const responseJson = await res.json();
		return {
			body: responseJson
		};

		// return {
		// 	success: true
		// };
		// const form = await superValidate(request, schema);
		// console.log('POST', form);
		// // Convenient validation check:
		// if (!form.valid) {
		// 	// Again, always return { form } and things will just work.
		// 	// return fail(400, { form });
		// 	console.log('form valid değil');
		// }
		// // TODO: Do something with the validated data
		// // Yep, return { form } here too
		// return { form };
	}
};
