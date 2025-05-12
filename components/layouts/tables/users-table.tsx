'use client'

import React from 'react'
import Link from 'next/link'
import { UserProfile } from '@/types/users-type'
import { normalizedPhone } from '@/method/fn'

type UsersAdminProps = {
	data: UserProfile[]
}

const UsersTable = ({ data }: UsersAdminProps) => {
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
							<tr key={d.id} className={`text-center border-b border-gray-300 hover:bg-gray-100`}>
								<td className="p-4">{`#${ind + 1}`}</td>
								<td className="p-4 text-lg font-medium text-left"></td>
								<td className="p-4"></td>
								<td className="p-4"></td>
								<td className="p-4"></td>
								<td className="p-4">
									<Link href={`tel:${normalizedPhone(d.phone)}`} className="text-blue-500 hover:underline">
										{d.phone}
									</Link>
								</td>
								<td className="p-4"></td>
								<td className="p-4"></td>
								<td className="p-4">
									{/* <input
										type="checkbox"
										checked={d.isReady}
										onChange={() => changeReserve(d.id)}
										disabled={d.isReady}
									/> */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default UsersTable
