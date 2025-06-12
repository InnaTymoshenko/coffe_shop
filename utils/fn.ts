import { API_KEY } from '@/config'
import { PersonalDiscount } from '@/types/discount'
import { ProductData, Size } from '@/types/item-type'

export type DateRange = 'all' | 'week' | 'month' | 'year'

export async function getServerSideProps(url: string) {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: API_KEY
		}
	})
	const data = await res.json()
	return data.photos
}

// export const generateRandomPrice = (size: string, category: string): number => {
// 	if (category === 'Coffee') {
// 		const basePrice = Math.floor(Math.random() * 6) + 5

// 		switch (size) {
// 			case 'small':
// 				return basePrice
// 			case 'medium':
// 				return basePrice + Math.floor(Math.random() * 3) + 5
// 			case 'large':
// 				return basePrice + Math.floor(Math.random() * 5) + 5
// 			default:
// 				return basePrice
// 		}
// 	}
// 	return Math.floor(Math.random() * 25) + 10
// }

// export const generateSpecialIngredient = (category: string): string => {
// 	const coffeeIngredients = ['Milk', 'Double Coffee', 'Chocolate', 'Cream', '']
// 	const cakeIngredients = ['Nuts', 'Candied Fruits', 'Fresh Berries', '']

// 	const ingredientsList = category === 'Coffee' ? coffeeIngredients : cakeIngredients
// 	return ingredientsList[Math.floor(Math.random() * ingredientsList.length)]
// }

export const getFavoriteDiscountProduct = (
	products: ProductData[],
	favoriteIds: string[],
	personalDiscounts: PersonalDiscount[]
): ProductData | null => {
	if (!favoriteIds.length) return null

	const seed = new Date().toISOString().slice(0, 10)
	const index = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % favoriteIds.length
	const selectedId = favoriteIds[index]

	const product = products.find(p => p.id === selectedId)
	if (!product) return null

	const globalDiscount = product.promotion?.isActive ? 0.1 : 0
	const bestDiscount = getBestDiscount(product.id, personalDiscounts, globalDiscount)

	const discountedPrice = product.price.map(p => ({
		...p,
		originalPrice: p.price,
		price: +(p.price * (1 - bestDiscount)).toFixed(2),
		isDiscounted: bestDiscount > 0
	}))

	const totalPrice = discountedPrice.reduce((sum, p) => sum + p.price * p.quantity, 0)

	return {
		...product,
		price: discountedPrice,
		totalPrice
	}
}

export const getBestDiscount = (
	productId: string,
	personalDiscounts: PersonalDiscount[] = [],
	globalDiscount: number = 0
): number => {
	const matched = personalDiscounts.filter(d => d.productId === productId).map(d => d.discount)
	matched.push(globalDiscount)
	return Math.max(...matched, 0)
}

export const quantityHandler = (item: ProductData, selected: Size) => {
	const qt = item.price.find(q => q.size === selected)
	return qt?.quantity
}

export const defaultPrice = (item: ProductData, selected: Size) => {
	const price = item.price.find(p => p.size === selected)
	return price?.price.toFixed(2)
}

export const discountPrice = (item: ProductData, selected: Size) => {
	const selectedPrice = item.price.find(p => p.size === selected)

	if (selectedPrice?.isDiscounted && selectedPrice.originalPrice !== undefined) {
		return selectedPrice.originalPrice.toFixed(2)
	}

	return null
}

export const getCurrentYear = (): number => {
	return new Date().getFullYear()
}

export function getRandomUniqueItems<T>(array: T[], count: number): T[] {
	const shuffled = [...array].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, count)
}

export function sortByDateTime<T>(items: T[], dateKey: keyof T, timeKey: keyof T): T[] {
	return [...items].sort((a, b) => {
		const parseDateTime = (item: T): number => {
			const dateStr = item[dateKey] as string
			const timeStr = item[timeKey] as string
			const [day, month, year] = dateStr.split('.').map(Number)
			const [hours, minutes] = timeStr.split(':').map(Number)
			return new Date(year, month - 1, day, hours, minutes).getTime()
		}
		return parseDateTime(b) - parseDateTime(a)
	})
}

export const formatDate = (isoDate: string): string => {
	const [year, month, day] = isoDate.split('-')
	return `${day}.${month}.${year}`
}

export const normalizedPhone = (phone: string) => {
	return phone.replace(/[^+\d]/g, '')
}

export function formatDateTime(createdDateAt: string, createdTimeAt: string): string {
	const dateSeparator = createdDateAt.includes('.') ? '.' : '/'

	const [dayStr, monthStr, yearStr] = createdDateAt.split(dateSeparator)
	const day = Number(dayStr)
	const month = Number(monthStr) - 1
	const year = Number(yearStr)

	const [hours, minutes] = createdTimeAt.split(':')
	const date = new Date(year, month, day, Number(hours), Number(minutes))

	if (isNaN(date.getTime())) return 'Invalid date'

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	const getOrdinal = (n: number): string => {
		const s = ['th', 'st', 'nd', 'rd']
		const v = n % 100
		return n + (s[(v - 20) % 10] || s[v] || s[0])
	}

	return `${getOrdinal(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()} ${String(
		date.getHours()
	).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function filterByDateRange<T>(data: T[], range: DateRange, dateField: keyof T): T[] {
	if (range === 'all') return data
	const now = new Date()
	const threshold = new Date()

	if (range === 'week') threshold.setDate(now.getDate() - 7)
	if (range === 'month') threshold.setMonth(now.getMonth() - 1)
	if (range === 'year') threshold.setFullYear(now.getFullYear() - 1)

	return data.filter(d => {
		const date = new Date((d[dateField] as string).split('.').reverse().join('-'))
		return date >= threshold
	})
}

export const getSeason = (): 'spring' | 'summer' | 'autumn' | 'winter' => {
	const month = new Date().getMonth() + 1
	if (month >= 3 && month <= 5) return 'spring'
	if (month >= 6 && month <= 8) return 'summer'
	if (month >= 9 && month <= 11) return 'autumn'
	return 'winter'
}
