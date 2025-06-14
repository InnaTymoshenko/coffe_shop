import { useProductCart } from '@/store'
import { useAdminStore } from '@/store/admin-store'
import { getFavoriteSeasonalDiscountProduct } from '../discount-favorite'

export const useFavoriteDiscountProduct = () => {
	const { productData } = useProductCart()
	const mockUser = useAdminStore(state => state.mockUser)

	if (!mockUser) return null

	return getFavoriteSeasonalDiscountProduct(productData, mockUser.favoritesProductsIds || [])
}

// import { useMemo } from 'react'
// import { useSeasonalProducts } from './useSeasonalProducts'
// import { useProductCart } from '@/store'
// import { useAdminStore } from '@/store/admin-store'
// import { ProductData } from '@/types/item-type'

// export const useFavoriteDiscountProduct = () => {
// 	const { productData } = useProductCart()
// 	const mockUser = useAdminStore(state => state.mockUser)
// 	const favorites = mockUser?.favoritesProductsIds
// 		.map(f => productData.find(p => p.id === f))
// 		.filter((p): p is ProductData => p !== undefined)

// 	const updatedProducts = useSeasonalProducts(favorites)

// 	const discountedProduct = useMemo(() => {
// 		if (!updatedProducts.allWithPromo.length) return null

// 		const seed = new Date().toISOString().slice(0, 10)
// 		const index =
// 			Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % updatedProducts.allWithPromo.length
// 		const product = updatedProducts.allWithPromo[index]

// 		if (!product) return null

// 		const discountedPrice = product.price.map(p => ({
// 			...p,
// 			price: +(p.price * 0.95).toFixed(2),
// 			originalPrice: p.price,
// 			isDiscounted: true
// 		}))

// 		return { ...product, price: discountedPrice }
// 	}, [updatedProducts.allWithPromo])

// 	return discountedProduct
// }
