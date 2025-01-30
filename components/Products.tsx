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
				console.log(data)
				setCoffees(data)
			})
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		getServerSideProps(URL_CUPCAKE)
			.then(data => {
				setCupcakes(data)
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
