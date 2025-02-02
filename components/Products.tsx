/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import { DATA } from '@/types/item-type'
import { getServerSideProps } from '@/method/fn'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'
import Shell from './ui/Shell'

const Products = () => {
	const [coffees, setCoffees] = useState<DATA[]>()
	// const [cupcakes, setCupcakes] = useState<DATA[]>()

	const randonPrice = () => {
		const basePrice = Math.floor(Math.random() * 6) + 5
		const price = {
			small: basePrice, // Найменша ціна
			medium: basePrice + Math.floor(Math.random() * 3) + 2,
			large: basePrice + Math.floor(Math.random() * 5) + 6
		}

		return price
	}

	useEffect(() => {
		getServerSideProps(URL_COFFEE)
			.then(data => {
				const updatedData: DATA[] = data.map((coffee: DATA) => ({
					id: coffee.id,
					alt: coffee.alt,
					src: {
						medium: coffee.src.medium,
						portrait: coffee.src.portrait,
						landscape: coffee.src.landscape,
						tiny: coffee.src.tiny
					},
					category: 'Coffee',
					title: 'Cappuccino',
					size: ['small', 'medium', 'large'],
					quantity: {
						small: 0,
						medium: 1,
						large: 0
					},
					price: randonPrice(),
					rating: (Math.random() * 1 + 4).toFixed(1),
					totalPrice: 0
				}))

				setCoffees(updatedData)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		getServerSideProps(URL_CUPCAKE)
			.then(data => {
				// const updatedData: DATA[] = data.map((coffee: DATA) => ({
				// 	...coffee,
				// 	category: 'Cupcake',
				// 	title: 'Cupcake',
				// 	size: {
				// 		small: 'small',
				// 		medium: 'medium',
				// 		large: 'large'
				// 	},
				// 	price: {
				// 		small: 0,
				// 		medium: Math.floor(Math.random() * 20) + 5,
				// 		large: 0
				// 	},
				// 	rating: (Math.random() * 1 + 4).toFixed(1)
				// }))
				// setCupcakes(updatedData)
				console.log(data)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6">
				<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6">Coffee</h2>
					{coffees && (
						<div className="w-full flex flex-wrap gap-8 justify-center">
							{coffees?.map(coffee => (
								<div
									key={coffee.id}
									className="w-[16rem] h-[22rem]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
								>
									<Card item={coffee} />
								</div>
							))}
						</div>
					)}
				</div>
				{/* <div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6">Cupcake</h2>
					{cupcakes && <Card items={cupcakes} />}
				</div> */}
			</Shell>
		</div>
	)
}

export default Products
