/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import Shell from '@/components/ui/shell'
import { useAdminStore } from '@/store/admin-store'
import { useCurrentFormattedDateTime } from '@/utils/hook/useCurrentFormattedDateTime'
import { useFavoriteDiscountProduct } from '@/utils/hook/useFavoriteDiscountProduct'
import DiscountProductCard from '@/components/discount-product-card'

const AccountMainPage = () => {
	const { moskUser } = useAdminStore()
	const currentDateTime = useCurrentFormattedDateTime()
	const discountedProduct = useFavoriteDiscountProduct()

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">{`Hello, ${moskUser.firstName}!`}</h1>
				<p>{`Today is ${currentDateTime}`}</p>
			</div>
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Favorite Deal of the Day</h2>
			{discountedProduct ? (
				<div className="relative group w-[16rem] h-[32rem] border border-gray-800 rounded-sm overflow-hidden flex flex-col items-center justify-between transition-transform duration-300 hover:scale-105">
					<span className="absolute top-2 left-2 z-10 bg-orange-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full shadow animate-pulse">
						Special 5% Off
					</span>
					<img src={discountedProduct.src.medium} alt={discountedProduct.alt} className="w-full h-2/3 object-cover" />
					<div className="p-4 w-full flex flex-col items-center justify-between gap-2">
						<h3 className="text-lg font-semibold text-gray-100 text-center">{discountedProduct.alt}</h3>
						<p className="text-orange-400 text-xl font-bold">${discountedProduct.price[0].price.toFixed(2)}</p>
						<button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-all duration-200">
							Add to Cart
						</button>
					</div>
				</div>
			) : (
				<p>No favorite products yet.</p>
			)}
			<div className="w-full flex flex-col gap-2 justify-start items-start">
				<div className="w-full border border-gray-800 rounded-sm relative overflow-hidden group">
					{discountedProduct && <DiscountProductCard item={discountedProduct} />}
					<div className="absolute inset-0 bg-gray-800/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
				</div>
			</div>
		</Shell>
	)
}

export default AccountMainPage
