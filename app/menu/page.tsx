'use client'

import React from 'react'
import ReservationForm from '@/components/ReservationForm'
import Shell from '@/components/ui/Shell'
import Image from 'next/image'
import ProductsMenu from '@/components/Products-menu'

// type Props = {}

const MenuPage = () => {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-stillife basic z-[-2]" />
			<div className="w-full h-[50vh] bg-gray-200">
				<Shell className="w-full max-w-[1240px] mx-auto h-full">
					<Image
						src={'/assets/coffee-beans.jpg'}
						alt={'coffee beans'}
						width={500}
						height={300}
						className="w-full h-full"
					/>
				</Shell>
			</div>
			<ProductsMenu />
			<div className="w-full min-h-screen flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6 bg-gray-900/80 p-2 rounded-sm">Book a Table</h2>
					<ReservationForm />
				</Shell>
			</div>
		</>
	)
}

export default MenuPage
