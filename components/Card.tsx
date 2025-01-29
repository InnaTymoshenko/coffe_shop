/* eslint-disable @next/next/no-img-element */
import { DATA } from '@/types/item-type'
import React from 'react'

type Props = {
	items: DATA[]
}

const Card = ({ items }: Props) => {
	return (
		<div className="w-full flex flex-wrap gap-8 justify-center">
			{items?.map((item, index) => (
				<div
					key={index}
					className="w-[300px] h-[350px]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
				>
					{/* Контейнер зображення */}
					<div className="w-full h-full relative">
						<img src={item.src.original} alt="" className="w-full h-full object-cover" />

						{/* Оверлей та текст при ховері */}
						<div className="absolute bottom-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 text-white text-center p-4 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
							{item.alt}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Card
