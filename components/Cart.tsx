/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import { RxCross1 } from 'react-icons/rx'
import { FaRegSadTear } from 'react-icons/fa'
import { MdOutlineCoffeeMaker } from 'react-icons/md'
import { useProductCart } from '@/store'
import { Button } from './ui/button'
import AnimatedButton from './ui/animated-button'

type Props = {
	openCartHandler: () => void
}

const Cart = ({ openCartHandler }: Props) => {
	const { cartProducts, updateCartQuantity } = useProductCart()
	const cartRef = useRef<HTMLDivElement | null>(null)

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
				openCartHandler()
			}
		},
		[openCartHandler]
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [handleClickOutside])

	const totalCartPrice = cartProducts.reduce((sum, item) => sum + item.totalPrice, 0)

	// console.log(cartProducts)

	return (
		<div id="main_cart" className="fixed top-0 bottom-0 w-full min-h-screen bg-gray-900/80 z-50 flex justify-end">
			<div
				className="w-[45%] min-h-full bg-gray-900 border-l-2 border-l-gray-700 text-gray-200 flex flex-col gap-8 justify-start p-6 overflow-y-auto"
				ref={cartRef}
			>
				<div className="w-full flex justify-between items-center">
					<h2 className="text-2xl logo">Your Cart</h2>
					<RxCross1 size={28} className="text-gray-200 cursor-pointer" onClick={openCartHandler} />
				</div>
				<div className="w-full min-h-[30] flex flex-col justify-start gap-4">
					{cartProducts.map(item => (
						<div
							key={item.id}
							className="w-full h-28 rounded-sm border border-gray-400 flex gap-4 justify-between items-center overflow-hidden pr-2"
						>
							<div className="w-[20%]">
								<img
									src={
										item.src.medium
											? item.src.medium
											: item.category === 'Coffee'
											? '/assets/coffee-2.png'
											: '/assets/cake-1.png'
									}
									alt={item.title}
									className="w-full h-32 object-cover object-center"
								/>
							</div>
							<h3 className="w-[35%] text-left text-xl px-4">{item.title}</h3>
							<div className="w-[40%] py-1 flex flex-col gap-1 items-center justify-center">
								{item.price.map(pr => (
									<div
										key={`${item.title}-${item.id}-${pr.size}`}
										className=" grid grid-cols-5 grid-rows-1 items-center content-normal gap-4"
									>
										{item.category === 'Coffee' && (
											<div className="w-8 col-span-1 text-center text-md font-semibold py-1 border border-gray-800 rounded-sm">{`${
												pr.size === 'small' ? 'S' : pr.size === 'medium' ? 'M' : 'L'
											}`}</div>
										)}
										<div className="w-20 col-span-2 col-start-2 px-1 flex justify-between items-center border border-gray-800 hover:border-gray-200 rounded-sm transition-all duration-300">
											<span>
												<Minus
													size={14}
													className="cursor-pointer"
													onClick={() => {
														updateCartQuantity(item.id, pr.size, 'decrement')
													}}
												/>
											</span>
											<span className="text-lg">{pr.quantity}</span>
											<span>
												<Plus
													size={14}
													className="cursor-pointer"
													onClick={() => {
														updateCartQuantity(item.id, pr.size, 'increment')
													}}
												/>
											</span>
										</div>
										<strong className="text-lg text-right col-span-2 col-start-4">{`${(pr.price * pr.quantity).toFixed(
											2
										)} $`}</strong>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				{cartProducts.length !== 0 ? (
					<div className="w-full h-16 flex justify-end items-center gap-6">
						<div className="w-[20%] flex flex-col  items-center gap-1 ">
							<span className="text-gray-400">Total price</span>
							<div className="flex gap-1 text-2xl">
								<span className="text-orange-600">$</span>
								<span>{totalCartPrice.toFixed(2)}</span>
							</div>
						</div>
						<Button className="button relative overflow-hidden w-28 h-10 text-lg bg-orange-600 px-4 py-1 rounded-sm text-gray-200 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150">
							<AnimatedButton className="w-28 py-1 hover:-top-10" text={'Pay now'} />
						</Button>
					</div>
				) : (
					<div className="w-full text-gray-200 flex flex-col gap-12 items-center justify-between px-4 mt-8">
						<div className="flex justify-center items-end gap-6">
							<MdOutlineCoffeeMaker size={96} />
							<FaRegSadTear size={42} className="mb-2" />
						</div>
						<h2 className="text-2xl">Your cart is currently empty...</h2>
						<p>But aromatic coffee and fresh desserts are already waiting to be added</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
