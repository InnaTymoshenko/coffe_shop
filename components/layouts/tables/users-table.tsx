/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { UserProfile } from '@/types/users-type'
import { normalizedPhone } from '@/method/fn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { ButtonLink } from '@/components/ui/button-link'

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
							<th className="p-2">Email</th>
							<th className="p-2">Date created at</th>
							<th className="p-2">Last login at</th>
							<th className="p-2">Status</th>
							<th className="p-2">Order count</th>
							<th className="p-2">Total spent</th>
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
								<td className="p-4">
									<Link href={`mailto:${d.email}`} className="text-blue-500 hover:underline">
										{d.email}
									</Link>
								</td>
								<td className="p-4">{d.createdAt}</td>
								<td className="p-4">{d.lastLoginAt}</td>
								<td className="p-4">
									<Badge variant={d.status === 'active' ? 'success' : d.status === 'banned' ? 'danger' : 'outline'}>
										{d.status}
									</Badge>
								</td>
								<td className="p-4">{d.orderCount}</td>
								<td className="p-4">{d.totalSpent}</td>
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
							<h3 className="text-lg font-semibold">Users Details</h3>
							<Button
								text="✕"
								onClick={handleCloseModal}
								className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
							/>
						</div>
						<div className="flex flex-col gap-6 p-4">
							<div className="flex items-center gap-6">
								<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded overflow-hidden">
									<img
										src={selectedUser.avatarUrl ? selectedUser.avatarUrl : '/assets/person-min.png'}
										alt={selectedUser.firstName}
										width={100}
										height={100}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<strong className="font-bold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</strong>
									<p className="text-secondary">
										{`user from `}
										<strong className="font-medium">{` ${selectedUser.createdAt}`}</strong>
									</p>
								</div>
							</div>

							<ul className="grid grid-cols-2 gap-y-2">
								<li className="font-medium">ID:</li>
								<li>{selectedUser.id}</li>
								<li className="font-medium">Birthday:</li>
								<li>{selectedUser.birthday}</li>
								<li className="font-medium">Email:</li>
								<li>
									<Link href={`mailto:${selectedUser.email}`} className="text-blue-500 hover:underline">
										{selectedUser.email}
									</Link>
								</li>
								<li className="font-medium">Phone:</li>
								<li>
									<Link href={`tel:${normalizedPhone(selectedUser.phone)}`} className="text-blue-500 hover:underline">
										{selectedUser.phone}
									</Link>
								</li>
								<li className="font-medium">Address delivery:</li>
								<li>{selectedUser.address}</li>
								<li className="font-medium">Status:</li>
								<li>
									<Badge
										variant={
											selectedUser.status === 'active'
												? 'success'
												: selectedUser.status === 'banned'
												? 'danger'
												: 'outline'
										}
									>
										{selectedUser.status}
									</Badge>
								</li>
								<li className="font-medium">Favorite cafe:</li>
								<li>
									<Link
										href={`/admin/cafes/${selectedUser.favoriteCafeId}`}
										target="_blank"
										className="text-blue-500 hover:underline"
									>
										{selectedUser.favoriteCafeId === 'khreschatyk'
											? 'Coffee Town - Хрещатик'
											: selectedUser.favoriteCafeId === 'podil'
											? 'Coffee Town - Поділ'
											: selectedUser.favoriteCafeId === 'obolon'
											? 'Coffee Town - Оболонь'
											: null}
									</Link>
								</li>
								<li className="font-medium">Notes:</li>
								<li>{selectedUser.notes}</li>
							</ul>
							<div className="flex flex-col gap-4">
								<Button
									text="Edit status"
									className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
									onClick={() => {}}
								/>
								<ButtonLink
									text="View User Profile"
									className="w-full border border-orange-400 bg-orange-400 hover:bg-orange-600 text-gray-200 font-semibold rounded-lg p-3"
									href={`/admin/users/${selectedUser.id}`}
								/>
								<Button
									text="View Order History"
									className="w-full rounded-lg p-3 bg-green-600 text-gray-200 font-semibold border border-green-500 hover:bg-green-700"
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
