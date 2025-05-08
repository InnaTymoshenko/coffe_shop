import { z } from 'zod'

export const editProductSchema = z.object({
	title: z.string().min(2, 'Title is too short'),
	alt: z.string().min(5, 'Description is too short'),
	rating: z.number().min(1).max(5),
	ingridients: z.array(z.string().min(1)),
	price: z.array(
		z.object({
			size: z.string(),
			price: z.number().min(0),
			quantity: z.number().int().min(0),
			isChecked: z.boolean()
		})
	)
})

export const addProductSchema = z.object({
	title: z.string().min(2),
	alt: z.string().min(5),
	rating: z.number().min(1).max(5),
	category: z.enum(['Coffee', 'Cupcake']),
	ingridients: z
		.array(z.string())
		.optional()
		.transform(val => (val ?? []).filter(i => i.trim() !== '')),
	price: z.array(
		z.object({
			size: z.string(),
			price: z.number().min(0),
			quantity: z.number().int().min(0),
			isChecked: z.boolean()
		})
	),
	src: z.object({
		medium: z.string().url().optional().or(z.literal('')),
		portrait: z.string().url().optional().or(z.literal('')),
		landscape: z.string().url().optional().or(z.literal('')),
		tiny: z.string().url().optional().or(z.literal(''))
	})
})
