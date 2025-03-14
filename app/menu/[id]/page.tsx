'use client'

import { useParams } from 'next/navigation'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/Shell'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { IPrice, ProductData, QuantityType, Size } from '@/types/item-type'
import { useState } from 'react'
import { defaultPrice, quantityHandler } from '@/method/fn'

export default function ProductPage() {
	const params = useParams()
	const id = params?.id

	const { cupcakeData, coffeeData } = useProductCart()
	const product = [...coffeeData, ...cupcakeData].find(p => p.id === Number(id))

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

	if (!product) {
		return <p className="text-center text-red-500">Продукт не знайдено</p>
	}

	console.log(product.src.portrait)

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-coffeebeans basic z-[-2]" />
			<div className="w-full h-[30vh]" />
			<div className="w-full bg-gray-900/80">
				<Shell className="container flex gap-8 py-8">
					<div className="w-1/2">
						<Image src={product.src.portrait} alt={product.title} width={300} height={500} priority />
					</div>
					<div className="w-1/2 text-gray-200">
						<h1>{product.title}</h1>
						<p>{product.alt}</p>
						<div className="w-full flex flex-col gap-2 justify-between items-center">
							{product.category === 'Coffee' && (
								<div className="w-full flex justify-between items-center gap-2 text-lg">
									{product.price.map((p: IPrice) => (
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
									onClick={() => updateQuantityHandler(product, 'decrement', selected)}
								/>
								<span>{quantityHandler(product, selected)}</span>
								<Button
									text="+"
									className="button w-10 h-full"
									onClick={() => updateQuantityHandler(product, 'increment', selected)}
								/>
							</div>
							<div className="w-full flex justify-between items-center gap-2 r-4">
								<div className="flex flex-col gap-2 items-center px-2">
									<span className="text-gray-400">Price:</span>
									<div className="flex gap-1 text-xl">
										<strong className="text-orange-600">$</strong>
										<strong>
											{product.totalPrice === 0 ? defaultPrice(product, selected) : product.totalPrice.toFixed(2)}
										</strong>
									</div>
								</div>

								<Button
									text="Add to cart"
									className="button w-32 h-[80%] bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
									onClick={() => addToCartHandler(product, selected)}
								/>
							</div>
						</div>
					</div>
				</Shell>
			</div>

			<div className="w-full h-[30vh]" />
		</>
	)
}
