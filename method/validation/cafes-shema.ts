import { z } from 'zod'

export const newCafeSchema = z.object({
	name: z.string().min(3, 'Name is required'),
	address: z.string().min(5, 'Address is required'),
	lat: z.coerce.number().min(-90).max(90),
	lng: z.coerce.number().min(-180).max(180),
	img: z.string().url('Image must be a valid URL'),
	phone: z.string().min(10, 'Phone is required'),
	managerName: z.string().min(3, 'Manager name is required'),
	managerEmail: z.string().email('Invalid email'),
	openingHours: z.string(),
	isActive: z.boolean().default(true),
	notes: z.string().optional()
})

export const cafeSchema = z.object({
	name: z.string().min(3, 'Назва закладу обовʼязкова'),
	address: z.string().min(5, 'Адреса обовʼязкова'),
	phone: z.string().min(10, 'Телефон обовʼязковий'),
	managerName: z.string().min(3, 'Імʼя менеджера обовʼязкове'),
	managerEmail: z.string().email('Невірний email'),
	openingHours: z.string(),
	isActive: z.boolean(),
	notes: z.string().optional()
})
