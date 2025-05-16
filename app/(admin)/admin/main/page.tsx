'use client'

import React, { useState } from 'react'
import Select from '@/components/ui/select'
import Shell from '@/components/ui/shell'

const dateRangeOptions = [
	{ label: 'Last week', value: 'week' },
	{ label: 'Last month', value: 'month' },
	{ label: 'Last year', value: 'year' }
]

const MainAdmin = () => {
	const [dateRange, setDateRange] = useState(dateRangeOptions[0].value)

	return (
		<Shell className="container">
			<Select
				options={dateRangeOptions}
				value={dateRange}
				onChange={setDateRange}
				className="w-1/3 outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
			/>
		</Shell>
	)
}

export default MainAdmin
