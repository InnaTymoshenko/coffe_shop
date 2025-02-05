/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { ProductData, IPrice, Size } from '@/types/item-type'
import { Button } from './ui/Button'
import { useProductCart } from '@/store'
// import { ICart } from '@/types/cart-type'

type Props = {
	item: ProductData
}

const PtoductCard = ({ item }: Props) => {
	// const [cartProducts, setCartProducts] = useState<ICart[]>([])
	// const [quantity, setQuantity] = useState<number>(1)
	const [selected, setSelected] = useState<Size>('medium')
	const [totalPrice, setTotalPrice] = useState<number>(15)
	const { updateQuantity, cartProducts } = useProductCart()

	// useEffect(() => {
	// 	const updatePrice = item.price.map(p => {
	// 		return p.quantity * p.price
	// 	})

	// 	setTotalPrice(updatePrice)
	// }, [quantity, selected, item.price])

	const quantityHandle = (selected: Size) => {
		const qt = item.price.find(q => q.size === selected)
		return qt?.quantity
	}

	const selectedHandle = (value: Size) => {
		setSelected(value)
	}

	const defaultPrice = (selected: Size) => {
		const price = item.price.find(p => p.size === selected)
		return price?.price
	}

	const addToCart = (item: ProductData) => {
		console.log(item)
	}

	console.log(cartProducts)

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
							{item.price.map((p: IPrice) => (
								<div key={`coffe-${p.size}`}>
									{p.size === 'small' && (
										<Button
											text={'S'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(p.size)}
										/>
									)}
									{p.size === 'medium' && (
										<Button
											text={'M'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(p.size)}
										/>
									)}
									{p.size === 'large' && (
										<Button
											text={'L'}
											className={`button w-[4.5rem] h-10 bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
												selected === p.size ? 'border-gray-200' : 'border-gray-900'
											}`}
											onClick={() => selectedHandle(p.size)}
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
							onClick={() => updateQuantity(item, 'decrement', selected)}
						/>
						<span>{quantityHandle(selected)}</span>
						<Button
							text="+"
							className="button w-10 h-full"
							onClick={() => updateQuantity(item, 'increment', selected)}
						/>
					</div>

					<div className="w-full flex justify-between items-center gap-2 r-4">
						<div className="flex flex-col gap-2 items-center px-2">
							<span className="text-gray-400">Price:</span>
							<div className="flex gap-1 text-xl">
								<strong className="text-orange-600">$</strong>
								<strong>{item.totalPrice === 0 ? defaultPrice(selected) : item.totalPrice.toFixed(2)}</strong>
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

export default PtoductCard
