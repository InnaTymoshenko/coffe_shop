'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { ButtonLink } from '@/components/ui/button-link'
import Shell from '@/components/ui/shell'
import { useAdminStore } from '@/store/admin-store'
import { UserProfile } from '@/types/users-type'
import { OrderData } from '@/types/order-type'
import fakeOrderData from '@/fakedata/orderData.json'
import OrderHistoryItem from '@/components/order-history-item'
import { Button } from '@/components/ui/button'

const OrdersHistoryPage = () => {
	const [ordersData, setOrdersData] = useState<OrderData[]>([])
	const [selectedUser, setSelectedUser] = useState<UserProfile>()
	const [selectedOrder, setSelectedOrder] = useState<OrderData[] | null>(null)
	const [search, setSearch] = useState('')
	const [createdAfter, setCreatedAfter] = useState('')
	const params = useParams()
	const id = params?.id as string
	const { usersData } = useAdminStore()

	useEffect(() => {
		if (usersData) {
			const selectedUser = usersData.find(c => c.id === id)
			setSelectedUser(selectedUser)
		}
	}, [usersData, id])

	useEffect(() => {
		setOrdersData(fakeOrderData as OrderData[])
	}, [])

	useEffect(() => {
		if (ordersData && selectedUser) {
			const userOrders = ordersData.filter(order => order.clientId === selectedUser.id)
			setSelectedOrder(userOrders)
		}
	}, [ordersData, selectedUser])

	const filteredOrders = ordersData
		.filter(order => {
			const query = search.toLowerCase()
			return order.id.toLowerCase().includes(query)
		})
		.filter(order => {
			if (!createdAfter) return true
			const orderDate = new Date(order.createdDateAt.split('.').reverse().join('-'))
			const filterDate = new Date(createdAfter)
			return orderDate >= filterDate
		})

	const clearFilters = () => {
		setSearch('')
		setCreatedAfter('')
	}

	if (!id) return <p>Not found User History!</p>

	return (
		<Shell className="container flex flex-col gap-8">
			<ButtonLink
				href={`/admin/users/${id}`}
				text="Back to user profile"
				className="flex gap-1 items-center font-medium hover:underline"
			>
				<FaArrowLeftLong />
			</ButtonLink>
			<div className="w-full flex flex-col gap-4 justify-start items-start">
				<h1 className="text-2xl font-bold">Orders History</h1>
				<p className="text-xl font-medium">{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</p>
				<div className="flex flex-col justify-start items-start gap-1 ">
					<span>{`ID: ${selectedUser?.id}`}</span>
					<span>{`User from: ${selectedUser?.createdAt}`}</span>
				</div>
				{ordersData.length > 0 && (
					<div className="w-full flex justify-start items-end gap-4">
						<div className="w-[200px] flex flex-col">
							<label className="text-sm font-medium">Search</label>
							<input
								type="text"
								value={search}
								onChange={e => setSearch(e.target.value)}
								placeholder="Search by order ID"
								className="border p-2 rounded-lg"
							/>
						</div>
						<div className="w-[150px] flex flex-col">
							<label className="text-sm font-medium">Created After</label>
							<input
								type="date"
								value={createdAfter}
								onChange={e => setCreatedAfter(e.target.value)}
								className="border p-2 rounded-lg"
							/>
						</div>
						<Button
							text="Clear Filters"
							onClick={clearFilters}
							className="mr-auto bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded-lg"
						/>
					</div>
				)}
				{selectedOrder && selectedUser && (
					<ul className="w-full">
						{filteredOrders.length > 0 &&
							filteredOrders.map(order => (
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

export default OrdersHistoryPage
