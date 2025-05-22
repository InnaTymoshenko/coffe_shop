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
		<>
			<img src={item.src.medium} alt="" className="w-20 h-24 object-cover object-center" />
			<h3
				className="text-2xl  pl-5 col-span-3 text-gray-200 cursor-pointer hover:text-orange-500 "
				onClick={() => router.push(`/menu/${item.id}`)}
			>
				{item.title}
			</h3>
			{item.promotion ? (
				<Badge variant="success" className="justify-self-center">
					{item.promotion?.label}
				</Badge>
			) : (
				<div />
			)}
			<div className="col-span-2">
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
			<div className="w-[50%] h-8 p-1 mx-auto flex justify-between items-center gap-2 border-2 border-gray-800 rounded-sm bg-gray-900 hover:border-gray-200">
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
				className="button relative overflow-hidden h-10 bg-orange-600 py-2 px-4 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
				onClick={() => addToCartHandler(item, selected)}
			>
				<div className="absolute top-0 left-0 z-20 flex h-[200%] w-32 flex-col items-center justify-start gap-4 py-2 transition-all duration-500 hover:-top-9">
					<div className="w-full text-center">Add to cart</div>
					<div className="w-full text-center">Add to cart</div>
				</div>
			</Button>
		</>
	)
}

export default ProductCardList
