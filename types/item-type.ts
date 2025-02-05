interface IPhoto {
	medium: string
	portrait: string
	landscape: string
	tiny: string
}

export type Size = 'small' | 'medium' | 'large'

export interface IPrice {
	size: Size
	price: number
	quantity: number
}

export interface ProductData {
	id: number
	alt: string
	src: IPhoto
	ingridients: string
	category: string
	price: IPrice[]
	title: string
	rating: number
	totalPrice: number
}
