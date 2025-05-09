'use client'

import React, { useEffect, useState } from 'react'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import { LocationData } from '@/types/location-type'
import fakeLocation from '@/fakedata/location.json'
import fakeReservationData from '@/fakedata/reservation.json'
import { ReservationData } from '@/types/reservation-type'
import ReservationTable from '@/components/layouts/tables/reservation-table'
import { sortByDateTime } from '@/method/fn'

// type Props = {}

const cafeOptions = [
	{ value: '', label: 'All cafes' },
	{ value: 'khreschatyk', label: 'Coffee Town - Khreschatyk' },
	{ value: 'podil', label: 'Coffee Town - Podil' },
	{ value: 'obolon', label: 'Coffee Town - Obolon' }
]

const ReservationPage = () => {
	const reservationData = fakeReservationData as ReservationData[]
	const [cafes, setCafes] = useState<LocationData[]>([])
	const [selectedCafe, setSelectedCafe] = useState('')
	const sortedReservations = sortByDateTime(reservationData, 'date', 'time')
	const filteredReservation = selectedCafe
		? sortedReservations.filter(r => r.cafe.toLowerCase().includes(selectedCafe.toLowerCase()))
		: sortedReservations

	useEffect(() => {
		const cafes = fakeLocation as LocationData[]
		setCafes(cafes)
	}, [])

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Reservation</h1>
				</div>
				<div className="w-1/4 flex justify-start items-end gap-4">
					{cafes.length > 0 && (
						<Select
							options={cafeOptions}
							value={selectedCafe}
							onChange={setSelectedCafe}
							className="w-full outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
						/>
					)}
				</div>
				{filteredReservation.length === 0 ? (
					<p>No reservationData found.</p>
				) : (
					<ReservationTable data={filteredReservation} />
				)}
			</Shell>
		</>
	)
}

export default ReservationPage
