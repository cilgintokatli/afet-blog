import { AIRTABLE_TOKEN, AIRTABLE_TABLE_ID, AIRTABLE_BASE } from '$env/static/private';

import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { isim, email, input1, input2, password } = await request.json();

	const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE_ID}`;

	let data = {
		records: [
			{
				fields: {
					isim,
					email,
					input1,
					input2,
					password
				}
			}
		]
	};
	const res = await fetch(AIRTABLE_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${AIRTABLE_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (res.ok) {
		return json({
			message: 'success'
		});
	} else {
		return json({
			message: 'failed',
			status: 404
		});
	}
};
