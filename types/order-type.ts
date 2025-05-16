import { ProductData } from './item-type'

export type OrderType = 'delivery' | 'in-place'
export type OrderStatus = 'pending' | 'cancelled' | 'processed' | 'shipped' | 'completed'
export interface DeliveryDetails {
	address: string
	requiredDate?: string // 'dd.mm.yyyy'
	requiredTime?: string // 'hh:mm'
	note?: string // додаткові побажання
}

export interface InPlaceDetails {
	placeName: string // наприклад, назва кафе
	address?: string // опціонально
	note?: string // додаткові побажання
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
	details: DeliveryDetails | InPlaceDetails
}
