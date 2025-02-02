/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { CoffeeData } from '@/types/item-type'
import { Button } from './ui/Button'
import { ICart } from '@/types/cart-type'

type Props = {
	item: CoffeeData
}

type Size = 'small' | 'medium' | 'large'

const CoffeeCard = ({ item }: Props) => {
	const [cartProducts, setCartProducts] = useState<ICart[]>([])
	const [quantity, setQuantity] = useState<number>(1)
	const [selected, setSelected] = useState<Size>('medium')
	const [totalPrice, setTotalPrice] = useState<number>(item.price.medium)

	useEffect(() => {
		setTotalPrice(quantity * item.price[selected])
	}, [quantity, selected, item.price])

	const quantityHandle = (type: 'increment' | 'decrement') => {
		setQuantity(prev => (type === 'increment' ? prev + 1 : Math.max(1, prev - 1)))
	}

	const selectedHandle = (value: Size) => {
		setSelected(value)
	}

	const addToCart = (item: CoffeeData) => {
		const updatedCart = updateCart(cartProducts, item)
		setCartProducts(updatedCart)
	}

	const updateCart = (cart: ICart[], item: CoffeeData): ICart[] => {
		const existingProductIndex = cart.findIndex(p => p.name === item.title && p.size === selected)

		if (existingProductIndex !== -1) {
			return cart.map((p, index) =>
				index === existingProductIndex
					? {
							...p,
							quantity: p.quantity + quantity,
							totalPrice: p.totalPrice + totalPrice
					  }
					: p
			)
		} else {
			return [
				...cart,
				{
					id: item.id,
					category: item.category,
					size: selected,
					img: item.src.tiny,
					name: item.title,
					quantity: quantity,
					price: item.price[selected],
					totalPrice: totalPrice
				}
			]
		}
	}

	return (
		<div className="w-full h-full relative">
			<img src={item.src.medium} alt="" className="w-full h-full object-cover" />

			<div className="card_hover absolute bottom-0 left-0 w-full h-full bg-black/50 flex flex-col gap-2 items-start justify-between text-white text-left p-4 ">
				<div className="absolute top-0 right-0 bg-gray-900/70 p-2 rounded-bl-lg flex gap-1 items-center">
					<span className="font-thin text-md">{item.rating}</span>
					<FaStar className="text-yellow" />
				</div>
				<h3 className="text-2xl">{item.title}</h3>
				<p className="my-6">{item.alt}</p>
				<div className="w-full flex flex-col gap-2 justify-between items-center">
					{item.category === 'Coffee' && (
						<div className="w-full flex justify-between items-center gap-2 text-lg">
							{item.size.map(s => {
								if (s === 'small') {
									return (
										<Button
											key={`coffee-${s}`}
											text="S"
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												s === selected ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(s)}
										/>
									)
								} else if (s === 'medium') {
									return (
										<Button
											key={`coffee-${s}`}
											text="M"
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												s === selected ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(s)}
										/>
									)
								} else if (s === 'large') {
									return (
										<Button
											key={`coffee-${s}`}
											text="L"
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												s === selected ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(s)}
										/>
									)
								}
							})}
						</div>
					)}
					<div className="w-[50%] h-8 mx-auto flex justify-between items-center gap-2 border-2 border-gray-900 rounded-sm bg-gray-900 hover:border-gray-200">
						<Button text="-" className="button w-10 h-full" onClick={() => quantityHandle('decrement')} />
						<span>{quantity}</span>
						<Button text="+" className="button w-10 h-full" onClick={() => quantityHandle('increment')} />
					</div>

					<div className="w-full flex justify-between items-center gap-2 r-4">
						<div className="flex flex-col gap-2 items-center px-2">
							<span className="text-gray-400">Price:</span>
							<div className="flex gap-1 text-xl">
								<strong className="text-orange-600">$</strong>
								<strong>{totalPrice.toFixed(2)}</strong>
							</div>
						</div>

						<Button
							text="Add to cart"
							className="button w-32 h-[80%] bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200"
							onClick={() => addToCart(item)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CoffeeCard
