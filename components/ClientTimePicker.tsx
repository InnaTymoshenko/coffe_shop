'use client'

import dynamic from 'next/dynamic'

const TimePicker = dynamic(() => import('react-time-picker'), {
	ssr: false,
	loading: () => <p className="text-gray-400">Loading time picker...</p>
})

export default TimePicker
