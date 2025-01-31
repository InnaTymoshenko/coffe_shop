'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import { DATA } from '@/types/item-type'
import { getServerSideProps } from '@/method/fn'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'

const Products = () => {
	const [coffees, setCoffees] = useState<DATA[]>()
	const [cupcakes, setCupcakes] = useState<DATA[]>()

	useEffect(() => {
		getServerSideProps(URL_COFFEE)
			.then(data => {
				const updatedData: DATA[] = data.map((coffee: DATA) => ({
					...coffee,
					category: 'Coffee',
					title: 'Cappuccino',
					price: {
						small: Math.floor(Math.random() * 8) + 5,
						medium: Math.floor(Math.random() * 10) + 5,
						large: Math.floor(Math.random() * 11) + 5
					},
					rating: (Math.random() * 1 + 4).toFixed(1)
				}))

				setCoffees(updatedData)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		getServerSideProps(URL_CUPCAKE)
			.then(data => {
				const updatedData: DATA[] = data.map((coffee: DATA) => ({
					...coffee,
					category: 'Cupcake',
					title: 'Cupcake',
					price: {
						small: 0,
						medium: Math.floor(Math.random() * 20) + 5,
						large: 0
					},
					rating: (Math.random() * 1 + 4).toFixed(1)
				}))
				setCupcakes(updatedData)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8">
			<div className="w-[80%] flex flex-col flex-wrap gap-4 justify-center items-start mx-auto p-4">
				<h2 className="text-white text-3xl my-6">Coffee</h2>
				{coffees && <Card items={coffees} />}
			</div>
			<div className="w-[80%] flex flex-col flex-wrap gap-4 justify-center items-start mx-auto p-4">
				<h2 className="text-white text-3xl my-6">Cupcake</h2>
				{cupcakes && <Card items={cupcakes} />}
			</div>
		</div>
	)
}

export default Products
