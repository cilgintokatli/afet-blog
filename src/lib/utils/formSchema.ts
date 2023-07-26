import { z } from 'zod';

export const formSchema = z.object({
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
