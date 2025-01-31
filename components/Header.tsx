'use client'

import { useState, useEffect } from 'react'
import { BsTelephoneForward } from 'react-icons/bs'
import { FaOpencart } from 'react-icons/fa'
import Shell from './ui/Shell'

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
			<Shell className=" container h-full flex justify-between items-center">
				<div>
					<BsTelephoneForward className={`text-xl ${isScrolled ? 'text-white' : 'text-black'}`} />
				</div>
				<div className={`logo  ${isScrolled ? 'text-white' : 'text-black'}`}>Coffee Town</div>
				<div>
					<FaOpencart className={`text-xl ${isScrolled ? 'text-white' : 'text-black'}`} />
				</div>
			</Shell>
		</header>
	)
}

export default Header
