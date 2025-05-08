'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import PtoductCard from './product-card'
import { ProductData } from '@/types/item-type'
import { ButtonLink } from './ui/button-link'
import { useProductCart } from '@/store'

type MenuProps = {
	products: ProductData[]
	title: string
	tab?: 'coffee' | 'cupcake'
}

const MenuList = ({ products, title, tab }: MenuProps) => {
	const { setActiveTab } = useProductCart()
	const pathname = usePathname()
	const isHomePage = pathname === '/'

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">{title}</h2>
				{isHomePage && tab && (
					<div className="w-full flex justify-end items-center text-gray-200 text-lg ">
						<div onClick={() => setActiveTab(tab)}>
							<ButtonLink
								href={'/menu'}
								text={`More ${title.toLowerCase()}...`}
								className="border-b-2 border-b-gray-900 hover:border-b-gray-200 transition-all duration-200  "
							/>
						</div>
					</div>
				)}
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
