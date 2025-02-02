/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useState } from 'react'
import { CiCoffeeCup, CiGift } from 'react-icons/ci'
import { GiCoffeeBeans, GiCakeSlice, GiFlowers } from 'react-icons/gi'
import Shell from './ui/Shell'
import { ITradition } from '@/types/feature-type'
import fakeTraditions from '@/fakedata/traditions.json'

// type Props = {}

const Traditions = () => {
	const [traditions, setTraditions] = useState<ITradition[]>()
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		setTraditions(fakeTraditions as ITradition[])
	}, [])

	useEffect(() => {
		if (traditions) {
			const interval = setInterval(() => {
				setCurrentIndex(prevIndex => (prevIndex + 1) % traditions.length)
			}, 5000)
			return () => clearInterval(interval)
		}
	}, [traditions])

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8 mb-8">
			<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">Our Traditions</h2>
				<div className="w-full max-w-[960px] mx-auto flex flex-col items-center gap-8 justify-center relative">
					<div className="relative w-full h-[55vh] overflow-hidden">
						{traditions &&
							traditions.map((tradition, index) => (
								<div
									key={tradition.title}
									className={`absolute inset-0 transition-opacity duration-1000 ${
										index === currentIndex ? 'opacity-100' : 'opacity-0'
									}`}
								>
									<div className="relative w-full h-[400px]">
										<div className="absolute top-0 left-[2rem] z-10 w-[600px] h-[450px] rounded-sm overflow-hidden">
											<img
												src={tradition.image}
												alt={tradition.title}
												className="w-full h-full object-cover object-center"
											/>
										</div>
										<div className="absolute top-[20%] right-[5%] z-20 w-[350px] h-[300px] flex justify-center items-center rounded-sm p-2 bg-gray-900 text-gray-200">
											<div className="relative w-[95%] h-[95%] p-8 border-2 border-gray-600 rounded-sm flex flex-col justify-between items-start gap-4">
												{tradition.icon === 'coffee' && (
													<GiCoffeeBeans size={72} className="absolute top-5 right-5 text-gray-800/40" />
												)}
												{tradition.icon === 'loyalty' && (
													<GiCakeSlice size={72} className="absolute top-5 right-5 text-gray-800/40" />
												)}
												{tradition.icon === 'personal' && (
													<CiCoffeeCup size={72} className="absolute top-5 right-5 text-gray-800/40" />
												)}
												{tradition.icon === 'guests' && (
													<CiGift size={72} className="absolute top-5 right-5 text-gray-800/40" />
												)}
												{tradition.icon === 'season' && (
													<GiFlowers size={72} className="absolute top-5 right-5 text-gray-800/40" />
												)}
												<h3 className="text-2xl font-semibold mt-8">{tradition.title}</h3>
												<p>{tradition.description}</p>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
					<div className="flex gap-2">
						{traditions &&
							traditions.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentIndex ? 'bg-orange-600 scale-125' : 'bg-gray-400'
									}`}
								/>
							))}
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default Traditions
