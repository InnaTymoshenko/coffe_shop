'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { OrderData, OrderStatus } from '@/types/order-type'
import { UserProfile } from '@/types/users-type'
import Link from 'next/link'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import { useAdminStore } from '@/store/admin-store'
import OrderItemTable from './order-item-table'

type OrdersProps = {
	data: OrderData[]
	changeStatusOrder: (item: OrderData) => void
}

const statusOptions = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'cancelled', label: 'Cancelled' },
	{ value: 'processed', label: 'Processed' },
	{ value: 'shipped', label: 'Shipped' },
	{ value: 'completed', label: 'Completed' }
]

const OrdersTable = ({ data, changeStatusOrder }: OrdersProps) => {
	const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
	const [user, setUser] = useState<UserProfile | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	// const [users, setUsers] = useState<UserProfile[]>([])
	const [isOpenForm, setIsOpenForm] = useState(false)
	const { ordersData, editOrder, usersData } = useAdminStore()

	const order = useAdminStore(state =>
		selectedOrder ? state.ordersData.find(o => o.id === selectedOrder.id) ?? null : null
	)

	const clientIdentity = useCallback(
		(id: string) => {
			if (!selectedOrder || !usersData.length) return
			const user = usersData.find(u => u.id === id)
			return setUser(user || null)
		},
		[selectedOrder, usersData]
	)

	useEffect(() => {
		if (selectedOrder && usersData.length && selectedOrder.clientId) {
			clientIdentity(selectedOrder.clientId)
		}
	}, [clientIdentity, selectedOrder, usersData.length])

	const handleOpenModal = (item: OrderData) => {
		setSelectedOrder(item)
		setIsOpen(true)
	}

	const handleCloseModal = () => {
		setSelectedOrder(null)
		setIsOpen(false)
	}

	const handleEditStatusOrder = (val: string) => {
		if (!selectedOrder) return
		const order = ordersData.find(order => order.id === selectedOrder.id)
		if (order) editOrder({ ...order, status: val as OrderStatus })
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
							<tr
								key={d.id}
								className={`text-center border-b border-gray-300  ${
									d.status === 'cancelled' || d.status === 'completed' ? 'bg-gray-200' : 'hover:bg-gray-100'
								}`}
							>
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
									<input
										type="checkbox"
										onChange={() => changeStatusOrder(d)}
										disabled={d.status === 'cancelled' || d.status === 'completed'}
										checked={d.status === 'cancelled' || d.status === 'completed'}
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
			{order && isOpen && (
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
									<span className="font-medium">{`Order #${order.numberInLine}`}</span>
									<span className="text-secondary">{order.createdDateAt}</span>
									<span className="text-secondary">{order.createdTimeAt}</span>
								</div>
							</div>
							<ul className="grid grid-cols-2 gap-y-2">
								<li className="font-medium">ID:</li>
								<li className="font-medium">{order.id}</li>
								<li className="font-medium">Type:</li>
								<li className="font-medium">{order.type}</li>
								<li className="font-medium">Client:</li>
								<li className={`font-medium `}>
									{order.clientId && user ? (
										<Link
											href={`/admin/users/${order.clientId}`}
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
									{order.items.map(item => (
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
								{order.type === 'delivery' && (
									<>
										<li className="font-medium">Address delivery:</li>
										<li className="font-medium">{order.details.address}</li>
										<li className="font-medium">Notes:</li>
										<li className="font-medium">{order.details.note}</li>
									</>
								)}
							</ul>
							<div className="flex flex-col gap-4">
								<Button
									text="Edit Order Status"
									className="w-full rounded-lg p-3 bg-gray-100 border border-gray-400 hover:bg-gray-300"
									onClick={() => setIsEditing(true)}
								/>
								<Button
									text="View Order"
									className={`w-full rounded-lg p-3 bg-green-600 text-gray-200 font-semibold border border-green-500 hover:bg-green-700`}
									onClick={() => setIsOpenForm(true)}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
			{isOpenForm && order && (
				<Modal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} className="justify-center items-center">
					<OrderItemTable
						selectedOrder={order}
						handleEditStatusOrder={handleEditStatusOrder}
						setIsEditing={setIsEditing}
						setIsOpenForm={setIsOpenForm}
					/>
				</Modal>
			)}
			{isEditing && order && (
				<Modal isOpen={isEditing} onClose={() => setIsEditing(false)} className="justify-center items-center">
					<Shell>
						<div className="w-full flex justify-between items-center">
							<h2 className="text-2xl font-semibold">Edit Order Status</h2>
						</div>
						<div className="space-y-4 p-4 max-w-xl mx-auto">
							<Select<string>
								label="Order Status"
								options={statusOptions}
								value={order?.status ?? ''}
								onChange={val => {
									handleEditStatusOrder(val)
									setIsEditing(false)
								}}
							/>
						</div>
					</Shell>
				</Modal>
			)}
		</>
	)
}

export default OrdersTable
