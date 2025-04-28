'use client'

import React, { useEffect } from 'react'
import { URL_COFFEE } from '@/method/type'
import { useProductCart } from '@/store'
import PtoductCard from './ProductCard'

const CoffeeList = () => {
	const { fetchCoffe, coffeeData } = useProductCart()

	// console.log(cartProducts)
	// console.log(coffeeData)

	useEffect(() => {
		fetchCoffe(URL_COFFEE)
	}, [fetchCoffe])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">Coffee</h2>
				{coffeeData && (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{coffeeData?.map(coffee => (
							<div
								key={coffee.id}
								className="w-[16rem] h-[22rem]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
							>
								<PtoductCard item={coffee} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default CoffeeList
