import { z } from 'zod'

export const contactSchema = z.object({
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
	message: z.string().min(5, 'Message should be at least 5 characters')
})

export type ContactFormData = z.infer<typeof contactSchema>
