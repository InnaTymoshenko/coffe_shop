'use client'

import React, { useState } from 'react'
import Select from '@/components/ui/select'
import Shell from '@/components/ui/shell'
import { DashboardStatBox } from '@/components/ui/stat-box'
import { useAdminStore } from '@/store/admin-store'
import { DateRange, filterByDateRange } from '@/utils/fn'

const dateRangeOptions = [
	{ label: 'All time', value: 'all' },
	{ label: 'Last week', value: 'week' },
	{ label: 'Last month', value: 'month' },
	{ label: 'Last year', value: 'year' }
]

const MainAdmin = () => {
	const [dateRange, setDateRange] = useState<DateRange>('all')

	const { usersData, ordersData, promotionsData, cafesData } = useAdminStore()

	const filteredUsers = filterByDateRange(usersData, dateRange, 'createdAt')
	const filteredOrders = filterByDateRange(ordersData, dateRange, 'createdDateAt')

	const placeIncome = cafesData.map(c => ({
		name: c.name,
		income: ordersData
			.filter(o => o.details?.placeName === c.name)
			.reduce((sum, o) => sum + o.totalAmount, 0)
			.toFixed(2)
	}))

	return (
		<Shell className="container max-w-[1000px] flex flex-col gap-4">
			<div className="w-full py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</div>
			<div className="w-full flex justify-start items-end gap-4">
				<Select
					options={dateRangeOptions}
					value={dateRange}
					onChange={val => setDateRange(val as DateRange)}
					className="w-1/3 outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
				/>
			</div>
			<div className="flex flex-col gap-6">
				<div className="grid grid-cols-2 gap-6">
					<DashboardStatBox
						title="Total Users"
						addition={`${filteredUsers.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}$`}
						value={filteredUsers.length}
						hint={`${filteredUsers.length} new users in ${dateRange}`}
						color="blue"
					/>
					<DashboardStatBox
						title="Delivery Orders"
						value={filteredOrders.filter(o => o.type === 'delivery').length}
						addition={`${filteredOrders
							.filter(o => o.type === 'delivery')
							.reduce((sum, o) => sum + o.totalAmount, 0)
							.toFixed(2)}$`}
						hint={`Deliveries in ${dateRange}`}
						color="green"
					/>
					<DashboardStatBox
						title="Promotions"
						addition={`${filteredOrders
							.filter(o => o.items.some(i => i.promotion))
							.reduce((sum, o) => sum + o.totalAmount, 0)
							.toFixed(2)}$`}
						value={promotionsData.filter(p => p.status === 'active').length}
						hint={`${promotionsData.filter(p => p.status === 'moderation').length} in moderation`}
						color="red"
					/>
					<DashboardStatBox title="Cafes" value={cafesData.length} color="orange">
						<div className="">
							{placeIncome &&
								placeIncome.map(pl => (
									<div key={pl.name} className="grid grid-cols-2 gap-4">
										<span>{pl.name}</span>
										<span>{`${pl.income}$`}</span>
									</div>
								))}
						</div>
					</DashboardStatBox>
				</div>
				<DashboardStatBox
					title="Total income"
					value={`${filteredOrders.reduce((sum, o) => 1000 + sum + o.totalAmount, 0).toFixed(2)}$`}
					hint={`Total in ${dateRange}`}
				/>
			</div>
		</Shell>
	)
}

export default MainAdmin
