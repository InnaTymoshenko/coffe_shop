'use client'

import React, { useEffect, useState } from 'react'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import { LocationData } from '@/types/location-type'
import fakeLocation from '@/fakedata/location.json'
import fakeOrdersData from '@/fakedata/orderData.json'
import { sortByDateTime } from '@/method/fn'
import { OrderData } from '@/types/order-type'
import OrdersTable from '@/components/layouts/tables/orders-table'

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

const OrderPage = () => {
	const [orders, setOrders] = useState<OrderData[]>([])
	const [orderType, setOrderType] = useState('')
	const [selectedCafe, setSelectedCafe] = useState('')
	const [cafes, setCafes] = useState<LocationData[]>([])
	const sortedOrders = sortByDateTime(orders, 'createdDateAt', 'createdTimeAt')

	const filteredOrders = sortedOrders.filter(order => {
		if (!orderType) return true
		if (orderType === 'delivery') {
			return order.type === 'delivery'
		}
		if (orderType === 'in-place') {
			if (order.type !== 'in-place') return false
			if (!selectedCafe) return true
			const selectedCafeName = cafes.find(c => c.id === selectedCafe)?.name
			return 'placeName' in order.details && order.details.placeName === selectedCafeName
		}
		return true
	})

	useEffect(() => {
		const orders = fakeOrdersData as OrderData[]
		setOrders(orders)
	}, [])

	useEffect(() => {
		const cafes = fakeLocation as LocationData[]
		setCafes(cafes)
	}, [])

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Orders</h1>
				</div>
				<div className="w-1/4 flex justify-start items-end gap-4">
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
				</div>
				{orders.length > 0 && <OrdersTable data={filteredOrders} />}
			</Shell>
		</>
	)
}

export default OrderPage
