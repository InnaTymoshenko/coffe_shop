/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { OrderData } from '@/types/order-type'

type OrderHistoryProps = {
	order: OrderData
}

const OrderHistoryItem = ({ order }: OrderHistoryProps) => {
	const [isRead, setIsRead] = useState(false)

	return (
		<div className="w-full border border-gray-400 p-4 rounded-md shadow mb-4">
			<div className="flex justify-between items-center mb-2">
				<h2
					className="font-bold text-lg  text-blue-500 hover:underline cursor-pointer"
					onClick={() => setIsRead(!isRead)}
				>{`Order: #${order.id}`}</h2>
				<span className="text-sm text-gray-600">{`Created: ${order.createdDateAt} at ${order.createdTimeAt}`}</span>
			</div>
			<div className="mb-2 text-sm text-gray-800 flex justify-between items-center">
				<p>
					<strong>Status: </strong>
					<span className="capitalize">{order.status}</span>
				</p>
				<p>
					<span>Total price:</span>
					<strong>{` ${order.totalAmount.toFixed(2)}$`}</strong>
				</p>
			</div>
			{isRead && (
				<div className="space-y-3 mt-4">
					{order.items.map(item => (
						<div
							key={item.id}
							className="flex justify-between items-center gap-2 border border-gray-400 rounded p-3 bg-gray-50"
						>
							<div className="w-1/2 h-12 flex justify-start items-center gap-4">
								<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded overflow-hidden">
									<img
										src={
											item.src.medium
												? item.src.medium
												: item.category === 'Coffee'
												? '/assets/coffee-min.png'
												: '/assets/cupcake-3-min.png'
										}
										alt={item.title}
										className="h-full w-auto"
									/>
								</div>
								<div className="font-semibold text-md">{item.title}</div>
							</div>
							<div className="mt-2">
								{item.price.map((p, i) => (
									<div key={i} className="flex justify-between items-center gap-4">
										<span className="text-sm capitalize">{p.size}</span>
										<span>{p.quantity}</span>
									</div>
								))}
							</div>
							<p className="mt-2 text-sm font-semibold">{`Total: ${item.totalPrice.toFixed(2)}$`}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default OrderHistoryItem
