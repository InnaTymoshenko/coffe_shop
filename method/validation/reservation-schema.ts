import { z } from 'zod'

export const reservationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	address: z.string(),
	tel: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
	date: z.date({ required_error: 'Date is required' }).refine(date => date > new Date(), 'Date must be in the future'),
	time: z.string().min(1, 'Time is required'),
	guests: z.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests'),
	comment: z.string().max(500, 'Comment must be less than 500 characters').optional()
})
