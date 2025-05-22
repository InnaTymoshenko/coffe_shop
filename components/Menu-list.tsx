'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ProductData } from '@/types/item-type'
import { ButtonLink } from './ui/button-link'
import { useProductCart } from '@/store'
import ProductCardList from './product-card-list'
import { Button } from './ui/button'
import PtoductCard from './product-card'

type MenuProps = {
	products: ProductData[]
	title: string
	tab?: 'coffee' | 'cupcake'
}

const MenuList = ({ products, title, tab }: MenuProps) => {
	const { setActiveTab, isShow, setIsShow } = useProductCart()
	const pathname = usePathname()
	const isHomePage = pathname === '/'

	return (
		<div className="w-full bg-gray-900 flex flex-col gap-8 justify-start py-8 mb-8">
			<div className="w-full flex flex-col flex-wrap gap-4 justify-center items-start">
				<div className="w-full flex justify-between items-center gap-8">
					<h2 className="text-white text-3xl my-6">{title}</h2>
					<div className="w-40 h-8 flex justify-between items-center border border-gray-800 rounded-lg p-1">
						<Button
							text="Card"
							className={`toggle ${!isShow ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'}`}
							onClick={() => setIsShow(!isShow)}
						/>
						<Button
							text="List"
							className={`toggle ${isShow ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'}`}
							onClick={() => setIsShow(!isShow)}
						/>
					</div>
				</div>
				{products.length > 0 && isShow ? (
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{products?.map(product => (
							<div
								key={product.id}
								className="w-[16rem] h-[22rem] border border-gray-800 rounded-sm overflow-hidden flex flex-col items-center justify-between group"
							>
								<PtoductCard item={product} />
							</div>
						))}
					</div>
				) : (
					<div className="w-full flex flex-col gap-2 justify-start items-start">
						{products.map(product => (
							<div
								key={product.id}
								className="w-full text-gray-200 h-24 grid grid-cols-10 pr-2 content-normal items-center gap-2 border border-gray-800 rounded-sm overflow-hidden"
							>
								<ProductCardList item={product} />
							</div>
						))}
					</div>
				)}
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
			</div>
		</div>
	)
}

export default MenuList
