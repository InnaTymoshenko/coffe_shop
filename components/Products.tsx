'use client'

import React from 'react'
import Shell from './ui/shell'
import { useProductCart } from '@/store'
import MenuList from './menu-list'
import { getSeason } from '@/utils/fn'
import { useSeasonalProducts } from '@/utils/hook/useSeasonalProducts'

const Products = () => {
	const { cupcakeData, coffeeData } = useProductCart()
	const coffeeUpdated = useSeasonalProducts(coffeeData)

	console.log(coffeeUpdated)

	const currentSeason = getSeason()

	const updatedCoffeeData = coffeeData.map(coffee => {
		if (coffee.promotion?.type === 'seasonal' && coffee.promotion.season === currentSeason) {
			return {
				...coffee,
				promotion: {
					...coffee.promotion,
					isActive: true
				}
			}
		}
		return coffee
	})

	const filteredCoffeePromotion = updatedCoffeeData.filter(
		coffee => coffee.promotion?.type === 'seasonal' && coffee.promotion.isActive
	)

	const updatedCupcakeData = cupcakeData.map(cupcake => {
		if (cupcake.promotion?.type === 'seasonal' && cupcake.promotion.season === currentSeason) {
			return {
				...cupcake,
				promotion: {
					...cupcake.promotion,
					isActive: true
				}
			}
		}
		return cupcake
	})

	const filteredCupcakePromotion = updatedCupcakeData.filter(
		cupcake => cupcake.promotion?.type === 'seasonal' && cupcake.promotion.isActive
	)

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col gap-6">
				{filteredCoffeePromotion && <MenuList products={filteredCoffeePromotion} title={'Coffee'} tab={'coffee'} />}
				{filteredCupcakePromotion && <MenuList products={filteredCupcakePromotion} title={'Cupcake'} tab={'cupcake'} />}
			</Shell>
		</div>
	)
}

export default Products
