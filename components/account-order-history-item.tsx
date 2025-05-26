/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { OrderData } from '@/types/order-type'
import { ProductData } from '@/types/item-type'

type OrderHistoryProps = {
	order: OrderData
}

const AccountOrderHistoryItem = ({ order }: OrderHistoryProps) => {
	const [isRead, setIsRead] = useState(false)

	console.log(order)

	return (
		<div className="w-full bg-gray-900 border border-gray-800 p-4 rounded-lg shadow mb-4 text-sm text-gray-500">
			<div className="flex justify-between items-center mb-2">
				<h2
					className={`font-bold text-lg hover:underline cursor-pointer ${
						order.status === 'cancelled' && 'line-through'
					}`}
					onClick={() => setIsRead(!isRead)}
				>{`Order: #${order.id}`}</h2>
				<span>{`Created: ${order.createdDateAt} at ${order.createdTimeAt}`}</span>
			</div>
			<div className="mb-2  flex justify-between items-center">
				<p>
					<strong>Status: </strong>
					<span
						className={`capitalize ${
							order.status === 'completed'
								? 'text-green-600'
								: order.status === 'cancelled'
								? 'text-red-600'
								: 'text-gray-500'
						}`}
					>
						{order.status}
					</span>
				</p>
				<p className="text-gray-400">
					<span>Total price:</span>
					<strong>{` ${order.totalAmount.toFixed(2)}$`}</strong>
				</p>
			</div>
			{isRead && (
				<div className="w-full flex flex-col gap-2 items-start">
					<div className="w-full space-y-3 mt-4">
						{order.items.map((item: ProductData) => (
							<div
								key={item.id}
								className="flex justify-between items-center gap-2 text-gray-200 border border-gray-400 rounded p-3 bg-gray-800"
							>
								<div className="w-1/2 h-12 flex justify-start items-center gap-4">
									<div className="bg-gray-100 border border-gray-300 w-16 h-16 rounded overflow-hidden">
										<img
											src={
												item.src.medium
													? item.src.medium
													: item.category === 'Coffee'
													? '/assets/coffee-2.png'
													: '/assets/cake-1.png'
											}
											alt={item.title}
											className="h-full w-full object-cover object-center"
										/>
									</div>
									<div className="font-semibold text-lg">{item.title}</div>
								</div>
								<div className="mt-2">
									{item.price.map((p, i) => (
										<div key={i} className="grid grid-cols-2 items-center gap-4">
											{item.category === 'Coffee' && (
												<span className="w-8 col-span-1 text-center text-md font-semibold py-1 border border-gray-900 rounded-sm">{`${
													p.size === 'small' ? 'S' : p.size === 'medium' ? 'M' : 'L'
												}`}</span>
											)}

											<span>{p.quantity}</span>
										</div>
									))}
								</div>
								<p className="mt-2 text-sm font-semibold">{`Total: ${item.totalPrice.toFixed(2)}$`}</p>
							</div>
						))}
					</div>
					<div className="space-y-3 mt-2">
						<ul className="grid grid-cols-2 gap-2 ">
							<li>
								<strong>Order Place:</strong>
							</li>
							<li>{order.type}</li>
							{order.type === 'in-place' && (
								<>
									<li>
										<strong>Cafe:</strong>
									</li>
									<li>{order.details.placeName}</li>
								</>
							)}
							<li>
								<strong>Address delivery:</strong>
							</li>
							<li>{order.details.address}</li>
							{order.type === 'delivery' && (
								<>
									<li>
										<strong>Delivered:</strong>
									</li>
									<li>{`${order.details.requiredDate} at ${order.details.requiredTime}`}</li>
								</>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default AccountOrderHistoryItem
