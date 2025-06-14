import { ProductData } from '@/types/item-type'
import { getSeason } from '@/utils/fn'

export function getFavoriteSeasonalDiscountProduct(
	allProducts: ProductData[],
	favoriteIds: string[]
): ProductData | null {
	const currentSeason = getSeason()

	// Знаходимо обрані товари
	const favorites = favoriteIds.map(id => allProducts.find(p => p.id === id)).filter((p): p is ProductData => !!p)

	// Сезонна акція активна
	const seasonalFavorites = favorites.filter(p => {
		const promo = p.promotion
		return promo && promo.type === 'seasonal' && promo.season === currentSeason
	})

	if (!seasonalFavorites.length) return null

	// Вибір одного продукту за "датою" — продукт дня
	const seed = new Date().toISOString().slice(0, 10)
	const index = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % seasonalFavorites.length

	const product = seasonalFavorites[index]

	// Застосовуємо знижку
	const discountedPrices = product.price.map(p => ({
		...p,
		originalPrice: p.price,
		price: +(p.price * 0.95).toFixed(2),
		isDiscounted: true
	}))

	return {
		...product,
		price: discountedPrices
	}
}
