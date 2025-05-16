'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { OrderData } from '@/types/order-type'
import { UserProfile } from '@/types/users-type'
import fakeUsersData from '@/fakedata/users.json'
import { ButtonLink } from '@/components/ui/button-link'
import Link from 'next/link'

type OrdersProps = {
	data: OrderData[]
}

const OrdersTable = ({ data }: OrdersProps) => {
	const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
	const [user, setUser] = useState<UserProfile | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [users, setUsers] = useState<UserProfile[]>([])

	useEffect(() => {
		const users = fakeUsersData as UserProfile[]
		setUsers(users)
	}, [])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const clientIdentity = (id: string) => {
		if (!selectedOrder || !users.length) return

		const user = users.find(u => u.id === id)
		return setUser(user || null)
	}

	useEffect(() => {
		if (selectedOrder && users.length && selectedOrder.clientId) {
			clientIdentity(selectedOrder.clientId)
		}
	}, [clientIdentity, selectedOrder, users.length])

	const handleOpenModal = (item: OrderData) => {
		setSelectedOrder(item)
		setIsOpen(true)
	}

	const handleCloseModal = () => {
		setSelectedOrder(null)
		setIsOpen(false)
	}

	// console.log(user)

	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300 hover:bg-gray-100">
							<th className="p-2">№</th>
							<th className="p-2">Line</th>
							<th className="p-2">ID orders</th>
							<th className="p-2">Data/Time</th>
							<th className="p-2">Details</th>
							<th className="p-2">Cafe</th>
							<th className="p-2">Status</th>
							<th className="p-2">Ready</th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, ind) => (
							<tr key={d.id} className={`text-center border-b border-gray-300 hover:bg-gray-100`}>
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4">{d.numberInLine}</td>
								<td className="p-4 text-lg font-medium text-left">{d.id}</td>
								<td className="p-4 flex flex-col justify-center items-center gap-1">
									<span>{d.createdDateAt}/</span>
									<span>{d.createdTimeAt}</span>
								</td>
								<td className="p-4">{d.type}</td>
								<td className="p-4">{d.type === 'in-place' && 'placeName' in d.details ? d.details.placeName : ''}</td>
								<td className="p-4">
									<Badge
										variant={
											d.status === 'completed'
												? 'success'
												: d.status === 'pending'
												? 'warning'
												: d.status === 'processed'
												? 'primary'
												: d.status === 'cancelled'
												? 'danger'
												: 'default'
										}
									>
										{d.status}
									</Badge>
								</td>
								<td className="p-4">
									<input type="checkbox" />
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
			{selectedOrder && isOpen && (
				<Modal onClose={handleCloseModal} isOpen={isOpen} className={'justify-end items-center'} variant="editing">
					<div className="fixed top-0 right-0 w-[600px] h-full bg-white border-l border-l-gray-300 shadow-2xl z-10 overflow-y-auto">
						<div className="flex justify-between items-center h-20 p-4 mb-4 bg-gray-200 border-b border-b-gray-400">
							<h3 className="text-lg font-semibold">Order Details</h3>
							<Button
								text="✕"
								onClick={handleCloseModal}
								className="py-1 px-2 border border-gray-400 rounded-full text-gray-600 text-xl hover:bg-gray-300 "
							/>
						</div>
						<div className="flex flex-col gap-6 p-4">
							<div className="flex items-center gap-6">
								<div className="flex flex-col gap-1">
									<span className="font-medium">{`Order #${selectedOrder.numberInLine}`}</span>
									<span className="text-secondary">{selectedOrder.createdDateAt}</span>
									<span className="text-secondary">{selectedOrder.createdTimeAt}</span>
								</div>
							</div>
							<ul className="grid grid-cols-2 gap-y-2">
								<li className="font-medium">ID:</li>
								<li className="font-medium">{selectedOrder.id}</li>
								<li className="font-medium">Type:</li>
								<li className="font-medium">{selectedOrder.type}</li>
								<li className="font-medium">Client:</li>
								<li className={`font-medium `}>
									{selectedOrder.clientId && user ? (
										<Link
											href={`/admin/users/${selectedOrder.clientId}`}
											className="text-blue-600 hover:underline cursor-pointer"
										>
											{`${user?.firstName} ${user?.lastName}`}
										</Link>
									) : (
										<span>{`-`}</span>
									)}
								</li>
								<li className="font-medium">Products:</li>
								<li className="font-medium">
									{selectedOrder.items.map(item => (
										<div key={item.id} className="grid grid-cols-2 gap-y-2">
											<span className="font-thin">{item.title}</span>
											<div className="font-thin">
												{item.price.map(p => (
													<div key={p.size} className="flex items-center gap-2">
														<span className="font-thin">{p.size}</span>
														<span className="font-thin">{p.quantity}</span>
													</div>
												))}
											</div>
										</div>
									))}
								</li>
								{selectedOrder.type === 'delivery' && (
									<>
										<li className="font-medium">Address delivery:</li>
										<li className="font-medium">{selectedOrder.details.address}</li>
										<li className="font-medium">Notes:</li>
										<li className="font-medium">{selectedOrder.details.note}</li>
									</>
								)}
							</ul>
							<ul></ul>
							<div className="flex flex-col gap-4">
								<Button
									text="Edit Order Status"
									className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
									onClick={() => {}}
								/>
								<ButtonLink
									disabled={!selectedOrder.clientId}
									href={`/admin/users/${selectedOrder?.clientId}/orders-history`}
									text="View Order History"
									className={`w-full rounded-lg p-3 bg-green-600 text-gray-200 font-semibold border border-green-500 hover:bg-green-700`}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

export default OrdersTable
