'use client'

import React from 'react'
import { ReservationData } from '@/types/reservation-type'
import Link from 'next/link'

type ReservationProps = {
	data: ReservationData[]
	changeReserve: (id: string) => void
}

const ReservationTable = ({ data, changeReserve }: ReservationProps) => {
	return (
		<>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-300 hover:bg-gray-100">
							<th className="p-2">№</th>
							<th className="p-2">Cafe</th>
							<th className="p-2">Data</th>
							<th className="p-2">Time</th>
							<th className="p-2">Client</th>
							<th className="p-2">Phone</th>
							<th className="p-2">Guests</th>
							<th className="p-2">Comment</th>
							<th className="p-2">Ready</th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, ind) => (
							<tr
								key={d.id}
								className={`text-center border-b border-gray-300 ${d.isReady ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
							>
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4 text-lg font-medium text-left">{d.cafe}</td>
								<td className="p-4">{d.date}</td>
								<td className="p-4">{d.time}</td>
								<td className="p-4">{d.name}</td>
								<td className="p-4">
									<Link href={`tel:${d.tel}`} className="text-blue-500 hover:underline">
										{d.tel}
									</Link>
								</td>
								<td className="p-4">{d.guests}</td>
								<td className="p-4">{d.comment}</td>
								<td className="p-4">
									<input
										type="checkbox"
										checked={d.isReady}
										onChange={() => changeReserve(d.id)}
										disabled={d.isReady}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default ReservationTable
