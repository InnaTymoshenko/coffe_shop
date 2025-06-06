'use client'

import React from 'react'
import Link from 'next/link'
import { RiTwitterXLine, RiTelegram2Fill, RiMailLine } from 'react-icons/ri'
import { SlSocialLinkedin, SlSocialInstagram, SlSocialFacebook, SlSocialDribbble } from 'react-icons/sl'
import { BsTelephoneForward } from 'react-icons/bs'
import { Separator } from './ui/separator'
import { mainMenuConfig } from '@/root-config/main-menu'

type MobileHeaderProps = {
	isMobile: boolean
	setIsMobile: (value: boolean) => void
}

const MobileHeader = ({ isMobile, setIsMobile }: MobileHeaderProps) => {
	return (
		<div className="fixed top-0 bottom-0 w-full min-h-screen bg-gray-900/80 z-40 flex justify-start">
			<div className="w-[80%] min-h-full bg-gray-900 border-r-2 border-r-gray-700 text-gray-200 flex flex-col gap-8 justify-start p-6 overflow-y-auto">
				<div className={`logo text-2xl text-gray-200`}>Coffee Town</div>
				<Separator className="bg-gray-200" />
				<p className="text-lg text-gray-200 cursor-pointer">My Cart</p>
				<p className="text-lg text-gray-200 cursor-pointer">My Cabinet</p>
				<Separator className="bg-gray-800" />
				<div className="flex flex-col justify-start items-start gap-6">
					{mainMenuConfig.mainMenu.map((item, ind) => (
						<Link
							key={`${item.title}-${ind}`}
							href={item.href}
							className={`text-lg text-gray-200`}
							onClick={() => setIsMobile(!isMobile)}
						>
							{item.title}
						</Link>
					))}
				</div>
				<Separator className="bg-gray-800" />
				<div className="sm:flex lg:hidden items-center gap-4">
					<BsTelephoneForward className={`text-xl text-gray-200`} />
					<div className={`flex flex-col gap-1 items-start justify-center text-gray-200`}>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
						<a href="tel:+38055555555">+38(055) 55 55 55</a>
					</div>
				</div>
				<div className="flex gap-2 items-center py-1">
					<RiMailLine />
					<a
						className="hover:underline text-decoration-2 hover:text-gray-400"
						style={{ textUnderlineOffset: '6px' }}
						href="mailto:info@coffeetown.com"
					>
						info@coffeetown.com
					</a>
				</div>
				<Separator className="bg-gray-800" />
				<div className="flex gap-4 items-center py-2">
					<SlSocialLinkedin size={24} className="cursor-pointer hover:text-gray-400" />
					<SlSocialFacebook size={24} className="cursor-pointer hover:text-gray-400" />
					<SlSocialDribbble size={24} className="cursor-pointer hover:text-gray-400" />
					<SlSocialInstagram size={24} className="cursor-pointer hover:text-gray-400" />
					<RiTwitterXLine size={24} className="cursor-pointer hover:text-gray-400" />
					<RiTelegram2Fill size={24} className="cursor-pointer hover:text-gray-400" />
				</div>
			</div>
		</div>
	)
}

export default MobileHeader
