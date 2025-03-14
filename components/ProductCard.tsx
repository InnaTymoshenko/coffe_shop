/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import { ProductData, IPrice, Size, QuantityType } from '@/types/item-type'
import { Button } from './ui/Button'
import { useProductCart } from '@/store'
import { defaultPrice, quantityHandler } from '@/method/fn'

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

	return (
		<div className="w-full h-full relative">
			<img src={item.src.medium} alt="" className="w-full h-full object-cover" />

			<div className="card_hover absolute bottom-0 left-0 w-full h-full bg-black/50 flex flex-col gap-2 items-start justify-between text-white text-left p-4 ">
				<div className="absolute top-0 right-0 bg-gray-900/70 p-2 rounded-bl-lg flex gap-1 items-center">
					<span className="font-thin text-md">{item.rating}</span>
					<FaStar className="text-yellow" />
				</div>
				<h3 className="text-2xl cursor-pointer" onClick={() => router.push(`/menu/${item.id}`)}>
					{item.title}
				</h3>
				<p className="my-6">{item.alt}</p>
				<div className="w-full flex flex-col gap-2 justify-between items-center">
					{item.category === 'Coffee' && (
						<div className="w-full flex justify-between items-center gap-2 text-lg">
							{item.price.map((p: IPrice) => (
								<div key={`coffe-${p.size}`}>
									{p.size === 'small' && (
										<Button
											text={'S'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandler(p.size)}
										/>
									)}
									{p.size === 'medium' && (
										<Button
											text={'M'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandler(p.size)}
										/>
									)}
									{p.size === 'large' && (
										<Button
											text={'L'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandler(p.size)}
										/>
									)}
								</div>
							))}
						</div>
					)}
					<div className="w-[50%] h-8 mx-auto flex justify-between items-center gap-2 border-2 border-gray-900 rounded-sm bg-gray-900 hover:border-gray-200">
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
							text="Add to cart"
							className="button w-32 h-[80%] bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
							onClick={() => addToCartHandler(item, selected)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PtoductCard
