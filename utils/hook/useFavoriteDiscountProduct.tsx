import { useMemo } from 'react'
import { useSeasonalProducts } from './useSeasonalProducts'
import { useProductCart } from '@/store'
import { useAdminStore } from '@/store/admin-store'

export const useFavoriteDiscountProduct = () => {
	const { coffeeData, cupcakeData } = useProductCart()
	const moskUser = useAdminStore(state => state.moskUser)
	const coffeeUpdated = useSeasonalProducts(coffeeData)
	const cupcakeUpdated = useSeasonalProducts(cupcakeData)

	const favorites = useMemo(() => moskUser?.favoritesProductsIds ?? [], [moskUser])

	const allProducts = useMemo(
		() => [...coffeeUpdated.allWithPromo, ...cupcakeUpdated.allWithPromo],
		[coffeeUpdated.allWithPromo, cupcakeUpdated.allWithPromo]
	)

	const discountedProduct = useMemo(() => {
		if (!favorites.length) return null

		const seed = new Date().toISOString().slice(0, 10)
		const index = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % favorites.length
		const favoriteProductId = favorites[index]
		const product = allProducts.find(p => p.id === favoriteProductId)

		if (!product) return null

		const discountedPrice = product.price.map(p => ({
			...p,
			price: +(p.price * 0.95).toFixed(2),
			originalPrice: p.price,
			isDiscounted: true
		}))

		return { ...product, price: discountedPrice }
	}, [favorites, allProducts])

	return discountedProduct
}
