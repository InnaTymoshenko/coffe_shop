'use client'

import React, { useState } from 'react'
import { Coffee, Dessert } from 'lucide-react'
import ReservationForm from '@/components/ReservationForm'
import Shell from '@/components/ui/Shell'
import Image from 'next/image'
import CoffeeList from '@/components/Coffee-list'
import CupcakeList from '@/components/Cupcake-list'
import { Button } from '@/components/ui/Button'

// type Props = {}

const MenuPage = () => {
	const [activeTab, setActiveTab] = useState<'coffee' | 'desserts'>('coffee')

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen bg-stillife basic z-[-2]" />
			<div className="w-full h-[60vh] bg-gray-200">
				<Shell className="container h-full">
					<div className="w-full h-[4rem]" />
					<Image
						src={'/assets/coffee-21.png'}
						alt={'coffee beans'}
						width={500}
						height={300}
						className="w-full h-[70%]"
					/>
					<div className="flex justify-start my-6 gap-4">
						<Button
							className={`py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${activeTab === 'coffee' ? 'underline text-gray-900' : 'no-underline text-gray-600'}`}
							style={{ textUnderlineOffset: '6px' }}
							onClick={() => setActiveTab('coffee')}
						>
							Coffee
							<Coffee
								size={18}
								className={`transition-all text-gray-900 ${activeTab === 'coffee' ? 'opacity-100' : 'opacity-0'}`}
							/>
						</Button>
						<Button
							className={`px-4 py-2 text-lg flex items-center gap-1 font-semibold transition-all text-decoration-2
            ${activeTab === 'desserts' ? 'underline text-gray-900' : 'no-underline text-gray-600'}`}
							style={{ textUnderlineOffset: '6px' }}
							onClick={() => setActiveTab('desserts')}
						>
							Cupcake
							<Dessert
								size={18}
								className={`transition-all text-gray-900 ${activeTab === 'desserts' ? 'opacity-100' : 'opacity-0'}`}
							/>
						</Button>
					</div>
				</Shell>
			</div>
			<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
				<Shell className="container flex flex-col gap-6">
					{/* <div className="flex justify-start my-6 gap-4">
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
            ${activeTab === 'desserts' ? 'underline text-gray-200' : 'no-underline text-gray-600'}`}
							style={{ textUnderlineOffset: '6px' }}
							onClick={() => setActiveTab('desserts')}
						>
							Cupcake
							<Dessert
								size={18}
								className={`transition-all text-gray-200 ${activeTab === 'desserts' ? 'opacity-100' : 'opacity-0'}`}
							/>
						</Button>
					</div> */}
					<div>{activeTab === 'coffee' ? <CoffeeList /> : <CupcakeList />}</div>
				</Shell>
			</div>
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
