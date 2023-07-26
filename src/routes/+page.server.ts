import type { Actions, RequestEvent } from '@sveltejs/kit';

import { z } from 'zod';

const schema = z.object({
	name: z.string().default('deneme'),
	email: z.string().email()
});

export const actions: Actions = {
	multistep: async ({ request }: RequestEvent) => {
		console.log('form postladı');
		const offf = Object.fromEntries(await request.formData());

		// const data = await request.formData();

		// const isim = data.get('isim');

		const { isim } = offf;

		console.log(isim);

		console.table(offf);

		return {
			success: true
		};
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
