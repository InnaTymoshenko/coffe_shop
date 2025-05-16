'use client'

import React, { useState } from 'react'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import { sortByDateTime } from '@/method/fn'
import OrdersTable from '@/components/layouts/tables/orders-table'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/store/admin-store'
import { OrderData } from '@/types/order-type'

// type Props = {}

const ordersOptions = [
	{ value: '', label: 'All orders' },
	{ value: 'delivery', label: 'Delivery' },
	{ value: 'in-place', label: 'In place' }
]

const cafeOptions = [
	{ value: '', label: 'All cafes' },
	{ value: 'khreschatyk', label: 'Coffee Town - Хрещатик' },
	{ value: 'podil', label: 'Coffee Town - Поділ' },
	{ value: 'obolon', label: 'Coffee Town - Оболонь' }
]

const statusOptions = [
	{ value: '', label: 'All' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'cancelled', label: 'Cancelled' },
	{ value: 'processed', label: 'Processed' },
	{ value: 'shipped', label: 'Shipped' },
	{ value: 'completed', label: 'Completed' }
]

const OrderPage = () => {
	const { ordersData, cafesData, editOrder } = useAdminStore()
	const [orderType, setOrderType] = useState('')
	const [selectedCafe, setSelectedCafe] = useState('')
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [createdAfter, setCreatedAfter] = useState('')
	const sortedOrders = sortByDateTime(ordersData, 'createdDateAt', 'createdTimeAt')

	const filteredOrders = sortedOrders
		.filter(order => {
			if (!orderType) return true
			if (orderType === 'delivery') return order.type === 'delivery'
			if (orderType === 'in-place') {
				if (order.type !== 'in-place') return false
				if (!selectedCafe) return true
				const selectedCafeName = cafesData.find(c => c.id === selectedCafe)?.name
				return 'placeName' in order.details && order.details.placeName === selectedCafeName
			}
			return true
		})
		.filter(order => !statusFilter || order.status === statusFilter)
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
		setStatusFilter('')
		setCreatedAfter('')
		setOrderType('')
	}

	const handleChangeStatusOrder = (item: OrderData) => {
		const order = ordersData.find(o => o.id === item.id)
		if (order) editOrder({ ...order, status: 'completed' })
	}

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Orders</h1>
				</div>
				<div className="w-1/3 flex justify-start items-end gap-4">
					<Select
						id="order-type"
						options={ordersOptions}
						value={orderType}
						onChange={val => {
							setOrderType(val)
							setSelectedCafe('')
						}}
						required
					/>
					{orderType === 'in-place' && (
						<Select options={cafeOptions} value={selectedCafe} onChange={setSelectedCafe} required />
					)}
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
					<div className="w-[100px] flex flex-col">
						<label className="text-sm font-medium">Status</label>
						<Select
							options={statusOptions}
							value={statusFilter}
							onChange={val => {
								setStatusFilter(val)
							}}
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
						className="w-[150px] mr-auto bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded-lg"
					/>
				</div>
				{ordersData.length > 0 && <OrdersTable data={filteredOrders} changeStatusOrder={handleChangeStatusOrder} />}
			</Shell>
		</>
	)
}

export default OrderPage
