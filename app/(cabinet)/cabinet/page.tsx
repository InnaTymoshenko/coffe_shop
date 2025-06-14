'use client'

import React, { useEffect } from 'react'
import Shell from '@/components/ui/shell'
import { useAdminStore } from '@/store/admin-store'
import { useCurrentFormattedDateTime } from '@/utils/hook/useCurrentFormattedDateTime'
import { useFavoriteDiscountProduct } from '@/utils/hook/useFavoriteDiscountProduct'
import DiscountProductCard from '@/components/discount-product-card'
import { useProductCart } from '@/store'
import { getFavoriteSeasonalDiscountProduct } from '@/utils/discount-favorite'

const AccountMainPage = () => {
	const { mockUser } = useAdminStore()
	const { productData } = useProductCart()
	const currentDateTime = useCurrentFormattedDateTime()
	const discountedProduct = useFavoriteDiscountProduct()
	const { setDiscountedProduct } = useAdminStore()

	useEffect(() => {
		if (mockUser && productData.length) {
			const discounted = getFavoriteSeasonalDiscountProduct(productData, mockUser.favoritesProductsIds || [])
			if (discounted) setDiscountedProduct(discounted)
		}
	}, [mockUser, productData, setDiscountedProduct])

	return (
		<Shell className="container flex flex-col gap-8 text-gray-200">
			<div className="w-full flex flex-col gap-4 justify-start items-start">
				<h1 className="text-3xl font-bold my-8">{`Hello, ${mockUser.firstName}!`}</h1>
				<p className="text-gray-400">{`Today is ${currentDateTime}`}</p>
			</div>
			<h2 className="text-2xl font-bold mb-4">Favorite Deal of the Day</h2>
			<div className="w-full flex flex-col gap-2 justify-start items-start">
				<div className="w-full border border-gray-800 rounded-sm relative overflow-hidden group">
					{discountedProduct ? <DiscountProductCard item={discountedProduct} /> : <p>No favorite products yet.</p>}
					<div className="absolute inset-0 bg-gray-800/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
				</div>
			</div>
		</Shell>
	)
}

export default AccountMainPage
