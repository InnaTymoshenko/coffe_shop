interface IPhoto {
	medium: string
	portrait: string
	landscape: string
	tiny: string
}

export type Size = ['small', 'medium', 'large']

export interface IPrice {
	small: number
	medium: number
	large: number
}

export interface IQuantity {
	small: number
	medium: number
	large: number
}

export interface CoffeeData {
	id: number
	alt: string
	src: IPhoto
	category: string
	size: Size
	price: IPrice
	quantity: IQuantity
	title: string
	rating: number
	totalPrice: number
}

export interface CupcakeData {
	id: number
	alt: string
	src: IPhoto
	category: string
	price: number
	quantity: number
	title: string
	rating: number
	totalPrice: number
}
