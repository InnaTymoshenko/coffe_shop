export type PromotionStatus = 'active' | 'finished' | 'moderation'
export type PromotionType = 'event-based' | 'combo' | 'time-limited' | 'discount' | 'seasonal' | '2+1'

export interface PromotionData {
	id: string
	title: string
	description: string
	start: string
	end: string
	isActive: boolean
	status: PromotionStatus
	type: PromotionType
	image?: string
}
