'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { useAdminStore } from '@/store/admin-store'
import { PromotionData } from '@/types/promotion-type'
import { Modal } from '@/components/ui/modal'
import { Badge } from '@/components/ui/badge'
import { EditPromotionForm } from '@/components/edit-promotion-form'

type TableProps = {
	data: PromotionData[]
}

const PromotionTable = ({ data }: TableProps) => {
	const [selectedPromotion, setSelectedPromotion] = useState<PromotionData | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const { deletePromotions, editPromotions } = useAdminStore()

	useEffect(() => {
		const handelKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setSelectedPromotion(null)
				setIsEditing(false)
			}
		}
		document.addEventListener('keydown', handelKeyDown)
		return () => {
			document.removeEventListener('keydown', handelKeyDown)
		}
	}, [])

	useEffect(() => {
		if (selectedPromotion) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [selectedPromotion])

	const handleDeletePromotion = (id: string) => {
		deletePromotions(id)
		setSelectedPromotion(null)
	}

	const handleSavePromotion = (updated: PromotionData) => {
		editPromotions(updated)
		setIsEditing(false)
		setSelectedPromotion(null)
	}

	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead className="hover:bg-gray-50">
						<tr className="border-b border-gray-300">
							<th className="p-2">№</th>
							<th className="p-2">Title</th>
							<th className="p-2">Start/End</th>
							<th className="p-2">Status</th>
							<th className="p-2">Type</th>
							<th className="p-2"></th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, ind) => (
							<tr key={d.id} className="text-center border-b border-gray-300 hover:bg-gray-50">
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4 text-xl font-semibold text-left">{d.title}</td>
								<td className="p-4">
									<div className="flex flex-col gap-1">
										{d.start !== '' ? <span>{d.start}</span> : <span>{`current`}</span>}
										<span>{d.end}</span>
									</div>
								</td>
								<td className="p-4">
									<Badge variant={d.status === 'active' ? 'success' : d.status === 'finished' ? 'outline' : 'warning'}>
										{d.status}
									</Badge>
								</td>
								<td className="p-4">{d.type}</td>
								<td className="p-4">
									<Button
										text="See more"
										onClick={() => setSelectedPromotion(d)}
										className="border border-gray-50 rounded-sm px-2 py-1 hover:border-gray-300 hover:bg-gray-200 "
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{selectedPromotion && (
				<div className="fixed top-0 right-0 w-[600px] h-full bg-white border-l border-l-gray-300 shadow-2xl z-10 overflow-y-auto">
					<div className="flex justify-between items-center h-20 p-4 mb-4 bg-gray-200 border-b border-b-gray-400">
						<h3 className="text-lg font-semibold">Promotion Details</h3>
						<Button
							text="✕"
							onClick={() => setSelectedPromotion(null)}
							className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
						/>
					</div>
					<div className="flex flex-col gap-6 p-4">
						<div className="flex items-center gap-6">
							<h2 className="text-xl font-medium">{selectedPromotion.title}</h2>
						</div>
						<ul className="grid grid-cols-2 gap-y-2">
							<li className="font-medium">ID:</li>
							<li>{selectedPromotion.id}</li>
							<li className="font-medium">Status:</li>
							<li>
								<Badge
									variant={
										selectedPromotion.status === 'active'
											? 'success'
											: selectedPromotion.status === 'finished'
											? 'outline'
											: 'warning'
									}
								>
									{selectedPromotion.status}
								</Badge>
							</li>
							<li className="font-medium">Description:</li>
							<li>{selectedPromotion.description}</li>
							<li className="font-medium">Start:</li>
							{selectedPromotion.start !== '' ? <li>{selectedPromotion.start}</li> : <li>{`current`}</li>}

							<li className="font-medium">End:</li>
							<li>{selectedPromotion.end}</li>
							<li className="font-medium">Type:</li>
							<li>{selectedPromotion.type}</li>
						</ul>
						<div className="flex flex-col gap-4">
							<Button
								text="Edit Promotion"
								className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
								onClick={() => setIsEditing(true)}
							/>
							<Button
								text="Delete Promotion"
								className="w-full border border-red-400 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded-lg p-3"
								onClick={() => handleDeletePromotion(selectedPromotion.id)}
							/>
						</div>
					</div>
				</div>
			)}
			{isEditing && selectedPromotion && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
					<EditPromotionForm promotion={selectedPromotion} onSave={handleSavePromotion} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</>
	)
}

export default PromotionTable
