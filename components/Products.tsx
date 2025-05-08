'use client'

import React, { useEffect, useState } from 'react'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'
import Shell from './ui/shell'
import { useProductCart } from '@/store'
import { ProductData } from '@/types/item-type'
import MenuList from './menu-list'

const Products = () => {
	const [coffeeGroup, setCoffeeGroup] = useState<ProductData[] | null>(null)
	const [cupcakeGroup, setCupcakeGroup] = useState<ProductData[] | null>(null)
	const { fetchCoffe, fetchCupcake, cupcakeData, coffeeData } = useProductCart()

	useEffect(() => {
		fetchCoffe(URL_COFFEE)
	}, [fetchCoffe])

	useEffect(() => {
		fetchCupcake(URL_CUPCAKE)
	}, [fetchCupcake])

	useEffect(() => {
		if (!coffeeData) return
		const group = coffeeData.slice(0, 4)
		setCoffeeGroup(group)
	}, [coffeeData])

	useEffect(() => {
		if (!cupcakeData) return
		const group = cupcakeData.slice(0, 4)
		setCupcakeGroup(group)
	}, [cupcakeData])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6">
				{coffeeGroup && <MenuList products={coffeeGroup} title={'Coffee'} tab={'coffee'} />}
				{cupcakeGroup && <MenuList products={cupcakeGroup} title={'Cupcake'} tab={'cupcake'} />}
			</Shell>
		</div>
	)
}

export default Products
