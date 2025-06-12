import { UserProfile } from '@/types/users-type'

export const MockUser: UserProfile = {
	id: '1',
	firstName: 'Ілля',
	lastName: 'Стець',
	secondName: 'Максим',
	createdAt: '31.07.2024',
	updatedAt: '01.05.2025',
	status: 'active',
	birthday: '01.01.2000',
	email: 'adamenkopylyp@email.ua',
	phone: '+38 (076) 579-74-54',
	address: 'сквер Рівний, буд. 071 кв. 85, Берегове, 11086',
	gender: 'male',
	language: 'uk-UA',
	avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
	role: 'user',
	lastLoginAt: '05.09.2023 11:48',
	newsletterSubscribed: true,
	orderCount: 28,
	totalSpent: 1071.52,
	favoriteCafeId: 'obolon',
	notes: 'Prefers oat milk in coffee.',
	favoritesProductsIds: ['1', '5', 'summer-1', 'cup-4', 'autumn-cup-1'],
	personalDiscounts: [
		{ productId: 'coffee-1', reason: 'favorite', discount: 0.05 },
		{ productId: 'coffee-1', reason: 'birthday', discount: 0.1 },
		{ productId: 'cake-2', reason: 'loyalty', discount: 0.07 }
	]
}
