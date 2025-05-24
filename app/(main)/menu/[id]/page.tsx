'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/shell'
import { ProductData } from '@/types/item-type'
import { getRandomUniqueItems } from '@/utils/fn'
import ReservationForm from '@/components/layouts/forms/reservation-form'
import MenuList from '@/components/menu-list'
import ProductList from '@/components/product-list'
import { useSeasonalProducts } from '@/utils/hook/useSeasonalProducts'

export default function ProductPage() {
	const [pairIds, setPairIds] = useState<string[] | null>(null)
	const params = useParams()
	const id = params?.id as string
	const { cupcakeData, coffeeData } = useProductCart()
	const coffeeUpdated = useSeasonalProducts(coffeeData)
	const cupcakeUpdated = useSeasonalProducts(cupcakeData)
	const product = [...cupcakeUpdated.allWithPromo, ...coffeeUpdated.allWithPromo].find(p => p.id === id)

	useEffect(() => {
		if (!product || pairIds) return

		const source = product.category === 'Coffee' ? cupcakeUpdated.allWithPromo : coffeeUpdated.allWithPromo

		const selectedIds = getRandomUniqueItems(source, 4).map(p => p.id)
		setPairIds(selectedIds)
	}, [coffeeUpdated.allWithPromo, cupcakeUpdated.allWithPromo, pairIds, product])

	const sourceProducts = product?.category === 'Coffee' ? cupcakeUpdated.allWithPromo : coffeeUpdated.allWithPromo

	const pairProducts = pairIds
		? (pairIds.map(id => sourceProducts.find(p => p.id === id)).filter(Boolean) as ProductData[])
		: []

	if (!product) {
		return <p className="text-center text-red-500">Продукт не знайдено</p>
	}

	return (
		<>
			<div className="w-full h-[25vh]" />
			<ProductList product={product} />
			<div className="w-full h-[2rem]" />
			<div className="w-full bg-gray-900">
				<Shell className="container flex flex-col gap-12 py-8">
					<h2 className="text-white text-3xl my-6">Pairs perfectly with:</h2>
					<div>
						{pairProducts.length > 0 && (
							<MenuList products={pairProducts} title={product.category === 'Coffee' ? 'Cupcake' : 'Coffee'} />
						)}
					</div>
				</Shell>
			</div>

			<div className="w-full min-h-[70vh] flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6 bg-gray-900/80 p-2 rounded-sm">Book a Table</h2>
					<ReservationForm />
				</Shell>
			</div>
			<div className="fixed top-0 left-0 w-full h-screen bg-coffeebeans basic z-[-2]" aria-hidden="true" />
		</>
	)
}
