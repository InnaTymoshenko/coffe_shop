'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/Shell'
import { ProductData } from '@/types/item-type'
import { getRandomUniqueItems } from '@/method/fn'
import ReservationForm from '@/components/ReservationForm'
import MenuList from '@/components/Menu-list'
import ProductList from '@/components/Product-list'

export default function ProductPage() {
	const [pair, setPair] = useState<ProductData[] | null>(null)
	const params = useParams()
	const id = params?.id as string
	const { cupcakeData, coffeeData } = useProductCart()
	const product = [...coffeeData, ...cupcakeData].find(p => p.id === Number(id))

	useEffect(() => {
		if (!product) return
		const source = product.category === 'Coffee' ? cupcakeData : coffeeData
		const selectedPair = getRandomUniqueItems(source, 4)
		setPair(selectedPair)
	}, [coffeeData, cupcakeData, product])

	if (!product) {
		return <p className="text-center text-red-500">Продукт не знайдено</p>
	}

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-coffeebeans basic z-[-2]" />
			<div className="w-full h-[25vh]" />
			<ProductList product={product} />
			<div className="w-full h-[2rem]" />
			<div className="w-full bg-gray-900">
				<Shell className="container flex flex-col gap-12 py-8">
					<h2 className="text-white text-3xl my-6">Pairs perfectly with:</h2>
					<div>
						{product.category === 'Coffee' && pair && <MenuList products={pair} title={'Cupcake'} />}
						{product.category === 'Cupcake' && pair && <MenuList products={pair} title={'Coffee'} />}
					</div>
				</Shell>
			</div>

			<div className="w-full min-h-[70vh] flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6 bg-gray-900/80 p-2 rounded-sm">Book a Table</h2>
					<ReservationForm />
				</Shell>
			</div>
		</>
	)
}
