import { API_KEY } from '@/config'
import { ProductData, Size } from '@/types/item-type'

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

export const generateRandomPrice = (size: string, category: string): number => {
	if (category === 'Coffee') {
		const basePrice = Math.floor(Math.random() * 6) + 5

		switch (size) {
			case 'small':
				return basePrice
			case 'medium':
				return basePrice + Math.floor(Math.random() * 3) + 5
			case 'large':
				return basePrice + Math.floor(Math.random() * 5) + 5
			default:
				return basePrice
		}
	}
	return Math.floor(Math.random() * 25) + 10
}

export const generateSpecialIngredient = (category: string): string => {
	const coffeeIngredients = ['Milk', 'Double Coffee', 'Chocolate', 'Cream', '']
	const cakeIngredients = ['Nuts', 'Candied Fruits', 'Fresh Berries', '']

	const ingredientsList = category === 'Coffee' ? coffeeIngredients : cakeIngredients
	return ingredientsList[Math.floor(Math.random() * ingredientsList.length)]
}

export const quantityHandler = (item: ProductData, selected: Size) => {
	const qt = item.price.find(q => q.size === selected)
	return qt?.quantity
}

export const defaultPrice = (item: ProductData, selected: Size) => {
	const price = item.price.find(p => p.size === selected)
	return price?.price
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
