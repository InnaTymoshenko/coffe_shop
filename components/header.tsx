'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BsTelephoneForward } from 'react-icons/bs'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import { FaOpencart } from 'react-icons/fa'
import Shell from './ui/shell'
import { Button } from './ui/button'
import { useProductCart } from '@/store'
import { ProductData } from '@/types/item-type'
import Cart from './cart'
import { mainMenuConfig } from '@/root-config/main-menu'
import AnimatedButton from './ui/animated-button'
import MobileHeader from './mobile-header'

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const { cartProducts, openCart, setOpenCart } = useProductCart()
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)
	const rootSection = segments[0]
	const isHomePage = pathname === '/'
	const isContact = pathname === '/contacts' || pathname === '/traditional' || rootSection === 'cabinet'

	const openCartHandler = () => {
		setOpenCart(!openCart)
		setIsMobile(false)
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

	const quantity: number = getTotalQuantity(cartProducts)

	return (
		<header
			className={`w-full h-[5rem] fixed top-0 z-20 transition-colors duration-300 ${
				isScrolled ? 'bg-gray-900' : 'transparent'
			}`}
		>
			<Shell className="relative container h-full flex lg:justify-between sm:justify-center items-center">
				<div className="lg:flex sm:hidden items-center gap-4">
					<BsTelephoneForward className={`text-xl ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`} />
					<div
						className={`flex flex-col gap-1 items-start justify-center ${
							!isContact && !isScrolled ? 'text-black' : 'text-gray-200'
						}`}
					>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
					</div>
				</div>
				<div className={`logo text-2xl ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}>Coffee Town</div>
				<div className="relative p-2 lg:flex sm:hidden items-center justify-between gap-4">
					{quantity > 0 ? (
						<>
							<div
								className={`absolute -top-1 left-3 z-[-1] px-2 py-[.15rem] bg-orange-600 text-gray-200 rounded-full flex justify-center items-center `}
							>
								{getTotalQuantity(cartProducts)}
							</div>
							<PiShoppingCartSimpleFill
								size={28}
								className={`text-xl cursor-pointer ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}
								onClick={openCartHandler}
							/>
						</>
					) : (
						<FaOpencart
							size={24}
							className={`text-xl cursor-pointer ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}
						/>
					)}
					<Button className="relative overflow-hidden w-14 h-7 bg-orange-600 px-4 py-1 rounded-sm text-gray-200 border-2 border-orange-600 hover:border-gray-200 active:bg-orange-700 active:scale-95 transition-all duration-150 ">
						<AnimatedButton className="w-12 hover:-top-9" text={'Login'} />
					</Button>
					{isOpen ? (
						<RxCross1
							className={`text-xl cursor-pointer ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}
							onClick={() => setIsOpen(!isOpen)}
						/>
					) : (
						<RxHamburgerMenu
							size={24}
							className={`text-xl cursor-pointer ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}
							onClick={() => setIsOpen(!isOpen)}
						/>
					)}
				</div>
				<div className="lg:hidden sm:block absolute top-6 right-8 z-50">
					{isMobile ? (
						<RxCross1
							className={`text-xl cursor-pointer ${!isContact && !isMobile ? 'text-black' : 'text-gray-200'}`}
							onClick={() => setIsMobile(!isMobile)}
						/>
					) : (
						<RxHamburgerMenu
							size={24}
							className={`text-xl cursor-pointer ${!isContact && !isScrolled ? 'text-black' : 'text-gray-200'}`}
							onClick={() => setIsMobile(!isMobile)}
						/>
					)}
				</div>
			</Shell>
			{isOpen && (
				<div className={`w-full h-16 transition-colors duration-300 ${isScrolled ? 'bg-gray-900' : 'bg-gray-700/10'}`}>
					<Shell className=" w-full p-4 h-full flex justify-center items-center">
						<div className="flex items-center gap-12">
							{mainMenuConfig.mainMenu.map((item, ind) => (
								<Link
									key={`${item.title}-${ind}`}
									href={item.href}
									className={`text-lg ${isHomePage && !isScrolled ? 'text-black' : 'text-gray-200'}`}
									onClick={() => setIsOpen(!isOpen)}
								>
									{item.title}
								</Link>
							))}
						</div>
					</Shell>
				</div>
			)}
			{isMobile && (
				<MobileHeader
					quantity={quantity}
					openCartHandler={openCartHandler}
					isMobile={isMobile}
					setIsMobile={setIsMobile}
				/>
			)}
			{openCart && <Cart openCartHandler={openCartHandler} />}
		</header>
	)
}

export default Header
