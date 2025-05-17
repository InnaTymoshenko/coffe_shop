'use client'

import React, { useState } from 'react'
import Select from '@/components/ui/select'
import Shell from '@/components/ui/shell'

const dateRangeOptions = [
	{ label: 'All time', value: 'all' },
	{ label: 'Last week', value: 'week' },
	{ label: 'Last month', value: 'month' },
	{ label: 'Last year', value: 'year' }
]

const MainAdmin = () => {
	const [dateRange, setDateRange] = useState(dateRangeOptions[0].value)

	return (
		<Shell className="container flex flex-col gap-4">
			<div className="w-full py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</div>
			<div className="w-1/3 flex justify-start items-end gap-4">
				<Select
					options={dateRangeOptions}
					value={dateRange}
					onChange={setDateRange}
					className="w-1/3 outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
				/>
			</div>
			<div>
				<div>
					<h2>Users</h2>
				</div>
				<div>
					<h2>Orders</h2>
				</div>
				<div>
					<h2>Promotions</h2>
				</div>
			</div>
		</Shell>
	)
}

export default MainAdmin
