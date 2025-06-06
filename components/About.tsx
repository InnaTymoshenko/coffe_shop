'use client'

import React, { useEffect, useState } from 'react'
import { Coffee, Armchair, Leaf, Utensils, ChefHat, Smile } from 'lucide-react'
import { GiCoffeePot, GiCupcake } from 'react-icons/gi'
import fakeFeatures from '@/fakedata/features.json'
import fakeAdvantage from '@/fakedata/advantages.json'
import Shell from './ui/shell'
import AnimatedNumber from './animated-number'
import { IFeature, IAdvantage } from '@/types/feature-type'

// type Props = {}

const About = () => {
	const [features, setFeatures] = useState<IFeature[]>()
	const [advantages, setAdvantages] = useState<IAdvantage[]>()

	useEffect(() => {
		setFeatures(fakeFeatures as IFeature[])
	}, [])

	useEffect(() => {
		setAdvantages(fakeAdvantage as IAdvantage[])
	}, [])

	return (
		<div id="features" className="w-full min-h-[70vh] mb-8">
			<Shell className="container">
				<div className="w-full flex flex-col items-start gap-8 py-8">
					<h2 className="text-white text-3xl my-6">Our Features</h2>
					<div className="w-full flex lg:flex-row sm:flex-col flex-wrap gap-8 justify-center">
						{features &&
							features.map(feature => (
								<div
									key={feature.title}
									className="relative lg:w-[16rem] sm:w-[80%] h-[16rem] mx-auto bg-gray-900/80 text-gray-200 border-transparent rounded-sm flex flex-col items-center justify-between p-4"
								>
									{feature.icon === 'coffee' && (
										<div className="absolute top-[-1.5rem] left-[40%] w-16 h-16 rounded-full bg-orange-600/70 ">
											<GiCoffeePot size={48} className="text-gray-800" />
										</div>
									)}
									{feature.icon === 'atmosphere' && (
										<div className="absolute top-[-1.5rem] left-[40%] w-16 h-16 rounded-full bg-orange-600/70 ">
											<Armchair size={48} className="text-gray-800" />
										</div>
									)}
									{feature.icon === 'eco' && (
										<div className="absolute top-[-1.5rem] left-[40%] w-16 h-16 rounded-full bg-orange-600/70 ">
											<Leaf size={48} className="text-gray-800" />
										</div>
									)}
									{feature.icon === 'menu' && (
										<div className="absolute top-[-1.5rem] left-[40%] w-16 h-16 rounded-full bg-orange-600/70 ">
											<Utensils size={48} className="text-gray-800" />
										</div>
									)}
									<h3 className="text-2xl font-semibold mt-10">{feature.title}</h3>
									<p className="lg:w-full sm:w-[80%] mx-auto ">{feature.description}</p>
								</div>
							))}
					</div>
					<div className="advantages-container lg:w-full sm:w-[80%] mx-auto bg-gray-900/30 py-4 px-2 flex lg:flex-row sm:flex-col gap-8 justify-between items-center">
						{advantages &&
							advantages.map(advantage => (
								<div
									key={`${advantage.description.trim()}`}
									className="lg:w-[25%] sm:w-[60%] flex gap-4 items-center py-4 pl-2 pr-6 lg:border-r-2 lg:border-r-gray-200 lg:border-b-transparent sm:border-b-2 sm:border-b-gray-200"
								>
									{advantage.icon === 'coffee' && (
										<div className="w-16 h-16 rounded-full bg-gray-800/70 ">
											<Coffee size={48} className="text-orange-600" />
										</div>
									)}
									{advantage.icon === 'smile' && (
										<div className="w-16 h-16 rounded-full bg-gray-800/70 ">
											<Smile size={48} className="text-orange-600" />
										</div>
									)}
									{advantage.icon === 'cupcake' && (
										<div className="w-16 h-16 rounded-full bg-gray-800/70 ">
											<GiCupcake size={48} className="text-orange-600" />
										</div>
									)}
									{advantage.icon === 'award' && (
										<div className="w-16 h-16 rounded-full bg-gray-800/70 ">
											<ChefHat size={48} className="text-orange-600" />
										</div>
									)}
									<div className="flex flex-col gap-2 justify-between items-start text-gray-200">
										<h3 className="text-4xl">
											<AnimatedNumber targetValue={advantage.title} />
										</h3>
										<p>{advantage.description}</p>
									</div>
								</div>
							))}
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default About
