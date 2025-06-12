'use client'

import React from 'react'
import Shell from '@/components/ui/shell'
import { ProductData } from '@/types/item-type'
import { useProductCart } from '@/store'
import { useAdminStore } from '@/store/admin-store'
import AccountProductCard from '@/components/account-product-card'
import { useSeasonalProducts } from '@/utils/hook/useSeasonalProducts'

const AccountFavoritePage = () => {
	const { coffeeData, cupcakeData } = useProductCart()
	const mockUser = useAdminStore(state => state.mockUser)
	const coffeeUpdated = useSeasonalProducts(coffeeData)
	const cupcakeUpdated = useSeasonalProducts(cupcakeData)

	const favoriteProducts: ProductData[] = [...coffeeUpdated.allProducts, ...cupcakeUpdated.allProducts].filter(
		product => mockUser?.favoritesProductsIds?.includes(product.id)
	)

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 pb-6 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">My Favorites Products</h1>
				{favoriteProducts.length > 0 && mockUser ? (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{favoriteProducts?.map(product => (
							<div
								key={product.id}
								className="lg:w-[16rem] sm:w-[90%] mx-auto lg:h-[22rem] sm:h-[30rem] border border-gray-800 rounded-sm overflow-hidden flex flex-col items-center justify-between group"
							>
								<AccountProductCard product={product} />
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-200 text-xl font-bold my-8">No favorite products yet.</p>
				)}
			</div>
		</Shell>
	)
}

export default AccountFavoritePage
