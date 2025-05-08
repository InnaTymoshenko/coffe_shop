import React from 'react'
import { BsPersonCheck } from 'react-icons/bs'
import { Button } from '@/components/ui/button'

export default function AdminHeader() {
	return (
		<div className="bg-primary flex items-center h-20 justify-between border-b border-gray-300 px-6 sticky top-0">
			<span className="text-2xl font-bold">Admin Panel</span>
			<Button
				text="Admin"
				className="flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 hover:bg-gray-100"
			>
				<BsPersonCheck />
			</Button>
		</div>
	)
}
