'use client'

import dynamic from 'next/dynamic'

const DatePicker = dynamic(() => import('react-date-picker'), {
	ssr: false,
	loading: () => <p className="text-gray-400">Loading date picker...</p>
})

export default DatePicker
