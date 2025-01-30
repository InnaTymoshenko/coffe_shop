/* eslint-disable @next/next/no-img-element */
import { DATA } from '@/types/item-type'
import React from 'react'
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
							<h3 className="text-2xl">Cappuccino</h3>
							<p className="my-6">{item.alt}</p>
							<div className="w-full flex justify-between items-center gap-2 text-xl">
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
							<div className="w-full flex justify-between items-center gap-2 r-4">
								<div className="flex flex-col gap-2 items-center px-2">
									Price:
									<div className="flex gap-1 text-xl">
										<strong className="text-orange-600">$</strong>
										<strong>11.00</strong>
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
			))}
		</div>
	)
}

export default Card
