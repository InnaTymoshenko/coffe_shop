'use client'

import React, { useState } from 'react'
import { AddPromotionForm } from '@/components/layouts/forms/add-promotion-form'
import PromotionTable from '@/components/layouts/tables/promotion-table'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import Shell from '@/components/ui/shell'
import { useAdminStore } from '@/store/admin-store'
import { PromotionData, PromotionStatus } from '@/types/promotion-type'
import Select, { Option } from '@/components/ui/select'

// type Props = {}

const promotionStatus: Option<'' | PromotionStatus>[] = [
	{ value: '', label: 'All promotions' },
	{ value: 'active', label: 'Active' },
	{ value: 'finished', label: 'Finished' },
	{ value: 'moderation', label: 'Moderation' }
]

const PromotionsPage = () => {
	const [isAddPromotion, setIsAddPromotion] = useState(false)
	const [promotion, setPromotion] = useState<PromotionStatus | ''>('')
	const { promotionsData, addPromotions } = useAdminStore()
	const filteredPromotions = promotion ? promotionsData.filter(p => p.status === promotion) : promotionsData

	const handleAddPromotion = (item: PromotionData) => {
		addPromotions(item)
		setIsAddPromotion(false)
	}

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Promotions</h1>
					<Button
						text="Add promotion"
						className="flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 hover:bg-gray-100"
						onClick={() => setIsAddPromotion(true)}
					/>
				</div>
				<div className="w-1/4 flex justify-start items-end gap-4">
					<Select<PromotionStatus | ''>
						options={promotionStatus}
						value={promotion}
						onChange={setPromotion}
						className="w-full outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
					/>
				</div>
				{filteredPromotions.length === 0 ? <p>No promotions found.</p> : <PromotionTable data={filteredPromotions} />}

				{isAddPromotion && (
					<Modal
						isOpen={isAddPromotion}
						onClose={() => setIsAddPromotion(false)}
						className={'justify-center items-center'}
					>
						<AddPromotionForm onAdd={handleAddPromotion} setIsAddPromotion={setIsAddPromotion} />
					</Modal>
				)}
			</Shell>
		</>
	)
}

export default PromotionsPage
