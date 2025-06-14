import React from 'react'
import { Button } from './ui/button'
import { IPrice, Size } from '@/types/item-type'

type CardSize = {
	item: IPrice
	text: string
	selected: string
	selectedHandler: (value: Size) => void
}

const ProductCardSize = ({ item, text, selected, selectedHandler }: CardSize) => {
	return (
		<Button
			text={text}
			className={`button xl:w-[3.5rem] sm:w-[5rem] h-10 bg-gray-900 border-2 hover:bg-gray-900 hover:border-gray-200 transition-all duration-300 ${
				selected === item.size ? 'border-gray-200' : 'border-gray-800'
			}`}
			onClick={() => selectedHandler(item.size)}
		/>
	)
}

export default ProductCardSize
