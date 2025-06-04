import { PromotionType } from './promotion-type'

interface IPhoto {
	medium: string
	portrait: string
	landscape: string
	tiny: string
}

export type Size = 'small' | 'medium' | 'large' | string
export type QuantityType = 'increment' | 'decrement'
export type Category = 'Coffee' | 'Cupcake' | string

export interface IPrice {
	size: Size
	price: number
	quantity: number
	isChecked: boolean
	originalPrice?: number
	isDiscounted?: boolean
}

export interface ProductData {
	id: string
	alt: string
	src: IPhoto
	ingridients: string[]
	category: Category
	price: IPrice[]
	title: string
	rating?: number
	ratingCount?: number
	totalPrice: number
	promotion?: {
		id?: string
		type?: PromotionType
		label?: string
		isActive?: boolean
		season?: string
	}
}
