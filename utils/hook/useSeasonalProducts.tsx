// hooks/useSeasonalProducts.ts

import { ProductData } from '@/types/item-type'
import { useMemo } from 'react'
import { getSeason } from '../fn'

export const useSeasonalProducts = (data: ProductData[]) => {
	const currentSeason = getSeason()

	const updatedData = useMemo(() => {
		return data.map(item => {
			if (item.promotion?.type === 'seasonal' && item.promotion.season === currentSeason) {
				return {
					...item,
					promotion: {
						...item.promotion,
						isActive: true
					}
				}
			}
			return item
		})
	}, [data, currentSeason])

	const seasonalOnly = useMemo(() => {
		return updatedData.filter(item => item.promotion?.type === 'seasonal' && item.promotion.isActive === true)
	}, [updatedData])

	const allWithPromo = useMemo(() => {
		return updatedData.filter(item => {
			const promo = item.promotion
			if (!promo) return true // без акцій
			return promo.isActive // показуємо все активне — seasonal, special, etc.
		})
	}, [updatedData])

	const getByType = (type: string) => {
		return updatedData.filter(item => item.promotion?.type === type && item.promotion.isActive)
	}

	return {
		currentSeason,
		updatedData,
		seasonalOnly,
		allWithPromo,
		getByType
	}
}
