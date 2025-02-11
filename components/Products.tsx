'use client'

import React, { useEffect } from 'react'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'
import Shell from './ui/Shell'
import { useProductCart } from '@/store'
import PtoductCard from './ProductCard'

const Products = () => {
	const { fetchCoffe, fetchCupcake, cupcakeData, coffeeData } = useProductCart()

	// console.log(cartProducts)

	useEffect(() => {
		fetchCoffe(URL_COFFEE)
	}, [fetchCoffe])

	useEffect(() => {
		fetchCupcake(URL_CUPCAKE)
	}, [fetchCupcake])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6">
				<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6">Coffee</h2>
					{coffeeData && (
						<div className="w-full flex flex-wrap gap-8 justify-center">
							{coffeeData?.slice(0, 8).map(coffee => (
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
				<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6">Cupcake</h2>
					{cupcakeData && (
						<div className="w-full flex flex-wrap gap-8 justify-center">
							{cupcakeData?.slice(0, 8).map(cupcake => (
								<div
									key={cupcake.id}
									className="w-[16rem] h-[22rem]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
								>
									<PtoductCard item={cupcake} />
								</div>
							))}
						</div>
					)}
				</div>
			</Shell>
		</div>
	)
}

export default Products
