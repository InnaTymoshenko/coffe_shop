import { z } from 'zod'

export const userProfileSchema = z.object({
	firstName: z.string().min(2, 'Імʼя надто коротке'),
	lastName: z.string().min(2, 'Прізвище надто коротке'),
	email: z.string().email('Невірна електронна адреса'),
	phone: z.string().min(10, 'Невірний номер телефону'),
	address: z.string().min(5, 'Адреса занадто коротка'),
	gender: z.enum(['male', 'female']),
	status: z.enum(['active', 'inactive', 'banned']),
	birthday: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат дати: дд.мм.рррр'),
	language: z.enum(['uk-UA', 'en-US']),
	avatarUrl: z.string().url('Некоректне посилання на аватар'),
	notes: z.string().optional()
})

export type UserProfileFormData = z.infer<typeof userProfileSchema>
