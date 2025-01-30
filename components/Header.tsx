'use client'

import { useState, useEffect } from 'react'
import { BsTelephoneForward } from 'react-icons/bs'
import { FaOpencart } from 'react-icons/fa'

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

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

	return (
		<header
			className={`w-full h-[5rem] fixed top-0 z-50 transition-colors duration-300 ${
				isScrolled ? 'bg-gray-900' : 'transparent'
			}`}
		>
			<div className="w-full h-full max-w-[1200px] flex justify-between items-center m-auto px-6">
				<div>
					<BsTelephoneForward className={`text-xl ${isScrolled ? 'text-white' : 'text-black'}`} />
				</div>
				<div className={`logo  ${isScrolled ? 'text-white' : 'text-black'}`}>Coffee Town</div>
				<div>
					<FaOpencart className={`text-xl ${isScrolled ? 'text-white' : 'text-black'}`} />
				</div>
			</div>
		</header>
	)
}

export default Header
