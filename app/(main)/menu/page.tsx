'use client'

import React from 'react'
import { Coffee, Dessert } from 'lucide-react'
import ReservationForm from '@/components/layouts/forms/reservation-form'
import Shell from '@/components/ui/shell'
import MenuList from '@/components/menu-list'
import { Button } from '@/components/ui/button'
import { useProductCart } from '@/store'

// type Props = {}

const MenuPage = () => {
	const { activeTab, setActiveTab, cupcakeData, coffeeData } = useProductCart()

	return (
		<>
			<div className="w-full h-[20vh] " />
			<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col gap-6">
					<div className="flex justify-start gap-4">
						<Button
							className={`py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${activeTab === 'coffee' ? 'underline text-gray-200' : 'no-underline text-gray-600'}`}
							style={{ textUnderlineOffset: '6px' }}
							onClick={() => setActiveTab('coffee')}
						>
							Coffee
							<Coffee
								size={18}
								className={`transition-all text-gray-200 ${activeTab === 'coffee' ? 'opacity-100' : 'opacity-0'}`}
							/>
						</Button>
						<Button
							className={`px-4 py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${activeTab === 'cupcake' ? 'underline text-gray-200' : 'no-underline text-gray-600'}`}
							style={{ textUnderlineOffset: '6px' }}
							onClick={() => setActiveTab('cupcake')}
						>
							Cupcake
							<Dessert
								size={18}
								className={`transition-all text-gray-200 ${activeTab === 'cupcake' ? 'opacity-100' : 'opacity-0'}`}
							/>
						</Button>
					</div>
					<div>
						{activeTab === 'coffee' ? (
							<MenuList products={coffeeData} title={'Coffee'} />
						) : (
							<MenuList products={cupcakeData} title={'Cupcake'} />
						)}
					</div>
				</Shell>
			</div>
			<div className="w-full min-h-[70vh] flex flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
					<h2 className="text-white text-3xl my-6 bg-gray-900/80 p-2 rounded-sm">Book a Table</h2>
					<ReservationForm />
				</Shell>
			</div>
			<div className="fixed top-0 left-0 w-full h-screen bg-coffeebeans basic z-[-2]" aria-hidden="true" />
		</>
	)
}

export default MenuPage
