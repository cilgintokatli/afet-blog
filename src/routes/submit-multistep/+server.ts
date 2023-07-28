import {
	PRIVATE_AIRTABLE_BASE_ID,
	PRIVATE_AIRTABLE_TABLE_ID,
	PRIVATE_AIRTABLE_TOKEN
} from '$env/static/private';

import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { isim, email, input1, input2, password } = await request.json();

	console.log('PRIVATE_AIRTABLE_BASE_ID', PRIVATE_AIRTABLE_BASE_ID);
	console.log('PRIVATE_AIRTABLE_TABLE_ID', PRIVATE_AIRTABLE_TABLE_ID);
	console.log('PRIVATE_AIRTABLE_TOKEN', PRIVATE_AIRTABLE_TOKEN);
	// const AIRTABLE_BASE_ID = 'appVieY4MkgOAYcTV';
	const AIRTABLE_URL = `https://api.airtable.com/v0/${PRIVATE_AIRTABLE_BASE_ID}/${PRIVATE_AIRTABLE_TABLE_ID}`;

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
			Authorization: `Bearer ${PRIVATE_AIRTABLE_TOKEN}`,
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
