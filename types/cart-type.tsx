import { IPrice, Size, IQuantity } from './item-type'

export interface ICart {
	id: number
	category: string
	size: Size
	img: string
	name: string
	quantity: IQuantity
	price: IPrice
	totalPrice: number
}
