'use client'

import React from 'react'
import PtoductCard from './ProductCard'
import { ProductData } from '@/types/item-type'

type MenuProps = {
	products: ProductData[]
	title: string
}

const MenuList = ({ products, title }: MenuProps) => {
	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">{title}</h2>
				{products && (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{products?.map(product => (
							<div
								key={product.id}
								className="w-[16rem] h-[22rem]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
							>
								<PtoductCard item={product} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default MenuList
