'use client'

import React from 'react'
import { Mosk_User } from '@/utils/moskUser'
import Shell from '@/components/ui/shell'
import { ProductData } from '@/types/item-type'
import { useProductCart } from '@/store'
import PtoductCard from '@/components/product-card'
// import { useSeasonalProducts } from '@/utils/hook/useSeasonalProducts'

const AccountFavoritePage = () => {
	const { coffeeData, cupcakeData } = useProductCart()
	const favoriteProducts: ProductData[] = [...coffeeData, ...cupcakeData].filter(product =>
		Mosk_User?.favoritesProductsIds.includes(product.id)
	)

	// const coffeeUpdated = useSeasonalProducts(coffeeData)
	// const cupcakeUpdated = useSeasonalProducts(cupcakeData)

	// console.log(coffeeUpdated.);

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">My Favorites Products</h1>
				{favoriteProducts && Mosk_User && (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{favoriteProducts?.map(product => (
							<div
								key={product.id}
								className="w-[16rem] h-[22rem] border border-gray-800 rounded-sm overflow-hidden flex flex-col items-center justify-between group"
							>
								<PtoductCard item={product} />
							</div>
						))}
					</div>
				)}
			</div>
		</Shell>
	)
}

export default AccountFavoritePage
