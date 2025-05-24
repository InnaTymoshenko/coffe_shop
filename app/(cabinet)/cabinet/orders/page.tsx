'use client'

import React, { useEffect, useState } from 'react'
import { Mosk_User } from '@/utils/moskUser'
import Shell from '@/components/ui/shell'
import { OrderData } from '@/types/order-type'
import fakeOrderData from '@/fakedata/orderData.json'
import OrderHistoryItem from '@/components/order-history-item'

const AccountOrdersPage = () => {
	const [ordersData, setOrdersData] = useState<OrderData[]>([])
	const [selectedOrder, setSelectedOrder] = useState<OrderData[] | null>(null)

	useEffect(() => {
		setOrdersData(fakeOrderData as OrderData[])
	}, [])

	useEffect(() => {
		if (ordersData && Mosk_User) {
			const userOrders = ordersData.filter(order => order.clientId === Mosk_User.id)
			setSelectedOrder(userOrders)
		}
	}, [ordersData])

	// console.log(ordersData)

	console.log(selectedOrder)

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start">
				<h1 className="text-2xl font-bold">My Orders History</h1>
				{/* <p className="text-xl font-medium">{`${Mosk_User?.firstName} ${Mosk_User?.lastName}`}</p>
				<div className="flex flex-col justify-start items-start gap-1 ">
					<span>{`ID: ${Mosk_User?.id}`}</span>
					<span>{`User from: ${Mosk_User?.createdAt}`}</span>
				</div> */}
				{selectedOrder && Mosk_User && (
					<ul className="w-full">
						{selectedOrder.length > 0 &&
							selectedOrder.map(order => (
								<li key={order.id}>
									<OrderHistoryItem order={order} />
								</li>
							))}
					</ul>
				)}
			</div>
		</Shell>
	)
}

export default AccountOrdersPage
