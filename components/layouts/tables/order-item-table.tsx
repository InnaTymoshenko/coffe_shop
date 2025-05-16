'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Select from '@/components/ui/select'
import Shell from '@/components/ui/shell'
import { OrderData } from '@/types/order-type'
import { useAdminStore } from '@/store/admin-store'
import OrderItemCompleted from '@/components/order-item-completed'

type OrderItemProps = {
	selectedOrder: OrderData
	handleEditStatusOrder: (value: string) => void
	setIsEditing: (value: boolean) => void
	setIsOpenForm: (value: boolean) => void
}

const statusOptions = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'cancelled', label: 'Cancelled' },
	{ value: 'processed', label: 'Processed' },
	{ value: 'shipped', label: 'Shipped' },
	{ value: 'completed', label: 'Completed' }
]

const OrderItemTable = ({ selectedOrder, handleEditStatusOrder, setIsEditing, setIsOpenForm }: OrderItemProps) => {
	const order = useAdminStore(state =>
		selectedOrder ? state.ordersData.find(o => o.id === selectedOrder.id) ?? null : null
	)

	return (
		<Shell className="flex flex-col gap-6">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold">{`Order #${order?.id}`}</h2>
			</div>
			<table className="min-w-full border-collapse">
				<thead>
					<tr className="border-b border-gray-300 hover:bg-gray-100">
						<th className="p-2">№</th>
						<th className="p-2">Title</th>
						<th className="p-2">Ingridients</th>
						<th className="p-2">Size</th>
						<th className="p-2">Quantity</th>
						<th className="p-2">Ready</th>
					</tr>
				</thead>
				<tbody>
					{order &&
						order.items.map((item, ind) => (
							<tr key={`${item.id}-${item.title.trim()}-${ind}`} className="border-b border-gray-300 hover:bg-gray-100">
								<th className="p-4">{`${ind + 1}`}</th>
								<th className="p-4">{item.title}</th>
								<th className="p-4">
									{item.ingridients &&
										item.ingridients.map((ing, i) => (
											<div key={`${i}-${ing}`}>
												<span>{ing}</span>
											</div>
										))}
								</th>
								{item.price.map(p => (
									<th key={`${p.size}-${p.price}`} className="p-4">
										<span className="p-4">{p.size}</span>
									</th>
								))}
								{item.price.map(p => (
									<th key={`${p.size}-${p.quantity}-${p.price}`} className="p-4">
										<span className="p-4">{p.quantity}</span>
									</th>
								))}
								<th className="p-4">
									<OrderItemCompleted order={order} />
								</th>
							</tr>
						))}
				</tbody>
			</table>
			<div className="w-full flex justify-start items-center gap-6">
				<Select
					label="Order Status"
					options={statusOptions}
					value={order?.status ?? ''}
					onChange={val => {
						handleEditStatusOrder(val)
						setIsEditing(false)
						console.log(val)
					}}
				/>
			</div>
			<div className="w-full flex justify-start items-center gap-6">
				<Button
					text="Save"
					onClick={() => setIsOpenForm(false)}
					className="w-32 bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
				/>
				<Button
					text="Close"
					className="w-32 bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
					onClick={() => setIsOpenForm(false)}
				/>
			</div>
		</Shell>
	)
}

export default OrderItemTable
