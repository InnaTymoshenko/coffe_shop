import { z } from 'zod'

export const promotionSchema = z
	.object({
		title: z.string().min(2, 'Title is required'),
		description: z.string().min(5, 'Description is required'),
		start: z.string().min(1, 'Start date is required'),
		end: z.string().min(1, 'End date is required'),
		isActive: z.boolean(),
		status: z.enum(['active', 'finished', 'moderation']),
		type: z.enum(['event-based', 'combo', 'time-limited', 'discount', 'seasonal', '2+1'])
	})
	.refine(data => new Date(data.end) >= new Date(data.start), {
		message: 'End date must be after or equal to start date',
		path: ['end']
	})

export type PromotionFormData = z.infer<typeof promotionSchema>
