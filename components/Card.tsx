/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { FaStar } from 'react-icons/fa'
import { DATA } from '@/types/item-type'
import { Button } from './Button'

type Props = {
	items: DATA[]
}

const Card = ({ items }: Props) => {
	return (
		<div className="w-full flex flex-wrap gap-8 justify-center">
			{items?.map((item, index) => (
				<div
					key={index}
					className="w-[300px] h-[400px]  border-transparent rounded-sm overflow-hidden flex flex-col items-center justify-between group"
				>
					<div className="w-full h-full relative">
						<img src={item.src.medium} alt="" className="w-full h-full object-cover" />

						<div className="card_hover absolute bottom-0 left-0 w-full h-full bg-black/50 flex flex-col gap-2 items-start justify-between text-white text-left p-4 ">
							<div className="absolute top-0 right-0 bg-gray-900/70 p-2 rounded-bl-lg flex gap-1 items-center">
								<span className="font-thin text-md">{item.rating}</span>
								<FaStar className="text-orange-300" />
							</div>
							<h3 className="text-2xl">{item.title}</h3>
							<p className="my-6">{item.alt}</p>
							<div className="w-full flex flex-col gap-2 justify-between items-center">
								{item.category === 'Coffee' && (
									<div className="w-full flex justify-between items-center gap-2 text-lg">
										<Button
											text="S"
											className="button w-[4.5rem] h-10 bg-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:border-gray-200 "
										/>
										<Button
											text="M"
											className="button w-[4.5rem] h-10 bg-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:border-gray-200 "
										/>
										<Button
											text="L"
											className="button w-[4.5rem] h-10 bg-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:border-gray-200 "
										/>
									</div>
								)}

								<div className="w-[50%] h-8 mx-auto flex justify-between items-center gap-2 border-2 border-gray-900 rounded-sm bg-gray-900 hover:border-gray-200">
									<Button text="-" className="button w-10 h-full" />
									<span>1</span>
									<Button text="+" className="button w-10 h-full" />
								</div>
								<div className="w-full flex justify-between items-center gap-2 r-4">
									<div className="flex flex-col gap-2 items-center px-2">
										<span className="text-gray-400">Price:</span>
										<div className="flex gap-1 text-xl">
											<strong className="text-orange-600">$</strong>
											<strong>{item.price.medium.toFixed(2)}</strong>
										</div>
									</div>
									<Button
										text="Add to cart"
										className="button w-32 h-[80%] bg-orange-600 p-2 border-2 border-orange-600 hover:border-gray-200"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Card
