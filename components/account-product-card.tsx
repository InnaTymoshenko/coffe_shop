/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import { IPrice, ProductData, QuantityType, Size } from '@/types/item-type'
import { FaHeart, FaStar } from 'react-icons/fa'
import ProductCardSize from './product-card-size'
import { useRouter } from 'next/navigation'
import { useProductCart } from '@/store'
import { Button } from './ui/button'
import { defaultPrice, quantityHandler } from '@/utils/fn'
import AnimatedButton from './ui/animated-button'
import { useAdminStore } from '@/store/admin-store'

type AccountProductProps = {
	product: ProductData
}

const AccountProductCard = ({ product }: AccountProductProps) => {
	const router = useRouter()
	const [selected, setSelected] = useState<Size>('medium')
	const { updateQuantity, addToCart } = useProductCart()
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const { moskUser, editMoskUser } = useAdminStore()

	useEffect(() => {
		if (!moskUser) return
		const isAlreadyFavorite = (moskUser?.favoritesProductsIds ?? []).includes(product.id)
		setIsFavorite(isAlreadyFavorite)
	}, [moskUser, product.id])

	const updateFavoriteProducts = () => {
		if (!moskUser) return
		const isAlreadyFavorite = (moskUser?.favoritesProductsIds ?? []).includes(product.id)
		const updatedFavorites = !isAlreadyFavorite
			? [...moskUser.favoritesProductsIds, product.id]
			: moskUser.favoritesProductsIds.filter(id => id !== product.id)
		editMoskUser({
			...moskUser,
			favoritesProductsIds: updatedFavorites
		})
		setIsFavorite(!isFavorite)
	}

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
			<div className="w-full h-full absolute top-0 bottom-0 left-0 bg-gray-900/40 flex justify-between items-start gap-6">
				<div className=" bg-gray-900/80 p-2 rounded-br-lg flex gap-1 items-center">
					<span className="font-thin text-md">{product.rating}</span>
					<FaStar className="text-yellow" />
				</div>
				<div
					className="bg-gray-900/80 px-4 py-2 rounded-bl-lg flex gap-1 items-center cursor-pointer hover:bg-gray-800/80 transition-all duration-300"
					onClick={updateFavoriteProducts}
				>
					<FaHeart
						size={20}
						className={`transition-all duration-200 ${isFavorite ? 'text-orange-600' : 'text-gray-200'}`}
					/>
				</div>
			</div>

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

			<h3
				className="text-2xl font-medium pl-5 text-gray-200 cursor-pointer hover:text-orange-400 absolute top-10 left-4 z-10 transition-all duration-300"
				onClick={() => router.push(`/menu/${product.id}`)}
			>
				{product.title}
			</h3>
			<div className="absolute overflow-hidden z-10 bottom-0 left-0 w-full rounded-tl-lg rounded-tr-lg bg-gray-900/80 flex flex-col gap-4 items-start justify-end text-white text-left px-4 pb-4 pt-8 ">
				{product.promotion?.type === 'seasonal' && product.promotion.isActive && (
					<div className="label bg-green-600 px-6 ">{product.promotion?.label}</div>
				)}
				{product.promotion?.type === 'seasonal' && !product.promotion.isActive && (
					<div className="label bg-red-600 px-6">{`Out of season`}</div>
				)}
				<div className="w-full flex flex-col gap-2 justify-between items-center">
					{product.category === 'Coffee' && (
						<div className="w-full flex justify-between items-center gap-2 text-lg">
							{product.price.map((p: IPrice) => (
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
							className={`button relative overflow-hidden w-32 h-10 py-2 px-4 border-2 transition-all duration-150 ${
								product.promotion?.type === 'seasonal' && !product.promotion.isActive
									? 'bg-gray-400 border-gray-400 text-gray-700 cursor-not-allowed pointer-events-none'
									: 'bg-orange-600 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95'
							}`}
							onClick={() => addToCartHandler(product, selected)}
							disabled={product.promotion?.type === 'seasonal' && !product.promotion.isActive}
						>
							<AnimatedButton className="w-32 py-2 hover:-top-9" text={'Add to cart'} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountProductCard
