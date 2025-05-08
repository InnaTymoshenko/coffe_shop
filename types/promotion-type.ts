export type PromotionStatus = 'active' | 'finished' | 'moderation'

export interface PromotionData {
	id: string
	title: string
	description: string
	start: string
	end: string
	isActive: boolean
	status: PromotionStatus
	type: string
}
