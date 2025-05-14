export interface LocationData {
	id: string
	name: string
	address: string
	lat: number
	lng: number
	img: string
	phone: string
	createdAt: string
	updatedAt?: string
	totalOrders: number
	totalClients: number
	averageRating?: number
	isActive: boolean
	openingHours?: string
	managerName?: string
	managerEmail?: string
	notes?: string
}
