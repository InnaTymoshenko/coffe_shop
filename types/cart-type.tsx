export interface ICoffeeCart {
	id: number
	category: string
	size: 'small' | 'medium' | 'large'
	img: string
	name: string
	quantity: number
	price: number
	totalPrice: number
}
export interface ICupсakeCart {
	id: number
	category: string
	img: string
	name: string
	quantity: number
	price: number
	totalPrice: number
}
