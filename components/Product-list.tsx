'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CiCoffeeCup } from 'react-icons/ci'
import { useProductCart } from '@/store'
import Shell from '@/components/ui/Shell'
import { Button } from '@/components/ui/Button'
import { Category, IPrice, ProductData, Size } from '@/types/item-type'
import { defaultPrice } from '@/method/fn'
import { ButtonLink } from '@/components/ui/ButtonLink'
import ProductListSize from './ProductList-size'

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
					<ButtonLink href={'/'} className="text-gray-500 cursor-pointer">
						Home
					</ButtonLink>
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
							<div className="w-full">
								<h3 className="relative card_product w-full pb-4 mb-8 text-xl">{`What's included`}</h3>
								<div className="w-full border border-gray-200 rounded-sm p-2">{product.ingridients}</div>
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
							text="Add to cart"
							className="button w-32 h-[15%] text-gray-200 bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150"
							onClick={() => addToCartHandler(product, selected)}
						/>
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default ProductList
