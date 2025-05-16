'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizedPhone } from '@/method/fn'
import { LocationData } from '@/types/location-type'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { ButtonLink } from '@/components/ui/button-link'
import EditCafeForm from '../forms/edit-cafe-form'
import { useAdminStore } from '@/store/admin-store'

type CafesProps = {
	data: LocationData[]
	changeStatusCafe: (item: LocationData) => void
}

const CafesTable = ({ data, changeStatusCafe }: CafesProps) => {
	const [selectedCafe, setSelectedCafe] = useState<LocationData | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const { editCafe } = useAdminStore()

	const handleOpenModal = (item: LocationData) => {
		setSelectedCafe(item)
		setIsOpen(true)
	}

	const handleCloseModal = () => {
		setSelectedCafe(null)
		setIsOpen(false)
	}

	const handleEditCafe = (item: LocationData) => {
		editCafe(item)
		setIsEditing(false)
	}

	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300 hover:bg-gray-100">
							<th className="p-2">№</th>
							<th className="p-2">Cafe</th>
							<th className="p-2">Address</th>
							<th className="p-2">Total orders</th>
							<th className="p-2">Total client</th>
							<th className="p-2">Phone</th>
							<th className="p-2">Active</th>
							<th className="p-2"></th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, ind) => (
							<tr
								key={d.id}
								className={`text-center border-b border-gray-300 ${!d.isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
							>
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4 text-lg font-medium text-left">{d.name}</td>
								<td className="p-4">{d.address}</td>
								<td className="p-4">{d.totalOrders}</td>
								<td className="p-4">{d.totalClients}</td>
								<td className="p-4">
									<Link href={`tel:${normalizedPhone(d.phone)}`} className="text-blue-500 hover:underline">
										{d.phone}
									</Link>
								</td>
								<td className="p-4">
									<input
										type="checkbox"
										checked={d.isActive}
										onChange={() => changeStatusCafe(d)}
										disabled={!d.isActive}
									/>
								</td>
								<td>
									<Button
										text="See more"
										onClick={() => handleOpenModal(d)}
										className="border border-gray-50 rounded-sm px-2 py-1 hover:border-gray-300 hover:bg-gray-200 "
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{selectedCafe && isOpen && (
				<Modal isOpen={isOpen} onClose={handleCloseModal} className={'justify-end items-center'} variant="editing">
					<div className="fixed top-0 right-0 w-[600px] h-full bg-white border-l border-l-gray-300 shadow-2xl z-10 overflow-y-auto">
						<div className="flex justify-between items-center h-20 p-4 mb-4 bg-gray-200 border-b border-b-gray-400">
							<h3 className="text-lg font-semibold">Cafes Details</h3>
							<Button
								text="✕"
								onClick={handleCloseModal}
								className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
							/>
						</div>
						<div className="flex flex-col gap-6 p-4">
							<div className="flex items-center gap-6">
								<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded overflow-hidden">
									<Image
										src={selectedCafe.img ? selectedCafe.img : '/assets/cupcake-3-min.png'}
										alt={'cafe'}
										width={100}
										height={100}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<span className="font-medium">{selectedCafe.name}</span>
									<span className="text-secondary">Rating: {selectedCafe.averageRating}</span>
								</div>
							</div>

							<ul className="grid grid-cols-2 gap-y-2">
								<li className="font-medium">ID:</li>
								<li>{selectedCafe.id}</li>
								<li className="font-medium">Address:</li>
								<li>{selectedCafe.address}</li>
								<li className="font-medium">Manager name:</li>
								<li>{selectedCafe.managerName}</li>
								<li className="font-medium">Email:</li>
								<li>
									<Link href={`mailto:${selectedCafe.managerEmail}`} className="text-blue-500 hover:underline">
										{selectedCafe.managerEmail}
									</Link>
								</li>
								<li className="font-medium">Notes:</li>
								<li>{selectedCafe.notes}</li>
							</ul>
							<div className="flex flex-col gap-4">
								<Button
									text="Edit Profile Cafe"
									className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
									onClick={() => setIsEditing(true)}
								/>
								<ButtonLink
									text="View Profile Cafe"
									className="w-full border border-green-500 bg-green-500 hover:bg-green-700 text-gray-200 font-semibold rounded-lg p-3"
									href={`/admin/cafes/${selectedCafe.id}`}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
			{isEditing && selectedCafe && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className={'justify-center items-center'}>
					<EditCafeForm item={selectedCafe} onSave={handleEditCafe} setIsEditing={setIsEditing} />
				</Modal>
			)}
		</>
	)
}

export default CafesTable
