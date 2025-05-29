'use client'

import React, { useState } from 'react'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import CafesTable from '@/components/layouts/tables/cafes-table'
import { useAdminStore } from '@/store/admin-store'
import { Modal } from '@/components/ui/modal'
import AddCafeForm from '@/components/layouts/forms/add-cafe-form'
import { LocationData } from '@/types/location-type'

const cafeOptions = [
	{ value: '', label: 'All cafes' },
	{ value: 'khreschatyk', label: 'Coffee Town - Khreschatyk' },
	{ value: 'podil', label: 'Coffee Town - Podil' },
	{ value: 'obolon', label: 'Coffee Town - Obolon' }
]

const CafesPage = () => {
	const [isAddNewCafe, setIsAddNewCafe] = useState(false)
	const { cafesData, addNewCafe, editCafe } = useAdminStore()
	const [selectedCafe, setSelectedCafe] = useState('')
	const filteredCafes = cafesData.filter(c => c.id.toLowerCase().includes(selectedCafe.toLowerCase()))

	const handleAddNewCafe = (item: LocationData) => {
		addNewCafe(item)
		setIsAddNewCafe(false)
	}

	const handleEditCafe = (item: LocationData) => {
		const cafe = cafesData.find(c => c.id === item.id)
		if (cafe) editCafe({ ...cafe, isActive: !cafe.isActive, updatedAt: new Date().toLocaleDateString('uk-UA') })
	}

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Cafes</h1>
					<Button
						text="Add new cafe"
						className="flex items-center justify-between gap-1 border border-gray-400 rounded-lg px-4 py-2 text-gray-900 hover:bg-gray-100"
						onClick={() => setIsAddNewCafe(true)}
					/>
				</div>
				<div className="w-1/4 flex justify-start items-end gap-4">
					{cafesData.length > 0 && (
						<Select
							options={cafeOptions}
							value={selectedCafe}
							onChange={setSelectedCafe}
							className="w-full outline-none flex items-center justify-between gap-1 text-gray-900 bg-gray-50 hover:bg-gray-100"
						/>
					)}
				</div>
				{cafesData.length === 0 ? (
					<p>No cafesData found.</p>
				) : (
					<CafesTable data={filteredCafes} changeStatusCafe={handleEditCafe} />
				)}
				{isAddNewCafe && (
					<Modal isOpen={isAddNewCafe} onClose={() => setIsAddNewCafe(false)} className={'justify-center items-center'}>
						<AddCafeForm onAdd={handleAddNewCafe} setIsAddNewCafe={setIsAddNewCafe} />
					</Modal>
				)}
			</Shell>
		</>
	)
}

export default CafesPage
