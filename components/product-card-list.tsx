/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useProductCart } from '@/store'
import { IPrice, ProductData, QuantityType, Size } from '@/types/item-type'
import { Badge } from './ui/badge'
import ProductCardSize from './product-card-size'
import { defaultPrice, quantityHandler } from '@/utils/fn'
import AnimatedButton from './ui/animated-button'

type Props = {
	item: ProductData
}

const ProductCardList = ({ item }: Props) => {
	const router = useRouter()
	const [selected, setSelected] = useState<Size>('medium')
	const { updateQuantity, addToCart } = useProductCart()

	const selectedHandler = (value: Size) => {
		setSelected(value)
	}

	const updateQuantityHandler = (item: ProductData, type: QuantityType, size: Size) => {
		updateQuantity(item, type, size)
	}

	const addToCartHandler = (item: ProductData, size: Size) => {
		addToCart(item, size)
	}

	return (
		<div className="w-full text-gray-200 xl:h-24 grid xl:grid-cols-10 sm:grid-cols-1 xl:grid-rows-1 sm:grid-rows-6 py-2 pr-2 xl:pl-0 sm:pl-2 content-normal items-center gap-2 relative z-10">
			<img src={item.src.medium} alt={item.title} className="xl:block sm:hidden w-24 h-24 object-cover object-center" />
			<div className="w-full pl-2 xl:col-span-3 text-gray-200 flex flex-col gap-3">
				<h3
					className="text-2xl cursor-pointer hover:text-orange-500 transition-all duration-300"
					onClick={() => router.push(`/menu/${item.id}`)}
				>
					{item.title}
				</h3>
				<p className="text-gray-400">{item.alt}</p>
			</div>
			{item.promotion ? (
				<Badge variant="success" className="justify-self-center">
					{item.promotion?.label}
				</Badge>
			) : (
				<div />
			)}
			<div className="xl:col-span-2 ">
				{item.category === 'Coffee' && (
					<div className="w-full flex justify-center items-center gap-2 text-lg">
						{item.price.map((p: IPrice) => (
							<div key={`coffe-${p.size}`}>
								{p.size === 'small' && (
									<ProductCardSize item={p} text={'S'} selected={selected} selectedHandler={selectedHandler} />
								)}
								{p.size === 'medium' && (
									<ProductCardSize item={p} text={'M'} selected={selected} selectedHandler={selectedHandler} />
								)}
								{p.size === 'large' && (
									<ProductCardSize item={p} text={'L'} selected={selected} selectedHandler={selectedHandler} />
								)}
							</div>
						))}
					</div>
				)}
			</div>
			<div className="w-[50%] h-8 p-1 mx-auto flex justify-between items-center gap-2 border-2 border-gray-800 rounded-sm bg-gray-900 hover:border-gray-200 transition-all duration-300">
				<Button
					text="-"
					className="button w-10 h-full"
					onClick={() => updateQuantityHandler(item, 'decrement', selected)}
				/>
				<span>{quantityHandler(item, selected)}</span>
				<Button
					text="+"
					className="button w-10 h-full"
					onClick={() => updateQuantityHandler(item, 'increment', selected)}
				/>
			</div>
			<div className="flex gap-2 items-center px-2">
				<span className="text-gray-400">Price:</span>
				<div className="flex items-center gap-1 text-xl">
					<strong className="text-orange-600">$</strong>
					<strong>{item.totalPrice === 0 ? defaultPrice(item, selected) : item.totalPrice.toFixed(2)}</strong>
				</div>
			</div>
			<Button
				className="button relative overflow-hidden w-32 h-10 mx-auto bg-orange-600 py-2 px-4 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
				onClick={() => addToCartHandler(item, selected)}
			>
				<AnimatedButton className="w-32 py-2 hover:-top-9" text={'Add to cart'} />
			</Button>
		</div>
	)
}

export default ProductCardList
