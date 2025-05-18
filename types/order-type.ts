import { ProductData } from './item-type'

export type OrderType = 'delivery' | 'in-place'
export type OrderStatus = 'pending' | 'cancelled' | 'processed' | 'shipped' | 'completed'
export interface OrderDetails {
	address: string
	requiredDate?: string // 'dd.mm.yyyy'
	requiredTime?: string // 'hh:mm'
	note?: string // додаткові побажання
	placeName: string // наприклад, назва кафе
}

export interface OrderData {
	id: string
	numberInLine: number
	createdDateAt: string
	createdTimeAt: string
	status: OrderStatus
	clientId: string | null
	items: ProductData[]
	totalAmount: number
	type: OrderType
	details: OrderDetails
}
