'use client'

import React, { useEffect } from 'react'
import { useProductCart } from '@/store'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'
import Shell from './ui/Shell'

// type Props = {}

const TotalMenu = () => {
	const { fetchCoffe, fetchCupcake, cupcakeData, coffeeData } = useProductCart()

	console.log(coffeeData)
	console.log(cupcakeData)

	useEffect(() => {
		fetchCoffe(URL_COFFEE)
	}, [fetchCoffe])

	useEffect(() => {
		fetchCupcake(URL_CUPCAKE)
	}, [fetchCupcake])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6"></Shell>
		</div>
	)
}

export default TotalMenu
