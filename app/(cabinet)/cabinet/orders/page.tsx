'use client'

import React, { useEffect, useState } from 'react'
import Shell from '@/components/ui/shell'
import { OrderData } from '@/types/order-type'
import fakeOrderData from '@/fakedata/orderData.json'
import AccountOrderHistoryItem from '@/components/account-order-history-item'
import { useAdminStore } from '@/store/admin-store'

const AccountOrdersPage = () => {
	const [ordersData, setOrdersData] = useState<OrderData[]>([])
	const [selectedOrder, setSelectedOrder] = useState<OrderData[] | null>(null)
	const { mockUser } = useAdminStore()

	useEffect(() => {
		setOrdersData(fakeOrderData as OrderData[])
	}, [])

	useEffect(() => {
		if (ordersData && mockUser) {
			const userOrders = ordersData.filter(order => order.clientId === mockUser.id)
			setSelectedOrder(userOrders)
		}
	}, [mockUser, ordersData])

	return (
		<Shell className="container flex flex-col gap-8">
			<div className="w-full flex flex-col gap-4 justify-start items-start text-gray-200">
				<h1 className="text-3xl font-bold my-8">My Orders History</h1>
				{selectedOrder && mockUser && (
					<ul className="w-full ">
						{selectedOrder.length > 0 &&
							selectedOrder.map(order => (
								<li key={order.id} className="">
									<AccountOrderHistoryItem order={order} />
								</li>
							))}
					</ul>
				)}
			</div>
		</Shell>
	)
}

export default AccountOrdersPage
