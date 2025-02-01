/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useState } from 'react'
import Shell from './ui/Shell'
import { ITradition } from '@/types/feature-type'
import fakeTraditions from '@/fakedata/traditions.json'

// type Props = {}

const Traditions = () => {
	const [traditions, setTraditions] = useState<ITradition[]>()

	useEffect(() => {
		setTraditions(fakeTraditions as ITradition[])
	}, [])

	return (
		<div className="w-full flex bg-gray-900 flex-col gap-8 justify-start py-8">
			<Shell className="container flex flex-col flex-wrap gap-4 justify-center items-start">
				<h2 className="text-white text-3xl my-6">Our Traditions</h2>
				<div className="w-full flex flex-col items-center gap-8 justify-center">
					{traditions &&
						traditions.map(tradition => (
							<div key={`${tradition.title.trim()}`} className="relative w-full h-[500px]">
								<div className="absolute top-0 left-48 z-10 w-[500px] h-[500px] rounded-sm">
									<img src={'/assets/banner.jpg'} alt={tradition.title} className="w-full h-full rounded-sm" />
								</div>

								<div className="absolute top-20 right-48 z-20 w-[350px] h-[350px] flex justify-center items-center rounded-sm p-2 bg-gray-900 text-gray-200">
									<div className="w-[95%] h-[95%]  p-4 border-2 border-gray-200 rounded-sm flrx flex-col justify-center items-center gap-4">
										<h3 className="text-2xl font-semibold mt-10">{tradition.title}</h3>
										<p>{tradition.description}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</Shell>
		</div>
	)
}

export default Traditions
