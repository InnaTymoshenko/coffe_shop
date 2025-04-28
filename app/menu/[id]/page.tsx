'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { CiCoffeeCup } from 'react-icons/ci'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/Shell'
import { Button } from '@/components/ui/Button'
import { IPrice, ProductData, Size } from '@/types/item-type'
import { defaultPrice } from '@/method/fn'

export default function ProductPage() {
	const params = useParams()
	const id = params?.id

	const { cupcakeData, coffeeData } = useProductCart()
	const product = [...coffeeData, ...cupcakeData].find(p => p.id === Number(id))

	const [selected, setSelected] = useState<Size>('medium')
	const { addToCart } = useProductCart()

	const selectedHandler = (value: Size) => {
		setSelected(value)
	}

	const addToCartHandler = (item: ProductData, size: Size) => {
		addToCart(item, size)
	}

	if (!product) {
		return <p className="text-center text-red-500">Продукт не знайдено</p>
	}

	// console.log(product.src.portrait)

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-coffeebeans basic z-[-2]" />
			<div className="w-full h-[25vh]" />
			<div className="w-full bg-gray-900">
				<Shell className="container flex flex-col gap-12 py-8">
					<div className="w-full flex justify-start items-center gap-12">
						<div className="w-1/3">
							<Image
								src={product.src.portrait}
								alt={product.title}
								width={100}
								height={150}
								priority
								className="w-[200px] h-[250px] rounded-sm"
							/>
						</div>
						<div className="w-1/2  text-gray-200 flex flex-col justify-between gap-6">
							<h1 className="text-3xl mb-8">{product.title}</h1>
							<p className="my-4 ">{product.alt}</p>
						</div>
					</div>
					<div className="w-full h-[18rem] flex gap-16 justify-between items-start my-4">
						{product.category === 'Coffee' && (
							<div className="w-1/3 flex flex-col justify-between items-center gap-2 text-gray-200 text-lg my-4">
								<h3 className="relative card_product w-full pb-4 mb-8 text-xl">Size options</h3>
								<div className="w-full flex justify-between items-center gap-4">
									{product.price.map((p: IPrice) => (
										<div key={`coffe-${p.size}`} className="text-gray-200 flex flex-col items-center gap-2">
											{p.size === 'small' && (
												<>
													<Button
														className={`button w-[3.5rem] h-[3.5rem] rounded-full bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
															selected === p.size ? 'border-gray-200' : 'border-gray-900'
														}`}
														onClick={() => selectedHandler(p.size)}
													>
														<CiCoffeeCup size={26} color="white" />
													</Button>
													<div className="text-center mt-2">
														<p className="font-semibold">Small</p>
														<p className="text-xs text-gray-500">240 ml</p>
														<p className="text-xs text-gray-500">(8 fl oz)</p>
													</div>
												</>
											)}
											{p.size === 'medium' && (
												<>
													<Button
														className={`button w-[3.5rem] h-[3.5rem] rounded-full bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
															selected === p.size ? 'border-gray-200' : 'border-gray-900'
														}`}
														onClick={() => selectedHandler(p.size)}
													>
														<CiCoffeeCup size={30} color="white" />
													</Button>
													<div className="text-center mt-2">
														<p className="font-semibold">Medium</p>
														<p className="text-xs text-gray-500">355 ml</p>
														<p className="text-xs text-gray-500">(12 fl oz)</p>
													</div>
												</>
											)}
											{p.size === 'large' && (
												<>
													<Button
														className={`button w-[3.5rem] h-[3.5rem] rounded-full bg-gray-900 border-2  hover:bg-gray-900 hover:border-gray-200 ${
															selected === p.size ? 'border-gray-200' : 'border-gray-900'
														}`}
														onClick={() => selectedHandler(p.size)}
													>
														<CiCoffeeCup size={38} color="white" />
													</Button>
													<div className="text-center mt-2">
														<p className="font-semibold">Large</p>
														<p className="text-xs text-gray-500">475 ml</p>
														<p className="text-xs text-gray-500">(16 fl oz)</p>
													</div>
												</>
											)}
										</div>
									))}
								</div>
							</div>
						)}
						{product.category === 'Coffee' && (
							<div className="w-1/3 flex justify-between items-center gap-2 text-gray-200 text-lg my-4">
								{product.ingridients.length && (
									<div className="w-full">
										<h3 className="relative card_product w-full pb-4 mb-8 text-xl">{`What's included`}</h3>
										<div className="w-full border border-gray-200 rounded-sm p-2">{product.ingridients}</div>
									</div>
								)}
							</div>
						)}
						<div className="w-1/3 h-full flex flex-col justify-end items-center gap-8 ">
							<div className="flex gap-2 items-center px-2">
								<span className="text-gray-400">Price:</span>
								<div className="flex gap-2 text-xl">
									<strong className="text-orange-600">$</strong>
									<strong className="text-gray-200">
										{product.totalPrice === 0 ? defaultPrice(product, selected) : product.totalPrice.toFixed(2)}
									</strong>
								</div>
							</div>

							<Button
								text="Add to cart"
								className="button w-32 h-[15%] text-gray-200 bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
								onClick={() => addToCartHandler(product, selected)}
							/>
						</div>
					</div>
				</Shell>
			</div>
			<div className="w-full h-[2rem]" />
			<div className="w-full bg-gray-900">
				<Shell className="container flex flex-col gap-12 py-8">
					<h2 className="text-white text-3xl my-6">Pairs perfectly with:</h2>
				</Shell>
			</div>

			<div className="w-full h-[60vh]" />
		</>
	)
}
