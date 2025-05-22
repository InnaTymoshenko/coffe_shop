/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { CiCoffeeCup } from 'react-icons/ci'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/shell'
import { Button } from '@/components/ui/button'
import { Category, IPrice, ProductData, Size } from '@/types/item-type'
import { defaultPrice } from '@/utils/fn'
import { ButtonLink } from '@/components/ui/button-link'
import ProductListSize from './product-list-size'
import AnimatedButton from './ui/animated-button'

type ProductListProps = {
	product: ProductData
}

const ProductList = ({ product }: ProductListProps) => {
	const [selected, setSelected] = useState<Size>('medium')

	const { addToCart, setActiveTab } = useProductCart()

	const selectedHandler = (value: Size) => {
		setSelected(value)
	}

	const addToCartHandler = (item: ProductData, size: Size) => {
		addToCart(item, size)
	}

	function normalizeCategory(category: Category): 'coffee' | 'cupcake' {
		return category.toLowerCase() as 'coffee' | 'cupcake'
	}

	return (
		<div className="w-full bg-gray-900">
			<Shell className="container flex flex-col gap-12 py-8">
				<div className="relative card_product w-1/4 pb-4 mb-8 flex justify-start gap-1 text-gray-200 text-lg">
					<div className="w-[50px]">
						<ButtonLink href={'/'} className="text-gray-500 cursor-pointer">
							Home
						</ButtonLink>
					</div>
					<span>/</span>
					<div onClick={() => setActiveTab(normalizeCategory(product.category))}>
						<ButtonLink href={'/menu'} className="text-gray-500 cursor-pointer">
							{product.category}
						</ButtonLink>
					</div>

					<span>/</span>
					<strong>{product.title}</strong>
				</div>
				<div className="w-full flex justify-start items-center gap-12">
					<div className="w-1/3">
						<div className="relative w-[250px] h-[300px] rounded-sm overflow-hidden border border-gray-800">
							<img
								src={
									product.src.medium
										? product.src.medium
										: product.category === 'Coffee'
										? '/assets/coffee-2.png'
										: '/assets/cake-1.png'
								}
								alt={product.title}
								className="w-full h-full object-cover object-center"
							/>
							{product.promotion && <div className="label ">{product.promotion?.label}</div>}
						</div>
					</div>
					<div className="w-1/2  text-gray-200 flex flex-col justify-between gap-6">
						<h1 className="text-3xl mb-8">{product.title}</h1>
						<p className="my-4 ">{product.alt}</p>
					</div>
				</div>
				<div className="w-full h-[18rem] flex gap-16 justify-between items-start my-4">
					<div className="w-1/3">
						{product.category === 'Coffee' && (
							<div className="w-full flex flex-col justify-between items-center gap-2 text-gray-200 text-lg my-4">
								<h3 className="relative card_product w-full pb-4 mb-8 text-xl">Size options</h3>
								<div className="w-full flex justify-between items-center gap-4">
									{product.price.map((p: IPrice) => (
										<div key={`coffe-${p.size}`} className="text-gray-200 flex flex-col items-center gap-2">
											{p.size === 'small' && (
												<ProductListSize
													item={p}
													text={'Small'}
													ml={'240 ml'}
													flOz={'8 fl oz'}
													selected={selected}
													selectedHandler={selectedHandler}
												>
													<CiCoffeeCup size={26} color="white" />
												</ProductListSize>
											)}
											{p.size === 'medium' && (
												<ProductListSize
													item={p}
													text={'Medium'}
													ml={'355 ml'}
													flOz={'12 fl oz'}
													selected={selected}
													selectedHandler={selectedHandler}
												>
													<CiCoffeeCup size={30} color="white" />
												</ProductListSize>
											)}
											{p.size === 'large' && (
												<ProductListSize
													item={p}
													text={'Large'}
													ml={'475 ml'}
													flOz={'16 fl oz'}
													selected={selected}
													selectedHandler={selectedHandler}
												>
													<CiCoffeeCup size={38} color="white" />
												</ProductListSize>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="w-1/3 flex justify-between items-center gap-2 text-gray-200 text-lg my-4">
						{product.ingridients.length !== 0 && (
							<div className="w-full flex flex-col gap-2">
								<h3 className="relative card_product w-full pb-4 mb-8 text-xl">{`What's included`}</h3>
								{product.ingridients.map(ing => (
									<div key={ing} className="w-full border border-gray-200 rounded-sm p-2">
										{ing}
									</div>
								))}
							</div>
						)}
					</div>
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
							className="button relative overflow-hidden w-32 h-[15%] text-gray-200 bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
							onClick={() => addToCartHandler(product, selected)}
						>
							<AnimatedButton className="w-32 py-2 hover:-top-9" text={'Add to cart'} />
						</Button>
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default ProductList
