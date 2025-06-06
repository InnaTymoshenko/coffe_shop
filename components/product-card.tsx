/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import { ProductData, IPrice, Size, QuantityType } from '@/types/item-type'
import { Button } from './ui/button'
import { useProductCart } from '@/store'
import { defaultPrice, quantityHandler } from '@/utils/fn'
import ProductCardSize from './product-card-size'
import AnimatedButton from './ui/animated-button'

type Props = {
	item: ProductData
}

const PtoductCard = ({ item }: Props) => {
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

	// console.log(item)

	return (
		<div className="w-full h-full relative">
			<img
				src={
					item.src.medium ? item.src.medium : item.category === 'Coffee' ? '/assets/coffee-2.png' : '/assets/cake-1.png'
				}
				alt={item.title}
				className="w-full h-full object-cover object-center"
			/>
			{item.promotion?.type === 'seasonal' && item.promotion.isActive && (
				<div className="label bg-green-600 ">{item.promotion?.label}</div>
			)}
			{item.promotion?.type === 'seasonal' && !item.promotion.isActive && (
				<div className="label bg-red-600 px-6">{`Out of season`}</div>
			)}
			<h3
				className="text-2xl font-medium pl-5 text-gray-200 cursor-pointer hover:text-orange-400 absolute top-10 left-4 z-10 transition-all duration-300"
				onClick={() => router.push(`/menu/${item.id}`)}
			>
				{item.title}
			</h3>
			<div className="card_hover absolute z-5 bottom-0 left-0 w-full h-full bg-black/50 flex flex-col gap-4 items-start justify-end text-white text-left p-4 ">
				<div className="absolute top-0 right-0 bg-gray-900/80 p-2 rounded-bl-lg flex gap-1 items-center">
					<span className="font-thin text-md">{item.rating}</span>
					<FaStar className="text-yellow" />
				</div>
				<p className="my-4">{item.alt}</p>
				<div className="w-full flex flex-col gap-2 justify-between items-center">
					{item.category === 'Coffee' && (
						<div className="w-full flex lg:justify-between sm:justify-center items-center gap-2 text-lg">
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
					<div className="w-[50%] h-8 mx-auto flex justify-between items-center gap-2 border-2 border-gray-800 rounded-sm bg-gray-900 hover:border-gray-200 transition-all duration-300">
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
					<div className="w-full flex justify-between items-center gap-2 r-4">
						<div className="flex flex-col gap-2 items-center px-2">
							<span className="text-gray-400">Price:</span>
							<div className="flex gap-1 text-xl">
								<strong className="text-orange-600">$</strong>
								<strong>{item.totalPrice === 0 ? defaultPrice(item, selected) : item.totalPrice.toFixed(2)}</strong>
							</div>
						</div>
						<Button
							className={`button relative overflow-hidden w-32 h-10 py-2 px-4 border-2 transition-all duration-150 ${
								item.promotion?.type === 'seasonal' && !item.promotion.isActive
									? 'bg-gray-400 border-gray-400 text-gray-700 cursor-not-allowed pointer-events-none'
									: 'bg-orange-600 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95'
							}`}
							onClick={() => addToCartHandler(item, selected)}
							disabled={item.promotion?.type === 'seasonal' && !item.promotion.isActive}
						>
							<AnimatedButton className="w-32 py-2 hover:-top-9" text={'Add to cart'} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PtoductCard
