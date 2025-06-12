export type DiscountReason = 'favorite' | 'birthday' | 'loyalty'

export type PersonalDiscount = {
	productId: string
	reason: DiscountReason
	discount: number
}
