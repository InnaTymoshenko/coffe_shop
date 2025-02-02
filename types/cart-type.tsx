export interface ICart {
	id: number
	category: string
	size: 'small' | 'medium' | 'large'
	img: string
	name: string
	quantity: number
	price: number
	totalPrice: number
}
