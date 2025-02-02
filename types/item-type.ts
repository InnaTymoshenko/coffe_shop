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

export interface DATA {
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

// export interface CUPCAKE_DATA {
// 	id: number
// 	alt: string
// 	src: IPHOTO
// 	category: string
// 	price: number
// 	title: string
// 	rating: number
// }
