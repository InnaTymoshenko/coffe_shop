'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { UserProfile } from '@/types/users-type'
import { normalizedPhone } from '@/method/fn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'

type UsersAdminProps = {
	data: UserProfile[]
}

const UsersTable = ({ data }: UsersAdminProps) => {
	const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenModal = (item: UserProfile) => {
		setSelectedUser(item)
		setIsOpen(true)
	}

	const handleCloseModal = () => {
		setSelectedUser(null)
		setIsOpen(false)
	}

	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300 hover:bg-gray-100">
							<th className="p-2">ID</th>
							<th className="p-2">Name</th>
							<th className="p-2">Gender</th>
							<th className="p-2">Phone</th>
							<th className="p-2">Status</th>
							<th className="p-2"></th>
						</tr>
					</thead>
					<tbody>
						{data.map(d => (
							<tr key={d.id} className={`text-center border-b border-gray-300 hover:bg-gray-100`}>
								<td className="p-4">{d.id}</td>
								<td className="p-4 text-lg font-medium text-left flex flex-col gap-1">
									<span>{d.firstName}</span>
									<span>{d.lastName}</span>
								</td>
								<td className="p-4">{d.gender}</td>
								<td className="p-4">
									<Link href={`tel:${normalizedPhone(d.phone)}`} className="text-blue-500 hover:underline">
										{d.phone}
									</Link>
								</td>
								<td className="p-4">
									<Badge variant={d.status === 'active' ? 'success' : d.status === 'banned' ? 'danger' : 'outline'}>
										{d.status}
									</Badge>
								</td>
								<td className="p-4">
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
			{selectedUser && isOpen && (
				<Modal onClose={handleCloseModal} isOpen={isOpen} className={'justify-end items-center'} variant="editing">
					<div className="fixed top-0 right-0 w-[600px] h-full bg-white border-l border-l-gray-300 shadow-2xl z-10 overflow-y-auto">
						<div className="flex justify-between items-center h-20 p-4 mb-4 bg-gray-200 border-b border-b-gray-400">
							<h3 className="text-lg font-semibold">Product Details</h3>
							<Button
								text="✕"
								onClick={handleCloseModal}
								className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
							/>
						</div>
						<div className="flex flex-col gap-6 p-4">
							<div className="flex items-center gap-6">
								<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded overflow-hidden"></div>
								<div className="flex flex-col gap-1">
									<span className="font-medium"></span>
									<span className="text-secondary"></span>
								</div>
							</div>

							<ul className="grid grid-cols-2 gap-y-2"></ul>
							<ul></ul>
							<div className="flex flex-col gap-4">
								<Button
									text="View Order History"
									className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
									onClick={() => {}}
								/>
								<Button
									text="Blocked user"
									className="w-full border border-red-400 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded-lg p-3"
									onClick={() => {}}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
			{isEditing && selectedUser && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className={'justify-center items-center'}>
					<div></div>
					{/* <EditProductForm product={selectedProduct} onSave={handleSave} setIsEditing={setIsEditing} /> */}
				</Modal>
			)}
		</>
	)
}

export default UsersTable
