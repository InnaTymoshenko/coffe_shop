'use client'

import React, { useEffect } from 'react'
import { URL_CUPCAKE } from '@/method/type'
import { useProductCart } from '@/store'
import PtoductCard from './ProductCard'

const CupcakeList = () => {
	const { fetchCupcake, cupcakeData } = useProductCart()

	// console.log(cartProducts)

	useEffect(() => {
		fetchCupcake(URL_CUPCAKE)
	}, [fetchCupcake])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">Cupcake</h2>
				{cupcakeData && (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{cupcakeData?.map(cupcake => (
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
		</div>
	)
}

export default CupcakeList
