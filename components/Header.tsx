'use client'

import { useState, useEffect } from 'react'
import { BsTelephoneForward } from 'react-icons/bs'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { FaOpencart } from 'react-icons/fa'
import Shell from './ui/Shell'
import Link from 'next/link'
import { Button } from './ui/Button'
import { useProductCart } from '@/store'
import { ProductData } from '@/types/item-type'
import Cart from './Cart'

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [openCart, setOpenCart] = useState(false)
	const { cartProducts } = useProductCart()

	const openCartHandler = () => {
		setOpenCart(!openCart)
	}

	useEffect(() => {
		const handleScroll = () => {
			if (global.scrollY > 50) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		global.addEventListener('scroll', handleScroll)
		return () => {
			global.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const getTotalQuantity = (cartProducts: ProductData[]): number => {
		return cartProducts.reduce((sum, item) => {
			return sum + item.price.reduce((sizeSum, priceObj) => sizeSum + priceObj.quantity, 0)
		}, 0)
	}

	return (
		<header
			className={`w-full h-[5rem] fixed top-0 z-20 transition-colors duration-300 ${
				isScrolled ? 'bg-gray-900' : 'transparent'
			}`}
		>
			{openCart && <Cart openCartHandler={openCartHandler} />}
			<Shell className=" container h-full flex justify-between items-center">
				<div className="flex items-center gap-4">
					<BsTelephoneForward className={`text-xl ${isScrolled ? 'text-gray-200' : 'text-black'}`} />
					<div
						className={`flex flex-col gap-1 items-start justify-center ${isScrolled ? 'text-gray-200' : 'text-black'}`}
					>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
					</div>
				</div>
				<div className={`logo  ${isScrolled ? 'text-gray-200' : 'text-black'}`}>Coffee Town</div>
				<div className="relative p-2 flex items-center justify-between gap-4">
					{cartProducts.length > 0 ? (
						<>
							<div
								className={`absolute -top-1 left-3 z-[-1] px-2 py-[.15rem] bg-orange-600 text-gray-200 rounded-full flex justify-center items-center `}
							>
								{cartProducts.length > 0 && getTotalQuantity(cartProducts)}
							</div>
							<PiShoppingCartSimpleFill
								size={28}
								className={`text-xl cursor-pointer ${isScrolled ? 'text-gray-200' : 'text-black'}`}
								onClick={openCartHandler}
							/>
						</>
					) : (
						<FaOpencart
							size={24}
							className={`text-xl cursor-pointer ${isScrolled ? 'text-gray-200' : 'text-black'}`}
							// onClick={openCartHandler}
						/>
					)}

					<Button
						text="Login"
						className="bg-orange-600 px-4 py-1 rounded-sm text-gray-200 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150 "
					/>
					{isOpen ? (
						<RxCross1
							className={`text-xl cursor-pointer ${isScrolled ? 'text-gray-200' : 'text-black'}`}
							onClick={() => setIsOpen(!isOpen)}
						/>
					) : (
						<RxHamburgerMenu
							size={24}
							className={`text-xl cursor-pointer ${isScrolled ? 'text-gray-200' : 'text-black'}`}
							onClick={() => setIsOpen(!isOpen)}
						/>
					)}
				</div>
			</Shell>
			{isOpen && (
				<div className={`w-full h-16 transition-colors duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-gray-700/10'}`}>
					<Shell className=" container h-full flex justify-center items-center">
						<div className="flex items-center gap-12">
							<Link href={'/'} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Home
							</Link>
							<Link href={'/menu'} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Menu
							</Link>
							<Link href={''} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Features
							</Link>
							<Link href={''} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Traditional
							</Link>
							<Link href={'/#booking'} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Booking
							</Link>
							<Link href={'/#location'} className={`text-lg ${isScrolled ? 'text-gray-200' : 'text-black'}`}>
								Location
							</Link>
						</div>
					</Shell>
				</div>
			)}
		</header>
	)
}

export default Header
