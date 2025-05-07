interface IPhoto {
	medium: string
	portrait: string
	landscape: string
	tiny: string
}

export type Size = 'small' | 'medium' | 'large' | string
export type QuantityType = 'increment' | 'decrement'
export type Category = 'Coffee' | 'Cupcake'

export interface IPrice {
	size: Size
	price: number
	quantity: number
	isChecked: boolean
}

export interface ProductData {
	id: number
	alt: string
	src: IPhoto
	ingridients: string[]
	category: Category
	price: IPrice[]
	title: string
	rating: number
	totalPrice: number
}
