import { API_KEY } from '@/config'

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
		const basePrice = Math.floor(Math.random() * 6) + 5 // 5 - 10

		switch (size) {
			case 'small':
				return basePrice
			case 'medium':
				return basePrice + Math.floor(Math.random() * 3) + 2 // +2 - +4
			case 'large':
				return basePrice + Math.floor(Math.random() * 5) + 4 // +4 - +8
			default:
				return basePrice
		}
	}

	// Для кейків або інших категорій
	return Math.floor(Math.random() * 25) + 10 // 5 - 10
}

export const generateSpecialIngredient = (category: string): string => {
	const coffeeIngredients = ['Milk', 'Double Coffee', 'Chocolate', 'Cream', '']
	const cakeIngredients = ['Nuts', 'Candied Fruits', 'Fresh Berries', '']

	const ingredientsList = category === 'Coffee' ? coffeeIngredients : cakeIngredients
	return ingredientsList[Math.floor(Math.random() * ingredientsList.length)] // Випадковий вибір
}
