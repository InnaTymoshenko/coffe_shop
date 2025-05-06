'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import Shell from '@/components/ui/Shell'
import { useProductCart } from '@/store'
import { URL_COFFEE, URL_CUPCAKE } from '@/method/type'
import Table from '@/components/ui/Table'

// type AdminProducts = {
// 	data:ProductData[]
// }

const ProductPage = () => {
	const [selectTab, setSelectTab] = useState('coffee')
	const { fetchCoffe, fetchCupcake, cupcakeData, coffeeData } = useProductCart()

	useEffect(() => {
		fetchCoffe(URL_COFFEE)
	}, [fetchCoffe])

	useEffect(() => {
		fetchCupcake(URL_CUPCAKE)
	}, [fetchCupcake])

	return (
		<Shell className="container flex flex-col gap-4">
			<div className="w-full py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<Button
					text="Add new product"
					className="flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900"
				/>
			</div>
			<div className="flex justify-start gap-4">
				<Button
					className={`py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${selectTab === 'coffee' ? 'underline ' : 'no-underline text-gray-600'}`}
					style={{ textUnderlineOffset: '6px' }}
					onClick={() => setSelectTab('coffee')}
				>
					Coffee
				</Button>
				<Button
					className={`px-4 py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${selectTab === 'cupcake' ? 'underline ' : 'no-underline text-gray-600'}`}
					style={{ textUnderlineOffset: '6px' }}
					onClick={() => setSelectTab('cupcake')}
				>
					Cupcake
				</Button>
			</div>
			<div>
				{selectTab === 'coffee' && coffeeData.length > 0 && <Table data={coffeeData} />}
				{selectTab === 'cupcake' && cupcakeData.length > 0 && <Table data={cupcakeData} />}
			</div>
		</Shell>
	)
}

export default ProductPage
