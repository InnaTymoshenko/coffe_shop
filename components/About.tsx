'use client'

import React, { useEffect, useState } from 'react'
import { Coffee, Armchair, Leaf, Utensils } from 'lucide-react'
import fakeFeatures from '@/fakedata/features.json'
import Shell from './ui/Shell'
import { IFeature } from '@/types/feature-type'

// type Props = {}

const About = () => {
	const [features, setFeatures] = useState<IFeature[]>()

	useEffect(() => {
		setFeatures(fakeFeatures as IFeature[])
	}, [])

	return (
		<div className="w-full h-[100vh]">
			<Shell className="container">
				<div className="w-full flex flex-col items-start gap-8 py-8">
					<h2 className="text-white text-3xl my-6">Our Features</h2>
					<div className="w-full flex flex-wrap gap-8 justify-center">
						{features &&
							features.map(feature => (
								<div
									key={feature.title}
									className="relative w-[16rem] h-[16rem] bg-gray-900/80 text-gray-200 border-transparent rounded-sm flex flex-col items-center justify-between p-4"
								>
									{feature.icon === 'coffee' && (
										<div className="absolute top-[-1.5rem] left-[40%] w-16 h-16 rounded-full bg-orange-600/70 ">
											<Coffee size={48} className="text-gray-800" />
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
									<p>{feature.description}</p>
								</div>
							))}
					</div>
				</div>
			</Shell>
		</div>
	)
}

export default About
