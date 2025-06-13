'use client'

import React from 'react'
import Shell from './ui/shell'
import { useProductCart } from '@/store'
import MenuList from './menu-list'
import { useSeasonalProducts } from '@/utils/hook/useSeasonalProducts'

const Products = () => {
	const { productData } = useProductCart()
	const coffeeData = productData.filter(p => p.category === 'Coffee')
	const cupcakeData = productData.filter(p => p.category === 'Cupcake')
	const coffeeUpdated = useSeasonalProducts(coffeeData)
	const cupcakeUpdated = useSeasonalProducts(cupcakeData)

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6">
				{coffeeUpdated && <MenuList products={coffeeUpdated.seasonalOnly} title={'Coffee'} tab={'coffee'} />}
				{cupcakeUpdated && <MenuList products={cupcakeUpdated.seasonalOnly} title={'Cupcake'} tab={'cupcake'} />}
			</Shell>
		</div>
	)
}

export default Products
