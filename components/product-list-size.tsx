import React from 'react'
import { Button } from './ui/button'
import { IPrice, Size } from '@/types/item-type'

type CardSize = {
	item: IPrice
	text: string
	ml: string
	flOz: string
	children: React.ReactNode
	selected: string
	selectedHandler: (value: Size) => void
}

const ProductListSize = ({ item, text, ml, flOz, children, selected, selectedHandler }: CardSize) => {
	return (
		<>
			<Button
				className={`button w-[3.5rem] h-[3.5rem] rounded-full bg-gray-900 border-2 transition-all duration-300
				hover:bg-gray-900 hover:border-gray-200 ${selected === item.size ? 'border-gray-200' : 'border-gray-900'}`}
				onClick={() => selectedHandler(item.size)}
			>
				{children}
			</Button>
			<div className="text-center mt-2">
				<p className="font-semibold">{text}</p>
				<p className="text-xs text-gray-500">{ml}</p>
				<p className="text-xs text-gray-500">({flOz})</p>
			</div>
		</>
	)
}

export default ProductListSize
