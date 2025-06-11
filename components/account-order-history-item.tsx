/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { OrderData } from '@/types/order-type'
import { ProductData } from '@/types/item-type'
import { formatDateTime } from '@/utils/fn'

type OrderHistoryProps = {
	order: OrderData
}

const AccountOrderHistoryItem = ({ order }: OrderHistoryProps) => {
	const [isRead, setIsRead] = useState(false)

	// console.log(order)

	return (
		<div className="w-full bg-gray-900 border border-gray-800 p-4 rounded-lg shadow mb-4 text-sm text-gray-500">
			<div className="flex justify-between items-center mb-2">
				<h2
					className={`font-bold text-lg hover:underline cursor-pointer ${
						order.status === 'cancelled' && 'line-through'
					}`}
					onClick={() => setIsRead(!isRead)}
				>{`Order: #${order.id}`}</h2>
				<span>{`Created: ${formatDateTime(order.createdDateAt, order.createdTimeAt)}`}</span>
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
					<span>Total amount:</span>
					<span className="text-orange-500 px-1">$</span>
					<strong className="text-orange-500">{`${order.totalAmount.toFixed(2)}`}</strong>
				</p>
			</div>
			{isRead && (
				<div className="w-full flex flex-col gap-2 items-start">
					<div className="w-full space-y-3 mt-4">
						{order.items.map((item: ProductData) => (
							<div
								key={item.id}
								className="w-full lg:flex sm:grid sm:grid-rows-2 justify-between items-center gap-4 text-gray-200 border border-gray-800 rounded p-3 bg-gray-800/50"
							>
								<div className="lg:w-1/2 sm:w-full min-h-12 flex justify-start items-center gap-4">
									<div className="bg-gray-100 border border-gray-700 lg:w-16 sm:w-28 lg:h-16 sm:h-28 rounded overflow-hidden">
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
								<div className="lg:w-1/2 sm:w-full flex lg:flex-row sm:flex-col gap-2 lg:items-center sm:items-end">
									<div className="lg:w-2/3 sm:w-full flex flex-col gap-1">
										{item.price.map((p, i) => (
											<div key={i} className=" grid lg:grid-cols-2 sm:grid-cols-4 items-center gap-4">
												{item.category === 'Coffee' && (
													<div className="grid grid-cols-3 lg:col-span-1 sm:col-span-3 item-center bg-gray-900/60 border border-gray-900/60 rounded-sm">
														<span className="col-span-1 text-md font-semibold border-r border-r-gray-800 px-3 py-1">{`${
															p.size === 'small' ? 'S' : p.size === 'medium' ? 'M' : 'L'
														}`}</span>
														<span className="col-span-2 items-center px-3 py-1">
															<span className="text-orange-500 pr-1">$</span>
															{p.price.toFixed(2)}
														</span>
													</div>
												)}
												<span>
													<span className="text-orange-500 pr-1">X</span>
													{p.quantity}
												</span>
											</div>
										))}
									</div>

									<p className="mt-2 text-sm font-semibold">
										{`Total: ${item.totalPrice.toFixed(2)}`}
										<span className="text-orange-500 pl-1">$</span>
									</p>
								</div>
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
