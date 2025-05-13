'use client'

import React, { useEffect, useState } from 'react'
import Shell from '@/components/ui/shell'
import Select from '@/components/ui/select'
import fakeUsersData from '@/fakedata/users.json'
import { UserProfile } from '@/types/users-type'
import UsersTable from '@/components/layouts/tables/users-table'

// type Props = {}

const cafeOptions = [
	{ value: '', label: 'All cafes' },
	{ value: 'khreschatyk', label: 'Coffee Town - Khreschatyk' },
	{ value: 'podil', label: 'Coffee Town - Podil' },
	{ value: 'obolon', label: 'Coffee Town - Obolon' }
]

const ReservationPage = () => {
	const [users, setUsers] = useState<UserProfile[]>([])
	const filteredUsers = users.filter(u => u.role === 'user')

	useEffect(() => {
		const users = fakeUsersData as UserProfile[]
		setUsers(users)
	}, [])

	return (
		<>
			<Shell className="container flex flex-col gap-4">
				<div className="w-full py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Users</h1>
				</div>
				<div className="w-1/4 flex justify-start items-end gap-4">
					{users.length > 0 && (
						<Select
							options={cafeOptions}
							value={''}
							onChange={() => {}}
							className="w-full outline-none flex items-center justify-between gap-1 border border-gray-900 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-gray-100"
						/>
					)}
				</div>
				{users.length === 0 && filteredUsers ? <p>No users found.</p> : <UsersTable data={filteredUsers} />}
			</Shell>
		</>
	)
}

export default ReservationPage
