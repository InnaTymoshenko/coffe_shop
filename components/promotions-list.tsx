/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { ButtonLink } from './ui/button-link'
import { useAdminStore } from '@/store/admin-store'
import AnimatedButton from './ui/animated-button'

// type Props = {}

const PromotionsList = () => {
	const { promotionsData } = useAdminStore()
	const filteredPromotions = promotionsData.filter(promotion => promotion.status === 'active' && promotion.image)

	return (
		<div className="w-full grid grid-cols-2 gap-4 p-4">
			{filteredPromotions &&
				filteredPromotions.map(pr => (
					<div
						key={pr.id}
						className="w-full h-[45rem] relative border border-gray-800 overflow-hidden rounded-sm text-gray-200 text-transparent transition-all duration-500 hover:text-gray-200"
					>
						<h2 className="text-3xl text-gray-200 font-semibold absolute top-8 left-16 z-10">{pr.title}</h2>
						<p className=" w-[80%] text-xl text-center absolute top-56 left-8 z-10">{pr.description}</p>
						<ButtonLink
							href="/menu"
							aria-label="View Menu"
							className="absolute bottom-8 right-8 z-10 w-32 h-10 rounded-lg overflow-hidden border border-orange-600 bg-orange-600 px-8 py-2 text-gray-200 transition-all duration-500 hover:border-gray-200"
						>
							<AnimatedButton className="w-32 py-2 hover:-top-9" text={'View Menu'} />
						</ButtonLink>
						<div className="relative group w-full overflow-hidden rounded-xl">
							<img
								src={pr.image}
								alt={pr.title}
								className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110 relative z-1"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 z-2 pointer-events-none" />
						</div>
					</div>
				))}
		</div>
	)
}

export default PromotionsList
