interface IPhoto {
	medium: string
	portrait: string
	landscape: string
	tiny: string
}

export type Size = 'small' | 'medium' | 'large'
export type QuantityType = 'increment' | 'decrement'

export interface IPrice {
	size: Size
	price: number
	quantity: number
	isChecked: boolean // Додаємо відстеження активного розміру
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
