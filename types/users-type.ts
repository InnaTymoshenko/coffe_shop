import { PersonalDiscount } from './discount'
import { OrderData } from './order-type'

export type UserRole = 'user' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'banned'

export interface UserProfile {
	id: string
	firstName: string
	lastName: string
	secondName?: string
	createdAt: string
	updatedAt: string
	status: UserStatus
	birthday: string
	email: string
	phone: string
	address: string
	gender: 'male' | 'female'
	language: 'uk-UA' | 'en-US'
	avatarUrl: string
	role: UserRole
	lastLoginAt: string
	newsletterSubscribed: boolean
	orderCount: number
	totalSpent: number
	favoriteCafeId: string | null
	favoritesProductsIds: string[]
	notes?: string
	personalDiscounts: PersonalDiscount[]
}

export interface UserWithOrder extends UserProfile {
	orders: OrderData[]
}
