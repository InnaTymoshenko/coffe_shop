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
	return ingredientsList[Math.floor(Math.random() * ingredientsList.length)] // Випадковий вибір
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
	const shuffled = [...array].sort(() => 0.5 - Math.random()) // перемішуємо копію масиву
	return shuffled.slice(0, count)
}
